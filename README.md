# InCart 🛒

A modern, feature-rich e-commerce mobile application built with React Native and Expo. InCart provides a seamless shopping experience with an intuitive interface, real-time cart management, and comprehensive product browsing capabilities.

## 📱 About

InCart is a cross-platform mobile shopping application that delivers a native-like experience on both iOS and Android devices. Built with the latest React Native and Expo technologies, it offers a smooth, responsive interface with support for both light and dark themes. The app integrates with a REST API to fetch real-time product data and provides essential e-commerce features including product browsing, search, favorites, cart management, and user authentication.

## ✨ Features

### 🏠 Core Functionality
- **Product Catalog**: Browse through a comprehensive list of products with images, prices, and descriptions
- **Product Details**: View detailed information about each product with image galleries
- **Smart Search**: Real-time product search with instant results
- **Shopping Cart**: Add, remove, and manage product quantities with live total calculations
- **Favorites**: Save products to your favorites list for quick access
- **User Profile**: Login/Register system with profile management

### 🎨 User Experience
- **Theme Support**: Automatic light/dark mode based on system preferences
- **Haptic Feedback**: Tactile responses for better interaction
- **Smooth Animations**: Fluid transitions and animations using Reanimated
- **Bottom Tab Navigation**: Easy navigation between main sections
- **Cart Badge**: Real-time cart item count indicator
- **Responsive Design**: Optimized layouts for different screen sizes

### 🔧 Technical Features
- **File-based Routing**: Powered by Expo Router for intuitive navigation
- **Context API**: Global state management for cart and favorites
- **TypeScript**: Full type safety throughout the application
- **AsyncStorage**: Persistent data storage for cart and favorites
- **REST API Integration**: Dynamic product data from external API
- **React Compiler**: Experimental React compiler for optimized performance

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd InCart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan the QR code with Expo Go app on your physical device

### Available Scripts

```bash
npm start          # Start the Expo development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run on web browser
npm run lint       # Run ESLint
```

## 📁 Project Structure

```
InCart/
├── app/                    # Application screens and routing
│   ├── (tabs)/            # Tab-based navigation screens
│   │   ├── index.tsx      # Home/Product list screen
│   │   ├── cart.tsx       # Shopping cart screen
│   │   ├── favorites.tsx  # Favorites screen
│   │   ├── profile.tsx    # User profile screen
│   │   ├── search.tsx     # Search screen
│   │   └── product/[id].tsx # Product detail screen
│   └── _layout.tsx        # Root layout configuration
├── components/            # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── profile/          # Profile-related components
│   ├── ui/               # UI primitives
│   ├── ProductList.tsx   # Product listing component
│   ├── Top.tsx           # Header component
│   └── searchInput.tsx   # Search input component
├── context/              # React Context providers
│   ├── CartContext.tsx   # Cart state management
│   └── FavoriteContext.tsx # Favorites state management
├── types/                # TypeScript type definitions
│   ├── product.ts        # Product types
│   ├── cart.ts           # Cart types
│   ├── favorite.ts       # Favorite types
│   └── auth.ts           # Authentication types
├── constants/            # App constants and theme
├── hooks/                # Custom React hooks
└── assets/               # Images, fonts, and other assets
```

## 🛠️ Tech Stack

### Core Technologies
- **React Native** (0.81.4) - Mobile app framework
- **Expo** (~54.0.12) - Development platform
- **TypeScript** (~5.9.2) - Type safety
- **Expo Router** (~6.0.10) - File-based routing

### Key Libraries
- **React Navigation** - Navigation infrastructure
- **AsyncStorage** - Local data persistence
- **Reanimated** (~4.1.1) - Smooth animations
- **Gesture Handler** (~2.28.0) - Touch interactions
- **Expo Image** - Optimized image loading
- **Vector Icons** - Icon library

### Development Tools
- **ESLint** - Code linting
- **Expo CLI** - Development tooling

## 🎯 Key Features Implementation

### Cart Management
- Add/remove products from cart
- Update product quantities
- Real-time total calculation
- Persistent cart storage
- Cart badge with item count

### Favorites System
- Toggle favorite products
- Persistent favorites storage
- Quick access to saved items
- Add to cart from favorites

### Product Search
- Real-time search functionality
- API-based product filtering
- Search results display
- Loading states

### Theme Support
- Automatic dark/light mode detection
- Consistent theming across all screens
- Theme-aware components
- Custom color schemes

## 🔌 API Integration

The app integrates with the [Platzi Fake Store API](https://api.escuelajs.co/api/v1/) for product data:

- **Products Endpoint**: `GET /products`
- **Search Endpoint**: `GET /products?title={query}`
- **Product Details**: `GET /products/{id}`

## 📱 Platform Support

- ✅ iOS (iPhone & iPad)
- ✅ Android
- ✅ Web (experimental)

## 🎨 Design Features

- Modern, clean UI design
- Smooth animations and transitions
- Haptic feedback on interactions
- Rounded corners and shadows
- Consistent spacing and typography
- Responsive layouts

## 🔐 Authentication

The app includes a complete authentication flow:
- Login form with email/password
- Registration form with validation
- Profile view with user information
- Logout functionality
- Mock authentication (ready for backend integration)

## 🚧 Future Enhancements

- [ ] Payment integration
- [ ] Order history
- [ ] Product reviews and ratings
- [ ] Push notifications
- [ ] Social sharing
- [ ] Advanced filtering and sorting
- [ ] Wishlist sharing
- [ ] Multi-language support

## 📄 License

This project is private and proprietary.

## 👨‍💻 Development

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write clean, maintainable code
- Use meaningful variable names

### Testing
Run the linter to check code quality:
```bash
npm run lint
```

## 🤝 Contributing

This is a private project. For any questions or suggestions, please contact the project maintainer.

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ using React Native and Expo**
