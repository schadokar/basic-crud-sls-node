"use strict";
const AWS = require("aws-sdk");

module.exports.updateBook = async (event, context) => {
  // extract title and author
  const body = JSON.parse(event.body);

  const { title, author } = body;

  // check the title and author type
  if (typeof title !== "string" || typeof author !== "string") {
    return {
      statusCode: 400,
      body: `Couldn\'t update the book item. Type of title or author is not correct.`,
    };
  }

  // book update object
  const updateBookParams = {
    TableName: process.env.DYNAMODB_BOOK_TABLE,
    Key: {
      bookid: event.pathParameters.bookid,
    },
    ConditionExpression: "attribute_exists(bookid)",
    ExpressionAttributeNames: {
      "#title": "title",
      "#author": "author",
    },
    ExpressionAttributeValues: {
      ":title": title,
      ":author": author,
    },
    UpdateExpression: "SET #title = :title, #author = :author",
    ReturnValues: "UPDATED_NEW",
  };

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  try {
    const updateResult = await dynamodb.update(updateBookParams).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(updateResult.Attributes),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 501,
      body: `Couldn\'t update the book item. ${error}`,
    };
  }
};
