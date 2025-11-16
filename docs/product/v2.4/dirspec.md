

# **UX Specification: Bijak Mengeluh Agency Directory**

Date: 20 June 2024
Version: 1.0
Author: Domain Specialist, Civic Technology & Government UX Research

---

## **I. Executive Summary**

This document provides a complete user experience (UX) specification for the redesign of the *Bijak Mengeluh* agency directory. The current implementation fails to meet user needs, resulting in cognitive overload and an inability for citizens to complete the primary task: finding the correct government agency for their complaint. This redesign directly addresses these failures by shifting the core UX principle from a "bureaucratic-first" list to a "problem-first, agency-second" service model.

The primary interaction pattern will be "Faceted Search & Guided Discovery." This moves the directory from a passive A-Z list of 386 agencies to an active routing engine. Users will be guided via a unified, intelligent search bar that can differentiate between a user searching for a *problem* (e.g., "jalan rusak") and an *agency* (e.g., "Dinas PU"). This approach aligns with best-in-class government service platforms, which are structured around user needs, not internal departmental hierarchies.1

The key innovation is the "Bureaucratic Abstraction Layer." This technical-UX layer connects colloquial, user-generated complaint terms (e.g., "aspal bolong," "KTP," "sampah") to the relevant agency's structured keywords. This adopts the core principle of successful civic tech applications: "There is no need for you to indicate which agency is responsible\!".3 All interactions are designed to be mobile-first (375px), accessible (WCAG 2.1 AA), and deliver a relevant result in under three taps.

## **II. Information Architecture**

### **The New IA: A Dual-Path Model**

The existing Information Architecture (IA) is the primary failure point. It mirrors the government's internal organizational chart, which is opaque to the average citizen.1 The new IA is a dual-path system designed to serve all four user goals from a single interface.

