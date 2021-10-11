import prisma from '@utils/prisma.utils'
import * as bcrypt from 'bcrypt'
import { expect } from 'chai'
import * as request from 'supertest'
import createServer from '../../index'

const app = createServer()

describe('POST /token:', function () {
    this.timeout('5s')

    const email = 'test-verified@gmail.com'
    const password = 'password'
    const hashedPassword = bcrypt.hashSync(password, 10)

    let accessToken: string
    let refreshToken: string

    before(async function () {
        try {
            await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    verified: true,
                },
            })
        } catch {}
    })

    beforeEach(function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/login`)
            .send({ email, password })
            .end(function (err, res) {
                if (err) return done(err)
                accessToken = res.body.accessToken
                refreshToken = res.body.refreshToken
                return done()
            })
    })

    it('Returns same access token with valid refresh token and valid access token', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/token`)
            .send({ refreshToken })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.body).to.have.property('accessToken')
                expect(res.body.accessToken).to.have.length.greaterThan(0)
                expect(res.body.accessToken).to.equal(accessToken)
                return done()
            })
    })

    it('Returns new access token with valid refresh token and expired access token', function (done) {
        // Timeout lets login accessToken expire
        setTimeout(function () {
            request(app)
                .post(`${process.env.BASE_URL}/auth/token`)
                .send({ refreshToken })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err)
                    expect(res.body).to.have.property('accessToken')
                    expect(res.body.accessToken).to.have.length.greaterThan(0)
                    expect(res.body.accessToken).to.not.equal(accessToken)
                    return done()
                })
        }, process.env.ACCESS_TOKEN_AGE)
    })

    it('Returns 401 with invalid refresh token', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/token`)
            .send({ refreshToken: refreshToken + 'bad' })
            .expect(401)
            .end(function (err, _res) {
                if (err) return done(err)
                return done()
            })
    })
})
