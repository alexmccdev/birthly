import { NextFunction, Request, Response } from 'express'

export const login = async (req: Request, res: Response, next: NextFunction) => {
    res.json('login')
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    res.json('register')
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    res.json('logout')
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    res.json('refresh token')
}
