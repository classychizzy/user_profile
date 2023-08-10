import db from './connect';
import { User } from '../utils/interfaces';



export const findEmail = async (email: string) => {
    // implement method for validating email
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

// method to help find the user by username or email. search type is used 
// to indicate if the search is by username or email

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
// find a way to hash password without creating a user
export const createUser = async (user: User) => {
    console.log("userObject:",user);

    
    
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