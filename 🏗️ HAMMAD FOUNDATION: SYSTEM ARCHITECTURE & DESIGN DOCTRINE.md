🏗️ HAMMAD FOUNDATION: SYSTEM ARCHITECTURE & DESIGN DOCTRINE
Version: 1.0
Last Updated: February 2026
Purpose: Master reference for AI agents, developers, and designers building the Hammad Foundation digital platform

📋 TABLE OF CONTENTS

Who We Are
How We Operate
Our Values & Morals
Design Philosophy
UI/UX Team Structure
Technical Systems
AI Agent Guardrails
What We Don't Do


🎯 WHO WE ARE
The Legal Entity
Parent Company: YZ Educational Services (Pvt) Ltd
Registration: SECP (Securities & Exchange Commission of Pakistan)
Type: Section 42 Private Limited Company
FBR Status: Tax Exempt, Zakat Eligible
Location: Lahore, Punjab, Pakistan
The Project
Brand Name: Hammad Foundation
Legal Definition: "A Project of YZ Educational Services"
Purpose: Education sponsorship for underprivileged students
Model: Direct Guardian-to-Student matching (not pooled donations)
The Founder
Name: Hamza
Role: CEO of NEROZARB (Systems Architecture firm)
Identity: Builder, not charity worker
Philosophy: "Systems over sympathy. Transparency over trust-me stories."
The Mission (In Plain English)
We don't run a charity. We run a matching service between overseas Pakistanis who have money and Lahore students who need school fees.

500 students need sponsors
$30/month covers: tuition + lunch + books + basic medical
100% tracked: Every rupee is photographed, receipted, and sent to the Guardian

We're solving the "NGO Trust Gap" by being a registered company with corporate accountability, not a shadowy charity that disappears donations.

🔧 HOW WE OPERATE
The Revenue Model
Target: 500 Monthly Guardians × $30 = $15,000/month
Current: 124 Guardians secured
Gap: 376 spots remaining
Timeline: Fill by June 2026 (end of school year)
The Process (Manual, Not Automated)
Guardian Journey:
1. USER visits website
   ↓
2. Chooses: $15 (Books) | $25 (Uniform) | $30/month (Guardian)
   ↓
3. Pays via: Meezan Bank IPG (card) OR Bank Transfer (PKR)
   ↓
4. Redirected to: Thank You page
   ↓
5. Clicks: WhatsApp button (pre-filled message)
   ↓
6. Sends: Payment screenshot to our team
   ↓
7. WE manually:
   - Verify payment
   - Assign available student
   - Send: Photo + Name + Age + Dream
   ↓
8. Every Friday: WhatsApp video update (30 seconds)
Why Manual? Students can leave school. New students join. We need human judgment to match Guardians with the right kids. Automation would break the personal connection.
The Financial Flow
Guardian's $30 → Meezan Bank (YZ Educational Services account)
         ↓
School tuition (direct to institution)
Kitchen expenses (groceries for lunch program)
Uniform supplier (bulk orders)
Medical fund (emergency healthcare)
         ↓
ALL tracked with:
- Bank statements
- Supplier receipts  
- Attendance sheets
- Photo documentation
The Proof System (Our Competitive Advantage)
We don't just say "trust us." We show:

