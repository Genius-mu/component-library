// Documentation.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ChevronRight, Copy, Check } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const SECTIONS = [
  { title: "Getting Started", id: "getting-started" },
  { title: "Providers", id: "providers" },
  { title: "Theming", id: "theming" },
  { title: "TypeScript", id: "typescript" },
  { title: "Tailwind v4", id: "tailwind" },
  { title: "Component Catalog", id: "catalog" },
  { title: "Accessibility", id: "accessibility" },
];

const CATALOG = {
  "Inputs & controls": [
    "Button",
    "Input",
    "Textarea",
    "Select",
    "Checkbox",
    "Radio / RadioGroup",
    "Switch",
    "Slider",
  ],
  Overlays: ["Modal", "Drawer", "Tooltip", "Dropdown"],
  "Layout & navigation": [
    "Card",
    "Accordion",
    "Tabs",
    "Carousel",
    "Navbar",
    "Breadcrumb",
    "Pagination",
    "ProgressBar",
    "Table",
  ],
  "Feedback & display": [
    "Avatar / AvatarGroup",
    "Alert",
    "Badge",
    "Toast",
    "Spinner",
    "Skeleton",
    "ThemeToggle",
  ],
  "Providers, hooks & utils": [
    "ThemeProvider / useTheme",
    "ToastProvider / useToast",
    "cn()",
  ],
};

const CodeBlock = ({ children }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative bg-[var(--surface)] rounded-xl border border-[var(--border)] mt-4">
      <button
        onClick={copy}
        className="absolute top-3 right-3 text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
        aria-label="Copy code"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
      <pre className="text-sm overflow-x-auto p-6">
        <code>{children}</code>
      </pre>
    </div>
  );
};

const Documentation = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location]);

  const scrollTo = (id) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="sticky top-0 z-40 bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Morgu Docs</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle size="sm" />
            <Link
              to="/"
              className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
            >
              <ArrowLeft className="size-5" /> Home
            </Link>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        <aside className="hidden md:block w-60 border-r border-[var(--border)] p-6 sticky top-[4.5rem] h-[calc(100vh-4.5rem)] overflow-y-auto">
          <nav className="space-y-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[var(--surface-hover)] transition-colors text-[var(--muted)] hover:text-[var(--primary)] text-sm"
              >
                {s.title}
                <ChevronRight className="size-4 opacity-50" />
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 md:p-12 lg:p-16 min-w-0 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Documentation
          </h1>
          <p className="text-lg text-[var(--muted)] mb-16">
            Morgu is a premium React component library built with Tailwind v4,
            Framer Motion and Lucide icons.
          </p>

          {/* Getting Started */}
          <section id="getting-started" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
            <p className="text-[var(--muted)] mb-2">Install the package:</p>
            <CodeBlock>npm install morgu</CodeBlock>
            <p className="text-[var(--muted)] mt-6 mb-2">
              Install the peer dependencies:
            </p>
            <CodeBlock>
              npm install react react-dom framer-motion lucide-react
            </CodeBlock>
            <p className="text-[var(--muted)] mt-6 mb-2">
              Import the stylesheet once (e.g. in your entry file), then use any
              component:
            </p>
            <CodeBlock>{`import "morgu/styles.css";
import { Button, Card } from "morgu";

export default function App() {
  return (
    <Card title="Welcome">
      <Button variant="primary">Get started</Button>
    </Card>
  );
}`}</CodeBlock>
          </section>

          {/* Providers */}
          <section id="providers" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold mb-4">Providers</h2>
            <p className="text-[var(--muted)] mb-2">
              Wrap your app in{" "}
              <code className="text-[var(--primary)]">ThemeProvider</code> for
              dark/light theming and{" "}
              <code className="text-[var(--primary)]">ToastProvider</code> to
              use the <code className="text-[var(--primary)]">useToast()</code>{" "}
              hook anywhere.
            </p>
            <CodeBlock>{`import { ThemeProvider, ToastProvider } from "morgu";

<ThemeProvider>
  <ToastProvider position="bottom-right">
    <App />
  </ToastProvider>
</ThemeProvider>`}</CodeBlock>
            <p className="text-[var(--muted)] mt-6 mb-2">
              Then fire toasts from any component:
            </p>
            <CodeBlock>{`import { useToast } from "morgu";

const toast = useToast();
toast.success("Saved!");
toast.error("Something went wrong");`}</CodeBlock>
          </section>

          {/* Theming */}
          <section id="theming" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold mb-4">Theming</h2>
            <p className="text-[var(--muted)] mb-2">
              Every color is a CSS variable. Override them in your own CSS after
              importing the stylesheet to re-skin the whole library:
            </p>
            <CodeBlock>{`:root {
  --primary: oklch(0.72 0.18 200);
  --surface: oklch(0.16 0.02 240);
  --border: oklch(0.30 0.02 240);
  --text: oklch(0.96 0 0);
  --muted: oklch(0.65 0.02 240);
}`}</CodeBlock>
            <p className="text-[var(--muted)] mt-6">
              Toggle modes with the{" "}
              <code className="text-[var(--primary)]">useTheme()</code> hook or
              drop in{" "}
              <code className="text-[var(--primary)]">
                &lt;ThemeToggle /&gt;
              </code>
              .
            </p>
          </section>

          {/* TypeScript */}
          <section id="typescript" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold mb-4">TypeScript</h2>
            <p className="text-[var(--muted)] mb-2">
              Morgu ships complete type declarations — every prop is typed, no{" "}
              <code>@types</code> package required.
            </p>
            <CodeBlock>{`import { Button, type ButtonProps } from "morgu";

const props: ButtonProps = { variant: "danger", size: "lg", loading: true };`}</CodeBlock>
          </section>

          {/* Tailwind */}
          <section id="tailwind" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold mb-4">Tailwind v4</h2>
            <p className="text-[var(--muted)] mb-2">
              The imported stylesheet works on its own. If you also use Tailwind
              v4 and want your utilities to extend Morgu's, add it as a source:
            </p>
            <CodeBlock>{`@import "tailwindcss";
@source "../node_modules/morgu/dist/morgu.es.js";`}</CodeBlock>
          </section>

          {/* Catalog */}
          <section id="catalog" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold mb-4">Component Catalog</h2>
            <p className="text-[var(--muted)] mb-6">
              See the{" "}
              <Link
                to="/components"
                className="text-[var(--primary)] hover:underline"
              >
                Components
              </Link>{" "}
              page for live previews of each.
            </p>
            <div className="space-y-6">
              {Object.entries(CATALOG).map(([group, items]) => (
                <div key={group}>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)] mb-3">
                    {group}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((name) => (
                      <span
                        key={name}
                        className="px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Accessibility */}
          <section id="accessibility" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-4">Accessibility</h2>
            <ul className="list-disc pl-6 space-y-2 text-[var(--muted)]">
              <li>
                Interactive components expose proper ARIA roles and states.
              </li>
              <li>
                Modal and Drawer trap focus, lock body scroll, and restore focus
                on close.
              </li>
              <li>
                Select, Dropdown, Slider, Tabs and Switch support full keyboard
                control.
              </li>
              <li>
                Focus-visible rings are applied consistently across controls.
              </li>
              <li>
                Toasts announce via <code>aria-live</code> regions.
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Documentation;
