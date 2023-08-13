import fastifyCors from '@fastify/cors';
import { FastifyInstance } from 'fastify';

export const fastifyCorsPlugin = (fastify: FastifyInstance) => {
  fastify.register(fastifyCors, {
    origin: '*',
  });
};
