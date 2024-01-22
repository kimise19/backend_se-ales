const functions = require("firebase-functions");
const admin = require("firebase-admin");

const express = require("express");
const cors = require("cors");
const app = express();

const serviceAccount = require("./permissions-1.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://swtesis-e0343-default-rtdb.firebaseio.com"
  });
  app.use(cors({ origin: true }));
app.get("/api",(req, res) =>{
    res.status(200).json({message: "hola"})
});


app.use(require('./routes/seniales_routes'))

exports.app = functions.https.onRequest(app);

