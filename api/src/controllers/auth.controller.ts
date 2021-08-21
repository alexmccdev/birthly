import { PrismaClient } from '@prisma/client'
import { cache } from '@utils/cache.utils'
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

        res.json({ accessToken, refreshToken })
    } catch {
        next(new error.Unauthorized('/login'))
    }
}

export const register = async (_req: Request, res: Response, _next: NextFunction) => {
    res.json('register')
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body
        const { id } = verifyRefreshToken(refreshToken)

        cache.del(id)

        res.sendStatus(204)
    } catch {
        next(new error.Unauthorized('/logout'))
    }
}

export const token = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body
        const { id } = verifyRefreshToken(refreshToken)

        // Check cache for current refresh token for user
        const currentRefreshToken = cache.get(id)

        if (!currentRefreshToken || currentRefreshToken !== refreshToken) {
            next(new error.Unauthorized('/refresh-token'))
        }

        res.json({ accessToken: generateAccessToken({ id }) })
    } catch {
        next(new error.Unauthorized('/refresh-token'))
    }
}
