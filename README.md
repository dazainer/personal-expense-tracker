# 💰 Personal Expense Tracker

A personal finance tracking application that evolved from a simple Python CLI tool to a production-grade full-stack web application.

![Tech Stack V2](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql)

---

## 🚀 Project Evolution

This repository demonstrates iterative development and skill progression:

### Version 1.0 - Python CLI (Learning Fundamentals)
**Tech:** Python, SQLite  
**Focus:** Database fundamentals, CRUD operations, SQL queries

A command-line application for basic expense tracking. Built to learn:
- Database design and SQL
- Data persistence with SQLite
- Python programming patterns

[📂 View V1 Code →](./v1/)

---

### Version 2.0 - Full-Stack Web App (Production-Ready) ⭐
**Tech:** React, TypeScript, Node.js, PostgreSQL, Express  
**Focus:** Full-stack architecture, REST APIs, modern web development

A complete rewrite as a modern web application with:
- ✨ Interactive dashboard with real-time charts
- 📊 Advanced analytics and data visualization  
- 🎨 Responsive, professional UI
- 🔌 RESTful API with 13 endpoints
- 🗄️ PostgreSQL database with optimized schema
- 🔧 TypeScript for full type safety

[📂 View V2 Code →](./v2/) | [📖 V2 Documentation →](./v2/README.md)

---

## 🌟 V2 Features

### 📊 Dashboard
- Real-time statistics (total spent, expense count, daily average)
- Interactive pie charts for category breakdown
- Line charts showing spending trends over time
- Recent expenses with quick view

### 💸 Expense Management
- Full CRUD operations with modal forms
- Category selection with icons and colors
- Date tracking and payment method logging
- Edit and delete functionality

### 📈 Analytics
- Time-based filtering (7 days, 30 days, 90 days, all time)
- Category-wise spending breakdown
- Visual bar charts and percentage displays
- Transaction count per category

---

## 🛠️ Tech Stack Comparison

| Feature | V1 (Python) | V2 (Full-Stack) |
|---------|-------------|-----------------|
| **Interface** | Command-line | Web browser |
| **Frontend** | N/A | React + TypeScript |
| **Backend** | Python scripts | Node.js + Express |
| **Database** | SQLite | PostgreSQL |
| **API** | None | RESTful API (13 endpoints) |
| **Visualization** | Text-based | Interactive charts (Recharts) |
| **State Management** | N/A | TanStack Query |
| **Type Safety** | None | Full TypeScript |
| **Deployment Ready** | No | Yes |

---

## 🚀 Getting Started (V2)

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 15+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dazainer/personal-expense-tracker.git
   cd personal-expense-tracker/v2
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   
   # Configure environment
   cp .env.example .env
   # Edit .env with your PostgreSQL credentials
   
   # Create database and tables
   createdb expense_tracker
   npm run db:setup
   
   # Start server
   npm run dev
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

[📖 Full V2 Documentation →](./v2/README.md)

---

## 📁 Repository Structure

```
personal-expense-tracker/
├── v1/                      # Original Python CLI version
│   ├── main.py
│   ├── database.py
│   ├── expenses.db
│   └── README.md
│
├── v2/                      # Full-stack web application
│   ├── backend/
│   │   ├── src/
│   │   │   ├── config/      # Database config
│   │   │   ├── routes/      # API endpoints
│   │   │   ├── services/    # Business logic
│   │   │   ├── types/       # TypeScript types
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── pages/       # Dashboard, Expenses, Analytics
│   │   │   ├── hooks/       # Custom React hooks
│   │   │   ├── services/    # API client
│   │   │   ├── types/       # TypeScript types
│   │   │   └── App.tsx
│   │   └── package.json
│   │
│   └── README.md            # Detailed V2 documentation
│
├── README.md                # This file
└── .gitignore
```

---

## 🎯 What I Learned

### From V1 (Python/SQLite)
- Database fundamentals and SQL
- CRUD operations
- Data persistence
- Command-line interfaces

### From V2 (Full-Stack)
- Modern web development with React
- TypeScript for type-safe development
- RESTful API design and implementation
- PostgreSQL database design and optimization
- Server state management with React Query
- Building responsive, accessible UIs
- Full-stack architecture patterns
- Git workflow and version control

---

## 🔮 Future Enhancements

- [ ] User authentication and multi-user support
- [ ] AI assistant for natural language queries
- [ ] Budget tracking with alerts
- [ ] Recurring expense automation
- [ ] Receipt upload with OCR
- [ ] Mobile app (React Native)
- [ ] Export to CSV/PDF
- [ ] Multi-currency support
- [ ] Deployment to cloud platform

---

## 👨‍💻 Author

**Zain Khalil**
- University of Waterloo - Computer Science & Business Administration
- GitHub: [@dazainer](https://github.com/dazainer)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

Built as a learning project demonstrating progression from basic scripting to full-stack development. Created for co-op applications at the University of Waterloo.

**Key Skills Demonstrated:**
- Full-stack TypeScript development
- RESTful API design
- Database modeling and optimization
- Modern React patterns
- State management
- Data visualization
- Professional documentation

---

**⭐ If you found this project interesting, please give it a star!**

---

## 📸 Screenshots

### Dashboard
![Dashboard Screenshot 1](<Screenshot 2026-02-10 at 10.15.43 PM.png>)
![Dashboard Screenshot 2](<Screenshot 2026-02-10 at 10.15.53 PM.png>)
### Expense Management
![Expenses Screenshot](<Screenshot 2026-02-10 at 10.16.05 PM.png>)
### Analytics
![Analytics Screenshot 1](<Screenshot 2026-02-10 at 10.16.17 PM.png>)
![Analytics Screenshot 2](<Screenshot 2026-02-10 at 10.16.23 PM.png>)

---

**Project Timeline:**
- V1.0 (Python/SQLite) - Initial learning project
- V2.0 (Full-Stack) - Production-ready rewrite with modern tech stack
