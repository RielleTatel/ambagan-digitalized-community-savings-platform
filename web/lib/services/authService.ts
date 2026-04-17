import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { createUser, findUserByEmail } from "../repositories/userRepo";

const JWT_SECRET = "your-secret-key"; 

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const existing = await findUserByEmail(data.email);

  if (existing) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await createUser({
    ...data,
    password: hashedPassword,
  });

  return user;
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
}