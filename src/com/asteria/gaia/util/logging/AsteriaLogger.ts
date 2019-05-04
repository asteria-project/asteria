import { AsteriaLogLevel } from './AsteriaLogLevel';

/**
 * The <code>AsteriaLogger</code> interface defines the API you must implement to create loggers in an Asteria
 * environment.
 */
export interface AsteriaLogger {
    
    /**
     * Return the log level for this <code>AsteriaLogger</code> onject.
     * 
     * @returns {AsteriaLogLevel} the log level for this <code>AsteriaLogger</code> onject.
     */
    getLogLevel(): AsteriaLogLevel;

    /**
     * Set the log level for this <code>AsteriaLogger</code> onject.
     * 
     * @param {AsteriaLogLevel} level the new log level for this <code>AsteriaLogger</code> onject.
     */
    setLogLevel(level: AsteriaLogLevel): void;

    /**
     * Log a message with the specified <code>AsteriaLogLevel.INFO</code>.
     * 
     * @param {AsteriaLogLevel} level the log level used to log the message.
     * @param {string} message the message to log.
     */
    log(level: AsteriaLogLevel, message: string): void;

    /**
     * Log an <code>AsteriaLogLevel.DEBUG</code> message.
     * 
     * @param {string} message the message to log.
     */
    debug(message: string): void;

    /**
     * Log an <code>AsteriaLogLevel.INFO</code> message.
     * 
     * @param {string} message the message to log.
     */
    info(message: string): void;

    /**
     * Log an <code>AsteriaLogLevel.WARN</code> message.
     * 
     * @param {string} message the message to log.
     */
    warn(message: string): void;

    /**
     * Log an <code>AsteriaLogLevel.ERROR</code> message.
     * 
     * @param {string} message the message to log.
     */
    error(message: string): void;

    /**
     * Log an <code>AsteriaLogLevel.FATAL</code> message.
     * 
     * @param {string} message the message to log.
     */
    fatal(message: string): void;
}
