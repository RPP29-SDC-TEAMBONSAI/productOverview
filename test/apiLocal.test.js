const sql = require('mssql');
const request = require('supertest');


const sqlConfig = require('../controller/index.js');
const router = require('../routes/products.js');
const route2 = require('../routes/sdc.js');

describe('Sample test...', () => {
  function sum(a,b) {
    return a + b;
  }

  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1,2)).toBe(3);
  });

})

describe('Unit tests for created DB tables ', () => {

  let pool;

  beforeAll(async () => {
    pool = await sql.connect(sqlConfig);
  })

  afterAll(async () => {
    await pool.close();
  })

  test('features table is created', async () => {
    let features = await pool.request().query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'features'");
    expect(features.recordsets[0][0].TABLE_NAME).toBe('features');
  })

  test('photos table is created', async () => {
    let photos = await pool.request().query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'photos'");
    expect(photos.recordsets[0][0].TABLE_NAME).toBe('photos');
  })

  test('product table is created', async () => {
    let product = await pool.request().query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'product'");
    expect(product.recordsets[0][0].TABLE_NAME).toBe('product');
  })

  test('skus table is created', async () => {
    let skus = await pool.request().query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'skus'");
    expect(skus.recordsets[0][0].TABLE_NAME).toBe('skus');
  })

  test('styles table is created', async () => {
    let styles = await pool.request().query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'styles'");
    expect(styles.recordsets[0][0].TABLE_NAME).toBe('styles');
  })
})


describe('Integration test with product GET / routes', () => {
  let pool;

  beforeAll(async () => {
    pool = await sql.connect(sqlConfig);
  })

  afterAll(async () => {
    await pool.close();
  })

  test('Should return array of product objects from /products', async () => {
    let response = await request(router).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body[2].name).toBe('Morning Joggers');
  })

  test('Should return a product object from /products/:product', async () => {
    let response = await request(router).get('/:product_id')
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Belle Shirt');
  })

  test('Should return a related products array from from /products/:product/related', async () => {
    let response = await request(router).get('/:product_id/related')
    expect(response.statusCode).toBe(200);
    expect(response.body[3]).toBe(50);
  })

  test('Should return a styles products array from from /products/:product/syles', async () => {
    let response = await request(router).get('/:product_id/styles')
    expect(response.statusCode).toBe(200);
    expect(response.body.product_id).toBe(15);
  })

  test('Should return a styles products array from from /products/:product/syles', async () => {
    let response = await request(router).get('/:product_id/styles')
    expect(response.statusCode).toBe(200);
    expect(response.body.product_id).toBe(15);
  })

  test('Should return the custom array from /sdc', async () => {
    let response = await request(route2).get('/')
    expect(response.statusCode).toBe(200);
  })
})