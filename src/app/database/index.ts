import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Permission } from '../models/Permission';
import { User } from '../models/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  database: process.env.DB_NAME || 'lilium',
  username: process.env.DB_USERNAME || 'lilium',
  password: process.env.DB_PASSWORD || 'lilium',
  synchronize: true,
  logging: true,
  entities: [User, Permission],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))