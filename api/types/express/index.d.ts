declare namespace Express {
    export interface Request {
        user: TokenData
    }
}

interface TokenData {
    id: string
}
