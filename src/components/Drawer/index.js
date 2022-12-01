import { useContext } from "react";
import AppContext from "../../context";
import AboutDrawer from "../AboutDrawer";

import styles from "./Drawer.module.scss";

const Drawer = ({ onClickRemove, cart, itemDelete, open }) => {
  const { addOrder, order, numberOrder, load } = useContext(AppContext);
  const totalPrice = cart.reduce(
    (sum, obj) => Number.parseFloat(obj.price) + sum,
    0
  );
  return (
    <div className={`${styles.overlay} ${open ? styles.visibleOverlay : ""}`}>
      <div className={styles.drawer}>
        <h2 className=" d-flex justify-between mb-30">
          Корзина{" "}
          <img
            onClick={onClickRemove}
            className="remove-btn cu-p"
            src="img/btn-remove.svg"
            alt="Remove"
          />
        </h2>
        {cart.length > 0 ? (
          <div className="items">
            {cart.map((item) => {
              return (
                <div
                  key={item.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${item.img})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{item.title}</p>
                    <b>{item.price} руб.</b>
                  </div>
                  <img
                    onClick={() => itemDelete(item.id)}
                    className="remove-btn"
                    src="img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <AboutDrawer
            title={order ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              order
                ? `Ваш заказ № ${numberOrder} скоро будет передан курьерской доставке`
                : " Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
            }
            img={order ? "img/addOrder.jpg" : "img/emty-cart.jpg"}
            onClickRemove={onClickRemove}
          />
        )}

        <div className="cartTotalBlock">
          <ul className="cartTotalBlock">
            <li>
              <span>Итого:</span>
              <div></div>
              <b>{totalPrice} руб.</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>{(totalPrice / 100) * 5} руб.</b>
            </li>
          </ul>
          <button
            disabled={load}
            className="greenButton"
            onClick={() => addOrder()}
          >
            Оформить заказ <img src="img/arrov.svg" alt="Arrov" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
