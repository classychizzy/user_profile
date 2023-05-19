import db from './connect';
import { hashString } from '../utils/hashString';



export const findEmail = async (email: string) => {
    const User = await db.user.findUnique({
        where: {
            email: email
        }
    });
    return User;
};

export const findId = async (userId: string) => {
    return db.user.findUnique({
        where: {
            userId,
        }
    });
}

export const findUsername = async (username: string) => {
    return db.user.findUnique({
        where: {
            username,
        }
    });
} 

export const findByUsernameorEmail = async (username: string, email: string) => {
    return db.user.findFirst({
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
}

export const createUser = async (user: any) => {
    console.log("userObject:",user);
    user.password = await hashString(user.password);
    
    return await db.user.create({
        // optional chaining property (?) is used to check if the parent object is defined
        data: user,
            
        });
    };
        

export const getAllUsers = async () => {
    return db.user.findMany({
        select: {
            userId: true,
            username: true,
            email: true
        },

    });
};