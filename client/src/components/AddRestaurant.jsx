import React, { useState, useContext } from "react";
import api from "../apis/api";
import { RestaurantsContext } from "../context/RestaurantsContext";
import "./css/style.css";

function AddRestaurant() {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/", {
        name: name,
        location: location,
        price_range: priceRange,
      });
      addRestaurants(response.data.data.restaurant[0]);
      console.log(response.data.data.restaurant[0]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="mb-4">
      <form action="" method="post">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              type="text"
              name=""
              id=""
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              type="text"
              name=""
              id=""
              placeholder="location"
            />
          </div>
          <div className="col">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              name=""
              id=""
              className="custom-select my-1 mr-sm-2"
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRestaurant;
