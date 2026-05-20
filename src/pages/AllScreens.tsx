import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Search, Zap, ChevronRight, ExternalLink, Rocket, Eye, Shield, Globe } from 'lucide-react'
import type { ElementType } from 'react'
import ScreenEmbed from '../components/ScreenEmbed'

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
    title: 'Flow 1: AI-Powered Setup',
    description: 'Paste a URL and AI analyzes everything — product type, compliance needs, branding, configuration — in seconds. One page, three expandable sections, live device preview.',
    color: '#7C5CFC',
    screens: [
      {
        number: '1.1',
        name: 'Welcome / Landing',
        route: '/',
        icon: Search,
        description: 'Entry point. Communicates the core value prop: "Paste your URL. We\'ll handle the rest." Single CTA funnels to the AI setup experience.',
        value: 'Replaces multi-page onboarding with a single bold promise. Developer understands the product in 3 seconds.',
        details: [
          'Animated hero with search/analyze metaphor',
          'Headline: "Paste your URL. We\'ll handle the rest."',
          'Single CTA: "Get started"',
          'Subtle purple glow background effect',
          'Minimal nav: brand + sign in',
          'Motion entrance animations (framer-motion)',
        ],
        iframeHeight: 900,
      },
      {
        number: '1.2',
        name: 'AI Analyze — URL Input',
        route: '/setup?demo=ready',
        icon: Sparkles,
        description: 'The core experience. Developer pastes a product URL, AI analyzes it, and generates a complete compliance configuration with live device preview.',
        value: 'Replaces 3 separate setup steps (product, brand, review) with a single intelligent page. AI does the configuration work — user just reviews and tweaks.',
        details: [
          'URL input with "Analyze" button',
          'AI analyzing phase with shimmer animation',
          'Three expandable sections: Product Details, Safety & Compliance, Configuration',
          'Rich edit panels with card selectors, chip toggles, toggle switches',
          'Live device preview with 5 unique design variations',
          'Two switchable preview screens: Parental Consent + Age Verification',
          'Device frame controls: platform, orientation, dark/light mode, language',
          'Variation selector with colored dots',
          'Inline editing — no page navigation needed',
          '"Go live" CTA when ready',
        ],
        iframeHeight: 1000,
      },
      {
        number: '1.3',
        name: 'Success + Integration',
        route: '/setup/success',
        icon: Rocket,
        description: 'Celebration moment with SDK integration code. Copy-paste and go.',
        value: 'Zero friction from "Go Live" to integration. API key, install command, and init code on one screen.',
        details: [
          'Animated success checkmark (spring animation)',
          'Product name confirmation: "Crazy Cat is live."',
          'SDK install command with copy button',
          'Full initialization code snippet with copy button',
          'API key embedded in code sample',
          'CTAs: View dashboard, All products',
        ],
        iframeHeight: 800,
      },
    ],
  },
  {
    title: 'Flow 2: Device Preview System',
    description: 'The live preview that powers the setup experience — two real compliance screens with 5 unique design variations each, fully themed and localized.',
    color: '#E040A0',
    screens: [
      {
        number: '2.1',
        name: 'Preview: Parental Consent',
        route: '/setup?demo=ready&screen=overview',
        icon: Shield,
        description: 'The "Verify your child\'s age" screen shown in the device preview. Themed with the product\'s branding and compliance configuration.',
        value: 'Developer sees exactly what parents will experience. Each of the 5 variations offers a completely different layout, hierarchy, and visual approach.',
        details: [
          'Standard: classic card layout with gradient header and step indicators',
          'Minimal: typography-focused, neutral palette, clean whitespace',
          'Playful: rounded elements, pink/warm tones, friendly copy',
          'Immersive: full-bleed gradient, large CTA, ambient background',
          'Compact: dense info layout, sidebar-style steps, small footprint',
          'Supports 3 languages: English, Spanish, Chinese',
          'Dark/light mode toggle',
          'Responsive across phone, tablet, desktop frames',
        ],
        iframeHeight: 1000,
      },
      {
        number: '2.2',
        name: 'Preview: Age Verification Methods',
        route: '/setup?demo=ready&screen=methods',
        icon: Eye,
        description: 'The "Verify your age" methods list — face scan, selfie check, ID upload — shown in the device preview with timing estimates and privacy assurances.',
        value: 'Developer previews the exact verification method selection their users will see. 5 unique layouts showcase different approaches to method presentation.',
        details: [
          'Standard: stacked method cards with icons, timing badges, descriptions',
          'Minimal: clean list with subtle dividers and monochrome icons',
          'Playful: large colorful method tiles with playful timing labels',
          'Immersive: full-width method rows with gradient accents',
          'Compact: tight grid of methods with inline timing',
          '"Recommended" badge on preferred method',
          'Privacy footer with 3 trust signals',
          'Powered by branding at bottom',
        ],
        iframeHeight: 1000,
      },
    ],
  },
  {
    title: 'Flow 3: Edit Panels',
    description: 'Rich inline editing experiences that replace traditional forms with interactive card selectors, chip toggles, and visual controls.',
    color: '#059669',
    screens: [
      {
        number: '3.1',
        name: 'Edit: Product Details',
        route: '/setup?demo=ready&edit=0',
        icon: Globe,
        description: 'Product configuration panel with visual card selectors for product type and audience, chip toggles for genre and platforms.',
        value: 'Feels like managing, not form-filling. Card selectors make choices tangible. Chip toggles allow multi-select without dropdowns.',
        details: [
          'Product name text input',
          'Product type: visual cards (Game, App, Social, Content)',
          'Genre: multi-select chips (Action, Adventure, Puzzle, RPG, Strategy, Sports, Casual)',
          'Platform toggles: iOS, Android, Web, PC with toggle switches',
          'Audience age selector cards (Everyone, Teen 13+, Mature 17+, Adult 18+)',
        ],
        iframeHeight: 1000,
      },
      {
        number: '3.2',
        name: 'Edit: Safety & Compliance',
        route: '/setup?demo=ready&edit=1',
        icon: Shield,
        description: 'Safety configuration with age range cards, region selectors, data handling chips, and a visual risk indicator bar.',
        value: 'Complex compliance decisions made visual and intuitive. Risk level shown as a gradient bar rather than a dropdown.',
        details: [
          'Age range cards (Under 13, 13–17, 18+, All Ages)',
          'Region cards with flag indicators (US, EU, UK, Global)',
          'Data handling: multi-select chips (Biometric, PII, Payment, Health, Location)',
          'Risk level: gradient bar from Low to Critical',
          'Visual risk indicator with labeled segments',
        ],
        iframeHeight: 1000,
      },
      {
        number: '3.3',
        name: 'Edit: Configuration',
        route: '/setup?demo=ready&edit=2',
        icon: Zap,
        description: 'Toggle cards for each compliance module — Age Gate, Parental Consent, ID Verification — with expandable sub-options.',
        value: 'Each module is a card you flip on/off. Expanding reveals granular settings without leaving the page.',
        details: [
          'Age Gate toggle card with redirect URL sub-option',
          'Parental Consent toggle card with email verification and SMS options',
          'ID Verification toggle card with accepted document types',
          'Each card: icon, title, description, toggle switch',
          'Expandable sub-options appear on toggle-on',
          'Consistent card pattern across all modules',
        ],
        iframeHeight: 1000,
      },
    ],
  },
]

