// a script for hashing the password
import bcrypt from "bcrypt";

export const hashString = async(str: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(str, salt);
    return hash;
  } catch (error) {
    console.log('error in hashString', error);
  }
}


 
