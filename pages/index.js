import axios from "axios";

function Home({ products }) {
  console.log(products);

  return <>home</>;
}

// add data to Home props
Home.getInitialProps = async () => {
  // fetch data on the server
  // return response data as an object
  // this object will be merged with existing props
  const url = "http://localhost:3000/api/products";
  const response = await axios.get(url);
  return { products: response.data };
};

export default Home;
