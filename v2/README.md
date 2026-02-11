# 💰 Expense Tracker v2.0

A modern, full-stack personal finance dashboard built with **React**, **TypeScript**, **Node.js**, and **PostgreSQL**. Track expenses, analyze spending patterns, and visualize financial data through interactive charts and dashboards.

![Tech Stack](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql)

---

## 🌟 Features

### 📊 Dashboard
- **Real-time statistics**: Total spent, expense count, daily average
- **Visual analytics**: Interactive pie charts and trend graphs
- **Recent activity**: Quick view of latest expenses

### 💸 Expense Management
- **Full CRUD operations**: Add, edit, delete expenses
- **Smart categorization**: Pre-defined categories with custom icons
- **Flexible tracking**: Date, amount, payment method, descriptions

### 📈 Analytics
- **Time-based filtering**: View data by 7d, 30d, 90d, or all time
- **Category breakdown**: Detailed spending analysis per category
- **Visual insights**: Bar charts and percentage breakdowns

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with **TypeScript** - Modern UI framework with type safety
- **Vite** - Lightning-fast build tool and dev server
- **TanStack Query** (React Query) - Server state management
- **Recharts** - Composable charting library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **date-fns** - Date manipulation utilities
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** with **Express** - RESTful API server
- **TypeScript** - Type-safe backend development
- **PostgreSQL** - Robust relational database
- **pg** - PostgreSQL client for Node.js
- **CORS** - Cross-origin resource sharing

### Architecture
- **Service Layer Pattern** - Clean separation of concerns
- **RESTful API Design** - Standard HTTP methods and status codes
- **Type-safe** - Shared TypeScript types across frontend and backend
- **Modular Structure** - Organized by feature and responsibility

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **PostgreSQL** 15+
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dazainer/expense-tracker-v2.git
   cd expense-tracker-v2
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env with your PostgreSQL credentials
   
   # Create database and tables
   createdb expense_tracker
   npm run db:setup
   
   # Start the server
   npm run dev
   ```
   Backend runs on `http://localhost:3001`

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Start the dev server
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

4. **Open your browser**
   Navigate to `http://localhost:5173` and start tracking expenses!

---

## 📁 Project Structure

```
expense-tracker-v2/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── scripts/         # Database setup scripts
│   │   ├── types/           # TypeScript type definitions
│   │   └── index.ts         # Express server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route pages (Dashboard, Expenses, Analytics)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API client
│   │   ├── types/           # TypeScript interfaces
│   │   ├── App.tsx          # Main App component
│   │   └── main.tsx         # React entry point
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## 🔌 API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses (with optional filters)
- `POST /api/expenses` - Create new expense
- `GET /api/expenses/:id` - Get expense by ID
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create custom category

### Analytics
- `GET /api/analytics/summary` - Get spending summary
- `GET /api/analytics/trends` - Get daily spending trends

---

## 🗄️ Database Schema

### Tables
- **users** - User accounts (prepared for multi-user support)
- **categories** - Expense categories with icons and colors
- **expenses** - Transaction records with amounts, dates, descriptions
- **indexes** - Optimized queries on user_id and date fields

### Key Features
- Foreign key constraints for data integrity
- Indexed fields for fast queries
- Array support for tags (PostgreSQL-specific)
- Default categories automatically seeded

---

## 🎨 Design Decisions

### Why TypeScript?
- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Autocomplete and inline documentation
- **Shared Types**: Single source of truth for data structures

### Why TanStack Query?
- **Automatic Caching**: Reduces unnecessary API calls
- **Optimistic Updates**: Instant UI feedback
- **Error Handling**: Built-in retry and error states

### Why PostgreSQL?
- **Reliability**: ACID compliance and data integrity
- **Performance**: Excellent for structured data and analytics
- **Advanced Features**: Array types, JSON support, full-text search

### Why Service Layer Pattern?
- **Separation of Concerns**: Routes handle HTTP, services handle logic
- **Testability**: Business logic isolated and easier to test
- **Scalability**: Easy to add features without touching routes

---

## 🚧 Future Enhancements

- [ ] **AI Assistant**: Natural language queries about spending
- [ ] **Budget Tracking**: Set monthly budgets per category with alerts
- [ ] **Recurring Expenses**: Auto-track subscriptions and bills
- [ ] **Multi-currency Support**: Track expenses in different currencies
- [ ] **Receipt Upload**: OCR for automatic expense entry
- [ ] **Export Data**: CSV/PDF reports for tax purposes
- [ ] **Mobile App**: React Native version
- [ ] **Authentication**: User accounts and data privacy

---

## 🤝 Contributing

This is a personal learning project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Zain Khalil**
- GitHub: [@dazainer](https://github.com/dazainer)
- LinkedIn: [Zain Khalil](https://www.linkedin.com/in/zainskhalil/)

---

## 🙏 Acknowledgments

Built as a portfolio project to demonstrate full-stack development skills for co-op applications at the University of Waterloo.

**Technologies explored:**
- Full-stack TypeScript development
- RESTful API design
- PostgreSQL database modeling
- React state management
- Data visualization
- Modern development workflows

---

## 📚 What I Learned

- Setting up a production-grade TypeScript monorepo
- Designing RESTful APIs with proper HTTP semantics
- Database schema design and indexing strategies
- React Query for efficient server state management
- Building responsive, accessible UIs
- Version control and project documentation

---

**⭐ If you found this project interesting, please give it a star!**
