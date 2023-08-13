import { FastifyInstance } from 'fastify';
import fastifyHealthcheck from 'fastify-healthcheck';
import { AppConfig } from 'src/config';

export const fastifyHealthcheckPlugin = (fastify: FastifyInstance, config: AppConfig) => {
  fastify.register(fastifyHealthcheck, {
    healthcheckUrl: `${config.path}/healthcheck`,
  });
};
