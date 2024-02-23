const {DB_HOST,  DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME} = process.env;


 const mysql = require ('mysql');

var conn = mysql.createConnection({
    host:DB_HOST,
    port:DB_PORT,
    database:DB_NAME,
    user:DB_USERNAME,
    password:DB_PASSWORD,
});

conn.connect( function(err){
    if (err) return console.log(err);
    console.log(DB_NAME+' Database connected successfully!');
});

module.exports = conn;
// export default conn;