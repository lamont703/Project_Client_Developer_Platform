# Dev Jobs Platform - Design System

A comprehensive mobile-first static website workspace for a developer job marketplace platform, featuring complete documentation, wireframes, and interactive prototypes.

## 🚀 Project Overview

**Dev Jobs Platform** is a specialized marketplace connecting businesses with expert developers in AI, Blockchain, Automation, and Software Development. This repository contains the complete design system including:

- **📚 Documentation** - Product specifications, requirements, user flows, and guidelines
- **📐 Wireframes** - Low-fidelity, navigable HTML layouts showing structure
- **🎨 Interactive Prototype** - High-fidelity, functional prototype with mock data

## 🏗️ Project Structure

```
/
├── index.html                     # Main hub linking to all sections
├── README.md                      # This file
├── LICENSE.md                     # MIT License
├── /assets
│   ├── /css
│   │   ├── global.css            # Design tokens + utilities (mobile-first)
│   │   ├── wireframe.css         # Gray-box wireframe theme
│   │   └── prototype.css         # Polished UI theme
│   ├── /js
│   │   ├── app.js               # Shared utilities (theme, toasts, modal)
│   │   ├── data.js              # Mock data management
│   │   ├── components.js        # Reusable UI components
│   │   └── validate.js          # Form validation helpers
│   ├── /data
│   │   └── mock.json            # Jobs, companies, users, messages
│   ├── /img                     # Placeholder images
│   └── /icons                   # SVG icons
├── /docs
│   ├── index.html               # Documentation hub
│   ├── product-brief.html       # Problem, audience, value prop
│   ├── requirements.html        # Functional + non-functional requirements
│   ├── user-stories.html        # User stories with acceptance criteria
│   ├── flows.html              # User flows with ASCII diagrams
│   ├── ia-sitemap.html         # Information architecture
│   ├── data-model.html         # Database schema and relationships
│   ├── analytics.html          # Event tracking and KPIs
│   ├── content-style.html      # Voice, tone, microcopy
│   └── accessibility.html      # WCAG compliance plan
├── /wireframes
│   ├── index.html              # Wireframes hub
│   ├── landing.html            # Landing page layout
│   ├── browse-jobs.html        # Job search interface
│   ├── job-detail.html         # Job details page
│   ├── post-job.html           # Job posting wizard
│   ├── developer-profile.html  # Developer showcase
│   ├── auth.html              # Authentication flows
│   ├── dashboard-client.html   # Client management interface
│   ├── dashboard-developer.html # Developer dashboard
│   └── messaging.html          # Communication interface
└── /prototype
    ├── index.html              # Prototype hub
    ├── landing.html            # Interactive landing page
    ├── browse-jobs.html        # Functional job browser
    ├── job-detail.html         # Complete job details
    ├── post-job.html           # Multi-step job posting
    ├── developer-profile.html  # Developer profile showcase
    ├── auth.html              # Authentication with validation
    ├── dashboard-client.html   # Client dashboard with data
    ├── dashboard-developer.html # Developer dashboard
    ├── messaging.html          # Two-pane messaging
    └── settings.html           # User settings
```

## 🚀 How to Run

### Simple Setup (Recommended)

1. **Download/Clone** this repository
2. **Double-click** `index.html` to open in your browser
3. **Navigate** through the three main sections:
   - 📚 **Documentation** - Read product specs and requirements
   - 📐 **Wireframes** - Explore layout structures and flows
   - 🎨 **Prototype** - Experience the interactive application

### Local Server (Optional)

For the best experience with some advanced features:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📱 Device Testing

The platform is designed mobile-first with these breakpoints:

- **Mobile**: 360-428px (Primary focus)
- **Tablet**: 768-1024px
- **Desktop**: ≥1280px

### Recommended Testing

- **Chrome DevTools** - Mobile device simulation
- **Real devices** - iPhone, Android, iPad
- **Different browsers** - Chrome, Firefox, Safari, Edge

## ✨ Key Features

### 🎨 Design System

- **Mobile-first responsive design** with fluid typography and spacing
- **12-column CSS Grid** system with custom properties
- **Dark/Light mode** with theme persistence
- **Accessible by default** - WCAG AA compliant
- **Performance optimized** - No build tools required

### 📚 Documentation

