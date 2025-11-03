# Audiophile E-commerce Website  
A pixel-perfect, responsive e-commerce build using Next.js (App Router), vanilla CSS modules, and a Convex backend.  
Built from the [Figma design](https://www.figma.com/design/uTnFYlpTaP1yJhqq3UXZSj/audiophile-ecommerce-website--Copy-?node-id=0-1607&t=h6641l47lEBSgs5F-0) to showcase real-world frontend engineering with full checkout flow, order storage, and transactional email.

## 🚀 Live Demo  
[View it live on Vercel] https://audiophile-ecommerce-cyan.vercel.app/ 

## 🧰 Stack & Technologies  
- **Framework & UI**: [Next.js](https://nextjs.org) 16 (App Router)  
- **Backend & Persistence**: [Convex](https://convex.dev) for data-storage and serverless functions  
- CSS Modules + vanilla CSS (mobile-first, responsive layout)  
- Responsive design for mobile/tablet/desktop  
- Transactional emails managed via [Resend](https://resend.com) (or another provider)  
- Version control: GitHub  

## 🎯 Key Features  
- Fully responsive layout with pixel-perfect implementation of the original Figma design  
- Global style management via CSS variables and mobile-first breakpoints  
- Cart functionality: add items, manage quantities, store orders in Convex  
- Checkout flow: order confirmation page, email notification  
- Accessible forms & semantic markup  
- Modular components (Hero, ProductCard, CategoryCard, Footer)  
- CI/CD deployment via Vercel – automatic builds on every push  

## 🔧 Getting Started (Local)  
1. **Clone the repo**  
   ```bash
   git clone https://github.com/Gbagamsyle/Audiophile-ecommerce.git
   cd Audiophile-ecommerce

   2. Install dependencies

npm install


3. Setup environment variables
Create a .env.local file with:

RESEND_API_KEY=your-resend-key
CONVEX_URL=your-convex-deployment-url
NEXTAUTH_URL=http://localhost:3000


4. Run development server

npm run dev

Open http://localhost:3000 in browser.

##🧑‍💻 Author

Ogaba Silas — Fullstack Engineer

---
