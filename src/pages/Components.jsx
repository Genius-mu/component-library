// Components.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Copy,
  Check,
  Code,
  Info,
  User,
  Settings,
  LogOut,
  Mail,
  Palette,
} from "lucide-react";

import { cn } from "../utils/cn";
import { useToast } from "../context/ToastContext";

import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Select from "../components/Select";
import Checkbox from "../components/Checkbox";
import Radio, { RadioGroup } from "../components/Radio";
import Switch from "../components/Switch";
import Slider from "../components/Slider";
import Modal from "../components/Modal";
import Drawer from "../components/Drawer";
import Accordion from "../components/Accordion";
import Tooltip from "../components/Tooltip";
import Tabs from "../components/Tabs";
import Dropdown from "../components/Dropdown";
import Carousel from "../components/Carousel";
import Alert from "../components/Alert";
import Badge from "../components/Badge";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import Skeleton from "../components/Skeleton";
import Table from "../components/Table";
import Breadcrumb from "../components/Breadcrumb";
import ProgressBar from "../components/ProgressBar";
import ThemeToggle from "../components/ThemeToggle";
import Avatar, { AvatarGroup } from "../components/Avatar";

import Aurora from "../components/backgrounds/Aurora";
import Silk from "../components/backgrounds/Silk";
import FloatingLines from "../components/backgrounds/FloatingLines";
import Prism from "../components/backgrounds/Prism";
import DarkVeil from "../components/backgrounds/DarkVeil";
import LightPillar from "../components/backgrounds/LightPillar";
import Grid from "../components/backgrounds/Grid";
import Particles from "../components/backgrounds/Particles";

const ACCENT = {
  "--primary": "#5227FF",
  "--primary-hover": "#6743ff",
  "--primary-active": "#3f1ae0",
};

/* ---------- Chrome primitives ---------- */

const Mark = () => (
  <span className="flex items-center gap-2.5">
    <span className="grid place-items-center size-7 rounded-lg bg-[#5227FF] font-mono text-sm font-bold text-white">
      M
    </span>
    <span className="font-mono font-semibold tracking-tight text-white">
      morgu
    </span>
    <span className="font-mono text-xs text-white/35">/ components</span>
  </span>
);

const CodeBlock = ({ code, lang = "tsx" }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="rounded-xl border border-white/10 bg-black/50 overflow-hidden mt-4">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <span className="font-mono text-xs text-white/40">{lang}</span>
        <button
          onClick={copy}
          className="text-white/40 hover:text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed font-mono text-white/85">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const Preview = ({ children, className = "" }) => (
  <div
    className={cn(
      "flex flex-wrap items-center gap-4 p-8 rounded-2xl border border-white/10 bg-white/[0.02]",
      className,
    )}
  >
    {children}
  </div>
);

const BgTile = ({ Comp, colors }) => (
  <div className="relative h-60 rounded-2xl border border-white/10 overflow-hidden bg-[#06060a]">
    <Comp colors={colors} fixed={false} zIndex={0} />
  </div>
);

/* ---------- Interactive demos ---------- */

const ModalDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Example modal"
        footer={<Button onClick={() => setOpen(false)}>Done</Button>}
      >
        <p className="text-white/60">
          Focus-trapped, scroll-locked, and animated in and out.
        </p>
      </Modal>
    </>
  );
};

const DrawerDemo = () => {
  const [side, setSide] = useState(null);
  return (
    <>
      <Button variant="secondary" onClick={() => setSide("right")}>
        Right
      </Button>
      <Button variant="secondary" onClick={() => setSide("left")}>
        Left
      </Button>
      <Button variant="secondary" onClick={() => setSide("bottom")}>
        Bottom
      </Button>
      <Drawer
        isOpen={!!side}
        side={side || "right"}
        onClose={() => setSide(null)}
        title="Drawer"
      >
        <p className="text-white/60">Slides in from the {side}.</p>
      </Drawer>
    </>
  );
};

