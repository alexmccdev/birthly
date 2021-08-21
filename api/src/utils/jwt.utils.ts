import { Request } from 'express'
import * as jwt from 'jsonwebtoken'

const ACCESS_TOKEN_AGE = 60 // 60 seconds
const REFRESH_TOKEN_AGE = 3 * 24 * 60 * 60 // 3 days

export const generateAccessToken = (tokenData: TokenData): string => {
    return jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_AGE,
    })
}

export const generateRefreshToken = (tokenData: TokenData): string => {
    return jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_AGE,
    })
}

export const verifyAccessToken = (accessToken: string): TokenData => {
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as TokenData
}

export const verifyRefreshToken = (refreshToken: string): TokenData => {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as TokenData
}

export const getAccessTokenFromRequest = (req: Request) => {
    return req.header('Authorization').replace('Bearer ', '')
}
