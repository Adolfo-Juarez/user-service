import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database.ts";

// Definición de atributos del modelo User
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: "client" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

// Atributos opcionales para la creación (id es generado automáticamente)
type UserCreationAttributes = Omit<UserAttributes, 'id'> & { id?: number }

// Definición de la clase del modelo
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: "client" | "admin";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicialización del modelo
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('client', 'admin'),
    allowNull: false,
    defaultValue: 'client'
  }
}, {
  sequelize,
  tableName: 'users',
  modelName: 'User'
});

export default User;
