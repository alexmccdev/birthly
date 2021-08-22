import { Prisma, PrismaClient } from '@prisma/client'
import { error } from '@utils/error.utils'
import { NextFunction, Request, Response } from 'express'

const prisma = new PrismaClient()

export const getBirths = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const births = await prisma.birth.findMany({ where: { userId: req.user.id } })
        return res.json(births)
    } catch {
        return next(new error.NotFound('/births'))
    }
}

export const getBirth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const birth = await prisma.birth.findUnique({
            where: { userId_id: { userId: req.user.id, id: req.params.id } },
        })
        return res.json(birth)
    } catch {
        return next(new error.NotFound('/births/:id'))
    }
}

export const createBirth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createData: Prisma.BirthUncheckedCreateInput = { ...req.body, userId: req.user.id }

        const birth = await prisma.birth.create({
            data: createData,
        })
        return res.json(birth)
    } catch {
        return next(new error.NotFound('/births/:id'))
    }
}

export const updateBirth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateData: Prisma.BirthUncheckedCreateInput = req.body

        const birth = await prisma.birth.update({
            where: { userId_id: { userId: req.user.id, id: req.params.id } },
            data: updateData,
        })
        return res.json(birth)
    } catch {
        return next(new error.NotFound('/births/:id'))
    }
}

export const deleteBirth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const birth = await prisma.birth.delete({
            where: {
                userId_id: { userId: req.user.id, id: req.params.id },
            },
        })
        return res.json(birth)
    } catch {
        return next(new error.NotFound('/births/:id'))
    }
}
