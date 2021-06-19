const http = require("http");
const qs = require("querystring");
const url = require("url");
const basePath = "https://localhost:9010";
const Response = require("./response");
const Request = require("./request");
const Router = require("./router");

function App() {
  let router = Router();

  let server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST,GET,PUT,DELETE,PATCH,OPTIONS"
    );
    if (req.method === "OPTIONS") {
      console.log("OPTIONS");
      res.writeHead(200);
      res.end(JSON.stringify({}));
      return;
    }
    Request(req).then((request) => {
      let response = Response(res);
      router.callPath(req.method, request.path, request, response);
    });
  });

  return {
    get: (endpoint, lambda) => {
      router.addPath("GET", endpoint, lambda);
    },
    put: (endpoint, lambda) => {
      router.addPath("PUT", endpoint, lambda);
    },
    post: (endpoint, lambda) => {
      router.addPath("POST", endpoint, lambda);
    },
    delete: (endpoint, lambda) => {
      router.addPath("DELETE", endpoint, lambda);
    },
    listen: (port, lambda) => {
      server.listen(port, lambda);
    },
  };
}

module.exports = App;
