import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationsMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  Model,
  Optional,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  ForeignKey,
} from "sequelize";
import { Project } from "./project";


type UserAttributes = {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

type UserCreationAttributes = Optional<UserAttributes, "id">;

class User extends  Model<InferAttributes<User, { omit: 'projects' }>, InferCreationAttributes<User, { omit: 'projects' }>>  {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getProjects: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
  declare addProject: HasManyAddAssociationMixin<Project, number>;
  declare addProjects: HasManyAddAssociationsMixin<Project, number>;
  declare setProjects: HasManySetAssociationsMixin<Project, number>;
  declare removeProject: HasManyRemoveAssociationMixin<Project, number>;
  declare removeProjects: HasManyRemoveAssociationsMixin<Project, number>;
  declare hasProject: HasManyHasAssociationMixin<Project, number>;
  declare hasProjects: HasManyHasAssociationsMixin<Project, number>;
  declare countProjects: HasManyCountAssociationsMixin;
  declare createProject: HasManyCreateAssociationMixin<Project, 'ownerId'>;
  declare projects?: NonAttribute<Project[]>;

  declare static associations: {
    projects: Association<User, Project>,
  };

}



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
        }
      },
      password: {
        type: type.STRING(128),
        allowNull: false,
        validate: {
          len: { args: [6, 20], msg: "Your password length should between 6 - 20" }
        }
      },
      createdAt: type.DATE,
      updatedAt: type.DATE,
    },
    {
      tableName: 'users',
    }
);
}
export { User };