* **Path A: Problem-Led (Primary Path):** This path serves User Goal \#1 ("I have a problem..."). It is not a hierarchy of agencies but a "many-to-many" mapping layer. This layer, the "Bureaucratic Abstraction Layer," connects user intent to the correct agency.
  * **Logic:** User Problem ("jalan rusak") $\\rightarrow$ $\\rightarrow$ \`Internal Keywords ("jalan", "rusak", "aspal")\` $\\rightarrow$ $\\rightarrow$ Returns "Dinas Pekerjaan Umum".
* **Path B: Directory-Led (Secondary Path):** This path serves User Goals \#2, \#3, and \#4. It allows for traditional browsing and searching by location or agency name, acting as a fallback for expert users.

### **Text-Based IA Diagram**

The sitemap remains simple, with the complexity handled by search and filtering logic rather than deep navigation.

/ (Directory Home \- Default View)
|
\+-- /search-results

| |
| \+--
| \+-- \[List: Agency Cards\]
|
\+-- /agency/{id}
|
    \+--

### **Leveraging Keywords to Build "Problem Categories"**

The existing Keywords data field is the most critical asset for this redesign. It is the "Rosetta Stone" that allows the system to understand what an agency *does*. To support user browsing (Goal \#3) and guide users on the default view, a data-mapping exercise is required to group these keywords into 6-8 high-level, user-facing "Problem Categories." This approach is validated by successful Indonesian civic apps like JAKI, which use a category-led flow.4

**Example Category Mapping:**

| User-Facing Category | Internal Keywords to Map | Example Agencies |
| :---- | :---- | :---- |
| **Infrastruktur & Transportasi** | jalan, rusak, lubang, aspal, jembatan, parkir, transportasi, macet | Dinas Pekerjaan Umum, Dinas Perhubungan |
| **Lingkungan & Kebersihan** | sampah, polusi, pohon, taman, banjir, sungai | Dinas Lingkungan Hidup, Dinas Kehutanan |
| **Kependudukan & Dokumen** | ktp, kk, akta, surat, identitas, nikah | Dinas Kependudukan dan Catatan Sipil |
| **Kesehatan & Sosial** | rumah sakit, puskesmas, bpjs, darurat, bantuan sosial | Dinas Kesehatan, Dinas Sosial |

These categories will populate the "Browse by Topic" grid on the default view.

### **IA Strategy for 288 "Unknown Level" Agencies**

The fact that 75% of the dataset (288/386) has an "unknown level" is a critical data integrity problem. The current UI, which relies on "Level" as a primary filter, is fundamentally broken by this.

The new IA solves this by **deprioritizing the "Level" data point.**

1. **"Level" is not a Filter; It's a Tag:** The "Level" (e.g., Kementerian, Dinas Provinsi) will be removed as a primary filter. Instead, it will be displayed as a descriptive tag on the Agency Card for informational purposes only.
2. **Graceful Degradation:** For the 288 agencies with "unknown level," the "Level" tag is simply not displayed on the card. The card remains 100% functional, showing the agency's name, function (via keywords), and location.
3. **Prioritize What Works:** The search and filter logic will prioritize Keywords and Location (which is present for all agencies) above all else. A user searching for a problem in "DKI Jakarta" will see all relevant agencies, regardless of their "Level." This makes the incomplete data a non-issue for the user.

## **III. Default View Specification**

### **Rationale: From "Empty List" to "Guided Action"**

The default view must immediately engage the impatient, mobile-first user. A list of 386 agencies causes decision paralysis. This design adopts the "Starter Content" pattern, which provides content to help new users get started.6 However, instead of starter *data*, it provides starter *actions* that guide the user into the primary flows. This screen acts as a "triage" point, directing users to problem-based search (Goal \#1) or category-based browsing (Goal \#3).

### **Text-Based Wireframe: Directory\_Home (375px)**

\+-------------------------------------------+

| |
| |
| \+-------------------------------------+ |
| | 🔍  Cari masalah atau nama agensi... | | \<-- Primary Search Bar
| \+-------------------------------------+ |
| |
| |
| |
| |
| \+-----------+  \+-----------+  \+-----------+ |
| | 🏗️ | | 🌳 | | 🏥 | |
| | Infrastruk- | | Lingkungan | | Kesehatan | |
| | tur | | | | | |
| \+-----------+  \+-----------+  \+-----------+ |
| |
| \+-----------+  \+-----------+  \+-----------+ |
| | 📄 | | 👮 | | 💡 | |
| | Kependu- | | Keamanan | | Layanan | |
| | dukan | | | | Lainnya | |
| \+-----------+  \+-----------+  \+-----------+ |
| |
| |
| |
\+-------------------------------------------+

\[Home\]\[Lapor\]\[Akun\]
\+-------------------------------------------+

### **Component Specification**

* **Search Bar:**
  * **Text:** Cari masalah atau nama agensi... (Search for a problem or agency name...)
  * **Interaction:** Tapping this bar is the primary CTA. It immediately focuses the input and transitions the user to the Search\_Active screen (see Flow 4), bringing the keyboard up. It must be placed prominently at the top.7
* **"Telusuri Berdasarkan Topik" (Browse by Topic) Grid:**
  * **Content:** 6-8 icons (using agency.emoji) representing the "Problem Categories" defined in the IA (e.g., 🏗️ Infrastruktur).
  * **Interaction:** Tapping a category (e.g., "Infrastruktur") immediately navigates to the Search\_Results screen, pre-filtered for that category's associated keywords.
* **"Lihat Semua 386 Agensi (A-Z)" (See All 386 Agencies A-Z):**
  * **Interaction:** Tapping this link navigates to the Search\_Results screen with *no filters applied*. It displays an infinite-scroll list of all 386 agencies, sorted alphabetically, to serve the "exploration" goal (Goal \#3).

## **IV. Search & Filter Specification**

### **Search Behavior: The "Smart" Search Engine**

The search bar is the core of this system. It must be intelligent, handling user ambiguity and errors.

#### **a) Faceted Autocomplete**

* **Trigger:** On keypress, after the 3rd character.
* **Logic:** The system must search *simultaneously* against two distinct data facets: 1\) Agency Name and 2\) Keywords \+ Synonym Map.
* **UI:** Autocomplete suggestions *must* be styled by category to reduce ambiguity, a key best practice.9 This visually separates "problem" suggestions from "agency" suggestions, guiding the user to the correct flow.

Text-Based Wireframe: Search\_Active Autocomplete
User types "jalan":

\[Header: "Cari Agensi"\]\[Cancel\]
\+-------------------------------------+

| 🔍  jalan |
\+-------------------------------------+

  🔍 Jalan Rusak
  🔍 Lampu Jalan Mati

  🏗️ Dinas Pekerjaan Umum
  🚗 Dinas Perhubungan

#### **b) Synonym Map (MVP Must-Have)**

Fuzzy matching solves *typos* (e.g., "jlaan") 10, while synonym mapping solves *intent* (e.g., "aspal bolong" \= "jalan rusak").11 The primary user failure is not typos; it is the "bureaucratic translation" problem. Therefore, a synonym map is more critical than fuzzy matching for the MVP.

* **Specification:** A synonyms.json file (or database table) must be maintained.
* **Example:**
  * "aspal bolong": \["jalan", "rusak"\]
  * "ktp": \["kependudukan", "identitas", "catatan sipil"\]
  * "sampah": \["kebersihan", "lingkungan hidup"\]
* **Logic:** The search engine will first check the query against the synonym map. If a match is found, it will search the agency Keywords field using the *mapped* terms, dramatically improving relevance.

#### **c) Fuzzy Matching (v2 "Should-Have")**

To handle simple misspellings, a fuzzy matching algorithm (e.g., Levenshtein distance 1 or 2\) 10 should be implemented in v2. This will catch typos like "Kementrian" vs. "Kementerian" or "Perhubugan" vs. "Perhubungan."

### **Region Chip Filtering (v2.4 Implementation)**

**Added: November 16, 2025**

To reduce friction and improve discoverability, region filtering has been promoted from the bottom sheet to always-visible chip selection on the main directory view. This creates a dual-filter system where users can combine region + category filters simultaneously.

* **UI Pattern:** Horizontal scrollable chip row displaying 7 region options:
  * 🇮🇩 Semua (All)
  * 🏛️ Nasional (National agencies only)
  * 🏙️ Jakarta (DKI Jakarta province)
  * 🏔️ Jabar (West Java)
  * 🌾 Jateng (Central Java)
  * 🌊 Jatim (East Java)
  * 🏭 Banten

* **Interaction:**
  1. User taps a region chip (e.g., "Jakarta")
  2. Chip becomes active (orange background)
  3. Results immediately filter to show only agencies from that region
  4. If a category is also selected, results show the intersection (e.g., "Infrastructure agencies in Jakarta")

* **Filter Logic:**
  * "Semua" = no region filter applied
  * "Nasional" = filter by `level === 'national'`
  * Province chips = filter by `province === [province_name]`
  * Region + Category = AND operation (both conditions must match)
  * Region + Search query = AND operation (search within region)

* **Active State Display:**
  * Selected region chip shows with orange background
  * Active filters displayed as badges below search bar
  * "Hapus semua" (Clear all) button resets both region and category

**Rationale:** This implementation prioritizes the most common user path (Goal #2: "Show me agencies in my city") by making location filtering immediately visible and requiring zero taps to discover. The chip pattern is more ergonomic than a dropdown and allows users to see all available regions at a glance.

### **Filter UI: Bottom Sheet \+ Accordions**

The current filters cause cognitive overload. The solution is to apply progressive disclosure 12, hiding filters until they are explicitly requested.

* **Interaction:**
  1. On the Search\_Results screen, the user taps a "Filter" icon (placed in the thumb zone, near the search bar).
  2. A **Bottom Sheet** modal slides up from the bottom. This is a standard, ergonomic, and thumb-friendly mobile pattern.13
  3. The sheet's content is organized into **Accordions** to manage complexity and prevent overwhelming the user.15

### **Text-Based Wireframe: Filter\_Bottom\_Sheet**

\[Grayed-out background content\]

\+-------------------------------------------+

| \[Handlebar (drag to dismiss)\] |
| \[Header: "Filter"\] |
\+-------------------------------------------+

| |
| |
| \+-------------------------------------+ |
| | v  LOKASI (Location) | | \<-- Accordion 1 (Expanded)
| \+-------------------------------------+ |
| | \[Label: Provinsi\] | |
| | | |
| | (Options: DKI Jakarta, Banten, etc.) | |
| | | |
| | \[Label: Kota/Kabupaten\] | |
| | | |
| | (Options: Jakarta Selatan, etc.) | |
| \+-------------------------------------+ |
| |
| \+-------------------------------------+ |
| | \>  TINGKAT AGENSI (Agency Level) | | \<-- Accordion 2 (Collapsed)
| \+-------------------------------------+ |
| |
\+-------------------------------------------+

| |
\+-------------------------------------------+

* **Accordion Logic:**
  * Lokasi (Location) is expanded by default, as this is the most common filter path (User Goal \#2).
  * Tingkat Agensi (Agency Level) is collapsed by default. This reinforces the IA decision to deprioritize this incomplete data.
  * When expanded, Tingkat Agensi will contain 3 toggle chips: \[Kementerian (Nasional)\], , .

## **V. Agency Card Specification**

### **Rationale: Solving "What Do They Do?"**

The current card fails because it only shows Name and Location, forcing users to guess an agency's function. The new card must be instantly "skimmable" 17 and answer "What does this agency do?"

The bureaucratic name (e.g., "Dinas Pekerjaan Umum Jakarta Selatan") is data-rich but has a poor visual hierarchy. This design *deconstructs* this name and re-presents its components (Function, Level, Location) in a logical hierarchy.18

### **Agency Card Specification (List View)**

This card is designed as a vertical, scannable list item.19

\+-------------------------------------------+

| |
| \[ 🏗️ \] | \<-- Large, Bold, 4.5:1 contrast
| |
| |
| |
| |
| |
|\[•\] | contrast grey text)
\+-------------------------------------------+

### **Table: Agency Card Data Mapping**

This table provides an unambiguous specification for development, mapping UI elements to their corresponding data fields.

| UI Element | Content / Text | Data Source / Logic | Purpose |
| :---- | :---- | :---- | :---- |
| **Row 1: Emoji** | 🏗️ | agency.emoji | Quick visual scanning; brand. |
| **Row 1: Title** | "Pekerjaan Umum" | agency.name (Parsed) | Answers "Who?" (Common Name). Logic must parse "Dinas..." and "Kabupaten..." from the start/end to extract the core *function*. |
| **Row 2: Keywords** | "Menangani: jalan rusak, lubang..." | agency.keywords (Truncated to first 3-4 items) | **Answers "What?"** This is the most critical element for User Goal \#1. |
| **Row 3: Level Tag** | "Dinas Kota" | agency.level (e.g., "city", "provincial") | Provides hierarchy. *If agency.level is "unknown", this element is hidden.* |
| **Row 3: Location** | "Jakarta Selatan" | agency.city (if present) OR agency.province | Answers "Where?" (Goal \#2). |

### **Detail View (Progressive Disclosure)**

Tapping an Agency Card—which serves as an "entry point" to deeper content 18—navigates the user to the Agency\_Detail screen. This screen uses progressive disclosure 12 to show secondary information not required for the initial discovery task.

* **Agency\_Detail Screen Content:**
  * **Header:** \[🏗️\] Pekerjaan Umum
  * **Full Formal Name:** Dinas Pekerjaan Umum Kota Jakarta Selatan
  * **Tags:**
  * **"Tentang" (About):** Full agency description.
  * **"Menangani Masalah" (Handles Problems):** Full, non-truncated list of all Keywords.
  * **"Kontak & Media Sosial" (Contact & Social Media):**
    * @...
    * \[Instagram Logo\] @...
    * \[Phone Logo\]...
    * \[Email Logo\]...
  * **Primary CTA:** \`\` (START REPORT) \- *This button would pre-populate the complaint form with this agency's ID.*

## **VI. User Flow Wireframes (Text-Based)**

These "wireflows" 21 describe the step-by-step user journey for all four primary goals.

### **Flow 1: Problem $\\rightarrow$ Agency (User Goal \#1)**

1. **Screen:** Directory\_Home
2. **Action:** User taps.
3. **Screen:** Search\_Active (Keyboard is active).
4. **Action:** User types "jalan r".
5. **UI:** Faceted autocomplete list appears.9
   * 🔍 Jalan Rusak
   * 🏗️ Dinas Pekerjaan Umum
6. **Action:** User taps 🔍 Jalan Rusak.
7. **Screen:** Search\_Results
8. **UI:** The search bar now contains a filter chip \`\`. The list is populated with \[Agency Card\] for "Dinas Pekerjaan Umum" and any other agency matching the "jalan rusak" keyword.
9. **Result:** User finds the correct agency in \<3 taps.

### **Flow 2: Location $\\rightarrow$ Agencies (User Goal \#2)**

1. **Screen:** Directory\_Home
2. **Action:** User taps \`\`.
3. **Screen:** Search\_Results (showing all 386 agencies).
4. **Action:** User taps \[Filter Icon\] (located next to the search bar).
5. **UI:** Filter\_Bottom\_Sheet slides up.14
6. **Action:** In the default-expanded Lokasi accordion:
   * Selects Provinsi \= "DKI Jakarta".
   * Kota dropdown populates. User selects Kota \= "Jakarta Selatan".
7. **Action:** User taps.
8. **UI:** Bottom sheet dismisses. Search\_Results list re-loads, now showing only the agencies where province is "DKI Jakarta" AND city is "Jakarta Selatan." The Filter Icon now shows an active state (e.g., a "1" badge).
9. **Result:** User successfully browses agencies by a specific city.

### **Flow 3: Browse All / By Category (User Goal \#3)**

* **Path 3a (Browse by Category):**
  1. **Screen:** Directory\_Home
  2. **Action:** User taps \`\`.
  3. **Screen:** Search\_Results
  4. **UI:** The search bar contains a filter chip \[Kategori: Infrastruktur X\]. The list shows all agencies tagged with keywords like "jalan," "jembatan," etc.
* **Path 3b (Browse All A-Z):**
  1. **Screen:** Directory\_Home
  2. **Action:** User taps \`\`.
  3. **Screen:** Search\_Results
  4. **UI:** List appears with all 386 agencies, no filters, sorted A-Z, with infinite scroll enabled.

### **Flow 4: Direct Search (User Goal \#4)**

1. **Screen:** Directory\_Home
2. **Action:** User taps.
3. **Screen:** Search\_Active
4. **Action:** User types "dinas per".
5. **UI:** Faceted autocomplete appears.
   * 🚗 Dinas Perhubungan
6. **Action:** User taps 🚗 Dinas Perhubungan.
7. **Screen:** Search\_Results
8. **UI:** The search bar shows \`\`. The list shows all "Dinas Perhubungan" agencies from all provinces (e.g., DKI Jakarta, Banten, etc.). The user can now use the Location filter (Flow 2\) to narrow this list.

## **VII. Empty States & Error Handling**

Empty states must be designed to prevent confusion and guide the user to a "next step," rather than being a dead end.6

### **"No Results" (Post-Search)**

This is a high-friction moment. The empty state must be actionable.25

* **Wireframe / Specification:**
  * **Image:** \[Neutral, on-brand illustration, e.g., a magnifying glass over an empty box\].
  * **Title (H2):** Hasil tidak ditemukan (Results not found)
  * **Body (P):** Coba periksa ejaan Anda atau gunakan kata kunci yang lebih umum. (Try checking your spelling or using a more general keyword.)
  * **Suggestions (if fuzzy match triggers):** Apakah maksud Anda: "Kementerian Keuangan"? (Did you mean: "Kementerian Keuangan"?)
  * **Actionable Fallback (The "escape hatch"):**
    * \`\` (Or, browse by popular topics)
    * \`\`

### **Loading State**

A generic spinner creates a poor perception of performance.

* **UI:** Use "Skeleton Loaders."
* **Specification:** The loading state must display 3-4 skeleton "cards" that perfectly mimic the layout and dimensions of the Agency\_Card. This placeholder content should load sequentially from top to bottom, which gives users a sense of progress and makes the app feel faster.27

### **Error State (API Failure)**

This state must be used if the API call to fetch agencies fails.

* **UI:** Display an in-page message (not a system-level modal).
* **Image:**.
* **Title (H2):** Terjadi Kesalahan (An Error Occurred)
* **Body (P):** Tidak dapat memuat direktori agensi. Silakan periksa koneksi Anda dan coba lagi. (Could not load the agency directory. Please check your connection and try again.)
* **CTA (Button):** \`\` (This button must trigger an API refetch).

## **VIII. Mobile-Specific & Accessibility Considerations**

### **Thumb Zone & Ergonomics**

The design must prioritize one-handed use on mobile devices.

* **Bottom Navigation Bar:** As a top-level destination, "Direktori" (Directory) must be one of the 3-5 items in the app's main bottom navigation bar, ensuring it is always reachable.28
* **Primary Controls:** All key interaction points are placed for optimal thumb access:
  * **Default View:** The "Browse by Topic" grid is in the center of the screen.
  * **Results View:** The "Filter" icon is placed near the top, adjacent to the search bar, but will have an ample 44x44px tap target.
  * **Filter UI:** The selection of a **Bottom Sheet** 14 is a deliberate ergonomic choice, bringing all filter controls up from the bottom of the screen to meet the user's thumb.

### **WCAG 2.1 AA Compliance Checklist**

Meeting WCAG 2.1 AA is a non-negotiable development constraint.29 This checklist serves as a "Definition of Done" for UI implementation.

| WCAG SC | Requirement | Implementation Specification (This App) |
| :---- | :---- | :---- |
| **1.4.3** | **Contrast (Minimum) (AA)** | All primary text (e.g., Agency Card title, body copy, headers) must have a minimum 4.5:1 contrast ratio against its background.30 |
| **1.4.11** | **Non-Text Contrast (AA)** | All UI controls (Search Bar border, Filter chips, Accordion icons, radio buttons) must have a 3:1 contrast ratio against adjacent colors.32 |
| **2.5.5** | **Target Size (AAA)** | **Requirement adopted as best practice.** While WCAG 2.2 AA sets a 24x24px minimum 33, this application must adhere to the 44x44 CSS pixels minimum target size for *all* primary touch targets to reduce tap errors.34 This includes list items, filter icons, and category grid items. |
| **1.3.5** | **Identify Input Purpose (AA)** | The search input must use autocomplete="on" and be programmatically identified to assist assistive technologies.29 |
| **2.5.3** | **Label in Name (A)** | All accessible names for controls must match the visible text (e.g., the button labeled "Terapkan" must have an accessible name "Terapkan").29 |
| **4.1.2** | **Name, Role, Value** | All custom components (Accordions, Bottom Sheet) must use correct ARIA roles (e.g., aria-expanded="true/false", role="dialog") to report their state to screen readers. |

## **IX. Implementation Priority**

This roadmap provides a pragmatic path for development, prioritizing features that solve the most critical user goals first.

### **1\. Must-Have (MVP)**

*Solves Goal \#1 (Problem) & \#2 (Location)*

* **Default View:** Directory\_Home screen with the primary Search Bar. The "Browse by Topic" grid can be "starter content" 6 that links to pre-defined searches, even if the category mapping is not yet dynamic.
* **Search Engine:**
  * Search bar with **Faceted Autocomplete** (Problem vs. Agency).9
  * **Synonym Map** (manual json file) integrated into search logic.11 This is the "smart" component and is essential for MVP.
* **List & Detail:**
  * Search\_Results screen with infinite scroll.
  * The new Agency\_Card design (with deconstructed name and Keywords row).
  * Agency\_Detail screen (progressive disclosure).
* **Filtering:**
  * Filter\_Bottom\_Sheet 14 with the **Location Filter (Province & City) only**.
* **States:** "No Results" (actionable version) 25 and Skeleton Loading states.27

### **2\. Should-Have (v2)**

*Improves UX & Solves Goal \#3 (Browse)*

* **Smarter Search:**
  * **Fuzzy Matching** (e.g., Levenshtein) for typo tolerance.10
* **Full Browsing:**
  * Fully functional "Browse by Category" (based on the completed keyword-to-category mapping).
* **Full Filters:**
  * "Agency Level" filter added to the Filter\_Bottom\_Sheet accordion.15
  * "Reset" button functionality within the filter sheet.

### **3\. Nice-to-Have (Future)**

*Delighters & Deeper Integration*

* **Geolocation:** A "Near Me" filter toggle that uses the device GPS to automatically filter by the user's current province/city.36
* **Personalization:** "Recent Searches" or "Saved Agencies".13
* **Flow Integration:** A prominent "Mulai Laporan" (Start Report) button on the Agency\_Detail page that passes the agency\_id directly to the complaint form, streamlining the primary app flow.

#### **Works cited**

1. Designing a Citizen-centric Sitemap: Putting Website User Experience First \- Govstack, accessed November 16, 2025, [https://www.govstack.com/resources/posts/designing-a-citizen-centric-sitemap-putting-website-user-experience-first/](https://www.govstack.com/resources/posts/designing-a-citizen-centric-sitemap-putting-website-user-experience-first/)
2. Patterns \- GOV.UK Design System, accessed November 16, 2025, [https://design-system.service.gov.uk/patterns/](https://design-system.service.gov.uk/patterns/)
3. OneService-Serving Your Estate \- Apps on Google Play, accessed November 16, 2025, [https://play.google.com/store/apps/details?id=sg.gov.mnd.OneService\&hl=en\_US](https://play.google.com/store/apps/details?id=sg.gov.mnd.OneService&hl=en_US)
4. JAKI \- Jakarta Kini \- Apps on Google Play, accessed November 16, 2025, [https://play.google.com/store/apps/details?id=id.go.jakarta.smartcity.jaki\&hl=en\_US](https://play.google.com/store/apps/details?id=id.go.jakarta.smartcity.jaki&hl=en_US)
5. Procedure for Reporting Inundation or Flood \- Jakarta Smart City, accessed November 16, 2025, [https://smartcity.jakarta.go.id/en/blog/tata-cara-lapor-genangan-atau-banjir-di-jakarta/](https://smartcity.jakarta.go.id/en/blog/tata-cara-lapor-genangan-atau-banjir-di-jakarta/)
6. Empty states \- Material Design, accessed November 16, 2025, [https://m2.material.io/design/communication/empty-states.html](https://m2.material.io/design/communication/empty-states.html)
7. Mobile Search UX & Design | Best Practices, Challenges & Patterns to Boost Conversions \- Evinent, accessed November 16, 2025, [https://evinent.com/blog/mobile-search-ux-ui](https://evinent.com/blog/mobile-search-ux-ui)
8. Mobile search UX best practices, part 2: Streamlining search functionality \- Algolia, accessed November 16, 2025, [https://www.algolia.com/blog/ux/mobile-search-ux-part-two-deconstructing-mobile-search](https://www.algolia.com/blog/ux/mobile-search-ux-part-two-deconstructing-mobile-search)
9. 9 UX Best Practice Design Patterns for Autocomplete Suggestions (Only 19% Get Everything Right) \- Baymard, accessed November 16, 2025, [https://baymard.com/blog/autocomplete-design](https://baymard.com/blog/autocomplete-design)
10. What is fuzzy search? Fuzzy search meaning. | Google Cloud, accessed November 16, 2025, [https://cloud.google.com/discover/what-is-fuzzy-search](https://cloud.google.com/discover/what-is-fuzzy-search)
11. The same, but different: Boosting the power of Elasticsearch with synonyms, accessed November 16, 2025, [https://www.elastic.co/blog/boosting-the-power-of-elasticsearch-with-synonyms](https://www.elastic.co/blog/boosting-the-power-of-elasticsearch-with-synonyms)
12. Progressive disclosure in UX design: Types and use cases \- LogRocket Blog, accessed November 16, 2025, [https://blog.logrocket.com/ux-design/progressive-disclosure-ux-types-use-cases/](https://blog.logrocket.com/ux-design/progressive-disclosure-ux-types-use-cases/)
13. Mobile Filter UX Design Patterns & Best Practices \- Pencil & Paper, accessed November 16, 2025, [https://www.pencilandpaper.io/articles/ux-pattern-analysis-mobile-filters](https://www.pencilandpaper.io/articles/ux-pattern-analysis-mobile-filters)
14. Bottom sheets – Material Design 3, accessed November 16, 2025, [https://m3.material.io/components/bottom-sheets/guidelines](https://m3.material.io/components/bottom-sheets/guidelines)
15. Accordion UI Examples: Best Practices & Real-World Designs \- Eleken, accessed November 16, 2025, [https://www.eleken.co/blog-posts/accordion-ui](https://www.eleken.co/blog-posts/accordion-ui)
16. How to create user-friendly accordion UI design? \- Cieden, accessed November 16, 2025, [https://cieden.com/book/atoms/accordion/accordion-ui-design](https://cieden.com/book/atoms/accordion/accordion-ui-design)
17. Successful card design in 3 steps: UX, UI, and Framework | by Brenna Grey Mickey, accessed November 16, 2025, [https://uxdesign.cc/its-all-in-the-cards-ux-ui-card-design-44cf9e31d988](https://uxdesign.cc/its-all-in-the-cards-ux-ui-card-design-44cf9e31d988)
18. Cards – Material Design 3, accessed November 16, 2025, [https://m3.material.io/components/cards/guidelines](https://m3.material.io/components/cards/guidelines)
19. 17 Card UI Design Examples and Best Practices for Your Inspiration \- Eleken, accessed November 16, 2025, [https://www.eleken.co/blog-posts/card-ui-examples-and-best-practices-for-product-owners](https://www.eleken.co/blog-posts/card-ui-examples-and-best-practices-for-product-owners)
20. Ultimate guide to designing UI Cards | by Abishek | Bootcamp | Medium, accessed November 16, 2025, [https://medium.com/design-bootcamp/ultimate-guide-to-designing-ui-cards-ff742fdafa92](https://medium.com/design-bootcamp/ultimate-guide-to-designing-ui-cards-ff742fdafa92)
21. Wireflows: A beginner's guide to clearer UI design \- Balsamiq, accessed November 16, 2025, [https://balsamiq.com/blog/wireflows/](https://balsamiq.com/blog/wireflows/)
22. How to create user flow: 4 advanced tips for UX designers \- FlowMapp, accessed November 16, 2025, [https://www.flowmapp.com/features/how-to-create-user-flow](https://www.flowmapp.com/features/how-to-create-user-flow)
23. Search bar UI: Best practices, modern trends, and examples \- LogRocket Blog, accessed November 16, 2025, [https://blog.logrocket.com/ux-design/design-search-bar-intuitive-autocomplete/](https://blog.logrocket.com/ux-design/design-search-bar-intuitive-autocomplete/)
24. Empty States \- SAP, accessed November 16, 2025, [https://www.sap.com/design-system/fiori-design-web/v1-136/foundations/best-practices/global-patterns/designing-for-empty-states](https://www.sap.com/design-system/fiori-design-web/v1-136/foundations/best-practices/global-patterns/designing-for-empty-states)
25. Empty state UX: Real-world examples and design rules that actually work \- Eleken, accessed November 16, 2025, [https://www.eleken.co/blog-posts/empty-state-ux](https://www.eleken.co/blog-posts/empty-state-ux)
26. Empty State UI Design: 25 Best Examples & Templates \- Mockplus, accessed November 16, 2025, [https://www.mockplus.com/blog/post/empty-state-ui-design](https://www.mockplus.com/blog/post/empty-state-ui-design)
27. Best Practices for Designing Lists course lesson | Uxcel, accessed November 16, 2025, [https://app.uxcel.com/courses/ui-components-best-practices/lists-best-practices-814](https://app.uxcel.com/courses/ui-components-best-practices/lists-best-practices-814)
28. Bottom navigation \- Material Design, accessed November 16, 2025, [https://m2.material.io/components/bottom-navigation](https://m2.material.io/components/bottom-navigation)
29. Web Content Accessibility Guidelines (WCAG) 2.1 \- W3C, accessed November 16, 2025, [https://www.w3.org/TR/WCAG21/](https://www.w3.org/TR/WCAG21/)
30. Checklist for Mobile Applications | accessibility.umich.edu, accessed November 16, 2025, [https://accessibility.umich.edu/how-to/mobile-apps/checklist](https://accessibility.umich.edu/how-to/mobile-apps/checklist)
31. Mobile accessibility checklist \- MDN Web Docs \- Mozilla, accessed November 16, 2025, [https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Mobile\_accessibility\_checklist](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Mobile_accessibility_checklist)
32. What's New in WCAG 2.1 | Web Accessibility Initiative (WAI) \- W3C, accessed November 16, 2025, [https://www.w3.org/WAI/standards-guidelines/wcag/new-in-21/](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-21/)
33. Understanding Success Criterion 2.5.8: Target Size (Minimum) | WAI \- W3C, accessed November 16, 2025, [https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
34. Provide buttons with a large target size \- Access Guide, accessed November 16, 2025, [https://www.accessguide.io/guide/large-target-size](https://www.accessguide.io/guide/large-target-size)
35. Accessible Target Sizes Cheatsheet \- Smashing Magazine, accessed November 16, 2025, [https://www.smashingmagazine.com/2023/04/accessible-tap-target-sizes-rage-taps-clicks/](https://www.smashingmagazine.com/2023/04/accessible-tap-target-sizes-rage-taps-clicks/)
36. Redesigning Yelp's iOS App. Introduction | by Alicia \- Medium, accessed November 16, 2025, [https://medium.com/@aliciawxw/redesigning-yelps-ios-app-449fe94780fc](https://medium.com/@aliciawxw/redesigning-yelps-ios-app-449fe94780fc)
37. How to Make a Location-Based App similar to Foursquare or Yelp? \- VILMATE, accessed November 16, 2025, [https://vilmate.com/blog/how-to-make-a-location-based-app-like-foursquare-or-yelp/](https://vilmate.com/blog/how-to-make-a-location-based-app-like-foursquare-or-yelp/)