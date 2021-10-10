import { expect } from 'chai'
import * as request from 'supertest'
import createServer from '../../index'

const app = createServer()

describe('POST /login', function () {
    it('Should return refresh and access tokens on successful login', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/login`)
            .send({ email: 'alexmcc.dev@gmail.com', password: 'test' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).to.have.property('accessToken')
                expect(res.body).to.have.property('refreshToken')

                done()
            })
    })

    it('Should return 401 on unsuccessful login', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/login`)
            .send({ email: 'alexmcc.dev@gmail.com', password: 'wrong pw' })
            .expect(401)
            .end((err, _res) => {
                if (err) return done(err)
                done()
            })
    })
})
