
jest.useFakeTimers();

const skuSchema = require('../controller/models/skus');
const stylesSchema = require('../controller/models/styles');
const featuresSchema = require('../controller/models/features');
const productSchema = require('../controller/models/product');
const photoSchema = require('../controller/models/photos');



describe('Sample test...', () => {
  function sum(a,b) {
    return a + b;
  }

  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1,2)).toBe(3);
  });

})

describe('Unit tests for created DB tables ', () => {
  test('features table is already created', () => {
    expect(featuresSchema()).toBe(true);
  })

  test('photo table is already created', () => {
    expect(photoSchema()).toBe(true);
  })

  test('product table is already created', () => {
    expect(productSchema()).toBe(true);
  })

  test('skus table is already created', () => {
    expect(skuSchema()).toBe(true);
  })

  test('styles table is already created', () => {
    expect(stylesSchema()).toBe(true);
  })
})


