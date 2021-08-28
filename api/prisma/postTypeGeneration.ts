// Copies the prisma type declaration file to all necessary destinations to be used cross projects

import * as fs from 'fs'

const DESTINATION_FILE_PATHS = ['../../mobile/src/types/prisma/index.d.ts']

const content = `// prettier-ignore\ndeclare module 'prisma' {\n${fs.readFileSync(
    '../node_modules/.prisma/client/index.d.ts',
    'utf-8'
)}\n}`

DESTINATION_FILE_PATHS.forEach((path) => {
    fs.writeFileSync(path, content)
})
