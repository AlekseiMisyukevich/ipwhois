import { CommonRoutesConfig } from './common.routes.config';
import express from 'express';
import QueryParamsMiddleware from '../middleware/ip_lookup.middleware';
import IpLookupController from '../controllers/ip_lookup.controller';

export class LookupRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'LookupRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/lookup/:ipAddr')
      .all(QueryParamsMiddleware.validateIP)
      .post(IpLookupController.saveIPInfo)
      .delete(IpLookupController.delete)    
    return this.app;
  }
}