const ToastDemo = () => {
  const toast = useToast();
  return (
    <>
      <Button size="sm" onClick={() => toast.info("Info message")}>
        Info
      </Button>
      <Button
        size="sm"
        variant="success"
        onClick={() => toast.success("Saved!")}
      >
        Success
      </Button>
      <Button size="sm" onClick={() => toast.warning("Careful")}>
        Warning
      </Button>
      <Button size="sm" variant="danger" onClick={() => toast.error("Failed")}>
        Error
      </Button>
    </>
  );
};

const PaginationDemo = () => {
  const [page, setPage] = useState(3);
  return (
    <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
  );
};

const FormControlsDemo = () => {
  const [text, setText] = useState("");
  const [framework, setFramework] = useState("react");
  const [checked, setChecked] = useState(true);
  const [on, setOn] = useState(false);
  const [plan, setPlan] = useState("pro");
  const [vol, setVol] = useState(50);
  return (
    <div className="w-full grid sm:grid-cols-2 gap-6">
      <Input
        label="Email"
        leftIcon={Mail}
        placeholder="you@example.com"
        hint="We'll never share it."
      />
      <Select
        label="Framework"
        options={[
          { label: "React", value: "react" },
          { label: "Vue", value: "vue" },
          { label: "Svelte", value: "svelte" },
        ]}
        value={framework}
        onChange={setFramework}
      />
      <Textarea
        label="Message"
        maxLength={80}
        showCount
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex flex-col gap-4">
        <Checkbox checked={checked} onChange={setChecked} label="Subscribe" />
        <Switch checked={on} onChange={setOn} label="Notifications" />
        <RadioGroup value={plan} onChange={setPlan} orientation="horizontal">
          <Radio value="free" label="Free" />
          <Radio value="pro" label="Pro" />
        </RadioGroup>
        <Slider
          label="Volume"
          value={vol}
          onChange={setVol}
          formatValue={(v) => `${v}%`}
        />
      </div>
    </div>
  );
};

/* ---------- Catalog data (grouped) ---------- */

