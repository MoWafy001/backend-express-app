export const loggerMiddleware = (req, res, next) => {
  const methodColor = {
    GET: '\x1b[32m', // Green color for GET method
    POST: '\x1b[34m', // Blue color for POST method
    PUT: '\x1b[35m', // Magenta color for PUT method
    DELETE: '\x1b[31m', // Red color for DELETE method
  }[req.method] || '\x1b[36m'; // Cyan color for other methods

  console.log(`${methodColor}${req.method}\x1b[0m ${req.path}`);
  next();
};
