'use strict';

const Schmervice = require('@hapipal/schmervice');
const AWS = require('aws-sdk');

module.exports = class awsSQSService extends Schmervice.Service {

    // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html
    sendPushMessage(message, user) {

        AWS.config.update({
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });

        const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

        const params = {
            MessageAttributes: {
                token: {
                    DataType: 'String',
                    StringValue: 'tokenMonkeybutt' // TODO: Repalce this with user.gcmToken
                },
                device: {
                    DataType: 'String',
                    StringValue: 'android'
                }
            },
            MessageBody: message,
            QueueUrl: process.env.GCM_PUSH_SQS_URL
        };

        sqs.sendMessage(params, (err, data) => {

            if (err) {
                console.log('Error', err);
            }
            else {
                console.log('Success', data.MessageId);
            }
        });
    }

};
