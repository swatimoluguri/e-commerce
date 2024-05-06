const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");
const app = express();
app.use(express.json());
let db;

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("App listening on port 3000");
    });
    db = getDb();
  } else {
    console.log(err);
  }
});

app.get("/products", (req, res) => {
  let products = [];
  db.collection("products")
    .find()
    .forEach((product) => products.push(product))
    .then(() => {
      res.json(products);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch products" });
    });
});

app.get("/faqs", (req, res) => {
  let faqs = [];
  db.collection("faqs")
    .find()
    .forEach((ques) => faqs.push(ques))
    .then(() => res.json(faqs))
    .catch(() => {
      res.status(500).json({ error: "Could not fetch faqs" });
    });
});

app.get("/category/:id", (req, res) => {
  const category = req.params.id;
  db.collection("categories")
    .find({ name: category })
    .toArray()
    .then((result) => {
      if (result.length > 0) {
        const response = result[0].title;
        if (!["all", "high"].includes(response)) {
          return db
            .collection("products")
            .find({ category: response })
            .toArray();
        } else {
          if (response === "all") {
            return db.collection("products").find().toArray();
          }
          if (response === "high") {
            return db.collection("products").find({ "rating.rate": { $gt: 4 } }).toArray();
          }
        }
      } else {
        throw new Error("Category not found");
      }
    })
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Could not fetch categories" });
    });
});

app.get("/products/:id", (req, res) => {
  const prodId = req.params.id;
  db.collection("products")
  .findOne({ _id: new ObjectId(prodId) })
    .then((result) => {
      res.json(result);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch products" });
    });
});
