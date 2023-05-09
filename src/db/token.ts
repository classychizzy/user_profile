import { hashString } from "../utils/hashString";
import db from "./connect";
import bcrypt from "bcrypt";

export const findRefreshTokenById =  async (userId: string) => {
    return db.refreshToken.findUnique({
        where: {
            userId,
        }
    });
};
 export const deleteRefreshToken = async (userId: string) => {
        return db.refreshToken.delete({
            where: {
                userId,
        }});
    };

export const deleteAllRefreshTokens = async (userId: string) => {
    return db.refreshToken.deleteMany({
        where: {
            user: {
                userId,
            }
        }});
};

export const addRefreshToken = async (id: string, userId: string, refreshToken: string) => {
    const hashedToken = await hashString(refreshToken);
    return db.refreshToken.create({
        data: {
            id,
            userId,
            hashedToken
        }
    });
};

export const tokenExistsInDb = async (userId: string, refreshToken: string) => {
    const tokenFromDb = await findRefreshTokenById(userId);
    if (!tokenFromDb) {
        return false;
    }
    const match = tokenFromDb && await bcrypt.compare(refreshToken, tokenFromDb.hashedToken);
    return match;
};