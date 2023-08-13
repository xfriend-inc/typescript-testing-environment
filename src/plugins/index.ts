/* eslint-disable prettier/prettier */
import { FastifyInstance } from 'fastify';
import { AppConfig } from 'src/config';

import { fastifyCorsPlugin } from './fastify-cors';
import { fastifyHealthcheckPlugin } from './fastify-healthcheck';
import { fastifySwaggerConfig, fastifySwaggerUiConfig } from './fastify-swagger';

const plugins = [
  fastifySwaggerConfig,
  fastifySwaggerUiConfig,
  fastifyCorsPlugin,
  fastifyHealthcheckPlugin,
];

export const registerPlugins = (fastify: FastifyInstance, config: AppConfig) => {
  plugins.forEach((plugin) => plugin(fastify, config));
};
