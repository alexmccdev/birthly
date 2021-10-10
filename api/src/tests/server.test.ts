import * as request from 'supertest'
import createServer from '../index'

const app = createServer()

describe('Server:', function () {
    it('Runs', function (done) {
        request(app).get(`${process.env.BASE_URL}/`).expect(200, done)
    })
})
