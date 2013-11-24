var logger = require('../index');

logger.log('some ns', 'Some message', 'green');
logger.error('some ns', 'some error message');
logger.info('some ns', 'some info message');
logger.warn('some ns', 'some warning message');