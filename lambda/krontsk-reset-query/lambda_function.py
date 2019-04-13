import json, boto3, os, logging
from datetime import datetime

table_name = os.environ['TableName']
index_name = os.environ['IndexName']
attribute  = os.environ['Attribute']
sqs_url    = os.environ['SQSUrl']

dynamodb = boto3.client('dynamodb')
sqs = boto3.client('sqs')

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    
    response = dynamodb.query(
        TableName=table_name,
        IndexName=index_name,
        ProjectionExpression='user_id',
        KeyConditionExpression='resetMode = :mode',
        ExpressionAttributeValues={
            ':mode': {
                'S': attribute
            }
        }
    )
    
    if(response['Count']):
        day = datetime.today().day
        for user in response['Items']:
            sqs.send_message(
                QueueUrl=sqs_url,
                MessageBody=user['user_id']['S'],
                MessageAttributes={
                    'mode': {
                        'StringValue': attribute,
                        'DataType': 'String'
                    },
                    'day': {
                        'StringValue': str(day),
                        'DataType': 'String'
                    }
                }
            )
            logger.info('Reset %s %s on %s', attribute, user['user_id']['S'], str(day))
    
    return {
        'statusCode': 200
    }
