// Documentation.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Copy, Check, Hash } from "lucide-react";
import { cn } from "../utils/cn";
import Button from "../components/Button";

const ACCENT = {
  "--primary": "#5227FF",
  "--primary-hover": "#6743ff",
  "--primary-active": "#3f1ae0",
};
const LINK = "#A78BFA"; // readable violet for text links/active

/* ---------- Sidebar / TOC structure ---------- */

const NAV = [
  {
    group: "Get started",
    items: [
      { id: "installation", title: "Installation" },
      { id: "providers", title: "Providers" },
    ],
  },
  {
    group: "Customization",
    items: [
      { id: "theming", title: "Theming" },
      { id: "typescript", title: "TypeScript" },
      { id: "tailwind", title: "Tailwind v4" },
    ],
  },
  {
    group: "Reference",
    items: [
      { id: "component-example", title: "Component example" },
      { id: "catalog", title: "Catalog" },
      { id: "accessibility", title: "Accessibility" },
    ],
  },
];
const ALL_IDS = NAV.flatMap((g) => g.items.map((i) => i.id));

const CATALOG = {
  "Inputs & controls": ["Button", "Input", "Textarea", "Select", "Checkbox", "Radio", "Switch", "Slider"],
  Overlays: ["Modal", "Drawer", "Tooltip", "Dropdown"],
  "Layout & navigation": ["Card", "Accordion", "Tabs", "Carousel", "Navbar", "Breadcrumb", "Pagination", "ProgressBar", "Table"],
  "Feedback & display": ["Avatar", "AvatarGroup", "Alert", "Badge", "Toast", "Spinner", "Skeleton", "ThemeToggle"],
  "Providers & hooks": ["ThemeProvider", "useTheme", "ToastProvider", "useToast", "cn()"],
};

const BUTTON_PROPS = [
  { prop: "variant", type: '"primary" | "secondary" | "outline" | "ghost" | "danger" | "success"', def: '"primary"', desc: "Visual style." },
  { prop: "size", type: '"sm" | "md" | "lg"', def: '"md"', desc: "Control size." },
  { prop: "loading", type: "boolean", def: "false", desc: "Shows a spinner and disables the button." },
  { prop: "icon", type: "LucideIcon", def: "—", desc: "Optional icon component." },
  { prop: "iconPosition", type: '"left" | "right"', def: '"left"', desc: "Where the icon sits." },
  { prop: "fullWidth", type: "boolean", def: "false", desc: "Stretch to container width." },
];

/* ---------- UI primitives ---------- */

const Mark = () => (
  <span className="flex items-center gap-2.5">
    <span className="grid place-items-center size-7 rounded-lg bg-[#5227FF] font-mono text-sm font-bold text-white">M</span>
    <span className="font-mono font-semibold tracking-tight text-white">morgu</span>
    <span className="font-mono text-xs text-white/35">/ docs</span>
  </span>
);

const CodeBlock = ({ children, lang = "bash" }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="rounded-xl border border-white/10 bg-black/50 overflow-hidden mt-4">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <span className="font-mono text-xs text-white/40">{lang}</span>
        <button onClick={copy} className="text-white/40 hover:text-white transition-colors" aria-label="Copy code">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed font-mono text-white/85">
        <code>{children}</code>
      </pre>
    </div>
  );
};

const PM = {
  npm: "npm install morgu",
  pnpm: "pnpm add morgu",
  yarn: "yarn add morgu",
  bun: "bun add morgu",
};
const PackageTabs = () => {
  const [pm, setPm] = useState("npm");
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(PM[pm]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="rounded-xl border border-white/10 bg-black/50 overflow-hidden mt-4">
      <div className="flex items-center justify-between border-b border-white/10 pr-3">
        <div className="flex">
          {Object.keys(PM).map((k) => (
            <button
              key={k}
              onClick={() => setPm(k)}
              className={cn(
                "px-4 py-2 font-mono text-xs transition-colors border-b-2",
                pm === k ? "text-white border-[#5227FF]" : "text-white/40 border-transparent hover:text-white/70"
              )}
            >
              {k}
            </button>
          ))}
        </div>
        <button onClick={copy} className="text-white/40 hover:text-white transition-colors" aria-label="Copy command">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-white/85">
        <code><span className="text-emerald-400">$ </span>{PM[pm]}</code>
      </pre>
    </div>
  );
};

