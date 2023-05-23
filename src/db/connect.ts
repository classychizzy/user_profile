// a script to connect to the database
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
export default db