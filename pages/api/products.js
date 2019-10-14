<<<<<<< HEAD
import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";
=======
import products from "../../static/products.json"
import connectDb from "../../utils/connectDb";

connectDb();
>>>>>>> a4e79d47a2e02a298dc416bcfbad62f7165ff0ad

connectDb();

export default async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
}