"use strict";
const AWS = require("aws-sdk");
const uuid = require("uuid");

module.exports.createBook = async (event, context) => {
  // extract title and author
  const body = JSON.parse(event.body);
  const { title, author } = body;
  // create a random bookid
  const bookid = uuid.v1();

  // create new book object
  const newBookParams = {
    TableName: process.env.DYNAMODB_BOOK_TABLE,
    Item: {
      bookid,
      title,
      author,
    },
    ReturnValues: "ALL_OLD",
  };

  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const putResult = await dynamodb.put(newBookParams).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: `Book successfully created: ${bookid}`,
        result: putResult,
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "Authorization",
      },
    };
  } catch (putError) {
    console.log("There was an error putting the new item.");
    console.log("putError", putError);
    console.log("newBookParams", newBookParams);
    return new Error("There was an error putting the new item.");
  }
};
