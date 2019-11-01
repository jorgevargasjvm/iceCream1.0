var admin = require("firebase-admin");
// Fetch the service account key JSON file contents
const serviceAccount = require("./icecream-4de07-firebase-adminsdk-bpnly-48b68d5e32.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://icecream-4de07.firebaseio.com"
});

// var db = admin.database();

module.exports = admin;