import {
  CanActivate,
  ExecutionContext,
  Injectable,
  // UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { LoggerService } from '../../logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly logger: LoggerService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.info('Guard: checking authentication');
    // throw new UnauthorizedException();
    // throw new Error('error in auth');
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.header('x-api-key');
    // check the api key in the database
    if (apiKey !== 'SECRET') {
      console.log('Guard: faild authentication');
      return false;
    }
    this.logger.info('Guard: passed authentication');
    return true;
  }
}
