import { Model, DataTypes, CreateOptions } from "sequelize";
import sequelize from "../../config/database";
import { hashPassword } from "../../utils/security";

class Users extends Model {
  public id!: number;
  public username!: string;
  public password?: string;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleted_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize,
    timestamps: true,
    freezeTableName: true,
    paranoid: true,
    deletedAt: "deleted_at",
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

Users.addHook("beforeCreate", "hashPassword", async (user: Users) => {
  const hashedPassword = await hashPassword(user.password || "");
  user.password = hashedPassword;
});

Users.afterCreate((user: Users) => {
  delete user.dataValues.password;
});

export default Users;
