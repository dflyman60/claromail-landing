# Claro pricing & offer (source of truth)

Use this when building claromail.app pages (home, pricing, checkout CTAs). Product name is **Claro** (not Calro).

Site: https://claromail.app  
Extension repo: https://github.com/dflyman60/claro  
Landing repo: this project (`claromail-landing`)

---

## One-sentence proposition

**Try 100 emails free. Clean your entire Microsoft inbox for $19.99. Come back anytime for $5. No subscription.**

---

## Tiers (customer-facing)

### Try Claro — Free

**Headline ideas:** “Try Claro — Free” / “See what Claro can do with your inbox.”

- Connect **1** Microsoft email account  
- **Analyze the inbox** (full mailbox analysis — not capped at 100 for the *report*)  
- **Clean up to 100 emails**  
- No credit card required  

**Important product rule:** Free users get a **full analyze / preview report** so they see the size of the problem *before* paying. Then they may clean **100** emails for free. Do **not** market free as “only 20 emails” or a short time trial.

### Inbox Clean — $19.99

**Headline ideas:** “Inbox Clean” / “Give your inbox the full treatment.”

- Clean **unlimited** emails  
- **1** Microsoft email account  
- **7 days** of unlimited cleaning  
- **No subscription** (pay once)  
- Unlocks **Return Clean ($5)** for that account afterward  

### Return Clean — $5

**Headline ideas:** “Already used Claro?” / “Return Clean”

- Come back anytime  
- Clean everything that piled up **since the last Claro cleanup**  
- Not marketed as a vague “quick window” — call it **Return Clean**, not “Quick Clean”  
- Internally we may use 48h / 72h / “since last cleanup” rules; customers only need: *since your last cleanup*

---

## Conversion psychology (build pages around this)

1. User connects Microsoft account (free).  
2. Claro **analyzes the whole mailbox** and shows a preview report, e.g.:

   > We found **18,742** emails you may not need.  
   > - 6,421 newsletters  
   > - 4,810 promotions  
   > - 2,316 notifications  
   > - 1,847 old automated messages  

3. User cleans **100** for free → “holy crap, this works.”  
4. They’re left staring at the remaining ~18k → **Continue cleaning — $19.99**.  

That is the primary conversion moment. Pricing page and in-product paywall should both reinforce it.

---

## Suggested page structure

### Homepage
- Brand: **Claro**  
- Hero: clear inbox / soft-delete + block (existing)  
- Short offer strip: Free → $19.99 → $5 Return Clean  
- CTA: Get the Chrome extension / See pricing  

### Pricing page (`/pricing` or section)
Three clear cards matching the tiers above.  
Footer line: *No subscription. Pay once for Inbox Clean. Return when you need to.*

### Checkout CTAs (later, Stripe)
- “Continue cleaning — $19.99” → Stripe Checkout (Inbox Clean)  
- “Return Clean — $5” → Stripe Checkout (Return Clean)  
Success/cancel URLs on claromail.app  

Until Stripe is live, buttons can be “Coming soon” or “Request access” / waitlist.

---

## Copy do / don’t

| Do | Don’t |
|---|---|
| Claro | Calro / Calero |
| Return Clean | Quick Clean (for the $5 product) |
| Pay once / no subscription | Imply monthly unless we add it later |
| Full analyze free + 100 cleans | Free = tiny sample of 20 only |
| Soft-delete / Deleted Items safety | Promise permanent wipe |

---

## Preview report categories (for marketing + future product UI)

Initial clutter buckets for the free analyze report:

- Newsletters  
- Promotions  
- Notifications  
- Old automated messages  

Headline: **“We found X emails you may not need.”**  
Tone: *likely / may not need* — not absolute legal claims.

---

## Infra note (for when we build billing — not required for static pricing page)

Payments are **not** via Chrome IAP (Google deprecated Store payments). Pattern:

- Stripe Checkout on claromail.app  
- Claro API + DB: entitlement per Microsoft account (free cleans used, Inbox Clean expiry, last cleanup, Return Clean)  
- Extension checks entitlement before cleanup beyond free 100  

Accounting (later): one Stripe account, multiple Products; Wave (or other) splits payouts by product for revenue reporting.

Details for the extension team live in the `claro` repo when we add `docs/entitlements-infra.md`.

---

## Locked numbers (as of 2026-08-12)

| SKU | Price | Notes |
|---|---|---|
| Free | $0 | Full analyze + 100 cleans · 1 Microsoft account |
| Inbox Clean | $19.99 | Unlimited · 7 days · unlocks Return Clean · 1 account · no sub |
| Return Clean | $5 | Since last cleanup · anytime |

Update this file if prices or rules change — treat it as the landing-page source of truth.
