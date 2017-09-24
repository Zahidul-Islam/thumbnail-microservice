const AWS     = require('aws-sdk')
const uuid    = require('uuid/v5')
const logger  = require('winston')

// environment variables
const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    S3_BUCKET_NAME
} = process.env

// aws configuration
AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
})

const readOnlyAnonUserPolicy = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "AddPerm",
        Effect: "Allow",
        Principal: "*",
        Action: "s3:GetObject",
        Resource: `arn:aws:s3:::${S3_BUCKET_NAME}/*`
      }
    ]
  };

// aws s3 configuration
const s3 = new AWS.S3({ region: AWS_REGION })

module.exports = async (file, site) => {
    return new Promise(async (resolve, reject) => {
        try {
            const S3_KEY = uuid(site, uuid.URL)
            const S3_IMAGE_URL = `https://s3-us-west-1.amazonaws.com/${S3_BUCKET_NAME}/${S3_KEY}`

            let exist = await isBucketExists()
            
            logger.info(`IsBucketExists: ${exist}`)

            if(!exist) {
                await createBucket()
                await addBucketPolicy()
            }

            await uploadImage(site, file, S3_KEY)
            resolve(S3_IMAGE_URL) 
        } catch(err) {
            logger.error(err)

            reject(err)
        }
    })    
}

let isBucketExists = () => {
    return new Promise((resolve, reject) => {
        logger.info('checking if bucket exists')

        s3.waitFor('bucketExists', {Bucket: S3_BUCKET_NAME}, (err, data) => {
            if(err) {
                logger.error(err)
                
                resolve(false)
            }
            resolve(true)
        })
    })
}

let createBucket = () => {
    return new Promise((resolve, reject) => {
        logger.info('creating s3 bucket...')

        s3.createBucket({Bucket: S3_BUCKET_NAME}, (err, data) => {
            if(err) {
                logger.error(err)

                reject(err)
            }
            resolve()
        })
    })
}

let addBucketPolicy = () => {
    return new Promise((resolve, reject) => {
        logger.info('adding bucket policy...')

        s3.putBucketPolicy({Bucket: S3_BUCKET_NAME, Policy: JSON.stringify(readOnlyAnonUserPolicy)}, (err, data) => {
            if(err) {
                logger.error(err)

                reject(err)
            }
            resolve()                        
        })
    })
}

let uploadImage = (site, file, s3Key) => {
    return new Promise((resolve, reject) => {
        logger.info('uploading started...')

        let params = {
            Bucket: S3_BUCKET_NAME,
            Key: s3Key,
            Body: file,
            ContentType: 'image/png',            
        }

        s3.putObject(params, (err, data) => {
            if(err) {
                logger.error(err)

                reject(err)
            }
            resolve(true)    
        })
    })
}