# 📚 Portfolio Hub - Modern React Application

A comprehensive, production-ready React portfolio application showcasing modern web development practices, advanced features, and professional UI/UX design.

![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.7-purple)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.8.2-red)
![React Query](https://img.shields.io/badge/React%20Query-5.81.5-orange)

## 🚀 Features

### ✨ Core Functionality
- **📝 Posts Management** - Create, read, update, and delete posts with rich content
- **👥 User Profiles** - Comprehensive user profiles with posts and statistics
- **🔖 Bookmarking System** - Save favorite posts and users with Redux persistence
- **🌙 Dark Mode** - Toggle between light and dark themes with localStorage sync
- **🔍 Advanced Search** - Real-time search with filtering and sorting options

### 🎨 UI/UX Features
- **📱 Responsive Design** - Mobile-first approach with Bootstrap 5
- **♿ Accessibility** - ARIA labels, keyboard navigation, and screen reader support
- **⚡ Performance** - Code splitting, lazy loading, and optimized bundle size
- **🎭 Modern Design** - Clean, professional interface with smooth animations
- **📊 Dashboard** - Statistics overview with interactive charts and metrics

### 🛠 Technical Features
- **🔧 TypeScript** - Full type safety throughout the application
- **📊 State Management** - Redux Toolkit for global state, React Query for server state
- **🔄 Infinite Scroll** - Smooth pagination for posts and users
- **📝 Form Validation** - React Hook Form with Yup validation schemas
- **🎯 Error Handling** - Comprehensive error boundaries and user feedback
- **🧪 Testing** - Unit tests with Jest and React Testing Library

## 🏗 Architecture

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout components (Navigation, Footer)
│   └── UI/            # Generic UI components (Icons, Loaders, etc.)
├── features/           # Feature-based modules
│   ├── posts/         # Posts feature (components, hooks, services, types)
│   └── users/         # Users feature (components, hooks, services, types)
├── pages/             # Page components
├── routes/            # Routing configuration
├── store/             # Redux store and slices
├── services/          # API services and utilities
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── styles/            # SCSS styles and variables
└── types/             # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 📱 Pages & Features

### 🏠 Home Page
- Feature showcase with tech stack
- Interactive call-to-action sections
- Professional landing page design

### 📊 Dashboard
- Statistics overview with metrics cards
- Recent posts and users
- Quick action buttons
- Real-time data visualization

### 📝 Posts
- **Posts List** - Infinite scroll with search and filtering
- **Post Detail** - Full post view with comments and author info
- **Create Post** - Form with validation and preview
- **Edit Post** - Update existing posts with pre-populated data

### 👥 Users
- **Users List** - Grid layout with search functionality
- **User Profile** - Detailed user information with posts
- **User Statistics** - Engagement metrics and activity

### 🔖 Bookmarks
- **Bookmarks Page** - Tabbed interface for posts and users
- **Bookmark Management** - Add/remove bookmarks with Redux
- **Persistent Storage** - localStorage synchronization

## 🛠 Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Bootstrap 5** - Responsive UI framework
- **SCSS** - Advanced styling with variables and mixins

### State Management
- **Redux Toolkit** - Global state management
- **React Query** - Server state and caching
- **React Hook Form** - Form state management

### Routing & Navigation
- **React Router v6** - Client-side routing
- **Code Splitting** - Lazy loading for performance

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **React Testing Library** - Component testing

### API Integration
- **Axios** - HTTP client
- **JSONPlaceholder** - RESTful API for demo data

## 🎨 Design System

### Color Palette
- **Primary**: Bootstrap blue (#0d6efd)
- **Secondary**: Bootstrap gray (#6c757d)
- **Success**: Green (#198754)
- **Warning**: Yellow (#ffc107)
- **Danger**: Red (#dc3545)
- **Info**: Cyan (#0dcaf0)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- **Responsive**: Mobile-first typography scale

### Components
- **Cards** - Consistent card design with hover effects
- **Buttons** - Primary, secondary, and outline variants
- **Forms** - Validated inputs with error states
- **Loading States** - Skeleton loaders and spinners
- **Icons** - React Icons with consistent sizing

## 📊 Performance Optimizations

- **Code Splitting** - Route-based lazy loading
- **Image Optimization** - Lazy loading and responsive images
- **Bundle Optimization** - Tree shaking and minification
- **Caching** - React Query cache management
- **Memoization** - React.memo and useMemo for expensive operations

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### Test Coverage
- Component rendering tests
- User interaction tests
- API integration tests
- Error handling tests

### Test Structure
```
src/
├── components/
│   └── __tests__/
│       ├── Icon.test.tsx
│       └── StatsCard.test.tsx
└── pages/
    └── __tests__/
        └── (page tests)
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Vercel** - Zero-config deployment
- **Netlify** - Drag and drop deployment
- **GitHub Pages** - Static site hosting
- **AWS S3** - Cloud hosting

### Environment Variables
```env
REACT_APP_API_URL=https://jsonplaceholder.typicode.com
REACT_APP_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **JSONPlaceholder** - For providing the demo API
- **React Icons** - For the beautiful icon library
- **Bootstrap** - For the responsive UI framework
- **React Query** - For excellent server state management

## 📞 Contact

- **LinkedIn**: https://www.linkedin.com/in/vlo-galstyan
- **GitHub**: https://github.com/E46Vl
- **Phone**:+37477529269

---

⭐ **Star this repository if you found it helpful!**
