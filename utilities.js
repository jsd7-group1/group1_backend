// use JWT authentication to create, sign and verify tokens
const jwt = require("jsonwebtoken");

// define the middleware function that has access to the request object,
// the response object, and the next middleware function in the app's request-response cycle.
function authenticateToken(req, res, next) {
  // retrieve the authorization header from the incoming request.
  // The authorization header contains the word Bearer followed by the token.
  const authHeader = req.headers["authorization"];
  // This line checks if the authHeader exists. If it does,
  // it splits the header value by spaces and takes the second part, which should be the token itself.
  const token = authHeader && authHeader.split(" ")[1];
  // This line checks if the token is not present. If there is no token,
  // it sends a 401 Unauthorized status code as the response,
  // indicating that the request cannot proceed because the client is not authenticated.
  console.log(`access token: ${token}`);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // check for error, assign successfully verified user information to req.user
    if (err) return res.sendStatus(401);
    console.log(user);
    req.user = user;
    next();
  });
}

// export the authenticateToken to be used in route definitions to protect certain endpoints
module.exports = {
  authenticateToken,
};
