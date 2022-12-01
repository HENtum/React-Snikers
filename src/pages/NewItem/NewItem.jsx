import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./NewItem.scss";

const NewItem = () => {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [add, setAdd] = useState(false);
  const deleteInputs = () => {
    setTitle("");
    setPrice("");
    setImage("");
  };
  const [newItems, setNewItems] = useState([
    {
      title: "",
      price: "",
      img: "",
    },
  ]);
  useEffect(() => {
    const addNewItem = () => {
      setNewItems(() => {
        return newItems.map((item) => {
          return {
            ...item,
            title: title,
            price: price,
            img: image,
          };
        });
      });
    };
    return addNewItem();
  }, [image]);
  const addAxios = () => {
    setAdd(true);
    newItems.map((item) => {
      return axios.post(
        "https://634ff5f3df22c2af7b5f0089.mockapi.io/items",
        item
      );
    });
    setAdd(false);
  };

  return (
    <div className="p-40">
      <h1>Добавление нового товара</h1>
      <div className="d-flex justify-center">
        <ul>
          <li className="newItemLi">
            <input
              onChange={(event) => setTitle(event.target.value)}
              value={title}
              placeholder="Название товара"
            />
            {title && (
              <img
                onClick={() => setTitle("")}
                className="cu-p"
                src="img/btn-remove.svg"
                alt="Очистить"
              />
            )}
          </li>

          <li className="newItemLi">
            <input
              onChange={(event) => setPrice(event.target.value)}
              value={price}
              placeholder="Цена товара"
            />
            {price && (
              <img
                onClick={() => setPrice("")}
                className="cu-p"
                src="img/btn-remove.svg"
                alt="Очистить"
              />
            )}
          </li>
          <li className="newItemLi">
            <input
              onChange={(event) => setImage(event.target.value)}
              value={image}
              placeholder="Картина товара"
            />
            {image && (
              <img
                onClick={() => setImage("")}
                className="cu-p"
                src="img/btn-remove.svg"
                alt="Очистить"
              />
            )}
          </li>
          <li className="newItemButton d-flex">
            <button onClick={addAxios}>Добавить</button>
            {title || price || image ? (
              <p onClick={deleteInputs}>Очистить все</p>
            ) : (
              ""
            )}
          </li>
        </ul>
      </div>
      {add && "Добавление товвара происходит прямо сейчас"}
    </div>
  );
};

export default NewItem;
