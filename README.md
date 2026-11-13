# Code-Roast Website

A modern, responsive website for Code-Roast with a focus on data analysis and business intelligence. Built with object-oriented principles, SOLID design patterns, and comprehensive testing.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Dark Mode**: Enabled by default with a manual theme toggle
- **Component Architecture**: Modular OOP design following SOLID principles
- **Real-time Configuration**: Dynamic content and styling updates
- **Interactive Animations**: Smooth hover effects, scroll reveals, and particle systems
- **Comprehensive Testing**: Unit tests for all components and services
- **Modern Build System**: Vite for fast development and optimized production builds

## 📁 Project Structure

```
code-roast-website/
├── src/
│   ├── components/          # UI Components
│   │   ├── DarkModeManager.js
│   │   ├── ThemeManager.js
│   │   └── UIManager.js
│   ├── services/           # Business Logic & Data Services
│   │   ├── ConfigManager.js
│   │   └── DataService.js
│   ├── styles/             # Modular CSS
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── utilities.css
│   │   ├── dark-mode.css
│   │   └── main.css
│   ├── utils/              # Utility Functions
│   └── main.js             # Application Entry Point
├── tests/                  # Unit Tests
│   ├── DarkModeManager.test.js
│   ├── ConfigManager.test.js
│   └── UIManager.test.js
├── docs/                   # Documentation
├── public/                 # Static Assets
├── dist/                   # Build Output
└── index.html              # Main HTML Entry
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CatSealey/code-roast-website.git
cd code-roast-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## 📚 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:ui` | Run tests with visual UI |
| `npm run lint` | Lint code with ESLint |
| `npm run lint:fix` | Fix linting issues automatically |
| `npm run format` | Format code with Prettier |
| `npm run docs` | Generate JSDoc documentation |
| `npm run docs:serve` | Serve documentation locally |

## 🏗️ Architecture

### Component Design Patterns

The application follows **SOLID principles** and uses several design patterns:

#### 1. Single Responsibility Principle (SRP)
Each class has a single, well-defined responsibility:
- `DarkModeManager`: Handles theme switching
- `ConfigManager`: Manages application configuration
- `UIManager`: Handles UI interactions and animations
- `DataService`: Manages data fetching and caching

#### 2. Open/Closed Principle (OCP)
Classes are open for extension but closed for modification:
- `ThemeManager` serves as a base class for theme implementations
- New theme types can be added without modifying existing code

#### 3. Dependency Inversion Principle (DIP)
Higher-level modules don't depend on lower-level modules:
- `CodeRoastApp` orchestrates dependencies through constructor injection
- Services are passed as dependencies rather than created internally

#### 4. Observer Pattern
Used throughout for loose coupling:
- Configuration changes notify UI updates
- Data service events trigger UI updates
- Theme changes update multiple UI components

## 🎨 Styling Architecture

### CSS Organization

The stylesheets are organized using a **modular approach**:

- **base.css**: CSS variables, reset, typography, utility classes
- **components.css**: Component-specific styles (buttons, cards, navigation)
- **utilities.css**: Animation classes, layout utilities, helper classes
- **dark-mode.css**: Dark mode specific styles and transitions
- **main.css**: Main entry point that imports all modules

### CSS Custom Properties

The design system uses CSS custom properties for consistent theming:

```css
:root {
  /* Color System */
  --color-primary: #d05d09;
  --color-secondary: #8b4513;
  --color-accent: #117374;
  
  /* Typography */
  --font-family-base: 'Inter', system-ui, sans-serif;
  --font-size-base: 1rem;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 🧪 Testing Strategy

### Unit Testing

All classes are thoroughly tested using **Vitest**:

- **Component Tests**: UI components and their interactions
- **Service Tests**: Business logic and data management
- **Integration Tests**: Cross-component communication

### Test Structure

```javascript
describe('ComponentName', () => {
  describe('method', () => {
    it('should do something specific', () => {
      // Arrange, Act, Assert
    });
  });
});
```

### Coverage Goals

- **Statements**: 90%+
- **Branches**: 85%+
- **Functions**: 95%+
- **Lines**: 90%+

## 🚀 Performance Optimizations

### Code Splitting
- Dynamic imports for non-critical functionality
- Lazy loading of heavy components
- Separate chunks for vendor libraries

### Asset Optimization
- CSS minification and autoprefixing
- JavaScript minification with Terser
- Image optimization and compression

### Runtime Performance
- Efficient DOM queries with caching
- Debounced scroll and resize handlers
- RequestAnimationFrame for smooth animations

## 🔧 Configuration

### Environment Variables

Create a `.env` file for environment-specific settings:

```env
VITE_APP_TITLE=Code-Roast
VITE_API_BASE_URL=https://api.code-roast.com
VITE_ENABLE_ANALYTICS=true
```

### Build Configuration

The Vite configuration supports:
- TypeScript (optional)
- Path aliases (`@/` for src directory)
- Environment-specific builds
- Legacy browser support

## 🌐 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Legacy Support**: Configurable with Vite Legacy Plugin
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+

## 📖 API Documentation

### ConfigManager

```javascript
// Get configuration value
const value = configManager.get('company_name');

// Set single value
configManager.set('company_name', 'New Company');

// Set multiple values
configManager.setConfig({
  company_name: 'New Company',
  background_color: '#ff0000'
});

// Add observer for changes
configManager.addObserver((changes) => {
  console.log('Config changed:', changes);
});
```

### DarkModeManager

```javascript
// Initialize dark mode
const darkMode = new DarkModeManager();

// Toggle theme
darkMode.toggleTheme();

// Force dark mode
darkMode.enableDarkMode();

// Check current state
if (darkMode.isDarkMode()) {
  console.log('Dark mode is active');
}
```

### UIManager

```javascript
// Update element content
uiManager.updateElement('element-id', 'New content');

// Show modal
uiManager.showModal('<div>Modal content</div>');

// Add animation
uiManager.addAnimation('fadeIn', (options) => {
  // Animation logic
});

// Run animation
uiManager.runAnimation('fadeIn', { duration: 300 });
```

## 🔒 Security Considerations

- **Content Security Policy**: Configured headers for XSS protection
- **Input Sanitization**: All user inputs are sanitized
- **Dependency Security**: Regular security audits with `npm audit`
- **Build Security**: Source maps disabled in production

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Deployment Options

- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: Cloudflare, AWS CloudFront
- **Traditional Hosting**: Apache, Nginx

### Continuous Integration

Example GitHub Actions workflow:

```yaml
name: CI/CD
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test
      - run: npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards

- Follow ESLint configuration
- Write tests for new functionality
- Use conventional commit messages
- Update documentation for API changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **CatSealey** - *Initial work* - [GitHub](https://github.com/CatSealey)

## 🙏 Acknowledgments

- Modern CSS techniques inspired by industry best practices
- Component architecture influenced by React patterns
- Testing strategies based on Testing Library principles
- Build optimization techniques from Vite documentation

---

## 📞 Support

For support, open an issue on GitHub.

## 🗺️ Roadmap

- [ ] TypeScript migration
- [ ] Progressive Web App features
- [ ] Advanced analytics integration
- [ ] Multi-language support
- [ ] Advanced data visualization components
Website for Code-Roast
