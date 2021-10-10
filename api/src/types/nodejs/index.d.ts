declare namespace NodeJS {
    export interface Process {
        env: {
            NODE_ENV: 'development' | 'test' | 'production'
            SITE_NAME: string

            SERVER_PROTOCOL: 'http' | 'https'
            SERVER_PORT: number
            SERVER_IP: string

            DATABASE_URL: string

            BASE_URL: string
            CLIENT_URL: string

            EMAIL_HOST: string
            EMAIL_PORT: number
            EMAIL_USER: string
            EMAIL_PASSWORD: string

            REFRESH_TOKEN_SECRET: string
            REFRESH_TOKEN_AGE: number
            EMAIL_TOKEN_SECRET: string
            EMAIL_TOKEN_AGE: number
            ACCESS_TOKEN_SECRET: string
            ACCESS_TOKEN_AGE: number
            PASSWORD_RESET_TOKEN_AGE: number

            RATE_LIMIT_WINDOW_LENGTH: number
            RATE_LIMIT_MAX: number

            ENABLE_LOGGING: 'true' | 'false'
        }
    }
}
