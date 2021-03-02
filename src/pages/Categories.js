import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import categoryService from "../services/category";
import Form from "react-bootstrap/Form";
import Input from "../components/UI/Input";
import Select from "../components/UI/Select";
import Card from "react-bootstrap/Card";

const CategoryInput = (props) => {
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

const Category = (props) => {
  const { category } = props;
  const [displayChild, setDisplayChild] = useState(category.displayChildren);

  let childStyle = {};
  if (!displayChild) {
    childStyle.maxHeight = "0";
    childStyle.overflow = "hidden";
    childStyle.padding = "0";
    childStyle.minHeight = "0";
  }

  const toggleDisplayChild = () => {
    setDisplayChild(!displayChild);
  };

  return (
    <div>
      <Card.Header onClick={toggleDisplayChild}>
        <span>{category.name}</span>
        {category.children.length > 0 && (
          <span style={{ paddingLeft: "0.5rem" }} className="text-secondary">
            ({category.children.length})
          </span>
        )}
      </Card.Header>
      {category.children.length > 0 && (
        <Card.Body style={childStyle}>{props.children}</Card.Body>
      )}
    </div>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /*
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
  */

  const renderCategories = (categories) => {
    return categories.map((cat) => {
      return (
        <Category category={cat} key={cat.id}>
          {cat.children &&
            cat.children.length > 0 &&
            renderCategories(cat.children)}
        </Category>
      );
    });
  };

  useEffect(() => {
    const initCategories = (categories) => {
      let newCategories = [];
      for (const cate of categories) {
        newCategories.push({
          ...cate,
          displayChildren: false,
          children: initCategories(cate.children, cate.id),
        });
      }
      return newCategories;
    };

    categoryService
      .getAll()
      .then((data) => {
        const newCategories = initCategories(data);
        console.log(newCategories);
        setCategories(newCategories);
      })
      .catch((error) => console.log(error.message));
  }, [show]);
  return (
    <Container fluid>
      <div className="d-flex justify-content-between pb-2 mb-3 border-bottom">
        <h3>Categories</h3>
        <Button onClick={handleShow}>Add New</Button>
      </div>
      {categories.length > 0 && <Card>{renderCategories(categories)}</Card>}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create new category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryInput
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
