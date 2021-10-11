import * as bcrypt from 'bcrypt'
import { expect } from 'chai'
import * as request from 'supertest'
import createServer from '../../index'
import prisma from '../../utils/prisma.utils'

const app = createServer()

describe('POST /login:', function () {
    const verifiedEmail = 'test-verified@gmail.com'
    const unverifiedEmail = 'test-unverified@gmail.com'
    const password = 'password'
    const hashedPassword = bcrypt.hashSync(password, 10)

    before(async function () {
        try {
            await prisma.user.createMany({
                data: [
                    {
                        email: verifiedEmail,
                        password: hashedPassword,
                        verified: true,
                    },
                    {
                        email: unverifiedEmail,
                        password: hashedPassword,
                        verified: false,
                    },
                ],
            })
        } catch {}
    })

    after(async function () {
        try {
            await prisma.user.deleteMany({ where: { email: { in: [unverifiedEmail, verifiedEmail] } } })
        } catch {}
    })

    it('Returns refresh and access tokens on verified user successful login', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/login`)
            .send({ email: verifiedEmail, password })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).to.have.property('accessToken')
                expect(res.body).to.have.property('refreshToken')

                return done()
            })
    })

    it('Returns 401 on unverified user login', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/login`)
            .send({ email: unverifiedEmail, password })
            .expect(401)
            .end((err, _res) => {
                if (err) return done(err)
                return done()
            })
    })

    it('Returns 401 on unsuccessful login', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/login`)
            .send({ email: verifiedEmail, password: password + 'wrong' })
            .expect(401)
            .end((err, _res) => {
                if (err) return done(err)
                return done()
            })
    })
})
