import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  const errorStatus = 500;
  const errorMessage = err?.message || 'An unexpected error occurred';

  res.status(errorStatus).json({
    success: false,
    message: errorMessage,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
};

export default errorHandler;
