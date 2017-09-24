const webshot = require('webshot')
const logger  = require('winston')

module.exports = (url, tempFilePath, options) => {
    return new Promise((resolve, reject) => {
        logger.info(`Website: ${url}`)
        logger.info(`temp file path: ${tempFilePath}`)
        logger.info(`options: ${JSON.stringify(options)}`)
        
        webshot(url, tempFilePath, options, err => {
            if(err) {
                logger.error(err)
                
                reject(err)
            }
            resolve(true)
        })
    })
}

