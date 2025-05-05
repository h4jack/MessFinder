const admin = require("firebase-admin");
const serviceAccount = require("./firebase-creds.json"); // downloaded from Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "id1290.appspot.com"
});

const db = admin.firestore();
const auth = admin.auth();
const bucket = admin.storage().bucket();

module.exports = { db, auth, bucket };
