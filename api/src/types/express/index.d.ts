declare namespace Express {
    export interface Request {
        user: TokenData
    }
}

interface TokenData {
    id: string
}

interface SafeUser {
    email: string
    name: string
}
