import axios from "axios";
import ProductList from "../components/Index/ProductList";
import ProductPagination from "../components/Index/ProductPagination";
import baseUrl from "../utils/baseUrl";

function Home({ products, totalPages }) {
  return (
    <>
      <ProductList products={products} />
      <ProductPagination totalPages={totalPages} />
    </>
  );
}

// add data to Home props
Home.getInitialProps = async ctx => {
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 10;

  // fetch data on the server
  // return response data as an object
  // this object will be merged with existing props
  const url = `${baseUrl}/api/products`;
  const payload = { params: { page, size } };
  const response = await axios.get(url, payload);
  return response.data;
};

export default Home;
