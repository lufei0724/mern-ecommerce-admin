import { useState, useEffect } from "react";
import productService from "../services/product";
import { PUBLIC_URL } from "../urlConfig";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import dateLib from "../libs/date";

const Product = (props) => {
  const { product, index } = props;
  const productImage = product.productImages[0].name;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <Image
          href={product.name}
          src={`${PUBLIC_URL}\\${productImage}`}
          style={{ maxWidth: "64px", maxHeight: "64px" }}
        />
      </td>
      <td>{product.name}</td>
      <td>{product.category.name}</td>
      <td>{product.price}</td>
      <td>{product.createdBy.username}</td>
      <td>{dateLib.toLocaleDateString(product.updatedAt)}</td>
    </tr>
  );
};
const Products = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    productService
      .getAll()
      .then((data) => {
        console.log(data);
        setProductList(data);
      })
      .catch((error) => console.log(error.message));
  }, []);
  return (
    <Container>
      <div className="d-flex justify-content-between pb-2 mb-3 border-bottom">
        <h3>Products</h3>
        <Button>Add New</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Picture</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Created By</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => (
            <Product key={product.id} product={product} index={index} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Products;
