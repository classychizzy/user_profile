//authorization for the user registration
import { createUser, findByUsernameorEmail } from '../../db/users';


export const register = async (req: {
    body: any, user: any,
}, res: any) => {
    const { username, email, password, userprofile, address } = req.body;
    // check if the email is a valid email
    
    function isValidEmail(email: string): boolean {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      }

  
    try {
        // condition to check if the user already exists
        const user = await findByUsernameorEmail(username, email);
        
        
        if (user) {
            const result = {
                message: 'User already exists',
                data: user,
                status: 409,
            };
            return res.status(409).json(result);
        }

        // create a new user
        if (!user) {
    
            // check if the email is a valid email
            if (!isValidEmail(email)) {
                const result = {
                    message: 'Invalid email',
                    status: 400,
                };
                return res.status(400).json(result);
            }
             
            const user  = await createUser({
                username,
                email,
                password,
                userprofile: {
                    create: {
                        first_name: userprofile.first_name,
                        last_name: userprofile.last_name,
                        phone_number: userprofile.phone_number,
                    },  
                },
                address: {
                    create: {
                        state: address?.state,
                        city: address?.city,
                        street: address?.street,
                    
                    }
                }
                  
                
            })
            .then ((response) => {
                const result = {
                    message: 'User created successfully',
                    data: response,
                    status: 201,
                };
                return res.status(201).json(result);
            }
            );
        }
    } catch (error) {
        console.log('error in register', error);

        return res.status(500).json(error);
    }
};