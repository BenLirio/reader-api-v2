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




const { TextToSpeechClient } = require('@google-cloud/text-to-speech')
const textToSpeech = new TextToSpeechClient()
const Vision = require('@google-cloud/vision')
const vision = new Vision.ImageAnnotatorClient()
const analyze = async (file) => {

  // extract text
  const [textDetections] = await vision.textDetection(`gs://reader-images-v2/${file.name}`)
  const [annotation] = textDetections.textAnnotations;
  const text = annotation ? annotation.description : '';
  console.log(`Extracted text from image:`, text);
  buckets.text.file(`${file.id}/test.txt`).save(text)

  // extract audio
  const request = {
    input: { text: text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };
  const [response] = await textToSpeech.synthesizeSpeech(request);
  const audioWriteStream = buckets.audio.file(`${file.id}/audio.mp3`).createWriteStream()
  audioWriteStream.write(response.audioContent)
  audioWriteStream.end()
  return true
}


module.exports = analyze 