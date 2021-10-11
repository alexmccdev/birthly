import prisma from '@utils/prisma.utils'
import { expect } from 'chai'
import * as request from 'supertest'
import createServer from '../../index'

const app = createServer()

describe('POST /register:', function () {
    this.timeout('5s')

    const email = 'test@gmail.com'
    const password = 'password'

    before(async function () {
        try {
            await prisma.user.delete({ where: { email } })
        } catch {}
    })

    afterEach(async function () {
        try {
            await prisma.user.delete({ where: { email } })
        } catch {}
    })

    it('Returns object containing redirect and flashMessage on success', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/register`)
            .send({ email, password })
            .expect(200)
            .end(async function (err, res) {
                if (err) return done(err)

                expect(res.body).to.have.property('redirect')
                expect(res.body).to.have.property('flashMessage')

                return done()
            })
    })

    it('Creates a new, unverified user on success', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/register`)
            .send({ email, password })
            .expect(200)
            .end(async function (err) {
                if (err) return done(err)

                try {
                    const newUser = await prisma.user.findUnique({ where: { email } })

                    expect(newUser.email, 'User email').to.equal(email)
                    expect(newUser.password, 'User password').to.have.length.greaterThan(0)
                    expect(newUser.verified, 'User verified').to.equal(false)
                } catch (userErr) {
                    return done(userErr)
                }

                return done()
            })
    })

    it('Returns 400 on unsuccessful register', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/register`)
            .send({ email: '', password: '' })
            .expect(400)
            .end(function (err, _res) {
                if (err) return done(err)
                return done()
            })
    })
})
