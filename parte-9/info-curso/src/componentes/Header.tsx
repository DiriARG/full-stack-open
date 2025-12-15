interface HeaderProp {
  nombre: string;
}

const Header = ({ nombre }: HeaderProp) => {
  return <h1>{nombre}</h1>;
};

export default Header;
