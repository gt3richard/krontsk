const AWS = require('aws-sdk');
const util = require('util');

var s3 = new AWS.S3();
var params = {Bucket: process.env.BUCKET, Key: process.env.VERIFICATION}

exports.handler = (event, context, callback) => {
    //https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-custom-message.html
    
    //PoolName tasker-pool
    if(event.userPoolId === process.env.USER_POOL_ID) {
        // Identify why was this function invoked
        if(event.triggerSource === "CustomMessage_ForgotPassword") {
            // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent
            s3.getObject(params, function(err, data) {
              if (err) console.log(err, err.stack); // an error occurred
              else {
                event.response.emailSubject = "Krontsk verification code";
                event.response.emailMessage = util.format(data.Body.toString('utf-8'), event.request.codeParameter)
                
                // Return to Amazon Cognito
                callback(null, event);
              }
            });
        }
    }
};
