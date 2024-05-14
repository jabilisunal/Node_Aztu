const express = require("express");
const port = 8080;
const app = express();
app.use(express.json());

let categories = [
  {
    id: 1,
    description: "Sweet and savory sauces relishes spreads and seasonings",
    name: "Condiments",
  },
  {
    id: 2,
    description: "Soft drinks coffees teas beers and ales",
    name: "Beverages",
  },
  {
    id: 3,
    description: "Desserts candies and sweet breads",
    name: "Confections",
  },
  {
    id: 4,
    description: "Cheeses",
    name: "Dairy Products",
  },
  {
    id: 5,
    description: "Breads crackers pasta and cereal",
    name: "Grains/Cereals",
  },
  {
    id: 6,
    description: "Prepared meats",
    name: "Meat/Poultry",
  },
  {
    id: 7,
    description: "Dried fruit and bean curd",
    name: "Produce",
  },
  {
    id: 8,
    description: "Seaweed and fish",
    name: "Seafood",
  },
];
let counter = 1000;

app.get("/categories", (req, res) => {
  res.send(categories);
});

app.get("/categories/:id", (req, res) => {
  const { id } = req.params;
  const result = categories.find((item) => item.id == id);
  res.send(result);
});

app.post("/categories", (req, res) => {
  const { description, name, price } = req.body;
  categories.push({ id: counter, name, description, price });
  counter++;
  res.send("Data ugurla yaradildi..");
});

app.delete("/categories/:id", (req, res) => {
  const { id } = req.params;
  categories = categories.filter((item) => item.id !== +id);
  res.send("Data silindi");
});

app.put("/categories/:id", (req, res) => {
    const { id } = req.params;
    const { description, name } = req.body;
    counter++;
    const index = categories.findIndex((item)=>item.id==id);
    categories[index]= {id,description,name}
    res.send("Update olund");
  });


app.listen(port, () => {
  console.log(`Bu website bu portda calishir ${port} `);
});
