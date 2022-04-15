var logger = require("morgan");
const { default: ParseServer, ParseGraphQLServer } = require("parse-server");
const FSFilesAdapter = require("@parse/fs-files-adapter");

const fsAdapter = new FSFilesAdapter({
  encryptionKey: "encryptionKey"
});

var api = new ParseServer({
  databaseURI: "mongodb+srv://test:test@cluster0.rick5.mongodb.net/database",
  cloud: "./routes/cloud.js",
  appId: "appId",
  appName: "appName",
  masterKey: "masterKey",
  javascriptKey: "javascriptKey",
  restAPIKey: "restAPIKey",
  serverURL: "https://1udwhn.sse.codesandbox.io/rest",
  publicServerURL: "https://1udwhn.sse.codesandbox.io/rest",
  graphQLServerURL: "https://1udwhn.sse.codesandbox.io/graphql",
  liveQuery: {
    classNames: ["Notification"]
  },
  logger: logger,
  filesAdapter: fsAdapter,
  verifyUserEmails: true,
  emailVerifyTokenValidityDuration: 2 * 60 * 60,
  preventLoginWithUnverifiedEmail: true,
  directAccess: true,
  enforcePrivateUsers: true,
  accountLockout: {
    duration: 5,
    threshold: 3,
    unlockOnPasswordReset: true
  },
  emailAdapter: {
    module: "parse-smtp-template",
    options: {
      isSSL: false,
      port: 2525,
      host: "smtp.mailtrap.io",
      user: "406720e397c1cd",
      password: "a49578b1f21f2f",
      fromAddress: "no-replay@localhost.lan",
      template: true,
      templatePath: "mailTemplate.html",
      passwordOptions: {
        subject: "Password recovery",
        body: "Custom password recovery email body",
        btn: "Recover your password"
      },
      confirmOptions: {
        subject: "E-mail confirmation",
        body: "Custom email confirmation body",
        btn: "confirm your email"
      }
    }
  },
  passwordPolicy: {
    validatorPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    doNotAllowUsername: true,
    resetTokenValidityDuration: 90 * 24 * 60 * 60
  },
  // customPages: {
  //     passwordResetSuccess: "http://yourapp.com/passwordResetSuccess",
  //     verifyEmailSuccess: "http://yourapp.com/verifyEmailSuccess",
  //     parseFrameURL: "http://yourapp.com/parseFrameURL",
  //     linkSendSuccess: "http://yourapp.com/linkSendSuccess",
  //     linkSendFail: "http://yourapp.com/linkSendFail",
  //     invalidLink: "http://yourapp.com/invalidLink",
  //     invalidVerificationLink: "http://yourapp.com/invalidVerificationLink",
  //     choosePassword: "http://yourapp.com/choosePassword"
  // }
  middlewares: function (params) {
    console.log(params);
  },
  middleware: function (params) {
    console.log(params);
  }
});

const parseGraphQLServer = new ParseGraphQLServer(api, {
  graphQLPath: "/graphql",
  playgroundPath: "/playground"
});

module.exports = { api, parseGraphQLServer };
