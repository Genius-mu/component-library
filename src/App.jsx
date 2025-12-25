// App.jsx
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "./components/Button";
import Card from "./components/Card";
import Input from "./components/Input";
import Modal from "./components/Modal";
import Accordion from "./components/Accordion";
import ThemeToggle from "./components/ThemeToggle";
import { Code, ArrowRight, Mail, Info } from "lucide-react";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // Parallax bg
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="min-h-[300vh] p-12">
      {" "}
      {/* Tall for scrolling */}
      <header className="sticky top-0 z-50 bg-[var(--surface)] backdrop-blur-md border-b border-[var(--border)] py-6 px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Design System</h1>
        <ThemeToggle />
      </header>
      <main className="max-w-6xl mx-auto mt-16">
        {/* Parallax Hero */}
        <motion.section
          style={{ opacity }}
          className="h-[80vh] flex flex-col justify-center items-center text-center"
        >
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl font-extrabold mb-4"
          >
            Premium UI Components
          </motion.h2>
          <p className="text-xl text-[var(--muted)] max-w-2xl">
            Reusable, themed, and animated for modern apps.
          </p>
        </motion.section>

        {/* Staggered Cards with Scroll Reveal */}
        <section className="grid md:grid-cols-3 gap-8 my-32">
          <Card title="Reusable Components" icon={Code} delay={0.1}>
            Built with React, Tailwind v4, Framer Motion.
          </Card>
          <Card title="Theme Toggle" icon={ArrowRight} delay={0.2}>
            Smooth dark/light switch with icons only.
          </Card>
          <Card title="Premium Feel" icon={Info} delay={0.3}>
            Subtle animations and modern teal accents.
          </Card>
        </section>

        {/* Form Demo */}
        <section className="my-32">
          <h2 className="text-3xl font-bold mb-8">Form Components</h2>
          <form className="max-w-md space-y-6">
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
            />
            <Button type="submit">Submit</Button>
          </form>
        </section>

        {/* Modal Demo */}
        <section className="my-32">
          <h2 className="text-3xl font-bold mb-8">Modal Example</h2>
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Modal Title"
          >
            This is a reusable modal with animations.
          </Modal>
        </section>

        {/* Accordion Demo */}
        <section className="my-32">
          <h2 className="text-3xl font-bold mb-8">Accordion</h2>
          <Accordion title="Question 1" defaultOpen>
            Answer with details.
          </Accordion>
          <Accordion title="Question 2">More info here.</Accordion>
        </section>
      </main>
    </div>
  );
}

export default App;
