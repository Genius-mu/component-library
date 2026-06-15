// Home.jsx
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  Lock,
  Copy,
  Check,
  User,
  Settings,
  LogOut,
  Code2,
  Palette,
  Zap,
  ChevronDown,
} from "lucide-react";

import { cn } from "../utils/cn";
import { useToast } from "../context/ToastContext";

import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";
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
import Avatar, { AvatarGroup } from "../components/Avatar";

/* ---------- Glass primitives (the page's signature) ---------- */

const GlassCard = ({ children, className = "" }) => (
  <div
    className={cn(
      "relative rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-2xl",
      "shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] p-6",
      className,
    )}
  >
    {/* top light-edge */}
    <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    {children}
  </div>
);

const Eyebrow = ({ children }) => (
  <p className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#C8B6E2]">
    <span className="size-1.5 rounded-full bg-[#5227FF]" />
    {children}
  </p>
);

const Section = ({ eyebrow, title, lead, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="my-24 max-w-6xl mx-auto"
  >
    <div className="text-center mb-10">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {lead && <p className="mt-3 text-white/55 max-w-2xl mx-auto">{lead}</p>}
    </div>
    {children}
  </motion.section>
);

const Label = ({ children }) => (
  <p className="font-mono text-[0.7rem] uppercase tracking-widest text-white/40 mb-4">
    {children}
  </p>
);

/* ---------- Page ---------- */

const FRAMEWORKS = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
];

const USERS = [
  { id: 1, name: "Ada Lovelace", role: "Engineer", presence: "online" },
  { id: 2, name: "Alan Turing", role: "Researcher", presence: "away" },
  { id: 3, name: "Grace Hopper", role: "Admiral", presence: "busy" },
];

