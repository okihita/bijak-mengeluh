# Bijak Mengeluh 🇮🇩

> Democracy shouldn't require a PhD in bureaucracy.

**Live:** https://bijakmengeluh.id

---

## The Problem

You see a broken road on your commute. You're frustrated. You want to do something. But where do you even start?

Which government agency handles roads? National? Provincial? Local? What's their contact? Do they have email? Should you call? Is there a form somewhere? What information do they need? What's the proper format for a complaint?

So you do what most people do: nothing. The road stays broken. You stay frustrated. Democracy becomes something that happens to you, not something you participate in.

**This isn't a technology problem. It's a friction problem.**

---

## The Solution

Bijak Mengeluh removes every barrier between your frustration and government action.

**Here's how it works:**
1. You type your complaint in everyday Indonesian: *"Jalan rusak parah anjir 😤"*
2. AI rewrites it into something government-appropriate: *"Pak/Bu, jalan di [lokasi] rusak parah, tolong diperbaiki ya 🙏"*
3. AI finds exactly which agency handles it (Dinas PU Jakarta Selatan, not some national ministry)
4. You get their Instagram/Twitter to send it directly as a comment or DM

**The result:** Your voice reaches the right desk. In under 30 seconds. Without creating an account, filling a form, or navigating a phone tree.

---

## Why This Matters

### Making Democracy Feel Natural

Most civic tech asks citizens to adapt to government processes. We flipped that.

Instead of forcing people to navigate bureaucratic workflows, we meet them where they already are: angry, on their phones, wanting immediate action. We take that raw, human frustration and translate it into something that actually works.

No accounts. No apps. No training. Just type and go.

The Instagram Story format isn't a gimmick—it's the point. When something is easy enough to share with friends, it spreads. When it spreads, more people use it. When more people use it, patterns emerge. When patterns emerge, problems get harder to ignore.

### From Noise to Signal

Right now, citizen complaints are scattered across social media, text messages to friends, conversations that go nowhere. They're noise.

What if we could turn that noise into signal?

**Imagine this:**
- 100 people complain about the same pothole through Bijak Mengeluh
- That data becomes visible, undeniable evidence
- "1,234 complaints about Jalan Sudirman" becomes political pressure
- Agency response rates become public metrics
- Citizens can see patterns: which problems are systemic, which agencies respond, which ignore

We're not just helping individuals complain. We're creating collective intelligence about what's actually broken.

### The Long Game

This is v2.0. It does one thing well: turn frustration into clear, actionable feedback that reaches the right people.

But there's a bigger vision here.

**What if complaints could reveal patterns?** Cluster analysis could show that 80% of road complaints in South Jakarta are actually about the same three streets—revealing systemic neglect, not random potholes.

**What if citizens could build consensus together?** Taiwan's Pol.is platform uses AI to find common ground across thousands of opinions. Indonesia could do this too.

**What if citizens voted on budgets?** Barcelona's Decidim lets residents decide which projects get funded. Democracy becomes participatory, not just representative.

**What if the government had to respond?** Estonia's Rahvaalgatus platform requires government response to any petition with 10,000 signatures. Accountability becomes automatic.

**What if problems got flagged before citizens noticed?** IoT sensors could detect infrastructure damage and auto-generate maintenance requests. Prevention beats reaction.

These aren't promises. They're possibilities. Right now, we're focused on removing friction. But the infrastructure we're building—connecting citizens to government in real-time—could become something much bigger.

Not a roadmap. A direction.

---

## The Philosophy

**Bijak Mengeluh** means "Complain Wisely." But wisdom here isn't about being polite. It's about being effective.

Here's what we believe:

**Anger is valuable data.** Every complaint is a sensor reading on government performance. Aggregate them and you get a real-time map of what's actually broken.

**Friction kills participation.** Every form field loses half your users. Every login is a filter that selects for privilege—time, literacy, patience. If civic engagement requires more effort than complaining to a friend, you've already lost.

**Simplicity scales.** We're not building a "smart city platform" with dashboards and enterprise features. We're building one thing that works really well. Everything else is distraction.

**Transparency creates accountability.** Governments respond to visibility. Make complaints public. Make response rates public. Make patterns public. Sunlight remains the best disinfectant.

**Individual action matters.** You don't need an NGO or a lawyer to complain. You don't need to wait for someone to organize you. One person with a phone can send feedback in 30 seconds. Collective action is powerful, but individual action is instant.

**Technology should be invisible.** AI should translate between how humans think (emotional, casual, immediate) and how government communication works (clear, respectful, actionable). The best technology disappears.

---

## Current Status

**In production:**
- 121 agencies mapped (31 national + 90 DKI Jakarta)
- 100% agency matching accuracy
- <2s average response time
- Running on $7-13/month

**Fun facts:**
- Saved $840/year by ditching vector search for keyword matching (and improved accuracy)
- Instagram sharing gets 3x more engagement than copy-paste
- Most complained about: Jalan rusak (broken roads) 🛣️
- Fastest turnaround: 8 words → polished complaint in 1.8 seconds

---

## Get Involved

This works best when more people use it. More complaints = clearer patterns = harder to ignore.

**You can help by:**
- Using it when something's broken in your neighborhood
- Sharing it with friends who love complaining (we all have them)
- Contributing to the codebase—see [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- Adding agencies to our database
- Testing it and breaking it—GitHub Issues welcome
- Translating the concept to your city/country

We're not trying to replace community organizing or activism. We're building infrastructure that makes both easier.

---

## Documentation

- [DEPLOYMENT_PROTOCOL.md](./docs/DEPLOYMENT_PROTOCOL.md) - **Required reading for all contributors**
- [ROADMAP.md](./ROADMAP.md) - What we're thinking about next
- [docs/product/STRATEGIC_INSPIRATION.md](./docs/product/STRATEGIC_INSPIRATION.md) - Global civic tech inspiration
- [docs/product/VOICE_AND_TONE.md](./docs/product/VOICE_AND_TONE.md) - Language and brand guidelines
- [CHANGELOG.md](./CHANGELOG.md) - Version history
- [docs/NOTES.md](./docs/NOTES.md) - Development diary
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Technical deep dive
- [docs/deployment/](./docs/deployment/) - Setup guide

Built on AWS (Next.js, Lambda, Bedrock, DynamoDB). MIT licensed. Fork it, break it, improve it.

---

**Made by:** [@okihita](https://github.com/okihita)  
**Complaints welcome:** [GitHub Issues](https://github.com/okihita/bijak-mengeluh/issues)
**Questions?** Open an issue or reach out

---

*"The best way to predict the future is to build it.
The best way to fix your city is to complain about it.
Wisely."*