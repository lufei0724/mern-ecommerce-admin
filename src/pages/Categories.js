import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import categoryService from "../services/category";
import Form from "react-bootstrap/Form";
import Input from "../components/UI/Input";
import Select from "../components/UI/Select";

const Category = (props) => {
  const { categories, closeForm } = props;
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getCategoryOptions = (categories) => {
      let options = [];
      for (const category of categories) {
        options.push(category);
        if (category.children && category.children.length > 0) {
          options = [...options, ...getCategoryOptions(category.children)];
        }
      }
      return options;
    };
    const options = getCategoryOptions(categories).map((category) => ({
      value: category.id,
      text: category.name,
    }));
    setOptions(options);
  }, [categories]);

  const createCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("parentId", parentId);
    for (const value of formData.values()) {
      console.log(value);
    }
    categoryService
      .addNew(formData)
      .then((data) => {
        console.log(data);
        closeForm();
      })
      .catch((error) => console.log(error.message));
  };

  const handleParentCategoryChange = (e) => {
    const target = e.target;
    setParentId(target.value);
  };

  return (
    <Form onSubmit={createCategory}>
      <Input
        controlId="categoryName"
        label="Category Name"
        type="text"
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <Select
        controlId="parentCategory"
        label="Parent Category"
        options={options}
        value={parentId}
        onChange={handleParentCategoryChange}
      />
      <div className="modal-footer">
        <Button variant="secondary" onClick={closeForm}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    return (
      <ul>
        {categories.map((category) => {
          return (
            <li key={category.id}>
              {category.name}
              {category.children &&
                category.children.length > 0 &&
                renderCategories(category.children)}
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    categoryService
      .getAll()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.log(error.message));
  }, [show]);
  return (
    <Container fluid>
      <div className="d-flex justify-content-between pb-2 mb-3 border-bottom">
        <h3>Categories</h3>
        <Button onClick={handleShow}>Add New</Button>
      </div>
      <div>{renderCategories(categories)}</div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create new category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Category
            categories={categories}
            setCategories={setCategories}
            closeForm={handleClose}
          />{" "}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Categories;
