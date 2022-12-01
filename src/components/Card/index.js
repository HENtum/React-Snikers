import { useContext, useState } from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";
import styles from "./Card.module.scss";

const Card = ({
  title,
  price,
  img,
  item,
  itemAdd,
  favoriteAdd,
  favorited = false,
  id,
  loading,
  props,
}) => {
  const { isItemAdded } = useContext(AppContext);

  const [liked, setLiked] = useState(favorited);
  const obj = { id, parentId: id, title, price, img };
  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={210}
          height={260}
          viewBox="0 0 210 260"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
          <rect x="0" y="107" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="163" rx="8" ry="8" width="80" height="24" />
          <rect x="0" y="126" rx="3" ry="3" width="93" height="15" />
          <rect x="119" y="155" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {favoriteAdd && (
            <div
              onClick={() => {
                setLiked(true);
                favoriteAdd(item);
              }}
              className={styles.favorite}
            >
              <img
                src={liked ? "img/liked.png" : "img/unliked.png"}
                alt="Liked"
              />
            </div>
          )}
          <img width={133} height={112} src={img} alt="Кроссовка" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column ">
              <span>Цена</span>
              <b>{price}</b>
            </div>
            {itemAdd && (
              <img
                className={styles.plus}
                onClick={() => {
                  itemAdd(obj);
                }}
                src={
                  isItemAdded(id)
                    ? "img/sneakers/AddCart.svg"
                    : "img/sneakers/plus.svg"
                }
                alt="кнопка"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
