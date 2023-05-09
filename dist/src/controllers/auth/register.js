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
exports.register = void 0;
//authorization for the user registration
const users_1 = require("../../db/users");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_1.createUser)(req.user);
    if (!user) {
        return res.json({ error: 'registration failed' });
    }
    const data = {
        username: user.username,
        email: user.email,
    };
    res.json(data);
});
exports.register = register;
