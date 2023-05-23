"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// the seed script is run with the command `npx prisma db seed --preview-feature`
// contains the data to be seeded into the database 
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const now = new Date();
const formattedDate = now.toISOString();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const John = yield prisma.user.upsert({
            where: { email: 'johndoe@mail.com' },
            update: {},
            create: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@mail.com',
                created_at: formattedDate,
                updated_at: formattedDate,
                USERID: 1,
                userprofile: {
                    create: {
                        username: 'jdoe',
                        email: 'johndoe@mail.com',
                        phone_number: '+23488888',
                        address: {
                            create: {
                                state: 'Lagos',
                                city: 'Eti-Osa',
                                street: 'Garnet close',
                            }
                        }
                    }
                }
            }
        });
        console.log(John);
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
