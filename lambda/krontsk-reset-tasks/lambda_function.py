import json, logging, boto3, os
from boto3.dynamodb.types import TypeDeserializer, TypeSerializer
from datetime import datetime, timedelta

table_name = os.environ['TableName']

dynamodb = boto3.client('dynamodb')
deser    = TypeDeserializer()
ser      = TypeSerializer()

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    
    for message in event['Records']:
        user_id   = message['body']
        mode      = message['messageAttributes']['mode']['stringValue']
        reset_day = message['messageAttributes']['day']['stringValue']
        
        logger.info('Resetting %s tasks for %s', mode, user_id)
        
        response = dynamodb.get_item(
            TableName=table_name,
            Key={
                'user_id': {
                    'S': user_id
                }
            },
            ProjectionExpression='tasks'
        )
        
        logger.info(response)

        update = False
        if 'Item' not in response:
            logger.info('No tasks for %s', user_id)
        else:
            tasks = deser.deserialize(response['Item']['tasks'])
            for task in tasks:
                task_date = datetime.strptime(task['date'], '%d')
                prior_10_days = (task_date + timedelta(days=-10)).day
                if mode == 'monthly' and reset_day == '1' and task['state'] != 'not-done':
                    logger.info('Reset monthly task due %s that is %s for %s', reset_day, task['state'], user_id)
                    task['state'] = 'not-done'
                    update = True
                elif mode == '10days' and str(prior_10_days) == reset_day and task['state'] != 'not-done':
                    logger.info('Reset 10days task due %s - 10 = %s that is %s for %s', task['date'], reset_day, task['state'], user_id)
                    task['state'] = 'not-done'
                    update = True
                else:
                    logger.info('Dont reset %s on %s due %s that is %s for %s', mode, reset_day, task['date'], task['state'], user_id)
            
            if update:
                response = dynamodb.update_item(
                    ExpressionAttributeNames={
                        '#T': 'tasks'
                    },
                    ExpressionAttributeValues={
                        ':t': ser.serialize(tasks)
                    },
                    Key={
                        'user_id': {
                            'S': user_id
                        }
                    },
                    ReturnValues='NONE',
                    TableName=table_name,
                    UpdateExpression='SET #T = :t'
                )
                logger.info(response)
    return {
        'statusCode': 200
    }
