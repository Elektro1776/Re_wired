// require('dotenv').config();

import bunyan from 'bunyan';
import settings from '../../settings';

export default class BaseLogger {
  constructor() {
    this.logger = bunyan.createLogger({ name: settings.app.name });
  }
}
