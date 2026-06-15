// Components.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  Code,
  Info,
  User,
  Settings,
  LogOut,
  Mail,
  Copy,
  Check,
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

/* ---------- Shared UI ---------- */

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative bg-[var(--surface)] rounded-xl border border-[var(--border)] mt-6">
      <button
        onClick={copy}
        className="absolute top-3 right-3 text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
        aria-label="Copy code"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
      <pre className="text-sm overflow-x-auto p-6">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const Preview = ({ children, className = "" }) => (
  <div
    className={cn(
      "flex flex-wrap items-center gap-4 p-8 rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)]/40",
      className,
    )}
  >
    {children}
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
        <p className="text-[var(--muted)]">
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
        <p className="text-[var(--muted)]">Slides in from the {side}.</p>
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

/* ---------- Catalog data ---------- */

const CATALOG = [
  {
    id: "button",
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
    id: "card",
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
    id: "form",
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
    name: "Drawer",
    description: "Slide-in panel from any edge.",
    demo: <DrawerDemo />,
    code: `<Drawer isOpen={open} side="right" onClose={close} title="Menu">
  Panel content
</Drawer>`,
  },
  {
    id: "tooltip",
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
    id: "tabs",
    name: "Tabs",
    description: "Line and pill variants with a shared layout animation.",
    demo: (
      <div className="w-full">
        <Tabs
          variant="pill"
          tabs={[
            {
              label: "One",
              content: <p className="text-[var(--muted)]">First panel</p>,
            },
            {
              label: "Two",
              content: <p className="text-[var(--muted)]">Second panel</p>,
            },
            {
              label: "Three",
              content: <p className="text-[var(--muted)]">Third panel</p>,
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
    name: "Carousel",
    description: "Drag/swipe, autoplay, pause-on-hover and keyboard arrows.",
    demo: (
      <div className="w-full">
        <Carousel
          height="220px"
          slides={[
            <div className="h-full bg-gradient-to-br from-teal-900 to-blue-900 flex items-center justify-center text-white text-2xl font-bold">
              Slide 1
            </div>,
            <div className="h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center text-white text-2xl font-bold">
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
    id: "avatar",
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
    name: "Toast",
    description: "App-wide notifications via the useToast() hook.",
    demo: <ToastDemo />,
    code: `const toast = useToast();
toast.success("Saved!");
toast.error("Something failed");`,
  },
  {
    id: "pagination",
    name: "Pagination",
    description: "Page navigation with first/last and a visible-page window.",
    demo: <PaginationDemo />,
    code: `<Pagination currentPage={page} totalPages={10} onPageChange={setPage} />`,
  },
  {
    id: "progress",
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
    id: "breadcrumb",
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
    id: "theme-toggle",
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

/* ---------- Page ---------- */

const Components = () => {
  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="sticky top-0 z-40 bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Morgu Components</h1>
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
            {CATALOG.map((c) => (
              <button
                key={c.id}
                onClick={() => scrollTo(c.id)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[var(--surface-hover)] transition-colors text-[var(--muted)] hover:text-[var(--primary)] text-sm"
              >
                {c.name}
                <ChevronRight className="size-4 opacity-50" />
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 md:p-12 lg:p-16 min-w-0">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Components
          </h1>
          <p className="text-lg text-[var(--muted)] mb-16 max-w-2xl">
            Every component with a live preview and a copy-paste snippet.{" "}
            {CATALOG.length} sections below.
          </p>

          {CATALOG.map((c) => (
            <section key={c.id} id={c.id} className="mb-20 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-2">{c.name}</h2>
              <p className="text-[var(--muted)] mb-6 max-w-2xl">
                {c.description}
              </p>
              <Preview>{c.demo}</Preview>
              <CodeBlock code={c.code} />
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Components;
