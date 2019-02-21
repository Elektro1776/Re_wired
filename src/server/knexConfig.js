import settings from '../settings';

export const development = {
  client: settings.db.client,
  connection: settings.db.connection.development,
  pool: settings.db.pool,
  seeds: {
    directory: './database/seeds'
  },
  migrations: {
    directory: './database/migrations'
  },
  useNullAsDefault: true
};

export const production = {
  client: settings.db.client,
  connection: settings.db.connection.production,
  pool: settings.db.pool,
  seeds: {
    directory: './database/seeds'
  },
  migrations: {
    directory: './database/migrations'
  },
  useNullAsDefault: true
};

export const test = {
  client: 'sqlite3',
  connection: {
    filename: ':memory:'
  },
  seeds: {
    directory: './database/seeds'
  },
  migrations: {
    directory: './database/migrations'
  },
  useNullAsDefault: true
};
