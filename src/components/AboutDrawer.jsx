const AboutDrawer = ({ onClickRemove, title, description, img }) => {
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width={120} height={120} src={img} alt="Картина" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={onClickRemove} className="greenButton">
        <img className="img" src="img/arrov.svg" alt="Arrov" />
        Вернуться назад
      </button>
    </div>
  );
};

export default AboutDrawer;
