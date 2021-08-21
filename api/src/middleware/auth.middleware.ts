import { error } from '@utils/error.utils'
import { getAccessTokenFromRequest, verifyAccessToken } from '@utils/jwt.utils'
import { NextFunction, Request, Response } from 'express'

export const authHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = getAccessTokenFromRequest(req)
        const user = verifyAccessToken(token)

        req.user = user

        next()
    } catch {
        next(new error.Forbidden('auth middleware'))
    }
}