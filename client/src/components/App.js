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
  
//   useEffect(() => {
//     fetch("/check_session").then((res) => {
//         if (res.ok) {
//             res.json().then((user) => setCurrentUser(user));
//         }
//     });
// }, []);


/*

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
    .then((data) => setItems(data));
    }, [user, user.u_cart]);

  */
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