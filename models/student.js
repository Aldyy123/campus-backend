const {
    Model,
    Sequelize
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        static associate(models) {
            Student.belongsTo(models.User, {
                foreignKey: 'id',
                as: 'user',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
            Student.belongsToMany(models.Lesson, {
                sourceKey: 'id',
                foreignKey: 'favourite_lessons',
                as: 'lessons',
                through: 'StudentLesson',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        }
    }
    Student.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nim: {
            type: DataTypes.INTEGER(20),
            unique: {
                name: 'nim',
                msg: 'Maaf NIM sudah ada'
            },
            allowNull: false,
        },
        classmate: {
            type: DataTypes.CHAR(10),
            allowNull: false,
        },
        major: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_year: {
            type: DataTypes.STRING(9),
            allowNull: false,
        },
        // face_id: {
        //     type: DataTypes.STRING,
        //     unique: {
        //         name: 'face_id',
        //         msg: 'Maaf wajah sepertinya sama dengan mahasiswa lain'
        //     }
        // },
        favourite_lessons: DataTypes.ARRAY(DataTypes.STRING)
    }, {
        sequelize,
        modelName: 'Student',
    })
    return Student
}