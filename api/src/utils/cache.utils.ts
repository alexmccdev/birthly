import * as Cache from 'node-cache'

export const cache = new Cache()

cache.on('set', (key) => console.log(`New refresh token created for user: ${key}`))
cache.on('del', (key) => console.log(`Refresh token deleted for user: ${key}`))