module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'satish@123',
    DB: 'simple_db',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}