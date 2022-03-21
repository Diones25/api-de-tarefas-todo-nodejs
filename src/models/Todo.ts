import { Model, DataTypes } from "sequelize";
import { conn } from '../instances/pg';

export interface TodoInstance extends Model {
    id: number,
    title: string,
    done: boolean
}

export const Todo = conn.define<TodoInstance>('Todo', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
    },
    done: {
        type: DataTypes.BOOLEAN
    }
}, {
    tableName: 'todos',
    timestamps: false
});