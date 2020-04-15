let http = require('http')
let fs = require('fs')
let {parse} = require('querystring')
let i = 0
let j = 0

//let messageLog = ''
//let messageLogTwo = ''

let serveStaticFile = (res, path, contentType, responseCode) => {
	if (!responseCode) responseCode = 200
	fs.readFile(__dirname + path, (err, data) => {
		if (err) {
			res.writeHead(500, {'Content-Type': 'text/plain'})
			res.end('500 Error')
		}
		else {
			res.writeHead(responseCode, {'Content-Type': contentType})
			res.end(data)
		}
	})
}


let getData = (req, res, callback) => {
    	let body = '';
    	req.on('data', chunk => {
        	body += chunk.toString(); // convert Buffer to string
        	//console.log(chunk.toString())
    	});
    	req.on('end', () => {
        	//console.log(chunk)
        	//res.end(`${parse(body).msg}`)
        	callback(body)
    	});
}

const srvr = http.createServer((req, res) => {
	let path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()

	if (req.method === 'POST') {
		getData(req, res, (body) => {
			console.log(body)
			global.messageLog = body
			i++
		})
	}

	else {
		if (path === '') {
			serveStaticFile(res, '/index.html', 'text/html')
		}
		if (path === '/msg') {
			console.log("2nd " + messageLogTwo)
			res.writeHead(200, {'Content-Type': 'text'})
			res.end(messageLogTwo)
		}
	
		else serveStaticFile(res, '/404.html', 'text/html',404)
	}

}).listen(8080)


const scndSrvr = http.createServer((req, res) => {
	let path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()

	if (req.method === 'POST') {
		getData(req, res, (body) => {
			console.log(body)
			global.messageLogTwo = body
			j++
		})
	}

	else {
		if (path === '') {
			serveStaticFile(res, '/index.html', 'text/html')
		}
		if (path === '/msg') {
			console.log("2nd " + messageLog)
			res.writeHead(200, {'Content-Type': 'text'})
			res.end(messageLog)
		}
	
		else serveStaticFile(res, '/404.html', 'text/html',404)
	}

}).listen(8000)