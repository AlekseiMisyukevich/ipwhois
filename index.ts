import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import * as http from 'http';
import cors from 'cors';
import debug from 'debug';
import DbClient from './src/db/db';
import { CommonRoutesConfig } from './src/routes/common.routes.config';
import { LookupRoutes } from './src/routes/lookup.routes.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const debugLog: debug.IDebugger = debug('app');
const port = process.env.NODE_DOCKER_PORT;
const routes: Array<CommonRoutesConfig> = [];

DbClient.connect()
  .then(() => {
    debugLog(`Connection with database established`)
    DbClient.createCollections()
      .then(() => debugLog('Collections fetched'))
      .catch(err => debugLog(err))
  })
  .catch(err => debugLog(err))

app.use(express.json());
app.use(cors());
routes.push(new LookupRoutes(app));

server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  // our only exception to avoiding console.log(), because we
  // always want to know when the server is done starting up
  debugLog(`Server running at http://localhost:${port}`);
});
