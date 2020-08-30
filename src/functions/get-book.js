"use strict";
const AWS = require("aws-sdk");

module.exports.getBook = async (event, context) => {
  const getBookParams = {
    TableName: process.env.DYNAMODB_BOOK_TABLE,
    Key: {
      bookid: event.pathParameters.bookid,
    },
  };

  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const getResult = await dynamodb.get(getBookParams).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: getResult.Item,
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "Authorization",
      },
    };
  } catch (getError) {
    console.log("There was an error putting the new item.");
    console.log("getError", getError);
    console.log("getBookParams", getBookParams);
    return new Error("There was an error putting the new item.");
  }
};
