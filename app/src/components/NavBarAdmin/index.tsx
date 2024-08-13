import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../services/AuthenticationService";
import { Container, NavItems, HamburgerMenu } from "../NavBar/styles";
import { FaBook, FaClipboardList, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

export const NavBarAdmin = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate("/signin");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <NavItems isOpen={isOpen}>
        <li>
          <NavLink to="/admin/books">
            <FaBook /> Books
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/dashboard">
            <FaClipboardList /> Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/create-book">
            <FaPlus /> Add Books
          </NavLink>
        </li>
      </NavItems>
      <button className="sign-out" onClick={handleSignOut}>
        <FaSignOutAlt /> Sign Out
      </button>
      <HamburgerMenu onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </HamburgerMenu>
    </Container>
  );
};
