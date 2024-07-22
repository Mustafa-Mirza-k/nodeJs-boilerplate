export class ApiError extends Error {
  statusCode: number;
  message: string;
  error: Error | null;
  constructor(message: string, statusCode?: number, error?: Error) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
    this.error = error || null;
    this.statusCode = statusCode || 500;
  }
}
