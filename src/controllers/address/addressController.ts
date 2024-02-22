import db from "../../db/connect"
// import users

import {Request, Response} from "express";

export const registerAddress = async (req: Request, res: Response) => {
  // find the user by username or email
  const {userId} = req.params;

  // link the address to a userid
  const user = await db.user.findUnique({
    where: {
      userId: userId,
    }
  });


  const data = {
    state: req.body.state,
    city: req.body.city,
    street: req.body.street,
  };

try {
  if (user) {
    await db.address.create({
      data: {
        ...data,
        user: {
          connect: {
            userId: user.userId,
          },
        },
      },
    }).then((response) => {
      if (response) {
        const result = {
          statusCode: 200,
          success: true,
          message: 'address created successfully',
          data: response,
        };
        return res.status(200).json(result);
      }
    });
  }
  
 
}
catch (err) {

  let errorMessage = ' internal server Error';

  if (err instanceof Error) {
    errorMessage = err.message;
  }
  const result = {
    statusCode: 500,
    success: false,
    message: `address not created + ${errorMessage}`,
    data: null,
  };
  return res.status(500).json(result);
}

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
    catch (err) {

      let errorMessage = 'internal server error';

      if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      const result = {
        statusCode: 500,
        success: false,
        message: `address not updated + ${errorMessage}`,
        data: null,
      };
      return res.status(500).json(result);
    }
}

