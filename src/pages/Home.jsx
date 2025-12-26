// HomePage.jsx
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Accordion from "../components/Accordion";
import Tooltip from "../components/Tooltip";
import Tabs from "../components/Tabs";
import Dropdown from "../components/Dropdown";
import Carousel from "../components/Carousel";
import Alert from "../components/Alert";
import Badge from "../components/Badge";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";
import Pagination from "../components/Pagination";
import Skeleton from "../components/Skeleton";
import Switch from "../components/Switch";
import {
  Code,
  ArrowRight,
  Mail,
  Info,
  Copy,
  Check,
  Settings,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    type: "info",
    message: "",
  });

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install component-library");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const showToast = (type, message) => {
    setToast({ visible: true, type, message });
    setTimeout(
      () => setToast({ visible: false, type: "info", message: "" }),
      4000
    );
  };

  // Sample carousel slides
  const carouselSlides = [
    <div className="h-full bg-gradient-to-br from-teal-900 to-blue-900 flex items-center justify-center text-white text-4xl font-bold">
      Slide 1 – Premium Feel
    </div>,
    <div className="h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center text-white text-4xl font-bold">
      Slide 2 – Smooth Animations
    </div>,
    <div className="h-full bg-gradient-to-br from-green-900 to-emerald-900 flex items-center justify-center text-white text-4xl font-bold">
      Slide 3 – Reusable Components
    </div>,
  ];

  return (
    <>
      <ProgressBar />
      <Navbar />

      <motion.div
        style={{ y: backgroundY }}
        className="fixed inset-0 bg-gradient-to-b from-[var(--surface)] to-[var(--bg)] opacity-40 z-[-1] pointer-events-none"
      />

      <div className="min-h-screen pt-24 pb-32 px-6 md:px-12">
        {/* Hero */}
        <section className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">
          <motion.div style={{ opacity }} className="relative z-10 max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-none"
            >
              Premium{" "}
              <span className="text-[var(--primary)]">Design System</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-xl md:text-2xl text-[var(--muted)] max-w-3xl mx-auto mb-10"
            >
              Reusable components, beautiful theming, and luxurious animations
              built with React & Tailwind v4.
            </motion.p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button>Get Started</Button>
              <Tooltip text={copied ? "Copied!" : "Copy to clipboard"}>
                <Button
                  variant="secondary"
                  className="flex items-center gap-2"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="size-5" />
                  ) : (
                    <Copy className="size-5" />
                  )}
                  npm install component-library
                </Button>
              </Tooltip>
            </div>
          </motion.div>
        </section>

        {/* Core Features */}
        <section className="my-32">
          <h2 className="text-4xl font-bold text-center mb-16">
            Core Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card title="Reusable Components" icon={Code} delay={0.1}>
              Fully customizable atoms, molecules, and organisms.
            </Card>
            <Card title="Dark/Light Theme" icon={ArrowRight} delay={0.2}>
              Seamless toggle with persistent preference.
            </Card>
            <Card title="Smooth Animations" icon={Info} delay={0.3}>
              Framer Motion + Lenis for premium scroll feel.
            </Card>
          </div>
        </section>

        {/* Toast Demo */}
        <section className="my-32 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Toast Notification
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button onClick={() => showToast("info", "This is an info toast!")}>
              Info Toast
            </Button>
            <Button
              onClick={() =>
                showToast("success", "Action completed successfully!")
              }
            >
              Success Toast
            </Button>
            <Button
              onClick={() =>
                showToast("warning", "Be careful — this is a warning!")
              }
            >
              Warning Toast
            </Button>
            <Button onClick={() => showToast("error", "Something went wrong!")}>
              Error Toast
            </Button>
          </div>
          {toast.visible && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() =>
                setToast({ visible: false, type: "info", message: "" })
              }
            />
          )}
        </section>

        {/* Pagination Demo */}
        <section className="my-32 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Pagination</h2>
          <Pagination
            currentPage={currentPage}
            totalPages={20}
            onPageChange={setCurrentPage}
            showFirstLast
            maxVisiblePages={7}
          />
        </section>

        {/* Skeleton Demo */}
        <section className="my-32 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Skeleton Loading
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Skeleton variant="rectangle" height="200px" />
              <Skeleton variant="text" lines={2} />
            </div>
            <div className="space-y-4">
              <Skeleton variant="circle" height="80px" width="80px" />
              <Skeleton variant="text" lines={3} />
            </div>
            <div className="space-y-4">
              <Skeleton variant="avatar" height="100px" width="100px" />
              <Skeleton variant="text" lines={1} width="80%" />
            </div>
          </div>
        </section>

        {/* Switch Demo */}
        <section className="my-32 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Switch Toggle
          </h2>
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-4">
              <Switch
                checked={switchChecked}
                onChange={setSwitchChecked}
                size="sm"
              />
              <span className="text-[var(--muted)]">Small</span>
            </div>
            <div className="flex items-center gap-4">
              <Switch
                checked={switchChecked}
                onChange={setSwitchChecked}
                size="md"
              />
              <span className="text-[var(--muted)]">Medium (default)</span>
            </div>
            <div className="flex items-center gap-4">
              <Switch
                checked={switchChecked}
                onChange={setSwitchChecked}
                size="lg"
                disabled
              />
              <span className="text-[var(--muted)]">Large (disabled)</span>
            </div>
          </div>
        </section>

        {/* New: Dropdown & Carousel Demo */}
        <section className="my-32 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Dropdown & Carousel
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Dropdown Demo */}
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-6">Dropdown Menu</h3>
              <Dropdown
                trigger={
                  <span className="flex items-center gap-2">
                    <User className="size-5" /> Account
                  </span>
                }
                items={[
                  {
                    label: "Profile",
                    onClick: () => console.log("Profile clicked"),
                  },
                  {
                    label: "Settings",
                    onClick: () => console.log("Settings clicked"),
                  },
                  {
                    label: "Logout",
                    danger: true,
                    onClick: () => console.log("Logout clicked"),
                  },
                ]}
              />
            </div>

            {/* Carousel Demo */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Carousel</h3>
              <Carousel
                slides={[
                  <div className="h-full bg-gradient-to-br from-teal-900 to-blue-900 flex items-center justify-center text-white text-4xl font-bold">
                    Slide 1
                  </div>,
                  <div className="h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center text-white text-4xl font-bold">
                    Slide 2
                  </div>,
                  <div className="h-full bg-gradient-to-br from-blue-900 to-yellow-900 flex items-center justify-center text-white text-4xl font-bold">
                    Slide 3
                  </div>,
                ]}
                autoPlay
                interval={4000}
                showArrows
                showDots
              />
            </div>
          </div>
        </section>

        {/* Existing Form Demo */}
        <section className="my-32 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Form Components
          </h2>
          <form className="space-y-8 bg-[var(--surface)] p-10 rounded-3xl border border-[var(--border)] shadow-2xl">
            <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="you@example.com"
            />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </section>

        {/* Existing Modal & Accordion Demo */}
        <section className="my-32 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Interactive Components
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-6">Modal</h3>
              <Button onClick={() => setModalOpen(true)}>
                Open Demo Modal
              </Button>
              <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Welcome to the Design System"
              >
                <p className="text-[var(--muted)] mb-6">
                  This modal is fully animated with Framer Motion and supports
                  keyboard escape.
                </p>
                <Button onClick={() => setModalOpen(false)}>Close</Button>
              </Modal>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Accordion</h3>
              <div className="space-y-4">
                <Accordion title="What is this design system?" defaultOpen>
                  A collection of reusable, accessible, and animated UI
                  components built for modern web apps.
                </Accordion>
                <Accordion title="Is it production-ready?">
                  Yes — fully customizable, theme-aware, and optimized for
                  performance.
                </Accordion>
                <Accordion title="How do I install it?">
                  Coming soon as an npm package!
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* New: Alert, Badge & Spinner Demo */}
        <section className="my-32 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Additional Components
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Alert Demo */}
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-6">Alert</h3>
              <div className="space-y-4 w-full">
                <Alert variant="info" title="Welcome">
                  This is an informational message.
                </Alert>

                <Alert
                  variant="success"
                  dismissible
                  onDismiss={() => console.log("Dismissed")}
                >
                  Operation completed successfully!
                </Alert>

                <Alert variant="warning">
                  Be careful — this action is irreversible.
                </Alert>

                <Alert variant="danger" title="Error">
                  Something went wrong. Please try again.
                </Alert>
              </div>
            </div>

            {/* Badge Demo */}
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-6">Badge</h3>
              <div className="space-y-4">
                <Badge variant="primary">New</Badge>
                <Badge variant="success" withIcon>
                  Success
                </Badge>
                <Badge variant="danger">Error</Badge>
                <Badge variant="outline" size="lg" rounded="lg">
                  Outline
                </Badge>
                <Badge variant="default" className="uppercase tracking-wide">
                  Beta
                </Badge>
              </div>
            </div>

            {/* Spinner Demo */}
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-6">Spinner</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-center">
                  <Spinner size="sm" />
                  <span className="ml-3 text-[var(--muted)]">Small</span>
                </div>
                <div className="flex items-center justify-center">
                  <Spinner size="md" />
                  <span className="ml-3 text-[var(--muted)]">Medium</span>
                </div>
                <div className="flex items-center justify-center">
                  <Spinner size="lg" />
                  <span className="ml-3 text-[var(--muted)]">Large</span>
                </div>
                <div className="flex items-center justify-center">
                  <Spinner size="xl" color="var(--primary)" />
                  <span className="ml-3 text-[var(--muted)]">Extra Large</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
