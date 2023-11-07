import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Order({ orders }) {
  const [selOrder, setSelOrder] = useState({});

  function handleOrderClick(order) {
    setSelOrder(order);
  }

  return (
    <div>
      <div id="OrderList">
        {orders.map((order) => (
          <ul key={order.id} onClick={() => handleOrderClick(order)}>
            <li>Order ID: {order.id}</li>
            <li>Date Created: {order.o_creation_date}</li>
            <li>Number of items: {order.o_items.length}</li>
            <li>Order price: {order.o_price}</li>
          </ul>
        ))}
      </div>

      <div id="Order">Selected order
        {selOrder.id && (
          <div>
            <li>Order ID: {selOrder.id}</li>
            <li>Date Created: {selOrder.o_creation_date}</li>
            <li>Order price: {selOrder.o_price}</li>
            {selOrder.o_items.map((item, index) => (
              <ul key={index}>
                <li>{item.i_img}</li>
                <li>{item.i_name}</li>
                <li>{item.i_brand}</li>
                <li>{item.i_price}</li>
                <li>{item.i_stock}</li>
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
