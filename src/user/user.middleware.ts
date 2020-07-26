/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    console.log('Request...');
    next();
  }
}
