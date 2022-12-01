import Card from "../../components/Card";

const Home = ({
  input,
  setInput,
  items,
  itemAdd,
  favoriteAdd,

  isLoading,
}) => {
  const arr = [{}, {}, {}, {}, {}, {}, {}, {}];

  const loaded = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(input.toLowerCase())
    );

    return (isLoading ? arr : filtredItems).map((item) => (
      <Card
        key={item.id}
        title={item.title}
        price={item.price}
        img={item.img}
        item={item}
        itemAdd={itemAdd}
        favoriteAdd={favoriteAdd}
        loading={isLoading}
        id={item.id}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1 className="mb-40">
          {input ? "Поиск по запросу: " + input : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="search" />
          <input
            placeholder="Поиск..."
            onChange={(event) => {
              setInput(event.target.value);
            }}
            value={input}
          />
          {input && (
            <img
              onClick={() => setInput("")}
              className="cu-p"
              src="img/btn-remove.svg"
              alt="Очистить"
            />
          )}
        </div>
      </div>

      <div className="d-flex flex-wrap">{loaded()}</div>
    </div>
  );
};

export default Home;
