import { cache } from '@utils/cache.utils'
import { Request } from 'express'
import * as jwt from 'jsonwebtoken'

export const generateAccessToken = (tokenData: TokenData): string => {
    return jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_AGE | 0,
    })
}

export const generateRefreshToken = (tokenData: TokenData): string => {
    const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_AGE | 0,
    })

    // Save refresh token in cache
    cache.set(tokenData.id, refreshToken)

    return refreshToken
}

export const generateEmailToken = (tokenData: TokenData): string => {
    return jwt.sign(tokenData, process.env.EMAIL_TOKEN_SECRET, {
        expiresIn: process.env.EMAIL_TOKEN_AGE | 0,
    })
}

export const verifyAccessToken = (accessToken: string): TokenData => {
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as TokenData
}

export const verifyRefreshToken = (refreshToken: string): TokenData => {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as TokenData
}

export const verifyEmailToken = (emailToken: string): TokenData => {
    return jwt.verify(emailToken, process.env.EMAIL_TOKEN_SECRET) as TokenData
}

export const getAccessTokenFromRequest = (req: Request) => {
    return req.header('Authorization').replace('Bearer ', '')
}
