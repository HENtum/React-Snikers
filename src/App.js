import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppContext from "./context";
import axios from "axios";
import "./App.scss";

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Favorite from "./pages/Favorite/Favorite";
import Orders from "./pages/Orders/Orders";
import NewItem from "./pages/NewItem/NewItem";

function App() {
  const [opDraver, setOpDraver] = useState(false);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(false);
  const [numberOrder, setNumberOrder] = useState("");
  const [load, setLoad] = useState(false);
  const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

  useEffect(() => {
    const onLoad = async () => {
      const cart = await axios.get(
        "https://634ff5f3df22c2af7b5f0089.mockapi.io/cart"
      );

      const favorite = await axios.get(
        "https://634ff5f3df22c2af7b5f0089.mockapi.io/favorite"
      );

      const items = await axios.get(
        "https://634ff5f3df22c2af7b5f0089.mockapi.io/items"
      );
      setIsLoading(false);
      setCart(cart.data);
      setFavorite(favorite.data);

      setItems(items.data);
    };
    onLoad();
  }, []);
  const itemAdd = (obj) => {
    console.log(obj.id);
    if (cart.find((elem) => Number(elem.id) === obj.parentId)) {
      axios.delete(
        `https://634ff5f3df22c2af7b5f0089.mockapi.io/cart/${obj.id}`
      );
      setCart((prev) =>
        prev.filter((elem) => Number(elem.id) !== Number(obj.id))
      );
    } else {
      axios.post("https://634ff5f3df22c2af7b5f0089.mockapi.io/cart", obj);

      setCart((prev) => [...prev, obj]);
    }
  };

  const itemDelete = (id) => {
    axios.delete(`https://634ff5f3df22c2af7b5f0089.mockapi.io/cart/${id}`);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const favoriteAdd = async (item) => {
    try {
      if (favorite.find((elem) => elem.id === item.id)) {
        axios.delete(
          `https://634ff5f3df22c2af7b5f0089.mockapi.io/favorite/${item.id}`
        );
        setFavorite((prev) => prev.filter((elem) => elem.id !== item.id));
      } else {
        const { data } = await axios.post(
          "https://634ff5f3df22c2af7b5f0089.mockapi.io/favorite",
          item
        );
        setFavorite((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось");
    }
  };

  const isItemAdded = (id) => {
    return cart.some((obj) => Number(obj.parentId) === Number(id));
  };

  const addOrder = async () => {
    try {
      setLoad(true);
      const { data } = await axios.post(
        "https://634ff5f3df22c2af7b5f0089.mockapi.io/order",
        {
          items: cart,
        }
      );

      setNumberOrder(data.id);
      setOrder(true);
      setCart([]);
      for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        await axios.delete(
          "https://634ff5f3df22c2af7b5f0089.mockapi.io/cart/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {}
    setLoad(false);
  };
  const onClickRemove = () => {
    setOpDraver(false);
    setOrder(false);
  };
  return (
    <AppContext.Provider
      value={{
        isItemAdded,

        addOrder,
        order,
        cart,
        setCart,
        onClickRemove,
        numberOrder,
        load,
      }}
    >
      <Router>
        <div className="wrapper clear">
          <Drawer
            cart={cart}
            onClickRemove={onClickRemove}
            itemDelete={itemDelete}
            open={opDraver}
          />

          <Header onClickCart={() => setOpDraver(true)} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  input={input}
                  setInput={setInput}
                  items={items}
                  itemAdd={itemAdd}
                  favoriteAdd={favoriteAdd}
                  cart={cart}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              exact
              path="/favorite"
              element={
                <Favorite
                  itemAdd={itemAdd}
                  favoriteAdd={favoriteAdd}
                  favorite={favorite}
                />
              }
            />
            <Route exact path="/orders" element={<Orders />} />
            <Route exact path="/newItems" element={<NewItem />} />
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
