import { PrismaClient } from '@prisma/client'
import { cache } from '@utils/cache.utils'
import { error } from '@utils/error.utils'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '@utils/jwt.utils'
import * as bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'

const prisma = new PrismaClient()

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (await bcrypt.compare(password, user.password)) {
            const tokenData: TokenData = { id: user.id }
            const accessToken = generateAccessToken(tokenData)
            const refreshToken = generateRefreshToken(tokenData)

            return res.json({ accessToken, refreshToken })
        }

        return next(new error.Unauthorized('/login'))
    } catch {
        return next(new error.Unauthorized('/login'))
    }
}

export const register = async (_req: Request, res: Response, _next: NextFunction) => {
    return res.json('register')
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body
        const { id } = verifyRefreshToken(refreshToken)

        cache.del(id)

        return res.sendStatus(204)
    } catch {
        return next(new error.Unauthorized('/logout'))
    }
}

export const token = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body
        const { id } = verifyRefreshToken(refreshToken)

        // Check cache for current refresh token for user
        const currentRefreshToken = cache.get(id)

        if (!currentRefreshToken || currentRefreshToken !== refreshToken) {
            cache.del(id)
            return next(new error.Unauthorized('/refresh-token'))
        }

        return res.json({ accessToken: generateAccessToken({ id }) })
    } catch {
        return next(new error.Unauthorized('/refresh-token'))
    }
}