export default function AllScreens() {
  return (
    <div className="min-h-screen bg-navy-950">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
            <Zap className="h-3 w-3" />
            AI Analyze — Complete Screen Inventory
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">All Screens</h1>
          <p className="mb-4 text-gray-400">
            Every screen in the AI Analyze experience — paste a URL, AI configures everything, preview it live, go live in 3 clicks.
          </p>
          <div className="mb-12 flex items-center gap-6 border-b border-navy-700/50 pb-6">
            <Stat label="Screens" value="3" />
            <Stat label="Preview variations" value="10" />
            <Stat label="Edit panels" value="3" />
            <Stat label="Clicks to go live" value="3" />
          </div>

          <div className="space-y-20">
            {SCREEN_SECTIONS.map((section, si) => (
              <div key={si}>
                <div className="mb-8">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="h-1 w-8 rounded-full" style={{ backgroundColor: section.color }} />
                    <h2 className="text-xl font-bold text-white">{section.title}</h2>
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
                                <h3 className="text-lg font-semibold text-white">{screen.name}</h3>
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
            <h3 className="mb-4 text-base font-semibold text-white">What AI Analyze replaces</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ['3 separate setup pages', '1 AI-powered single page'],
                ['Manual product type selection', 'AI auto-detects from URL'],
                ['14 hex-value branding fields', 'AI-generated branded preview'],
                ['Static mockups', '10 live design variations'],
                ['English-only preview', '3-language live preview'],
                ['No device preview', 'Phone / tablet / desktop frames'],
                ['Form-based configuration', 'Card selectors + chip toggles'],
                ['64 design frames', '3 screens, infinite variations'],
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
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}
