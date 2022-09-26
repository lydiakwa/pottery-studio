const app = require('../server/app');
const supertest = require('supertest');
const { db, Product } = require('../server/db/index');

beforeAll(async () => {
  await db.sync({ force: true });
});

it('Testing to see if Jest works', () => {
  expect(1).toBe(1);
});

test('GET /api/products', async () => {
  const product = await Product.create({
    title: 'test',
    colour: 'red',
    type: 'bowl',
  });

  await supertest(app).get('/api/products').expect(200);
});
