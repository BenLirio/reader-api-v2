const app = require('express')()
const PORT = process.env.PORT
const cors = require('cors')
const bodyParser = require('body-parser')
const { getText, getAudio, createId, getLogs } = require('./createBuckets')
const analyze = require('./analyze')

app.use(cors())
app.use(bodyParser.json())
if (!PORT) {
  throw new Error('Please enter a port as an env')
}

app.get('/', (req, res) => {
  res.sendStatus(200)
});

app.post('/analyze', async (req, res) => {
  let file = {
    name: req.body.filename,
    id: createId(),
  }
  const bucketArray = await Promise.all([getText(file.id), getAudio(file.id), getLogs(file.id)])
  file.buckets = {
    text: bucketArray[0],
    audio: bucketArray[1],
    logs: bucketArray[2]
  }
  analyze(file)
  res.send(file)
})

app.listen(PORT, () => {
  console.log(`Application listening on ${PORT}`)
})
