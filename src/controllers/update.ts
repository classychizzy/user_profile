import db from "../db/connect"
import { Request, Response } from "express";
import { hashString } from "../utils/hashString";



//something is wrong with this code doesn't work as expected

export const UpdateUser = async (req: Request, res: Response) => {
 
  const { username, email, password } = req.body;
  
  const { Id } = req.params;
  const { userId } = req.params;


  // if (isNaN(userID)) {
  //   return res.status(401).json({ message: 'user does not exist' });
  // }

  
    const user = await db.user.findUnique({
      where: {
        userId: userId,
      }
      
      
    });


    if (!user) {
      return res.status(401).json({ message: 'user does not exist' });
    }



  try {
    const dateTime = new Date();
    //password validation is not working properly.
   const hashedPassword = await hashString(user.password);

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(user.email)) {
      return res.status(401).json({ message: 'email is not valid' });
    }


    await db.user.update({
      where: {
        userId,
      },
      data: {
        // || undefined is used to avoid empty string i.e if a value is not added.
        username: username || undefined,
        email: email || undefined,
        updated_at: dateTime,
        password: hashedPassword || undefined,
        },
    }).then((response) => {
      if (response) {
        const result = {
          statusCode: 200,
          success: true,
          message: 'user updated successfully',
          data: response,
        };
        console.log(result);
        return res.status(200).json(response);
        
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
  const {state, city, street} = req.body;
  const { addressId} = req.params 

  const address = await db.address.findUnique({
    where : {
      addressId: parseInt(addressId)
    }
  })

  if (!address) {
    return res.status(401).json({ message: 'address does not exist' });
  } 
  
  try {
    
    await db.address.update({
      where: {
        addressId: address?.addressId
      },
      data: {
        state: state || undefined,
        city: city || undefined,
        street: street || undefined,
      },
    }).then ((response) => {
      if (response) {
        const result = {
          statusCode: 200,
          success: true,
          message: 'address updated successfully',
          data: updateAddress,
        };
        console.log(result);
        return res.status(200).json(response);
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

