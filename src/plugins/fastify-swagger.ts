import fastifySwagger, { SwaggerOptions } from '@fastify/swagger';
import fastifySwaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { AppConfig } from 'src/config';

export const fastifySwaggerConfig = async (fastify: FastifyInstance, config: AppConfig): Promise<void> => {
  const options: SwaggerOptions = {
    mode: 'dynamic',
    openapi: {
      info: {
        description: config.description,
        title: config.application,
        version: config.version,
      },
    },
  };

  await fastify.register(fastifySwagger, options);
};

export const fastifySwaggerUiConfig = async (fastify: FastifyInstance, config: AppConfig): Promise<void> => {
  const options: FastifySwaggerUiOptions = {
    routePrefix: `${config.path}/docs`,
    staticCSP: true,
    transformStaticCSP: (header: string) => header,
    uiConfig: {
      deepLinking: false,
      docExpansion: 'full',
    },
    uiHooks: {
      onRequest: (request: FastifyRequest, reply: FastifyReply, next: () => void) => {
        next();
      },
      preHandler: (request: FastifyRequest, reply: FastifyReply, next: () => void) => {
        next();
      },
    },
  };

  await fastify.register(fastifySwaggerUi, options);
};
