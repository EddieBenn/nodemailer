import {DataTypes, Model} from 'sequelize';
import {db} from '../config/db';


export interface UserAttributes {
    id?: string;
    email?: string;
    name?: string;
    password: string;
    otp?: number;
    otp_expiry?: Date;
    createdAt: Date,
    updatedAt: Date
}

export class UserInstance extends Model<UserAttributes> {}

UserInstance.init({
     id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
},
email: {
    type: DataTypes.STRING,
    allowNull: false,
},
name: {
    type: DataTypes.STRING,
    allowNull: false,
},
password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notNull: {
          msg: "Password is required",
        },
        notEmpty: {
          msg: "Password is required",
        },
      },
},
otp:{
    type: DataTypes.INTEGER
},
otp_expiry:{
    type: DataTypes.DATE
},
createdAt: {
    type: DataTypes.DATE    
},
updatedAt: {
    type: DataTypes.DATE    
}

},{
    sequelize: db,
    tableName: 'User'
}
)