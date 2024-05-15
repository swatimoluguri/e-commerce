const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { ObjectId } = require("mongodb");
const cookieParser = require("cookie-parser");
const {
  connectToDb,
  getDb,
  getOrderModel,
  getUserModel,
  getCustomerEnquiries,
  getNewsletter,
  getResetPwd,
} = require("./db");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Recipient, EmailParams, Sender, MailerSend } = require("mailersend");
const { now } = require("mongoose");

const app = express();
const client = new OAuth2Client();

require("dotenv").config();
const { MAILERSEND_APIKEY, JWT_SECRET, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } =
  process.env;

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

const mailerSend = new MailerSend({
  apiKey: MAILERSEND_APIKEY,
});

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(500).json({ message: "Failed to authenticate token" });
    req.userId = decoded.userId;
    next();
  });
};

function generateOTP() {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();
}

// Middleware setup
app.use(express.static("build"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

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

app.get("/category/:id", async (req, res) => {
  const category = req.params.id;
  db.collection("categories")
    .findOne({ name: category })
    .then((result) => {
      if (result) {
        const response = result.title;
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

app.post("/checkout", verifyToken, async (req, res) => {
  try {
    const amount = req.body.amount;
    var options = {
      amount: amount * 100,
      currency: "INR",
    };
    const order = await razorpay.orders.create(options);
    const orderModel = getOrderModel();
    await orderModel.insertOne({
      order_id: order.id,
      amount: amount,
      userId: req.userId,
      items: req.body.cart.cart.items,
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
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(body_data)
    .digest("hex");
  const isValid = response === razorpay_signature;
  if (isValid) {
    const orderModel = getOrderModel();
    await orderModel.findOneAndUpdate(
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
    await db.collection("cart").deleteMany({ userId: req.userId });
    res.redirect(`/success?payment_id=${razorpay_payment_id}`);
  } else {
    res.redirect("/failed");
  }
  return;
});

app.post("/order-details", async (req, res) => {
  const orderModel = getOrderModel();
  await orderModel
    .findOne({ razorpay_payment_id: req.body.paymentId })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    });
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
  const { firstName, lastName, email } = req.body.formData;
  const userModel = getUserModel();
  const alreadyExisting = await userModel.findOne({ email: email });
  let user;
  if (alreadyExisting) {
    return res.status(400).json({
      message: "User already registered for entered email. Please Sign in",
    });
  } else {
    await userModel
      .insertOne(req.body.formData)
      .then((result) => {
        user = result.insertedId;
        const token = jwt.sign({ userId: user }, JWT_SECRET, {
          expiresIn: "7d",
        });

        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 3600000,
        });

        req.body.cart.cart.items.forEach(async (item) => {
          await db
            .collection("cart")
            .insertOne({ userId: user.toString(), item: item });
        });
        const username = firstName + " " + lastName;
        res.status(200).json({ username });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body.formData;
  const userModel = getUserModel();
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No user found for entered email" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600000,
    });
    req.body.cart.cart.items.forEach(async (item) => {
      await db
        .collection("cart")
        .insertOne({ userId: user._id.toString(), item: item });
    });

    const username = user.firstName + " " + user.lastName;
    const cart = await db
      .collection("cart")
      .find({ userId: user._id.toString() })
      .toArray();
    res.status(200).json({ username, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
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

app.post("/send-mail", async (req, res) => {
  const email = req.body.email;
  const userModel = getUserModel();
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No user found for entered email" });
    }
    const sentFrom = new Sender(
      "swati@trial-0p7kx4x8kn2g9yjr.mlsender.net",
      "Swati"
    );
    const recipients = [new Recipient(email)];
    const otp = generateOTP();
    const resetOTP = getResetPwd();
    try {
      await resetOTP
        .insertOne({ email: email, otp: otp, time: now(), status: 0 })
        .then(async () => {
          const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject("Password recovery for Shoppy")
            .setHtml(
              "<strong>Please use " +
                otp +
                " to reset your password.</strong><br><br><i>Keep Shopping with Shoppy :)</i>"
            );

          await mailerSend.email
            .send(emailParams)
            .then(() => {
              res.status(200).json({ redirect: "/otp-verify" });
            })
            .catch((error) => {
              return res.status(400).json({
                message: "Failed to send email. Please try again in some time.",
              });
            });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/verify-otp", async (req, res) => {
  const { otp, email } = req.body;
  const userModel = getUserModel();
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No user found for entered email" });
    }
    const otpModel = getResetPwd();
    const otpRecord = await otpModel.findOne(
      { email: email },
      { sort: { time: -1 } }
    );
    if (otpRecord) {
      if (!(otp === otpRecord.otp)) {
        return res.status(400).json({ message: "Invalid OTP entered" });
      }
      if (otp === otpRecord.otp && otpRecord.status === 1) {
        return res.status(400).json({ message: "Entered OTP has expired." });
      }
      if (otp === otpRecord.otp && otpRecord.status === 0) {
        await otpModel.findOneAndUpdate(
          { email: email },
          { $set: { status: 1 } },
          { sort: { time: -1 } }
        );
        res.status(200).json({ redirect: "/", email });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/change-password", async (req, res) => {
  const { newPassword, email } = req.body;
  const userModel = getUserModel();
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No user found for entered email" });
    } else {
      await userModel
        .findOneAndUpdate({ email: email }, { $set: { password: newPassword } })
        .then(() => {
          res.status(200).json({ redirect: "/signin" });
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/add-cart", verifyToken, async (req, res) => {
  try {
    const newItem = req.body.item;
    const existingItem = await db
      .collection("cart")
      .findOne({ userId: req.userId, "item.id": newItem.id });

    if (existingItem) {
      const maxCount = 5;
      const combinedCount = existingItem.item.count + newItem.count;
      const newCount = combinedCount <= maxCount ? combinedCount : maxCount;

      await db
        .collection("cart")
        .findOneAndUpdate(
          { userId: req.userId, "item.id": newItem.id },
          { $set: { "item.count": newCount } }
        );

      res.status(200).json({ message: "Item count updated" });
    } else {
      await db.collection("cart").insertOne({
        userId: req.userId,
        item: req.body.item,
      });

      res.status(200).json({ message: "Item added to cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/reduce-cart", verifyToken, async (req, res) => {
  await db
    .collection("cart")
    .findOneAndUpdate(
      { userId: req.userId, "item.id": req.body.id },
      { $inc: { "item.count": -1 } }
    );
  res.sendStatus(200);
});

app.post("/increase-cart", verifyToken, async (req, res) => {
  await db
    .collection("cart")
    .findOneAndUpdate(
      { userId: req.userId, "item.id": req.body.id },
      { $inc: { "item.count": 1 } }
    );
  res.sendStatus(200);
});

app.post("/delete-cart", verifyToken, async (req, res) => {
  await db
    .collection("cart")
    .findOneAndDelete({ userId: req.userId, "item.id": req.body.id });
  res.sendStatus(200);
});

app.post("/clear-cart", verifyToken, async (req, res) => {
  await db.collection("cart").deleteMany({ userId: req.userId });
  res.sendStatus(200);
});
