import { PageWrapper } from '../components/Layout'
import ScreenEmbed from '../components/ScreenEmbed'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Shield, Palette, CheckCircle, Rocket, LayoutGrid, Settings, Zap, ChevronRight, ExternalLink } from 'lucide-react'
import type { ElementType } from 'react'

interface ScreenDef {
  number: string
  name: string
  route: string
  icon: ElementType
  description: string
  value: string
  details: string[]
  iframeHeight?: number
}

interface SectionDef {
  title: string
  description: string
  color: string
  screens: ScreenDef[]
}

const SCREEN_SECTIONS: SectionDef[] = [
  {
    title: 'Flow 1: First-Time Setup',
    description: 'The "developer clicks an ad" journey — from landing page to a live compliance integration in under 5 minutes.',
    color: '#7C5CFC',
    screens: [
      {
        number: '1.1',
        name: 'Welcome / Landing',
        route: '/',
        icon: Shield,
        description: 'Entry point from ad or direct visit. Establishes trust, communicates simplicity, and funnels to a single CTA.',
        value: 'Replaces the need for a sales call or lengthy onboarding docs. Developer sees the end result (a branded verification flow) immediately.',
        details: ['Hero with animated preview of verification flow', 'Single CTA: "Set Up Your App"', 'Trust signals: SOC 2, COPPA, GDPR badges', 'Sign In for returning users'],
        iframeHeight: 900,
      },
      {
        number: '1.2',
        name: 'Step 1: Tell Us About Your Product',
        route: '/setup',
        icon: Shield,
        description: 'Collects the minimum inputs needed to auto-configure everything. Visual selectors replace dropdowns and forms.',
        value: 'Replaces the old Product Details page, Risk Level dropdown, workflow selection modal, and Create Product flow — all in one screen with smart defaults.',
        details: ['Product name input', 'Product type: visual cards (Game, App, Social, Content, Other)', 'Platform: iOS, Android, Web, Multi-platform', 'Audience: All ages, 13+, 18+, "I\'m not sure"', '"I\'m not sure" expands inline follow-up Q&A that auto-recommends configuration', 'Optional app URL for context'],
        iframeHeight: 1000,
      },
      {
        number: '1.3',
        name: 'Step 2: Brand Your Experience',
        route: '/setup/brand',
        icon: Palette,
        description: 'AI-powered branding replaces 14 manual hex-value fields. Drop your logo, get a complete theme.',
        value: 'Reduces branding setup from 14 color inputs + manual configuration to a single drag-and-drop. AI generates the entire theme from brand assets.',
        details: ['Logo upload zone with drag-and-drop', 'Optional app screenshot upload for style matching', 'AI generates color palette in ~2 seconds (shimmer loading state)', '4 palette variations to choose from', 'Live device preview updates in real-time', 'Preview each step: Age Gate → Estimation → Appeal → Consent', 'Device switcher: iPhone, Tablet, Desktop', '"Customize" toggle reveals manual overrides (primary color, corner radius, mode)'],
        iframeHeight: 950,
      },
      {
        number: '1.4',
        name: 'Step 3: Review & Launch',
        route: '/setup/review',
        icon: CheckCircle,
        description: 'Summary of everything auto-configured with inline editing and an interactive preview of the end-user journey.',
        value: 'Replaces all 12+ individual configuration pages. Everything is visible and editable from one screen. The developer sees exactly what their users will experience.',
        details: ['Summary cards for each config section with green checkmarks', 'Inline expandable editing — no page navigation needed', 'Split view: config summary + live device preview', 'Interactive flow walkthrough (step through each verification screen)', 'Three launch options: Go Live, Test First, Save Draft', 'Loading state animation on "Go Live"'],
        iframeHeight: 950,
      },
      {
        number: '1.5',
        name: 'Success + Integration',
        route: '/setup/success',
        icon: Rocket,
        description: 'Celebration moment with immediate integration code. The developer can copy-paste the SDK setup and go.',
        value: 'Zero friction from "Go Live" to actual integration. API key, SDK install command, and initialization code are all on one screen with copy buttons.',
        details: ['Animated success checkmark', 'SDK install command with copy-to-clipboard', 'Full initialization code snippet with syntax highlighting', 'API key display with copy button', 'CTAs: View Dashboard, Read Full Docs'],
        iframeHeight: 800,
      },
    ],
  },
  {
    title: 'Flow 2: Returning User',
    description: 'The dashboard experience for developers managing existing products. Card-based overview with inline editing.',
    color: '#3B82F6',
    screens: [
      {
        number: '2.1',
        name: 'Products Home',
        route: '/products',
        icon: LayoutGrid,
        description: 'Card-based overview of all products. Replaces the old table-based listing.',
        value: 'Each product is a visual card showing status, key metrics, and quick actions at a glance. No more scanning rows in a table.',
        details: ['Product cards with icon, name, type, platform, status badge', 'Status: Live (green), Test Mode (amber), Draft (gray)', 'Key metric per card: verified users or setup %', 'Last activity timestamp', 'Quick actions: Manage, Preview', 'New Product card (dashed border) links to setup wizard', 'Search bar for filtering'],
        iframeHeight: 700,
      },
      {
        number: '2.2',
        name: 'Product Dashboard',
        route: '/products/pixel-quest',
        icon: Settings,
        description: 'The single hub for managing one product. Every config section is inline-expandable. No sidebar navigation, no separate pages.',
        value: 'Consolidates the entire old sidebar navigation (Product Details, Developer Settings, Branding, Age Assurance, Age Appeal, Adult Verification, Parental Consent, and all CDK sections) into one unified view with expandable cards.',
        details: ['Hero: product icon, name, status badge, live metrics', 'Metrics: verified today, success rate, avg time', 'Expandable sections: Product Details, Branding, Age Assurance, Age Appeal, Adult Verification, Parental Consent, Developer Settings', 'Each section shows status (On/Off/Configured) and summary', 'Expand to edit with full form controls: inputs, radio buttons, toggles, sliders', 'Live Preview button opens device preview overlay', 'Activity feed on the side: timestamped change log', 'Preview panel: full slide-out with device frame, flow steps, device switcher'],
        iframeHeight: 1200,
      },
    ],
  },
  {
    title: 'Flow 3: Global',
    description: 'Settings and account management that apply across all products.',
    color: '#10B981',
    screens: [
      {
        number: '3.1',
        name: 'Settings',
        route: '/settings',
        icon: Settings,
        description: 'Organization settings, team management, API keys, webhooks, and notification preferences.',
        value: 'Centralizes all account-level configuration. Team members, API credentials, webhook endpoints, and alert preferences in one clean view.',
        details: ['Organization: company name, team members with roles (Owner, Admin, Developer), invite flow', 'API Keys: Live and Test keys with copy and rotate actions', 'Webhooks: endpoint URLs with event type tags, add/delete', 'Notifications: toggle alerts for verification failures, appeal submissions, weekly summary'],
        iframeHeight: 950,
      },
    ],
  },
]

