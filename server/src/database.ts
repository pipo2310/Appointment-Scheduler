import mysql from 'promise-mysql';

const pool = mysql.createPool({
    host: "consultasdb-instance.cqyg0zdcdpb3.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "user-consultas",
    password: "Inge1Proyecto",
    database: "consultasdb"
});

pool.getConnection()
    .then(connection =>{
        pool.releaseConnection(connection);
        console.log('DB ESTÁ CONECTADA');
    });

export default pool;