import { useContext } from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

function AdminHome() {
  const {role} = useContext(AuthContext);

  return (
    <div>
      <Link to="/admin/manage-categories">
        <Button variant="primary">Manage categories</Button>
      </Link>
      
      <Link to="/admin/manage-shops">
        <Button variant="secondary">Manage shops</Button>
      </Link>

      <Link to="/admin/add-product">
       <Button variant="success">Add product</Button>
      </Link>
       
      <Link to="/admin/manage-products">
        <Button variant="warning">Manage products</Button>
      </Link>

      {role === "SUPERADMIN" &&
      <Link to="/admin/manage-persons">
        <Button variant="info">Manage persons</Button>
      </Link>}
    </div>
  )
}

export default AdminHome