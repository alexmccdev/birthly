import { PrismaClient } from '@prisma/client'
import * as faker from 'faker'

const prisma = new PrismaClient()

const emailsToKeep = ['alexmcc.dev@gmail.com', 'jmbrunner92@gmail.com']

const numberOfUsers = 100

async function main() {
    if (process.env.NODE_ENV !== 'development') {
        return
    }

    // Delete all data
    await prisma.user.deleteMany({
        where: {
            NOT: emailsToKeep.map((email) => {
                return {
                    email,
                }
            }),
        },
    })

    // Create all data
    emailsToKeep.forEach(async (email) => {
        await prisma.user.upsert({
            where: { email },
            update: {},
            create: {
                email: email,
            },
        })
    })

    for (let i = 0; i < numberOfUsers; i++) {
        const email = faker.internet.email()

        await prisma.user.upsert({
            where: { email },
            update: {},
            create: {
                email: faker.internet.email(),
            },
        })
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
