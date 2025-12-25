// pages/Documentation.jsx
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";

const Documentation = () => {
  const location = useLocation();

  // Handle hash navigation (smooth scroll when clicking sidebar links)
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  const sections = [
    { title: "Getting Started", id: "getting-started" },
    { title: "Theming", id: "theming" },
    { title: "Components", id: "components" },
    { title: "Installation", id: "installation" },
    { title: "Best Practices", id: "best-practices" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Header with Back Button */}
      <header className="sticky top-0 z-40 bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Documentation</h1>
          <Link
            to="/"
            className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
          >
            <ArrowLeft className="size-5" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar Navigation */}
        <aside className="hidden md:block w-64 border-r border-[var(--border)] p-8 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="space-y-3">
            {sections.map((section) => (
              <Link
                key={section.id}
                to={`#${section.id}`}
                className="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-[var(--surface-hover)] transition-colors text-[var(--muted)] hover:text-[var(--primary)]"
              >
                {section.title}
                <ChevronRight className="size-4 opacity-50" />
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 md:p-12 lg:p-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-center md:text-left">
            Documentation
          </h1>

          {/* Getting Started */}
          <section id="getting-started" className="mb-20">
            <h2 className="text-4xl font-bold mb-6">Getting Started</h2>
            <p className="text-lg text-[var(--muted)] mb-6 leading-relaxed">
              Welcome to the premium design system! Install the package and
              start building consistent, accessible, and animated UIs.
            </p>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] overflow-x-auto mb-6">
              <pre className="text-sm">
                <code>npm install component-library</code>
              </pre>
            </div>
            <p className="text-[var(--muted)]">
              Then import components in your project:
            </p>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] overflow-x-auto mt-4">
              <pre className="text-sm">
                <code>{`import { Button, Card } from 'component-library';`}</code>
              </pre>
            </div>
          </section>

          {/* Theming */}
          <section id="theming" className="mb-20">
            <h2 className="text-4xl font-bold mb-6">Theming</h2>
            <p className="text-lg text-[var(--muted)] mb-6">
              Customize colors and styles using CSS variables and Tailwind v4's
              @theme directive.
            </p>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] overflow-x-auto">
              <pre className="text-sm">
                <code>{`@theme {
  --color-primary: oklch(0.72 0.18 200);
  --color-background: oklch(0.10 0.02 240);
}`}</code>
              </pre>
            </div>
          </section>

          {/* Components */}
          <section id="components" className="mb-20">
            <h2 className="text-4xl font-bold mb-6">Components</h2>
            <p className="text-lg text-[var(--muted)] mb-6">
              All components are reusable, theme-aware, and animated with Framer
              Motion.
            </p>
            <ul className="list-disc pl-8 space-y-3 text-[var(--muted)]">
              <li>Button – variants, icons, hover animations</li>
              <li>Card – elevation, hover lift</li>
              <li>Tabs – animated underline</li>
              <li>Dropdown – keyboard accessible</li>
              <li>Carousel – auto-play, touch-enabled</li>
              <li>Modal – scale-in animation</li>
              <li>Accordion – smooth expand/collapse</li>
            </ul>
          </section>

          {/* Installation */}
          <section id="installation" className="mb-20">
            <h2 className="text-4xl font-bold mb-6">Installation</h2>
            <p className="text-lg text-[var(--muted)] mb-6">
              1. Install the package
              <br />
              2. Add Tailwind v4 to your project
              <br />
              3. Import components and CSS (if needed)
            </p>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] overflow-x-auto">
              <pre className="text-sm">
                <code>{`npm install component-library
# Then in your CSS:
@import "tailwindcss";`}</code>
              </pre>
            </div>
          </section>

          {/* Best Practices */}
          <section id="best-practices">
            <h2 className="text-4xl font-bold mb-6">Best Practices</h2>
            <ul className="list-disc pl-8 space-y-3 text-[var(--muted)]">
              <li>Use consistent spacing (8pt grid)</li>
              <li>Ensure accessibility (ARIA labels, keyboard nav)</li>
              <li>Leverage Framer Motion for subtle interactions</li>
              <li>Keep themes minimal and high-contrast</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Documentation;
