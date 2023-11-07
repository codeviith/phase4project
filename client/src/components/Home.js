import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home({ items, cart, setCart }) {


  return (
    <div>
      <h2>Items list</h2>
      <div id="itemList">
        {items.map((item, index) => (
          <ul key={index}>
            <li>{item.i_img}</li>
            <li>{item.i_name}</li>
            <li>{item.i_brand}</li>
            <li>{item.i_price}</li>
            <li>{item.i_stock}</li>
            
            <form>
            <label for="quantity">Quantity:</label>
            <input type="number" name="quantity" id="quantity" />
            <input type="submit" value="Add to the cart" />
            </form>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default Home;
