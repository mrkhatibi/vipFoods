import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  const hashed = await bcrypt.hash(password, 12);
  return hashed;
};


export const comparePass = async (password , hashedPass) => {
  const compare = await bcrypt.compare(password , hashedPass)
  return compare
}