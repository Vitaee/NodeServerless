import { Model } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute, DataTypes } from "sequelize";
import { User } from "./user";

class Project extends Model<
  InferAttributes<Project>,
  InferCreationAttributes<Project>
> {
  declare id: CreationOptional<number>;
  declare ownerId: ForeignKey<User["id"]>;
  declare name: string;

  declare owner?: NonAttribute<User>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}



export const ProjectModel = (sequelize: any, type:any) => { 
  return sequelize.define('projects',
    {
      id: {
        type: type.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new type.STRING(128),
        allowNull: false,
      },
      createdAt: type.DATE,
      updatedAt: type.DATE,
    },
    {
      tableName: "projects",
  });

}


export { Project }

