import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import crypto from 'node:crypto'

const app = express()
const server = createServer(app)
const port = 3000
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
})

const users = [
  {
    id: 1,
    avatarUrl: 'https://img.odcdn.com.br/wp-content/uploads/2024/01/avatar-netlfix.jpg',
    name: 'Aang',
    meta: 'Mestre do Ar',
    auth: false,
    token: ''
  },
  {
    id: 2,
    avatarUrl: 'https://i.pinimg.com/564x/77/7a/79/777a7988329ae744d4a848f57d1bfb0b.jpg',
    name: 'Lol Player',
    meta: 'Gamer',
    auth: false,
    token: ''
  },
  {
    id: 3,
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_F8iednF2gipQEy_1q7dUiAGQA5nARfUJZw&s',
    name: 'Dota Player',
    meta: 'Gamer',
    auth: false,
    token: ''
  }
]

const secureProps = (user) => ({
  id: user.id,
  avatarUrl: user.avatarUrl,
  name: user.name,
  meta: user.meta
})

const sleep = () => {
  return new Promise(resolve => new setTimeout(() => resolve(), 5000))
}

const __dirname  = dirname(fileURLToPath(import.meta.url))

app.use(cors())
app.use(express.json())
io.use((socket, next) => {
  const token = socket.handshake.auth.token
  const user = users.find(user => user.token === token)
  if (!user) {
    return next(new Error('Unauthorized'))
  }
  socket.handshake.auth.user = user
  next()
})

app.get('/me', (req, res) => {
  const {
    token
  } = req.body
  const user = users.find(user => !user.token === token)
  res.send(user)
})

app.get('/hello-world', async (req, res) => {
  console.log('received', Date.now())
  await sleep()
  res.send({ message: 'hello-world' })
})

app.post('/auth', async (req, res) => {
  const user = users.find(user => !user.auth)
  if (!user) {
    return res.status(500).send({ error: true, message: 'usuario nao existe' })
  }
  const token = crypto.randomBytes(16).toString('hex')
  user.auth = true
  user.token = token
  res.send({ token: user.token })
})

app.post('/logout', async (req, res) => {
  console.log(req.body)
  const {
    token
  } = req.body
  const user = users.find(user => user.token === token)
  if (!user) {
    return res.status(500).send({ error: true, message: 'usuario nao existe' })
  }
  user.auth = false
  user.token = ''
  res.send({ success: true })
})

io.on('connection', (socket) => {
  console.log('client connected')
  
  socket.on('disconnect', () => {
    console.log('client has disconected')
  })

  socket.on('message', (mss) => {
    console.log({
      user: socket.handshake.auth.user.name,
      message: mss
    })
    io.emit('message', {
      user: secureProps(socket.handshake.auth.user),
      message: mss
    })
  })
})

server.listen(port, () => {
  console.log(`App is running over port ${port}`)
})
