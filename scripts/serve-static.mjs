import http from 'node:http'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

const targetDirArg = process.argv[2] ?? 'deploy-dist'
const portArg = Number(process.argv[3] ?? 8080)
const host = '0.0.0.0'

if (!Number.isInteger(portArg) || portArg <= 0) {
  console.error('Port must be a positive integer.')
  process.exit(1)
}

const baseDir = path.resolve(projectRoot, targetDirArg)

if (!baseDir.startsWith(projectRoot)) {
  console.error('Refusing to serve a directory outside the project root.')
  process.exit(1)
}

if (!fs.existsSync(baseDir) || !fs.statSync(baseDir).isDirectory()) {
  console.error(`Directory not found: ${baseDir}`)
  process.exit(1)
}

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.flac': 'audio/flac',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function getNetworkUrls(port) {
  const interfaces = os.networkInterfaces()
  const urls = []

  for (const entries of Object.values(interfaces)) {
    for (const entry of entries ?? []) {
      if (entry.family === 'IPv4' && !entry.internal) {
        urls.push(`http://${entry.address}:${port}`)
      }
    }
  }

  return urls
}

function sendFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase()
  const contentType = mimeTypes[ext] ?? 'application/octet-stream'

  res.writeHead(200, { 'Content-Type': contentType })
  fs.createReadStream(filePath).pipe(res)
}

const server = http.createServer((req, res) => {
  const requestPath = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`).pathname
  const safePath = path.normalize(decodeURIComponent(requestPath)).replace(/^(\.\.[/\\])+/, '')
  let filePath = path.join(baseDir, safePath)

  if (!filePath.startsWith(baseDir)) {
    res.writeHead(403)
    res.end('Forbidden')
    return
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html')
  }

  if (!fs.existsSync(filePath)) {
    const spaEntry = path.join(baseDir, 'index.html')
    if (fs.existsSync(spaEntry)) {
      sendFile(spaEntry, res)
      return
    }

    res.writeHead(404)
    res.end('Not found')
    return
  }

  sendFile(filePath, res)
})

server.listen(portArg, host, () => {
  console.log(`Serving ${baseDir}`)
  console.log(`Local:   http://localhost:${portArg}`)
  for (const url of getNetworkUrls(portArg)) {
    console.log(`Network: ${url}`)
  }
})
