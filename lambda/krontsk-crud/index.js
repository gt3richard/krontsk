'use strict';

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();


/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
 
 //event.queryStringParameters.Id.toString()
exports.handler = (event, context, callback) => {

    const allowedOrigins = [
        "http://krontsk.com",
        "https://krontsk.com",
        "https?://[a-z]*.?krontsk.com",
        "http://localhost:[0-9]*"
    ];
    
    const origin = event.headers.Origin || event.headers.origin;
    var goodOrigin = false;

    if (origin) {
        allowedOrigins.forEach( allowedOrigin => {
            if (!goodOrigin && origin.match(allowedOrigin)) {
                goodOrigin = true;
            }
        });
    }

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":  goodOrigin ? origin : allowedOrigins[0],
            "Access-Control-Allow-Credentials": "true",
        },
    });

    switch (event.httpMethod) {
        case 'DELETE':
            dynamo.deleteItem(JSON.parse(event.body), done);
            break;
        case 'GET':
            dynamo.getItem({
              TableName: 'krontsk',
              Key: {
                'user_id': event.queryStringParameters.Id
              }
            }, done);
            break;
        case 'PUT':
            dynamo.putItem(JSON.parse(event.body), done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};