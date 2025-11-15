# UX Guidelines: UI/UX Principles, Guardrails, and Patterns

**Document Type:** Contributor Guideline  
**Purpose:** Define UI/UX principles, accessibility standards, and design guardrails  
**Audience:** Developers, designers, AI agents (Amazon Q)  
**Last Updated:** 2025-11-16

---

## Overview

This document serves as the primary knowledge base for building user interfaces in Bijak Mengeluh. It provides:

1. **Guardrails:** Explicit, non-negotiable rules and anti-patterns to prevent unusable, inaccessible, or deceptive UIs
2. **Principles:** Comprehensive library of best practices and user-centered design patterns
3. **Standards:** Mandatory accessibility and usability requirements

**Target Audience:** Human developers, designers, and AI agents (Amazon Q Sonnet 4.5) tasked with generating or reviewing frontend interfaces.

**Core Directive:** Consult and adhere to these principles during all phases of UI development—from initial conception to final implementation and validation.

---

## Preamble: Document Purpose and Agent Directives

* **Objective:** This document serves as the primary knowledge base and rule set for an agentic AI tasked with generating frontend user interfaces. Its purpose is twofold:
  1. **Guardrail:** To provide explicit, non-negotiable rules and anti-patterns to prevent the generation of unusable, inaccessible, or deceptive UIs.
  2. **Inspiration:** To provide a comprehensive library of best practices, modern patterns, and user-centered design principles to guide the generation of effective, high-quality features.
* **Target Agent:** Amazon Q (Sonnet 4.5).
* **Core Directive:** The agent must consult and adhere to the principles, rules, and checklists within this document during all phases of UI generation, from initial conception to final implementation and self-validation.

## Part 1: The Agentic AI Design Mandate: Principles for Human-AI Collaboration

The emergence of agentic AI systems necessitates a paradigm shift in user experience design. Traditional UX principles, which are adequate for static interfaces, are insufficient for this new reality. An agentic AI is not a passive tool but a contextually aware, autonomous entity that acts as a collaborator. The design of the interface is therefore the design of a collaborative relationship. The primary directive is to establish and maintain user trust, which is achieved through a new set of principles grounded in Human-AI Interaction (HAI) research.

### 1.1. The New Paradigm: Goal-Oriented, Not Task-Oriented

* **Core Principle:** The agent's primary function is to understand and execute on a user's *intended outcome*, not merely provide a set of tools for manual *tasks*. In traditional software, users map out each action; in agentic systems, users state a goal, and the agent determines the necessary steps.
* **Agent Rule:** Design must begin by identifying the user's *goal*. The UI generated must facilitate the expression of this goal, often through natural language or multimodal input. The interface is the surface upon which this goal-oriented collaboration occurs.
* **Implementation:** The agent's default stance must be one of proactive assistance, not passivity. The UI should be generated to support this proactive collaboration, anticipating needs rather than only reacting to explicit commands.

### 1.2. Building Trust: The Triad of Transparency, Control, and Explainability

* **Core Principle:** Trust is the foundational requirement for successful Human-AI Interaction. This trust is not assumed; it is built through deliberate, transparent design. Uncertainty in an AI system is, at its core, a trust problem. This trust is built upon three pillars: transparency, user control, and explainability.
* **Transparency:** The user must be able to understand what the AI is doing, how it works, and why it is acting. Transparency is composed of three key elements:
  * **Visibility (The "What"):** The agent's work must be made visible. Use clear visuals, status indicators, and logging to show the user what is happening behind the scenes.
  * **Explainability (The "Why"):** The system must proactively clarify *why* it made a certain decision or recommendation. This is a non-negotiable component of a trustworthy agentic system.
    * **Agent Rule:** For any non-trivial, AI-driven action or recommendation, the agent MUST generate an affordance (e.g., a "Why this recommendation?" link, a tooltip) that provides a simple, concise explanation for its rationale.
  * **Accountability (The "How to Fix"):** Users must be able to understand and influence the outcomes. This is achieved by linking transparency to user control and feedback mechanisms.
* **User Control & Interruptibility:** Autonomy does not mean a loss of user control.
  * **Agent Rule:** The user MUST be able to interrupt, correct, customize, or undo an agent's actions at any time. The UI must provide clear "emergency exits" for all AI-driven processes, supporting undo and redo.
  * **Adaptive Control:** The agent must provide global controls (see Guideline 17). This allows the user to *personalize* the level of AI autonomy, specifying preferences for how the agent behaves (e.g., "Always ask before acting," "Act and inform me").

### 1.3. Mandatory Framework 1: Microsoft's 18 Guidelines for Human-AI Interaction (HAI)

* **Core Principle:** This is an evidence-based, validated framework derived from over two decades of research, designed to guide the creation of human-facing AI applications. The guidelines are structured to provide best practices throughout the user's experience: initially, during interaction, when the AI is wrong, and over time.
* **Agent Directive:** The agent's generated UI and interaction behaviors MUST be validated against these 18 guidelines. They serve as a primary checklist for successful HAI design.

**Table 1.3: Microsoft HAI Guidelines Implementation Checklist**

