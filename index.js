const admin = require("firebase-admin");
const cred = require("./cert.json")
admin.initializeApp({credential: admin.credential.cert(cred)});
const db = admin.firestore();

const express = require("express");
const { QuerySnapshot } = require("@google-cloud/firestore");
const app = express();
app.use(express.json());

const port = 3000;

app.post("/usuarios", (req, res) => {
    const users = req.body;
    db.collection("users").doc("Marcos").set(users)
    res.send("Usuario añadido")
});

app.put("/usuarios", (req, res) => {
    const users = req.body;
    db.collection("users").doc("Marcos").set(users)
    res.send("Usuario modificado")
});

app.get("/usuarios", (req, res) => {
    db.collection("users")
    .get()
    .then(
        (QuerySnapshot) => {
            const users = [];
            QuerySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            res.send(users);
        });
    }
    );

app.listen(port, () => {
    console.log("puerto funcionando")
});