const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { ObjectId } = require("mongodb");
const {
  connectToDb,
  getDb,
  getOrderModel,
  getUserModel,
  getCustomerEnquiries,
  getNewsletter,
} = require("./db");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");

const app = express();
const client = new OAuth2Client();
const razorpay = new Razorpay({
  key_id: "rzp_test_vorhZ7wKh3AFzX",
  key_secret: "mk80OiNmNFnZIwmKYweWqdMj",
});

// Middleware setup
app.use(express.static("build"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//connections
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(5000, () => {
      console.log("App listening on port 5000");
    });
    db = getDb();
  } else {
    console.log(err);
  }
});

//routes

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
            return db
              .collection("products")
              .find({ "rating.rate": { $gt: 4 } })
              .toArray();
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
  const prodId = new ObjectId(req.params.id);
  db.collection("products")
    .findOne({ _id: prodId })
    .then((result) => {
      db.collection("products")
        .find({ category: result.category, _id: { $ne: prodId } })
        .toArray()
        .then((relProds) => {
          db.collection("categories")
            .find({ title: result.category })
            .toArray()
            .then((cat) => {
              result.category = cat[0].name;
              result.relProds = relProds;
              res.json(result);
            });
        });
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch products" });
    });
});

app.post("/checkout", async (req, res) => {
  try {
    const amount = req.body.val;
    var options = {
      amount: 100,
      currency: "INR",
    };
    const order = await razorpay.orders.create(options);
    const orderModel = getOrderModel();
    await orderModel.insertOne({
      order_id: order.id,
      amount: amount,
    });
    res.json(order);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/checkout/payment-verification", async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body_data = razorpay_order_id + "|" + razorpay_payment_id;
  const response = crypto
    .createHmac("sha256", "mk80OiNmNFnZIwmKYweWqdMj")
    .update(body_data)
    .digest("hex");
  const isValid = response === razorpay_signature;
  if (isValid) {
    const orderModel = getOrderModel();
    await orderModel.findOne(
      {
        order_id: razorpay_order_id,
      },
      {
        $set: {
          razorpay_payment_id: razorpay_payment_id,
          razorpay_signature: razorpay_signature,
        },
      }
    );
    res.redirect(`/success?payment_id=${razorpay_payment_id}`);
  } else {
    res.redirect("/failed");
  }
  return;
});

app.post("/google-auth", async (req, res) => {
  const { credential, client_id } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    res.status(200).json({ payload });
  } catch (err) {
    res.status(400).json({ err });
  }
});

app.post("/sign-up", async (req, res) => {
  const userModel = getUserModel();
  const newUser = await userModel
    .insertOne(req.body.formData)
    .then(() => {
      res.status(200).json({ redirect: '/' });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/contact-us", async (req, res) => {
  try {
    const enquiryModel = getCustomerEnquiries();
    await enquiryModel.insertOne(req.body.formData).then((result) => {
      res.status(200).json({ success: result.insertedId });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/newsletter", async (req, res) => {
  try {
    const newsletterModel = getNewsletter();
    await newsletterModel.insertOne(req.body).then((result) => {
      res.status(200).json({ success: result.insertedId });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
