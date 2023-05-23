"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRefreshToken = exports.genAccessToken = void 0;
//methods to generate access and refresh tokens
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const genAccessToken = (user) => {
    const { id, email, username } = user;
    const accessToken = jsonwebtoken_1.default.sign({ id, email, username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m'
    });
    return accessToken;
};
exports.genAccessToken = genAccessToken;
const genRefreshToken = (user) => {
    const { id, email, username } = user;
    const refreshToken = jsonwebtoken_1.default.sign({ id, email, username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d'
    });
    return refreshToken;
};
exports.genRefreshToken = genRefreshToken;
