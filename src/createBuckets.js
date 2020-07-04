const { v4: uuidv4 } = require('uuid')
const { Storage } = require('@google-cloud/storage')

const storage = new Storage()
const BUCKETS = {
  IMAGES: 'gs://reader-images-v2',
  TEXT: 'gs://reader-text-v2',
  AUDIO: 'gs://reader-audio-v2',
  LOGS: 'gs://reader-logs-v2'
}
const buckets = {
  images: storage.bucket(BUCKETS.IMAGES),
  text: storage.bucket(BUCKETS.TEXT),
  audio: storage.bucket(BUCKETS.AUDIO),
  logs: storage.bucket(BUCKETS.LOGS)
}

const createId = (filename) => {
  return uuidv4()
}

const getText = async (id) => {
  const textFolder = buckets.text.file(`${id}/info.txt`)
  try {
    await textFolder.save(`${id} text`)
    return `${BUCKETS.TEXT}/${id}`
  } catch (err) {
    console.log('err', err)
    throw new Error('unable to create text info.txt')
  }
}

const getAudio = async (id) => {
  const audioFolder = buckets.audio.file(`${id}/info.txt`)
  try {
    await audioFolder.save(`${id} audio`)
    return `${BUCKETS.AUDIO}/${id}`
  } catch (err) {
    console.log('err', err)
    throw new Error('unable to create audio info.txt')
  }
}

const getLogs = async (id) => {
  const logsFolder = buckets.logs.file(`${id}/info.txt`)
  try {
    await logsFolder.save(`${id} logs`)
    return `${BUCKETS.LOGS}/${id}`
  } catch (err) {
    console.log('err', err)
    throw new Error('unable to create logs info.txt')
  }
}

module.exports = {
  getText,
  getAudio,
  createId,
  getLogs
}