import prisma from '@utils/prisma.utils'
import { expect } from 'chai'
import * as request from 'supertest'
import createServer from '../../index'

const app = createServer()

describe('POST /register', function () {
    this.timeout('5s')

    const email = 'test@gmail.com'
    const password = 'password'

    before(function (done) {
        prisma.user
            .delete({ where: { email } })
            .then(() => done())
            .catch(() => done())
    })

    it('Should return /login redirect and flashMessage on success.', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/register`)
            .send({ email, password })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)

                expect(res.body).to.have.property('redirect')
                expect(res.body).to.have.property('flashMessage')

                done()
            })
    })

    it('Should return 400 on unsuccessful register.', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/register`)
            .send({ email: '', password: '' })
            .expect(400)
            .end(function (err, _res) {
                if (err) return done(err)
                done()
            })
    })

    after(function (done) {
        prisma.user
            .delete({ where: { email } })
            .then(() => done())
            .catch(() => done())
    })
})
