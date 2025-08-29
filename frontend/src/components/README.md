# Developer Profile Component

A modern, responsive React component for displaying developer profiles in a developer directory.

## Features

- **Modern Design**: Matches the existing design system with gradients and glassmorphism effects
- **Mobile Friendly**: Fully responsive design that works on all screen sizes
- **Interactive Elements**: Expandable bio, contact information toggle, and hover effects
- **Rich Information Display**: Skills, languages, ratings, availability status, and more
- **Social Links**: Portfolio, GitHub, and LinkedIn integration
- **Dark Mode Support**: Automatically adapts to user's system preferences

## Usage

### Basic Usage

```tsx
import DeveloperProfile from "./components/DeveloperProfile";

function App() {
  return <DeveloperProfile />;
}
```

### With Custom Data

```tsx
import DeveloperProfile from "./components/DeveloperProfile";

const developerData = {
  id: "1",
  name: "John Doe",
  title: "Senior Developer",
  avatar: "https://example.com/avatar.jpg",
  location: "New York, NY",
  hourlyRate: "$80-120",
  skills: ["React", "Node.js", "TypeScript"],
  experience: "8+ years",
  bio: "Experienced developer with a passion for clean code...",
  portfolio: "https://johndoe.dev",
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  rating: 4.9,
  completedProjects: 50,
  availability: "Available",
  languages: ["English", "Spanish"],
  timezone: "EST (UTC-5)",
};

function App() {
  return <DeveloperProfile developer={developerData} />;
}
```

## Props

| Prop        | Type                   | Required | Description                                                    |
| ----------- | ---------------------- | -------- | -------------------------------------------------------------- |
| `developer` | `DeveloperProfileData` | No       | Developer data object. If not provided, uses default demo data |

### DeveloperProfileData Interface

```tsx
interface DeveloperProfileData {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  location: string;
  hourlyRate: string;
  skills: string[];
  experience: string;
  bio: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
  rating: number;
  completedProjects: number;
  availability: "Available" | "Busy" | "Unavailable";
  languages: string[];
  timezone: string;
}
```

## Demo Component

The `DeveloperProfileDemo` component showcases multiple developer profiles in a grid layout:

```tsx
import DeveloperProfileDemo from "./components/DeveloperProfileDemo";

function App() {
  return <DeveloperProfileDemo />;
}
```

## Styling

The component uses CSS modules and follows the existing design system:

- **Color Scheme**: Purple-blue gradients (#667eea to #764ba2)
- **Typography**: Inter font family
- **Spacing**: Consistent padding and margins
- **Animations**: Smooth hover effects and transitions
- **Responsive**: Mobile-first approach with breakpoints at 768px and 480px

## Customization

### CSS Variables

You can customize the component by overriding CSS variables in your stylesheet:

```css
.developer-profile {
  --primary-gradient: linear-gradient(135deg, #your-color, #your-color);
  --border-radius: 20px;
  --shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
```

### Theme Overrides

The component automatically supports dark mode through CSS media queries, but you can also implement custom theming by overriding the CSS classes.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- Backdrop-filter support for glassmorphism effects (with fallbacks)

## Accessibility

- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- High contrast support

## Performance

- Optimized re-renders with React hooks
- Efficient CSS animations
- Lazy loading for images (if implemented)
- Minimal bundle size impact
