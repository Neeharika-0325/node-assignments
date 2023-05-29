var http = require("http");


const httpServer = http.createServer(handleServer);

function handleServer(req, res) {
    // console.log(req.url)
  if(req.url ==='/welcome'){
    // let webContentType = 'text/plain';
    res.writeHead(200, {'content-type': 'text/plain'})
    res.write('Welcome to Dominos!')
    res.end()
  }if(req.url === '/contact'){
    res.writeHead(200, {'content-type': 'application/json'})
    res.write(JSON.stringify({
        phone: '18602100000', 
        email: 'guestcaredominos@jublfood.com' 
    }))
    res.end()
  }else{
    res.writeHead(404)
    // res.write('Not found')
    res.end()
  }
}



httpServer.listen(8081, ()=>{
    console.log(`http server listening on http://localhost:${8081}/`)
})

module.exports = httpServer;