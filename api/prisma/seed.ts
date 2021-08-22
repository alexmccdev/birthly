import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import * as faker from 'faker'

const prisma = new PrismaClient()

const EMAILS_TO_KEEP = ['alexmcc.dev@gmail.com', 'jmbrunner92@gmail.com']
const TEST_PASSWORD = 'test'
const HASH_ROUNDS = 10

const NUM_TEST_USERS = 100
const MAX_BIRTHS_PER_USER = 20

const deleteAllData = async () => {
    await prisma.birth.deleteMany()
    await prisma.user.deleteMany()
}

const getRandomListOfBirths = (numberOfBirths: number) => {
    let births = []

    for (let i = 0; i < numberOfBirths; i++) {
        const dateTime = faker.date.past()
        births.push({
            date: dateTime,
            time: dateTime,
        })
    }

    return births
}

async function main() {
    if (process.env.NODE_ENV !== 'development') {
        return
    }

    await deleteAllData()

    // Create data for emails to keep
    EMAILS_TO_KEEP.forEach(async (email) => {
        const births = getRandomListOfBirths(20)

        await prisma.user.upsert({
            where: { email },
            update: {
                births: {
                    create: births,
                },
            },
            create: {
                email: email,
                password: await bcrypt.hash(TEST_PASSWORD, HASH_ROUNDS),
                births: {
                    create: births,
                },
            },
        })
    })

    // Create data for random users
    for (let i = 0; i < NUM_TEST_USERS; i++) {
        const email = faker.internet.email()

        let births = getRandomListOfBirths(faker.datatype.number(MAX_BIRTHS_PER_USER))

        await prisma.user.upsert({
            where: { email },
            update: {
                births: {
                    create: births,
                },
            },
            create: {
                email: faker.internet.email(),
                name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                password: await bcrypt.hash(TEST_PASSWORD, HASH_ROUNDS),
                births: {
                    create: births,
                },
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
