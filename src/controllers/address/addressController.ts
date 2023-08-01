import db from "../../db/connect"
import { findByUsernameorEmail } from "../../db/users";
import {Request, Response} from "express";

export const registerAddress = async (req: Request, res: Response) => {
  // find the user by username or email
  const { username, email } = req.body

  await findByUsernameorEmail(username, email)

}

export const updateAddress = async (req: Request, res: Response) => {
  
    const {state, city, street} = req.body;
    
    const { userId } = req.params;
   
    const user = await db.user.findUnique({
      where: {
        userId: userId,
      },
      include: {
        address: true,
      }

    });
    
    if (!user) {
      return res.status(401).json({ message: `there's no user with this address` });
    } 
    
    try {
      
      await db.user.update({
        where: {
          userId,
        },
        data: {
          address: {
            update: {
          state: state || undefined,
          city: city || undefined,
          street: street || undefined,
            },
          },
        },
      }).then ((response) => {
        if (response) {
          const result = {
            statusCode: 200,
            success: true,
            message: 'address updated successfully',
            data: user.address
          };
          
          console.log(result);
          return res.status(200).json(result);
        }
      }
      )
    }
    catch (err: any) {
      const result = {
        statusCode: 500,
        success: false,
        message: 'address not updated',
        data: err.message,
      };
      return res.status(500).json(result);
    }
}
