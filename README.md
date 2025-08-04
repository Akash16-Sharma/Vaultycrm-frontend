# VaultlyCRM Frontend

VaultlyCRM is a modern, minimalistic, and scalable CRM SaaS dashboard built using **React**, **Tailwind CSS**, and **Vite**. This frontend is part of a larger CRM system designed for client management, business insights, and secure user authentication.

## 🚀 Features

- 🧾 User Authentication (Login/Register)
- 🔐 Protected Routes with AuthContext
- 🧭 Clean and Modular Dashboard Layout
- 🎨 Tailwind CSS for modern UI styling
- ⚙️ Ready for CRUD operations (Clients, Teams, Settings)
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

| Tech             | Purpose                     |
|------------------|-----------------------------|
| React            | UI Library                  |
| Vite             | Fast dev/build tool         |
| Tailwind CSS     | Utility-first styling       |
| React Router DOM | Client-side routing         |
| Context API      | Auth token management       |
| Axios            | API communication           |

---

## 📦 Installation

Clone the repository:

```bash
git clone  https://github.com/Akash16-Sharma/Vaultycrm-frontend.git
cd vaultly-crm-frontend
Install dependencies:

bash
Copy
Edit
npm install
Run development server:

bash
Copy
Edit
npm run dev
🔐 Environment Variables
Make sure to update your API base URL inside your Axios calls or via .env:

env
Copy
Edit
VITE_API_URL=http://localhost:5000
📁 Folder Structure
less
Copy
Edit
src/
├── components/         // Reusable UI components (Sidebar, Topbar)
├── context/            // AuthProvider & Context setup
├── hooks/              // Custom hooks like useAuth
├── pages/              // Login, Register, Dashboard
├── App.jsx             // App-level routing
├── main.jsx            // Entry point with AuthProvider
✍️ Author
Aakash Sharma
India | @SilentDev_
🔗 LinkedIn
📧 vaultlycrm@pm.me (for inquiries only)

⚠️ License
🚫 Proprietary License – All Rights Reserved
This project and its source code are strictly proprietary.
You are not permitted to:

Copy, modify, or redistribute any part of the codebase

Use this project or parts of it in commercial or personal projects

Re-upload this code or any of its components to public or private repositories

© 2025 Aakash Sharma. VaultlyCRM™ is a trademark under development.

For usage rights or partnership inquiries, contact the author.
