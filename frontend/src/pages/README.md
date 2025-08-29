# Page Structure & Routing

This directory contains all the page components for the AI Project Assistant platform, organized with React Router for clean navigation.

## Page Components

### **HomePage** (`/`)
- Landing page with hero section, features overview, and platform statistics
- Navigation cards to all major platform features
- Clean, modern design that matches the overall design system

### **ChatPage** (`/chat`)
- AI Project Assistant interface
- Wraps the `ChatInterface` component
- Page header with navigation back to home

### **JobsPage** (`/jobs`)
- Job listings and browsing interface
- Wraps the `JobListing` component
- Page header with navigation back to home

### **PostJobPage** (`/post-job`)
- Job posting wizard interface
- Wraps the `PostJobWizard` component
- Page header with navigation back to home

### **DevelopersPage** (`/developers`)
- Developer directory and profiles
- Wraps the `DeveloperProfileDemo` component
- Page header with navigation back to home

## Navigation Structure

The app uses a consistent navigation pattern:

```
Navigation Component (Sticky Header)
├── Logo (Home link)
├── Desktop Navigation Menu
│   ├── Home
│   ├── AI Assistant
│   ├── Jobs
│   ├── Post Job
│   └── Developers
└── Mobile Navigation (Hamburger menu)
```

## Page Layout

Each page follows a consistent layout structure:

```
PageLayout
├── PageHeader
│   ├── Navigation (Back to Home)
│   ├── Page Title
│   └── Page Description
└── PageContent
    └── Component Content
```

## Routing Configuration

Routes are configured in `App.tsx`:

```tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/chat" element={<ChatPage />} />
  <Route path="/jobs" element={<JobsPage />} />
  <Route path="/post-job" element={<PostJobPage />} />
  <Route path="/developers" element={<DevelopersPage />} />
</Routes>
```

## Design System

All pages follow the established design system:

- **Color Scheme**: Purple-blue gradients (#667eea to #764ba2)
- **Typography**: Inter font family
- **Spacing**: Consistent padding and margins
- **Responsive**: Mobile-first approach with breakpoints at 768px and 480px
- **Dark Mode**: Automatic system preference detection

## File Structure

```
src/
├── pages/
│   ├── HomePage.tsx
│   ├── ChatPage.tsx
│   ├── JobsPage.tsx
│   ├── PostJobPage.tsx
│   ├── DevelopersPage.tsx
│   ├── index.ts
│   └── README.md
├── styles/
│   ├── HomePage.css
│   ├── PageLayout.css
│   └── Navigation.css
└── components/
    ├── Navigation.tsx
    └── ... (other components)
```

## Usage

To add a new page:

1. Create the page component in `src/pages/`
2. Add the route to `App.tsx`
3. Add navigation item to `Navigation.tsx`
4. Create corresponding CSS file if needed
5. Export from `pages/index.ts`

## Benefits

- **Clean Organization**: Each component has its own dedicated page
- **Better UX**: Users can bookmark specific pages and navigate directly
- **SEO Friendly**: Each page can have its own meta tags and content
- **Maintainable**: Clear separation of concerns and routing logic
- **Scalable**: Easy to add new pages and features 