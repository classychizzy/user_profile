"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// a script to connect to the database
const client_1 = require("@prisma/client");
const db = new client_1.PrismaClient();
exports.default = db;
