module.exports = {
    HOST: 'localhost',
    USER:'root',
    PASSWORD:'shivadmin',
    DB:'testdb',
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        acquire:3000,
        idle:10000
    }
};