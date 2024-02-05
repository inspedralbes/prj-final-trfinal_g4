const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, world!');
});

server.listen(5175, 'localhost', () => {
  console.log('Server running at http://localhost:5175/');
});
