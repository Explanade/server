const { Storage } = require('@google-cloud/storage')

const CLOUD_BUCKET = process.env.GCS_BUCKET

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})

async function deleteFileFromGCS(url) {
  if (!url) return
  let filename = url.split('/').pop()
  try {
    await storage
      .bucket(CLOUD_BUCKET)
      .file(filename)
      .delete()
  } catch (err) {
    throw err
  }
}

module.exports = deleteFileFromGCS


