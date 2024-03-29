const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')

// Env vars

const API_BASE_URL = 'https://mydatabase.com.ng/css/data.json'

// Init cache
let cache = apicache.middleware

router.get('/', cache('2 minutes'), async(req, res, next) => {

    try {
        const apiRes = await needle('get', `${API_BASE_URL}`)
        const data = apiRes.body

        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

module.exports = router