Hand-written grocery receipts
School attendance registers (with today's date)
SECP registration certificate (high-res scan)
FBR tax exemption letter
Students holding "Thank you for my books" signs
NO stock photos. NO professional photographers. Just raw phone camera reality.


💎 OUR VALUES & MORALS
1. Radical Transparency
Principle: "If you can't photograph it, it didn't happen."
Action: Every expense has a photo receipt sent to Guardians
Why: Pakistani expats have been burned by fake charities
2. Dignity Over Pity
Principle: "We don't sell sadness. We sell potential."
Action: Show students studying, not begging
Why: These kids aren't victims. They're future doctors blocked by Rs. 3,000/month.
3. Honesty Over Optics
Principle: "We tell you what we can't do."
Action: "We can't automate everything. You'll wait 48 hours for your student match."
Why: Honesty builds trust faster than false promises
4. Systems Over Emotions
Principle: "Feelings fade. Systems scale."
Action: Google Sheets tracking, WhatsApp Business API, manual QA
Why: Hamza is a systems architect. We build infrastructure, not just campaigns.
5. Local Team, Global Reach
Principle: "We're on the ground in Lahore. You're funding from abroad."
Action: Physical school visits, parent interviews, teacher coordination
Why: You can't run education charity from a coffee shop in Dubai

🎨 DESIGN PHILOSOPHY
Core Aesthetic: "Editorial Minimalism with Soul"
Think: The New York Times meets Stripe meets a Pakistani tea stall
NOT:

❌ Bento grid layouts
❌ Glassmorphism effects
❌ Gradient backgrounds
❌ Abstract blobs
❌ 3D illustrations
❌ Animated floating elements

YES:

✅ Clean, editorial typography (large headlines, generous line-height)
✅ Photography-forward (real photos, not illustrations)
✅ Card-based but simple (white cards on colored backgrounds)
✅ Purposeful white space (breathe, don't clutter)
✅ Subtle shadows (not dramatic depth)
✅ Human touches (handwritten numbers, personal notes)


Design Reference Framework
Layout Inspiration:

Stripe.com → Clean cards, clear hierarchy, purposeful spacing
Linear.app → Editorial typography, no fluff
Apple.com → Product focus, minimal UI chrome
The Economist → Serious, credible, text-forward

Photography Style:

Humans of New York → Raw, unpolished, real stories
Airbnb (2014-2016) → Photography-first, human-centered
Warby Parker → Approachable, not corporate

Copy Tone:

Basecamp's marketing → Blunt, honest, anti-corporate
Patagonia → Values-first, no BS
Dollar Shave Club (early ads) → Direct, conversational


Color System: "Sand, Ink, and Hope"
css/* Primary Palette */
--sand: #F7F1E6;        /* Warm background (Lahore dust + hope) */
--charcoal: #0C0F13;    /* Text, headers */
--nero-green: #0F9D58;  /* CTAs, progress, success */
--white: #FFFFFF;       /* Cards, contrast */

/* Secondary Palette */
--gray-900: #111827;    /* Dark sections */
--gray-700: #374151;    /* Secondary text */
--gray-300: #D1D5DB;    /* Borders */
--gray-100: #F3F4F6;    /* Subtle backgrounds */

/* Accent (Use Sparingly) */
--rust: #C2410C;        /* Urgency indicators */
--gold: #D97706;        /* Achievement badges */
Color Usage Rules:

Sand background = Main body, warmth, approachability
Charcoal text = Serious, credible, readable
Nero green = Action, growth, Islamic charity association
White cards = Content containers, clarity
Rust = ONLY for urgency ("53 spots left")


Typography System
css/* Font Stack */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Hierarchy */
--display: 800 (ExtraBold) /* Hero headlines only */
--h1: 700 (Bold)           /* Section titles */
--h2: 600 (SemiBold)       /* Subsections */
--h3: 600 (SemiBold)       /* Card titles */
--body: 400 (Regular)      /* Paragraphs */
--emphasis: 500 (Medium)   /* Highlights */
--small: 400 (Regular)     /* Captions */

/* Scale (Mobile → Desktop) */
Display: 40px → 64px
H1:      32px → 48px
H2:      24px → 32px  
H3:      20px → 24px
Body:    16px → 18px
Small:   14px → 14px

/* Line Height */
Headlines: 1.2
Body:      1.6
Small:     1.4
```

**Typography Rules:**
- Headlines are SHORT and DIRECT ("You made it in Houston.")
- Body text is CONVERSATIONAL, not corporate
- Never center-align body text (left-aligned always)
- Use bold for emphasis, NOT italics or underlines

---

### **Layout System: "Editorial Grid"**

**Mobile First (375px base):**
```
Container: 100% width
Padding:   16px sides
Grid:      Single column
Cards:     Full width
```

**Tablet (768px):**
```
Container: 100% width  
Padding:   32px sides
Grid:      2 columns (for product cards only)
Hero:      Still single column
```

**Desktop (1440px):**
```
Container: 1280px max-width
Padding:   64px sides
Grid:      12 columns
Hero:      7 columns text + 5 columns image
Cards:     3-column grid
```

**Spacing Scale (8px base unit):**
```
4px  = Micro (icon gaps)
8px  = Tiny (inline spacing)
16px = Small (card padding)
24px = Medium (section padding)
32px = Large (between sections)
48px = XLarge (hero spacing)
64px = XXLarge (page margins)

Component Design Patterns
Cards:
cssbackground: white;
border: 1px solid #E5E7EB;
border-radius: 12px;
padding: 24px;
box-shadow: 0 1px 3px rgba(0,0,0,0.1);

/* On Hover */
box-shadow: 0 4px 12px rgba(0,0,0,0.15);
transform: translateY(-2px);
transition: all 0.2s ease;
NOT:

No glassmorphism (backdrop-blur)
No gradient borders
No 3D depth effects
No parallax scrolling

Buttons:
css/* Primary CTA */
background: #0F9D58;
color: white;
padding: 14px 28px;
border-radius: 8px;
font-weight: 600;
font-size: 16px;
box-shadow: 0 2px 8px rgba(15,157,88,0.3);

/* Hover */
background: #0d8547;
transform: scale(1.02);

/* Secondary */
background: transparent;
border: 2px solid #0C0F13;
color: #0C0F13;
Images:
css/* Hero Photos */
aspect-ratio: 4/3;
border-radius: 12px;
object-fit: cover;
filter: none; /* NO filters, show reality */

/* Student Photos */
aspect-ratio: 1/1;
border-radius: 8px;
border: 2px solid #F7F1E6;
```

---

### **Photography Guidelines**

**DO:**
- ✅ Phone camera photos (iPhone/Android native camera)
- ✅ Natural lighting (classroom windows, outdoor)
- ✅ Students in school uniform
- ✅ Receipts with visible text
- ✅ Attendance registers with handwriting
- ✅ School building exteriors (show reality)

**DON'T:**
- ❌ Professional photographer sessions
- ❌ Staged poses (forced smiles)
- ❌ Filters or heavy editing
- ❌ Stock photos from Unsplash/Pexels
- ❌ Blur backgrounds (keep context visible)
- ❌ Crop to hide "ugly" details

**Why this matters:** Guardians in Houston have seen too many polished NGO campaigns. Raw = Real = Trust.

---

## 👥 UI/UX TEAM STRUCTURE

### **Recommended Team Composition:**

#### **Option A: Lean Team (Recommended)**
```
1. UI/UX Designer (Lead)
   - Creates design system in Figma
   - Designs all pages and components
   - Ensures brand consistency
   - Tools: Figma, Principle (for micro-interactions)

2. Frontend Developer
   - Builds Next.js application
   - Implements design system in code
   - Handles responsive breakpoints
   - Tools: Next.js, Tailwind CSS, Vercel

3. Content Strategist (Part-time)
   - Writes/edits all copy
   - Ensures Hamza's voice throughout
   - Translates Urdu content if needed
   - Tools: Google Docs, Grammarly

4. QA Tester (Contract)
   - Tests on real devices
   - Lighthouse performance audits
   - Cross-browser compatibility
   - Tools: BrowserStack, Lighthouse CI
```

**Total Team Size:** 3 full-time + 1 contract = 4 people  
**Timeline:** 2-3 weeks to launch

---

#### **Option B: Solo AI-Assisted Builder (Current)**
```
1. Hamza (Product Owner)
   - Defines requirements
   - Reviews output
   - Makes final decisions

2. AI Agent (Antigravity/Cursor/v0)
   - Designs UI based on system doc
   - Writes code
   - Iterates based on feedback

3. Contract Designer (Optional)
   - Creates logo variations
   - Designs social media assets
   - Polishes photography
```

**Total Team Size:** 1 person + AI + occasional contractor  
**Timeline:** 1 week to MVP

---

### **Skill Requirements by Role:**

| Role | Must Have | Nice to Have |
|------|-----------|--------------|
| **UI/UX Designer** | Figma expert, typography knowledge, Pakistani context understanding | Illustration, animation, Urdu typography |
| **Frontend Dev** | Next.js, Tailwind, responsive design, performance optimization | Backend APIs, payment integration, analytics |
| **Content Strategist** | Copywriting, donor psychology, bilingual (Urdu/English) | SEO, email marketing, video scripting |
| **QA Tester** | Device testing, performance auditing, accessibility | Automated testing, load testing |

---

### **Design Handoff Process:**
```
1. Designer creates in Figma
   ↓
2. Exports design system as Tailwind config
   ↓
3. Developer builds components in Storybook (optional)
   ↓
4. Hamza reviews on staging URL
   ↓
5. Iterate based on feedback
   ↓
6. Deploy to production
Tools for Collaboration:

Design: Figma (shared workspace)
Dev: GitHub (code repo)
Communication: WhatsApp (fast decisions)
Project Management: Notion or Linear (task tracking)


⚙️ TECHNICAL SYSTEMS
Tech Stack (Locked In):
javascript{
  "framework": "Next.js 14+ (App Router)",
  "styling": "Tailwind CSS 3.4+",
  "fonts": "Google Fonts (Inter)",
  "icons": "Lucide React",
  "analytics": "Plausible Analytics",
  "deployment": "Vercel",
  "forms": "React Hook Form",
  "payments": "Meezan Bank IPG",
  "communication": "WhatsApp Business API (future)"
}
```

### **File Structure:**
```
/app
  /page.tsx                 → Homepage
  /thank-you/page.tsx       → Post-payment
  /vault/page.tsx           → Proof gallery (future)
/components
  /ui/                      → Reusable components
    Button.tsx
    Card.tsx
    Hero.tsx
    ProgressBar.tsx
  /sections/                → Page sections
    ProductGrid.tsx
    TrustSection.tsx
/lib
  /utils.ts                 → Helper functions
  /constants.ts             → Brand colors, copy
/public
  /images/                  → Logo, photos
  /receipts/                → Vault images
```

### **Performance Requirements:**
```
Lighthouse Scores (Mobile):
- Performance: >90
- Accessibility: >95
- Best Practices: >95
- SEO: >90

Load Time Targets:
- First Contentful Paint: <0.8s
- Largest Contentful Paint: <1.2s
- Time to Interactive: <1.5s
- Total Blocking Time: <200ms
- Cumulative Layout Shift: <0.1

Bundle Size:
- First Load JS: <150KB
- Total Page Weight: <500KB
SEO Foundation:
html<!-- Meta Tags -->
<title>Hammad Foundation - Sponsor a Pakistani Student's Education</title>
<meta name="description" content="Become a Guardian for $30/month. 500 students in Lahore need you. 100% transparent, SECP registered." />

<!-- Open Graph -->
<meta property="og:title" content="Hammad Foundation - 500 Students Need Guardians" />
<meta property="og:image" content="/og-image.png" />

<!-- Schema.org -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Hammad Foundation",
  "description": "Education sponsorship for Pakistani students",
  "url": "https://hammadfoundation.org"
}
</script>
```

---

## 🚧 AI AGENT GUARDRAILS

### **CRITICAL: What AI Agents MUST Follow**

#### **1. Brand Voice Enforcement**

**✅ CORRECT Copy Examples:**
```
"You built success in Houston. Now secure a life in Lahore."
"I'm not a charity guy. I'm a builder."
"124 people already did. Will you be number 125?"
"Every rupee photographed. No secrets."
```

**❌ INCORRECT Copy Examples (REJECT THESE):**
```
"Empower underprivileged children to achieve their dreams"
"Join our journey of transformation"
"Together, we can change lives"
"Be the change you wish to see"
Rule: If it sounds like it came from a generic NGO website, rewrite it.

2. Design Pattern Restrictions
BANNED Elements:
css/* DO NOT USE */
.bento-grid { }              /* No bento layouts */
.glassmorphism { }           /* No backdrop-blur effects */
.gradient-bg { }             /* No gradient backgrounds */
.floating-animation { }      /* No parallax/floating */
.blob-shape { }              /* No abstract blobs */
.3d-card { }                 /* No 3D transforms */
If AI suggests any of these → STOP and ask for alternative.

3. Data Accuracy Rules
Real Numbers Only:
javascript// ✅ CORRECT
const stats = {
  current: 124,     // Actual secured Guardians
  target: 500,      // Real goal
  remaining: 376    // Math: 500 - 124
}

// ❌ WRONG
const stats = {
  current: "500+",     // Fake inflation
  target: 1000,        // Made-up goal
  impact: "94%"        // Unverified stat
}
```

**Rule:** Only use numbers Hamza provides. Do NOT invent statistics.

---

#### **4. Image Placeholder Protocol**

**When AI needs images:**
```
1. Use placeholder boxes with labels:
   [HERO IMAGE: Student in classroom - 1200x800px]
   
2. Do NOT use:
   - Stock photos from Unsplash
   - AI-generated images
   - Random Google results
   
3. Add clear instructions in README:
   "Replace /public/images/hero.jpg with actual school photo"
```

---

#### **5. Copy Length Limits**

**Enforce Brevity:**
```
Headlines:     Max 12 words
Subheadlines:  Max 20 words
Body Paragraphs: Max 3 sentences
CTA Buttons:   Max 4 words
```

**Why:** Mobile users scroll fast. Every word must earn its place.

---

#### **6. Mobile-First Validation**

**Before submitting ANY design:**
```
1. Test on 375px viewport first
2. Ensure tap targets are 44x44px minimum
3. Check readability at 16px font size
4. Verify no horizontal scroll
5. Test with slow 3G throttling
If it doesn't work on mobile, it doesn't ship.

7. Accessibility Checkpoints
Required for every component:
html<!-- Buttons -->
<button aria-label="Become a Guardian for $30 per month">
  BECOME A GUARDIAN
</button>

<!-- Images -->
<img 
  src="/student.jpg" 
  alt="Female student in green uniform reading textbook in Lahore classroom"
/>

<!-- Forms -->
<label for="amount">Donation Amount</label>
<input 
  id="amount" 
  type="number" 
  aria-describedby="amount-help"
/>

8. Performance Budget Enforcement
Auto-fail if:

Lighthouse Performance < 90
First Load JS > 150KB
Images not optimized to WebP
Any render-blocking resources
Missing lazy loading on below-fold images

AI must run Lighthouse before marking task complete.

❌ WHAT WE DON'T DO
Design Anti-Patterns:
We DON'T:

Use bento grid layouts (too trendy, distracting)
Add glassmorphism effects (gimmicky, performance cost)
Animate everything (motion sickness, slow devices)
Use abstract illustrations (we're real, not corporate)
Hide content behind interactions (users are impatient)
Auto-play videos (annoying, data cost)

Why: Every design choice must serve conversion. If it doesn't help someone donate, delete it.

Copy Anti-Patterns:
We DON'T:

Say "empower" (NGO cliché)
Use passive voice ("Students are being helped" → "You help students")
Write long paragraphs (attention spans are 8 seconds)
Bury the ask (CTA must be visible immediately)
Use corporate jargon ("stakeholders", "synergy", "impact framework")

Why: Our audience is busy expats. Respect their time. Be direct.

Technical Anti-Patterns:
We DON'T:

Build multi-page SPAs (keep it simple, one-page for MVP)
Add unnecessary dependencies (every KB costs load time)
Use jQuery or old libraries (modern JS only)
Implement complex animations (performance budget)
Store user data (privacy risk, legal complexity)

Why: Ship fast, load fast, convert fast.

Operational Anti-Patterns:
We DON'T:

Promise automation we can't deliver (manual WhatsApp workflow)
Claim 100% of donations go to students (we're honest about admin costs)
Show students' full names (privacy protection)
Use emotional manipulation (no crying children)
Compare ourselves to big NGOs (we're small, that's our strength)

Why: Trust is built on honesty, not exaggeration.

📚 REFERENCE LIBRARY
Study These Sites (DO THIS):
For Layout:

stripe.com → Clean cards, clear CTAs
linear.app → Editorial typography
cal.com → Simple, functional

For Photography:

humansofnewyork.com → Raw storytelling
airbnb.com (circa 2015) → Real photos
dopper.com → Product + mission balance

For Copy:

basecamp.com → Anti-corporate tone
patagonia.com → Values-first messaging
mailchimp.com → Friendly but professional


Run Away From These:
DON'T Copy:

Most Pakistani NGO sites (outdated, cluttered)
Generic charity themes (WordPress templates)
Overly animated sites (awwwards.com winners)
Dense government portals


🎓 FINAL CHECKLIST FOR AI AGENTS
Before marking ANY task as "complete", verify:
Brand:

 Copy sounds like Hamza (blunt, honest)
 Colors match exact hex codes
 Logo is prominently displayed
 No bento grid or glassmorphism

Content:

 Real numbers used (124/500, not fake stats)
 All placeholders documented in README
 CTAs are action-oriented (<4 words)
 Mobile-first design verified

Performance:

 Lighthouse score >90 on mobile
 All images are WebP/AVIF
 Lazy loading implemented
 No layout shift (CLS < 0.1)

Accessibility:

 All images have descriptive alt text
 Buttons have aria-labels
 Keyboard navigation works
 Color contrast ratio >4.5:1

Functionality:

 WhatsApp links have pre-filled messages
 Payment modal opens/closes correctly
 Geo-targeting works (test with VPN)
 All links go somewhere


🚀 DEPLOYMENT PROTOCOL
Staging:
bashvercel --prod false
# Test thoroughly on staging URL
# Get Hamza's approval
Production:
bashvercel --prod
# Only after Hamza says "Ship it"
Post-Launch:

Monitor Vercel Analytics for errors
Check Plausible for traffic patterns
Test WhatsApp links with real phone
Get feedback from 5 test users


📞 EMERGENCY CONTACTS
If Something Breaks:

Check Vercel deployment logs
Review GitHub commit history
WhatsApp Hamza immediately
Rollback to previous version if needed

If Design Looks Wrong:

Re-read this SYSTEM.md
Check against reference sites (Stripe, Linear)
Show Hamza screenshots for feedback
Iterate based on his input


🔄 VERSION HISTORY
v1.0 (Feb 2026)

Initial system documentation
Removed bento/glassmorphism direction
Added editorial minimalism framework
Defined team structure
Locked in tech stack


REMEMBER: This is not a portfolio piece. This is a revenue machine. Every pixel must convert. Every word must clarify. Every click must reduce friction.
When in doubt, ask: "Would this make a busy doctor in Houston donate $30/month?" If no, delete it.

END OF SYSTEM DOCUMENTATION