import { AsteriaLogLevel } from "./AsteriaLogLevel";

export interface AsteriaLogger {
    
    /**
     * Logs a message with the specified <code>AsteriaLogLevel.INFO</code>.
     * 
     * @param {AsteriaLogLevel} level the log level used to log the message.
     * @param {string} message the message to log.
     */
    log(level: AsteriaLogLevel, message: string): void;

    /**
     * Logs an <code>AsteriaLogLevel.INFO</code> message.
     * 
     * @param {string} message the message to log.
     */
    info(message: string): void;

    /**
     * Logs an <code>AsteriaLogLevel.DEBUG</code> message.
     * 
     * @param {string} message the message to log.
     */
    debug(message: string): void;

    /**
     * Logs an <code>AsteriaLogLevel.WARN</code> message.
     * 
     * @param {string} message the message to log.
     */
    warn(message: string): void;

    /**
     * Logs an <code>AsteriaLogLevel.ERROR</code> message.
     * 
     * @param {string} message the message to log.
     */
    error(message: string): void;

    /**
     * Logs an <code>AsteriaLogLevel.FATAL</code> message.
     * 
     * @param {string} message the message to log.
     */
    fatal(message: string): void;
}