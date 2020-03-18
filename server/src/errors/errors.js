
function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`Not found - ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    status: err.stack,
  });
}

module.exports = {
  notFound,
  errorHandler,
};
