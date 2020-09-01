const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require('cors')
const db = require("./db");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors())


app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants");
    // console.log(results);
    res.status(200).json({
      status: "succes",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
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
      status: "succes",
      data: {
        restaurant: results.rows,
      }

    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const name = req.body.name;
    const location = req.body.location;
    const price_range = req.body.price_range;
    const id = req.params.id;
    console.log(id);
    const results = await db.query(
      "UPDATE restaurants SET name=$1,location=$2,price_range=$3 WHERE id=$4 returning *",
      [name, location, price_range, id]
    );
    res.status(201).json({
      status: results.rows[0],
    });
    // console.log(results);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const results = await db.query("DELETE FROM restaurants WHERE id=$1", [id]);
    res.status(204).json({
      status: "succes",
    });
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is runing on port http://127.0.0.1:${port}`);
});