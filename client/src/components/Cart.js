import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart({ user, setUser,setItemStock,setItems }) {
  // const [counts, setCounts] = useState({});

  // useEffect(() => {
  //   if (user && user.u_cart && user.u_cart.length > 0) {
  //     const newCounts = {};
  //     user.u_cart.forEach((item) => {
  //       const id = item.id;
  //       if (newCounts[id] === undefined) {
  //         newCounts[id] = 0;
  //       }
  //       newCounts[id] = newCounts[id] + 1;
  //     });
  //     setCounts(newCounts);
  //   }
  // }, [user, user.u_cart]);

  // function findQuantity(counts, id) {
  //   if (counts[id] !== undefined) {
  //     return counts[id];
  //   }
  //   return 0; 
  // }

  // function removeFromCart(itemIndex, selectedQuantity,item) {

  //   fetch(`http://localhost:3000/items`)
  //   .then((r) => r.json())
  //   .then((data) => setItems(data));

  //   const updatedUser = { ...user };

  //   let newstock = item.i_stock + selectedQuantity
  //   console.log(newstock)
  //   console.log(item.i_stock)
  //     console.log(selectedQuantity)
  //   for (let i = 0; i < selectedQuantity; i++) {
  //     if (itemIndex >= 0 && itemIndex < updatedUser.u_cart.length) {
  //       updatedUser.u_cart.splice(itemIndex, 1);
  //     }
  //   }

  //   fetch("http://localhost:3000/users/1", {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(updatedUser),
  //   })
  //     .then((response) => {
  //       setUser(updatedUser);
  //     });

  //     fetch(`http://localhost:3000/items/${item.id}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ i_stock: newstock }),
  //     })
  //     .then(() => {

  //       fetch(`http://localhost:3000/items`)
  //         .then((r) => r.json())
  //         .then((data) => setItems(data));

  //         fetch("http://localhost:3000/users/1")
  //         .then((r) => r.json())
  //         .then((data) => setUser(data));


  //     });
  // }
  

  // const uniqueItemIds = new Set();

  return (
    <div>
      <h2>Items in your cart</h2>
      {/* <div id="cartList">
        {user && user.u_cart && user.u_cart.length > 0 ? (
          user.u_cart.map((item, index) => {
            if (!uniqueItemIds.has(item.id)) {
              uniqueItemIds.add(item.id);
              return (
                <ul key={index}>
                  <li>{item.i_img}</li>
                  <li>{item.i_name}</li>
                  <li>{item.i_brand}</li>
                  <li>Price: ${item.i_price}</li>

                  <li>In your cart : {findQuantity(counts, item.id)}</li>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const selectedQuantity = parseInt(
                      document.getElementById(`quantity${item.id}`).value
                    );
                    removeFromCart(index, selectedQuantity,item);
                  }}>
                  <select
                    id={`quantity${item.id}`}
                  >
                    {Array.from({ length: findQuantity(counts, item.id) }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                     ))}
                  </select>

                    <button type="submit">Remove from cart</button>
                  </form>


              </ul>
              );
            } else {
              return null; 
            }
          })
        ) : 
          <p>Your cart is empty.</p>
         } </div> */}
    </div>
  );
}

export default Cart;




/*
<label htmlFor={`quantitySelector${index}`}>Select quantity to delete:</label>
<select
  id={`quantitySelector${index}`}
  value={findQuantity(counts, item.id)} // Set the selected value to the current quantity
  onChange={(e) => removeFromCart(index, parseInt(e.target.value))}
>
  {Array.from({ length: findQuantity(counts, item.id) }, (_, i) => (
    <option key={i + 1} value={i + 1}>
      {i + 1}
    </option>
    ))}

</select>

<button onClick={() => removeFromCart(index, findQuantity(counts, item.id))}>Delete</button>

</ul>



*/