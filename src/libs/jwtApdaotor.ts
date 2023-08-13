import jwt from 'jsonwebtoken';

export function createToken(payload, { expiresIn, secretKey }) {
  const token = jwt.sign(payload, secretKey, {
    expiresIn,
  });
  return token;
}

export function validateToken(token, secretKey) {
  const decodedToken = jwt.verify(token, secretKey);
  return decodedToken;
}
