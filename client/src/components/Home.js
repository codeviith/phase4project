import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home({user, setUser, items,setItems}) {
 

  function addToCart(event, item) {}
  //   event.preventDefault();
  
  //   const quantity = parseInt(event.target.quantity.value, 10);
  
  //   if (item.i_stock >= quantity) {
  //     const addedItem = item;
  
  //     if (user) {
  //       addedItem.i_stock = addedItem.i_stock - quantity
  //       for (let i = 0; i < quantity; i++) {
  //         user.u_cart.push(addedItem);
  //       }
  //     }
  
  //     fetch("http://localhost:3000/users/1", {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(user),
  //     })
  //     .then(setUser(user))
  //     .then(() => {
  //       alert(`Added ${quantity} ${item.i_name}(s) to the cart`);
  //     });
  
  //     const newIstock = item.i_stock - quantity;
  
  //     fetch(`http://localhost:3000/items/${item.id}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ i_stock: newIstock }),
  //     })
  //     .then(() => {
  //       fetch(`http://localhost:3000/items`)
  //         .then((r) => r.json())
  //         .then((data) => setItems(data));
  //     });
  //   } else {
  //     alert('Not enough stock');
  //   }
  
  //   event.target.reset();
  // }
  

  return (
    <div>
      <h2>Items list</h2>
      <div id="itemList">
        {items.map((item, index) => (
          <ul key={index}>
            <li>{item.i_img}</li>
            <li>{item.i_name}</li>
            <li>{item.i_brand}</li>
            <li>Price: ${item.i_price}</li>

            <li>Stock:{item.i_stock}</li>

            <form onSubmit={(event) => addToCart(event, item)}>
              <label htmlFor="quantity">Quantity:</label>
              <input type="number" name="quantity" id="quantity" min="1" />
              <input type="submit" value="Add to the cart" />
            </form>
          </ul>
        ))}
      </div>
    </div>
  );
}


export default Home;