const CATALOG = [
  {
    id: "button",
    group: "Inputs & controls",
    name: "Button",
    description: "Six variants, three sizes, loading and icon states.",
    demo: (
      <>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button loading>Loading</Button>
        <Button icon={Code} iconPosition="right">
          With icon
        </Button>
      </>
    ),
    code: `<Button variant="primary" size="md">Click me</Button>
<Button variant="danger" loading>Saving</Button>
<Button icon={Code} iconPosition="right">With icon</Button>`,
  },

  {
    id: "form",
    group: "Inputs & controls",
    name: "Form controls",
    description:
      "Input, Textarea, Select, Checkbox, Radio, Switch and Slider — all keyboard accessible.",
    demo: <FormControlsDemo />,
    code: `<Input label="Email" leftIcon={Mail} hint="We'll never share it." />
<Select label="Framework" options={options} value={v} onChange={setV} />
<Checkbox checked={c} onChange={setC} label="Subscribe" />
<Switch checked={on} onChange={setOn} label="Notifications" />
<RadioGroup value={p} onChange={setP}><Radio value="pro" label="Pro" /></RadioGroup>
<Slider value={vol} onChange={setVol} formatValue={(v) => v + "%"} />`,
  },

  {
    id: "modal",
    group: "Overlays",
    name: "Modal",
    description:
      "Focus-trapped dialog with scroll lock, footer slot and exit animation.",
    demo: <ModalDemo />,
    code: `<Modal isOpen={open} onClose={close} title="Title" footer={<Button>Done</Button>}>
  Modal content
</Modal>`,
  },

  {
    id: "drawer",
    group: "Overlays",
    name: "Drawer",
    description: "Slide-in panel from any edge.",
    demo: <DrawerDemo />,
    code: `<Drawer isOpen={open} side="right" onClose={close} title="Menu">
  Panel content
</Drawer>`,
  },

  {
    id: "tooltip",
    group: "Overlays",
    name: "Tooltip",
    description: "Hover/focus tooltip with positioning and delay.",
    demo: (
      <>
        <Tooltip text="Top tooltip">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip text="Bottom" position="bottom">
          <Button variant="secondary">Bottom</Button>
        </Tooltip>
        <Tooltip text="Delayed" delay={300}>
          <Button variant="outline">Delayed</Button>
        </Tooltip>
      </>
    ),
    code: `<Tooltip text="Helpful hint" position="top" delay={300}>
  <Button>Hover me</Button>
</Tooltip>`,
  },

  {
    id: "dropdown",
    group: "Overlays",
    name: "Dropdown",
    description: "Keyboard-navigable menu with item icons and alignment.",
    demo: (
      <Dropdown
        trigger={
          <span className="flex items-center gap-2">
            <User className="size-4" /> Account
          </span>
        }
        items={[
          { label: "Profile", icon: User },
          { label: "Settings", icon: Settings },
          { label: "Log out", icon: LogOut, danger: true },
        ]}
      />
    ),
    code: `<Dropdown trigger="Account" items={[
  { label: "Profile", icon: User },
  { label: "Log out", icon: LogOut, danger: true },
]} />`,
  },

  {
    id: "card",
    group: "Layout & navigation",
    name: "Card",
    description:
      "Elevated container with hover lift, icon, subtitle and footer.",
    demo: (
      <div className="grid sm:grid-cols-2 gap-6 w-full">
        <Card title="Reusable" subtitle="Atoms & molecules" icon={Code}>
          Composable building blocks.
        </Card>
        <Card
          title="Themeable"
          icon={Palette}
          footer={<Button size="sm">Action</Button>}
        >
          Driven by CSS variables.
        </Card>
      </div>
    ),
    code: `<Card title="Reusable" subtitle="Atoms" icon={Code} footer={<Button>Go</Button>}>
  Composable building blocks.
</Card>`,
  },

  {
    id: "tabs",
    group: "Layout & navigation",
    name: "Tabs",
    description: "Line and pill variants with a shared layout animation.",
    demo: (
      <div className="w-full">
        <Tabs
          variant="pill"
          tabs={[
            {
              label: "One",
              content: <p className="text-white/60">First panel</p>,
            },
            {
              label: "Two",
              content: <p className="text-white/60">Second panel</p>,
            },
            {
              label: "Three",
              content: <p className="text-white/60">Third panel</p>,
            },
          ]}
        />
      </div>
    ),
    code: `<Tabs variant="pill" tabs={[
  { label: "One", content: <p>First</p> },
  { label: "Two", content: <p>Second</p> },
]} />`,
  },

  {
    id: "accordion",
    group: "Layout & navigation",
    name: "Accordion",
    description: "Collapsible sections with ARIA wiring and optional icons.",
    demo: (
      <div className="w-full max-w-xl">
        <Accordion title="What is Morgu?" icon={Info} defaultOpen>
          A premium React component library.
        </Accordion>
        <Accordion title="Is it themeable?" icon={Palette}>
          Every color is a CSS variable.
        </Accordion>
      </div>
    ),
    code: `<Accordion title="Question" icon={Info} defaultOpen>
  Answer content
</Accordion>`,
  },

  {
    id: "carousel",
    group: "Layout & navigation",
    name: "Carousel",
    description: "Drag/swipe, autoplay, pause-on-hover and keyboard arrows.",
    demo: (
      <div className="w-full">
        <Carousel
          height="220px"
          slides={[
            <div className="h-full bg-gradient-to-br from-[#5227FF] to-[#B497CF] flex items-center justify-center text-white text-2xl font-bold">
              Slide 1
            </div>,
            <div className="h-full bg-gradient-to-br from-[#FF9FFC] to-[#5227FF] flex items-center justify-center text-white text-2xl font-bold">
              Slide 2
            </div>,
          ]}
        />
      </div>
    ),
    code: `<Carousel slides={[<div>Slide 1</div>, <div>Slide 2</div>]} autoPlay />`,
  },

  {
    id: "table",
    group: "Layout & navigation",
    name: "Table",
    description:
      "Sortable, optionally striped, with custom cell renderers and row clicks.",
    demo: (
      <div className="w-full">
        <Table
          striped
          columns={[
            { key: "name", header: "Name" },
            { key: "role", header: "Role" },
            {
              key: "tag",
              header: "Status",
              sortable: false,
              render: (v) => (
                <Badge variant="success" dot>
                  {v}
                </Badge>
              ),
            },
          ]}
          data={[
            { id: 1, name: "Ada", role: "Engineer", tag: "active" },
            { id: 2, name: "Grace", role: "Admiral", tag: "active" },
          ]}
        />
      </div>
    ),
    code: `<Table striped columns={[
  { key: "name", header: "Name" },
  { key: "tag", header: "Status", render: (v) => <Badge dot>{v}</Badge> },
]} data={rows} onRowClick={(r) => ...} />`,
  },

  {
    id: "breadcrumb",
    group: "Layout & navigation",
    name: "Breadcrumb",
    description: "Router-agnostic trail with optional collapsing.",
    demo: (
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Components", href: "/components" },
          { label: "Breadcrumb" },
        ]}
      />
    ),
    code: `<Breadcrumb items={[
  { label: "Home", href: "/" },
  { label: "Breadcrumb" },
]} />`,
  },

  {
    id: "pagination",
    group: "Layout & navigation",
    name: "Pagination",
    description: "Page navigation with first/last and a visible-page window.",
    demo: <PaginationDemo />,
    code: `<Pagination currentPage={page} totalPages={10} onPageChange={setPage} />`,
  },

  {
    id: "avatar",
    group: "Feedback & display",
    name: "Avatar",
    description:
      "Image with initials fallback, status dot, ring, and grouping.",
    demo: (
      <>
        <Avatar name="Ada Lovelace" status="online" />
        <Avatar name="Grace Hopper" size="lg" ring />
        <AvatarGroup max={3}>
          <Avatar name="A B" />
          <Avatar name="C D" />
          <Avatar name="E F" />
          <Avatar name="G H" />
        </AvatarGroup>
      </>
    ),
    code: `<Avatar name="Ada Lovelace" status="online" ring />
<AvatarGroup max={3}>
  <Avatar name="A B" /><Avatar name="C D" /><Avatar name="E F" />
</AvatarGroup>`,
  },

  {
    id: "alert",
    group: "Feedback & display",
    name: "Alert",
    description: "Four intents, optional title, action slot and dismiss.",
    demo: (
      <div className="w-full space-y-3">
        <Alert variant="info" title="Heads up">
          Informational message.
        </Alert>
        <Alert variant="success" dismissible onDismiss={() => {}}>
          Saved successfully.
        </Alert>
        <Alert variant="danger" title="Error">
          Something went wrong.
        </Alert>
      </div>
    ),
    code: `<Alert variant="success" dismissible onDismiss={fn}>Saved!</Alert>`,
  },

  {
    id: "badge",
    group: "Feedback & display",
    name: "Badge",
    description:
      "Status pills with variants, dot indicator and removable option.",
    demo: (
      <>
        <Badge variant="primary">New</Badge>
        <Badge variant="success" dot>
          Live
        </Badge>
        <Badge variant="danger">Error</Badge>
        <Badge variant="outline" onRemove={() => {}}>
          Removable
        </Badge>
      </>
    ),
    code: `<Badge variant="success" dot>Live</Badge>
<Badge variant="outline" onRemove={fn}>Removable</Badge>`,
  },

  {
    id: "spinner",
    group: "Feedback & display",
    name: "Spinner",
    description: "Ring and dots variants in six sizes.",
    demo: (
      <>
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner variant="dots" />
      </>
    ),
    code: `<Spinner size="lg" />
<Spinner variant="dots" />`,
  },

  {
    id: "toast",
    group: "Feedback & display",
    name: "Toast",
    description: "App-wide notifications via the useToast() hook.",
    demo: <ToastDemo />,
    code: `const toast = useToast();
toast.success("Saved!");
toast.error("Something failed");`,
  },

  {
    id: "progress",
    group: "Feedback & display",
    name: "Progress bar",
    description:
      "Determinate bar with a label, or a scroll-linked top bar when value is omitted.",
    demo: (
      <div className="w-full max-w-md">
        <ProgressBar value={66} showLabel />
      </div>
    ),
    code: `<ProgressBar value={66} showLabel />   // determinate
<ProgressBar />                          // scroll-linked top bar`,
  },

  {
    id: "skeleton",
    group: "Feedback & display",
    name: "Skeleton",
    description: "Shimmering placeholders for loading states.",
    demo: (
      <div className="w-full flex gap-4">
        <Skeleton variant="circle" height="56px" width="56px" />
        <div className="flex-1 pt-1">
          <Skeleton variant="text" lines={3} />
        </div>
      </div>
    ),
    code: `<Skeleton variant="circle" height="56px" width="56px" />
<Skeleton variant="text" lines={3} />`,
  },

  {
    id: "theme-toggle",
    group: "Feedback & display",
    name: "Theme toggle",
    description: "Icon-only light/dark switch backed by ThemeProvider.",
    demo: (
      <>
        <ThemeToggle size="sm" />
        <ThemeToggle size="md" />
        <ThemeToggle size="lg" />
      </>
    ),
    code: `<ThemeToggle size="md" />`,
  },
];

