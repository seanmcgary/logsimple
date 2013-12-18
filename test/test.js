var logger = require('../index');

var someObjectToBeLogged = {
	error: "Yo this is an error",
	message: "This happens to be a message"
};

logger.log('some ns', 'Some message', 'green');
logger.error('some ns', 'some error message');
logger.info('some ns', 'some info message');
logger.warn('some ns', 'some warning message');
logger.success('some ns', 'some success message');
logger.infoAlt('some ns', 'some alternate info message');

logger.infoRed('some ns', 'some message', someObjectToBeLogged);
logger.infoYellow('warn ns', 'another message', new Error('something broke'));