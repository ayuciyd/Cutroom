export const errorHandler = (err, req, res, next) => {
  console.error(`[Error Handler] ${err.name || 'Error'}: ${err.message}`);
  
  const statusCode = err.statusCode || err.status || 500;
  const errorMessage = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    data: null,
    error: {
      message: errorMessage,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};
