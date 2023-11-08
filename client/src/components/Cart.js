import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//filter by items quantity
//Show the quantity (it is in the "counts")
// the delete needs to choose the amount, with a max value to select
//the delete can be some kind a loop that will search for the ID to delete

function Cart({ user, setUser }) {

  const [counts, setCounts] = useState({})
  useEffect(() => {
    if (user && user.u_cart && user.u_cart.length > 0) {
      const newCounts = {};
  
      user.u_cart.forEach(item => {
        const id = item.id;
        if (newCounts[id] === undefined) {
          newCounts[id] = 0;
        }
                newCounts[id] = newCounts[id] + 1;
      });
      setCounts(newCounts);
      console.log(newCounts)
    }
  }, [user, user.u_cart]);

  function removeFromCart(itemIndex) {

    const updatedUser = { ...user };

    updatedUser.u_cart.splice(itemIndex, 1);
  

    fetch("http://localhost:3000/users/1", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then(response => {

        setUser(updatedUser);
      });
  }


  return (
    <div>
      <h2>Items in your cart</h2>
      <div id="cartList">
        {user && user.u_cart && user.u_cart.length > 0 ? (
          user.u_cart.map((item, index) => (
            <ul key={index}>
              <li>{item.i_img}</li>
              <li>{item.i_name}</li>
              <li>{item.i_brand}</li>
              <li>{item.i_price}</li>
              <li>{item.i_stock}</li>
              <button onClick={() => removeFromCart(index)}>Delete</button>
            </ul>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Cart;



