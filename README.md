# Component Library

A premium React component library with Tailwind v4, Framer Motion & Lucide icons. Built for modern web applications with beautiful animations, dark/light theme support, and premium UX design patterns.

## Features

- **Modern Design**: Sleek, responsive components with premium UX patterns.
- **Animations**: Smooth animations powered by Framer Motion.
- **Theme Support**: Built-in dark/light theme toggle.
- **Icons**: Integrated Lucide icons for consistent iconography.
- **Tailwind CSS**: Styled with Tailwind v4 for easy customization.
- **TypeScript Ready**: Full TypeScript support for better development experience.

## Installation

Install the component library via npm:

```bash
npm install component-library
```

### Peer Dependencies

Make sure to install the required peer dependencies:

```bash
npm install react@^18.0.0 react-dom@^18.0.0 framer-motion@^11.0.0 lucide-react@^0.400.0 tailwindcss@^4.0.0
```

## Usage

Import and use components in your React application:

```jsx
import { Button, Card } from "component-library";

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Card title="Example Card" content="This is a card component." />
    </div>
  );
}
```

## Components

The library includes the following components:

- Accordion
- Alert
- Badge
- Breadcrumb
- Button
- Card
- Carousel
- Dropdown
- Input
- Modal
- Navbar
- Pagination
- ProgressBar
- Skeleton
- Spinner
- Switch
- Tabs
- ThemeToggle
- Toast
- Tooltip

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the library for production.
- `npm run preview`: Preview the built library.
- `npm run lint`: Run ESLint for code linting.
- `npm run prepublishOnly`: Build the library before publishing.

## Contributing

Contributions are welcome! Please read the contributing guidelines before getting started.

## License

This project is licensed under the MIT License.
