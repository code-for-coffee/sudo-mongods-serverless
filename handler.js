import uuid from 'uuid';
import AWS from 'aws-sdk';
import { success, failure } from './utils/responseUtils';

AWS.config.update({ region: process.env.REGION });
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const categoriesTable = process.env.CATEGORIES_TABLE;
const flavoursTable = process.env.FLAVOURS_TABLE;

export async function createCategory (event, context, callback) {
  const requestBody = JSON.parse(event.body);

  const params = {
    TableName: categoriesTable,
    Item: {
      id: uuid.v1(),
      name: requestBody.name,
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

export async function listCategories (event, context, callback) {
  const params = {
    TableName: categoriesTable
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

export async function getCategory (event, context, callback) {
  const params = {
    TableName: categoriesTable,
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

export async function updateCategory (event, context, callback) {
  const requestBody = JSON.parse(event.body);

  const params = {
    TableName: categoriesTable,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeValues: {
      ':name': requestBody.name,
      ':updatedAt': new Date().getTime(),
    },
    UpdateExpression: 'SET name = :name, updatedAt = :updatedAt',
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

export async function deleteCategory (event, context, callback) {
  const params = {
    TableName: categoriesTable,
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

export async function createFlavour (event, context, callback) {
  const requestBody = JSON.parse(event.body);

  const params = {
    TableName: categoriesTable,
    Item: {
      id: uuid.v1(),
      scent: requestBody.scent,
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

export async function listFlavours (event, context, callback) {
  const params = {
    TableName: categoriesTable
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

export async function getFlavour (event, context, callback) {
  const params = {
    TableName: categoriesTable,
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

export async function updateFlavour (event, context, callback) {
  const requestBody = JSON.parse(event.body);

  const params = {
    TableName: categoriesTable,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeValues: {
      ':scent': requestBody.scent,
      ':updatedAt': new Date().getTime(),
    },
    UpdateExpression: 'SET scent = :scent, updatedAt = :updatedAt',
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

export async function deleteFlavour (event, context, callback) {
  const params = {
    TableName: categoriesTable,
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