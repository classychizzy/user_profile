import db from "../db/connect"
import { Request, Response } from "express";
import { hashString } from "../utils/hashString";

//something is wrong with this code doesn't work as expected

export const UpdateUser = async (req: Request, res: Response) => {
  const { username, email, password, userprofileId, addressId } = req.body;
  const { Id } = req.params;
  const { userId } = req.params;


  // if (isNaN(userID)) {
  //   return res.status(401).json({ message: 'user does not exist' });
  // }

  
    const user = await db.user.findFirst({
      where: {
        userId: userId,
      },
      include: {
        userprofile: true,
      },
      
    });



    const address = await db.address.findFirst({
      where: {
        addressId: addressId,
      }
    });

    const userProfile = await db.userprofile.findFirst({
      where: {
        user_Id: userprofileId,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'user does not exist' });
    }



  try {
    const dateTime = new Date();
    const hashedPassword = await hashString(user.password);

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(user.email)) {
      return res.status(401).json({ message: 'email is not valid' });
    }


    await db.user.update({
      where: {
        Id: user?.Id,
      },
      data: {
        username: username,
        email: email,
        updated_at: dateTime,
        password: hashedPassword,
        userprofile: {
          update: {
            first_name: userProfile?.first_name,
            last_name: userProfile?.last_name,
            phone_number: userProfile?.phone_number,
          },
        },
       
      },
    }).then((response) => {
      if (response) {
        const result = {
          statusCode: 200,
          success: true,
          message: 'user updated successfully',
          data: UpdateUser,
        };
        console.log(user);
        return res.status(200).json(result);
        
      }


    })

    // if (password) {
    //   const hashedPassword = await hashString(password);
    //   updateData.password = hashedPassword;
    // }

    // if (userprofile) {
    //   updateData.userprofile = {
    //     set: userprofile,
    //   };
    // }

    
  } catch (err: any) {
    const result = {
      statusCode: 500,
      success: false,
      message: 'user not updated',
      data: err.message,
    };
    return res.status(500).json(result);
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  // insert some code here
}

