import prisma from '@utils/prisma.utils'
import * as bcrypt from 'bcrypt'
import * as request from 'supertest'
import createServer from '../../index'

const app = createServer()

describe('POST /logout:', function () {
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

    it('Returns 204 on successful logout', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/logout`)
            .set('Authorization', 'Bearer ' + accessToken)
            .send({ refreshToken })
            .expect(204)
            .end(function (err, _res) {
                if (err) return done(err)
                return done()
            })
    })

    it('Returns 403 on unsuccessful logout, bad access token', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/logout`)
            .set('Authorization', 'Bearer ' + accessToken + 'bad')
            .send({ refreshToken })
            .expect(403)
            .end(function (err, _res) {
                if (err) return done(err)
                return done()
            })
    })

    it('Returns 401 on unsuccessful logout, bad refresh token', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/logout`)
            .set('Authorization', 'Bearer ' + accessToken)
            .send({ refreshToken: refreshToken + 'bad' })
            .expect(401)
            .end(function (err, _res) {
                if (err) return done(err)
                return done()
            })
    })
})
