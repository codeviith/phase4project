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
  const [itemStock, setItemStock] = useState({});
  const [currentUser, setCurrentUser] = useState({})
  
  useEffect(() => {
    fetch("/check_session").then((res) => {
        if (res.ok) {
            res.json().then((user) => setCurrentUser(user));
        }
    });
}, []);


  // useEffect(() => {
  //   // Check if the user is logged in before making the fetch request
  //   if (user && user.id) {
  //     fetch(`http://127.0.0.1:5555/orders?user_id=${user.id}`)
  //       .then((r) => r.json())
  //       .then((data) => {
  //         // Filter orders based on user ID
  //         const filteredOrders = data.filter((order) => order.user_order.user_id === user.id);
  //         setOrders(filteredOrders);
  //       })
  //       .catch((error) => {
  //         // Handle any errors during the fetch request
  //         console.error('Error fetching orders:', error);
  //       });
  //   }
  // }, [user]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/items")
    .then((r) => r.json())
    .then((data) => setItems(data));
    }, [user]);

  return (
    <div>
      <Header />
      <main>

        <Switch>

        <Route exact path="/">
            <Login
            setUser={setUser}
            user = {user}
            />
          </Route>

          <Route exact path="/home">
            <Home 
              user ={user}
              setUser ={setUser}
              items={items}
              setItems={setItems}
              itemStock = {itemStock}
              setItemStock= {setItemStock}
              
            />
          </Route>

          <Route exact path="/cart">
            <Cart
              user ={user}
              setUser ={setUser}
              setItemStock ={setItemStock}
              setItems = {setItems}
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