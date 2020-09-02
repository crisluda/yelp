import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../apis/api";

function UpdateRestaurants(props) {
  let history = useHistory();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/${id}`);
      //   console.log(response.data.data.restaurants);
      setName(response.data.data.restaurants.name);
      setLocation(response.data.data.restaurants.location);
      setPriceRange(response.data.data.restaurants.price_range);
    }
    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.put(`/${id}`, {
        name: name,
        location: location,
        price_range: priceRange,
      });
      history.push("/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form action="" method="post">
        <div className="form-group">
          <label htmlFor="name">name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            type="text"
            name="name"
            id="name"
            placeholder="name"
          />
          <div className="form-group">
            <label htmlFor="location">location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              type="text"
              name="location"
              id="location"
              placeholder="location"
            />
          </div>
          <div className="col" className="goo">
            <label htmlFor="priceRange">Price Range</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              name=""
              id=""
              className="custom-select my-1 mr-sm-2"
            >
              <option disabled>Price Range</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateRestaurants;
