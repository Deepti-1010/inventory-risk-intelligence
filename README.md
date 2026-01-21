# Inventory Risk Intelligence System

Live DEMO:  https://deepti-1010.github.io/inventory-risk-intelligence/

A **frontend-focused inventory risk analysis dashboard** designed to help businesses monitor stock health, demand pressure, and restocking risk through clear indicators and decision guidance.

This project emphasizes **business-oriented logic**, **clean UI**, and **strong JavaScript fundamentals**, without relying on heavy frameworks or backend services.

---

## Problem Statement

Small and mid-sized businesses often struggle with:
- Overstocking low-demand items  
- Running out of fast-moving products  
- Making restocking decisions without data-driven insight  

Traditional inventory systems focus mainly on CRUD operations but fail to highlight **inventory risk**.

This project addresses that gap by introducing a **risk intelligence layer** on top of standard inventory management.

---

## Solution Overview

The Inventory Risk Intelligence System:
- Calculates risk based on **demand pressure**, **current stock**, and **restock time**
- Highlights **high-risk items** before they cause stockouts
- Provides **clear restocking decisions** instead of raw data
- Keeps the interface minimal, readable, and explainable

The system is intentionally built as a **multi-page frontend application** to keep logic transparent and interview-friendly.

---

## Key Features

### Inventory Management
- Add and delete products
- Persistent data storage using browser `localStorage`
- No backend dependency

### Risk Analysis Engine
- Dynamic risk score calculation per product
- Risk levels:
  - Low
  - Medium
  - High
- Decision guidance:
  - Inventory Stable
  - Monitor Inventory Trend
  - Immediate Reorder Recommended

### Dashboard Insights
- Total products count
- High-risk item count
- Low-stock alerts
- Highest risk score in the inventory

### Search & Filtering
- Real-time product search
- Category-based filtering
- Combined filters applied before rendering

### UI & UX
- Two-page structure:
  - **System Overview**
  - **Inventory Dashboard**
- Responsive sidebar navigation
- Clean cards and status badges
- Mobile-friendly layout

---

## Risk Logic (High-Level)

Risk is calculated using:
- Monthly demand vs available quantity
- Restocking time impact
- Product price sensitivity

The goal is **early risk detection**, not perfect forecasting — allowing proactive inventory decisions.

---

## Tech Stack

**Frontend**
- HTML5  
- CSS3 (Flexbox, responsive layout)  
- JavaScript (ES6+)  

**Storage**
- Browser `localStorage`

**Deployment**
- GitHub Pages (static hosting)


No external libraries were used to keep the logic transparent and maintainable.

---

## Project Structure

├── index.html # System overview / landing page
├── dashboard.html # Inventory risk dashboard
├── style.css # Global styles and layout
├── script.js # Core logic and UI updates
└── README.md # Project documentation


---

## Running the Project Locally

### Option 1: Direct Browser Run
1. Clone or download the repository
2. Open `index.html` in any modern web browser

### Option 2: Local Server (Recommended)
  python -m http.server 8000
  Then open: http://localhost:8000/


---

## Deployment (GitHub Pages)

1. Push the project to a GitHub repository  
2. Go to **Settings → Pages**  
3. Select:
   - Branch: `main`
   - Folder: `/root`
4. Save the settings  

Your application will be live at:
   https://yourusername.github.io/repository-name/


---

## Why This Project Works for Interviews

- Demonstrates **strong frontend fundamentals**
- Shows **business-oriented problem solving**
- Easy to explain and extend (backend, auth, analytics)
- Not a tutorial clone or boilerplate project
- Clear ownership of logic and decisions

---

## Future Enhancements

- Backend integration (Node.js + MongoDB)
- Role-based access (Admin / Manager)
- Email alerts for critical stock levels
- CSV import/export
- Supplier performance tracking
- Demand trend visualization

---

## What This Project Demonstrates

- Practical JavaScript problem-solving
- UI state management without frameworks
- Clean code organization
- Ability to translate business problems into logic

---

## Author

**Deepti Malkani**  
Aspiring Software Developer  
Frontend | JavaScript | UI Engineering

  
