import { AppDataSource } from '@/database';
import { generatePassword } from '@/helpers/password';
import { User } from "../models/User";

export class NotFoundError extends Error {
  constructor(msg: string) {
      super(msg);

      Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export const loadUsers = async () => {
  const users = (await AppDataSource.manager.getRepository(User).find());
  return users;
}

export const loadUser = async (id: string) => {
  const user = await AppDataSource.manager.getRepository(User).findOneBy({
    id: parseInt(id),
  })
  return user;
}

export const saveUser = async (user: User) => {
  const {hash, salt } = generatePassword(user.password);

  user.hash = hash;
  user.salt = salt; 

  await AppDataSource.manager.getRepository(User).save(user)
}

export const updatePassword = async (id: string, password: string) => {
  const repository = AppDataSource.manager.getRepository(User);
  const user = await repository.findOneBy({
    id: parseInt(id),
  })  

  const {hash, salt } = generatePassword(password);

  if (user) {
    user.salt = salt;
    user.hash = hash;
    await repository.save(user)
  }
  else
    throw new NotFoundError("User not found");
}

export const removeUser = async (id: string) => {
  const repository = AppDataSource.manager.getRepository(User);
  const user = await repository.findOneBy({
    id: parseInt(id),
  })  
  if (user)
    await repository.remove(user)
  else
    throw new NotFoundError("User not found");
}