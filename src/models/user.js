import bcrypt from 'bcrypt';

const user = (sequelize, DataTypes) => {
    const User =  sequelize.define('user', {
        username:{
            type: DataTypes.STRING,
            unique:true,
            allowNull: false,
            validate:{
                notEmpty:{
                    args:true,
                    msg:'Username field cannot be empty',
                }
            }
        },
       email: {
               type: DataTypes.STRING,
               unique: true,
               allowNull: false,
               validate: {
                   notEmpty: true,
                   isEmail: true
               }
           },
           password: {
               type: DataTypes.STRING,
               allowNull: false,
               validate: {
                   notEmpty: true,
                   len: [7, 42]
               }
           }
       })

    User.associate = models => {
        User.hasMany(models.Message, {onDelete: 'CASCADE'});
    };

    User.beforeCreate(async user => {
        user.password = await user.hashPassword(user.password);
    });

    User.prototype.hashPassword = async function () {
        const saltRounds = 10;
        return await bcrypt.hash(this.password,saltRounds);
    }

    return User;
}


export default user;