// Home.jsx
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Code,
  ArrowRight,
  Mail,
  Lock,
  Copy,
  Check,
  User,
  Settings,
  LogOut,
  Sparkles,
  Palette,
  Zap,
} from "lucide-react";

import { cn } from "../utils/cn";
import { useToast } from "../context/ToastContext";

import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";
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
import Avatar, { AvatarGroup } from "../components/Avatar";

/* ---------- Layout helpers ---------- */

const Section = ({ title, subtitle, children, eyebrow }) => (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="my-28 max-w-6xl mx-auto"
  >
    {eyebrow && (
      <p className="text-center text-sm font-semibold tracking-widest uppercase text-[var(--primary)] mb-3">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">{title}</h2>
    {subtitle && (
      <p className="text-center text-[var(--muted)] mb-12 max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
    {children}
  </motion.section>
);

const DemoCard = ({ title, children, className = "" }) => (
  <div
    className={cn(
      "rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 p-6",
      className,
    )}
  >
    {title && (
      <h3 className="text-sm font-semibold mb-5 text-[var(--muted)] uppercase tracking-wide">
        {title}
      </h3>
    )}
    {children}
  </div>
);

/* ---------- Page ---------- */

const FRAMEWORKS = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Solid", value: "solid" },
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
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const t = setInterval(
      () => setProgress((p) => (p >= 100 ? 0 : p + 5)),
      900,
    );
    return () => clearInterval(t);
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText("npm install morgu");
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
          <span className="flex items-center gap-2">
            <Sparkles className="size-5 text-[var(--primary)]" /> Morgu
          </span>
        }
        links={[
          { label: "Components", href: "/components" },
          { label: "Docs", href: "/docs" },
        ]}
        linkComponent={Link}
      />

      <motion.div
        style={{ y: bgY }}
        className="fixed inset-0 bg-gradient-to-b from-[var(--surface)] to-[var(--bg)] opacity-40 z-[-1] pointer-events-none"
      />

      <div className="min-h-screen pt-24 pb-32 px-6 md:px-12">
        {/* ---------- Hero ---------- */}
        <section className="relative min-h-[88vh] flex items-center justify-center text-center">
          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-10 max-w-5xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <Badge variant="primary" dot>
                v0.1.0 · MIT Licensed
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-none"
            >
              Build faster with{" "}
              <span className="text-[var(--primary)]">Morgu</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-[var(--muted)] max-w-3xl mx-auto mb-10"
            >
              A premium React component library — animated, themeable,
              accessible, and fully typed. Built with Tailwind v4 and Framer
              Motion.
            </motion.p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" icon={ArrowRight} iconPosition="right">
                Get Started
              </Button>
              <Tooltip text={copied ? "Copied!" : "Copy to clipboard"}>
                <Button
                  variant="secondary"
                  size="lg"
                  icon={copied ? Check : Copy}
                  onClick={handleCopy}
                >
                  npm install morgu
                </Button>
              </Tooltip>
            </div>
          </motion.div>
        </section>

        {/* ---------- Features ---------- */}
        <Section
          eyebrow="Why Morgu"
          title="Everything you need, batteries included"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <Card title="Reusable Components" icon={Code}>
              29 composable, accessible components from buttons to data tables.
            </Card>
            <Card title="Dark / Light Theming" icon={Palette}>
              CSS-variable theming with a built-in toggle and persistent
              preference.
            </Card>
            <Card title="Smooth Animations" icon={Zap}>
              Framer Motion under the hood — springy, tasteful, and
              reduced-motion aware.
            </Card>
          </div>
        </Section>

        {/* ---------- Buttons ---------- */}
        <Section
          eyebrow="Actions"
          title="Buttons"
          subtitle="Six variants, three sizes, loading and icon states."
        >
          <div className="grid md:grid-cols-2 gap-6">
            <DemoCard title="Variants">
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
              </div>
            </DemoCard>
            <DemoCard title="Sizes & states">
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button loading>Saving</Button>
                <Button disabled>Disabled</Button>
              </div>
            </DemoCard>
          </div>
        </Section>

        {/* ---------- Form controls ---------- */}
        <Section
          eyebrow="Inputs"
          title="Form Components"
          subtitle="Inputs, selects, toggles and sliders — all keyboard accessible."
        >
          <div className="grid md:grid-cols-2 gap-6">
            <DemoCard title="Text fields">
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
            </DemoCard>
            <DemoCard title="Choices">
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
            </DemoCard>
          </div>
        </Section>

        {/* ---------- Feedback ---------- */}
        <Section eyebrow="Feedback" title="Status & Notifications">
          <div className="grid md:grid-cols-2 gap-6">
            <DemoCard title="Alerts">
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
                <Alert variant="danger" title="Error">
                  Something went wrong.
                </Alert>
              </div>
            </DemoCard>
            <div className="space-y-6">
              <DemoCard title="Toasts (useToast hook)">
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
              </DemoCard>
              <DemoCard title="Badges & Spinners">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <Badge variant="primary">New</Badge>
                  <Badge variant="success" dot>
                    Live
                  </Badge>
                  <Badge variant="danger">Error</Badge>
                  <Badge
                    variant="outline"
                    onRemove={() => toast.info("Removed")}
                  >
                    Removable
                  </Badge>
                </div>
                <div className="flex items-center gap-6">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                  <Spinner variant="dots" />
                </div>
              </DemoCard>
              <DemoCard title="Progress (live)">
                <ProgressBar value={progress} max={100} showLabel height={8} />
              </DemoCard>
            </div>
          </div>
        </Section>

        {/* ---------- Overlays ---------- */}
        <Section eyebrow="Overlays" title="Modals, Drawers & Menus">
          <div className="grid md:grid-cols-3 gap-6">
            <DemoCard title="Modal">
              <Button onClick={() => setModalOpen(true)}>Open modal</Button>
            </DemoCard>
            <DemoCard title="Drawer">
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
            </DemoCard>
            <DemoCard title="Dropdown">
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
            </DemoCard>
          </div>
        </Section>

        {/* ---------- Data display ---------- */}
        <Section eyebrow="Data" title="Tables, Avatars & Skeletons">
          <div className="space-y-6">
            <DemoCard title="Sortable table (click a row)">
              <Table
                columns={tableColumns}
                data={USERS}
                striped
                onRowClick={(row) => toast.info(`Selected ${row.name}`)}
              />
            </DemoCard>
            <div className="grid md:grid-cols-2 gap-6">
              <DemoCard title="Avatars">
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
              </DemoCard>
              <DemoCard title="Skeleton loading">
                <div className="flex gap-4">
                  <Skeleton variant="circle" height="56px" width="56px" />
                  <div className="flex-1 space-y-2 pt-1">
                    <Skeleton variant="text" lines={3} />
                  </div>
                </div>
              </DemoCard>
            </div>
          </div>
        </Section>

        {/* ---------- Navigation ---------- */}
        <Section eyebrow="Navigation" title="Tabs, Accordion & More">
          <div className="grid md:grid-cols-2 gap-6">
            <DemoCard title="Tabs (pill)">
              <Tabs
                variant="pill"
                tabs={[
                  {
                    label: "Overview",
                    content: (
                      <p className="text-[var(--muted)]">
                        Springy pill tabs with a shared layout animation.
                      </p>
                    ),
                  },
                  {
                    label: "Features",
                    content: (
                      <p className="text-[var(--muted)]">
                        The active indicator slides between tabs.
                      </p>
                    ),
                  },
                  {
                    label: "Pricing",
                    content: (
                      <p className="text-[var(--muted)]">
                        Keyboard arrows move between tabs too.
                      </p>
                    ),
                  },
                ]}
              />
            </DemoCard>
            <DemoCard title="Accordion">
              <Accordion title="Is it accessible?" icon={Check} defaultOpen>
                Yes — ARIA roles, keyboard support, and focus management
                throughout.
              </Accordion>
              <Accordion title="Is it themeable?" icon={Palette}>
                Fully — every color is a CSS variable you can override.
              </Accordion>
              <Accordion title="Is it typed?" icon={Code}>
                Ships with complete TypeScript declarations.
              </Accordion>
            </DemoCard>
          </div>

          <div className="mt-6 space-y-6">
            <DemoCard title="Pagination">
              <Pagination
                currentPage={page}
                totalPages={12}
                onPageChange={setPage}
                maxVisiblePages={7}
              />
            </DemoCard>
            <DemoCard title="Carousel (drag, autoplay, keyboard)">
              <Carousel
                height="280px"
                interval={4000}
                slides={[
                  <div className="h-full bg-gradient-to-br from-teal-900 to-blue-900 flex items-center justify-center text-white text-3xl font-bold">
                    Slide 1
                  </div>,
                  <div className="h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center text-white text-3xl font-bold">
                    Slide 2
                  </div>,
                  <div className="h-full bg-gradient-to-br from-emerald-900 to-yellow-900 flex items-center justify-center text-white text-3xl font-bold">
                    Slide 3
                  </div>,
                ]}
              />
            </DemoCard>
          </div>
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
