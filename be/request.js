const http = require("http");
const qs = require("querystring");
const url = require("url");
const basePath = "https://localhost:8095";

function Request(req) {
  return new Promise((resolve, reject) => {
    function parseQuery(urlString) {
      let urlObject = new URL(basePath + urlString);
      path = urlObject.pathname;
      let params = urlObject.searchParams;
      for (let key of params.keys()) {
        queryParams[key] = params.get(key);
      }
    }

    let path = "";
    let queryParams = {};
    let body = "";

    parseQuery(req.url);

    req
      .on("error", (err) => {
        console.error(err);
      })
      .on("data", (chunk) => {
        body += chunk.toString();
      })
      .on("end", () => {
        if (body.length > 0) {
          body = JSON.parse(body);
        } else {
          body = {};
        }
        resolve({
          body: body,
          path: path,
          queryParams: queryParams,
          pathParams: {},
        });
      });
  });
}

module.exports = Request;
