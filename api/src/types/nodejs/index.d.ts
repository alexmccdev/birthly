declare namespace NodeJS {
    export interface Process {
        env: {
            NODE_ENV: 'development' | 'test' | 'production'
            SITE_NAME: string
            PORT: number
            DATABASE_URL: string
            REFRESH_TOKEN_SECRET: string
            REFRESH_TOKEN_AGE: number
            ACCESS_TOKEN_SECRET: string
            ACCESS_TOKEN_AGE: number
        }
    }
}
