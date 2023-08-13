const { exec } = require("child_process");
const pg = require("pg");
const util = require("util");
const { config } = require("dotenv");
const crypto = require("crypto");

const prismaBinary = "./node_modules/.bin/prisma";

module.exports = async () => {
  console.info("\nMontando suíte de testes...");

  config({ path: ".jest/.env.test" });

  console.info("\nCraete schema...");

  global.__SCHEMA__ = `test_${crypto.randomUUID()}`;
  process.env.DATABASE_URL = `${process.env.DATABASE_URL}?schema=${global.__SCHEMA__}`;

  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await client.end();

  const execSync = util.promisify(exec);



  await execSync(`npx prisma migrate deploy`);
  await execSync(`node ./prisma/seeds/index.js`);

  console.info("Suíte pronta. Iniciando testes...\n");
};
