import { User } from '@/models/User';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '192.168.1.9',
  port: 5432,
  database: 'lilium',
  username: 'postgres',
  password: 'jdvRojIPlH',
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))