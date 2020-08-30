"use strict";
const AWS = require("aws-sdk");

module.exports.deleteBook = async (event, context) => {
  const deleteBookParams = {
    TableName: process.env.DYNAMODB_BOOK_TABLE,
    Key: {
      bookid: event.pathParameters.bookid,
    },
    ReturnValues: "ALL_OLD",
  };

  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const deleteResult = await dynamodb.delete(deleteBookParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Book successfully related: ${deleteResult.Attributes}`,
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "Authorization",
      },
    };
  } catch (deleteError) {
    console.log("There was an error putting the new item.");
    console.log("deleteError", deleteError);
    console.log("deleteBookParams", deleteBookParams);
    return new Error("There was an error putting the new item.");
  }
};
