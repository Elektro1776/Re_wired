import BaseLogger from './BaseLogger';

export default class Logger extends BaseLogger {
  constructor(options) {
    super();
    this.infoLogger = this.logger.child({ loggerName: options.name, src: true });
    this.errorLogger = this.logger.child({ level: 'error', loggerName: options.name, src: true });
  }
  info = log => {
    this.infoLogger.info(log);
  };
  error = log => {
    this.errorLogger.error(log);
  };
}
