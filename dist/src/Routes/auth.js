"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authrouter = void 0;
const express_1 = __importDefault(require("express"));
const register_1 = require("../controllers/auth/register");
exports.Authrouter = express_1.default.Router();
exports.Authrouter.get('auth/home', (req, res) => {
    res.send('welcome to userprofile api');
});
exports.Authrouter.post('/auth/register', register_1.register);
