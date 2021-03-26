import { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Input from "../components/UI/Input";
import FileInput from "../components/UI/FileInput";
import Select from "../components/UI/Select";
import categoryService from "../services/category";
import productService from "../services/product";
import { Link, Redirect } from "react-router-dom";

const Product = () => {
  const initProduct = {
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
  };
  const [submitResult, setSubmitResult] = useState(false);
  const [product, setProduct] = useState(initProduct);
  const [categories, setCategories] = useState([]);
  const fileInput = useRef(null);

  useEffect(() => {
    categoryService
      .getLeaves()
      .then((data) =>
        setCategories(
          data.map((cate) => ({
            value: cate.id,
            text: cate.name,
          }))
        )
      )
      .catch((error) => console.log(error.message));
  }, []);

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const file of fileInput.current.files) {
      formData.append("productImages", file);
    }
    for (const prop in product) {
      formData.append(prop, product[prop]);
    }

    productService
      .addNew(formData)
      .then((data) => {
        console.log(data);
        setSubmitResult(true);
      })
      .catch((error) => console.log(error.message));
  };

  if (submitResult) return <Redirect to="/products" />;

  return (
    <Container fluid>
      <div className="d-flex justify-content-between pb-2 mb-3 border-bottom">
        <h3>Create New Product</h3>
      </div>
      <Col sm={12} md={10} xl={6}>
        <Form encType="multipart/form-data" onSubmit={handleSaveProduct}>
          <FileInput
            controlId="productImages"
            label="Product Images"
            ref={fileInput}
            horizontal
          />
          <Input
            controlId="productName"
            label="Product Name"
            type="text"
            value={product.name}
            onChange={({ target }) =>
              setProduct({ ...product, name: target.value })
            }
            horizontal
          />
          <Input
            controlId="productDesc"
            label="Description "
            type="text"
            value={product.description}
            onChange={({ target }) =>
              setProduct({ ...product, description: target.value })
            }
            horizontal
          />
          <Select
            controlId="productCate"
            label="Category"
            options={categories}
            value={product.category}
            onChange={({ target }) =>
              setProduct({ ...product, category: target.value })
            }
            horizontal
          />
          <Input
            controlId="productBrand"
            label="Brand"
            type="text"
            value={product.brand}
            onChange={({ target }) =>
              setProduct({ ...product, brand: target.value })
            }
            horizontal
          />
          <Input
            controlId="productPrice"
            label="Price"
            type="number"
            value={product.price}
            onChange={({ target }) =>
              setProduct({ ...product, price: target.value })
            }
            horizontal
          />
          <Form.Group as={Row}>
            <Col lg={{ span: 9, offset: 3 }}>
              <Link to="/products">
                <Button variant="secondary" className="mr-2">
                  Cancel
                </Button>
              </Link>
              <Button variant="primary" type="submit" className="mr-2">
                Save
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Container>
  );
};

export default Product;
