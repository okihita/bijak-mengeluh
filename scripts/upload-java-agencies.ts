import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, BatchWriteCommand } from '@aws-sdk/lib-dynamodb';
import * as fs from 'fs';
import { CATEGORY_CONFIG } from './category-config';

const client = new DynamoDBClient({ region: 'ap-southeast-2' });
const docClient = DynamoDBDocumentClient.from(client);

function generateAgencyId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
}

function getCategoryMeta(categories: string[]) {
  const primary = categories[0];
  return CATEGORY_CONFIG[primary] || { emoji: '🏛️', color: '#6B7280' };
}

async function uploadBatch(agencies: any[]) {
  const params = {
    RequestItems: {
      agencies: agencies.map(agency => ({
        PutRequest: { Item: agency }
      }))
    }
  };
  await docClient.send(new BatchWriteCommand(params));
}

async function main() {
  const data = JSON.parse(fs.readFileSync('./data/agencies-java.json', 'utf-8'));
  
  const transformed = data.map((agency: any) => {
    const meta = getCategoryMeta(agency.categories);
    return {
      agency_id: generateAgencyId(agency.name),
      name: agency.name,
      province: agency.province,
      city: agency.city,
      type: agency.type,
      categories: agency.categories,
      keywords: agency.keywords,
      emoji: meta.emoji,
      color: meta.color,
      social_media: {},
      scope: 'local'
    };
  });
  
  console.log(`Uploading ${transformed.length} agencies...`);
  
  for (let i = 0; i < transformed.length; i += 25) {
    const batch = transformed.slice(i, i + 25);
    await uploadBatch(batch);
    console.log(`✓ ${Math.min(i + 25, transformed.length)}/${transformed.length}`);
  }
  
  console.log('✅ Upload complete!');
}

main().catch(console.error);
