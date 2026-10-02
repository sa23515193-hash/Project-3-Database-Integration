function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

function errorHandler(error, req, res, next) {
  console.error(error);

  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error.";

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((item) => item.message)
      .join(", ");
  }

  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid data format.";
  }

  res.status(statusCode).json({
    success: false,
    message
  });
}

module.exports = { notFound, errorHandler };