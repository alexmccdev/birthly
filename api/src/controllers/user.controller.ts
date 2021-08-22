import { PrismaClient, User } from '@prisma/client'
import { error } from '@utils/error.utils'
import { NextFunction, Request, Response } from 'express'

const prisma = new PrismaClient()

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
        })
        return res.json(translateToSafeUser(user))
    } catch {
        return next(new error.NotFound('/users/:id'))
    }
}

const translateToSafeUser = (user: User) => {
    return {
        email: user.email,
        name: user.name,
    } as SafeUser
}
