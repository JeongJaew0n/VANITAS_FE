import { delay, http, HttpResponse } from 'msw';

import { categories, flashDeal, products } from '@/shared/api/mock/data';
import type { CartItem, LoginResponse, Page, Product } from '@/shared/types/api';

let cartItems: CartItem[] = [];

export const handlers = [
  http.get('*/api/categories', async () => {
    await delay(250);
    return HttpResponse.json(categories);
  }),
  http.get('*/api/products/best', async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit') ?? 8);
    return HttpResponse.json(products.slice(0, limit));
  }),
  http.get('*/api/products', async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const page = Number(url.searchParams.get('page') ?? 0);
    const size = Number(url.searchParams.get('size') ?? 12);
    const filtered = category ? products.filter((product) => product.category === category) : products;
    const content = filtered.slice(page * size, page * size + size);
    const response: Page<Product> = {
      content,
      page,
      size,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
    };
    return HttpResponse.json(response);
  }),
  http.get('*/api/products/:id', async ({ params }) => {
    await delay(200);
    const product = products.find((item) => item.id === Number(params.id));
    return product ? HttpResponse.json(product) : new HttpResponse(null, { status: 404 });
  }),
  http.get('*/api/deals/flash', async () => {
    await delay(180);
    return HttpResponse.json(flashDeal);
  }),
  http.post('*/api/auth/login', async () => {
    await delay(400);
    const response: LoginResponse = {
      token: 'mock-token',
      user: { id: 1, name: 'VANITAS PLAYER', email: 'player@vanitas.shop' },
    };
    return HttpResponse.json(response);
  }),
  http.get('*/api/cart', async () => {
    await delay(250);
    return HttpResponse.json(cartItems);
  }),
  http.post('*/api/cart', async ({ request }) => {
    await delay(250);
    const body = (await request.json()) as { productId: number; quantity?: number };
    const product = products.find((item) => item.id === body.productId);
    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }

    const existing = cartItems.find((item) => item.productId === body.productId);
    if (existing) {
      existing.quantity += body.quantity ?? 1;
      return HttpResponse.json(existing);
    }

    const item: CartItem = {
      id: Date.now(),
      productId: body.productId,
      quantity: body.quantity ?? 1,
      product,
    };
    cartItems = [...cartItems, item];
    return HttpResponse.json(item);
  }),
  http.post('*/api/wishlist/:productId', async () => {
    await delay(180);
    return new HttpResponse(null, { status: 204 });
  }),
];
