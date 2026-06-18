// Home.jsx
import { useState } from "react";
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
} from "lucide-react";

import { cn } from "../utils/cn";
import { useToast } from "../context/ToastContext";

import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";
import Carousel from "../components/Carousel";

/* Scope the brand accent to the ether's violet — also re-skins the live
   component previews (a quiet demo of the theming system). */
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
      "font-mono text-[13px] sm:text-xs uppercase tracking-[0.3em] text-white/40",
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

const Stat = ({ value, label }) => (
  <div className="text-center">
    <div className="text-4xl md:text-5xl font-bold tracking-tight text-white">
      {value}
    </div>
    <div className="mt-1 font-mono text-xs uppercase tracking-widest text-white/40">
      {label}
    </div>
  </div>
);

// A featured component preview that links to its section on the gallery.
const FeatureCard = ({ id, name, desc, children }) => (
  <Link
    to={`/components#${id}`}
    className="group block rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-xl overflow-hidden transition-colors hover:border-[var(--primary)]/40"
  >
    <div className="grid place-items-center p-10 min-h-[200px] border-b border-white/[0.07]">
      {children}
    </div>
    <div className="flex items-center justify-between px-6 py-4">
      <span>
        <span className="block font-semibold text-white">{name}</span>
        <span className="block text-sm text-white/50">{desc}</span>
      </span>
      <ArrowRight className="size-5 text-white/40 transition-all group-hover:text-[var(--primary)] group-hover:translate-x-1" />
    </div>
  </Link>
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

/* ---------- Page ---------- */

function HomePage() {
  const toast = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText("npm i morgu");
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

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
            className="mt-6 text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight leading-[1.02] text-white"
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
        {/* Strapline + stats */}
        <Section divide={false} className="py-20 text-center">
          <Eyebrow center>language &amp; framework agnostic</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto">
            One cohesive system for every screen
          </h2>
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <Stat value="29" label="Components" />
            <Stat value="8" label="Backgrounds" />
            <Stat value="0" label="Runtime deps" />
          </div>
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

        {/* Featured previews (just two, each links into the gallery) */}
        <Section>
          <SectionHead
            eyebrow="a taste of the kit"
            title="Built to feel premium"
            lead="A couple of the 29 components, live. Tap either to see it in the full gallery."
          />
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard
              id="button"
              name="Button"
              desc="Soft halo, depth glow and a sheen sweep on hover."
            >
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button icon={ArrowRight} iconPosition="right">
                  Primary
                </Button>
                <Button variant="outline">Outline</Button>
              </div>
            </FeatureCard>

            <FeatureCard
              id="carousel"
              name="Carousel"
              desc="Drag, autoplay and keyboard — motion built in."
            >
              <div className="w-full">
                <Carousel
                  height="150px"
                  interval={3500}
                  slides={[
                    <div className="h-full bg-gradient-to-br from-[#5227FF] to-[#B497CF] grid place-items-center text-white text-xl font-bold">
                      Slide 1
                    </div>,
                    <div className="h-full bg-gradient-to-br from-[#FF9FFC] to-[#5227FF] grid place-items-center text-white text-xl font-bold">
                      Slide 2
                    </div>,
                    <div className="h-full bg-gradient-to-br from-[#B497CF] to-[#FF9FFC] grid place-items-center text-white text-xl font-bold">
                      Slide 3
                    </div>,
                  ]}
                />
              </div>
            </FeatureCard>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/components"
              className="inline-flex items-center gap-2 font-mono text-sm text-[#A78BFA] hover:text-white transition-colors"
            >
              See all 29 components <ArrowRight className="size-4" />
            </Link>
          </div>
        </Section>

        {/* CTA band */}
        <Section>
          <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-10 md:p-14 text-center backdrop-blur-xl">
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
          </div>
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
    </div>
  );
}

export default HomePage;
