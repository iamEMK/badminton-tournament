import { PrismaClient } from '@prisma/client'

// Declare a global variable to store the Prisma instance
declare global {
  var prisma: PrismaClient | undefined
}

// Create a new Prisma client instance if one doesn't exist, or use the existing one
const prisma = global.prisma || new PrismaClient()

// In development, attach the Prisma instance to the global object to prevent multiple instances
if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma