import * as request from 'supertest'
import createServer from '../../index'

const app = createServer()

describe('POST /logout', function () {
    let accessToken: string
    let refreshToken: string

    beforeEach(function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/login`)
            .send({ email: 'alexmcc.dev@gmail.com', password: 'test' })
            .end(function (err, res) {
                if (err) return done(err)
                accessToken = res.body.accessToken
                refreshToken = res.body.refreshToken
                done()
            })
    })

    it('Should return 204 on successful logout', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/logout`)
            .set('Authorization', 'Bearer ' + accessToken)
            .send({ refreshToken: refreshToken })
            .expect(204)
            .end(function (err, _res) {
                if (err) return done(err)
                done()
            })
    })

    it('Should return 403 on unsuccessful logout, bad access token', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/logout`)
            .set('Authorization', 'Bearer ' + accessToken + 'bad')
            .send({ refreshToken: refreshToken })
            .expect(403)
            .end(function (err, _res) {
                if (err) return done(err)
                done()
            })
    })

    it('Should return 401 on unsuccessful logout, bad refresh token', function (done) {
        request(app)
            .post(`${process.env.BASE_URL}/auth/logout`)
            .set('Authorization', 'Bearer ' + accessToken)
            .send({ refreshToken: refreshToken + 'bad' })
            .expect(401)
            .end(function (err, _res) {
                if (err) return done(err)
                done()
            })
    })
})
