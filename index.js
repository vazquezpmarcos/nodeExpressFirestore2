const admin = require("firebase-admin");
const cred = require("./cert.json")
admin.initializeApp({credential: admin.credential.cert(cred)});
const db = admin.firestore();

const express = require("express");
const { QuerySnapshot } = require("@google-cloud/firestore");
const app = express();
app.use(express.json());

const port = 4000;

app.post("/usuarios", (req, res) => {
    const users = req.body;
    db.collection("users").add(users)
    res.send("Usuario")
});

app.put("/usuarios", (req, res) => {
    db.collection("users").where("email", "==", "vazquezpmarcos@gmail.com2")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            res.send(doc.id);
            const newEmail = req.body;
            db.collection("users").doc(doc.id).update(newEmail)
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
})

app.delete("/usuarios", (req, res) => {
    db.collection("users").where("email", "==", "vazquezpmarcos@gmail.com")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            res.send(doc.id);
            db.collection("users").doc(doc.id).delete()
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
})

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