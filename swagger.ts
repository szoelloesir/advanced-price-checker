import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Advanced price checker',
      version: '1.0.0',
      description: 'API documentation for Advanced price checker',
    },
  },
  apis: ['./app/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;