
const fs = require('fs/promises')
const http= require('http')
const path = require('path')

const content =`<h1> Hello World </h1>
<p> This is Neeharika Marella... </p>
`

fs.writeFile('index.html', content , 'utf-8')

const server = http.createServer((req,res)=>{
    let webContentType = 'text/html'
    res.writeHead(200, {'content-type': webContentType})
    fs.readFile(path.join(__dirname, 'index.html'), 'utf-8')
      .then(fileContent => {
        console.log(fileContent)
        res.write(fileContent)
        res.end()
      })
      .catch(err => {
        console.error(err)
        res.end('Error reading file')
      })
})


server.listen(5001,()=>{
    console.log(`http server listening on http://localhost:${5001}/`)
})