import { NavLink } from "react-router-dom";

function Header() {
  const linkStyle = {
    marginRight: "20px",
    textDecoration: "none",
    fontSize: "18px",
    color: "#333",
  };

  const activeStyle = {
    color: "red",
    fontWeight: "bold",
  };

  return (
    <nav style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
      >
        Home
      </NavLink>
      <NavLink
        to="/product"
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
      >
        Product
      </NavLink>
      <NavLink
        to="/detail"
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
      >
        Detail
      </NavLink>
    </nav>
  );
}

export default Header;