
const path = require('path');
const serverModule = require('./server/server');

const workingDirectory = path.join(__dirname, 'dist');
const config = serverModule.ServerConfig.create(process, 3000, workingDirectory);
const server = serverModule.Server.start(config);