export default function AllScreens() {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
            <Zap className="h-3 w-3" />
            Complete Screen Inventory
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">All Screens</h1>
          <p className="mb-4 text-gray-400">
            Every screen in the redesigned Compliance Studio experience — descriptions, value, and the live UI.
          </p>
          <div className="mb-12 flex items-center gap-6 border-b border-navy-700/50 pb-6">
            <Stat label="Total screens" value="8" />
            <Stat label="Setup steps" value="3" />
            <Stat label="Clicks to go live" value="~5" />
            <Stat label="Replaced" value="64 frames → 8 views" />
          </div>

          <div className="space-y-20">
            {SCREEN_SECTIONS.map((section, si) => (
              <div key={si}>
                <div className="mb-8">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="h-1 w-8 rounded-full" style={{ backgroundColor: section.color }} />
                    <h2 className="text-xl font-bold">{section.title}</h2>
                  </div>
                  <p className="ml-11 text-sm text-gray-500">{section.description}</p>
                </div>

                <div className="ml-11 space-y-16">
                  {section.screens.map((screen, i) => {
                    const Icon = screen.icon
                    const iframeH = screen.iframeHeight || 900

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: si * 0.08 + i * 0.04 }}
                      >
                        <div className="mb-5 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex h-10 w-10 items-center justify-center rounded-xl"
                              style={{ backgroundColor: section.color + '15' }}
                            >
                              <Icon className="h-5 w-5" style={{ color: section.color }} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-gray-600">{screen.number}</span>
                                <h3 className="text-lg font-semibold">{screen.name}</h3>
                              </div>
                              <p className="font-mono text-xs text-gray-600">{screen.route}</p>
                            </div>
                          </div>
                          <a
                            href={screen.route}
                            className="flex items-center gap-1.5 rounded-lg border border-navy-600 px-3 py-1.5 text-xs text-gray-500 transition-colors hover:border-navy-500 hover:text-white"
                          >
                            Open
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>

                        <p className="mb-3 text-[15px] text-gray-300">{screen.description}</p>

                        <div className="mb-4 rounded-lg border border-purple-500/10 bg-purple-500/5 px-4 py-3">
                          <div className="mb-1 flex items-center gap-1.5">
                            <Sparkles className="h-3 w-3 text-purple-400" />
                            <span className="text-xs font-medium text-purple-400">Value</span>
                          </div>
                          <p className="text-sm text-gray-400">{screen.value}</p>
                        </div>

                        <div className="mb-5">
                          <p className="mb-2 text-xs font-medium text-gray-500">What's on this screen</p>
                          <ul className="columns-2 gap-x-6 space-y-1">
                            {screen.details.map((detail, j) => (
                              <li key={j} className="flex items-start gap-2 break-inside-avoid text-sm text-gray-500">
                                <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-gray-700" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <ScreenEmbed
                          route={screen.route}
                          name={screen.name}
                          iframeHeight={iframeH}
                        />
                      </motion.div>
                    )
                  })}
                </div>

                {si < SCREEN_SECTIONS.length - 1 && (
                  <div className="ml-11 mt-10 flex items-center gap-3 text-gray-700">
                    <div className="h-px flex-1 bg-navy-700/30" />
                    <ArrowRight className="h-4 w-4" />
                    <div className="h-px flex-1 bg-navy-700/30" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-20 rounded-2xl border border-navy-700/50 bg-navy-800/30 p-6">
            <h3 className="mb-4 text-base font-semibold">What was consolidated</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ['14 hex-value branding fields', '1 logo upload + AI generation'],
                ['3 duplicate section layouts', '1 adaptive dashboard'],
                ['Deep sidebar (12+ nav items)', 'Flat top nav (3 items)'],
                ['19 separate page types', '8 unified views'],
                ['64 design frames', '~25 state variations'],
                ['Modal-based product creation', 'Full-page guided wizard'],
                ['Separate config pages', 'Inline expandable sections'],
                ['No preview of user experience', 'Always-available device preview'],
              ].map(([before, after], i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg bg-navy-800 p-3">
                  <span className="shrink-0 text-xs text-red-400/60 line-through">{before}</span>
                  <ArrowRight className="h-3 w-3 shrink-0 text-gray-600" />
                  <span className="text-xs text-emerald-400">{after}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}
