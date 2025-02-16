#! /usr/bin/env node
require('dotenv').config();

const { Client } = require('pg');

const SQL = `

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  age VARCHAR(255),
  bio VARCHAR(255)
);

INSERT INTO users (first_name, last_name, email, age, bio) 
VALUES ('John', 'Doe', 'email@email.com', 18, 'This is Johns bio');

`;


async function main() {
    console.log('Seeding...');
    const client = new Client({
        connectionString: `postgresql://${process.env.ROLE_NAME}:${process.env.PASS}@localhost:${process.env.PORT}/${process.env.DATABASE}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
}

main();