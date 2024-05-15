import express, { json } from "express";
import mongoose, { Schema } from "mongoose";
import 'dotenv/config'

const app = express();
app.use(json());

const productSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  discountPrice: Number,
});
const productModel = mongoose.model("myProducts", productSchema);

app.get("/", async (req, res) => {
  const products = await productModel.find({});
  res.send(products);
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const products = await productModel.findById(id);
  res.send(products);
});


app.post("/", async (req, res) => {
  const { name, price, category, discountPrice } = req.body;
  const newProduct = new productModel({ name, price, category, discountPrice });
  await newProduct.save();
  res.status(200).send("Product yarandi..");
});

app.delete("/:id", async(req,res)=>{
  const {id}= req.params;
  const product = await productModel.findByIdAndDelete(id);
  res.send(product);
})

app.put("/:id", async(req,res)=>{
  const {id}= req.params;
  const { name, price, category, discountPrice } = req.body;
  const product = await productModel.findByIdAndUpdate(id,{ name, price, category, discountPrice });
  res.send(product);
})

app.put("/:id", (req, res) => {
  res.send("Get element PUT");
});
console.log(process.env.PORT);

mongoose
  .connect(process.env.DB_SECRET_KEY)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log("Not Connect!"));

app.listen(process.env.PORT, () => {
  console.log(`this website running this ${process.env.PORT}`);
});

// mongodb+srv://Sunal:123456backend@mycluster.4byfppp.mongodb.net/
