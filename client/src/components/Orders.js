import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Order({ user,items }) {
  const [selOrder, setSelOrder] = useState({});
  const [userOrders, setUserOrders]= useState([]);
  const [userOrderID, setUserOrdersID]= useState([]);
  const [orders, setOrders] =useState([])
 


  useEffect(() => {
    fetch(`http://127.0.0.1:5555/user_order?user_id=${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        // Access the 'orders' property
        const ordersData = data.orders || [];
  
        setUserOrdersID(ordersData.map((order) => order.order_id));
        setUserOrders(ordersData);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  function test() {
    console.log(userOrders);
    console.log(userOrderID);
    console.log(orders)

  }
  
  

  function getorders() {
    const tempOrder = [];
  
    // Create an array of promises for each fetch request
    const fetchPromises = userOrderID.map((i) =>
      fetch(`http://127.0.0.1:5555/order/${i}`)
        .then((response) => response.json())
        .then((data) => {
          // Handle the data for each order as needed
          tempOrder.push(data);
        })
        .catch((error) => console.error(`Error fetching order ${i}:`, error))
    );
  
    // Use Promise.all to wait for all fetch requests to complete
    Promise.all(fetchPromises)
      .then(() => {
        // Once all fetch requests are complete, update the state
        setOrders(tempOrder);
      });
  }
  
  
  

  function handleOrderClick(order) {
    setSelOrder(order);
  }

  return (
    <div>
      <button id="testbutton" onClick={() => test()}>
        test
      </button>
      <button id="getorders" onClick={() => getorders()}>
        getorders
      </button>

      <div id="OrderList">
        {orders.length > 0 ? (
          orders.map((order) => (
            <ul key={order.id} onClick={() => handleOrderClick(order)}>
              <li>Order ID: {order.id}</li>
              <li>Date Created: {order.created_date}</li>
              <li>Number of items: {order.n_items}</li>
              <li>Order price: {order.cost}</li>
            </ul>
          ))
        ) : (
          <p>Nothing to show yet</p>
        )}
      </div>
      <div>Selected Order</div>

    </div>
  );
}

export default Order;
