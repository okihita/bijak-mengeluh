import json
import os
import boto3
from boto3.dynamodb.conditions import Attr
from decimal import Decimal

# Direct boto3 initialization
dynamodb = boto3.resource('dynamodb', region_name='ap-southeast-1')
table = dynamodb.Table('agencies')

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)

def lambda_handler(event, context):
    params = event.get('queryStringParameters', {}) or {}
    
    province = params.get('province')
    city = params.get('city')
    category = params.get('category')
    search = params.get('search', '').lower()
    limit = int(params.get('limit', 50))
    
    # Build filter expression
    scan_kwargs = {'Limit': limit * 2}
    filter_expr = None
    
    if province:
        filter_expr = Attr('province').eq(province)
    if city:
        expr = Attr('city').eq(city)
        filter_expr = filter_expr & expr if filter_expr else expr
    if category:
        expr = Attr('categories').contains(category)
        filter_expr = filter_expr & expr if filter_expr else expr
    
    if filter_expr:
        scan_kwargs['FilterExpression'] = filter_expr
    
    response = table.scan(**scan_kwargs)
    agencies = response['Items']
    
    # Filter out keyword entries (they have 'keyword' field)
    agencies = [a for a in agencies if 'keyword' not in a]
    
    # Client-side search
    if search:
        agencies = [
            a for a in agencies
            if search in a.get('name', '').lower() or
               any(search in k for k in a.get('keywords', []))
        ]
    
    # Sort by name
    agencies.sort(key=lambda x: x.get('name', ''))
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=300'
        },
        'body': json.dumps({
            'agencies': agencies[:limit],
            'total': len(agencies),
            'hasMore': len(agencies) > limit
        }, cls=DecimalEncoder)
    }
