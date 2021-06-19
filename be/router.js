function Router() {
  function parsePath(path = "") {
    path = path.substr(1);
    let pathElements = path.split("/");
    let finalPath = "";
    let parameters = [];

    for (let element of pathElements) {
      if (element.indexOf(":") === -1) {
        if (parameters.length > 0) {
          return;
        }
        finalPath += "/" + element;
      } else if (element.indexOf(":") === 0) {
        let el = element.substr(1);
        parameters.push(el);
      }
    }
    return [finalPath, parameters];
  }

  function produceUrlParametersObject(values, keys) {
    let finalObject = {};

    for (let i = 0; i < values.length; i++) {
      finalObject[keys[i]] = values[i];
    }

    return finalObject;
  }

  function bindPathParameters(method, path = "", req) {
    console.log(method, path);
    if (path === undefined || path.length === 0) {
      return;
    }

    let keys = Object.keys(routerPathParams[method]).sort((a, b) => {
      return a.length - b.length;
    });

    let foundKey = undefined;
    let localParameters = [];

    for (let key of keys) {
      if (path.indexOf(key) === 0) {
        localParameters = path.substr(key.length + 1).split("/");
        foundKey = key;
        break;
      }
    }

    if (foundKey === undefined) {
      return null;
    }

    for (let params of routerPathParams[method][foundKey]) {
      if (params.length === localParameters.length) {
        req.pathParams = produceUrlParametersObject(localParameters, params);
        for (let param of params) {
          foundKey += "/:" + param;
        }
        break;
      }
    }

    return foundKey;
  }

  let routerEndpoints = {
    POST: {},
    GET: {},
    PUT: {},
    DELETE: {},
  };
  let routerPathParams = {
    POST: {},
    GET: {},
    PUT: {},
    DELETE: {},
  };

  return {
    addPath: (method, path, lambda) => {
      let [finalPath, parameters] = parsePath(path);

      routerEndpoints[method][path] = lambda;
      if (routerPathParams[method][finalPath] === undefined) {
        routerPathParams[method][finalPath] = [];
      }
      routerPathParams[method][finalPath].push(parameters);
    },
    callPath: (method, path, req, res) => {
      let key = null;
      if (path in routerEndpoints[method]) {
        key = path;
      } else {
        key = bindPathParameters(method, path, req);
      }

      if (key === null) {
        res.setStatusCode(404);
        res.send({ Message: "Route could not be found!" });
      }
      console.log(key);
      routerEndpoints[method][key](req, res);
    },
  };
}

module.exports = Router;
