import { randomUUID } from "crypto";
import {addRefreshToken, deleteRefreshToken  } from "../../db/token";
import { genRefreshToken, genAccessToken } from "../../utils/gentoken";

const refreshAccessToken = async (req: any, res: any) => {
    const user = req.user;
    const newTokenId = randomUUID();
    const newRefreshToken = genRefreshToken(user);

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
       maxAge: 1000 * 60 * 60 * 24 * 7, //  7days
    });

    // delete old refresh token
    deleteRefreshToken(user.jwtid);
    addRefreshToken(newTokenId, user.id, newRefreshToken);

    const accessToken = genAccessToken(user);
    return res.json(accessToken);

}