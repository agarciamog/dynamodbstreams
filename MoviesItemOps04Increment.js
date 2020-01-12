var AWS = require("aws-sdk");
var creds = new AWS.SharedIniFileCredentials({profile: "adminuser"});

AWS.config.credentials = creds;
AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";
var year = 2018;
var title= "Alberto Learns DynamoDB";

// Increment an atomic counter

var parms = {
    TableName: table,
    Key: {
        "year": year,
        "title": title
    },
    UpdateExpression: "set info.rating = info.rating + :val",
    ExpressionAttributeValues: {
        ":val": 1
    },
    ReturnValues: "UPDATED_NEW"
}

console.log("Updating the item...");
docClient.update(parms, function(err, data) {
    if(err) {
        console.error("Unable to update item. Error JSON: ", JSON.stringify(err, null, 2));
    } else {
        console.log("Update item succeeded: ", JSON.stringify(data, null, 2));
    }
});