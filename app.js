const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const db = require("./db");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants");
    console.log(results);
    res.status(200).json({
      status: "succes",
      results: results.rows.length,
      date: {
        restaurant: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const results = await db.query("SELECT * FROM restaurants WHERE id=$1", [
      id,
    ]);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/v1/restaurants/", async (req, res) => {
  try {
    const name = req.body.name;
    const location = req.body.location;
    const price_range = req.body.price_range;
    // console.log(name, location, price_range);

    const results = await db.query(
      "INSERT INTO restaurants (name,location,price_range) values ($1,$2,$3) returning *",
      [name, location, price_range]
    );
    res.status(201).json({
      status: results.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id);
});

app.delete("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id);
  res.status(204).json({
    status: "succes",
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is runing on port http://127.0.0.1:${port}`);
});
