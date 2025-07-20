import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "purva",
  password: "password123",
  database: "student_db",
  port: 3306,
});

export const db = drizzle(connection);
