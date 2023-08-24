import {DataSource} from 'typeorm'
import { ToDo } from './Todo.js';
import { copyFileSync } from 'fs';
import { User } from './User.js';
import { Profile } from './Profile.js';
import { Tag } from './Tag.js';
import data from '../data/MOCK_DATA.js';

const dataSource = new DataSource({
    migrations: ['./**/migration/*.ts'],
    type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'gsg_todo',
  entities: [ToDo, User, Profile, Tag],
  synchronize: true,
  logging: true
});

export default {dataSource}