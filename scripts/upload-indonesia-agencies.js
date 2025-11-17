#!/usr/bin/env node

/**
 * Upload Indonesia-wide agencies to DynamoDB
 * Cost: ~Rp 0 (write operations are cheap)
 */

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, BatchWriteCommand } = require('@aws-sdk/lib-dynamodb');
const fs = require('fs');
const path = require('path');

const client = new DynamoDBClient({ region: 'ap-southeast-2' });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = 'agencies';
const BATCH_SIZE = 25; // DynamoDB limit

async function uploadAgencies() {
  console.log('📤 Uploading Indonesia agencies to DynamoDB\n');
  
  // Load agencies
  const dataPath = path.join(__dirname, '../data/agencies-indonesia.json');
  const agencies = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
  console.log(`Loaded ${agencies.length} agencies`);
  
  let uploaded = 0;
  let failed = 0;
  
  // Process in batches
  for (let i = 0; i < agencies.length; i += BATCH_SIZE) {
    const batch = agencies.slice(i, i + BATCH_SIZE);
    
    try {
      const putRequests = batch.map(agency => ({
        PutRequest: {
          Item: {
            agency_id: agency.id,
            name: agency.name,
            province: agency.province,
            level: 'provincial',
            keywords: agency.keywords,
            social_media: {
              instagram: agency.social?.instagram || null,
              twitter: null,
              facebook: null
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        }
      }));
      
      await docClient.send(new BatchWriteCommand({
        RequestItems: {
          [TABLE_NAME]: putRequests
        }
      }));
      
      uploaded += batch.length;
      console.log(`✓ Uploaded batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(agencies.length / BATCH_SIZE)} (${uploaded}/${agencies.length})`);
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`✗ Failed batch ${Math.floor(i / BATCH_SIZE) + 1}:`, error.message);
      failed += batch.length;
    }
  }
  
  console.log(`\n✅ Upload complete!`);
  console.log(`   Uploaded: ${uploaded}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total: ${agencies.length}`);
  console.log(`\n💰 Estimated cost: ~Rp 0 (${uploaded} write operations × Rp 0.0016 = Rp ${(uploaded * 0.0016).toFixed(2)})`);
}

if (require.main === module) {
  uploadAgencies().catch(console.error);
}

module.exports = { uploadAgencies };