const GROUP_ORDER = [
  "Inputs & controls",
  "Overlays",
  "Layout & navigation",
  "Feedback & display",
];
const GROUPS = GROUP_ORDER.map((group) => ({
  group,
  items: CATALOG.filter((c) => c.group === group),
}));

const DEFAULT_BG_COLORS = ["#5227FF", "#FF9FFC", "#B497CF"];

const BACKGROUNDS = [
  {
    id: "aurora",
    name: "Aurora",
    Comp: Aurora,
    description: "Drifting aurora curtains.",
    code: `<Aurora />`,
  },
  {
    id: "silk",
    name: "Silk",
    Comp: Silk,
    description: "Soft flowing satin waves.",
    code: `<Silk />`,
  },
  {
    id: "floating-lines",
    name: "FloatingLines",
    Comp: FloatingLines,
    description: "Constellation of connected nodes.",
    code: `<FloatingLines count={70} maxDistance={150} />`,
  },
  {
    id: "prism",
    name: "Prism",
    Comp: Prism,
    description: "Rotating prismatic conic light.",
    code: `<Prism blur={80} />`,
  },
  {
    id: "dark-veil",
    name: "DarkVeil",
    Comp: DarkVeil,
    description: "Subtle dark drifting fog.",
    code: `<DarkVeil />`,
  },
  {
    id: "light-pillar",
    name: "LightPillar",
    Comp: LightPillar,
    description: "Swaying vertical light beams.",
    code: `<LightPillar count={5} />`,
  },
  {
    id: "grid",
    name: "Grid",
    Comp: Grid,
    description: "Synthwave perspective grid.",
    code: `<Grid spacing={60} />`,
  },
  {
    id: "particles",
    name: "Particles",
    Comp: Particles,
    description: "Floating glowing motes.",
    code: `<Particles count={90} />`,
  },
];

