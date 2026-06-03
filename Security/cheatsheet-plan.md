# Security Cheat Sheet — Plan

A4, double-sided, ONE sheet. Goal: max info, min space. Allowed in exam.

## Files
- `cheatsheet.tex` — the sheet (compile to PDF)
- `cheatsheet-plan.md` — this file (plan + fill rules)

## Render target: OVERLEAF
- User renders on **Overleaf** (full TeX Live). pdfLaTeX engine.
- Pictures supported: upload image files to Overleaf project, use `\fig{filename}{widthcm}` or inline `tikz`.
- Good spots for pics: stack-layout diagram (memory section), RSA flow, STRIDE table as graphic.

## Font size: PUSH TO PRINTER LIMIT
- Target print = **industrial printer ~1000 dpi** → can resolve ~4pt text cleanly.
- Body base = 5pt (`\bodyfont`). Dense blocks/answer key use `\fivept` macro (4pt). (`extarticle` 8pt class option overridden manually.)
- To shrink more: lower `\fivept` fontsize + `\linespread`. ALWAYS test-print one column before trusting.

## Answer key on page (REQUIRED)
- The quiz (`context/quiz.md`) **with correct answers** must be ON the sheet too — Section 7.
- Ultra-tiny (`\fivept`). `\ans{}` macro highlights correct choice.
- Caveman style: answer + 2-word reason. e.g. `1c F - SOP client-side`.

---

## SPACE-EFFICIENCY TECHNIQUES (already wired in .tex)

1. **Margins** — geometry 0.3cm all sides. Eats almost no paper border.
2. **4 columns** — `multicol` w/ 4 cols, tiny column gap (0.3em), no rule.
3. **Tiny font** — base 5pt, `\scriptsize`/`\tiny` blocks. Readable w/ good print + eyes.
4. **Line spacing crushed** — `\linespread{0.85}`, `\setlength\baselineskip`. Lines almost touch.
5. **No paragraph spacing** — `\parindent 0`, `\parskip 0pt`.
6. **Compact headers** — `titlesec` removes vertical space above/below section titles; colored bars instead of big gaps.
7. **Tight lists** — `enumitem` `nosep`, `leftmargin=*`, no bullet indent waste.
8. **Boxes for grouping** — colored mini-headers (\hd{}) instead of blank-line separators.
9. **Tables w/o rules** — `\arraystretch` tiny, kill row padding. Use tables for key/value (algo→formula).
10. **Abbreviations** — define short macros for repeated long terms (see Caveman rules).
11. **Math inline** — keep formulas inline `$...$` not display, save vertical space.
12. **Color = signal** — red=critical, blue=section, no decorative color (ink waste irrelevant, space matters).

### Extra ideas (apply when filling)
- **No full sentences.** Telegraphic. `X does Y via Z.`
- **Symbols over words**: → ⇒ ∴ ≈ ≤ ⊕ ∧ ∨ ¬ ∀ ∃. Use `=` for "is".
- **Merge T/F facts** into single-line "fact + verdict".
- **Group by exam section** so lookup during exam is fast (mirror quiz structure).
- **Worked examples compressed** — show only the steps that matter (RSA, base-rate Bayes, Caesar).
- **Decision tables** beat prose (e.g. STRIDE→goal, DAC vs MAC).
- **Put the heavy-math reference up top** (RSA, base rate) — most time-saving in exam.
- If overflow: drop font to 4.5pt on least-critical column, or move T/F trivia to margins.

---

## CAVEMAN FILL RULE (IMPORTANT — read before filling content)

When filling info into `cheatsheet.tex`, write in **caveman style**:
drop articles (a/an/the), drop filler, fragments OK, telegraphic.
Keep ALL technical substance: exact terms, formulas, numbers, attack steps, verbatim definitions where precision matters.

> Pattern: `[thing] = [what] via [how]. [gotcha].`
> NOT: "The same-origin policy is a mechanism that prevents..."
> YES: "SOP = browser blocks cross-origin DOM/cookie read. Per (scheme,host,port)."

Reason: caveman = same info, ~75% fewer tokens = ~75% less page space. Exact fit for cheat sheet.

Exceptions (write normal/precise, do NOT compress to ambiguity):
- Math formulas — write exactly (RSA d, λ, base-rate Bayes).
- Attack step ORDER — keep sequence clear (stack smashing).
- Anything where dropping a word flips the meaning (security goals).

---

## LECTURE COVERAGE (ALL 11 must appear — quiz prioritised by SIZE not omission)

Verified against `CONTEXT.md`. Every lecture has a section in `cheatsheet.tex`. Quiz-heavy = big block, quiz-absent = tiny block.

