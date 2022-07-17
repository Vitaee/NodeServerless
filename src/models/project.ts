import { Model } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute, DataTypes, Sequelize } from "sequelize";


export const ProjectModel = (sequelize: Sequelize, type:any) => { 
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