const SIDEBAR = [...GROUPS, { group: "Backgrounds", items: BACKGROUNDS }];

/* ---------- Page ---------- */

const Components = () => {
  const [active, setActive] = useState(CATALOG[0].id);
  const [bgColors, setBgColors] = useState(DEFAULT_BG_COLORS);
  const setColor = (i, val) =>
    setBgColors((prev) => {
      const next = [...prev];
      next[i] = val;
      return next;
    });
  const location = useLocation();

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-12% 0px -78% 0px", threshold: 0 },
    );
    CATALOG.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) obs.observe(el);
    });
    BACKGROUNDS.forEach((b) => {
      const el = document.getElementById(b.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Scroll to a section when arriving via a hash link (e.g. /components#button).
  useEffect(() => {
    if (!location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    if (el) {
      const t = setTimeout(
        () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
        120,
      );
      return () => clearTimeout(t);
    }
  }, [location]);

  const go = (id) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div
      style={ACCENT}
      className="relative min-h-screen bg-[#070709]/92 backdrop-blur-2xl text-white"
    >
      <header className="sticky top-0 z-40 bg-[#070709]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Mark />
          <div className="flex items-center gap-6 font-mono text-sm">
            <Link
              to="/docs"
              className="text-white/55 hover:text-white transition-colors"
            >
              Docs
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-white/55 hover:text-white transition-colors"
            >
              <ArrowLeft className="size-4" /> Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-60 shrink-0 border-r border-white/10 py-10 pr-4 sticky top-[4.4rem] h-[calc(100vh-4.4rem)] overflow-y-auto">
          {SIDEBAR.map((g) => (
            <div key={g.group} className="mb-7">
              <p className="font-mono text-[0.7rem] uppercase tracking-widest text-white/30 mb-3 pl-3">
                {g.group}
              </p>
              <nav className="space-y-0.5">
                {g.items.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => go(c.id)}
                    className={cn(
                      "w-full text-left text-sm py-1.5 pl-3 border-l-2 transition-colors",
                      active === c.id
                        ? "border-[#5227FF] text-white font-medium"
                        : "border-transparent text-white/50 hover:text-white/80",
                    )}
                  >
                    {c.name}
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 px-6 md:px-12 py-12">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/35">
            components
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            Component gallery
          </h1>
          <p className="mt-4 text-lg text-white/55 max-w-2xl">
            Every component with a live preview and a copy-paste snippet —{" "}
            {CATALOG.length} in total.
          </p>

          {GROUPS.map((g) => (
            <div key={g.group} className="mt-20 first:mt-16">
              <div className="flex items-center gap-4 mb-10">
                <h2 className="font-mono text-sm uppercase tracking-widest text-white/40">
                  {g.group}
                </h2>
                <span className="flex-1 border-t border-white/10" />
              </div>

              <div className="space-y-16">
                {g.items.map((c) => (
                  <section key={c.id} id={c.id} className="scroll-mt-24">
                    <h3 className="text-2xl font-bold tracking-tight">
                      {c.name}
                    </h3>
                    <p className="text-white/55 mt-1 mb-5 max-w-2xl">
                      {c.description}
                    </p>
                    <Preview>{c.demo}</Preview>
                    <CodeBlock code={c.code} />
                  </section>
                ))}
              </div>
            </div>
          ))}

          {/* Backgrounds */}
          <div className="mt-20">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-mono text-sm uppercase tracking-widest text-white/40">
                Backgrounds
              </h2>
              <span className="flex-1 border-t border-white/10" />
            </div>
            <p className="text-white/55 mb-6 max-w-2xl">
              Drop-in full-screen layers your pages stand on — dependency-free
              and themeable. Tweak the palette and watch every preview update:
            </p>
            <div className="flex items-center gap-3 mb-12">
              <span className="font-mono text-xs text-white/40">colors</span>
              {bgColors.map((col, i) => (
                <input
                  key={i}
                  type="color"
                  value={col}
                  onChange={(e) => setColor(i, e.target.value)}
                  aria-label={`Color ${i + 1}`}
                  className="size-9 rounded-lg cursor-pointer bg-transparent border border-white/15 p-0.5"
                />
              ))}
              <button
                onClick={() => setBgColors(DEFAULT_BG_COLORS)}
                className="font-mono text-xs text-white/40 hover:text-white transition-colors ml-1"
              >
                reset
              </button>
            </div>

            <div className="space-y-16">
              {BACKGROUNDS.map((b) => (
                <section key={b.id} id={b.id} className="scroll-mt-24">
                  <h3 className="text-2xl font-bold tracking-tight">
                    {b.name}
                  </h3>
                  <p className="text-white/55 mt-1 mb-5 max-w-2xl">
                    {b.description}
                  </p>
                  <BgTile Comp={b.Comp} colors={bgColors} />
                  <CodeBlock code={b.code} />
                </section>
              ))}
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/10 font-mono text-xs text-white/30">
            morgu · MIT licensed · built by Mustapha Adegbite
          </div>
        </main>
      </div>
    </div>
  );
};

export default Components;
