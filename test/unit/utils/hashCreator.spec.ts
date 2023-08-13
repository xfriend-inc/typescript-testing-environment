import HashCreator from '@helpers/HashCreator';

import { createHashSHA256 } from '../../../src/libs/cryptoAdaptor';
import { createToken, validateToken } from '../../../src/libs/jwtApdaotor';

jest.mock('../../../src/libs/cryptoAdaptor', () => ({
  createHashSHA256: jest.fn(() => 'mocked-hash'),
}));

jest.mock('../../../src/libs/jwtApdaotor', () => ({
  createToken: jest.fn(() => 'mocked-jwt-token'),
  validateToken: jest.fn(() => ({ data: 'payload-data' })),
}));

describe('HashCreator', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const validPayload = {
    username: 'john_doe',
    userId: '12345',
  };

  const invalidPayload = {
    invalid: 'invalid data',
  };

  const validJWTToken = 'valid-jwt-token';
  const invalidJWTToken = 'invalid-jwt-token';

  it('should create a hash', () => {
    const hash = HashCreator.createHash(validPayload);
    expect(hash).toBe('mocked-hash');
    expect(createHashSHA256).toHaveBeenCalledWith(validPayload);
  });

  it('should create a token', () => {
    const token = HashCreator.createToken(validPayload);
    expect(token).toBe('mocked-jwt-token');
    expect(createToken).toHaveBeenCalledWith(validPayload, {
      expiresIn: expect.any(String),
      secretKey: expect.any(String),
    });
  });

  it('should validate a token', () => {
    const payload = HashCreator.validateToken(validJWTToken);
    expect(payload).toEqual({ data: 'payload-data' });
    expect(validateToken).toHaveBeenCalledWith(validJWTToken, expect.any(String));
  });

  it('should throw an error for invalid data when creating a hash', () => {
    expect(() => HashCreator.createHash([])).toThrow('Invalid data object');
  });

  it('should throw an error for invalid payload when creating a token', () => {
    (createToken as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid payload object');
    });

    expect(() => HashCreator.createToken(invalidPayload)).toThrow('Invalid payload object');
  });

  it('should throw an error for invalid token when validating', () => {
    (validateToken as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    expect(() => HashCreator.validateToken(invalidJWTToken)).toThrow('Invalid token');
  });
});
