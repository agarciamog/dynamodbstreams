var AWS = require("aws-sdk");
AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: "adminuser"});
AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
});

var params = {
    TableName: "Movies",
    ProjectionExpression: "#yr, title, info.rating",
    FilterExpression: "#yr between :start_yr and :end_yr",
    ExpressionAttributeNames: {
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":start_yr": 1950,
        ":end_yr": 1959
    }
}

var docClient = new AWS.DynamoDB.DocumentClient();
docClient.scan(params, onScan);

function onScan(err, data) {
    if(err) {
        console.error("Scan failed:", JSON.stringify(err, null, 2));
    } else {
        console.log("Scan succeeded.");
        data.Items.forEach(function(movie){
            console.log(movie.year + ": ", movie.title, "- rating:", movie.info.rating);
        });
    }
}