function HomePage() {
  const toast = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [drawer, setDrawer] = useState({ open: false, side: "right" });
  const [copied, setCopied] = useState(false);
  const [page, setPage] = useState(1);
  const [wifi, setWifi] = useState(true);
  const [agree, setAgree] = useState(false);
  const [plan, setPlan] = useState("pro");
  const [framework, setFramework] = useState("react");
  const [volume, setVolume] = useState(60);
  const [bio, setBio] = useState("");
  const [progress, setProgress] = useState(20);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, -60]);

  useEffect(() => {
    const t = setInterval(
      () => setProgress((p) => (p >= 100 ? 0 : p + 5)),
      900,
    );
    return () => clearInterval(t);
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText("npm i morgu");
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const tableColumns = [
    {
      key: "name",
      header: "Name",
      render: (v, row) => (
        <span className="flex items-center gap-2">
          <Avatar name={v} size="sm" status={row.presence} />
          {v}
        </span>
      ),
    },
    { key: "role", header: "Role" },
    {
      key: "presence",
      header: "Status",
      render: (v) => (
        <Badge
          variant={
            v === "online" ? "success" : v === "busy" ? "danger" : "warning"
          }
          dot
        >
          {v}
        </Badge>
      ),
    },
  ];

  return (
    <>
      <ProgressBar />
      <Navbar
        brand={
          <span className="font-mono tracking-tight text-white">morgu</span>
        }
        links={[
          { label: "Components", href: "/components" },
          { label: "Docs", href: "/docs" },
        ]}
        linkComponent={Link}
      />

      <div className="px-6 md:px-12">
        {/* ---------- Hero ---------- */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center">
          {/* legibility scrim so type holds over the moving ether */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-full bg-black/40 blur-3xl" />

          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative z-10 max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Eyebrow>react · tailwind v4 · framer motion</Eyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="mt-6 text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.9] bg-gradient-to-br from-white via-white to-[#C8B6E2] bg-clip-text text-transparent"
            >
              Morgu
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
            >
              A premium React component library — animated, themeable,
              accessible, and fully typed. Twenty-nine components that feel
              alive.
            </motion.p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/components">
                <Button size="lg" icon={ArrowRight} iconPosition="right">
                  Explore components
                </Button>
              </Link>
              <Tooltip text={copied ? "Copied" : "Copy to clipboard"}>
                <button
                  onClick={handleCopy}
                  className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl px-5 py-4 font-mono text-sm text-white/80 hover:bg-white/10 transition-colors"
                >
                  <span className="text-[#FF9FFC]">$</span> npm i morgu
                  {copied ? (
                    <Check className="size-4 text-[#FF9FFC]" />
                  ) : (
                    <Copy className="size-4 opacity-60 group-hover:opacity-100" />
                  )}
                </button>
              </Tooltip>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="absolute bottom-10 flex flex-col items-center gap-2 text-white/40"
          >
            <span className="font-mono text-[0.7rem] uppercase tracking-widest">
              Scroll
            </span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              <ChevronDown className="size-4" />
            </motion.span>
          </motion.div>
        </section>

        {/* ---------- Value props ---------- */}
        <Section eyebrow="why morgu" title="Built to feel premium">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Code2,
                title: "29 components",
                body: "From buttons to sortable tables — composable and accessible.",
              },
              {
                icon: Palette,
                title: "Themeable",
                body: "Every color is a CSS variable. Dark and light, your palette.",
              },
              {
                icon: Zap,
                title: "Animated",
                body: "Framer Motion springs, focus traps, reduced-motion aware.",
              },
            ].map((f) => (
              <GlassCard key={f.title}>
                <f.icon className="size-9 text-[#C8B6E2] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-1">
                  {f.title}
                </h3>
                <p className="text-white/55 text-sm">{f.body}</p>
              </GlassCard>
            ))}
          </div>
        </Section>

        {/* ---------- Buttons ---------- */}
        <Section
          eyebrow="actions"
          title="Buttons"
          lead="Six variants, three sizes, loading and icon states."
        >
          <GlassCard className="p-8">
            <Label>Variants</Label>
            <div className="flex flex-wrap gap-3 mb-8">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
            </div>
            <Label>Sizes &amp; states</Label>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button loading>Saving</Button>
              <Button icon={ArrowRight} iconPosition="right">
                Icon
              </Button>
              <Button disabled>Disabled</Button>
            </div>
          </GlassCard>
        </Section>

        {/* ---------- Form controls ---------- */}
        <Section
          eyebrow="inputs"
          title="Form controls"
          lead="Inputs, selects, toggles and sliders — all keyboard accessible."
        >
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-8">
              <Label>Text fields</Label>
              <div className="space-y-5">
                <Input
                  label="Email"
                  type="email"
                  leftIcon={Mail}
                  placeholder="you@example.com"
                  hint="We'll never share it."
                />
                <Input
                  label="Password"
                  type="password"
                  leftIcon={Lock}
                  placeholder="••••••••"
                  error="Password is too short"
                />
                <Textarea
                  label="Bio"
                  placeholder="Tell us about yourself"
                  maxLength={120}
                  showCount
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </GlassCard>
            <GlassCard className="p-8">
              <Label>Choices</Label>
              <div className="space-y-6">
                <Select
                  label="Framework"
                  options={FRAMEWORKS}
                  value={framework}
                  onChange={setFramework}
                />
                <div className="flex flex-col gap-3">
                  <Checkbox
                    checked={agree}
                    onChange={setAgree}
                    label="I agree to the terms"
                    description="You can opt out anytime."
                  />
                  <Switch
                    checked={wifi}
                    onChange={setWifi}
                    label="Enable Wi-Fi"
                  />
                </div>
                <RadioGroup
                  value={plan}
                  onChange={setPlan}
                  orientation="horizontal"
                >
                  <Radio value="free" label="Free" />
                  <Radio value="pro" label="Pro" />
                  <Radio value="team" label="Team" />
                </RadioGroup>
                <Slider
                  label="Volume"
                  value={volume}
                  onChange={setVolume}
                  formatValue={(v) => `${v}%`}
                />
              </div>
            </GlassCard>
          </div>
        </Section>

        {/* ---------- Overlays ---------- */}
        <Section eyebrow="overlays" title="Modals, drawers &amp; menus">
          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard>
              <Label>Modal</Label>
              <Button onClick={() => setModalOpen(true)}>Open modal</Button>
            </GlassCard>
            <GlassCard>
              <Label>Drawer</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setDrawer({ open: true, side: "right" })}
                >
                  Right
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setDrawer({ open: true, side: "left" })}
                >
                  Left
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setDrawer({ open: true, side: "bottom" })}
                >
                  Bottom
                </Button>
              </div>
            </GlassCard>
            <GlassCard>
              <Label>Dropdown</Label>
              <Dropdown
                trigger={
                  <span className="flex items-center gap-2">
                    <User className="size-4" /> Account
                  </span>
                }
                items={[
                  {
                    label: "Profile",
                    icon: User,
                    onClick: () => toast.info("Profile"),
                  },
                  {
                    label: "Settings",
                    icon: Settings,
                    onClick: () => toast.info("Settings"),
                  },
                  {
                    label: "Log out",
                    icon: LogOut,
                    danger: true,
                    onClick: () => toast.error("Logged out"),
                  },
                ]}
              />
            </GlassCard>
          </div>
        </Section>

        {/* ---------- Feedback ---------- */}
        <Section eyebrow="feedback" title="Status &amp; notifications">
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-8">
              <Label>Alerts</Label>
              <div className="space-y-3">
                <Alert variant="info" title="Heads up">
                  This is an informational message.
                </Alert>
                <Alert
                  variant="success"
                  dismissible
                  onDismiss={() => toast.info("Alert dismissed")}
                >
                  Operation completed successfully.
                </Alert>
                <Alert
                  variant="warning"
                  action={
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  }
                >
                  This action is irreversible.
                </Alert>
              </div>
            </GlassCard>
            <div className="space-y-6">
              <GlassCard>
                <Label>Toasts — useToast()</Label>
                <div className="flex flex-wrap gap-3">
                  <Button
                    size="sm"
                    onClick={() => toast.info("Just so you know")}
                  >
                    Info
                  </Button>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => toast.success("All done!")}
                  >
                    Success
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => toast.warning("Careful now")}
                  >
                    Warning
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => toast.error("It broke")}
                  >
                    Error
                  </Button>
                </div>
              </GlassCard>
              <GlassCard>
                <Label>Badges, spinners &amp; progress</Label>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="primary">New</Badge>
                  <Badge variant="success" dot>
                    Live
                  </Badge>
                  <Badge
                    variant="outline"
                    onRemove={() => toast.info("Removed")}
                  >
                    Removable
                  </Badge>
                  <Spinner size="sm" />
                  <Spinner variant="dots" />
                </div>
                <ProgressBar value={progress} max={100} showLabel height={8} />
              </GlassCard>
            </div>
          </div>
        </Section>

        {/* ---------- Data ---------- */}
        <Section eyebrow="data" title="Tables, avatars &amp; skeletons">
          <div className="space-y-6">
            <GlassCard className="p-8">
              <Label>Sortable table — click a row</Label>
              <Table
                columns={tableColumns}
                data={USERS}
                striped
                onRowClick={(row) => toast.info(`Selected ${row.name}`)}
              />
            </GlassCard>
            <div className="grid md:grid-cols-2 gap-6">
              <GlassCard className="p-8">
                <Label>Avatars</Label>
                <div className="flex items-center gap-6">
                  <Avatar name="Ada Lovelace" status="online" />
                  <Avatar name="Alan Turing" size="lg" ring />
                  <AvatarGroup max={3}>
                    <Avatar name="A B" />
                    <Avatar name="C D" />
                    <Avatar name="E F" />
                    <Avatar name="G H" />
                    <Avatar name="I J" />
                  </AvatarGroup>
                </div>
              </GlassCard>
              <GlassCard className="p-8">
                <Label>Skeleton loading</Label>
                <div className="flex gap-4">
                  <Skeleton variant="circle" height="56px" width="56px" />
                  <div className="flex-1 space-y-2 pt-1">
                    <Skeleton variant="text" lines={3} />
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </Section>

        {/* ---------- Navigation ---------- */}
        <Section eyebrow="navigation" title="Tabs, accordion &amp; more">
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-8">
              <Label>Tabs — pill</Label>
              <Tabs
                variant="pill"
                tabs={[
                  {
                    label: "Overview",
                    content: (
                      <p className="text-white/60">
                        Springy pill tabs with a shared layout animation.
                      </p>
                    ),
                  },
                  {
                    label: "Features",
                    content: (
                      <p className="text-white/60">
                        The active indicator slides between tabs.
                      </p>
                    ),
                  },
                  {
                    label: "Pricing",
                    content: (
                      <p className="text-white/60">
                        Arrow keys move between tabs too.
                      </p>
                    ),
                  },
                ]}
              />
            </GlassCard>
            <GlassCard className="p-8">
              <Label>Accordion</Label>
              <Accordion title="Is it accessible?" icon={Check} defaultOpen>
                ARIA roles, keyboard support, and focus management throughout.
              </Accordion>
              <Accordion title="Is it themeable?" icon={Palette}>
                Every color is a CSS variable you can override.
              </Accordion>
              <Accordion title="Is it typed?" icon={Code2}>
                Ships with complete TypeScript declarations.
              </Accordion>
            </GlassCard>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <GlassCard className="p-8">
              <Label>Pagination</Label>
              <Pagination
                currentPage={page}
                totalPages={12}
                onPageChange={setPage}
                maxVisiblePages={5}
              />
            </GlassCard>
            <GlassCard className="p-8">
              <Label>Carousel — drag, autoplay, keyboard</Label>
              <Carousel
                height="220px"
                interval={4000}
                slides={[
                  <div className="h-full bg-gradient-to-br from-[#5227FF] to-[#B497CF] flex items-center justify-center text-white text-3xl font-bold">
                    Slide 1
                  </div>,
                  <div className="h-full bg-gradient-to-br from-[#FF9FFC] to-[#5227FF] flex items-center justify-center text-white text-3xl font-bold">
                    Slide 2
                  </div>,
                  <div className="h-full bg-gradient-to-br from-[#B497CF] to-[#FF9FFC] flex items-center justify-center text-white text-3xl font-bold">
                    Slide 3
                  </div>,
                ]}
              />
            </GlassCard>
          </div>
        </Section>

        {/* ---------- Closing CTA ---------- */}
        <Section eyebrow="get started" title="Drop it into your next project">
          <GlassCard className="p-10 text-center">
            <p className="text-white/60 max-w-xl mx-auto mb-6">
              Install the package, import the stylesheet, and ship a polished UI
              today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleCopy}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl px-5 py-4 font-mono text-sm text-white/80 hover:bg-white/10 transition-colors"
              >
                <span className="text-[#FF9FFC]">$</span> npm i morgu
                {copied ? (
                  <Check className="size-4 text-[#FF9FFC]" />
                ) : (
                  <Copy className="size-4 opacity-60" />
                )}
              </button>
              <Link to="/docs">
                <Button size="lg" variant="outline">
                  Read the docs
                </Button>
              </Link>
            </div>
          </GlassCard>
          <p className="text-center text-white/30 font-mono text-xs mt-10">
            morgu · MIT licensed · built by Mustapha Adegbite
          </p>
        </Section>
      </div>

      {/* ---------- Mounted overlays ---------- */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Welcome to Morgu"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setModalOpen(false);
                toast.success("Nice!");
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="text-[var(--muted)]">
          This modal traps focus, locks body scroll, animates in and out, and
          closes on Escape or backdrop click.
        </p>
      </Modal>

      <Drawer
        isOpen={drawer.open}
        side={drawer.side}
        onClose={() => setDrawer((d) => ({ ...d, open: false }))}
        title="Drawer panel"
      >
        <p className="text-[var(--muted)]">
          Slides in from the {drawer.side}. Press Escape or click the backdrop
          to close.
        </p>
      </Drawer>
    </>
  );
}

export default HomePage;
