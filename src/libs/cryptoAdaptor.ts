import crypto from 'crypto';

export function createHashSHA256(data) {
  const jsonData = JSON.stringify(data);
  const hash = crypto.createHash('sha256').update(jsonData).digest('hex');
  return hash;
}