const Heading = ({ id, eyebrow, children }) => (
  <div className="group flex flex-col mb-4 scroll-mt-24" id={id}>
    {eyebrow && <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/35 mb-2">{eyebrow}</p>}
    <a href={`#${id}`} className="flex items-center gap-2 text-3xl font-bold tracking-tight text-white">
      {children}
      <Hash className="size-5 text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  </div>
);

const Code = ({ children }) => (
  <code className="font-mono text-[0.85em] px-1.5 py-0.5 rounded bg-white/10" style={{ color: LINK }}>{children}</code>
);

/* ---------- Page ---------- */

const Documentation = () => {
  const location = useLocation();
  const [active, setActive] = useState(ALL_IDS[0]);

  useEffect(() => {
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
    );
    ALL_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div style={ACCENT} className="relative min-h-screen bg-[#070709]/92 backdrop-blur-2xl text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#070709]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Mark />
          <div className="flex items-center gap-6 font-mono text-sm">
            <Link to="/components" className="text-white/55 hover:text-white transition-colors">Components</Link>
            <Link to="/" className="flex items-center gap-2 text-white/55 hover:text-white transition-colors">
              <ArrowLeft className="size-4" /> Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-60 shrink-0 border-r border-white/10 py-10 pr-4 sticky top-[4.4rem] h-[calc(100vh-4.4rem)] overflow-y-auto">
          {NAV.map((g) => (
            <div key={g.group} className="mb-7">
              <p className="font-mono text-[0.7rem] uppercase tracking-widest text-white/30 mb-3 pl-3">{g.group}</p>
              <nav className="space-y-0.5">
                {g.items.map((it) => (
                  <button
                    key={it.id}
                    onClick={() => go(it.id)}
                    className={cn(
                      "w-full text-left text-sm py-1.5 pl-3 border-l-2 transition-colors",
                      active === it.id
                        ? "border-[#5227FF] text-white font-medium"
                        : "border-transparent text-white/50 hover:text-white/80"
                    )}
                  >
                    {it.title}
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 px-6 md:px-12 py-12 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/35">documentation</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Get started with Morgu</h1>
          <p className="mt-4 text-lg text-white/55">
            A premium React component library built with Tailwind v4, Framer Motion and Lucide icons —
            animated, themeable, accessible, and fully typed.
          </p>

          {/* Installation */}
          <section className="mt-16">
            <Heading id="installation" eyebrow="get started">Installation</Heading>
            <p className="text-white/55">Install the package with your favourite manager:</p>
            <PackageTabs />
            <p className="text-white/55 mt-6">Then install the peer dependencies:</p>
            <CodeBlock lang="bash">npm install react react-dom framer-motion lucide-react</CodeBlock>
            <p className="text-white/55 mt-6">Import the stylesheet once, then use any component:</p>
            <CodeBlock lang="tsx">{`import "morgu/styles.css";
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
          <section className="mt-16">
            <Heading id="providers">Providers</Heading>
            <p className="text-white/55">
              Wrap your app in <Code>ThemeProvider</Code> for dark/light theming and <Code>ToastProvider</Code> to use the <Code>useToast()</Code> hook anywhere.
            </p>
            <CodeBlock lang="tsx">{`import { ThemeProvider, ToastProvider } from "morgu";

<ThemeProvider>
  <ToastProvider position="bottom-right">
    <App />
  </ToastProvider>
</ThemeProvider>`}</CodeBlock>
            <p className="text-white/55 mt-6">Then fire toasts from any component:</p>
            <CodeBlock lang="tsx">{`import { useToast } from "morgu";

const toast = useToast();
toast.success("Saved!");
toast.error("Something went wrong");`}</CodeBlock>
          </section>

          {/* Theming */}
          <section className="mt-16">
            <Heading id="theming" eyebrow="customization">Theming</Heading>
            <p className="text-white/55">
              Every color is a CSS variable. Override them in your own CSS after importing the stylesheet to re-skin the whole library:
            </p>
            <CodeBlock lang="css">{`:root {
  --primary: oklch(0.72 0.18 200);
  --surface: oklch(0.16 0.02 240);
  --border:  oklch(0.30 0.02 240);
  --text:    oklch(0.96 0 0);
  --muted:   oklch(0.65 0.02 240);
}`}</CodeBlock>
            <p className="text-white/55 mt-6">
              Toggle modes with the <Code>useTheme()</Code> hook or drop in <Code>&lt;ThemeToggle /&gt;</Code>.
            </p>
          </section>

          {/* TypeScript */}
          <section className="mt-16">
            <Heading id="typescript">TypeScript</Heading>
            <p className="text-white/55">
              Morgu ships complete type declarations — every prop is typed, no <Code>@types</Code> package required.
            </p>
            <CodeBlock lang="tsx">{`import { Button, type ButtonProps } from "morgu";

const props: ButtonProps = { variant: "danger", size: "lg", loading: true };`}</CodeBlock>
          </section>

          {/* Tailwind */}
          <section className="mt-16">
            <Heading id="tailwind">Tailwind v4</Heading>
            <p className="text-white/55">
              The imported stylesheet works on its own. If you also use Tailwind v4 and want your utilities to extend Morgu's, add it as a source:
            </p>
            <CodeBlock lang="css">{`@import "tailwindcss";
@source "../node_modules/morgu/dist/morgu.es.js";`}</CodeBlock>
          </section>

          {/* Component example */}
          <section className="mt-16">
            <Heading id="component-example" eyebrow="reference">Component example</Heading>
            <p className="text-white/55">A live preview, the code, and the props — the shape every component follows.</p>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-10 grid place-items-center gap-4">
              <div className="flex flex-wrap gap-3 justify-center">
                <Button>Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="danger" loading>Saving</Button>
              </div>
            </div>
            <CodeBlock lang="tsx">{`<Button variant="primary">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger" loading>Saving</Button>`}</CodeBlock>

            <h3 className="mt-8 mb-3 text-sm font-mono uppercase tracking-widest text-white/40">Props</h3>
            <div className="rounded-xl border border-white/10 overflow-hidden overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03] font-mono text-xs uppercase tracking-wide text-white/40">
                    <th className="px-4 py-3">Prop</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Default</th>
                    <th className="px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {BUTTON_PROPS.map((r) => (
                    <tr key={r.prop} className="border-b border-white/[0.06] last:border-0 align-top">
                      <td className="px-4 py-3 font-mono" style={{ color: LINK }}>{r.prop}</td>
                      <td className="px-4 py-3 font-mono text-xs text-white/55 max-w-[16rem]">{r.type}</td>
                      <td className="px-4 py-3 font-mono text-xs text-white/45">{r.def}</td>
                      <td className="px-4 py-3 text-white/60">{r.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Catalog */}
          <section className="mt-16">
            <Heading id="catalog">Catalog</Heading>
            <p className="text-white/55 mb-6">
              See the{" "}
              <Link to="/components" className="hover:underline" style={{ color: LINK }}>Components</Link>{" "}
              page for a live preview of each.
            </p>
            <div className="space-y-6">
              {Object.entries(CATALOG).map(([group, items]) => (
                <div key={group}>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-3">{group}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((name) => (
                      <span key={name} className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-sm font-mono text-white/70">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Accessibility */}
          <section className="mt-16">
            <Heading id="accessibility">Accessibility</Heading>
            <ul className="space-y-3 text-white/60">
              {[
                "Interactive components expose proper ARIA roles and states.",
                "Modal and Drawer trap focus, lock body scroll, and restore focus on close.",
                "Select, Dropdown, Slider, Tabs and Switch support full keyboard control.",
                "Focus-visible rings are applied consistently across controls.",
                "Toasts announce via aria-live regions.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="size-5 shrink-0 mt-0.5" style={{ color: LINK }} />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-16 pt-8 border-t border-white/10 font-mono text-xs text-white/30">
              morgu · MIT licensed · built by Mustapha Adegbite
            </div>
          </section>
        </main>

        {/* On this page */}
        <aside className="hidden xl:block w-56 shrink-0 py-12 pl-8 sticky top-[4.4rem] h-[calc(100vh-4.4rem)]">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-white/30 mb-4">On this page</p>
          <nav className="space-y-1.5">
            {ALL_IDS.map((id) => {
              const title = NAV.flatMap((g) => g.items).find((i) => i.id === id)?.title;
              return (
                <button
                  key={id}
                  onClick={() => go(id)}
                  className={cn(
                    "block text-left text-sm transition-colors",
                    active === id ? "text-white" : "text-white/40 hover:text-white/70"
                  )}
                >
                  {title}
                </button>
              );
            })}
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default Documentation;

// GET IN JOOR