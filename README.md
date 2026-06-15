# morgu

A premium React component library built with **Tailwind CSS v4**, **Framer Motion**, and **Lucide icons**. Animated, themeable (dark/light), SSR-safe, and fully typed.

## Features

- **28 components + providers** covering inputs, overlays, navigation, data display, and feedback.
- **Smooth animations** powered by Framer Motion.
- **Dark / light theming** via CSS variables and a `ThemeProvider`.
- **App-wide toasts** with a `useToast()` hook.
- **Zero runtime dependencies** — React, Framer Motion, Lucide, and Tailwind are peers.
- **SSR-safe** — works in Next.js, Remix, and other server-rendered setups.
- **TypeScript declarations** shipped in the box.

## Installation

```bash
npm install morgu
```

### Peer dependencies

```bash
npm install react react-dom framer-motion lucide-react
```

Tailwind CSS v4 is an optional peer — required only if you want to extend or restyle components.

## Setup

**1. Import the stylesheet once** (e.g. in your app entry). This ships the theme tokens, the utilities the components use, and animations:

```js
import "morgu/styles.css";
```

**2. Wrap your app in the providers** you need:

```jsx
import { ThemeProvider, ToastProvider } from "morgu";

export default function App({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider position="bottom-right">
        {children}
      </ToastProvider>
    </ThemeProvider>
  );
}
```

**3. (Optional) Using Tailwind v4 in your own app?** Add morgu to your content sources so its classes are kept and yours can extend them. In your Tailwind entry CSS:

```css
@import "tailwindcss";
@source "../node_modules/morgu/dist/morgu.es.js";
```

## Usage

```jsx
import { Button, Card, useToast } from "morgu";

function Example() {
  const toast = useToast();
  return (
    <Card title="Welcome">
      <Button variant="primary" onClick={() => toast.success("Saved!")}>
        Save
      </Button>
    </Card>
  );
}
```

### Theming

Colors are driven by CSS variables (`--primary`, `--surface`, `--text`, `--border`, `--muted`, …) defined for dark and light modes. Toggle with the hook or the prebuilt toggle:

```jsx
import { useTheme, ThemeToggle } from "morgu";

const { theme, toggleTheme } = useTheme();
// or just drop <ThemeToggle /> anywhere
```

To override the palette, redefine the variables in your own CSS after importing `morgu/styles.css`.

## Components

**Inputs & controls:** Button, Input, Textarea, Select, Checkbox, Radio + RadioGroup, Switch, Slider

**Overlays:** Modal, Drawer, Tooltip, Dropdown

**Layout & navigation:** Card, Accordion, Tabs, Carousel, Navbar, Breadcrumb, Pagination, ProgressBar, Table

**Feedback & display:** Avatar, Alert, Badge, Toast, Spinner, Skeleton, ThemeToggle

**Providers & hooks:** `ThemeProvider` / `useTheme`, `ToastProvider` / `useToast`

**Utilities:** `cn(...classes)` — a tiny className combiner.

### A few examples

```jsx
// Sortable table
<Table
  columns={[
    { key: "name", header: "Name" },
    { key: "role", header: "Role", sortable: false },
  ]}
  data={[{ id: 1, name: "Ada", role: "Engineer" }]}
/>

// Router-agnostic navbar (pass your router's Link if you use one)
<Navbar
  brand="Acme"
  links={[{ label: "Docs", href: "/docs" }]}
/>

// Avatar with image fallback to initials
<Avatar name="Mustapha Adegbite" src={url} status="online" />
```

## Scripts

- `npm run dev` — start the demo/dev server
- `npm run build` — build the library to `dist/`
- `npm run preview` — preview the build
- `npm run lint` — run ESLint

## Contributing

Contributions are welcome. Fork the repo, create a feature branch, and open a pull request.

## License

MIT © Mustapha Adegbite
