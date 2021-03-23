import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Input from "../components/UI/Input";
import Select from "../components/UI/Select";

const Product = () => {
  const [cateId, setCateId] = useState("");
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (e) => {
    const target = e.target;
    setCateId(target.value);
  };
  return (
    <Container fluid>
      <div className="d-flex justify-content-between pb-2 mb-3 border-bottom">
        <h3>Create New Product</h3>
      </div>
      <Col sm={12} md={10} xl={6}>
        <Form enctype="multipart/form-data">
          <Input
            controlId="productImages"
            label="Product Images"
            type="file"
            horizontal
          />
          <Input
            controlId="productName"
            label="Product Name"
            type="text"
            horizontal
          />
          <Input
            controlId="productDesc"
            label="Description "
            type="text"
            horizontal
          />
          <Select
            controlId="productCate"
            label="Category"
            options={categories}
            value={cateId}
            onChange={handleCategoryChange}
            horizontal
          />
          <Input
            controlId="productBrand"
            label="Brand"
            type="text"
            horizontal
          />
          <Input
            controlId="productPrice"
            label="Price"
            type="number"
            horizontal
          />
          <Form.Group as={Row}>
            <Col lg={{ span: 9, offset: 3 }}>
              <Button variant="secondary" className="mr-2">
                Cancel
              </Button>
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
