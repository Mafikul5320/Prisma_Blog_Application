import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

function ErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid data provided";
  }

  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 400;
      message = "Duplicate field value";
    } else if (err.code === "P2003") {
      statusCode = 400;
      message = "Invalid foreign key";
    } else if (err.code === "P2025") {
      statusCode = 404;
      message = "Record not found";
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? err : undefined,
  });
}

export default ErrorHandler;