const { v4: uuidv4 } = require('uuid')



const createId = (filename) => {
  return uuidv4()
}

const getText = async (file) => {
  await sleep(1000)
  return { ...file, textBucket: `gs://reader-text-v2/${file.id}` }
}

const getAudio = async (file) => {
  sleep(1000)
  return { ...file, audioBucket: `gs://reader-audio-v2/${file.id}` }
}

const getLogs = async (file) => {
  sleep(1000)
  return { ...file, logsBucket: `gs://reader-logs-v2/${file.id}` }
}

module.exports = {
  getText,
  getAudio,
  createId,
  getLogs
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}