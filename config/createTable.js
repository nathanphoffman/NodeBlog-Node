var AWS = require("aws-sdk");
var config = require("config").config;

AWS.config.update(config.aws.dynamo.login);

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : config.aws.dynamo.tableName,
    KeySchema: [       
        { AttributeName: "category", KeyType: "HASH"},  //Partition key
        { AttributeName: "unixDate", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "category", AttributeType: "S" },
        { AttributeName: "unixDate", AttributeType: "N" }
    ],
    ProvisionedThroughput: config.aws.dynamo.throughput
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

/*
{
    category: "Astronomy",
    unixDate: 1478996627004.0145,

    posted: "2016-05-02",
    subject: "SpaceX Coming Back"
    body: "blah blah",
    tags: ["Satellite","JWST"]
}

*/
