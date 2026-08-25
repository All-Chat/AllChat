/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useEffect, useMemo, useState } from "react";

type Item = {
  id: string;
  label: string;
};

type Section = {
  id: string;
  title: string;
  items: Item[];
};

const sections: Section[] = [
  {
    id: "getting-started",
    title: "GETTING STARTED",
    items: [
      { id: "overview", label: "Overview" },
      { id: "dashboard", label: "Dashboard" },
      { id: "getting-started-guide", label: "Getting Started" },
    ],
  },
  {
    id: "messaging",
    title: "MESSAGING",
    items: [
      { id: "live-chat", label: "Live Chat" },
      { id: "create-template", label: "Create Template" },
      { id: "view-templates", label: "View Templates" },
      { id: "send-test", label: "Send Test Message" },
      { id: "test-report", label: "Test Message Report" },
    ],
  },
  {
    id: "campaigns",
    title: "CAMPAIGNS",
    items: [
      { id: "create-campaign", label: "Create Campaign" },
      { id: "campaign-list", label: "Campaigns" },
      { id: "campaign-report", label: "Campaign Reports" },
      { id: "sheet-campaign", label: "Sheet Campaigns" },
    ],
  },
  {
    id: "automation",
    title: "AUTOMATION",
    items: [
      { id: "workflows", label: "Workflows" },
      { id: "create-workflow", label: "Create Workflow" },
      { id: "tags", label: "Tags" },
      { id: "optout", label: "Opt-out Numbers" },
      { id: "forms", label: "Forms" },
    ],
  },
  {
    id: "reports",
    title: "REPORTS & SHEETS",
    items: [
      { id: "form-responses", label: "Form Responses" },
      { id: "google-sheets", label: "Google Sheets" },
      { id: "sheet-reports", label: "Sheet Reports" },
      { id: "transactions", label: "Transactions" },
    ],
  },
  {
    id: "settings",
    title: "SETTINGS",
    items: [
      { id: "whatsapp-numbers", label: "WhatsApp Numbers" },
      { id: "billing", label: "Billing & Balance" },
      { id: "recharge", label: "Recharge History" },
      { id: "integrations", label: "Integrations" },
    ],
  },
];

/* -------------------------------------------------------
   ICONS
------------------------------------------------------- */

function Icon({
  name,
  size = 16,
}: {
  name: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );

    case "chevron":
      return (
        <svg {...common}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      );

    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case "message":
      return (
        <svg {...common}>
          <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 9.7 9.7 0 0 1-4-.8L3 21l1.8-4.3A8.1 8.1 0 0 1 3 11.5 8.38 8.38 0 0 1 12 3a8.38 8.38 0 0 1 9 8.5Z" />
        </svg>
      );

    case "template":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7h8M8 11h8M8 15h5" />
        </svg>
      );

    case "campaign":
      return (
        <svg {...common}>
          <path d="m3 11 18-7-5 16-4-7-9-2Z" />
          <path d="m12 13 5-5" />
        </svg>
      );

    case "workflow":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <path d="M10 6.5h3a4 4 0 0 1 4 4v3.5" />
        </svg>
      );

    case "sheet":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7v10M12 7v10M16 7v10M8 11h8M8 15h8" />
        </svg>
      );

    case "form":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7h8M8 11h5M8 15h8M8 18h5" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

/* -------------------------------------------------------
   STEP
------------------------------------------------------- */

function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700">
        {number}
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="text-[14px] font-semibold text-slate-900">
          {title}
        </h4>

        <div className="mt-1.5 text-[14px] leading-7 text-slate-600">
          {children}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   INFO BOX
------------------------------------------------------- */

