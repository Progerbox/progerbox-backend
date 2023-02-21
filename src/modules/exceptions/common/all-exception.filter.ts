import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationException } from './ValidationException';

interface ResponseException {
  type: string;
  exception: any;
  url: string;
  params: Record<any, any>;
  query: Record<any, any>;
  body: Record<any, any>;
  timestamp: number;
}

const isHttpException = (exception: any): exception is HttpException => {
  return exception instanceof HttpException;
};

const isValidationException = (exception: any): exception is ValidationException => {
  return exception instanceof ValidationException;
};

export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 400;
    const body: ResponseException = {
      type: '',
      exception: null,
      url: request.url,
      params: request.params,
      query: request.query,
      body: request.body,
      timestamp: Date.now(),
    };

    // TODO ApplicationException?

    if (isValidationException(exception)) {
      body.type = 'ValidationException';
      body.exception = exception;
    } else if (isHttpException(exception)) {
      status = exception.getStatus();
      body.type = 'HttpException';
      body.exception = {
        message: exception.message,
      };
    } else {
      body.type = 'UnknownException';
      body.exception = null;
    }

    response.status(status).json(body);
  }
}
