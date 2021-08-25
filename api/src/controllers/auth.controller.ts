import { PrismaClient } from '@prisma/client'
import { cache } from '@utils/cache.utils'
import { sendEmailVericationEmail } from '@utils/email.utils'
import { error } from '@utils/error.utils'
import {
    generateAccessToken,
    generateEmailToken,
    generateRefreshToken,
    verifyEmailToken,
    verifyRefreshToken,
} from '@utils/jwt.utils'
import * as bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'

const prisma = new PrismaClient()

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user.verified) {
            return next(new error.Unauthorized('/login'))
        }

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

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await prisma.user.create({
            data: { ...req.body, password: await bcrypt.hash(req.body.password, 10) },
        })

        const emailToken = generateEmailToken({ id: newUser.id })

        await sendEmailVericationEmail(newUser.email, emailToken)

        return res.json({
            redirect: `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_IP}:${process.env.SERVER_PORT}/login`,
        })
    } catch {
        return next(new error.BadRequest('/register'))
    }
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
            return next(new error.Unauthorized('/refreshToken'))
        }

        return res.json({ accessToken: generateAccessToken({ id }) })
    } catch {
        return next(new error.Unauthorized('/refreshToken'))
    }
}

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const emailToken = req.query.token as string
        const { id } = verifyEmailToken(emailToken)

        await prisma.user.update({ where: { id }, data: { verified: true } })

        return res.sendStatus(200)
    } catch {
        return next(new error.BadRequest('/verify'))
    }
}
