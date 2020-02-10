const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require('mongoose');

const app = express();
const userRoutes = require('./src/routes/users.routes');

const swaggerDefinition = {
  info: {
    title: "Microservicio de usuarios",
    version: "1.0.0",
    description: "Documentación del microservicio"
  },
  host: "http://10.74.4.22:30308",
  basePath: "/api/users",
  /* securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header"
    } */
  }

const options = {
  swaggerDefinition,
  apis: ["./src/controllers/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

mongoose.connect("mongodb://localhost:27017/users", (err, res) => {
  if(err) throw err;

  console.log('base de datos usuario corriendo en el puerto 27017');
});

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use('/api/users', userRoutes);

module.exports = app;