import { randomUUID } from "crypto";
import { Request, Response } from "express";
import {addRefreshToken, deleteRefreshToken  } from "../../db/token";
import { genRefreshToken, genAccessToken } from "../../utils/gentoken";

const refreshAccessToken = async (req: Request, res: Response) => {
    const user = req.user;
    const newTokenId = randomUUID();
    const newRefreshToken = genRefreshToken(user);

    req.cookies("refreshToken", newRefreshToken, {
        httpOnly: true,
       maxAge: 1000 * 60 * 60 * 24 * 7, //  7days
    });

    // delete old refresh token, the refresh rotation
    deleteRefreshToken(user.jwtid);
    addRefreshToken(newTokenId, user.userId, newRefreshToken);

    const accessToken = genAccessToken(user)
    return res.json({accessToken})

}