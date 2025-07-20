/** @type {import('drizzle-kit').Config} */
module.exports = {
  schema: "./utils/schema.js", // path to your schema file
  out: "./drizzle",            // output folder for generated SQL
  dialect: "mysql",
  dbCredentials: {
    host: "localhost",         // local machine
    port: 3306,                // default MySQL port
    user: "purva",             // your new local user
    password: "password123",   // your password
    database: "student_db",    // your new DB
  }
};
