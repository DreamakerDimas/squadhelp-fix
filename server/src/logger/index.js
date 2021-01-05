const path = require('path');
const fs = require('fs');
const constants = require('../constants.js');
const currentLogPath = path.join(constants.LOGS_DIRECTORY, '/currentLog.json');

module.exports.logWrite = async (err) => {
  const { message, code, stack } = err;
  const data = {
    message,
    time: Date.now(),
    code,
    stackTrace: stack,
  };

  // Get file size
  let fileSize;
  try {
    fs.accessSync(currentLogPath, fs.constants.R_OK | fs.constants.W_OK);
    fileSize = fs.statSync(currentLogPath)['size'];
  } catch (err) {
    fileSize = 0;
  }

  try {
    // Get logs from file and add new error
    const logArray =
      fileSize > 0 ? JSON.parse(fs.readFileSync(currentLogPath, 'UTF-8')) : [];
    logArray.push(data);

    // Write logs to file
    fs.writeFileSync(
      currentLogPath,
      JSON.stringify(logArray, null, 4),
      'UTF-8'
    );
  } catch (err) {
    console.log('Log write error:', err);
  }
};

// Moves current logs to [timestamp].json at 23:00 everyday
module.exports.loggerInit = async () => {
  // Every 1 minute
  setInterval(() => {
    // check time
    const currentTime = new Date();
    if (currentTime.getHours() === 23 && currentTime.getMinutes === 0) {
      console.log('Logs reserving started...');
      try {
        // rw access check
        fs.accessSync(currentLogPath, fs.constants.R_OK | fs.constants.W_OK);

        // read current log file
        let fileSize = fs.statSync(currentLogPath)['size'];
        const currentLogData =
          fileSize > 0
            ? JSON.parse(fs.readFileSync(currentLogPath, 'UTF-8'))
            : [];

        // stackTraces removing
        currentLogData.forEach((value, index) => {
          delete currentLogData[index].stackTrace;
        });

        // write current log in new file
        const newLogPath = path.join(
          constants.LOGS_DIRECTORY,
          `/${currentTime.getTime()}.json`
        );
        fs.writeFileSync(
          newLogPath,
          JSON.stringify(currentLogData, null, 4),
          'UTF-8'
        );

        // clear current log file
        fs.writeFileSync(currentLogPath, JSON.stringify([]));

        console.log('Logs reserving successfully completed.');
      } catch (err) {
        console.log('Logs reserving error:', err);
      }
    }
  }, 60000);
};
