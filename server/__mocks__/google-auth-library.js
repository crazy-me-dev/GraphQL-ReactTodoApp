class OAuth2Client {
  constructor(options) {}
  verifyIdToken(creadentials) {
    if (creadentials.idToken === "123456789-existing-user-id-token") {
      return Promise.resolve({
        getPayload: function() {
          return {
            name: "Google User",
            email: "google.user@google.com"
          };
        }
      });
    }

    if (creadentials.idToken === "123456789-new-user-id-token") {
      return Promise.resolve({
        getPayload: function() {
          return {
            name: "New Google User",
            email: "new.google.user@google.com"
          };
        }
      });
    }
  }
}

exports.OAuth2Client = OAuth2Client;
