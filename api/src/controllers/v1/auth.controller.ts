import { cache } from '@utils/cache.utils'
import { sendEmailVericationEmail, sendForgotPasswordEmail } from '@utils/email.utils'
import { error } from '@utils/error.utils'
import {
    generateAccessToken,
    generateEmailToken,
    generatePasswordToken,
    generateRefreshToken,
    verifyEmailToken,
    verifyPasswordToken,
    verifyRefreshToken,
} from '@utils/jwt.utils'
import prisma from '@utils/prisma.utils'
import * as bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'

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
            redirect: `/login`,
            flashMessage: 'Your account has been successfully created!',
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
            return next(new error.Unauthorized('/token'))
        }

        return res.json({ accessToken: generateAccessToken({ id }) })
    } catch {
        return next(new error.Unauthorized('/token'))
    }
}

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const emailToken = req.query.token as string
        const { id } = verifyEmailToken(emailToken)

        await prisma.user.update({ where: { id }, data: { verified: true } })

        return res.sendStatus(200)
    } catch {
        return next(new error.BadRequest('/verify-email'))
    }
}

export const forgotPassword = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { email } = req.body

        const user = await prisma.user.findUnique({
            where: { email },
        })

        const passwordToken = generatePasswordToken({ id: user.id }, user.password)

        await sendForgotPasswordEmail(user.email, user.id, passwordToken)
    } catch {
        // Always return successful for security reasons.
    }

    return res.json({
        redirect: `/login`,
        flashMessage: 'An password reset email has been sent to your inbox.',
    })
}

export const resetPassword = async (req: Request, res: Response, _next: NextFunction) => {
    let flashMessage = 'Password reset successful!'

    try {
        const { token: passwordToken, id: resetId } = req.query

        const user = await prisma.user.findUnique({ where: { id: resetId as string } })

        const { id } = verifyPasswordToken(passwordToken as string, user.password)

        if (resetId === id && !!req.body.password) {
            await prisma.user.update({ where: { id }, data: { password: await bcrypt.hash(req.body.password, 10) } })
        }
    } catch {
        flashMessage = 'Password reset failed, please try again.'
    }

    return res.json({
        redirect: `/login`,
        flashMessage,
    })
}
