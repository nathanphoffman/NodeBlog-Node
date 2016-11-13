exports.dal = function() {

    var helper = require("./helper.js").helper;
    var AWS = require("aws-sdk");
    var config = require("./../config/config.js").config;
    var tableName = config.aws.dynamo.tableName;

    AWS.config.update(config.aws.dynamo.login);

    var docClient = new AWS.DynamoDB.DocumentClient();

    return {
        getPost: function(category, unixDate, callback) {

            var params = {
                TableName: tableName,
                Key: {
                    category: String(category),
                    unixDate: Number(unixDate)
                }
            };

            docClient.get(params, helper.handleResponse(callback));
        },

        getPosts: function(category, unixStart, unixEnd, callback) {

            var params = {
                TableName: tableName,
                KeyConditionExpression: "category = :category AND unixDate BETWEEN :unixStart AND :unixEnd",
                ProjectionExpression: "#cat,#ud,#d,#sub,#tags",
                ExpressionAttributeNames: {
                    "#cat": "category",
                    "#ud": "unixDate",
                    "#d": "date",
                    "#sub": "subject",
                    "#tags": "tags"
                },
                ExpressionAttributeValues: {
                    ":unixStart": Number(unixStart),
                    ":unixEnd": Number(unixEnd),
                    ":category": String(category)
                }
            };

            docClient.query(params, helper.handleResponse(callback));
        },

        insertPost: function(item, callback) {
            var params = {
                TableName: tableName,
                Item: item
            };

            docClient.put(params, helper.handleResponse(callback));
        },

        deletePost: function(category, unixDate, callback) {

            var params = {
                TableName: tableName,
                Key: {
                    category: String(category),
                    unixDate: Number(unixDate)
                }
            };

            docClient.delete(params, helper.handleResponse(callback));
        }
    };
};