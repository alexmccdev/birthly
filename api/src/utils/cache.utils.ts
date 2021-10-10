import * as Cache from 'node-cache'

export const cache = new Cache({ stdTTL: process.env.REFRESH_TOKEN_AGE })

cache.on('set', (key) => {
    if (process.env.ENABLE_LOGGING === 'true') {
        console.log(`New refresh token created for user: ${key}`)
    }
})
cache.on('del', (key) => {
    if (process.env.ENABLE_LOGGING === 'true') {
        console.log(`Refresh token deleted for user: ${key}`)
    }
})
