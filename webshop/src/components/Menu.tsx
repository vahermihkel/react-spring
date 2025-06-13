import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import en from "../assets/en.png";
import et from "../assets/et.png";
import { useContext } from 'react';
import { CartSumContext } from '../context/CartSumContext';
import { AuthContext } from '../context/AuthContext';
// import { useSelector } from 'react-redux';
import { useAppSelector } from '../redux/hooks';

function Menu() {
  const { t, i18n } = useTranslation();
  const { cartSum } = useContext(CartSumContext);
  const { loggedIn, logout } = useContext(AuthContext);
  const count = useAppSelector(state => state.count.value);
  const differentProducts = useAppSelector(state => state.differentProducts.value);

  const changeLang = (newLang: string) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  } 

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {loggedIn && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}
            <Nav.Link as={Link} to="/shops">{t("nav.shops")}</Nav.Link>
            <Nav.Link as={Link} to="/contact">{t("nav.contact")}</Nav.Link>
            <Nav.Link as={Link} to="/cart">{t("nav.cart")}</Nav.Link>

          </Nav>
          <Nav>
            <span>{count} total pcs / {differentProducts} different pcs / {cartSum.toFixed(2)}€</span> 
            {loggedIn ?
              <Nav.Link onClick={logout}>{t("nav.logout")}</Nav.Link> :
              <>
                <Nav.Link as={Link} to="/login">{t("nav.login")}</Nav.Link>
                <Nav.Link as={Link} to="/signup">{t("nav.signup")}</Nav.Link>
              </>
            }
            <Nav.Link>
              <img src={en} className="icon" alt="" onClick={() => changeLang("en")} />
              <img src={et} className="icon" alt="" onClick={() => changeLang("et")} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;