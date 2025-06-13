# 🛠️ Vue Admin Dashboard

This is a responsive and feature-complete **Admin Dashboard** built with **Vue 3 + TypeScript**, designed as part of a technical test.

Live Demo → [https://admin-dashboard-black-three-91.vercel.app/dashboard](https://admin-dashboard-black-three-91.vercel.app/dashboard)

---

## 🚀 Features

- ✅ **Authentication** with JWT (login/register)
- ✅ Role-based route protection (admin only)
- ✅ **Dashboard** with user avatar & logout
- ✅ **Product Management**:
  - Create product (via modal + confirm)
  - Edit product
  - Delete product
  - Filter by title, price, category
  - Pagination
  - Skeleton loaders & global loading spinner
- ✅ Responsive sidebar + burger menu for mobile
- ✅ Clean code & modular structure
- ✅ `vercel.json` rewrite support for SPA routes

---

## 🧱 Tech Stack

- ⚙️ **Vue 3** (Composition API)
- 📜 **TypeScript**
- 🧠 **Pinia** (state management)
- 🔀 **Vue Router**
- 🎨 **Tailwind CSS**
- 🌐 **Axios** (with interceptor for token)
- 🧾 Deployed with **Vercel**

---

## 📦 Installation

```bash
git clone https://github.com/yourname/vue-admin-dashboard.git
cd vue-admin-dashboard
npm install
npm run dev
```

## 🔐 Environment Variables

VITE_API_BASE_URL = https://api.escuelajs.co/api/v1

## 📁 Project Structure (Simplified)

```bash
src/
│
├── components/       # Shared & feature components
├── layouts/          # Navbar, Sidebar, DefaultLayout
├── views/            # Page-level components
├── stores/           # Pinia stores (auth, product, category)
├── lib/axios.ts      # Axios instance with interceptors
├── config/           # Env setup
└── router/           # Vue router setup
```

## ✅ Example Credentials

email: adminone@yopmail.com
password: 1234

If its failed, you can register a new user (will default to role admin).

## Author

Developed by Rizky Ari

[Linkedin](https://www.linkedin.com/in/rizkyarihar/) | [GitHub](https://github.com/rizkyari)