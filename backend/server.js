const http = require('http');
// Constants
const PORT = 8080;
// const HOST = '0.0.0.0';
const HOST = 'localhost';

const app = require('./app');

const server = http.createServer(app);

// server.listen(PORT, HOST);
server.listen(PORT);

console.log(`Running on http://${HOST}:${PORT}`);