import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../services/AuthenticationService";
import { Container, NavItems, HamburgerMenu } from "./styles";
import { FaBook, FaShoppingCart, FaUserCircle, FaSignOutAlt, FaHistory, FaComments } from "react-icons/fa"; // Added FaHistory icon
import { useState } from "react";
import { useTranslation } from 'react-i18next';

export const NavBar = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
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
          <NavLink to="/books">
            <FaBook /> {t("app.Books")}
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart">
            <FaShoppingCart /> {t("app.cart")}
          </NavLink>
        </li>
        {userId && (
          <>
            <li>
              <NavLink to={`/user-profile/${userId}`}>
                <FaUserCircle /> {t("app.profile")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/order-history">
                <FaHistory /> {t("app.orderHistory")}  {/* Added Order History Link */}
              </NavLink>
            </li>
            <NavLink to="/chat">
                <FaComments /> {t("app.chat")}
            </NavLink>
          </>
        )}
      </NavItems>
      <button className="sign-out" onClick={handleSignOut}>
        <FaSignOutAlt /> {t("app.signout")}
      </button>
      <HamburgerMenu onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </HamburgerMenu>
    </Container>
  );
};
