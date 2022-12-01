import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../../components/Card";

import "./Orders.scss";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://634ff5f3df22c2af7b5f0089.mockapi.io/order"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      } catch (error) {}
    })();
  }, []);
  const deleteOrders = async () => {
    try {
      setOrders([]);
      for (let i = 0; i < orders.length; i++) {
        let item = orders[i];
        await axios.delete(
          "https://634ff5f3df22c2af7b5f0089.mockapi.io/order/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Ошибка");
    }
  };

  return (
    <div className="content p-40">
      {orders.length < 1 ? (
        <div className="d-flex justify-center">
          <div className="noneOrder align-center">
            <ul className="mt-40">
              <li className="d-flex justify-center align-center mb-24">
                <img width={70} height={70} src="img/smile.svg" alt="smile" />
              </li>
              <li className="d-flex justify-center">
                <h1 className="d-flex">У вас нет заказов</h1>
              </li>
              <li className=" orderLi d-flex justify-center mb-10">
                Вы нищеброд ?
              </li>
              <li className=" orderLi d-flex justify-center">
                Оформите хотя бы один заказ
              </li>
            </ul>
            <Link to="/">
              <button className="greenButton">
                <img className="img" src="img/arrov.svg" alt="Arrov" />
                Вернуться назад
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="d-flex align-center justify-between mb-40">
            <h1>Мои заказы</h1>
          </div>
          <div className="d-flex flex-wrap">
            {orders.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </div>
          {orders.length > 0 ? (
            <div
              onClick={deleteOrders}
              className="deleteOrders d-flex  justify-center mt-20"
            >
              Очистить страницу заказов
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
