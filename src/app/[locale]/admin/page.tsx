'use client'

import React, { useEffect, useState } from "react";

// Admin Dashboard - Single-file Next.js + TypeScript example
// TailwindCSS utility classes assumed (install and configure Tailwind in your project)
// Place this file under `app/admin/page.tsx` (Next.js app router) or `pages/admin/index.tsx` (pages router).

// NOTE: This is a functional front-end shell with mocked API helpers. Replace the `api.*` functions
// with your real backend endpoints (suggested endpoints listed at the end of this file).

/* ===================== Types ===================== */

type Category = { id: string; name: string; slug?: string; createdAt?: string };

type Product = {
  id: string;
  title: string;
  sku?: string;
  price: number;
  currency?: string;
  categoryId?: string | null;
  stock?: number;
  description?: string;
  images?: string[];
};

type Order = { id: string; total: number; status: string; customerName: string; createdAt: string };

type User = { id: string; name: string; email: string; role: "admin" | "customer" | "editor" };

type Customer = { id: string; name: string; email: string; ordersCount?: number };

/* ===================== Mock API Helpers (replace with real fetch) ===================== */

const api = {
  // categories
  async fetchCategories(): Promise<Category[]> {
    // replace with: return fetch('/api/admin/categories').then(r=>r.json())
    return Promise.resolve([
      { id: "cat_1", name: "Masks", slug: "masks", createdAt: new Date().toISOString() },
      { id: "cat_2", name: "Fins", slug: "fins", createdAt: new Date().toISOString() },
    ]);
  },
  async createCategory(payload: { name: string }) {
    return Promise.resolve({ id: `cat_${Math.random()}`, ...payload, createdAt: new Date().toISOString() });
  },
  // products
  async fetchProducts(): Promise<Product[]> {
    return Promise.resolve([
      { id: "prod_1", title: "Classic Mask", price: 49.99, categoryId: "cat_1", stock: 20 },
      { id: "prod_2", title: "Sport Fins", price: 79.99, categoryId: "cat_2", stock: 12 },
    ]);
  },
  async createProduct(payload: Partial<Product>) {
    return Promise.resolve({ id: `prod_${Math.random()}`, ...payload } as Product);
  },
  async updateProduct(id: string, payload: Partial<Product>) {
    return Promise.resolve({...(payload as Product), id } as Product);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async deleteProduct(id: string) {
    return Promise.resolve({ success: true });
  },
  // orders
  async fetchOrders(): Promise<Order[]> {
    return Promise.resolve([
      { id: "ord_1", total: 129.98, status: "processing", customerName: "Carla M.", createdAt: new Date().toISOString() },
      { id: "ord_2", total: 49.99, status: "completed", customerName: "Luis R.", createdAt: new Date().toISOString() },
    ]);
  },
  // customers/users
  async fetchCustomers(): Promise<Customer[]> {
    return Promise.resolve([{ id: "cus_1", name: "Carla M.", email: "carla@example.com", ordersCount: 3 }]);
  },
  async fetchUsers(): Promise<User[]> {
    return Promise.resolve([{ id: "u_1", name: "Admin", email: "admin@divevzla.app", role: "admin" }]);
  },
  // insights
  async fetchInsights() {
    return Promise.resolve({ revenueMonth: 1234.5, ordersCount: 12, avgOrderValue: 102.88 });
  },
};

/* ===================== Small UI primitives ===================== */

function IconMenu() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function Empty({ message }: { message: string }) {
  return <div className="text-center text-sm text-gray-500 py-12">{message}</div>;
}

/* ===================== Main Admin Component ===================== */

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [route, setRoute] = useState<"dashboard" | "categories" | "products" | "orders" | "customers" | "users" | "insights" | "content">("dashboard");

  // Sidebar content reused for desktop and mobile
  const sidebarContent = (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">DV</div>
        <div>
          <div className="font-semibold">Dive Venezuela</div>
          <div className="text-xs text-gray-500">Admin Console</div>
        </div>
      </div>
      <nav className="space-y-1">
        <NavButton active={route === "dashboard"} onClick={() => { setRoute("dashboard"); setSidebarOpen(false); }}>Dashboard</NavButton>
        <NavButton active={route === "categories"} onClick={() => { setRoute("categories"); setSidebarOpen(false); }}>Categories</NavButton>
        <NavButton active={route === "products"} onClick={() => { setRoute("products"); setSidebarOpen(false); }}>Products</NavButton>
        <NavButton active={route === "orders"} onClick={() => { setRoute("orders"); setSidebarOpen(false); }}>Orders</NavButton>
        <NavButton active={route === "customers"} onClick={() => { setRoute("customers"); setSidebarOpen(false); }}>Customers</NavButton>
        <NavButton active={route === "users"} onClick={() => { setRoute("users"); setSidebarOpen(false); }}>App Users</NavButton>
        <NavButton active={route === "insights"} onClick={() => { setRoute("insights"); setSidebarOpen(false); }}>Insights</NavButton>
        <NavButton active={route === "content"} onClick={() => { setRoute("content"); setSidebarOpen(false); }}>Content</NavButton>
      </nav>
      <div className="mt-6 pt-4 border-t text-xs text-gray-500">Last login: {new Date().toLocaleString()}</div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-col md:flex-row gap-2 md:gap-6">
          {/* Sidebar: hidden on mobile, shown on md+ */}
          <aside className="hidden md:block w-full md:w-64 bg-white rounded-2xl p-4 shadow-sm mb-2 md:mb-0">
            {sidebarContent}
          </aside>
          {/* Burger menu icon for mobile */}
          <div className="md:hidden flex items-center mb-2">
            <button aria-label="Open sidebar" className="p-2" onClick={() => setSidebarOpen(true)}>
              <IconMenu />
            </button>
          </div>
          {/* Sidebar overlay for mobile */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
              <aside className="relative w-64 max-w-full bg-white rounded-r-2xl p-4 shadow-lg h-full z-50 flex flex-col">
                <button aria-label="Close sidebar" className="absolute top-2 right-2 p-2" onClick={() => setSidebarOpen(false)}>
                  <span className="text-xl">×</span>
                </button>
                {sidebarContent}
              </aside>
            </div>
          )}
          <main className="flex-1">
            <div className="bg-white rounded-2xl p-2 sm:p-4 shadow-sm">
              <TopBar onRouteChange={setRoute} onBurgerClick={() => setSidebarOpen(true)} />
              <div className="mt-2 sm:mt-4">
                {route === "dashboard" && <DashboardPage />}
                {route === "categories" && <CategoriesPage />}
                {route === "products" && <ProductsPage />}
                {route === "orders" && <OrdersPage />}
                {route === "customers" && <CustomersPage />}
                {route === "users" && <UsersPage />}
                {route === "insights" && <InsightsPage />}
                {route === "content" && <ContentPage />}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ===================== UI Subcomponents for pages ===================== */

function NavButton({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 ${
        active ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      <IconMenu />
      <span className="truncate">{children}</span>
    </button>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TopBar({ onRouteChange, onBurgerClick }: { onRouteChange: (r: any) => void; onBurgerClick?: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* Burger icon for mobile in top bar */}
        {onBurgerClick && (
          <button aria-label="Open sidebar" className="md:hidden p-2" onClick={onBurgerClick}>
            <IconMenu />
          </button>
        )}
        <span className="text-lg font-semibold">Admin Dashboard</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="px-3 py-1 rounded-md border border-gray-200 text-sm"
          onClick={() => onRouteChange("content")}
        >
          Edit Content
        </button>
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm">A</div>
      </div>
    </div>
  );
}

/* --------------------- Dashboard Page --------------------- */

function DashboardPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [insights, setInsights] = useState<any | null>(null);

  useEffect(() => {
    api.fetchInsights().then(setInsights);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card title="Monthly Revenue">{insights ? `$ ${insights.revenueMonth.toFixed(2)}` : <Loader />}</Card>
        <Card title="Orders">{insights ? insights.ordersCount : <Loader />}</Card>
        <Card title="Avg order">{insights ? `$ ${insights.avgOrderValue.toFixed(2)}` : <Loader />}</Card>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-medium">Recent Orders</h3>
          <RecentOrders />
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-medium">Low stock products</h3>
          <LowStockList />
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{children}</div>
    </div>
  );
}

function Loader() {
  return <div className="h-6 w-12 bg-gray-100 animate-pulse rounded" />;
}

function RecentOrders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  useEffect(() => {
    api.fetchOrders().then(setOrders);
  }, []);
  if (!orders) return <Loader />;
  if (!orders.length) return <Empty message="No recent orders" />;
  return (
    <ul className="mt-2 space-y-2 text-sm">
      {orders.map((o) => (
        <li key={o.id} className="flex justify-between">
          <div>
            <div className="font-medium">{o.customerName}</div>
            <div className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleString()}</div>
          </div>
          <div className="text-right">
            <div>${o.total.toFixed(2)}</div>
            <div className="text-xs text-gray-500">{o.status}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function LowStockList() {
  const [products, setProducts] = useState<Product[] | null>(null);
  useEffect(() => {
    api.fetchProducts().then((p) => setProducts(p.filter((x) => (x.stock ?? 0) < 15)));
  }, []);
  if (!products) return <Loader />;
  if (!products.length) return <Empty message="No low-stock items" />;
  return (
    <ul className="mt-2 space-y-2 text-sm">
      {products.map((p) => (
        <li key={p.id} className="flex justify-between">
          <div>{p.title}</div>
          <div className="text-xs text-gray-500">{p.stock ?? 0} left</div>
        </li>
      ))}
    </ul>
  );
}

/* --------------------- Categories Page --------------------- */

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    api.fetchCategories().then(setCategories);
  }, []);

  async function handleCreate() {
    if (!name.trim()) return;
    const newCat = await api.createCategory({ name });
    setCategories((c) => (c ? [newCat, ...c] : [newCat]));
    setName("");
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Categories</h2>
      </div>

      <div className="mt-4">
        <div className="bg-gray-50 p-3 rounded flex gap-2">
          <input value={name} onChange={(e) => setName(e.target.value)} className="flex-1 p-2 bg-white rounded border" placeholder="New category name" />
          <button onClick={handleCreate} className="px-3 py-2 bg-blue-600 text-white rounded">Create</button>
        </div>

        <div className="mt-4 bg-white rounded p-3 shadow-sm">
          {!categories ? (
            <Loader />
          ) : (
            <ul className="space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.slug ?? "-"}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm px-2 py-1 rounded border">Edit</button>
                    <button className="text-sm px-2 py-1 rounded border text-red-600">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* --------------------- Products Page --------------------- */

function ProductsPage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    api.fetchProducts().then(setProducts);
  }, []);

  async function handleSave(product: Partial<Product>) {
    if (product.id) {
      const updated = await api.updateProduct(product.id, product);
      setProducts((p) => (p ? p.map((x) => (x.id === updated.id ? updated : x)) : [updated]));
    } else {
      const created = await api.createProduct(product);
      setProducts((p) => (p ? [created as Product, ...p] : [created as Product]));
      setIsCreating(false);
    }
    setEditing(null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete product?")) return;
    await api.deleteProduct(id);
    setProducts((p) => (p ? p.filter((x) => x.id !== id) : null));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Products</h2>
        <div>
          <button onClick={() => setIsCreating(true)} className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm">Add product</button>
        </div>
      </div>

      <div className="mt-4 bg-white rounded p-3 shadow-sm">
        {!products ? (
          <Loader />
        ) : !products.length ? (
          <Empty message="No products" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {products.map((p) => (
              <div key={p.id} className="border rounded p-3">
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-gray-500">${p.price.toFixed(2)}</div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => setEditing(p)} className="px-2 py-1 rounded border text-sm">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="px-2 py-1 rounded border text-sm text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Editor Modal (simple inline) */}
        {(editing || isCreating) && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-2">
            <div className="bg-white rounded-lg p-2 sm:p-4 w-full max-w-md sm:max-w-2xl">
              <ProductEditor product={editing ?? undefined} onCancel={() => { setEditing(null); setIsCreating(false); }} onSave={handleSave} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductEditor({ product, onCancel, onSave }: { product?: Product; onCancel: () => void; onSave: (p: Partial<Product>) => void }) {
  const [title, setTitle] = useState(product?.title ?? "");
  const [price, setPrice] = useState(product?.price ?? 0);
  const [stock, setStock] = useState(product?.stock ?? 0);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{product ? "Edit Product" : "New Product"}</h3>
        <button onClick={onCancel} className="text-sm text-gray-500">Close</button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="p-2 border rounded" />
        <input value={price} onChange={(e) => setPrice(Number(e.target.value))} type="number" placeholder="Price" className="p-2 border rounded" />
        <input value={stock} onChange={(e) => setStock(Number(e.target.value))} type="number" placeholder="Stock" className="p-2 border rounded" />
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={() => onSave({ id: product?.id, title, price, stock })} className="px-3 py-2 bg-blue-600 text-white rounded">Save</button>
        <button onClick={onCancel} className="px-3 py-2 rounded border">Cancel</button>
      </div>
    </div>
  );
}

/* --------------------- Orders Page --------------------- */

function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  useEffect(() => {
    api.fetchOrders().then(setOrders);
  }, []);

  if (!orders) return <Loader />;

  return (
    <div>
      <h2 className="text-lg font-semibold">Orders</h2>
      <div className="mt-4 bg-white rounded p-3 shadow-sm">
        {!orders?.length ? (
          <Empty message="No orders" />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b">
                <th className="py-2">Order</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b">
                  <td className="py-2">{o.customerName}</td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>{o.status}</td>
                  <td className="text-right">${o.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* --------------------- Customers Page --------------------- */

function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  useEffect(() => {
    api.fetchCustomers().then(setCustomers);
  }, []);

  if (!customers) return <Loader />;

  return (
    <div>
      <h2 className="text-lg font-semibold">Customers</h2>
      <div className="mt-4 bg-white rounded p-3 shadow-sm">
        {!customers.length ? (
          <Empty message="No customers" />
        ) : (
          <ul className="space-y-2">
            {customers.map((c) => (
              <li key={c.id} className="flex justify-between">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.email}</div>
                </div>
                <div className="text-xs text-gray-500">Orders: {c.ordersCount ?? 0}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* --------------------- Users Page --------------------- */

function UsersPage() {
  const [users, setUsers] = useState<User[] | null>(null);
  useEffect(() => {
    api.fetchUsers().then(setUsers);
  }, []);

  if (!users) return <Loader />;

  return (
    <div>
      <h2 className="text-lg font-semibold">App Users</h2>
      <div className="mt-4 bg-white rounded p-3 shadow-sm">
        {!users.length ? (
          <Empty message="No users" />
        ) : (
          <ul className="space-y-2">
            {users.map((u) => (
              <li key={u.id} className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{u.name}</div>
                  <div className="text-xs text-gray-500">{u.email}</div>
                </div>
                <div className="text-xs text-gray-500">{u.role}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* --------------------- Insights Page --------------------- */

function InsightsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [insights, setInsights] = useState<any | null>(null);
  useEffect(() => {
    api.fetchInsights().then(setInsights);
  }, []);

  if (!insights) return <Loader />;

  return (
    <div>
      <h2 className="text-lg font-semibold">Insights</h2>
      <div className="mt-4 bg-white rounded p-3 shadow-sm">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-gray-500">Revenue (30d)</div>
            <div className="font-semibold text-xl">${insights.revenueMonth.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Orders</div>
            <div className="font-semibold text-xl">{insights.ordersCount}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Avg Order</div>
            <div className="font-semibold text-xl">${insights.avgOrderValue.toFixed(2)}</div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-600">Tip: connect your real orders and product data to get accurate insights.</div>
      </div>
    </div>
  );
}

/* --------------------- Content Page --------------------- */

function ContentPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold">Site Content</h2>
      <div className="mt-4 bg-white rounded p-3 shadow-sm">
        <div className="text-sm text-gray-600">Manage homepage banners, static pages, and promotional content from here.</div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 border rounded">Homepage hero editor (WYSIWYG)</div>
          <div className="p-3 border rounded">Banners & promotions</div>
        </div>
      </div>
    </div>
  );
}

/* ===================== End of UI ===================== */

/* ===================== Usage Notes & Backend endpoints ===================== */

/*

How to use
- Drop this file in your Next.js app under `app/admin/page.tsx` (app router) or `pages/admin/index.tsx`.
- Ensure TailwindCSS is configured. This UI uses Tailwind utility classes for a minimal and modern look.
- Replace the mock `api.*` helpers with real fetch calls to your backend.

Suggested backend endpoints (REST) you should implement:

GET  /api/admin/categories         -> list categories
POST /api/admin/categories         -> create category { name }
PUT  /api/admin/categories/:id     -> update category
DELETE /api/admin/categories/:id  -> delete category

GET  /api/admin/products           -> list products
POST /api/admin/products          -> create product {title, price, stock, categoryId, description, images }
PUT  /api/admin/products/:id      -> update product
DELETE /api/admin/products/:id   -> delete product

GET  /api/admin/orders             -> list orders (with filters)
GET  /api/admin/orders/:id         -> get order details
PUT  /api/admin/orders/:id         -> update order status

GET  /api/admin/customers          -> list customers
GET  /api/admin/users              -> list app users
PUT  /api/admin/users/:id          -> update user (role, banned, etc.)

GET  /api/admin/insights           -> returns revenue, orders count, avg order value

POST /api/admin/content/home-hero  -> update homepage content

Authentication & Security
- Protect all /api/admin/* routes with auth middleware (JWT/session + role check for admin)
- CSRF protection for state-changing endpoints if using cookies
- Use paginated endpoints for large lists (products/orders)

Deployment notes
- Host frontend as usual (Vercel recommended).
- Backend can be Serverless functions (Vercel), Node/Express, or Next.js API routes.
- Use a managed DB (Postgres, MySQL) for products/orders, and a CDN for product images.

Styling & Design matching
- I inspected your site to match the minimal aesthetic (nav, hero sections, and soft rounded cards). Small logo "DV" and blue accent were used to keep the brand consistent. (Reference: your live site.)

*/
