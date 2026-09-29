PROMPTS.md — Paws & Home SG

Student: Adithi Udupa · Course: MGMT 6110 · Problem Set 1

User sentence: A Singapore resident deciding whether to take in a stray opens this app to find a stray they could give a home to and know what happens next, and knows it worked when the enquiry screen names the animal they chose and states the next step.

Live link: https://adithiudupakarkadaweek03assignment.vercel.app

Prompt 1 — the master prompt

Sent to Google Stitch.

ROLE: You are a senior front-end developer building a React web app.

GOAL: Build the front end of Paws & Home SG, a web product for Singapore
residents deciding whether to take in a stray animal — mostly first-time
adopters, at home on a phone, a few hundred a month. Their job on this product
is "find a stray I could give a home to, and know what happens next." Screens:
1) Adopt: a hero with the shelter's one-line tagline and vision statement, then
   a grid of 8 rescue cards — photo, name, approximate age, a two-line story of
   where the animal was found, and two badges, vaccinated and dewormed. Beside
   the grid, a short "How it works" note: a visit happens at our shelter, a
   completed adoption is hand-delivered to your home. Below that, "Our story"
   (street feeding, vaccination and sterilisation, community sheltering) and
   "You are never alone after adoption" (a volunteer buddy, a community
   helpline, subsidised vet partners). The user browses and taps "Schedule a
   visit" or "Adopt me" on one card. It worked when the enquiry screen opens
   for that animal.
2) Enquiry: names the animal and which of the two choices was made, then a form
   — name, email, phone, message — and a submit button. The user fills it in and
   submits. It worked when the form is replaced by a confirmation that names the
   animal and states the next step: come to the shelter for a visit, or wait for
   hand-delivery for an adoption.
3) Support us: three preset contribution amounts and a field for a custom
   amount, for visitors who cannot adopt. The user picks an amount and confirms.
   It worked when a thank-you replaces the amount picker.

OUTPUT: A running app. Keep every invented value in ONE data file of its own,
with at least 8 rows, so the screen looks real. One component per screen or
section. Move between screens without reloading the page. Readable on a phone at
arm's length. When you are done, list the files you created and what each one
holds.

GUARDRAILS: Screens and invented data only. Do NOT call the Gemini API or any
other model. Do NOT call any outside service or fetch from any URL. No database,
no login, no user accounts, no analytics. No features I did not list — no admin
or shelter-staff screens, no payment or checkout, no search, no filters, no map,
no chat widget. No real company's name, logo, or trademark. Invented names and
numbers only, nothing confidential.

CONTEXT: Individual Problem Set 1 for MGMT 6110 Human-AI Collaboration at SMU.
Built in Google AI Studio, shared as a link, and opened on a phone by classmates
in Week 3. I am not a programmer: when you make a choice I did not specify, say
so in one line rather than burying it. The visitor is often nervous about
adopting for the first time, so keep the tone warm and reassuring, not
corporate: soft neutrals with one warm accent, generous whitespace, rounded
cards, a friendly humanist sans-serif.