- **Complete product brief** with market analysis
- **Detailed requirements** using MoSCoW prioritization
- **User stories** with acceptance criteria
- **User flows** with ASCII diagrams
- **Information architecture** and navigation design
- **Analytics strategy** with event tracking
- **Accessibility plan** with WCAG guidelines

### 📐 Wireframes

- **Low-fidelity layouts** focusing on structure
- **Clickable navigation** between pages
- **Responsive patterns** for all screen sizes
- **Annotation callouts** explaining design decisions
- **Gray-box aesthetic** emphasizing functionality

### 🎨 Interactive Prototype

- **High-fidelity UI** with polished components
- **Real functionality** - search, filters, forms
- **Mock data integration** with 12+ jobs and users
- **Form validation** with error handling
- **Local storage** for saved jobs and user sessions
- **Responsive interactions** optimized for touch

## 🧪 Testing Checklist

### ✅ Functionality Testing

- [ ] All navigation links work correctly
- [ ] Forms validate properly and show errors
- [ ] Search and filters function in real-time
- [ ] Theme toggle works and persists
- [ ] Responsive design works on all screen sizes
- [ ] Job save/unsave functionality works
- [ ] Modal and dropdown interactions work
- [ ] No console errors in browser

### ♿ Accessibility Testing

- [ ] Keyboard navigation works throughout
- [ ] Screen reader compatibility (test with NVDA/VoiceOver)
- [ ] Color contrast meets AA standards
- [ ] Focus indicators are visible
- [ ] Skip links function properly
- [ ] Form labels are properly associated
- [ ] ARIA attributes are correctly implemented

### 📱 Mobile Testing

- [ ] Touch targets are minimum 44x44px
- [ ] Scrolling is smooth on mobile devices
- [ ] Forms work well with mobile keyboards
- [ ] Navigation is thumb-friendly
- [ ] Content is readable without zooming
- [ ] Performance is acceptable on slower devices

### 🌐 Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance Targets

Based on Lighthouse testing:

- **Performance**: ≥90
- **Accessibility**: ≥95
- **Best Practices**: ≥95
- **SEO**: ≥90

## 🛠️ Technical Details

### CSS Architecture

- **Custom Properties** for design tokens
- **Mobile-first** media queries
- **CSS Grid** and Flexbox for layouts
- **No external dependencies** (self-contained)

### JavaScript Features

- **Vanilla JavaScript** - no frameworks required
- **Progressive enhancement** - works without JS
- **Local storage** for persistence
- **Debounced search** for performance
- **Accessible interactions** with proper focus management

### Data Structure

- **JSON-based** mock data in `/assets/data/mock.json`
- **Realistic content** with 12 jobs, 6 companies, 8 developers
- **Relationship modeling** between jobs, users, and applications

## 📊 Analytics Events

The prototype includes event tracking for:

- `job_viewed` - Job detail page visits
- `job_saved` - Job bookmarking
- `application_started` - Begin application process
- `search_performed` - Job search queries
- `filter_applied` - Filter usage
- `theme_toggled` - Dark/light mode changes

## 🎨 Design Tokens

### Colors

- **Brand Primary**: #3b82f6 (Blue)
- **Brand Secondary**: #8b5cf6 (Purple)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Orange)
- **Error**: #ef4444 (Red)

### Typography Scale

- Uses `clamp()` for fluid typography
- System font stack for performance
- Accessible contrast ratios

### Spacing Scale

- Consistent spacing using CSS custom properties
- Responsive spacing with `clamp()`
- 8px base unit system

## 🤝 Contributing

This is a design system prototype. To extend or modify:

1. **CSS**: Edit files in `/assets/css/`
2. **JavaScript**: Modify files in `/assets/js/`
3. **Content**: Update HTML files directly
4. **Data**: Modify `/assets/data/mock.json`

## 📄 License

MIT License - see [LICENSE.md](LICENSE.md) for details.

## 🔗 Quick Links

- **[📚 Documentation Hub](docs/index.html)** - Complete product specifications
- **[📐 Wireframes Hub](wireframes/index.html)** - Layout structures and flows
- **[🎨 Interactive Prototype](prototype/index.html)** - Functional application demo

---

**Version**: 1.0  
**Last Updated**: January 2024  
**Built with**: ❤️ for developers

For questions or feedback, please refer to the documentation or create an issue in the repository.
