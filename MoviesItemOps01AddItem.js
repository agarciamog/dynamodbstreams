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
var title = "Alberto Learns DynamoDB";

var params = {
    TableName:table,
    Item:{
        "year": year,
        "title": title,
        "info":{
            "plot": "Learning leads to success.",
            "rating": 9.9
        }
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});

console.log("Done adding items.");