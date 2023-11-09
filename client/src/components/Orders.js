import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Order({ user,orders,setOrders }) {
  const [selOrder, setSelOrder] = useState({});
 


  useEffect(() => {
    fetch(`http://127.0.0.1:5555/user_order?user_id=${user.id}`)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);
  
  

  function handleOrderClick(order) {
    setSelOrder(order);
  }

  return (
    <div>
      <div id="OrderList">
        {orders.map((order) => (
          <ul key={order.id} onClick={() => handleOrderClick(order)}>
            <li>Order ID: {order.id}</li>
            <li>Date Created: {order.created_date}</li>
            <li>Number of items: {order.n_items}</li>
            <li>Order price: {order.cost}</li>
          </ul>
        ))}
      </div>

      <div>Selected Order</div>

    </div>
  );
}

export default Order;
