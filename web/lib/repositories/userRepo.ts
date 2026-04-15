import prisma from "../db/prisma";

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  return prisma.user.create({ data });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}