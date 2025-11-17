import json
import os
import boto3
from boto3.dynamodb.conditions import Attr

# Direct boto3 initialization
dynamodb = boto3.resource('dynamodb', region_name='ap-southeast-1')
table = dynamodb.Table('agencies')

def lambda_handler(event, context):
    agency_id = event['pathParameters']['id']
    
    response = table.get_item(Key={'agency_id': agency_id})
    
    if 'Item' not in response:
        return {
            'statusCode': 404,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Agency not found'})
        }
    
    agency = response['Item']
    
    # Get related agencies (same city or category)
    try:
        related = table.scan(
            FilterExpression=Attr('city').eq(agency['city']) | Attr('categories').contains(agency['categories'][0]),
            Limit=6
        )
        
        related_agencies = [
            a for a in related['Items'] 
            if a['agency_id'] != agency_id
        ][:3]
    except:
        related_agencies = []
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=600'
        },
        'body': json.dumps({
            'agency': agency,
            'related': related_agencies
        })
    }
