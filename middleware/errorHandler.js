const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  //we also want to log our errors with our log events function:
  logEvents(`${err.name}\t${err.message}`, "errLog.txt");

  console.log(err.stack);
  res.status(500).send(err.message);
};

modules.export = errorHandler;
