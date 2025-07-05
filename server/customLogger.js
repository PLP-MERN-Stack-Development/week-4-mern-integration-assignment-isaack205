const morgan = require('morgan');
const fs = require('fs');
const path = require('path');


// Create a write stream for access.log
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

// Export morgan middleware configured to use the stream
const customLogger = morgan('combined', { stream: accessLogStream });

module.exports = customLogger;
