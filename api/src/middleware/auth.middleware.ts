import { error } from '@utils/error.utils'
import { getAccessTokenFromRequest, verifyAccessToken } from '@utils/jwt.utils'
import { NextFunction, Request, Response } from 'express'

export const authHandler = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const token = getAccessTokenFromRequest(req)
        const user = verifyAccessToken(token)

        req.user = user

        return next()
    } catch {
        return next(new error.Forbidden('auth middleware'))
    }
}
