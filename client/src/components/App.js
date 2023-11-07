import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./Header";
import Home from "./Home.js";
import Login from "./Login.js";
import Cart from "./Cart.js";
import About from "./About.js";
import Orders from "./Orders.js";


function App() {


  const [user, setUser] = useState  ({});
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3000/users/1")
      .then((r) => r.json())
      .then(setUser);
  }, []);

  useEffect(() => {
      fetch("http://localhost:3000/orders")
        .then((r) => r.json())
        .then((data) => {
          const filteredOrders = data.filter((order) => order.o_user_id === user.id);
          setOrders(filteredOrders);
        });
  }, [user]);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((r) => r.json())
      .then(setItems);
  }, []);
  
  return (
    <div>
      <Header />
      <main>

        <Switch>

        <Route exact path="/">
            <Login />
          </Route>

          <Route exact path="/home">
            <Home 
            items={items}
            setItems={setItems}
            cart = {cart}
            setCart = {setCart}

            
            />
          </Route>

          <Route exact path="/cart">
            <Cart
            cart ={cart}
            setCart ={setCart}
             />
          </Route>

          <Route exact path="/orders">
            <Orders
            orders={orders}
             />
          </Route>

          <Route exact path="/about">
            <About />
          </Route>

        </Switch>
      </main>
    </div>
  );
}

export default App;