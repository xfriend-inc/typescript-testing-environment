import config from '../config';
import { createHashSHA256 } from '../libs/cryptoAdaptor';
import { createToken, validateToken } from '../libs/jwtApdaotor';

interface Payload {}

export default abstract class HashCreator {
  private static readonly _SECRET: string = config.auth.jwtSecretKey;
  private static readonly _TOKEN_EXPIRATION: string = config.auth.jwtTokenExpiration;

  private static _isValidObject(data: unknown): data is Payload {
    return typeof data === 'object' && data !== null && !Array.isArray(data);
  }

  static createHash(data: Payload): string {
    if (!HashCreator._isValidObject(data)) {
      throw new Error('Invalid data object');
    }

    return createHashSHA256(data);
  }

  static createToken(payload: Payload): string {
    if (!HashCreator._isValidObject(payload)) {
      throw new Error('Invalid payload object');
    }

    return createToken(payload, {
      expiresIn: HashCreator._TOKEN_EXPIRATION,
      secretKey: HashCreator._SECRET,
    });
  }

  static validateToken(token: string): Payload {
    try {
      const decodedToken: Payload = validateToken(token, HashCreator._SECRET);
      return decodedToken;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
