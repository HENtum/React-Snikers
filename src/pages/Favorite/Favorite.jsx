import { Link } from "react-router-dom";
import Card from "../../components/Card";

const Favorite = ({ favorite, itemAdd, favoriteAdd }) => {
  return (
    <div className="content p-40">
      {favorite.length < 1 ? (
        <div className="noneOrder align-center">
          <ul className="mt-40">
            <li className="d-flex justify-center align-center mb-24">
              <img
                width={70}
                height={70}
                src="img/noFavorite.svg"
                alt="smile"
              />
            </li>
            <li className="d-flex justify-center">
              <h1 className="d-flex">Закладок нет :(</h1>
            </li>
            <li className=" orderLi d-flex justify-center mb-10">
              У вас нет вкуса?
            </li>
            <li className=" orderLi d-flex justify-center">
              Вы ничего не добавляли в закладки
            </li>
          </ul>
          <Link className="d-flex justify-center" to="/">
            <button className="greenButton">
              <img className="img" src="img/arrov.svg" alt="Arrov" />
              Вернуться назад
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="d-flex align-center ml-20 mb-40">
            <ul className="d-flex">
              <Link to="/">
                <li className="ml-145 cu-p mt-25">
                  <img
                    src="/img/return.svg"
                    alt="Вернуться на главную страницу"
                  />
                </li>
              </Link>
              <li className="ml-20">
                <h1 className="mb-40">Мои закладки</h1>
              </li>
            </ul>
          </div>
          <div className="d-flex flex-wrap">
            {favorite.map((item) => {
              return (
                <Card
                  key={item.id}
                  title={item.title}
                  price={item.price}
                  img={item.img}
                  item={item}
                  itemAdd={itemAdd}
                  favoriteAdd={favoriteAdd}
                  favorited={true}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorite;
