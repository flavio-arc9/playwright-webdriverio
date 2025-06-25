import { remote, Browser } from "webdriverio";
import { IORemote } from "./types";

export class Session {

    private driver?: Browser;
    private config: IORemote;

    constructor(config: IORemote) {
        let baseUrl = new URL('http://127.0.0.1:4723');

        if (config.baseUrl) {
            baseUrl = new URL(config.baseUrl);
        }

        this.config = {
            ...config,
            protocol: config.protocol || baseUrl.protocol.slice(0, -1),
            hostname: config.hostname || baseUrl.hostname,
            port: config.port || parseInt(baseUrl.port, 10),
            logLevel: config.logLevel || 'error',
        };
    }

    static isValid(config: IORemote): Session | null {
        if (!config.capabilities || Object.keys(config.capabilities).length === 0) {
            console.log("Skipping session: No capabilities provided.");
            return null;
        }
        return new Session(config);
    }

    async create() {
        this.driver = await remote({
            ...this.config
        });

        // this.driver.on('command', (command) => {
        //     console.log('Comando enviado:', command);
        // });

        // this.driver.on('result', (result) => {
        //     console.log('Resultado recibido:', result);
        // });

        return this.driver;
    }

    async deleteSession() {
        if (this.driver) {
            await this.driver.deleteSession();
        }
    }
}