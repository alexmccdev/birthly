import { PrismaClient } from '@prisma/client'
import { error } from '@utils/error.utils'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '@utils/jwt.utils'
import { NextFunction, Request, Response } from 'express'

const prisma = new PrismaClient()

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body

        const user = await prisma.user.findUnique({
            where: { email },
        })

        const tokenData: TokenData = { id: user.id }
        const accessToken = generateAccessToken(tokenData)
        const refreshToken = generateRefreshToken(tokenData)

        // cache.set(user.id, refreshToken)

        res.json({ accessToken, refreshToken })
    } catch {
        next(new error.Unauthorized('/login'))
    }
}

export const register = async (_req: Request, res: Response, _next: NextFunction) => {
    res.json('register')
}

export const logout = async (_req: Request, res: Response, _next: NextFunction) => {
    res.json('logout')
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body

        const { id } = verifyRefreshToken(refreshToken)

        const newAccessToken = generateAccessToken({ id })
        const newRefreshToken = generateRefreshToken({ id })

        // cache.set(id, newRefreshToken)

        res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken })
    } catch {
        next(new error.Unauthorized('/refresh-token'))
    }
}