| Guideline Category | Guideline \# | Guideline Name | Agent Implementation Rule (Derived) |
| :---- | :---- | :---- | :---- |
| **Initially** | 1 | Make clear what the system can do. | Generated UI must include onboarding, empty states, or helper text that clearly scopes capabilities (e.g., "I can generate React components, but I cannot configure your CI/CD pipeline."). |
| **Initially** | 2 | Make clear how well the system can do what it can do. | Generated UI must set accurate expectations about reliability and confidence (e.g., "This code is a draft, please review it for errors."). |
| **During Interaction** | 3 | Time services based on context. | Do not proactively interrupt a user in a high-focus task (e.g., typing code or text). Time interventions for natural pauses. |
| **During Interaction** | 4 | Show contextually relevant information. | The UI must display information relevant to the *current* user task and environment. |
| **During Interaction** | 5 | Match relevant social norms. | Language, tone, and interaction style must be context-appropriate (e.g., professional for a business app, encouraging for an educational app). |
| **During Interaction** | 6 | Mitigate social biases. | Generated content (text, images, data representations) must be actively checked to avoid reinforcing undesirable stereotypes. |
| **When Wrong** | 7 | Support efficient invocation. | (Agent-specific: Ensure the user can easily and naturally call the agent's assistance). |
| **When Wrong** | 8 | Support efficient dismissal. | The user MUST be able to easily close, ignore, or dismiss the agent's UI/suggestions without friction. |
| **When Wrong** | 9 | Support efficient correction. | The UI must make it simple to edit, reject, or refine an AI-generated suggestion. |
| **When Wrong** | 10 | Scope services when in doubt. | When user intent is ambiguous, the agent must ask clarifying questions, not make a low-confidence guess. |
| **When Wrong** | 11 | Make clear why the system did what it did. | This maps directly to Explainability. The agent MUST provide a "why" affordance for its actions. |
| **Over Time** | 12 | Remember recent interactions. | The agent MUST maintain memory across sessions to provide personalized, long-term value and avoid repeating questions. |
| **Over Time** | 13 | Learn from user behavior. | The agent must adapt to user preferences and corrections over time. |
| **Over Time** | 14 | Update and adapt cautiously. | Limit disruptive changes to the UI or agent behavior. Major changes should be opt-in or clearly communicated. |
| **Over Time** | 15 | Encourage granular feedback. | The UI MUST include mechanisms for users to provide specific feedback (e.g., thumbs up/down, "this is wrong"). |
| **Over Time** | 16 | Convey the consequences of user actions. | The UI must immediately show how a user's feedback or correction will impact future AI behavior (e.g., "Got it. I won't suggest that again."). |
| **Over Time** | 17 | Provide global controls. | The UI MUST have a settings area where the user can globally customize what the AI monitors and how it behaves. |
| **Over Time** | 18 | Notify users about changes. | Explicitly inform users when the AI's capabilities are updated or new features are added. |

### 1.4. Mandatory Framework 2: Google's People \+ AI Research (PAIR) Guidebook

* **Core Principle:** A human-centered, multidisciplinary, and evolving collection of practical guidance for designing AI products. The framework emphasizes a participatory approach and has been updated to address the specific challenges of generative AI.
* **Key Chapters for Agent Focus:** The agent must prioritize the principles from the PAIR chapters, which are designed to build human-centered AI products:
  1. **Trust & Explanations:** Focus on helping users build and calibrate their trust in the AI's capabilities.
  2. **Feedback & Controls:** Design mechanisms that not only improve the AI model but also enhance the immediate user experience.
  3. **Errors & Graceful Failures:** Create strategies to diagnose, manage, and recover from errors originating from the AI system.
* **Agent Rule (Feedback):** Feedback is not just a UI element; it is a *learning loop*. It is the mechanism by which the AI model learns from its mistakes and improves over time, similar to backpropagation in machine learning. The UI generated for feedback must be:
  * **Actionable:** Ask questions that can *actually* be used to improve the model. Feedback options should be unambiguous and mutually exclusive (e.g., "thumbs up/down" is clear; "meh" is not actionable).
  * **Communicative:** Acknowledge that feedback has been received. Set clear expectations for *how* and *when* that feedback will improve the user's experience.
  * **Controllable:** Allow users to easily opt-out of giving feedback. Do not make it a prerequisite for task completion.

The convergence of Microsoft's 14 and Google's 19 frameworks, alongside specialized agentic design principles 2, highlights a fundamental shift in design thinking. Traditional UX was focused on making a *tool* usable by a single agent (the human). Agentic UX, however, must design for an interaction between *two* agents (the human and the AI). This new relationship requires communication protocols to establish and maintain trust, just as in human-human collaboration. Principles like "Make clear why the system did what it did" 18 and "Trust & Explanations" 19 are not optional features; they are the core of the agentic interface, manifesting the protocols of this new collaborative partnership.

## Part 2: Foundational Principles of Human Usability and Perception

This section codifies the "physics" of human-computer interaction. These principles are not new trends; they are research-based, immutable laws derived from decades of HCI research. The agent must treat these axioms as the governing logic for all generated user interfaces.

### 2.1. Axiom Set 1: Nielsen's 10 Usability Heuristics

* **Core Principle:** A set of 10 "rules of thumb" for interaction design, developed by Jakob Nielsen and Rolf Molich. They are not specific guidelines but broad principles derived from a factor analysis of 249 usability problems. They are the most widely used and effective "broad rules of thumb" for usability evaluation.
* **Agent Directive:** These abstract heuristics must be translated into concrete, evaluatable, and actionable rules that govern UI generation and validation.

**Table 2.1: Heuristic-to-Agent-Rule Translation Matrix**

| Heuristic | Principle | Agent Implementation Rule (Guardrail) |
| :---- | :---- | :---- |
| **1\. Visibility of system status** | Keep users informed about what is going on, through appropriate feedback within a reasonable time. | All actions that are not instantaneous ($\>$ 100ms) MUST provide appropriate feedback (e.g., spinner, progress bar, skeleton screen). All selected/active states MUST be visually distinct from their default state.. |
| **2\. Match system and real world** | Speak the user's language, with words, phrases and concepts familiar to the user, rather than system-oriented terms. | Generated text MUST avoid system-oriented terms (e.g., "null pointer exception," "API error 503"). Use plain, familiar language (e.g., "We couldn't load your contacts," "The service is temporarily unavailable.").. |
| **3\. User control and freedom** | Users often choose system functions by mistake and will need a clearly marked "emergency exit". Support undo and redo. | All actions that create, delete, or modify data MUST have an "undo" option. All modal dialogs or new views MUST have a clear and obvious "Cancel" or "Close" action. |
| **4\. Consistency and standards** | Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform conventions. | Before generating a new component, the agent MUST query the existing project's design system/styles. Generated components MUST be visually and functionally consistent with existing components (e.g., same button styles, same terminology). |
| **5\. Error prevention** | Even better than good error messages is a careful design which prevents a problem from occurring in the first place. | Use constraints and good defaults. (e.g., Disable the "Submit" button until all required fields are filled). Provide confirmation dialogs for destructive actions.. |
| **6\. Recognition rather than recall** | Minimize the user's memory load by making objects, actions, and options visible. | Do not require users to remember information from a previous screen. All necessary context MUST be visible. (e.g., In a multi-step form, show a summary of previously entered information).. |
| **7\. Flexibility and efficiency of use** | Accelerators—unseen by the novice user—may often speed up the interaction for the expert user. | Provide keyboard shortcuts for frequent actions. Allow frequent users to customize or accelerate common tasks. |
| **8\. Aesthetic and minimalist design** | Dialogues should not contain information which is irrelevant or rarely needed. | Every element in the UI must have a clear purpose. Avoid visual clutter; prioritize content. Extraneous information acts as noise and reduces the visibility of important information.. |
| **9\. Help users... recover from errors** | Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution. | Generated error messages MUST be constructive. **BAD:** "Invalid Input." **GOOD:** "Please enter a valid email address in the format 'example@email.com'.". |
| **10\. Help and documentation** | Even though it is better if the system can be used without documentation, it may be necessary to provide help. | If a feature or workflow is complex, the agent MUST generate a contextual help icon (e.g., a tooltip or popover) that provides focused, task-relevant information.. |

### 2.2. Axiom Set 2: Shneiderman's 8 Golden Rules of Interface Design

* **Core Principle:** A set of design principles proposed by Ben Shneiderman, a foundational American computer scientist, derived from experience and refined over decades. These rules heavily overlap with and reinforce Nielsen's heuristics, providing a robust framework for user-friendly design.
* **Key Reinforcements for the Agent:**
  * **Strive for Consistency:** This is the most critical rule for an agent. It demands that identical terminology be used in prompts and menus, and that layouts, colors, and fonts be consistent. This implies a "query-first" approach for the agent: *always* check for existing patterns and design systems before generating new ones.
  * **Offer Informative Feedback:** This rule aligns with "Visibility of system status". It adds a layer of nuance: for frequent or minor actions, feedback should be subtle (e.g., a small animation); for infrequent or major actions (e.g., deletion), feedback should be substantial.
  * **Design Dialog to Yield Closure:** This principle dictates that all user-initiated flows must end with clear feedback (e.g., a "Success\!" message, a validation summary). This "closes the loop" and reduces user anxiety by signaling task completion.
  * **Permit Easy Reversal of Actions:** This directly reinforces "User control and freedom". Designing for reversibility (e.g., "undo") reduces user anxiety and encourages exploration of unfamiliar options.
  * **Support Internal Locus of Control:** Users must feel they are the initiators of actions, not that the system is responding unpredictably.
    * **Agent Rule:** Do not perform actions automatically *without* a clear, user-initiated confirmation (e.g., a "Submit" button). This connects directly to HAI guidelines on user control and predictability.
  * **Reduce Short-Term Memory Load:** This reinforces "Recognition not recall". Humans have a limited capacity for short-term information processing (historically cited as $7 \\pm 2$ chunks). The UI must not force users to re-enter information or remember data from other parts of the interface.

### 2.3. Perceptual Laws: Implementing Gestalt Principles

* **Core Principle:** Gestalt principles of visual perception describe how humans instinctively group and organize visual information into a meaningful whole. These laws are the *psychological basis* for why good layouts feel "intuitive". The agent must use these principles as its core layout algorithm to ensure generated UIs are perceptually sound.
* **Key Principles as Agent Rules:**
  * **Proximity:** Elements that are close to each other are perceived as a group.
    * **Agent Rule:** Related items (e.g., a form label and its input, a product image and its "Buy" button) MUST be placed in close proximity. Unrelated items MUST be separated by ample whitespace. This is non-negotiable for creating logical groups.
  * **Similarity:** Elements that share visual characteristics (e.g., shape, color, size) are perceived as related or part of the same group.
    * **Agent Rule:** All elements with the same function (e.g., all primary call-to-action buttons, all help links) MUST be visually similar. Conversely, elements with *different* functions MUST be visually distinct.
  * **Common Region (Enclosure):** Elements enclosed within a boundary (e.g., a card, a box, a shaded background) are perceived as a group, separate from elements outside the boundary.
    * **Agent Rule:** Use enclosure (e.g., a \<fieldset\> with a legend, a styled \<div\> card) to visually group complex, related sets of information (e.g., "Billing Address" fields).
  * **Figure-Ground:** Humans perceive elements as either the *figure* (the focal point) or the *ground* (the background).
    * **Agent Rule:** Use visual hierarchy (contrast, color, size, focus, blur) to make the primary element (the *figure*) stand out from the background. This is the core principle behind modal dialogs, where the modal is the figure and the rest of the app becomes the ground.
  * **Continuity:** The human eye naturally follows lines, curves, or a sequence of shapes.
    * **Agent Rule:** Align elements in a natural reading order (left-to-right and top-to-bottom for Western languages) to create a clear, continuous visual path for the user to follow.
  * **Closure:** The brain automatically fills in missing parts to perceive a complete, familiar image.
    * **Agent Rule:** This principle allows for minimalist design. An icon or a partial border can be used effectively, as the user's brain will complete the shape, reducing visual clutter.

The Gestalt principles are not merely academic; they are the bridge between the abstract heuristics (from Nielsen and Shneiderman) and the concrete implementation of UI components. They provide the perceptual *mechanism* for *how* to fulfill the heuristics. For instance, Nielsen's heuristic "Consistency and standards" 28 is perceptually implemented via the Gestalt principle of "Similarity". Shneiderman's rule "Reduce short-term memory load" 32 is implemented via the Gestalt principle of "Proximity" 35; by grouping related items, the UI creates a single "chunk" of information, reducing the cognitive load from (e.g.) six separate fields to one logical group. The agent's layout logic must be fundamentally based on these perceptual laws.

## Part 3: Guardrails: A Compendium of UI/UX Anti-Patterns and Pitfalls

This section serves as a "blacklist" of design patterns and practices. The agent is explicitly forbidden from implementing these patterns. They are known to cause user confusion, frustration, and distrust, or are actively deceptive.

### 3.1. Prohibited: Deceptive "Dark Patterns"

* **Core Principle:** Dark patterns are interfaces *intentionally designed* to trick, mislead, or manipulate users into taking actions they would not otherwise take. These patterns are unethical, prioritize short-term business goals at the user's expense 42, and exploit human psychology.
* **Agent Directive:** The agent is PROHIBITED from generating any UI that matches these patterns. They are a severe violation of user trust 41 and may carry legal consequences.

**Table 3.1: Dark Pattern Prohibition List**

| Dark Pattern | Description | Agent Guardrail (PROHIBITED) |
| :---- | :---- | :---- |
| **Roach Motel / Subscription Trap** | Making it easy to get into a situation (e.g., sign up, subscribe), but disproportionately difficult to get out of (e.g., cancel). | The "Cancel Subscription" or "Delete Account" action MUST be as easy to find and execute as the "Sign Up" or "Create Account" action. It must not be hidden behind chatbots or support calls. |
| **Sneak into Basket** | Adding extra items, services, or hidden charges to a user's cart without their explicit consent or action. | The agent MUST NOT add any item, service, or fee to a user's cart. Only a direct, user-initiated "Add to Cart" action can do this. |
| **Misdirection** | Using visual design (e.g., a bright, large primary button) to guide the user *away* from the action they likely want, and toward the business's preferred action. | The primary, most prominent button MUST correspond to the user's most likely *desired* action (e.g., "Confirm Cancellation"), not the reverse (e.g., making "I don't want to cancel" the primary button). |
| **False Urgency** | Lying about scarcity or time limits to rush a decision (e.g., "Only 2 left in stock\!" when untrue; a countdown timer that resets). | The agent MUST NOT generate any text or UI related to scarcity or time limits unless it is verifiably true and passed as live data from a trusted source. |
| **Confirmshaming** | Using manipulative language in an opt-out action to guilt the user into reconsidering (e.g., "No thanks, I'd rather spend more"). | All opt-out or decline links/buttons MUST use neutral, descriptive language (e.g., "No, thank you," "Continue without subscribing"). |
| **Forced Action** | Requiring a user to perform an unrelated action to access a desired feature (e.g., forcing app download Y to use app X). | The agent MUST NOT gate a primary feature behind an unrelated, non-essential action like subscribing to a newsletter or downloading another app. |
| **Hidden Costs / Hidden Info** | Hiding critical information (like costs, fees, or terms) until the final step, or hiding it in low-contrast, small text. | All costs, fees, and critical terms MUST be disclosed transparently and early in the process. Information MUST adhere to accessibility contrast rules.. |

### 3.2. Avoid: Patterns That Cause Cognitive Overload

* **Core Principle:** Cognitive overload occurs when the user's brain is given too much information to process at once, overwhelming their working memory. This leads to frustration, decision paralysis, errors, and task abandonment.
* **Agent Rules to Prevent Overload:**
  * **Simplify and Prioritize:** The agent MUST avoid clutter. Focus on providing only the necessary information for the current task. Prioritize essential information, displaying it most prominently, while secondary information can be placed in less prominent positions.
  * **Chunk Information:** Do not present complex information in a single, monolithic block. The agent must break down information into smaller, digestible "chunks" (e.g., using cards, lists, or steps) to reduce mental effort.
  * **Use Progressive Disclosure:** Hide advanced or secondary options until they are needed. The agent should use collapsible sections, "Advanced Settings" toggles, or pull-out menus to reveal information gradually, allowing users to focus on their goals without being overwhelmed.
  * **Eliminate Redundancy:** The agent must audit generated content for repetitive elements or unnecessary steps. Every step a user has to take, no matter how small, adds to the cognitive load.
  * **Use Clear Hierarchy:** The agent must use strong visual hierarchy (e.g., font size, color, white space) to guide the user's eye to the most important task or information first.
  * **Use Familiar Patterns:** Do not "reinvent the wheel" for common interactions. Using familiar UI patterns (e.g., a top-right shopping cart icon, a top-left logo linking home) reduces the learning curve and streamlines interactions.

### 3.3. Avoid: Common UI Anti-Patterns

* **Core Principle:** These are common, sub-optimal solutions to design problems that are known to create usability issues. While not always intentionally deceptive, they are a product of poor design.
* **Agent Rules to Avoid Anti-Patterns:**
  * **Avoid "Hide and Hover":** Do not hide primary actions (like "Edit" or "Delete") behind a hover state. This pattern fails on touch devices (which have no hover state) 51 and severely damages discoverability, forcing the user to "explore the interface with his or her mouse" to find available actions.
  * **Avoid "Pogo Stick Navigation":** Do not create flows that require the user to go "down" into a detail page and immediately "up" to the list to select the next item, and repeat. This is highly inefficient. (See Part 4. for data table patterns like "Quick View" 53 that solve this anti-pattern).
  * **Avoid Inconsistent Design:** This is a violation of Nielsen's/Shneiderman's core rule. The agent MUST NOT use different fonts, colors, button styles, or terminology for the same functional element across different pages.
  * **Avoid "Rocket Science":** Do not use an overly complex or "creative" solution for a simple problem. Forcing a novel interaction (e.g., drag-and-drop) for a simple task (e.g., selecting an option) is more confusing and less efficient than a standard UI control.

## Part 4: The Implementation Blueprint: Component-Level Design Rules

This section provides granular, actionable rules for generating the most common (and most complex) UI components. Adherence to these rules is critical for ensuring usability and consistency.

### 4.1. Forms: Interaction, Validation, and Feedback

* **Core Principle:** Forms are a critical point of interaction, often representing a "conversation" with the user. They must be clear, efficient, and designed to prevent errors before they happen.
* **Agent Rules for Form Generation:**
  * **Layout:**
    * **Single Column:** Default to a single-column layout for forms. This is easier for users to scan and is inherently more responsive on mobile devices.
    * **Group Related Fields:** Use logical groupings (e.g., a \<fieldset\> with a \<legend\>) to batch related information (e.g., "Personal Details," "Shipping Address"). This aligns with Gestalt's "Common Region" principle.
  * **Labels:**
    * **Always Use \<label\>:** Every form input MUST have an associated, programmatically-linked \<label\> tag. This is non-negotiable for accessibility.
    * **Labels Outside Fields:** Labels MUST be placed outside the input field (e.g., above the field).
    * **PROHIBITION: Do Not Use Placeholder as Label:** Do not use placeholder text as the only label. The placeholder disappears on focus, forcing the user to rely on short-term memory (violating "Recognition not recall"). Placeholders are for *examples* or *hints* (e.g., "e.g., example@email.com"), not primary labels.
  * **Validation:**
    * **Inline Validation:** Validation MUST be performed inline, "just in time" (e.g., after the user moves out of the field, or "on blur"). Do not wait until the user clicks "Submit" to show all errors at once.
    * **Clear, Constructive Errors:** Error messages MUST be displayed adjacent to the field being validated. They must use a clear color (red), an icon, and, most importantly, explain *how to fix* the error in plain language.
    * **Disable Submit Button:** As a valid form of error prevention 28, the primary submit button SHOULD be disabled (in a visually distinct "disabled" state) until all required fields are validly filled.
  * **Buttons:**
    * **Clear CTAs:** Button text must be descriptive and action-based (e.g., "Create Account," "Save Changes"), not generic (e.g., "Submit").
    * **Differentiate Actions:** The primary, "happy path" action (e.g., "Save") MUST be visually distinct (e.g., a solid-fill primary color) from secondary actions (e.g., "Cancel," which should be a ghost button or a link).

### 4.2. Data Tables: Readability, Action, and Complexity

* **Core Principle:** Data tables are for scanning, comparing, and acting on complex datasets. The primary design goals must be scannability, readability, and efficiency.
* **Agent Rules for Data Table Generation:**
  * **Alignment (Algorithm):**
    * **Text/Qualitative Data:** MUST be left-aligned (e.g., names, descriptions).
    * **Numeric/Quantitative Data:** MUST be right-aligned (e.g., prices, counts, percentages). This aligns decimals and unit-places for easy comparison.
    * **Headers:** Header text (\<th\>) MUST match the alignment of their column content.
    * **PROHIBITION:** Do not use center alignment for data cells. It creates "ragged" edges on both sides, which is very difficult to scan.
  * **Readability:**
    * **Sticky Headers:** For tables that scroll vertically, the table header (\<thead\>) MUST be fixed ("sticky") to the top of the viewport. This maintains context so users don't forget what column they are looking at.
    * **Row Style:** For tables with many rows and columns, use "Zebra Striping" (alternating row colors) to help the user's eye track across long horizontal distances. Avoid this pattern for small tables, as users may incorrectly ascribe meaning to the highlighted rows.
    * **Display Density:** For enterprise applications, provide a control that allows users to adjust the row density (e.g., "Comfortable," "Compact").
  * **Horizontal Overflow:**
    * **Sticky First Column:** For wide tables that scroll horizontally, the first column (containing the primary identifier, e.g., "Name" or "ID") MUST be fixed ("sticky"). This provides a constant anchor for comparison.
    * **Column Customization:** Provide a mechanism for users to show, hide, and reorder columns. This allows users to reduce complexity and see only the data essential to their task.
  * **Actions & Editing:**
    * **Avoid Modals-on-Modals:** If a data table is already being displayed *inside* a modal, do NOT trigger a *second* modal for editing a row. This is a severe usability trap.
    * **Inline Editing:** For simple edits, use inline editing to allow users to change data directly in the table, preventing context loss.
    * **Row-to-Detail / Quick View:** To avoid the "Pogo Stick" anti-pattern 52, clicking a row should not navigate to an entirely new page. Instead, use an expandable row 53, a "Quick View" modal/slide-in panel 53, or a master-detail view. This keeps the user in the context of the main table.

### 4.3. Modals and Interruptions: Use and Alternatives

* **Core Principle:** Modals (or dialog windows) are *interruptive* by nature. They are a "heavy" pattern that blocks the user's primary workflow. They must be used sparingly, deliberately, and correctly.
* **Agent Rules for Modal Generation:**
  * **When to Use:** A modal is ONLY appropriate for:
    1. **Blocking Confirmation:** For critical, destructive, or irreversible actions that require the user's full attention (e.g., "Are you sure you want to permanently delete this item?").
    2. **Brief, Focused Tasks:** For simple user input that must be gathered before continuing (e.g., "Create new folder," "Sign in").
  * **PROHIBITION (When NOT to Use):**
    * Do NOT use modals for non-critical information or simple notifications (e.g., "Welcome\!"). Use a non-modal "toast" or "slide-in panel" (also called a "drawer").
    * Do NOT use modals for complex forms or tasks (e.g., a multi-step form). Use a dedicated page, which is easier to navigate and manage.
    * Do NOT auto-trigger modals (e.g., "Sign up for our newsletter\!" on page load). Modals must be user-initiated.
    * Do NOT use modals on mobile devices unless absolutely necessary (e.g., system permissions). They are a poor mobile experience due to limited screen space; a dedicated view is almost always better.
  * **Anatomy:**
    * **Descriptive Title:** Must have a clear, descriptive header that states the modal's purpose.
    * **Clear Exit:** Must have an obvious "Close" button (e.g., an X in the top corner) AND MUST close when the Escape key is pressed. Clicking the background overlay should also close it (unless the action is critical).
    * **Trapped Focus:** Keyboard focus MUST be trapped *within* the modal. Tabbing must cycle only through the modal's interactive elements until it is closed. (See Part 5.3).

### 4.4. Data Visualization: Dashboards and Charts

* **Core Principle:** The purpose of data visualization is to tell a story and provide clear, scannable insights, not just to show numbers. The design must make complex data understandable at a glance.
* **Agent Rules for Data Visualization:**
  * **Choose the Right Chart:** The agent must select the correct chart type for the data's purpose. Using the wrong chart (e.g., a pie chart for data over time) is a common, critical error.

**Table 4.4: Data Visualization Chart Selection Matrix**

| Chart Type | Usage | Baseline Value |
| :---- | :---- | :---- |
| **Line Chart** | To express minor variations in data; show trends over time. | Any value. |
| **Bar Chart** | To express larger variations; comparisons and ranking of discrete categories. | Must be Zero. (Starting a bar chart at a non-zero value is deceptive). |
| **Area Chart** | To summarize relationships; show how individual parts relate to a whole over time. | Zero (if multiple series). |
| **Pie/Donut Chart** | To show parts of a whole (proportions) at a single point in time. (Avoid if more than \~5 slices). | N/A |

\*   \*\*Clarity and Simplicity:\*\*
    \*   \*\*PROHIBITION:\*\* Do not use 3D charts. They distort perception and make data harder to read.
    \*   \*\*Use Color Intentionally:\*\* Use color to highlight key data points or to differentiate categories, not for decoration.\[73, 75\] Be consistent with color choices (e.g., "Sales" is always blue).\[76\]
    \*   \*\*Clear Labels:\*\* All charts MUST have a clear title, axis labels, and a legend (unless the data is directly labeled).\[72, 75\] Text must be horizontal for readability.
\*   \*\*Dashboard Layout:\*\*
    \*   \*\*Prioritize (Information Architecture):\*\* Place the most important, high-level KPIs and metrics at the top-left (for LTR languages), as this is where users look first.\[74\]
    \*   \*\*Use a Grid:\*\* Organize the dashboard on a consistent grid to create a clean, organized, and scannable layout.\[74\]
    \*   \*\*Provide Context:\*\* A number ("15.7%") is meaningless. Provide context through comparison (e.g., "vs. last month," "target is 20%").

## Part 5: The Accessibility (A11y) Mandate: Non-Negotiable Implementation Standards

This section defines the core, non-negotiable standards for making all generated UI accessible to all users, including those with disabilities. This is a legal and ethical requirement. All generated code MUST follow the Web Content Accessibility Guidelines (WCAG) 2. Level AA standard as the baseline. Accessibility is not a feature; it is a prerequisite for all other work.

### 5.1. Foundation: Semantic HTML First

* **Core Principle:** Use the right HTML element for the right job. Correct, semantic HTML is the *foundation* of accessibility. The browser provides built-in accessibility (like keyboard navigation and screen reader roles) for free when semantic elements are used correctly.
* **Agent Rules for HTML Generation:**
  * **Structure:**
    * Use landmark elements (\<nav\>, \<main\>, \<header\>, \<footer\>, \<aside\>) to define page regions.
    * Use \<h1\>-\<h6\> for all headings. Headings MUST be used in logical, nested order (e.g., do not skip from an \<h2\> to an \<h4\>). Do not use headings for styling text.
    * Use \<ul\>, \<ol\>, and \<dl\> for all lists. Do not use \<div\>s or \<p\> tags with bullet point characters.
  * **Text:**
    * Use \<p\> for paragraphs.
    * Use \<strong\> or \<em\> to convey semantic emphasis. Do not use \<b\> or \<i\> (which are for styling only).
    * Use \<blockquote\> for pull quotes, not as a tool for visual indentation.
  * **Interaction:**
    * Use \<button\> for all elements that perform an *action* on the page (e.g., submit a form, open a modal, play a video).
    * Use \<a\> (anchor) for all elements that *navigate* to another page or an on-page anchor.
    * **PROHIBITION:** Do NOT use generic elements like \<div\> or \<span\> with a click handler to create a button. If this is unavoidable (e.g., a complex custom component), see Part 5. on ARIA.
  * **Images:**
    * All \<img\> elements MUST have an alt attribute.
    * If the image is purely decorative, use alt="".
    * If the image conveys information, the alt text MUST describe that information succinctly and equivalently.
  * **Tables:**
    * MUST use \<table\>, \<thead\>, \<tbody\>, \<tr\>, \<th\>, and \<td\> for all tabular data.
    * All \<th\> (header) cells MUST have a scope attribute (scope="col" or scope="row") to programmatically associate them with their data cells.
    * MUST use a \<caption\> tag to describe the table's contents.

### 5.2. Operability: Keyboard-Only Navigation

* **Core Principle:** All functionality must be operable via keyboard alone. This is essential for users with motor disabilities who cannot use a mouse, as well as power users. This is a critical part of the WCAG "Operable" principle.
* **Agent Rules for Keyboard Interaction:**
  * **Focusability:** All interactive elements (links, buttons, form inputs) MUST be keyboard-focusable. If a custom, non-semantic element (like a \<div\> button) is created, it MUST be given tabindex="0" to be included in the tab order.
  * **Visible Focus:** A highly visible focus indicator (e.g., an outline) MUST *always* be present on the currently focused element. **PROHIBITION:** Do NOT remove this (e.g., outline: none;). (WCAG 2.4.7)
  * **Logical Order:** The Tab order MUST follow the visual, logical flow of the page (e.g., LTR, top-to-bottom).
  * **No Keyboard Traps:** Focus MUST NOT be "trapped" in a component, preventing the user from navigating away. The *only* exception is a modal dialog, from which the Esc key MUST provide an escape.
  * **"Skip to Main Content" Link:** For all pages with global navigation, the agent MUST generate a "Skip to Main Content" link as the very first focusable item on the page.
  * **Interaction Model:**

**Table 5.2: Keyboard Interaction Model**

| Component | Keystrokes |
| :---- | :---- |
| **Link** | Enter to activate. |
| **Button** | Enter or Spacebar to activate. |
| **Checkbox** | Spacebar to check/uncheck. |
| **Radio Group** | Spacebar to select. ↑/↓/←/→ to navigate between options. Tab to leave the group. |
| **Select (Dropdown)** | Spaceka or ↑/↓ to expand. Enter or Esc to select option and collapse. ↑/↓ to navigate options. |
| **Dialog (Modal)** | Esc to close. |
| **Slider** | ↑/↓/←/→ to increase or decrease value. Home/End to go to beginning or end. |
| **Autocomplete** | ↑/↓ to navigate options. Enter to select option. |

### 5.3. Enhancement: ARIA (Accessible Rich Internet Applications)

* **Core Principle:** ARIA adds semantic meaning to elements and components that do not natively exist in HTML, making complex, custom "widgets" (like tabs, carousels, or custom dropdowns) accessible. It is a *patch* to enhance accessibility, not a replacement for good semantic HTML.
* The 5 Rules of ARIA (Agent Directives) 89:
  1. **Rule 1: Don't use ARIA.**. If a semantic HTML element exists (\<button\>, \<nav\>, \<input type="checkbox"\>), USE IT. It has all accessibility built-in.
  2. **Rule 2: Don't add (unnecessary) ARIA to HTML.**. Do not add role="button" to a \<button\> element. It's redundant and adds noise.
  3. **Rule 3: Always support keyboard navigation.**. Any custom element with an ARIA role (e.g., \<div role="button"\>) *must* be fully keyboard-operable (see Table 5.2).
  4. **Rule 4: Don't hide focusable elements.**. Do not use role="presentation" or aria-hidden="true" on an element that is focusable (e.g., has tabindex="0").
  5. **Rule 5: Use accessible names for interactive elements.**. An interactive element must have a name screen readers can announce.
* **Key ARIA Implementation Rules:**
  * **Accessible Names:** For an icon-only button, an accessible name MUST be provided. The best method is aria-label.
    * **Example:** \<button aria-label="Close window"\>\<svg\>...\</svg\>\</button\>.
  * **Live Regions (Dynamic Content):** To announce dynamic content (like status updates, chat messages, or form errors) to screen readers, use aria-live.

**Table 5.3: ARIA Live Region Attributes**

| Attribute | Purpose | Agent Use Case |
| :---- | :---- | :---- |
| aria-live="polite" | Announces updates only when the screen reader is idle. Does not interrupt. | Non-critical notifications, new chat messages, "Item added to cart" status. |
| aria-live="assertive" | Announces updates immediately, interrupting the user. | Critical error messages, system-down alerts, session timeout warnings. Use very sparingly. |
| aria-atomic="true" | Ensures the *entire* region is read, not just the part that changed. | Announcing a full summary or status update (e.g., "3 search results found"). |

\*   \*\*Widget Roles:\*\* For complex components, use the WAI-ARIA design patterns (e.g., \`role="tablist"\`, \`role="tabpanel"\`, \`role="tooltip"\`) and all associated states and properties (\`aria-selected\`, \`aria-expanded\`).\[81, 92\]

### 5.4. Perceivability: Color, Contrast, and Sizing

* **Core Principle:** Content must be perceivable to all users, including those with low vision or color vision deficiencies. This is primarily governed by color contrast and text size.
* **Agent Rules for Color and Text (NON-NEGOTIABLE):**
  * **PROHIBITION (Color):** Color MUST NOT be the *only* way to convey information, indicate an action, or prompt a response. (e.g., for an error, use an icon and supporting text, not just a red border).
  * **Contrast Ratios (WCAG AA):**

**Table 5.4: WCAG 2. AA Contrast Requirements**

| Element Type | Definition | Required Ratio |
| :---- | :---- | :---- |
| **Normal Text** | \< 18pt (typically 24px) OR \< 14pt (typically 18.66px) and bold | **4.5:1** |
| **Large Text** | $\\ge$ 18pt (typically 24px) OR $\\ge$ 14pt (typically 18.66px) and bold | **3:1** |
| **UI Components / Graphics** | Icons, borders, focus indicators, parts of charts. | **3:1** 95 |
| **Incidental / Logotypes** | Text that is part of a logo, is pure decoration, or is on an inactive (disabled) component. | **None** 96 |

\*   \*\*Resize Text (WCAG AA):\*\* The page MUST be readable and fully functional when text is resized by the user up to 200%. This means the agent MUST use responsive units (e.g., \`rem\`, \`em\`) for text and layout. Do not use fixed \`px\` values for font sizes.
\*   \*\*Reflow (WCAG AA):\*\* Content must reflow into a single, usable column without requiring horizontal scrolling at a viewport width of 320px. This is a core rule for responsive, mobile-friendly design.
\*   \*\*Text Spacing (WCAG AA):\*\* Users must be able to adjust text spacing to (at least) 1. line height, 2x paragraph spacing, 0.12em letter spacing, and 0.16em word spacing without loss of content or functionality. Layouts must be robust enough to handle this.

## Part 6: Designing for the Full Experience: States, Flows, and Modern Patterns

This section moves beyond static components and atomic rules to address the dynamic, "living" nature of an interface. It provides the "inspiration" for creating rich, modern, and complete experiences.

### 6.1. The "State Problem": Designing Beyond the Happy Path

* **Core Principle:** A common failure in design is to only create the "happy path" or default state.100 This leaves developers guessing about other states, leading to an inconsistent and fragile UI. A robust component is defined by how it handles *all* its possible states: loading, empty, error, disabled, etc..
* **Agent Directive:** When generating any interactive component, the agent MUST define styles and behaviors for all applicable states.

**Table 6.1: Component State Design Matrix**

| State | Purpose | Visual / Behavioral Rule |
| :---- | :---- | :---- |
| **Default (Enabled)** | The component is interactive and in its resting state. | Baseline appearance.102 |
| **Hover** | User (on desktop) is considering interaction by placing their cursor over it. | Subtle visual change (e.g., darken, lighten, shadow) to confirm interactivity.102 |
| **Focused** | User (on keyboard) has navigated to the element. | Highly visible outline. MUST meet 3:1 contrast. (See Part 5.2). |
| **Pressed (Active)** | User is actively clicking or tapping the element. | Visual change that mimics a physical press.102 |
| **Disabled** | Component is non-interactive, often due to a unmet condition. | Must be visually deemphasized (e.g., 38% opacity).102 Cursor must be not-allowed. MUST NOT be in the keyboard tab order.103 |
| **Error** | The component is in an error state (e.g., failed validation). | Must clearly communicate the error (e.g., red border, error icon, adjacent message).102 |
| **Loading** | The component is waiting for data or an action to complete. | Must provide feedback (e.g., spinner, skeleton screen).101 |

### 6.2. Inspirational State: The Empty State

* **Core Principle:** An empty state (or "zero data" state) is not an error; it is a *pivotal* moment in the user journey.104 It is an opportunity to educate, guide, and onboard the user.104 A blank screen or a simple "No data" message is a failed opportunity.
* Anatomy of a Good Empty State (Agent Rule) 104:
  1. **Visual:** An (optional) icon or simple illustration that visually reinforces the message.
  2. **Header (Message):** A short, clear message explaining *what* is empty (e.g., "No projects found").
  3. **Explainer:** A brief text explaining *why* it's empty (e.g., "You haven't created a project yet.") and what should be here.
  4. **Call to Action (CTA):** A primary button showing the user the *next logical step* (e.g., "Create Your First Project").
* Contexts 105: The agent must generate empty states appropriate for the context:
  * **First-Time Use:** Onboard the user. The goal is to guide them to their first valuable action.105 (e.g., Slack's empty state guiding new users 109).
  * **User-Cleared:** When the user deletes all items (e.g., clears an inbox). This can be a moment of positive reinforcement (e.g., "Inbox zero\!").
  * **No Results Found:** When a search or filter returns no data.108 The UI must explain the query returned nothing and suggest *alternatives* (e.g., "Try relaxing your filters," "Check spelling").
  * **Errors/Paywalls:** When content fails to load or is restricted.

### 6.3. Inspirational State: The Loading State

* **Core Principle:** Loading time is often unavoidable, but *perceived* wait time is manageable. The goal is to manage user expectations and turn a moment of friction into an opportunity for engagement or branding.
* **Agent Rules for Loading States:**
  * **For Fast Actions (\< 1 sec):** Do nothing. Feedback faster than human perception is distracting.
  * **For Quick Actions (1-3 sec):** Use a Spinner or Loading... text near the action's source.
  * **For Content Loading (\> 2-3 sec):** Use a **Skeleton Screen**.
    * **Rationale:** Skeleton screens (which mimic the layout of the incoming content with gray boxes) 113 are perceptually faster than spinners. They set expectations and show the user that progress is being made.112 This is the preferred pattern for loading pages or components.111 Medium and Slack are excellent examples.
  * **For Full App/Page Loads:** Use the loading time for branding and engagement.
    * **Inspiration:** Slack uses helpful tips and team quotes.111 Duolingo uses its mascot and encouraging messages.110 Calm uses a branded instruction ("Take a deep breath") that aligns with its product's purpose.

### 6.4. Inspirational Flows: User Onboarding

* **Core Principle:** Onboarding is the critical process of guiding new users to their "aha\!" moment—the point where they understand the value of the product.
* **Effective Onboarding Patterns (Inspiration for Agent):**
  * **Welcome Message:** Greets the user and sets a positive tone.
  * **Checklists:** Provides a clear, explicit list of tasks for the user to complete (e.g., "1. Create workspace," "2. Invite team member"). This shows a clear path to success and indicates progress.
  * **Action-Driven Tooltips:** Instead of a long, passive "product tour" that users skip, use tooltips 117 or "hotspots" 117 that appear contextually *when* the user is about to perform a key action for the first time.
  * **Allow Skip:** Always allow the user to dismiss or skip the onboarding flow. Many users prefer to explore on their own.

### 6.5. Modern UI Patterns (Inspiration)

* **Core Principle:** While foundational principles are timeless, UI design patterns evolve. The agent should be aware of modern, effective patterns that are becoming user expectations.
* **Inspirational Patterns for Agent Consideration:**
  * **Bento Grids:** A popular, aesthetically-pleasing layout that uses a grid of "cards" of different sizes. It is highly effective for dashboards or homepages to present a variety of information (e.g., metrics, links, content) in a clean, organized, and highly scannable way.
  * **Modern Skeuomorphism:** A blend of flat design principles with subtle, realistic details like soft shadows, gentle gradients, and dimensionality.119 This "neo-skeuomorphism" adds tactile realism and depth without the heavy-handedness of old skeuomorphic design.
  * **Advanced Cursor Interactions:** Using the cursor as an element of the design itself, such as changing its shape, size, or animation state as it interacts with different UI elements.
  * **3D Visual Elements:** The use of interactive 3D objects and elements to add depth, realism, and draw user attention.

### 6.6. Responsive and Fluid Design

* **Core Principle:** Layouts MUST be fluid and adapt to all screen sizes, from small mobile phones to large desktop monitors. A "responsive" approach is non-negotiable.
* **Agent Rules for Responsive Generation:**
  * **Mobile-First:** Design for small screens first (a single-column layout) and then use media queries to "progressively enhance" the layout for larger screens (e.g., adding columns, expanding navigation).
  * **Fluid Grids & Flexbox/Grid:** Use CSS Flexbox and CSS Grid for all major page layouts.124 Do not use tables, floats, or fixed-width positioning for layout.
  * **Responsive Units:** Use rem or em for font sizes and vw/% for fluid containers. Avoid fixed px widths for main layout containers.
  * **Media Queries:** Use modern media queries, including prefers-color-scheme to automatically support the user's preference for Light or Dark Mode.
  * **Responsive Navigation:** Navigation must adapt. Desktop "mega menus" 51 or wide horizontal navigation bars must collapse into a "hamburger" menu, a "kebab" menu, or a tab bar for mobile devices.

## Part 7: Agent Self-Critique: Validation and Heuristic Checklists

This final section provides the agent with explicit checklists to validate its own generated output against the rules and principles defined in this document. The agent must run these self-critiques before finalizing any generated feature.

### 7.1. Checklist 1: Heuristic Evaluation (Self-Audit)

* **Core Principle:** The agent must perform a heuristic evaluation 127 of its own design, based on Nielsen's heuristics 129 and the specific principles for AI-UX.

**Table 7.1: Agent Heuristic Self-Validation Checklist**

| Heuristic | Validation Question for Agent to Answer (Yes/No) |
| :---- | :---- |
| **AI Trust** | Is it clear to the user *when* they are interacting with me, the AI, versus a static part of the system? 132 |
| **AI Control** | Does the user have meaningful control over my actions? Can they easily correct or undo what I've done? 132 |
| **AI Explainability** | Is there a clear, simple way for the user to understand *why* I generated this UI or made this suggestion? 132 |
| **AI Feedback** | Is there a clear, non-intrusive way for the user to provide feedback on my performance? 132 |
| **1\. Visibility of Status** | Does the UI clearly show the current system status (e.g., loading, selected, current location)? 131 |
| **2\. Match System/World** | Is all terminology familiar to the user, with no system jargon or internal-facing technical terms? 131 |
| **3\. User Control** | Is there a clear "Undo" or "Cancel" option for all major actions? 28 |
| **4\. Consistency** | Does this new UI strictly follow the existing design patterns (colors, fonts, layout, component behavior) of the project? 131 |
| **5\. Error Prevention** | Does the design actively prevent errors (e.g., by disabling submit buttons, using good defaults, or confirming destructive actions)? 131 |
| **6\. Recognition/Recall** | Does the user have to remember any information from a previous screen to use this one? (If YES, this is a failure). |
| **8\. Minimalism** | Is every element on this screen necessary for the user's task? Have I removed all irrelevant or distracting information? 131 |
| **9\. Error Recovery** | Are all potential error messages polite, clear, and do they explicitly explain the solution? 131 |

### 7.2. Checklist 2: Frontend Implementation QA (Code-Level)

* **Core Principle:** A final, technical validation of the generated code against accessibility and best-practice standards.133 This is a "lint" for usability and accessibility.

**Table 7.2: Agent Frontend Implementation Checklist**

| Category | Validation Check (Pass/Fail) |
| :---- | :---- |
| **Accessibility (Color)** | All text/background combinations meet WCAG 4.5:1 (or 3:1 for large text/UI components). |
| **Accessibility (Color)** | Color is NOT used as the sole means of conveying information (e.g., error state includes an icon/text). |
| **Accessibility (HTML)** | All \<img\> tags have a valid alt attribute (or alt="" for decorative). |
| **Accessibility (HTML)** | All form inputs have a programmatically-linked \<label\>. |
| **Accessibility (HTML)** | HTML is semantic (e.g., \<nav\>, \<ul\>, \<th\> with scope is used correctly). |
| **Accessibility (Keyboard)** | All interactive elements are reachable and operable using *only* the Tab, Spacebar, Enter, and Arrow keys. |
| **Accessibility (Keyboard)** | A visible focus state (outline) is present on all focusable elements (no outline: none;). |
| **Accessibility (Keyboard)** | The Tab order is logical and follows the visual flow. |
| **Accessibility (ARIA)** | ARIA is used *only* where semantic HTML is insufficient (e.g., role="tablist"). |
| **Accessibility (ARIA)** | All icon-only buttons have an aria-label for an accessible name. |
| **Responsiveness** | The layout reflows to a single column at a 320px viewport with no horizontal scrolling. |
| **Responsiveness** | Text can be zoomed to 200% without breaking the layout or losing content. |
| **Implementation** | All component states (hover, focused, disabled, empty, loading) are defined and styled.100 |
| **Implementation** | Spacing (margins, padding) is consistent between elements.133 |
| **Anti-Patterns** | The design does NOT contain any prohibited Dark Patterns from Table 3.1. |
| **Anti-Patterns** | The design does NOT use a "Hide and Hover" pattern for primary actions. |

#### Works cited

