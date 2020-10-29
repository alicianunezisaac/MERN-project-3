import express from 'express';
import bodyParser from 'body-parser';
import logger from './lib/logger.js';
import mongoose from 'mongoose';

//Middleware
import httpLoggerMiddleware from './middleware/logger-middleware.js';
import jsonResponseMiddleware from './middleware/json-response.js';

// Router
import filmRouter from './route/films.js';

const HOST = '127.0.0.1';
const PORT = 5000;
export const databaseURI = 'mongodb://localhost/koreanfilmsdb';

// Creacion del servidor
const server = express();
mongoose.connect(databaseURI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.use(bodyParser.json());
server.use(httpLoggerMiddleware);
server.use(jsonResponseMiddleware);
server.use(filmRouter);
// Inicializa el servidor
server.listen(
  PORT,
  () =>
    // utilizando el logger de la libreria winston imprimo en consola que el servidor se ha iniciado
    logger.info(`server listening ${JSON.stringify({ HOST, PORT })}`),
  console.log(`Working`),
);
