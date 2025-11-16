/**
 * Import Agency Data from CSV
 * 
 * Reads manually verified CSV and updates DynamoDB
 * 
 * Usage: npm run import-csv enriched-agencies.csv
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import { Agency } from '../bijak-mengeluh-webapp/src/types/agency';

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

// ============================================================================
// CSV to Agency Object
// ============================================================================

function csvRowToAgency(row: any): Agency {
  const agency: Agency = {
    agency_id: row.agency_id,
    name: row.name,
    description: row.description || undefined,
    province: row.province || undefined,
    city: row.city || undefined,
    level: row.level || undefined,
    keywords: row.keywords ? row.keywords.split(';') : undefined,
    emoji: row.emoji || undefined,
    
    address: row.address || undefined,
    google_maps_url: row.google_maps_url || undefined,
    coordinates: (row.lat && row.lng) ? {
      lat: parseFloat(row.lat),
      lng: parseFloat(row.lng),
    } : undefined,
    
    phone: row.phone || undefined,
    phone_alt: row.phone_alt || undefined,
    email: row.email || undefined,
    website: row.website || undefined,
    
    social: {
      instagram: row.instagram || undefined,
      twitter: row.twitter || undefined,
      facebook: row.facebook || undefined,
      youtube: row.youtube || undefined,
      tiktok: row.tiktok || undefined,
    },
    
    verified: row.verified === 'true',
    last_updated: new Date().toISOString(),
    data_source: 'csv_import',
  };
  
  // Remove empty social object
  if (!Object.values(agency.social || {}).some(v => v)) {
    delete agency.social;
  }
  
  return agency;
}

// ============================================================================
// Import Function
// ============================================================================

async function importAgencies(csvPath: string) {
  console.log(`Reading CSV: ${csvPath}\n`);
  
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const rows = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });
  
  console.log(`Found ${rows.length} agencies\n`);
  
  let success = 0;
  let failed = 0;
  
  for (const row of rows) {
    try {
      const agency = csvRowToAgency(row);
      
      await dynamodb.send(new PutCommand({
        TableName: process.env.TABLE_NAME || 'agencies',
        Item: agency,
      }));
      
      console.log(`✓ ${agency.name}`);
      success++;
    } catch (error) {
      console.error(`✗ ${row.name}:`, error);
      failed++;
    }
  }
  
  console.log(`\n=== Summary ===`);
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);
}

// ============================================================================
// CLI Runner
// ============================================================================

if (require.main === module) {
  const csvPath = process.argv[2];
  
  if (!csvPath) {
    console.error('Usage: npm run import-csv <path-to-csv>');
    process.exit(1);
  }
  
  importAgencies(csvPath).catch(console.error);
}
