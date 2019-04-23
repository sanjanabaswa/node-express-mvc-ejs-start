// Jasmine provides the describe function
// Arg 1- description
// Arg 2 - logic

const request = require('request')
const base_url = 'https://localhost:8089'
describe('Test app', () => {
    describe('Get /User', () => {

        it('returns a status code 200', () => {

            request.get(base_url, (errror, response, body) => {
                expect(response.statusCode).toBe(200)

            })
        })

    })


    describe('Get /account', () => {

        it('returns a status code 200', () => {

            request.get(base_url, (errror, response, body) => {
                expect(response.statusCode).toBe(200)

            })
        })

    })

    describe('Get /Transaction', () => {

        it('returns a status code 200', () => {

            request.get(base_url, (errror, response, body) => {
                expect(response.statusCode).toBe(200)

            })
        })

    })


    describe('Get /category', () => {

        it('returns a status code 200', () => {

            request.get(base_url, (errror, response, body) => {
                expect(response.statusCode).toBe(200)

            })
        })

    })
    describe('Get /dummyurlilovewebapps', () => {

        it('returns a status code 200', () => {

            request.get(base_url, (errror, response, body) => {
                expect(response.statusCode).toBe(404)

            })
        })

    })
})