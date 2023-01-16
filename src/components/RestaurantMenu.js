import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CDN_URL, MENU_LIST_URL } from "../common/constants";
import Shimmer from "./Shimmer";

export default RestaurantMenu = () => {
  const { id } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    const data = await fetch(MENU_LIST_URL + id);
    const restInfo = await data.json();
    setRestaurantDetails(restInfo.data);
  }
  if (restaurantDetails == {}) return <Shimmer />;
  return (
    <div className="menu">
      <div>
        <h1>Restaurant id: {id}</h1>
        <h2>{restaurantDetails?.name}</h2>
        <img src={CDN_URL + restaurantDetails?.cloudinaryImageId} />
        <h3>Location: {restaurantDetails?.area}</h3>
        <h3>{restaurantDetails?.city}</h3>
        <h3>Rating: {restaurantDetails?.avgRating} stars</h3>
        <h3>Price: {restaurantDetails?.costForTwoMsg}</h3>
      </div>
      <div>
        <h1>MENU</h1>
        <ul>
          {restaurantDetails
            ? Object.values(restaurantDetails?.menu?.items)?.map((item) => (
                <li key={item?.id}>{item?.name}</li>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
};
