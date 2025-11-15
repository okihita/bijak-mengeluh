# Bijak Mengeluh 🇮🇩

> Democracy shouldn't require a PhD in bureaucracy.

**Live:** https://bijakmengeluh.id

---

## The Problem

You see a broken road. You're angry. You want to complain. But to whom? How? What format? Which agency? What's their contact?

You give up. The road stays broken. Democracy fails.

**This is not a technology problem. This is a democracy problem.**

---

## The Solution

Bijak Mengeluh removes the friction between citizen frustration and government action.

**What it does:**
1. You type your rant in casual Indonesian ("Jalan rusak parah anjir 😤")
2. AI translates it to formal bureaucratic language ("Kepada Yth. Bapak/Ibu...")
3. AI finds the exact right agency (Dinas PU Jakarta Selatan, not national ministry)
4. You get their Instagram/Twitter to send it directly

**Result:** Your voice reaches the right desk. Problems get fixed. Democracy works.

---

## Why This Matters

### Democracy is a User Experience Problem

Most civic tech fails because it optimizes for government, not citizens. We flip that:
- **No accounts, no apps, no training** - Just type and go
- **Meets citizens where they are** - Casual language, social media delivery
- **Instant gratification** - See your polite letter in 2 seconds
- **Viral by design** - Instagram Story format drives organic growth

Every form field is a barrier. Every login is a filter. Every "submit ticket" is a test of patience. We remove all of it. Because democracy should be as easy as tweeting.

### From Feedback to Accountability

Current civic platforms are digital suggestion boxes. They collect complaints, generate reports, and hope someone cares. We're building something fundamentally different:

**Transparency as infrastructure:**
- Every complaint is public data showing systemic failures
- 100 complaints about one road → undeniable evidence of neglect
- "1,234 people complained about this" → political pressure that can't be ignored
- Track which agencies respond, which ignore → accountability by default

**The power shift:**
- Traditional model: Citizen → Government (one-way feedback)
- Our model: Citizen → Government → Citizen (collective action)
- Future model: Citizens govern together, government executes

### The Long Game: From Complaints to Co-Governance

This is v2.0. The vision is bigger than fixing potholes.

**Where we are:**
- Remove friction between frustration and action
- 121 agencies, 2-second response time, $7/month

**Where this could go:**
- **Pattern recognition:** Cluster complaints to reveal systemic issues ("80% of Jaksel road complaints = same 3 streets")
- **Consensus building:** Taiwan's Pol.is model—AI finds common ground across thousands of opinions
- **Participatory budgeting:** Barcelona's Decidim—citizens vote on which projects get funded
- **Binding accountability:** Estonia's Rahvaalgatus—10,000 signatures → government must respond
- **Proactive governance:** IoT sensors auto-generate complaints before citizens notice

**The north star:** Transform Indonesia from a representative democracy where you vote once every 5 years, to a participatory democracy where you govern every day.

Not a roadmap. A direction.

---

## The Philosophy

**Bijak Mengeluh** means "Complain Wisely" in Indonesian. But wisdom isn't about being polite. It's about being effective.

This project believes:

**1. Anger is data.**  
Citizen frustration is the most valuable signal in governance. Every complaint is a sensor reading. Every rant is a bug report. Aggregate them, and you have a real-time map of government failure. Ignore them, and you have a broken democracy.

**2. Friction kills democracy.**  
Every form field loses 50% of citizens. Every login is a barrier. Every "create account" is a filter that selects for privilege (time, literacy, patience). Democracy should be as easy as complaining to a friend. If it's not, it's not democracy—it's bureaucracy cosplaying as participation.

**3. Virality is legitimacy.**  
If citizens share it, it matters. If they don't, it doesn't. Traditional civic platforms measure success in "submissions" and "reports." We measure success in Instagram shares and Twitter threads. Because a complaint that goes viral is a complaint that can't be ignored.

**4. Technology serves humans, not the other way around.**  
AI should translate between how citizens think (angry, casual, emotional) and how bureaucracy works (formal, structured, detached). Not force citizens to think like bureaucrats. The goal is not to make citizens better at navigating bureaucracy. The goal is to make bureaucracy irrelevant.

**5. Transparency is the only real accountability.**  
Governments don't respond to complaints. They respond to pressure. Pressure comes from visibility. Make every complaint public. Make every agency's response rate public. Make every pattern public. Sunlight is the best disinfectant. Data is the best weapon.

**6. Small tools, big change.**  
We're not building a "smart city platform" with dashboards and analytics and enterprise features. We're building a tool that does one thing well: turn anger into action. Everything else is distraction. Complexity is the enemy of adoption. Simplicity is the path to revolution.

---

## Current Status

**Production (v2.0):**
- 121 agencies (31 national + 90 DKI Jakarta)
- 100% agency matching accuracy
- <2s response time
- $7-13/mo operating cost

**What's next:** See [ROADMAP.md](./ROADMAP.md) for backlog ideas

---

## For Developers

Built on AWS (Next.js, Lambda, Bedrock, DynamoDB). See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for technical details and [docs/deployment/](./docs/deployment/) for setup.

---

## Documentation

- [ROADMAP.md](./ROADMAP.md) - Product backlog
- [docs/product/research.md](./docs/product/research.md) - Global civic tech analysis
- [CHANGELOG.md](./CHANGELOG.md) - Version history
- [docs/NOTES.md](./docs/NOTES.md) - Development diary

---

## Fun Facts

- **Saved $840/year** by replacing expensive vector search with simple keyword matching (and got better accuracy)
- **Instagram sharing** gets 3x more engagement than copy-paste
- **Most complained about:** Jalan rusak (broken roads) 🛣️
- **Fastest complaint:** 8 words → 247-word formal letter in 1.8 seconds

---

**Made by:** [@okihita](https://github.com/okihita)  
**License:** MIT  
**Complaints welcome:** GitHub Issues

---

*"The best way to predict the future is to build it. The best way to fix your city is to complain about it. Wisely."*
