// Home.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Copy,
  Check,
  Boxes,
  Sparkles,
  Palette,
  ShieldCheck,
  Braces,
  Terminal,
  Mail,
  Lock,
  User,
  Settings,
  LogOut,
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

/* Scope the brand accent to the ether's violet — this also re-skins every
   library component on the page (a live demo of the theming system). */
const ACCENT = {
  "--primary": "#5227FF",
  "--primary-hover": "#6743ff",
  "--primary-active": "#3f1ae0",
};

/* ---------- Building blocks ---------- */

const Mark = () => (
  <span className="flex items-center gap-2.5">
    <span className="grid place-items-center size-8 rounded-lg bg-[#5227FF] font-mono font-bold text-white">
      M
    </span>
    <span className="font-mono font-semibold tracking-tight text-white">
      morgu
    </span>
  </span>
);

const Eyebrow = ({ children, center = false }) => (
  <p
    className={cn(
      "font-mono text-xs uppercase tracking-[0.3em] text-white/40",
      center && "text-center",
    )}
  >
    {children}
  </p>
);

const SectionHead = ({ eyebrow, title, lead }) => (
  <div className="text-center mb-14">
    {eyebrow && <Eyebrow center>{eyebrow}</Eyebrow>}
    <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">
      {title}
    </h2>
    {lead && <p className="mt-4 text-white/50 max-w-2xl mx-auto">{lead}</p>}
  </div>
);

const Section = ({ children, divide = true, className = "" }) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.55, ease: "easeOut" }}
    className={cn(
      "max-w-6xl mx-auto px-6 py-24",
      divide && "border-t border-white/[0.07]",
      className,
    )}
  >
    {children}
  </motion.section>
);

const Panel = ({ label, children, className = "" }) => (
  <div
    className={cn(
      "rounded-2xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl",
      className,
    )}
  >
    {label && (
      <p className="font-mono text-[0.7rem] uppercase tracking-widest text-white/40 mb-5">
        {label}
      </p>
    )}
    {children}
  </div>
);

const Tile = ({ icon: Icon, label }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="grid place-items-center size-16 rounded-2xl border border-white/12 bg-white/[0.04] text-white/80">
      <Icon className="size-6" />
    </div>
    <span className="font-mono text-xs text-white/50">{label}</span>
  </div>
);

const Dash = () => (
  <span className="flex-1 mx-2 border-t border-dashed border-white/15" />
);

const Step = ({ n, title, children }) => (
  <div className="text-center">
    <div className="mx-auto grid place-items-center size-11 rounded-full border border-white/15 font-mono text-sm text-white/70 mb-5">
      {n}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-sm text-white/50 leading-relaxed">{children}</p>
  </div>
);

const InstallPill = ({ copied, onCopy }) => (
  <button
    onClick={onCopy}
    className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 font-mono text-sm text-white/85 hover:bg-white/10 transition-colors"
  >
    <span className="text-emerald-400">$</span> npm i morgu
    {copied ? (
      <Check className="size-4 text-emerald-400" />
    ) : (
      <Copy className="size-4 opacity-50 group-hover:opacity-100" />
    )}
  </button>
);

/* ---------- Data ---------- */

const FRAMEWORKS = [
  { label: "React", value: "react" },
  { label: "Next.js", value: "next" },
  { label: "Remix", value: "remix" },
];

const USERS = [
  { id: 1, name: "Ada Lovelace", role: "Engineer", presence: "online" },
  { id: 2, name: "Alan Turing", role: "Researcher", presence: "away" },
  { id: 3, name: "Grace Hopper", role: "Admiral", presence: "busy" },
];

