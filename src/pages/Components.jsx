// pages/Components.jsx
import { Link } from "react-router-dom";
import { ChevronRight, ArrowLeft, Code, Info, User } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Accordion from "../components/Accordion";
import Tooltip from "../components/Tooltip";
import Tabs from "../components/Tabs";
import Dropdown from "../components/Dropdown";
import Carousel from "../components/Carousel";
import ThemeToggle from "../components/ThemeToggle";
import { useState } from "react";

const Components = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const sections = [
    { title: "Button", id: "button" },
    { title: "Card", id: "card" },
    { title: "Input", id: "input" },
    { title: "Modal", id: "modal" },
    { title: "Accordion", id: "accordion" },
    { title: "Tooltip", id: "tooltip" },
    { title: "Tabs", id: "tabs" },
    { title: "Dropdown", id: "dropdown" },
    { title: "Carousel", id: "carousel" },
    { title: "Theme Toggle", id: "theme-toggle" },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Optional: Add a toast notification here later
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Components</h1>
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
        {/* Sidebar */}
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
            Components
          </h1>
          <p className="text-xl text-[var(--muted)] mb-16 max-w-3xl">
            Explore all reusable components in the design system. Each includes
            live previews, usage examples, and code snippets.
          </p>

          {/* Button */}
          <section id="button" className="mb-24">
            <h2 className="text-4xl font-bold mb-6">Button</h2>
            <p className="text-lg text-[var(--muted)] mb-6">
              Versatile button with variants, icons, hover animations, and
              loading states.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button disabled>Disabled</Button>
              <Button className="flex items-center gap-2">
                <Code size={18} /> With Icon
              </Button>
            </div>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] overflow-x-auto">
              <pre className="text-sm">
                <code>{`<Button variant="primary">Click me</Button>
<Button variant="secondary" className="flex items-center gap-2">
  <Code size={18} /> Icon Button
</Button>`}</code>
              </pre>
            </div>
          </section>

          {/* Card */}
          <section id="card" className="mb-24">
            <h2 className="text-4xl font-bold mb-6">Card</h2>
            <p className="text-lg text-[var(--muted)] mb-6">
              Elevated card with hover lift, icon, and reveal animation.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card title="Example Card" icon={Code}>
                This is a reusable card component with smooth hover effects.
              </Card>
              <Card title="Another Card" icon={Info}>
                Supports icons and custom content.
              </Card>
            </div>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] overflow-x-auto">
              <pre className="text-sm">
                <code>{`<Card title="My Card" icon={Code}>
  Card content here
</Card>`}</code>
              </pre>
            </div>
          </section>

          {/* Input */}
          <section id="input" className="mb-24">
            <h2 className="text-4xl font-bold mb-6">Input</h2>
            <p className="text-lg text-[var(--muted)] mb-6">
              Form input with label, error state, and focus animation.
            </p>
            <div className="space-y-6 max-w-md mb-8">
              <Input
                label="Email"
                id="email-demo"
                placeholder="you@example.com"
              />
              <Input
                label="Password"
                id="password-demo"
                type="password"
                placeholder="••••••••"
                error="Invalid password"
              />
            </div>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] overflow-x-auto">
              <pre className="text-sm">
                <code>{`<Input label="Email" id="email" placeholder="you@example.com" />
<Input label="Password" type="password" error="Invalid password" />`}</code>
              </pre>
            </div>
          </section>

          {/* Modal */}
          <section id="modal" className="mb-24">
            <h2 className="text-4xl font-bold mb-6">Modal</h2>
            <p className="text-lg text-[var(--muted)] mb-6">
              Animated modal with backdrop, escape key support, and scale-in
              animation.
            </p>
            <Button onClick={() => setModalOpen(true)}>Open Modal Demo</Button>
            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Example Modal"
            >
              <p className="text-[var(--muted)] mb-6">
                This is a reusable modal with smooth animations.
              </p>
              <Button onClick={() => setModalOpen(false)}>Close</Button>
            </Modal>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] overflow-x-auto mt-8">
              <pre className="text-sm">
                <code>{`<Modal isOpen={isOpen} onClose={handleClose} title="Title">
  Modal content
</Modal>`}</code>
              </pre>
            </div>
          </section>

          {/* Accordion */}
          <section id="accordion" className="mb-24">
            <h2 className="text-4xl font-bold mb-6">Accordion</h2>
            <p className="text-lg text-[var(--muted)] mb-6">
              Collapsible section with smooth height animation.
            </p>
            <div className="space-y-4 max-w-2xl mb-8">
              <Accordion title="What is this?" defaultOpen>
                A premium design system.
              </Accordion>
              <Accordion title="Is it customizable?">
                Yes — fully theme-aware.
              </Accordion>
            </div>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] overflow-x-auto">
              <pre className="text-sm">
                <code>{`<Accordion title="Question" defaultOpen>
  Answer content
</Accordion>`}</code>
              </pre>
            </div>
          </section>

          {/* Tooltip */}
          <section id="tooltip" className="mb-24">
            <h2 className="text-4xl font-bold mb-6">Tooltip</h2>
            <p className="text-lg text-[var(--muted)] mb-6">
              Hover tooltip with pop-in animation.
            </p>
            <div className="flex gap-8 mb-8">
              <Tooltip text="This is a tooltip!">
                <Button>Hover me</Button>
              </Tooltip>
              <Tooltip text="Copy" position="bottom">
                <Button variant="secondary">Bottom</Button>
              </Tooltip>
            </div>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] overflow-x-auto">
              <pre className="text-sm">
                <code>{`<Tooltip text="Tooltip text" position="top">
  <Button>Hover me</Button>
</Tooltip>`}</code>
              </pre>
            </div>
          </section>

          {/* Tabs */}
          <section id="tabs" className="mb-24">
            <h2 className="text-4xl font-bold mb-6">Tabs</h2>
            <p className="text-lg text-[var(--muted)] mb-6">
              Animated tabs with sliding underline.
            </p>
            <Tabs
              tabs={[
                {
                  label: "Tab 1",
                  content: (
                    <p className="text-[var(--muted)]">Content for Tab 1</p>
                  ),
                },
                {
                  label: "Tab 2",
                  content: (
                    <p className="text-[var(--muted)]">Content for Tab 2</p>
                  ),
                },
                {
                  label: "Tab 3",
                  content: (
                    <p className="text-[var(--muted)]">Content for Tab 3</p>
                  ),
                },
              ]}
            />
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] overflow-x-auto mt-8">
              <pre className="text-sm">
                <code>{`<Tabs tabs={[
  { label: "Tab 1", content: <p>Content</p> },
  { label: "Tab 2", content: <p>Content</p> },
]} />`}</code>
              </pre>
            </div>
          </section>

          {/* Dropdown */}
          <section id="dropdown" className="mb-24">
            <h2 className="text-4xl font-bold mb-6">Dropdown</h2>
            <p className="text-lg text-[var(--muted)] mb-6">
              Animated dropdown menu with keyboard navigation.
            </p>
            <Dropdown
              trigger={
                <span className="flex items-center gap-2">
                  <User size={18} /> Menu
                </span>
              }
              items={[
                { label: "Profile" },
                { label: "Settings" },
                { label: "Logout", danger: true },
              ]}
            />
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] overflow-x-auto mt-8">
              <pre className="text-sm">
                <code>{`<Dropdown trigger="Menu" items={[
  { label: "Profile" },
  { label: "Logout", danger: true }
]} />`}</code>
              </pre>
            </div>
          </section>

          {/* Carousel */}
          <section id="carousel" className="mb-24">
            <h2 className="text-4xl font-bold mb-6">Carousel</h2>
            <p className="text-lg text-[var(--muted)] mb-6">
              Touch-enabled carousel with auto-play and navigation.
            </p>
            <Carousel
              slides={[
                <div className="h-64 bg-gradient-to-br from-teal-900 to-blue-900 flex items-center justify-center text-white text-3xl">
                  Slide 1
                </div>,
                <div className="h-64 bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center text-white text-3xl">
                  Slide 2
                </div>,
                <div className="h-64 bg-gradient-to-br from-green-900 to-emerald-900 flex items-center justify-center text-white text-3xl">
                  Slide 3
                </div>,
              ]}
            />
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] overflow-x-auto mt-8">
              <pre className="text-sm">
                <code>{`<Carousel slides={[
  <div>Slide 1</div>,
  <div>Slide 2</div>,
]} />`}</code>
              </pre>
            </div>
          </section>

          {/* Theme Toggle */}
          <section id="theme-toggle" className="mb-24">
            <h2 className="text-4xl font-bold mb-6">Theme Toggle</h2>
            <p className="text-lg text-[var(--muted)] mb-6">
              Icon-only toggle between light and dark mode.
            </p>
            <div className="flex gap-8 mb-8">
              <ThemeToggle />
              <p className="text-[var(--muted)] self-center">
                Click to toggle theme
              </p>
            </div>
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] overflow-x-auto">
              <pre className="text-sm">
                <code>{`<ThemeToggle />`}</code>
              </pre>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Components;
