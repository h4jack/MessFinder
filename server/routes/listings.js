const express = require("express");
const { db } = require("../firebase");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const docRef = await db.collection("users").add(req.body);
    res.status(201).send({ id: docRef.id });
  } catch (err) {
    res.status(500).send({ error: "Failed to post listing" });
  }
});

router.get("/:col", async (req, res) => {
  try {
    const snapshot = await db.collection(req.params.col).get();
    const listings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.send(listings);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch listings" });
  }
});

module.exports = router;