| Lecture (PDF) | Sheet section | Quiz weight | Size |
|---|---|---|---|
| L1 Les1 Intro/Fundamentals | L1 Foundations | med (goals 2a) | small |
| L2 Les2 Risk & Threat Model | L2 Risk & Threat | HIGH (3a,3e,4) | big |
| L3 Les3 Symmetric Crypto | L3 Symmetric | low (Caesar 3i) | small |
| L4 Les4 Asymmetric/RSA | L4 Asymmetric/RSA | HIGH (7,1d,1i) | big |
| L5 Les5 Network Security | L5 Network | med (IDS 1j, base rate 5) | med |
| L6 Sec2025_25 App Security | L6 App Sec/Exploit | HIGH (6a,2c) | big |
| L7 Sec2025_26 App Defences | L7 App Defences | HIGH (1e,3c,6b) | big |
| L9 Les9 Web Security | L9 Web Security | HIGH (1a-c,1f,2d,3d,3h) | big |
| L11 Les11 Access/IAM | L11 Access Control | HIGH (1h,2e,3b,3f,3g) | big |
| Leiden Web Privacy | Web Privacy | med (1g,2b) | small |
| L12 Les12 Secure Computation | L12 Secure Comp | none in quiz | TINY |

Rule: do NOT drop any lecture even if quiz ignores it (exam may test it). But spend page space proportional to quiz weight. L12 = bare keyword list only.

If overflow: shrink L1/L3/L12/Privacy first (lowest quiz weight); never cut HIGH blocks.

## CONTENT MAP (fill detail — ranked by exam weight)

Fill these blocks. Ranked by exam weight (most points first).

### 1. Risk mgmt + threat modeling  ⭐ heaviest
- 4 risk treatment strategies (accept / avoid / mitigate / transfer) — explain each
- Security goals: CIA + Authenticity, Accountability, Non-repudiation, Authorization, Accuracy
- STRIDE: each threat → goal it violates (table). Focus: Repudiation, Info disclosure, DoS
- Risk = likelihood × impact. Risk assessment steps (assets→threats→impact→quantify→countermeasure)

### 2. Memory / software exploitation
- Stack smashing steps (ordered): find vuln fn → find buffer loc → find stored %rip → load shellcode → overwrite ret addr
- Stack layout diagram (buffer ↑ saved rbp ↑ saved rip)
- Shellcode anatomy: NOP sled (\x90) | shellcode (execve /bin/sh) | padding | return addr (overwrite rip)
- Defenses: stack canary, NX/DEP, ASLR, CFI, ret2libc bypass of NX → CFI mitigates
- SQLi = data+code mixing. Fix: parameterized queries
- CFI = restrict indirect jumps to valid targets

### 3. Crypto  ⭐ math
- RSA full recipe: n=p·q | λ=lcm(p-1,q-1) | d=e⁻¹ mod λ | c=mᵉ mod n | m=cᵈ mod n
  - WORKED: p=5,q=7,e=5 → n=35, λ=lcm(4,6)=12, d=5 (5·5=25≡1 mod12), m=2→c=2⁵=32 mod35=32
- Symmetric vs asymmetric (key count, speed, use)
- MAC = integrity+auth, may use hash (HMAC). ≠ encryption
- Hash props: one-way, collision-resist
- Caesar: shift cipher, key=3, decrypt = shift back. "zhoo grqh"→"well done"
- Public key: safe to publish. Confidentiality via recipient pubkey; signature via own privkey

### 4. Web / browser security
- HTTP stateless → state via cookies/sessions
- SOP: per (scheme,host,port); blocks cross-origin read; does NOT protect server side
- TLS: confidentiality + integrity + authenticity (server always, client optional). Protects cookies in transit
- Cookie theft locations: in transit (→TLS), XSS/JS (→HttpOnly), server breach/storage (→hashing/encrypt)
- XSS reflected: payload in request reflected unsanitized into response, runs in victim browser
- Tracking defenses: adblock, clear data, disable 3rd-party cookies. Fingerprinting ≠ cookies (uses headers/canvas/fonts)

### 5. Access control / IAM
- Identification (who claim) → Authentication (prove) → Authorization (allowed?)
- DAC: owner sets perms (UNIX). MAC: system/policy sets (labels, mil). Social nets = DAC not MAC
- UNIX owner/group/world: 3 granularity levels; example: shared project file (owner edit, group read, world none)
- 2FA = 2 different factors (know/have/are). Valid: PIN+fingerprint, token+password. Invalid: PIN+password (both know)

### 6. IDS + base rate fallacy
- IDS types: signature (known patterns) vs anomaly (deviation). Signature-based = pattern match, NOT pubkey
- Base rate fallacy: rare events → many false positives dominate
- Bayes: P(mal|alert) = P(alert|mal)P(mal) / [P(alert|mal)P(mal)+P(alert|benign)P(benign)]
  - WORKED template w/ quiz numbers (prevalence 1/10⁵, TPR, FPR) — fill at end

---

## LAYOUT (front/back)
- **Front**: Sections 1–3 (risk, memory, crypto) — heaviest, math up top-left.
- **Back**: Sections 4–6 (web, access, IDS) + any overflow + worked examples.
- Worked math examples get their own boxed cells (RSA, Bayes) — most exam-time saved.
