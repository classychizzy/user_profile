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
exports.login = void 0;
const users_1 = require("../../db/users");
const gentoken_1 = require("../../utils/gentoken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.username) {
            return res.status(400).json({ error: "No Username provided" });
        }
        if (!req.body.password) {
            return res.status(400).json({ error: "No Password provided" });
        }
        if (!req.body.email) {
            return res.status(400).json({ error: "No email provided" });
        }
        const { username, password } = req.body;
        // user can be validated by email or password
        const user = yield (0, users_1.findByUsernameorEmail)(username, username);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const accesstoken = (0, gentoken_1.genAccessToken)(user);
    }
    catch (err) {
        console.log(err);
        res.json({ err: "failed to load user" });
    }
});
exports.login = login;