/* ---------- Page ---------- */

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
    <div style={ACCENT}>
      <ProgressBar />
      <Navbar
        brand={<Mark />}
        links={[
          { label: "Components", href: "/components" },
          { label: "Docs", href: "/docs" },
        ]}
        linkComponent={Link}
      />

      {/* ---------- Hero (asymmetric, ether shows through) ---------- */}
      <header className="relative max-w-6xl mx-auto px-6 pt-36 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Eyebrow>react · tailwind v4 · framer motion</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-6 text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight leading-[1.02] text-white"
          >
            The component layer
            <br />
            your app has been
            <br />
            <span className="text-[#B9A6F2]">missing</span>
          </motion.h1>
          <p className="mt-6 text-lg text-white/60 max-w-lg leading-relaxed">
            Describe your UI and ship it. Morgu gives you 29 animated,
            themeable, accessible React components — fully typed, drop-in ready.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/components">
              <Button size="lg" icon={ArrowRight} iconPosition="right">
                Explore components
              </Button>
            </Link>
            <Link to="/docs">
              <Button size="lg" variant="outline">
                Read the docs
              </Button>
            </Link>
          </div>

          {/* terminal */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-5 font-mono text-sm leading-relaxed">
            <p>
              <span className="text-emerald-400">$</span> npm i morgu
            </p>
            <p className="text-white/40">+ morgu@0.1.0 · 0 runtime deps</p>
            <p>
              <span className="text-emerald-400">$</span> import
              &quot;morgu/styles.css&quot;
            </p>
            <p className="text-white/70">✓ 29 components ready</p>
            <p className="text-white/70">✓ dark + light themes</p>
            <p className="text-[#B9A6F2]">morgu is wired up ✦</p>
          </div>
        </div>

        {/* node-graph of what you get */}
        <div className="hidden lg:block">
          <div className="space-y-10">
            <div className="flex items-center">
              <Tile icon={Boxes} label="Components" />
              <Dash />
              <Tile icon={Sparkles} label="Animated" />
              <Dash />
              <Tile icon={Palette} label="Themeable" />
            </div>
            <div className="flex items-center justify-center gap-16">
              <Tile icon={ShieldCheck} label="Accessible" />
              <Tile icon={Braces} label="Typed" />
              <Tile icon={Terminal} label="One import" />
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Structured body shell (calms the ether) ---------- */}
      <div className="relative bg-[#06060a]/85 backdrop-blur-2xl border-t border-white/[0.07]">
        {/* Agnostic strapline */}
        <Section divide={false} className="py-20 text-center">
          <Eyebrow center>language &amp; framework agnostic</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto">
            One cohesive system for every screen
          </h2>
        </Section>

        {/* Steps */}
        <Section>
          <SectionHead
            eyebrow="get started"
            title="Up and running in four steps"
          />
          <div className="grid md:grid-cols-4 gap-10">
            <Step n="01" title="Install">
              Add the package and its peers with one command.
            </Step>
            <Step n="02" title="Import styles">
              Pull in{" "}
              <span className="font-mono text-white/70">morgu/styles.css</span>{" "}
              once.
            </Step>
            <Step n="03" title="Add providers">
              Wrap your app in Theme and Toast providers.
            </Step>
            <Step n="04" title="Use components">
              Import and compose — every prop is typed.
            </Step>
          </div>
        </Section>

        {/* Buttons */}
        <Section>
          <SectionHead
            eyebrow="actions"
            title="Buttons"
            lead="Six variants, three sizes, loading and icon states."
          />
          <Panel label="Variants" className="mb-6">
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
            </div>
          </Panel>
          <Panel label="Sizes & states">
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
          </Panel>
        </Section>

        {/* Form */}
        <Section>
          <SectionHead
            eyebrow="inputs"
            title="Form controls"
            lead="Inputs, selects, toggles and sliders — all keyboard accessible."
          />
          <div className="grid md:grid-cols-2 gap-6">
            <Panel label="Text fields">
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
            </Panel>
            <Panel label="Choices">
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
            </Panel>
          </div>
        </Section>

        {/* Overlays */}
        <Section>
          <SectionHead eyebrow="overlays" title="Modals, drawers & menus" />
          <div className="grid md:grid-cols-3 gap-6">
            <Panel label="Modal">
              <Button onClick={() => setModalOpen(true)}>Open modal</Button>
            </Panel>
            <Panel label="Drawer">
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
            </Panel>
            <Panel label="Dropdown">
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
            </Panel>
          </div>
        </Section>

        {/* Feedback */}
        <Section>
          <SectionHead eyebrow="feedback" title="Status & notifications" />
          <div className="grid md:grid-cols-2 gap-6">
            <Panel label="Alerts">
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
            </Panel>
            <div className="space-y-6">
              <Panel label="Toasts — useToast()">
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
              </Panel>
              <Panel label="Badges, spinners & progress">
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
              </Panel>
            </div>
          </div>
        </Section>

        {/* Data */}
        <Section>
          <SectionHead eyebrow="data" title="Tables, avatars & skeletons" />
          <Panel label="Sortable table — click a row" className="mb-6">
            <Table
              columns={tableColumns}
              data={USERS}
              striped
              onRowClick={(row) => toast.info(`Selected ${row.name}`)}
            />
          </Panel>
          <div className="grid md:grid-cols-2 gap-6">
            <Panel label="Avatars">
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
            </Panel>
            <Panel label="Skeleton loading">
              <div className="flex gap-4">
                <Skeleton variant="circle" height="56px" width="56px" />
                <div className="flex-1 space-y-2 pt-1">
                  <Skeleton variant="text" lines={3} />
                </div>
              </div>
            </Panel>
          </div>
        </Section>

        {/* Navigation */}
        <Section>
          <SectionHead eyebrow="navigation" title="Tabs, accordion & more" />
          <div className="grid md:grid-cols-2 gap-6">
            <Panel label="Tabs — pill">
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
            </Panel>
            <Panel label="Accordion">
              <Accordion
                title="Is it accessible?"
                icon={ShieldCheck}
                defaultOpen
              >
                ARIA roles, keyboard support, and focus management throughout.
              </Accordion>
              <Accordion title="Is it themeable?" icon={Palette}>
                Every color is a CSS variable you can override.
              </Accordion>
              <Accordion title="Is it typed?" icon={Braces}>
                Ships with complete TypeScript declarations.
              </Accordion>
            </Panel>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <Panel label="Pagination">
              <Pagination
                currentPage={page}
                totalPages={12}
                onPageChange={setPage}
                maxVisiblePages={5}
              />
            </Panel>
            <Panel label="Carousel — drag, autoplay, keyboard">
              <Carousel
                height="200px"
                interval={4000}
                slides={[
                  <div className="h-full bg-gradient-to-br from-[#5227FF] to-[#B497CF] grid place-items-center text-white text-2xl font-bold">
                    Slide 1
                  </div>,
                  <div className="h-full bg-gradient-to-br from-[#FF9FFC] to-[#5227FF] grid place-items-center text-white text-2xl font-bold">
                    Slide 2
                  </div>,
                  <div className="h-full bg-gradient-to-br from-[#B497CF] to-[#FF9FFC] grid place-items-center text-white text-2xl font-bold">
                    Slide 3
                  </div>,
                ]}
              />
            </Panel>
          </div>
        </Section>

        {/* CTA band */}
        <Section>
          <Panel className="p-10 md:p-14 text-center border-white/12 bg-white/[0.04]">
            <Eyebrow center>ship faster</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-white">
              Drop Morgu into your next project
            </h2>
            <p className="mt-3 text-white/55 max-w-xl mx-auto">
              Install the package, import the stylesheet, and ship a polished UI
              today.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <InstallPill copied={copied} onCopy={handleCopy} />
              <Link to="/docs">
                <Button size="lg" variant="outline">
                  Read the docs
                </Button>
              </Link>
            </div>
          </Panel>
        </Section>

        {/* Footer */}
        <footer className="border-t border-white/[0.07]">
          <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Mark />
            <div className="flex items-center gap-6 font-mono text-sm text-white/50">
              <Link
                to="/components"
                className="hover:text-white transition-colors"
              >
                Components
              </Link>
              <Link to="/docs" className="hover:text-white transition-colors">
                Docs
              </Link>
              <span className="text-white/30">MIT</span>
            </div>
            <p className="font-mono text-xs text-white/30">
              built by Mustapha Adegbite
            </p>
          </div>
        </footer>
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
    </div>
  );
}

export default HomePage;