What came back: A running mobile web app with all three screens. Because the CONTEXT block asked for it, Stitch declared the choices I had not specified: the palette (
#FAF7F2 background, 
#38322E type, 
#C85A32 terracotta accent, Plus Jakarta Sans), a sticky top header toggling between Adopt and Support Us, and eight rescues named after local drinks and pantry staples — Kopi, Milo, Kaya, Pandan, Teh-O, Tofu, Chili, Sesame — with backstories set in Bedok, Tuas, Kranji, Tiong Bahru and Sungei Tengah. Data was held in an APP_DATA constant. Support tiers came back as $20, $50 and $100.

What I changed next and why: Nothing in the prompt. Exported the screens out of Stitch and into Google AI Studio, to get a project I could push to GitHub and deploy.

Prompt 2 — handover to Google AI Studio
Build me an app with screens that look like this. You can hotlink images from
the html

Attached: Image 1.png, Image 2.html, Image 3.png, Image 4.html — the Stitch export.

What came back: Twelve files, built: metadata.json, index.html, src/index.css, src/types.ts, src/data.ts, src/components/Header.tsx, RescueCard.tsx, AdoptScreen.tsx, EnquiryScreen.tsx, SupportScreen.tsx, Footer.tsx, src/App.tsx. On desktop, a twelve-column layout with the eight rescue cards in a two-column grid beside a sticky "How It Works" and Pasir Ris Farmway Sanctuary sidebar, then three-column Care Pillars and Singapore Aftercare Promise sections. On mobile, a single-column flow with 48px tap targets. The enquiry screen pre-populates with the chosen rescue and gives different next steps for a shelter meet-and-greet in Pasir Ris versus home hand-delivery with a 60-day volunteer buddy. Contribution tiers $20, $50 (marked popular) and $100 plus a custom SGD input, named the Stray Medical & Food Fund.

What I changed next and why: The contribution section sat behind its own header button, so a visitor had to leave the home screen to reach it. The next prompt moved that content onto the home screen as well, and changed nothing else.

Prompt 3 — donation section on the home screen
Change one thing: put the Support Medical Funds content on the home screen as
well.

- On the Adopt screen, between "You are never alone after adoption" and the
  footer, add a "Support Medical Funds" section carrying the same content as the
  Support Medical Funds screen: the heading, the line addressed to people who
  cannot adopt, the three preset contribution amounts, the custom amount field,
  the confirm button, and the thank-you state.
- It must work in place. Picking an amount and confirming shows the thank-you
  right there, without leaving the home screen and without a page reload.
- Reuse the existing Support Medical Funds component and the same data rather
  than copying the text into a second place, so the two can never drift apart.
  Give the home-screen instance its own state, so confirming in one place does
  not change the other.
- Leave the Support [paste the rest of this prompt from your AI Studio history]

What came back: Two files edited — src/components/SupportScreen.tsx and src/components/AdoptScreen.tsx. The section was placed between the Singapore Aftercare Promise and the footer on the Adopt screen. It reused the existing SupportScreen component behind an isEmbedded configuration rather than duplicating the markup or text, so the heading, copy, the $20 / $50 / $100 tiers, the custom amount field and the thank-you states stay in sync. Selecting an amount and clicking Confirm Contribution shows the thank-you in place with no reload. Each instance keeps its own React state, so contributing on the home screen does not affect the dedicated Support Medical Fund page. It also added a "Back to Meet Rescues" control that scrolls up to the rescue cards.

What I changed next and why:Nothing, this was the last prompt
## Problem Set 4 — revision prompts

Prompts run against the codebase after reading my groupmates' heuristic evaluations.
Agent: Gemini 3.8 Flash (Google AI Studio). Each prompt names the finding it serves.
Prompts that were cancelled or that failed part-way are not listed.

---

### Prompt 1 — Origin equals destination
Serves: MN Finding 1 (severity 3, heuristic 2) and RK Finding 1 (severity 3, heuristic 5).
Commit: `e1c8e85`

> In the Bus Route Finder on my Singapore stray adoption site, the destination is fixed at Pasir Ris Interchange (77009). Right now, if a user selects 77009 as their starting stop — which is the first chip under "Nearby & Quick Stops" — the app requests a route and returns two-bus journeys that leave the interchange and come back to it.
>
> Fix this so that when the selected starting stop code equals the destination stop code, the app recognises it before requesting any route, and shows a short plain-language message saying the user is already at the shelter's stop and no bus journey is needed. No journey cards, no transfer routes.
>
> Handle this in the same place for all entry points: the quick-stop chips, a typed stop code, and a saved favourite. Keep the message in the same visual style as the existing result panel.

**Result.** Added an early check in `performSearch` comparing the entered code against the destination before any API request, so all entry points resolve the same way. Renders "You are already at the shelter's stop" in the existing result-panel style and suppresses journey cards. Also added an origin-equals-destination guard in `/api/routes-to-shelter.js` returning `already_at_destination`. Both reviewers had placed this finding on the screen; the agent proposed the backend guard as well, and I kept it, because the screen fix alone would have left the route returning loop journeys to anything calling it directly.

---

### Prompt 2 — Remove the "Nearby stops" button
Serves: MN Finding 3 (severity 2, heuristic 1).

> In the Bus Route Finder, remove the "Nearby stops" button and the browser geolocation feature behind it entirely. It currently returns "Location permission denied" and never produces results, and that error stays visible on screen even after a manual stop search succeeds.
>
> Remove the button, the geolocation request, and any state or error message tied to it. Leave the stop-code search, the quick-stop chips and the favourites exactly as they are, and make sure the layout does not leave a gap where the button was.

**Result.** Removed the button, the `handleLocateNearbyStops` handler, the `navigator.geolocation` call, the `locationStatus` and `locationMessage` state and the location banner. Layout reflowed so no gap remains.

---

### Prompt 3 — General error fix (produced an unintended regression)
Not tied to a finding. Recorded because of what it did.

> Fix the errors in the app

**Result.** The agent guarded the Disqus embed script to the production domain and added `crossOrigin="anonymous"` plus an `onerror` handler, reporting the change as verified. The `crossOrigin` attribute broke Disqus entirely: `embed.js` is not served with CORS headers, so the browser blocked it, `window.DISQUS` was never defined and the comment container stayed empty. The build and the linter both passed, because the failure only occurs on the production domain. I found it by loading the live address and inspecting the script element. Corrected in Prompt 6.

---

### Prompt 4 — Remove the quick-stop chips
Follow-up to Prompt 2.
Commit: `c72f60a`

> REMOVE NEARBY AND QUICK STOP SECTION AS WELL

**Result.** Removed the "Nearby & Quick Stops" tab and the transit-hub chips, keeping the stop-code search, favourites and recent searches. This went beyond the finding and left a five-digit code as the only way into the route finder — which is the problem OJ had raised in his finding 1. Closed by Prompt 5.

---

### Prompt 5 — Bus stop name search
Serves: OJ Finding 1 (severity 3, heuristic 2). Also my own predictions.md finding 5.
Commit: `dce4635`

> In the Bus Route Finder on my Singapore stray adoption site, the only way to search is typing an exact five-digit bus stop code. Almost nobody in Singapore knows stop codes — they know the stop's name, or the name of the place they are near. The quick-stop chips and the nearby-stops button have both been removed, so a code is currently the only way in.
>
> Add bus stop name search to the same search field:
> - As the user types two or more characters that are not digits, show a short list of matching bus stops, each showing the stop name, the road name, and its five-digit code.
> - Partial matches must work: typing "anchor" surfaces stops whose name contains "Anchorvale", and typing "pasir" surfaces Pasir Ris stops. Matching is case-insensitive and matches anywhere in the name, not just the start.
> - Selecting a suggestion fills in that stop's code and runs the route search exactly as a typed code does today.
> - A five-digit code typed directly must still work exactly as it does now, including leading zeroes and the existing digit counter and validation.
> - Show at most five suggestions, and if nothing matches say so in one short line rather than showing an empty list.
>
> The stop names and codes must come from the same LTA source the route finder already uses, so that a selected suggestion always resolves to a stop the route API can answer. If the current API route cannot return a name-to-code lookup, add one.
>
> Keep the suggestion list in the existing visual style of the card. Do not change the layout, the destination logic, or anything outside the search field and its results.

**Result.** Added `api/busStopsData.js` and `api/bus-stops.js`, a name-to-code lookup on `/api/routes-to-shelter?search=`, and an autocomplete list in the search field. Verified on the live address: `?q=anchor` returns the Anchorvale stops, `?q=pasir ris` returns the interchange, and a nonsense query returns an empty list rather than an error. Five-digit codes still work unchanged.

---

### Prompt 6 — Restore Disqus
Corrects the regression introduced by Prompt 3.
Commit: `0f21b95`

> In src/components/DisqusComments.tsx, the Disqus embed script is injected with crossOrigin="anonymous". Remove that attribute entirely.
>
> Disqus's embed.js is not served with CORS headers, so requesting it in CORS mode causes the browser to block it: window.DISQUS is never defined and the #disqus_thread container stays empty. I confirmed on the live site that removing crossOrigin lets the script load and the comment thread render.
>
> Remove only the crossOrigin attribute. Keep the production-domain guard, the onerror handler and the development fallback card exactly as they are. Do not change anything else in the file.

**Result.** Attribute removed, guard and fallback kept. Verified on the live address: the script loads, `window.DISQUS` is defined and the thread renders with all four comments.

---

### Prompt 7 — Weather timestamp and expiry
Serves: RK Finding 3 (severity 2, heuristic 1) and the first half of OJ Finding 4 (severity 2, heuristic 2).
Commit: `e11477c`

> My /api/weather route returns only the area, the forecast and the validity period. The Pasir Ris Weather card shows a forecast under a "LIVE DATA" badge with no indication of when it was fetched or issued, while the Bus Route Finder directly above it shows "Updated 1 min ago".
>
> Change the weather route to also return the time the forecast was issued or fetched, and show it on the weather card in the same "Updated X ago" style the bus panel already uses, so the two live panels are consistent.
>
> Also: when the forecast's validity period has already passed, stop showing the "LIVE DATA" badge and mark the reading as out of date instead of presenting it as current.

**Result.** `/api/weather` now returns `issued_at`, `fetched_at`, `valid_period_start`, `valid_period_end` and `is_expired`. The card prints "Updated X ago" with the same 15-second ticker as the bus panel, and an expired window is badged "OUT OF DATE" instead of "LIVE DATA". Verified against the live route.
