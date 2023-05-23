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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.createUser = exports.findByUsernameorEmail = exports.findUsername = exports.findId = exports.findEmail = void 0;
const connect_1 = __importDefault(require("./connect"));
const hashString_1 = require("../utils/hashString");
// retrieve all user related information from the db
const findEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const User = yield connect_1.default.user.findUnique({
        where: {
            email: email
        }
    });
    return User;
});
exports.findEmail = findEmail;
const findId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return connect_1.default.user.findUnique({
        where: {
            userId,
        }
    });
});
exports.findId = findId;
const findUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return connect_1.default.user.findUnique({
        where: {
            username,
        }
    });
});
exports.findUsername = findUsername;
const findByUsernameorEmail = (username, email) => __awaiter(void 0, void 0, void 0, function* () {
    return connect_1.default.user.findFirst({
        where: {
            OR: [
                {
                    username,
                },
                {
                    email,
                }
            ]
        }
    });
});
exports.findByUsernameorEmail = findByUsernameorEmail;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user.password = yield (0, hashString_1.hashString)(user.password);
    return connect_1.default.user.create({
        data: user
    });
});
exports.createUser = createUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return connect_1.default.user.findMany({
        select: {
            userId: true,
            username: true,
            email: true
        },
    });
});
exports.getAllUsers = getAllUsers;
