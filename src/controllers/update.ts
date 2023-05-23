import db from "../db/connect"
import { hashString } from "../utils/hashString";

// a script that updates the user details
export const updateAddress = async (req: {user: any, body: any}, res: any) => {
    const { state, city, street, user_Id } = req.body;
    try {
        const updatedAddress = await db.address.update({
            where: {
                user_Id,
            },
            data: {
                state,
                city,
                street,
            },
        });
        const result = {
            message: 'Address updated successfully',
            data: updatedAddress,
            status: 201,
        };
        return res.status(201).json(result);
    } catch (error) {
        console.log('error in updateAddress', error);
        return res.status(500).json(error);
    }
}