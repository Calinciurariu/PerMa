const http = require("http");
const qs = require("querystring");
const url = require("url");
const basePath = "https://localhost:9010";

function Response(res) {
  return {
    setStatusCode: (statusCode) => {
      res.statusCode = statusCode;
    },
    send: (obj) => {
      res.end(JSON.stringify(obj));
    },
  };
}

module.exports = Response;