import * as bodyParser from "body-parser";
import * as express from "express";
import * as debug from "debug";
import * as path from "path";
import * as http from 'http';

import { connect as connectToMongoDB } from './data/mongodb';
import { ApiRouter } from './routes/apiRouter';

const log = debug("CMS:Server");

export class ServerConfig {
    process: NodeJS.Process;
    port: number;
    workingDirectory: string;

    public static create(process: NodeJS.Process, port: number, workingDirectory: string) {
        const config = new ServerConfig();
        config.process = process;
        config.port = port;
        config.workingDirectory = workingDirectory;

        return config;
    }
}

export class Server {
    public app: express.Application;
    public server: http.Server;
    private apiRouter: ApiRouter;
    private apiRouteHandler: express.Router;

    public static start(config: ServerConfig): Server {
        return new Server(config.process, config.port, config.workingDirectory);
    }

    private constructor(private process: NodeJS.Process, private fallbackPort: number, private workingDirectory: string) {
        this.connectDatabase();
        this.createApiHandler();
        this.createExpressApplication();
        this.configureApplication();
        this.configureRoutes();
        this.setApplicationPort();
        this.createServer();
        this.startListening();
    }

    private getPort(): string | number {
        return this.normalizePort(this.process.env['PORT'] || this.fallbackPort);
    }

    private connectDatabase() {
        connectToMongoDB();
    }

    private createApiHandler() {
        this.apiRouter = new ApiRouter();
        this.apiRouteHandler = this.apiRouter.createRouteHandler();
    }

    private createExpressApplication() {
        this.app = express();
    }

    private configureApplication() {
        // Parsers for POST data
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Point static path to dist
        this.app.use(express.static(this.workingDirectory));

        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "http://localhost:4200");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            next();
        });
    }

    private configureRoutes() {
        //create routes
        this.app.use('/', this.apiRouteHandler);

        // Catch all other routes and return the index file
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(this.workingDirectory, 'index.html'));
        });
    }

    private setApplicationPort() {
        this.app.set('port', this.getPort());
    }

    private createServer() {
        this.server = http.createServer(this.app);
    }

    private startListening() {
        this.server.on("error", this.onError.bind(this));
        this.server.on("listening", this.onListening.bind(this));
        this.server.listen(this.getPort());
    }

    private normalizePort(val) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    private onError(error) {
        if (error.syscall !== "listen") {
            throw error;
        }

        const port = this.getPort();
        var bind = typeof port === "string"
            ? `Pipe ${port}`
            : `Port ${port}`;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error(`${bind} requires elevated privileges`);
                this.process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(`${bind} is already in use`);
                this.process.exit(1);
                break;
            default:
                throw error;
        }
    }

    private onListening() {
        var addr = this.server.address();
        var bind = typeof addr === "string"
            ? `pipe ${addr}`
            : `port ${addr.port}`;

        log("Listening on " + bind);
    }
}