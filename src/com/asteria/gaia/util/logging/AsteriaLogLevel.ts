/**
 * The <code>AsteriaLogLevel</code> enum defines a set of standard logging
 * levels that can be used to control logging output. 
 */
export enum AsteriaLogLevel {

    /**
     * <code>DEBUG</code> defines logs that are used for interactive investigation during development.
     */
    DEBUG = 'DEBUG',

    /**
     * <code>INFO</code> is a message level for informational messages.
     */
    INFO = 'INFO',

    /**
     * <code>WARN</code> is a message level indicating a potential problem.
     */
    WARN = 'WARN',

    /**
     * <code>ERROR</code> is a message level indicating that the current flow of execution is stopped due to a failure.
     */
    ERROR = 'ERROR',

    /**
     * <code>ERROR</code> is a message level indicating an unrecoverable application or system crash, or a catastrophic
     * failure that requires immediate attention.
     */
    FATAL = 'FATAL'
}