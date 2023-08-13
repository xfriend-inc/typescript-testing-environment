import fastify from 'fastify';

import config from '../config';
import { registerPlugins } from '../plugins';

export const build = () => {
  const server = fastify({
    logger: true,
  });

  registerPlugins(server, config);

  return server;
};
