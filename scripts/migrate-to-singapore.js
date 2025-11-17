#!/usr/bin/env node

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, BatchWriteCommand } = require('@aws-sdk/lib-dynamodb');
const fs = require('fs');

const client = new DynamoDBClient({ region: 'ap-southeast-1' });
const docClient = DynamoDBDocumentClient.from(client);

const BATCH_SIZE = 25;

async function migrate() {
  console.log('🚀 Migrating agencies to Singapore (ap-southeast-1)\n');
  
  const data = JSON.parse(fs.readFileSync('/tmp/agencies-export.json', 'utf8'));
  const items = data.Items;
  
  console.log(`Loaded ${items.length} items from Sydney`);
  
  // Convert DynamoDB JSON to regular objects
  const agencies = items.map(item => {
    const obj = {};
    for (const [key, value] of Object.entries(item)) {
      if (value.S) obj[key] = value.S;
      else if (value.N) obj[key] = parseFloat(value.N);
      else if (value.L) obj[key] = value.L.map(v => v.S || v.N);
      else if (value.M) {
        obj[key] = {};
        for (const [k, v] of Object.entries(value.M)) {
          if (v.S) obj[key][k] = v.S;
          else if (v.NULL) obj[key][k] = null;
        }
      }
      else if (value.NULL) obj[key] = null;
    }
    return obj;
  });
  
  let uploaded = 0;
  
  for (let i = 0; i < agencies.length; i += BATCH_SIZE) {
    const batch = agencies.slice(i, i + BATCH_SIZE);
    
    try {
      const putRequests = batch.map(agency => ({
        PutRequest: { Item: agency }
      }));
      
      await docClient.send(new BatchWriteCommand({
        RequestItems: {
          'agencies': putRequests
        }
      }));
      
      uploaded += batch.length;
      console.log(`✓ Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(agencies.length / BATCH_SIZE)} (${uploaded}/${agencies.length})`);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`✗ Failed batch:`, error.message);
    }
  }
  
  console.log(`\n✅ Migration complete: ${uploaded}/${agencies.length} items`);
}

migrate().catch(console.error);
