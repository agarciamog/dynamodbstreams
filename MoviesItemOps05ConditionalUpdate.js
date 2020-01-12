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

var params = {
    TableName:table,
    Key:{
        "year": year,
        "title": title
    },
    UpdateExpression: "remove info.actors[1]",
    ConditionExpression: "size(info.actors) > :num",
    ExpressionAttributeValues:{
        ":num": 1
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Attempting a conditional update...");
docClient.update(params, function(err, data){
    if(err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Updated item successfully:", JSON.stringify(data, null, 2));
    }
});