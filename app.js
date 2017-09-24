const express = require('express')
const fs      = require('fs')
const logger  = require('winston')

const app     = express()

require('dotenv').config()

const screenshot = require('./lib/screenshot')
const uploadToS3 = require('./lib/uploadToS3')

const TEMP_THUMBNAIL_FILE_PATH = './temp/temp-thumbnail.png'

let width = 1024, height = 768;

const { PORT } = process.env

app.get('/api/v1/thumbnails', async (req, res) => {
    const { 
        accessKey,
        url,
        size,
        viewport,
        quality = 75,
        renderDelay = 0,
        timeout = 0
    } = req.query

    if(!url) {
        logger.error('Website URL parameter is missing!')
        res.json({ status: 'error', message: 'Website URL parameter is missing!' })
    }
    if(viewport) {
         [width, height] = viewport && viewport.split('x')
    }

    const options = {
        windowSize: { width, height },
        shotSize: size,
        quality,
        renderDelay,
        timeout 
    }

    logger.log(url, TEMP_THUMBNAIL_FILE_PATH, options)

    try {
        await screenshot(url, TEMP_THUMBNAIL_FILE_PATH, options)

        const file = fs.createReadStream(TEMP_THUMBNAIL_FILE_PATH)
        
        const imagePath = await uploadToS3(file, url)
 
        logger.info(`Image uploaded successfully. Image path: ${imagePath}`)

        res.json({ status: 'success', image_url: imagePath }) 
    } catch(error) {
        logger.error(err)

        res.json({ status: 'error', message: error })
    }
})

app.listen(PORT, () => logger.info(`API is running in port: ${PORT}`))