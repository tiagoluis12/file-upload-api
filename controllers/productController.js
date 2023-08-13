const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};
const uploadProductImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("no File Uploaded");
  }
  const productImage = req.files.productImage;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload an Image File");
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      `Please Upload an Image less than ${maxSize}`
    );
  }
};

module.exports = {
  createProduct,
  getAllProducts,
};
