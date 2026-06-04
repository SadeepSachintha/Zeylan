# 👕 Zeylan — Premium DTF T-Shirt Printing Web Application

[![Netlify Status](https://img.shields.io/netlify/7b2d704b-77c4-4ce4-b4be-e4d10021ee43?style=for-the-badge&logo=netlify&logoColor=white)](https://app.netlify.com/projects/zeylanclothing/deploys)
&nbsp;
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Zeylan** is a premium, interactive web application for Direct to Film (DTF) T-shirt printing in Sri Lanka, designed and developed by **SS Labz**. It features a live visual customizer and dynamic bulk pricing calculator.

🚀 **Live Site:** [Zeylan on Netlify](https://zeylanclothing.netlify.app)

---

## ✨ Key Features

### 1. 🎨 Live Interactive T-Shirt Customizer
* **Dynamic Canvas Mockup:** Rendered via HTML5 Canvas, allowing real-time visuals.
* **Garment Color Swapping:** Choose between Jet Black, Pure White, Vibrant Cyan, Hot Magenta, Royal Blue, and Crimson Red.
* **Print Layout Control:** Swap print sizes between **A4 Standard**, **A3 Large**, and **Pocket Logo**.
* **Visual Scaling & Positioning:** Scale designs from 10% to 100% and drag to reposition the print anywhere within the printable bounding area (supports mouse dragging and touch events on mobile devices).
* **Sample & Custom Artwork:** Upload custom files (PNG/JPG, transparent recommended) or select preloaded neon skull / retro surf samples.

### 2. 🧮 Real-Time Pricing Calculator
* **Double-mode pricing structure:**
  1. **T-Shirt + Print Bundle:** Computes cost using base color and print sizes.
  2. **DTF Sheets Only:** Bulk printing rates for local clothing brands (A4, A3, Meter Rolls).
* **Automated Volume Discounts:**
  * Sub-10 units: Standard retail pricing.
  * 10–49 units: Bulk Level 1.
  * 50+ units: Bulk Level 2 (wholesale).
  * Auto-discounts for sheets/rolls: 10% off at 10+ sheets, 20% off at 30+ sheets.

### 3. 💬 WhatsApp Order Integration
* One-click checkout generates a structured text template detailing the color, print size, positioning, scaling percentage, and estimated cost, prompting the customer to send their high-res files on WhatsApp.

### 4. 💎 Premium Cyberpunk Aesthetics
* Dark mode theme featuring dynamic glowing background blobs, glassmorphic elements (`backdrop-filter`), smooth hover effects, micro-animations, and modern typography (using Google Fonts).

---

## 🛠️ Tech Stack & Libraries

* **Core Structure:** HTML5
* **Design & Styling:** Custom Vanilla CSS3 (incorporating modern CSS variables, responsive grid/flexbox layouts, custom keyframe animations, and custom scrollbar styles).
* **Interactive Engine:** Vanilla ES6+ JavaScript (HTML5 Canvas API, Touch Events, File Reader API, URL State Builders).
* **Icons:** [Font Awesome v6](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css).

---

## 📂 Project Structure

```bash
Zeylan/
├── assets/                  # Public visual resources
│   ├── black_tshirt.png     # Customizer mockup asset
│   ├── white_tshirt.png     # Customizer mockup asset
│   ├── design_neon_skull.png# Sample design preset
│   └── design_retro_surf.png# Sample design preset
├── app.js                   # Application state & Canvas customizer engine
├── index.html               # Main user interface and content
├── netlify.toml             # Configuration for Netlify deployment
├── style.css                # Base variables, layout, animations & custom styles
└── README.md                # Project documentation
```

---

## 💻 Local Setup & Development

Since Zeylan is built as a static web application, it does not require an active build/compile step to run locally.

### Prerequisites
* A web browser (Chrome, Firefox, Safari, Edge).
* A local development server (highly recommended to prevent CORS policies from blocking custom local image uploads).

### Steps
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/SadeepSachintha/Zeylan.git
   cd Zeylan
   ```
2. Run using a simple HTTP server:
   * **Node.js (npm):**
     ```bash
     npm install -g http-server
     http-server .
     ```
   * **Python:**
     ```bash
     python -m http.server 8000
     ```
   * **VS Code extension:** Right-click `index.html` and select **"Open with Live Server"**.
3. Open your browser and navigate to `http://localhost:8000` (or the port specified by your server).

---

## 🌐 Netlify Deployment

The project includes a `netlify.toml` file configured for hosting the static files from the root directory.

### Continuous Deployment with GitHub
1. Push the repository to your GitHub account.
2. Sign in to [Netlify](https://app.netlify.com).
3. Click **Add new site** > **Import an existing project**.
4. Choose **GitHub** and authorize access to your repository.
5. In the Build settings:
   * **Build command:** (Leave blank)
   * **Publish directory:** `.`
6. Click **Deploy site**. Netlify will automatically rebuild and deploy the site whenever you push changes to your main branch.

---

## 👨‍💻 Credits & Team

* **Developed by:** [SS Labz](https://github.com/SadeepSachintha)
* **Lead Developer:** Sadeep Sachintha

---

## 📝 License

This project is licensed under the MIT License. Feel free to customize and use it for your own custom apparel stores.
