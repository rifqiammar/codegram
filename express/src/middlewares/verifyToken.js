import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  console.log("oke");
  if (!authorization) return res.sendStatus(401);
  jwt.verify(authorization, process.env.REFRESH_SECRET_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.username = decoded.username;
    next();
  });
};
