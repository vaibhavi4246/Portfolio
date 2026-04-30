"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitFork, Link, Mail, Code2, AtSign, Download, ExternalLink } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

const SOCIALS = [
  {
    icon: <Mail size={18} />,
    label: "EMAIL",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: "#f72585",
  },
  {
    icon: <Link size={18} />,
    label: "LINKEDIN",
    value: "vaibhavi-jain-8a674429b",
    href: personalInfo.socials.linkedin,
    color: "#0077b5",
  },
  {
    icon: <GitFork size={18} />,
    label: "GITHUB",
    value: "vaibhavi4246",
    href: personalInfo.socials.github,
    color: "#6e7681",
  },
  {
    icon: <Code2 size={18} />,
    label: "LEETCODE",
    value: "vaibhavijain",
    href: personalInfo.socials.leetcode,
    color: "#f59e0b",
  },
  {
    icon: <AtSign size={18} />,
    label: "INSTAGRAM",
    value: "@vaibhavi4246",
    href: personalInfo.socials.instagram,
    color: "#e1306c",
  },
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  return (
    <div className="h-full overflow-auto select-text">
      <motion.div variants={container} initial="hidden" animate="show" className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">

        {/* Comment header */}
        <motion.p variants={item} className="font-mono text-vscode-comment text-sm mb-6" style={{ fontStyle: "italic" }}>
          {"/* contact.css — let's build something */"}
        </motion.p>

        {/* Heading */}
        <motion.h2
          variants={item}
          className="font-heading font-extrabold text-vscode-text leading-none mb-3"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          Contact
        </motion.h2>

        <motion.p variants={item} className="font-mono text-vscode-comment text-sm mb-10">
          {"// open to internships, collabs & good conversations"}
        </motion.p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

          {/* LEFT — Find Me On */}
          <motion.div variants={item}>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-vscode-type mb-5">
              Find Me On
            </p>

            <div className="space-y-2">
              {SOCIALS.map(({ icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-4 py-3.5 border border-vscode-border bg-vscode-sidebar rounded-sm hover:border-vscode-accent/50 transition-colors group"
                >
                  <span style={{ color }} className="flex-shrink-0">
                    {icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-mono text-xs font-semibold uppercase tracking-widest mb-0.5"
                      style={{ color }}
                    >
                      {label}
                    </p>
                    <p className="font-mono text-vscode-muted text-xs truncate">{value}</p>
                  </div>
                  <ExternalLink
                    size={13}
                    className="text-vscode-muted/40 group-hover:text-vscode-accent transition-colors flex-shrink-0"
                  />
                </a>
              ))}

              {/* Resume download */}
              <a
                href="/resume.pdf"
                download="Vaibhavi_Jain_Resume.pdf"
                className="flex items-center gap-4 px-4 py-3.5 border border-vscode-border bg-vscode-sidebar rounded-sm hover:border-vscode-accent/50 transition-colors group mt-4"
              >
                <span className="text-vscode-function flex-shrink-0">
                  <Download size={18} />
                </span>
                <div className="flex-1">
                  <p className="font-mono text-xs font-semibold uppercase tracking-widest text-vscode-function mb-0.5">
                    RESUME
                  </p>
                  <p className="font-mono text-vscode-muted text-xs">Download PDF</p>
                </div>
                <ExternalLink
                  size={13}
                  className="text-vscode-muted/40 group-hover:text-vscode-accent transition-colors flex-shrink-0"
                />
              </a>
            </div>
          </motion.div>

          {/* RIGHT — Send a Message */}
          <motion.div variants={item}>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-vscode-type mb-5">
              Send a Message
            </p>

            {status === "sent" ? (
              <div className="border border-vscode-border bg-vscode-sidebar rounded-sm p-8 text-center">
                <p className="font-mono text-vscode-comment text-sm">
                  ✓ Message received! I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-mono text-vscode-muted text-xs mb-1.5">
                    <span className="text-vscode-comment">{"// "}</span>
                    YOUR_NAME{" "}
                    <span className="text-vscode-error">*</span>
                  </label>
                  <input
                    required
                    name="name"
                    placeholder="string"
                    className="w-full bg-vscode-input border border-vscode-border rounded-sm px-4 py-2.5 text-sm font-mono text-vscode-text placeholder:text-vscode-muted/40 focus:outline-none focus:border-vscode-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-vscode-muted text-xs mb-1.5">
                    <span className="text-vscode-comment">{"// "}</span>
                    YOUR_EMAIL{" "}
                    <span className="text-vscode-error">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="string"
                    className="w-full bg-vscode-input border border-vscode-border rounded-sm px-4 py-2.5 text-sm font-mono text-vscode-text placeholder:text-vscode-muted/40 focus:outline-none focus:border-vscode-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-vscode-muted text-xs mb-1.5">
                    <span className="text-vscode-comment">{"// "}</span>
                    SUBJECT
                  </label>
                  <input
                    name="subject"
                    placeholder="string"
                    className="w-full bg-vscode-input border border-vscode-border rounded-sm px-4 py-2.5 text-sm font-mono text-vscode-text placeholder:text-vscode-muted/40 focus:outline-none focus:border-vscode-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-vscode-muted text-xs mb-1.5">
                    <span className="text-vscode-comment">{"// "}</span>
                    MESSAGE{" "}
                    <span className="text-vscode-error">*</span>
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="string"
                    className="w-full bg-vscode-input border border-vscode-border rounded-sm px-4 py-2.5 text-sm font-mono text-vscode-text placeholder:text-vscode-muted/40 focus:outline-none focus:border-vscode-accent transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center gap-2 px-6 py-2.5 text-white text-sm font-mono rounded-sm transition-colors disabled:opacity-60"
                  style={{ backgroundColor: "#0e639c" }}
                >
                  {status === "sending" ? "Sending..." : "send()"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
