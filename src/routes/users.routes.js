const express = require('express');
const usersController = require('../controllers/users.controller');
const { verifyToken } = require('../middlewares/authentication.middleware');

const api = express.Router();

api.post('/create', verifyToken, usersController.create);
api.post('/login', usersController.login);
api.put('/update/:id', usersController.update);

module.exports = api;