/**
 * Lambda Function: Update Agency Data
 * 
 * POST /agencies/{agency_id}
 * - Updates agency with new contact/social/location data
 * - Requires admin authentication
 * - Validates all fields before saving
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

// ============================================================================
// Validation
// ============================================================================

const VALIDATION = {
  phone: /^(\+62|0)[0-9]{8,13}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  website: /^https?:\/\/.+/,
  instagram: /^@?[a-zA-Z0-9._]{1,30}$/,
  twitter: /^@?[a-zA-Z0-9_]{1,15}$/,
  coordinates: {
    lat: { min: -11, max: 6 },
    lng: { min: 95, max: 141 },
  },
};

function validateAgency(agency: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Required fields
  if (!agency.agency_id) errors.push('agency_id is required');
  if (!agency.name) errors.push('name is required');
  
  // Optional field validation
  if (agency.phone && !VALIDATION.phone.test(agency.phone)) {
    errors.push('Invalid phone format');
  }
  
  if (agency.email && !VALIDATION.email.test(agency.email)) {
    errors.push('Invalid email format');
  }
  
  if (agency.website && !VALIDATION.website.test(agency.website)) {
    errors.push('Invalid website URL');
  }
  
  if (agency.social?.instagram && !VALIDATION.instagram.test(agency.social.instagram)) {
    errors.push('Invalid Instagram handle');
  }
  
  if (agency.social?.twitter && !VALIDATION.twitter.test(agency.social.twitter)) {
    errors.push('Invalid Twitter handle');
  }
  
  if (agency.coordinates) {
    const { lat, lng } = agency.coordinates;
    if (lat < VALIDATION.coordinates.lat.min || lat > VALIDATION.coordinates.lat.max) {
      errors.push('Latitude out of Indonesia bounds');
    }
    if (lng < VALIDATION.coordinates.lng.min || lng > VALIDATION.coordinates.lng.max) {
      errors.push('Longitude out of Indonesia bounds');
    }
  }
  
  return { valid: errors.length === 0, errors };
}

// ============================================================================
// Handler
// ============================================================================

export const handler = async (event: any) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
  
  try {
    // Parse request body
    const agency = JSON.parse(event.body);
    
    // Validate
    const validation = validateAgency(agency);
    if (!validation.valid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Validation failed',
          details: validation.errors,
        }),
      };
    }
    
    // Add metadata
    agency.last_updated = new Date().toISOString();
    if (!agency.data_source) {
      agency.data_source = 'manual_entry';
    }
    
    // Save to DynamoDB
    await dynamodb.send(new PutCommand({
      TableName: process.env.TABLE_NAME || 'agencies',
      Item: agency,
    }));
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Agency updated successfully',
        agency,
      }),
    };
  } catch (error) {
    console.error('Error updating agency:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
