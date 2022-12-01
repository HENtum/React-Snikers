import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context";

const Header = ({ onClickCart }) => {
  const { cart } = useContext(AppContext);
  const totalBlock = cart.reduce(
    (sum, obj) => Number.parseFloat(obj.price) + sum,
    0
  );

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="img/logo.png" alt="Логотип" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li onClick={onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="img/cart.png" alt="Корзина" />
          <span>{new Intl.NumberFormat().format(totalBlock)} руб.</span>
        </li>
        <Link to="/favorite">
          <li className="cu-p ml-30 mr-30">
            <img src="img/favorite.png" alt="Вкладка избранные" />
          </li>
        </Link>

        <Link to="/orders">
          <li>
            <img width={18} height={18} src="img/user.png" alt="Профиль" />
          </li>
        </Link>
        <Link to="/newItems">
          <li>
            Перейти на страницу<br></br>добавления нового товара
          </li>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
