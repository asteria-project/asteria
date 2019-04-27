import { AsteriaLogger } from '../../../gaia/util/logging/AsteriaLogger';
import { AsteriaLogLevel } from '../../../gaia/util/logging/AsteriaLogLevel';
import * as logger from 'ts-log-debug';

/**
 * A singleton implementation of the <code>AsteriaLogger</code> interface.
 */
export class OuranosLogger implements AsteriaLogger {

    /**
     * Stores the static reference to this logger.
     */
    private static _instance: AsteriaLogger = null;

    /**
     * The reference to the internal logging utility.
     */
    private readonly _logger: logger.Logger;

    /**
     * Creates a new <code>Logger</code> instance.
     */
    private constructor() {
        this._logger = new logger.Logger('AsteriaLogger');
        this._logger.appenders.set(
            'stdout',
            {
                type: 'stdout',
                level: [
                    AsteriaLogLevel.DEBUG, AsteriaLogLevel.INFO,
                    AsteriaLogLevel.ERROR, AsteriaLogLevel.FATAL, 
                    AsteriaLogLevel.WARN
                ]
            }
        );
    }

    /**
     * Returns the reference to this logger.
     * 
     * @returns {AsteriaLogger} the reference to this logger.
     */
    public static getLogger(): AsteriaLogger {
        return OuranosLogger._instance || (OuranosLogger._instance = new OuranosLogger());
    }

    /**
     * @inheritdoc
     */
    public log(level: AsteriaLogLevel, message: string): void {
        switch (level) {
            case AsteriaLogLevel.INFO :
                this._logger.info(message);
                break;
            case AsteriaLogLevel.DEBUG :
                this._logger.debug(message);
                break;
            case AsteriaLogLevel.WARN :
                this._logger.warn(message);
                break;
            case AsteriaLogLevel.ERROR :
                this._logger.error(message);
                break;
            case AsteriaLogLevel.FATAL :
                this._logger.fatal(message);
                break;
        }
        
    }
    
    /**
     * @inheritdoc
     */
    public info(message: string): void {
        this.log(AsteriaLogLevel.INFO, message);
    }
    
    /**
     * @inheritdoc
     */
    public debug(message: string): void {
        this.log(AsteriaLogLevel.DEBUG, message);
    }
    
    /**
     * @inheritdoc
     */
    public warn(message: string): void {
        this.log(AsteriaLogLevel.WARN, message);
    }
    
    /**
     * @inheritdoc
     */
    public error(message: string): void {
        this.log(AsteriaLogLevel.ERROR, message);
    }
    
    /**
     * @inheritdoc
     */
    public fatal(message: string): void {
        this.log(AsteriaLogLevel.FATAL, message);
    }
}