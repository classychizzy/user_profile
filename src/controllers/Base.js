import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default class BaseController {
    constructor() {
        this.prisma = prisma;
    }
    
    }

