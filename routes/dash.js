const ParseDashboard = require("parse-dashboard");

const options = { allowInsecureHTTP: true };

const dashboard = new ParseDashboard(
  {
    apps: [
      {
        serverURL: "https://1udwhn.sse.codesandbox.io/rest",
        graphQLServerURL: "https://1udwhn.sse.codesandbox.io/graphql",
        appId: "appId",
        masterKey: "masterKey",
        javascriptKey: "javascriptKey",
        restAPIKey: "restAPIKey",
        appName: "appName",
        supportedPushLocales: ["en", "fr"]
      }
    ],
    users: [
      {
        user: "user",
        pass: "pass"
      }
    ]
  },
  options
);

module.exports = dashboard;