function InfoBox({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "tip" | "warning";
  title: string;
  children: React.ReactNode;
}) {
  const styles = {
    info: "border-slate-200 bg-slate-50",
    tip: "border-emerald-200 bg-emerald-50/50",
    warning: "border-amber-200 bg-amber-50/50",
  };

  const iconStyles = {
    info: "bg-slate-200 text-slate-600",
    tip: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
  };

  return (
    <div
      className={`my-7 rounded-xl border px-4 py-4 ${styles[type]}`}
    >
      <div className="flex gap-3">
        <div
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${iconStyles[type]}`}
        >
          <Icon name="check" size={13} />
        </div>

        <div>
          <p className="text-[13px] font-semibold text-slate-800">
            {title}
          </p>

          <div className="mt-1 text-[13px] leading-6 text-slate-600">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   WORKFLOW
------------------------------------------------------- */

function MiniWorkflow() {
  return (
    <div className="my-8 border-y border-slate-200 py-7">
      <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        Example workflow
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1 rounded-lg border border-slate-200 bg-white p-4">
          <p className="mb-1 text-[11px] font-semibold text-amber-600">
            TRIGGER
          </p>
          <p className="text-sm font-medium text-slate-800">
            Customer sends “Hi”
          </p>
        </div>

        <div className="hidden text-emerald-400 sm:block">
          <Icon name="arrow" size={18} />
        </div>

        <div className="flex-1 rounded-lg border border-slate-200 bg-white p-4">
          <p className="mb-1 text-[11px] font-semibold text-emerald-600">
            MESSAGE
          </p>
          <p className="text-sm font-medium text-slate-800">
            Send welcome message
          </p>
        </div>

        <div className="hidden text-emerald-400 sm:block">
          <Icon name="arrow" size={18} />
        </div>

        <div className="flex-1 rounded-lg border border-slate-200 bg-white p-4">
          <p className="mb-1 text-[11px] font-semibold text-violet-600">
            ACTION
          </p>
          <p className="text-sm font-medium text-slate-800">
            Apply customer tag
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   PAGE
------------------------------------------------------- */

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [search, setSearch] = useState("");

  /* -----------------------------------------
     SEARCH
  ----------------------------------------- */

  const filteredSections = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return sections;

    return sections
      .map((section) => {
        const sectionMatches = section.title
          .toLowerCase()
          .includes(query);

        const matchingItems = section.items.filter((item) =>
          item.label.toLowerCase().includes(query)
        );

        if (sectionMatches) {
          return section;
        }

        if (matchingItems.length > 0) {
          return {
            ...section,
            items: matchingItems,
          };
        }

        return null;
      })
      .filter(Boolean) as Section[];
  }, [search]);

  /* -----------------------------------------
     SCROLL SPY
  ----------------------------------------- */

  useEffect(() => {
    const ids = sections.flatMap((section) =>
      section.items.map((item) => item.id)
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-110px 0px -65% 0px",
        threshold: [0.05, 0.2, 0.5, 0.8],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  /* -----------------------------------------
     SCROLL TO SECTION
  ----------------------------------------- */

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* 
        IMPORTANT:
        TOP SPACE IS RESERVED FOR YOUR EXISTING NAVBAR.
        Change pt-24 if your navbar has a different height.
      */}

      <div className="mx-auto flex max-w-[1500px] pt-24">

        {/* ==================================================
            LEFT SIDEBAR
        ================================================== */}

        <aside className="hidden w-[270px] shrink-0 border-r border-slate-200 lg:block">
          <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto px-4 py-7">

            {/* Sidebar heading */}

            <div className="px-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">
                Documentation
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Learn how to use AllChat
              </p>
            </div>

            {/* Search */}

            <div className="relative mt-6 px-2">
              <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                <Icon name="search" size={15} />
              </div>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search documentation"
                className="
                  h-10 w-full rounded-lg
                  border border-slate-200
                  bg-slate-50
                  pl-9 pr-8
                  text-[12px] text-slate-700
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-emerald-300
                  focus:bg-white
                  focus:ring-2
                  focus:ring-emerald-100
                "
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            {/* Search result count */}

            {search && (
              <div className="px-3 pt-3 text-[11px] text-slate-400">
                {filteredSections.reduce(
                  (total, section) => total + section.items.length,
                  0
                )}{" "}
                result
                {filteredSections.reduce(
                  (total, section) => total + section.items.length,
                  0
                ) !== 1
                  ? "s"
                  : ""}
              </div>
            )}

            {/* Navigation */}

            <nav className="mt-6 space-y-7">
              {filteredSections.map((section) => (
                <div key={section.id}>

                  <p className="mb-2 px-3 text-[10px] font-bold tracking-[0.16em] text-slate-400">
                    {section.title}
                  </p>

                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const active =
                        activeSection === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollTo(item.id)}
                          className={`
                            group relative flex w-full
                            items-center justify-between
                            rounded-lg px-3 py-2
                            text-left text-[13px]
                            transition-all duration-200

                            ${
                              active
                                ? "bg-emerald-50 font-medium text-emerald-700"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }
                          `}
                        >
                          {/* active indicator */}

                          {active && (
                            <span className="absolute -left-[1px] top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-emerald-500" />
                          )}

                          <span>{item.label}</span>

                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* No search results */}

            {search && filteredSections.length === 0 && (
              <div className="px-3 py-8 text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Icon name="search" size={15} />
                </div>

                <p className="mt-3 text-xs font-medium text-slate-700">
                  No results found
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-400">
                  Try searching for campaigns, templates,
                  workflows or reports.
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* ==================================================
            MAIN CONTENT
        ================================================== */}

        <main className="min-w-0 flex-1">

          <div className="mx-auto max-w-[850px] px-6 py-12 lg:px-12">

            {/* Breadcrumb */}

            <div className="mb-8 flex items-center gap-2 text-xs text-slate-400">
              <span>Documentation</span>
              <Icon name="chevron" size={13} />
              <span className="text-slate-600">
                {sections
                  .flatMap((section) => section.items)
                  .find((item) => item.id === activeSection)
                  ?.label || "Overview"}
              </span>
            </div>

            {/* ==================================================
                OVERVIEW
            ================================================== */}

            <section
              id="overview"
              className="scroll-mt-32"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                AllChat Documentation
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                AllChat Documentation
              </h1>

              <p className="mt-5 max-w-2xl text-[17px] leading-8 text-slate-500">
                Everything you need to manage WhatsApp
                conversations, templates, campaigns,
                automation, contacts, reports and
                integrations from one place.
              </p>

              <div className="mt-8 grid gap-6 border-y border-slate-200 py-6 sm:grid-cols-3">

                <div>
                  <div className="mb-3 text-emerald-600">
                    <Icon name="message" size={18} />
                  </div>

                  <h3 className="text-sm font-semibold">
                    Messaging
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Chat with customers and send approved
                    templates.
                  </p>
                </div>

                <div>
                  <div className="mb-3 text-emerald-600">
                    <Icon name="campaign" size={18} />
                  </div>

                  <h3 className="text-sm font-semibold">
                    Campaigns
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Reach audiences and track delivery.
                  </p>
                </div>

                <div>
                  <div className="mb-3 text-emerald-600">
                    <Icon name="workflow" size={18} />
                  </div>

                  <h3 className="text-sm font-semibold">
                    Automation
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Build automated WhatsApp journeys.
                  </p>
                </div>

              </div>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                DASHBOARD
            ================================================== */}

            <section
              id="dashboard"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Dashboard
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                The AllChat dashboard gives you a quick
                overview of your WhatsApp account, messaging
                activity, billing and recent campaigns.
              </p>

              <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
                {[
                  [
                    "WhatsApp Number",
                    "Connection and account status",
                  ],
                  [
                    "Billing Overview",
                    "Balance, recharge and spending",
                  ],
                  [
                    "Templates",
                    "Recently created templates",
                  ],
                  [
                    "Campaigns",
                    "Current campaign activity",
                  ],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="flex items-center justify-between py-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {text}
                      </p>
                    </div>

                    <span className="text-emerald-500">
                      <Icon name="arrow" size={15} />
                    </span>
                  </div>
                ))}
              </div>

              <InfoBox title="Tip">
                Use the dashboard as your starting point.
                It provides a quick snapshot before you move
                into messaging, campaigns or automation.
              </InfoBox>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                GETTING STARTED
            ================================================== */}

            <section
              id="getting-started-guide"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Getting Started
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Follow these steps to start sending WhatsApp
                messages through AllChat.
              </p>

              <div className="mt-8 space-y-7">
                <Step
                  number="1"
                  title="Connect your WhatsApp number"
                >
                  Open{" "}
                  <strong>
                    Settings → WhatsApp Numbers
                  </strong>{" "}
                  and connect your WhatsApp Business Account
                  using Embedded Signup or your supported
                  configuration.
                </Step>

                <Step
                  number="2"
                  title="Create an approved template"
                >
                  Go to{" "}
                  <strong>
                    Messaging → Create Templates
                  </strong>
                  . Create your message and submit it to Meta
                  for approval.
                </Step>

                <Step
                  number="3"
                  title="Send a test message"
                >
                  Open{" "}
                  <strong>Send Test Message</strong>,
                  select your approved template, enter the
                  recipient and send the message.
                </Step>

                <Step
                  number="4"
                  title="Create your first campaign"
                >
                  Open{" "}
                  <strong>
                    Campaigns → Create Campaign
                  </strong>
                  , select your approved template and choose
                  your audience.
                </Step>

                <Step
                  number="5"
                  title="Track results"
                >
                  Open the campaign report to see delivery,
                  failed, pending, replied and other
                  message-level results.
                </Step>
              </div>

              <InfoBox type="tip" title="Recommended setup">
                Always send a test message before launching a
                large campaign.
              </InfoBox>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                LIVE CHAT
            ================================================== */}

            <section
              id="live-chat"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Live Chat
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Live Chat lets your team manage incoming
                WhatsApp conversations from a single
                interface.
              </p>

              <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
                <div className="py-5">
                  <div className="mb-2 text-emerald-600">
                    <Icon name="search" />
                  </div>

                  <p className="text-sm font-semibold">
                    Find conversations
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Search customers by name or phone number.
                  </p>
                </div>

                <div className="py-5">
                  <div className="mb-2 text-emerald-600">
                    <Icon name="message" />
                  </div>

                  <p className="text-sm font-semibold">
                    Reply instantly
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Open a conversation and continue the chat.
                  </p>
                </div>

                <div className="py-5">
                  <div className="mb-2 text-emerald-600">
                    <Icon name="template" />
                  </div>

                  <p className="text-sm font-semibold">
                    Use templates
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Send approved WhatsApp templates when
                    required.
                  </p>
                </div>
              </div>

              <h3 className="mt-9 text-lg font-semibold">
                How to use Live Chat
              </h3>

              <ol className="mt-4 space-y-3 text-[14px] leading-7 text-slate-600">
                <li>
                  <strong>1.</strong> Open{" "}
                  <strong>Messaging → Live Chat</strong>.
                </li>

                <li>
                  <strong>2.</strong> Select the WhatsApp
                  number you want to manage.
                </li>

                <li>
                  <strong>3.</strong> Search for an existing
                  customer or conversation.
                </li>

                <li>
                  <strong>4.</strong> Open the conversation
                  and respond.
                </li>
              </ol>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                CREATE TEMPLATE
            ================================================== */}

            <section
              id="create-template"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Create Template
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Templates are pre-approved WhatsApp messages
                that can be used for outbound communication
                and campaigns.
              </p>

              <div className="mt-8 space-y-7">
                <Step
                  number="1"
                  title="Open the template builder"
                >
                  Go to{" "}
                  <strong>
                    Messaging → Create Templates
                  </strong>
                  .
                </Step>

                <Step
                  number="2"
                  title="Enter template information"
                >
                  Provide the template name, category and
                  language.
                </Step>

                <Step
                  number="3"
                  title="Build your message"
                >
                  Add an optional header, message body,
                  footer and supported buttons.
                </Step>

                <Step
                  number="4"
                  title="Add variables"
                >
                  Use variables such as{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
                    {"{{1}}"}
                  </code>{" "}
                  for dynamic information.
                </Step>

                <Step
                  number="5"
                  title="Submit to Meta"
                >
                  Review the WhatsApp preview and submit the
                  template for approval.
                </Step>
              </div>

              <InfoBox type="warning" title="Template approval">
                A template must be approved before it can be
                used for campaign messaging or template-based
                outbound messages.
              </InfoBox>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                VIEW TEMPLATES
            ================================================== */}

            <section
              id="view-templates"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                View Templates
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                View and manage all templates synchronized
                with your WhatsApp Business Account.
              </p>

              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
                <li>• Search templates by name.</li>
                <li>• Filter templates by approval status.</li>
                <li>• View category and language.</li>
                <li>• Preview messages.</li>
                <li>• Sync the latest template status.</li>
              </ul>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                SEND TEST
            ================================================== */}

            <section
              id="send-test"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Send Test Message
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Test an approved WhatsApp template with a
                single recipient before using it in a
                campaign.
              </p>

              <div className="mt-7 rounded-xl bg-slate-950 p-5 text-sm text-slate-200">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">
                    MESSAGE FLOW
                  </span>

                  <span className="rounded bg-emerald-950 px-2 py-1 text-[10px] text-emerald-400">
                    TEST
                  </span>
                </div>

                <div className="font-mono text-xs leading-7">
                  <div>
                    <span className="text-emerald-400">
                      01
                    </span>{" "}
                    Select recipient number
                  </div>

                  <div>
                    <span className="text-emerald-400">
                      02
                    </span>{" "}
                    Select approved template
                  </div>

                  <div>
                    <span className="text-emerald-400">
                      03
                    </span>{" "}
                    Fill template variables
                  </div>

                  <div>
                    <span className="text-emerald-400">
                      04
                    </span>{" "}
                    Send WhatsApp message
                  </div>

                  <div>
                    <span className="text-emerald-400">
                      05
                    </span>{" "}
                    Check Test Message Report
                  </div>
                </div>
              </div>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                TEST REPORT
            ================================================== */}

            <section
              id="test-report"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Test Message Report
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Track the status of individual test messages
                from a centralized report.
              </p>

              <div className="mt-6 grid gap-x-6 gap-y-5 border-y border-slate-200 py-5 sm:grid-cols-2">
                {[
                  [
                    "Sent",
                    "Message accepted for delivery",
                  ],
                  [
                    "Delivered",
                    "Message reached the recipient",
                  ],
                  [
                    "Read",
                    "Recipient opened the message",
                  ],
                  [
                    "Failed",
                    "Message could not be delivered",
                  ],
                ].map(([title, text]) => (
                  <div key={title}>
                    <p className="text-sm font-semibold">
                      {title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                CREATE CAMPAIGN
            ================================================== */}

            <section
              id="create-campaign"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Create Campaign
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Campaigns allow you to send approved WhatsApp
                templates to a selected audience at scale.
              </p>

              <div className="mt-8 space-y-7">
                <Step
                  number="1"
                  title="Create campaign details"
                >
                  Enter a campaign name and select the
                  approved WhatsApp template.
                </Step>

                <Step
                  number="2"
                  title="Choose your audience"
                >
                  Load contacts using a tag, upload an
                  Excel/CSV file or manually enter numbers.
                </Step>

                <Step
                  number="3"
                  title="Review recipients"
                >
                  Check imported contacts and verify the
                  numbers before starting.
                </Step>

                <Step
                  number="4"
                  title="Launch campaign"
                >
                  Start the campaign to begin processing
                  messages.
                </Step>

                <Step
                  number="5"
                  title="Monitor delivery"
                >
                  Open the campaign report to monitor
                  delivery and responses.
                </Step>
              </div>

              <InfoBox title="Audience sources">
                AllChat supports audience loading through
                tags, uploaded spreadsheet files and
                manually entered phone numbers.
              </InfoBox>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                CAMPAIGN LIST
            ================================================== */}

            <section
              id="campaign-list"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Campaigns
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                The Campaigns section provides a central
                view of all campaigns created in your
                account.
              </p>

              <div className="mt-6 grid grid-cols-2 border-y border-slate-200 py-5 sm:grid-cols-4">
                {[
                  "Total",
                  "Delivered",
                  "Pending",
                  "Failed",
                ].map((item) => (
                  <div key={item}>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {item}
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      —
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                CAMPAIGN REPORT
            ================================================== */}

            <section
              id="campaign-report"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Campaign Reports
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Campaign Reports provide message-level
                visibility into delivery, replies and
                failures.
              </p>

              <div className="mt-7 flex flex-wrap gap-2 border-y border-slate-200 py-5">
                {[
                  "Replied",
                  "Read",
                  "Delivered",
                  "Sent",
                  "Pending",
                  "Failed",
                  "Invalid",
                  "Duplicate",
                ].map((filter) => (
                  <span
                    key={filter}
                    className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600"
                  >
                    {filter}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                Use the include and exclude filters to narrow
                the report to the exact message statuses you
                want to analyze.
              </p>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                SHEET CAMPAIGN
            ================================================== */}

            <section
              id="sheet-campaign"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Sheet Campaigns
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Use synchronized Google Sheets data as an
                audience source for WhatsApp campaigns.
              </p>

              <div className="mt-8 space-y-7">
                <Step
                  number="1"
                  title="Connect Google Sheets"
                >
                  Go to{" "}
                  <strong>
                    Settings → Integrations
                  </strong>{" "}
                  and connect your Google Sheet.
                </Step>

                <Step
                  number="2"
                  title="Configure the sheet"
                >
                  Configure the data source and required
                  fields.
                </Step>

                <Step
                  number="3"
                  title="Set the sync timer"
                >
                  Configure the sheet timer to periodically
                  fetch updated data.
                </Step>

                <Step
                  number="4"
                  title="Create campaign"
                >
                  Use the loaded sheet data as your campaign
                  audience.
                </Step>

                <Step
                  number="5"
                  title="View report"
                >
                  Open the associated campaign report after
                  sending.
                </Step>
              </div>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                WORKFLOWS
            ================================================== */}

            <section
              id="workflows"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Workflows
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Workflows let you automate WhatsApp
                conversations using triggers, messages,
                buttons, delays, forms and actions.
              </p>

              <MiniWorkflow />

              <h3 className="mt-8 text-lg font-semibold">
                Workflow building blocks
              </h3>

              <div className="mt-5 grid gap-x-8 gap-y-5 border-y border-slate-200 py-5 sm:grid-cols-2">
                {[
                  ["Message", "Send text or media"],
                  ["URL Button", "Open a link"],
                  ["Call Action", "Allow customers to call"],
                  ["Delay", "Wait before continuing"],
                  [
                    "Inactivity",
                    "Wait for customer response",
                  ],
                  ["Tag Action", "Apply a customer tag"],
                  [
                    "Opt-out",
                    "Save an opt-out number",
                  ],
                  [
                    "Form Action",
                    "Collect customer information",
                  ],
                ].map(([title, text]) => (
                  <div key={title}>
                    <p className="text-sm font-semibold">
                      {title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                CREATE WORKFLOW
            ================================================== */}

            <section
              id="create-workflow"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Create Workflow
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Build automated customer journeys using the
                visual workflow editor.
              </p>

              <div className="mt-8 space-y-7">
                <Step
                  number="1"
                  title="Create a workflow"
                >
                  Open{" "}
                  <strong>
                    Automation → Workflows
                  </strong>{" "}
                  and select Create Workflow.
                </Step>

                <Step
                  number="2"
                  title="Add a trigger"
                >
                  Define what starts the workflow.
                </Step>

                <Step
                  number="3"
                  title="Add actions"
                >
                  Add message, button, form, tag, opt-out and
                  other supported nodes.
                </Step>

                <Step
                  number="4"
                  title="Connect nodes"
                >
                  Connect each node to define the customer
                  journey.
                </Step>

                <Step
                  number="5"
                  title="Activate"
                >
                  Save and activate after testing.
                </Step>
              </div>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                TAGS
            ================================================== */}

            <section
              id="tags"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Tags
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Tags help organize and segment customers
                based on their behavior, interests or journey
                stage.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Interested",
                  "VIP",
                  "Follow Up",
                  "Purchased",
                  "Lead",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                Tags can be created in the Tags section and
                applied automatically through workflow actions.
              </p>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                OPT OUT
            ================================================== */}

            <section
              id="optout"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Opt-out Numbers
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Opt-out numbers are stored to help prevent
                future automated communication to customers
                who have requested not to receive messages.
              </p>

              <InfoBox type="warning" title="Important">
                Opt-out numbers can be added through the
                Opt-out node inside a workflow.
              </InfoBox>

              <p className="text-sm leading-7 text-slate-600">
                You can review stored numbers from the
                Opt-out section.
              </p>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                FORMS
            ================================================== */}

            <section
              id="forms"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Forms
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Create conversational forms to collect
                information from customers directly through
                WhatsApp workflows.
              </p>

              <div className="mt-8 space-y-7">
                <Step number="1" title="Create a form">
                  Enter a form name and add the fields you
                  want to collect.
                </Step>

                <Step
                  number="2"
                  title="Configure the fields"
                >
                  Add the required customer information
                  fields.
                </Step>

                <Step
                  number="3"
                  title="Set completion messaging"
                >
                  Configure the message shown after
                  successful submission.
                </Step>

                <Step
                  number="4"
                  title="Add the form to a workflow"
                >
                  Use the Form Action node to send the form
                  to customers.
                </Step>

                <Step
                  number="5"
                  title="Review responses"
                >
                  Open Form Responses to review submitted
                  information.
                </Step>
              </div>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                FORM RESPONSES
            ================================================== */}

            <section
              id="form-responses"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Form Responses
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Form Responses provides access to information
                submitted by customers through WhatsApp
                forms.
              </p>

              <ul className="mt-5 space-y-2 text-sm leading-7 text-slate-600">
                <li>
                  • Review submitted customer information.
                </li>
                <li>• Track responses by form.</li>
                <li>
                  • Use response data for follow-up.
                </li>
                <li>
                  • Synchronize relevant data with Google
                  Sheets.
                </li>
              </ul>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                GOOGLE SHEETS
            ================================================== */}

            <section
              id="google-sheets"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Google Sheets
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                AllChat can synchronize campaign and response
                data with Google Sheets for external reporting
                and analysis.
              </p>

              <div className="mt-7 flex items-center gap-3 border-y border-slate-200 py-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Icon name="sheet" size={17} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Google Sheets Integration
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Connect, sync and manage reporting data.
                  </p>
                </div>
              </div>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                SHEET REPORTS
            ================================================== */}

            <section
              id="sheet-reports"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Sheet Reports
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Campaign reports can be synchronized into
                Google Sheets, allowing teams to maintain
                campaign-level and message-level reporting.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "View the campaign report sheet.",
                  "Create or update reporting tabs.",
                  "Export campaign information.",
                  "Use synchronized data for analysis.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700">
                      {index + 1}
                    </span>

                    <span className="text-sm text-slate-600">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                TRANSACTIONS
            ================================================== */}

            <section
              id="transactions"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Transactions
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Transactions provides visibility into your
                AllChat messaging balance, recharges and
                message spending.
              </p>

              <div className="mt-6 grid gap-x-8 gap-y-5 border-y border-slate-200 py-5 sm:grid-cols-3">
                {[
                  [
                    "Balance",
                    "Current available balance",
                  ],
                  [
                    "Recharge",
                    "Amount added to account",
                  ],
                  [
                    "Spent",
                    "Messaging amount consumed",
                  ],
                ].map(([title, text]) => (
                  <div key={title}>
                    <p className="text-sm font-semibold">
                      {title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                WHATSAPP NUMBERS
            ================================================== */}

            <section
              id="whatsapp-numbers"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                WhatsApp Numbers
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Manage the WhatsApp Business numbers connected
                to your AllChat account.
              </p>

              <div className="mt-7 space-y-6">
                <div>
                  <p className="text-sm font-semibold">
                    Embedded Signup
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Connect a WhatsApp Business Account
                    through Meta&apos;s embedded signup flow.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Manual Configuration
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Enter the required WhatsApp account
                    details manually when supported.
                  </p>
                </div>
              </div>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                BILLING
            ================================================== */}

            <section
              id="billing"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Billing & Balance
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Manage your messaging balance and monitor how
                credits are being used.
              </p>

              <InfoBox title="Balance">
                The available balance is used for eligible
                WhatsApp messaging activity according to your
                account configuration.
              </InfoBox>

              <div className="grid gap-x-8 gap-y-5 border-y border-slate-200 py-5 sm:grid-cols-3">
                {[
                  [
                    "Available",
                    "Current usable balance",
                  ],
                  [
                    "Recharged",
                    "Total amount added",
                  ],
                  [
                    "Spent",
                    "Total amount consumed",
                  ],
                ].map(([title, text]) => (
                  <div key={title}>
                    <p className="text-sm font-semibold">
                      {title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                RECHARGE
            ================================================== */}

            <section
              id="recharge"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Recharge History
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Review previous balance recharges and account
                credit activity from the billing section.
              </p>
            </section>

            <div className="my-14 h-px bg-slate-200" />

            {/* ==================================================
                INTEGRATIONS
            ================================================== */}

            <section
              id="integrations"
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Integrations
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Connect AllChat with external services to
                extend reporting and data workflows.
              </p>

              <div className="mt-7 flex items-center gap-3 border-y border-slate-200 py-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Icon name="sheet" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Google Sheets
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Synchronize campaign and reporting data
                    with Google Sheets.
                  </p>
                </div>
              </div>
            </section>

            {/* ==================================================
                FOOTER
            ================================================== */}

            <div className="mt-20 border-t border-slate-200 pt-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    AllChat Documentation
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Everything you need to get the most out of
                    AllChat.
                  </p>
                </div>

                <a
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
                >
                  Back to AllChat
                  <Icon name="arrow" size={15} />
                </a>
              </div>
            </div>

          </div>
        </main>

        {/* ==================================================
            RIGHT TABLE OF CONTENTS
        ================================================== */}

        <aside className="hidden w-[210px] shrink-0 xl:block">
          <div className="sticky top-24 px-5 py-12">

            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              On this page
            </p>

            <nav className="border-l border-slate-200">
              {[
                ["overview", "Overview"],
                ["dashboard", "Dashboard"],
                [
                  "getting-started-guide",
                  "Getting Started",
                ],
                ["live-chat", "Live Chat"],
                ["create-template", "Templates"],
                ["create-campaign", "Campaigns"],
                ["workflows", "Automation"],
                ["forms", "Forms"],
                ["google-sheets", "Google Sheets"],
                ["billing", "Billing"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`
                    block w-full border-l-2 py-1.5 pl-4
                    text-left text-xs transition

                    ${
                      activeSection === id
                        ? "border-emerald-500 font-medium text-emerald-700"
                        : "border-transparent text-slate-400 hover:text-slate-700"
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

      </div>
    </div>
  );
}
