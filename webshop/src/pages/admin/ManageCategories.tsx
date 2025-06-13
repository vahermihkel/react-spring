import { useEffect, useRef, useState } from "react"
import { Category } from "../../models/Category";
// import useFetchItems from "../../hooks/useFetchItems";
import ConfirmationModal, { ConfirmationModalRef } from "../../components/ConfirmationModal";


function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  // const url = import.meta.env.VITE_DB_CATEGORIES_URL || "";
  const url = "http://localhost:8080/categories";
  const categoryRef = useRef<HTMLInputElement>(null);
  // const dbCategories = useFetchItems(url);
  const idToBeDeletedRef = useRef<number>(-1);
  const modalRef = useRef<ConfirmationModalRef>(null);

  // useEffect(() => {
  //   setCategories(dbCategories);
  // }, [dbCategories]);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => setCategories(json))
  }, []);

  const addCategory = () => {
    if (categoryRef.current === null) {
      return;   
    }
    fetch(url, {
      method: "POST", 
      body: JSON.stringify({name: categoryRef.current.value}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(
      json => {
        setCategories(json);
        if (categoryRef.current === null) {
          return;   
        }
        categoryRef.current.value = "";
      }
    )
  }

  const deleteCategory = () => {
    // console.log(indexToBeDeletedRef.current);
    // categories.splice(indexToBeDeletedRef.current,1);
    fetch(url + "/" + idToBeDeletedRef.current, {method: "DELETE", body: JSON.stringify(categories)})
    .then(res=>res.json())
    .then(
      json => {
        if (modalRef.current !== null) {
          modalRef.current.setShow(false);
        } 
        setCategories(json)
      }
    )
  }

  return (
    <div>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <ConfirmationModal 
        ref={modalRef} 
        deleteHandler={deleteCategory} 
        indexRef={idToBeDeletedRef} 
      />
      
      <label>Category</label> <br />
      <input ref={categoryRef} type="text" /> <br />
      <button onClick={addCategory}>Add</button> <br />
      {categories.map((category) => 
        <div key={category.name}>
          {category.name}
          <button onClick={() => modalRef.current?.handleShow(category.id ? category.id : -1)}>x</button>
        </div>)}
    </div>
  )
}

export default ManageCategories