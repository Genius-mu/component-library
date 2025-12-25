// components/Tabs.jsx
import { motion } from "framer-motion";
import { useState } from "react";

const Tabs = ({ tabs, defaultTab = 0, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Headers */}
      <div className="relative border-b border-[var(--border)]">
        <div className="flex space-x-8">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(index)}
              className={`pb-4 px-2 text-lg font-medium transition-colors ${
                activeTab === index
                  ? "text-[var(--primary)]"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Animated Underline */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute bottom-0 h-0.5 bg-[var(--primary)]"
          style={{
            left: `${(activeTab / tabs.length) * 33}%`,
            width: `${30 / tabs.length}%`,
          }}
        />
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="pt-8"
      >
        {tabs[activeTab].content}
      </motion.div>
    </div>
  );
};

export default Tabs;
