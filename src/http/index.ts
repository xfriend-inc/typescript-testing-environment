/* eslint-disable no-console */
import config from '../config';
import { build } from './server';

export async function init() {
  const server = await build();

  const { host, port, path } = config;
  server.listen({ host, port }, function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

  });
}
