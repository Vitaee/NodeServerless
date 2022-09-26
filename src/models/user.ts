import { Optional, Sequelize } from "sequelize";


type UserAttributes = {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

type UserCreationAttributes = Optional<UserAttributes, "id">;

export const UsersModel = (sequelize: Sequelize, type:any) => {
  return sequelize.define('users',
    {
      id: {
        type: type.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: type.STRING(128),
        allowNull: false,
        validate: {
          isEmail: true
        },
        unique:true,
        
      },
      username: {
        type: type.STRING(30),
        allowNull: true,
        validate: {
          len: { args: [5, 20], msg: "Your username length should between 5 - 20 characters."}
        }
      },
      password: {
        type: type.STRING(128),
        allowNull: false,
        
      },
      createdAt: type.DATE,
      updatedAt: type.DATE,
    },
    {
      tableName: 'users',
    }
);
}