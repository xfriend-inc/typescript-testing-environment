import dotenv from 'dotenv';

import packageJson from '../../package.json';
dotenv.config();

const { version, name, description } = packageJson;

interface AuthConfig {
  jwtSecretKey: string | undefined;
  jwtTokenExpiration: string | undefined;
  xAPIKey: string | undefined;
}

const auth: AuthConfig = {
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtTokenExpiration: process.env.JWT_TOKEN_EXPIRATION,
  xAPIKey: process.env.X_API_KEY,
};

export interface AppConfig {
  application: string;
  description: string;
  auth: AuthConfig;
  host: string;
  version: string;
  nodeEnv: string | undefined;
  path: string;
  port: number;
}

const appConfig: AppConfig = {
  application: name,
  description,
  version,
  auth,
  host: process.env.HOST || 'localhost',
  nodeEnv: process.env.NODE_ENV,
  path: `/api/${name.replace(/-/g, '')}`,
  port: Number(process.env.PORT) || 3000,
};

export default appConfig;
