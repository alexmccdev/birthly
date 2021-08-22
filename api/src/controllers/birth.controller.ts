import { PrismaClient } from '@prisma/client'
import { error } from '@utils/error.utils'
import { NextFunction, Request, Response } from 'express'

const prisma = new PrismaClient()

export const births = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const births = await prisma.birth.findMany({ where: { userId: req.user.id } })
        return res.json(births)
    } catch {
        return next(new error.NotFound('/births'))
    }
}

export const birth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const birth = await prisma.birth.findUnique({
            where: { userId_id: { userId: req.user.id, id: req.params.id } },
        })
        return res.json(birth)
    } catch {
        return next(new error.NotFound('/births/:id'))
    }
}
