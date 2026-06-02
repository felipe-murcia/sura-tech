/**
 * Strapi seed script — run with:
 *   node seed.js
 *
 * Place this file in the root of the strapi-api project.
 * Make sure Strapi is running (`npm run develop`) before executing.
 *
 * Requires: node-fetch (built-in in Node 18+)
 */

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN ?? ''; // Admin API token
const FAKESTORE_URL = 'https://fakestoreapi.com/products';

async function fetchFakeStoreProducts() {
  const res = await fetch(FAKESTORE_URL);
  if (!res.ok) throw new Error(`FakeStore fetch failed: ${res.status}`);
  return res.json();
}

async function createStrapiProduct(product, token) {
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const body = JSON.stringify({
    data: {
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    },
  });

  const res = await fetch(`${STRAPI_URL}/api/products`, {
    method: 'POST',
    headers,
    body,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Strapi create failed (${res.status}): ${err}`);
  }

  return res.json();
}

async function seed() {
  console.log('Fetching products from FakeStore API…');
  const products = await fetchFakeStoreProducts();
  console.log(`Found ${products.length} products. Seeding Strapi…`);

  for (const product of products) {
    try {
      const created = await createStrapiProduct(product, STRAPI_TOKEN);
      console.log(`  ✔ Created: ${created.data.attributes?.title ?? product.title}`);
    } catch (err) {
      console.error(`  ✖ Failed: ${product.title} — ${err.message}`);
    }
  }

  console.log('Seed complete.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
