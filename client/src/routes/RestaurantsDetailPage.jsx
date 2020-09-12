import React, { useContext, useEffect } from "react";
import api from "../apis/api";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";

function RestaurantsDetailPage() {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurants);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // let history = useHistory();
  return (
    <div>
      <h1>{selectedRestaurant && selectedRestaurant.name}</h1>
    </div>
  );
}

export default RestaurantsDetailPage;
