declare namespace NodeJS {
    export interface Process {
        env: {
            NODE_ENV: 'development' | 'test' | 'production'
            SITE_NAME: string
            PORT: number
            IP: string
            DATABASE_URL: string
            CLIENT_URL: string
            REFRESH_TOKEN_SECRET: string
            REFRESH_TOKEN_AGE: number
            EMAIL_TOKEN_SECRET: string
            EMAIL_TOKEN_AGE: number
            ACCESS_TOKEN_SECRET: string
            ACCESS_TOKEN_AGE: number
        }
    }
}
