import { Link } from "react-router-dom";

function Menu() {
  return (
    <div>
      <Link to="/">
        <button>Avalehele</button>
      </Link>

      <Link to="/esindused">
        <button>Esindused</button>
      </Link>

      <Link to="/osta-kinkekaart">
        <button>Kinkekaart</button>
      </Link>

      <Link to="/ostukorv">
        <button>Ostukorv</button>
      </Link>

      <Link to="/seaded">
        <button>Seaded</button>
      </Link>

      <Link to="/lisa-toode">
        <button>Lisa toode</button>
      </Link>

      <Link to="/halda-tooteid">
        <button>Halda tooteid</button>
      </Link>
    </div>
  )
}

export default Menu