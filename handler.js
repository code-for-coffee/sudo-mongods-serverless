import uuid from 'uuid';
import AWS from 'aws-sdk';
import { success, failure } from './utils/responseUtils';

AWS.config.update({ region: process.env.REGION });
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const productsTable = process.env.PRODUCTS_TABLE;

/**
 * Creates a product.
 * @param event
 * @param context
 * @param callback
 * @returns {Promise.<void>}
 */
export async function createProduct (event, context, callback) {
  const requestBody = JSON.parse(event.body);

  const params = {
    TableName: productsTable,
    Item: {
      id: uuid.v1(),
      name: requestBody.name,
      tags: requestBody.tags,
      flavours: requestBody.flavours,
      percentageRange: requestBody.percentageRange,
      createdAt: new Date().getTime(),
    },
  };

  dynamoDb.put(params, (err, data) => {
    if (err) {
      callback(null, failure({err, data}));
      return;
    }

    // Successful
    callback(null, success(params.Item));
  });
}

/**
 * Fetch a list of products.
 * @param event
 * @param context
 * @param callback
 * @returns {Promise.<void>}
 */
export async function listProducts (event, context, callback) {
  const params = {
    TableName: productsTable
  };

  dynamoDb.scan(params, (err, data) => {
    if (err) {
      callback(null, failure({err, data}));
      return;
    }

    // Successful
    callback(null, success(data));
  });
}

/**
 * Get a product by uuid.
 * @param event
 * @param context
 * @param callback
 * @returns {Promise.<void>}
 */
export async function getProduct (event, context, callback) {
  const params = {
    TableName: productsTable,
    Key: {
      id: event.pathParameters.id
    }
  };

  dynamoDb.get(params, (err, result) => {
    if (err) {
      callback(null, failure({err, result}));
      return;
    }

    // Successful
    callback(null, success(result.Item));
  });
}

/**
 * Update product by uuid.
 * @param event
 * @param context
 * @param callback
 * @returns {Promise.<void>}
 */
export async function updateProduct (event, context, callback) {
  const requestBody = JSON.parse(event.body);

  const params = {
    TableName: productsTable,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeValues: {
      ':name': requestBody.name,
      ':tags': requestBody.tags,
      ':flavours': requestBody.flavours,
      ':percentageRange': requestBody.percentageRange,
      ':updatedAt': new Date().getTime(),
    },
    UpdateExpression: 'SET name = :name, tags = :tags, flavours = :flavours, percentageRange = :percentageRange, updatedAt = :updatedAt',
    ReturnVAlues: 'ALL_NEW'
  };

  dynamoDb.update(params, (err, result) => {
    if (err) {
      callback(null, failure({err, result}));
      return;
    }

    // Successful
    callback(null, success(result.Attributes));
  });
}

/**
 * Delete product by uuid.
 * @param event
 * @param context
 * @param callback
 * @returns {Promise.<void>}
 */
export async function deleteProduct (event, context, callback) {
  const params = {
    TableName: productsTable,
    Key: {
      id: event.pathParameters.id
    }
  };

  dynamoDb.delete(params, (err, result) => {
    if (err) {
      callback(null, failure({err, result}));
      return;
    }

    // Successful
    callback(null, success());
  });
}