const sql = require('mssql');
const sqlConfig = require('/home/bofowzi/Documents/rpp29/sdc/productOverview/controller/index.js');

async function getProducts () {
  try {
    let pool = await sql.connect(sqlConfig);
    let products = await pool.request().query("SELECT * from Product");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function getProduct(productId) {
  let formatFeatures = {};
  try {
    let pool = await sql.connect(sqlConfig);
    // console.log('productId ', productId)
    let product = await pool.request()
    .input('input_parameter', sql.Int, productId)
    .query("SELECT *, features = (SELECT features.feature, features.value FROM features WHERE product.id = features.product_id FOR JSON PATH, INCLUDE_NULL_VALUES ) FROM product WHERE product.id IN (@input_parameter)");

    formatFeatures = JSON.parse(product.recordsets[0][0].features);

    product.recordsets[0][0].features = formatFeatures;

    // console.log('Before ',  product.recordsets[0][0].id )
    product.recordsets[0][0].id = parseInt(product.recordsets[0][0].id, 10)
    // console.log('After ', typeof product.recordsets[0][0].id )

    return product.recordsets;
  }
  catch (error) {
    console.log(error);
    return
  }
}

async function getStyles(productId) {
  const styles = {};

  try {
    let pool = await sql.connect(sqlConfig);

    styles.product_id = productId;
    let related = await pool.request()
    .input('input_parameter', sql.Int, productId)
    .query("select style_id = id, name, original_price, sale_price, 'default?' = default_style from styles where productId= @input_parameter");

    styles.results = related.recordsets[0];

    for (const style of styles.results) {
      style.photos = [];
      style.skus = {};

      if (style["default?"] == "1") {
        style["default?"] = true;
      }
      else if (style["default?"] == "0") {
        style["default?"] = false;
      }

      let stylePhotos = await pool.request()
      .input('input_parameter', sql.BigInt, style.style_id)
      .query("select url from photos where styleId= @input_parameter");

      stylePhotos.recordsets[0].forEach((link) => {
        let linkArray = link.url.split(",")
        style.photos.push({"thumbnail_url":JSON.parse(linkArray[0]), "url":JSON.parse(linkArray[1])})
      })

      let styleSkus = await pool.request()
      .input('input_parameter', sql.BigInt, style.style_id)
      .query("select id, size, quantity from skus where styleId= @input_parameter");

      styleSkus.recordsets[0].forEach((sku) => {
        style.skus[sku.id] = {"quantity" : JSON.parse(sku.quantity), "size": JSON.parse(sku.size)}
      })
    }
    return styles;
  }
  catch (error) {
    console.log(error)
    return
  }
}

async function getRelated(productId) {
  try {
    let pool = await sql.connect(sqlConfig);
    let product = await pool.request()
    .input('input_parameter', sql.Int, productId)
    .query("select id from styles where productId = @input_parameter");

    let related = product.recordsets[0].map(a=> parseInt(a.id,10));

    return related;
  }
  catch (error) {
    console.log(error);
    return
  }
}

async function getSDC (productArray) {
  let formatPrice = {}
  let formatPhotos = {}
  try {
    let pool = await sql.connect(sqlConfig);
    let product = await pool.request()
    .input('input_parameter', sql.Int, productArray)
    .query("select product.id, product.name, product.category, product.default_price, salePrice = (select sale_price from styles where (product.id = styles.productId AND styles.default_style = 1) FOR JSON PATH, INCLUDE_NULL_VALUES), photos = (select url from photos where product.id = photos.id FOR JSON PATH, INCLUDE_NULL_VALUES ) from product where product.id= @input_parameter");

    formatPrice = JSON.parse(product.recordsets[0][0].salePrice);
    formatPhotos = JSON.parse(product.recordsets[0][0].photos);

    product.recordsets[0][0].salePrice = formatPrice;
    product.recordsets[0][0].photos = formatPhotos;

    return  product.recordsets;
  }
  catch (error) {
    console.log(error);
    return
  }
}

module.exports = {
  getProducts: getProducts,
  getProduct: getProduct,
  getStyles: getStyles,
  getRelated: getRelated,
  getSDC: getSDC
}
