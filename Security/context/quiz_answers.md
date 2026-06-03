# Security Quiz — ANSWER KEY

---

## 1. True / False (1.0p each)

**1a.** Mixing of data and code is the main reason for SQL injection attacks.
- [x] True
- [ ] False

> SQL injection occurs when user input is concatenated directly into queries, mixing untrusted data with code.

**1b.** HTTP is a stateless protocol.
- [x] True
- [ ] False

> Each HTTP request is independent; no session state is kept between requests.

**1c.** Same-origin policy prevents stealing cookies on the server side.
- [ ] True
- [x] False

> SOP is a browser-side mechanism; it does not protect server-side cookies.

**1d.** Message Authentication Codes may use cryptographic hash functions.
- [x] True
- [ ] False

> MACs can be built from hash functions (e.g. HMAC-SHA256).

**1e.** Return-to-libc attacks can be mitigated with Control Flow Integrity.
- [x] True
- [ ] False

> CFI restricts indirect jump/return targets to valid control-flow paths, blocking ret2libc.

**1f.** TLS can be used to protect cookies from theft.
- [x] True
- [ ] False

> TLS encrypts data in transit, protecting cookies from network eavesdroppers.

**1g.** Browser fingerprinting techniques rely on cookies exchanged in the HTTP headers.
- [ ] True
- [x] False

> Fingerprinting uses browser properties (plugins, fonts, resolution, etc.), not cookies.

**1h.** Access control (access to friend lists, photos, posts, etc.) on social networks is usually implemented as the Mandatory Access Control scheme.
- [ ] True
- [x] False

> Social networks use Discretionary Access Control — users grant permissions themselves.

**1i.** It is safe to post your public key on public websites and give it to strangers: your communication is secure even if the adversary knows this key.
- [x] True
- [ ] False

> Public keys are designed to be shared openly; only the private key must stay secret.

**1j.** Signature-based IDSs are called as such because they recognize an attack based on the public key signature of the source host.
- [ ] True
- [x] False

> They match known malicious patterns/signatures in traffic, not cryptographic signatures.

---

## 2. Multi-select (1.0p each)

> To get the full mark you need to select all correct answers and none of the incorrect answers. Multiple (or no) answers can be correct.

**2a.** Which security goals are violated in the following scenario?

> We discovered that Brightspace allows all students to see grades of all other students. The issue has been traced to a former administrator.

- [x] Confidentiality
- [x] Accountability
- [ ] Integrity
- [ ] Availability
- [ ] Non-repudiation
- [ ] Authorization
- [ ] Authenticity
- [ ] Accuracy

> Unauthorized exposure of grades breaks confidentiality; a former admin causing it breaks accountability.

**2b.** What can users do to protect themselves from being tracked by websites?
- [ ] Use evercookie.
- [x] Use adblocker.
- [x] Clear browsing data.
- [ ] Frequently change passwords.
- [x] Disable third-party cookies.
- [ ] Enable third-party cookies.

> Adblock blocks trackers, clearing data removes cookies, disabling third-party cookies blocks cross-site tracking. Evercookie/enabling cookies enable tracking; password changes are irrelevant.

**2c.** Which steps does the attacker need to do for a stack smashing attack?
- [x] Load the shellcode on the stack.
- [x] Find a vulnerable code function.
- [x] Find location of the buffer on the stack.
- [ ] Find the shellcode on the stack.
- [ ] Find the stack.
- [x] Find the value of the stored `%rip`.
- [x] Find one or more `nop` instruction(s).

> Need vulnerable function, buffer location, saved %rip, load shellcode, and NOPs for padding/sled. (The attacker places the shellcode — does not "find" it; "find the stack" is not a discrete step.)

**2d.** Which of the following security goals are ensured by TLS?
- [x] Confidentiality of messages.
- [x] Integrity of messages.
- [x] Authenticity of messages.
- [x] Authenticity of parties (client and server).
- [ ] Confidentiality of parties (client and server).

> TLS gives message confidentiality (encryption), integrity + authenticity (MAC), and party authentication (certificates). It does not hide who the parties are.

**2e.** Which of the following represent valid two-factor authentication methods?
- [ ] voice pattern and movement pattern
- [x] PIN and fingerprint
- [ ] PIN and password
- [x] token and password
- [ ] voice pattern and token

> 2FA requires two DIFFERENT factor categories. PIN(know)+fingerprint(are) and token(have)+password(know) qualify. voice+movement are both inherence; PIN+password both knowledge; voice(are)+token(have) — actually two categories but voice-pattern test typically grouped as a single biometric factor here, so not accepted.

*(Note: voice+token mixes inherence+possession; if your course treats it as two distinct factors it would also be valid. Default key marks PIN+fingerprint and token+password.)*

---

## 3. Short answers (5.0p each)

**3a.** **Four risk-treatment strategies:** (1) **Accept** — acknowledge and bear the risk; (2) **Avoid** — eliminate the risk by not doing the risky activity / changing approach; (3) **Transfer** — shift the risk to a third party (e.g. insurance, outsourcing); (4) **Reduce/Mitigate** — apply countermeasures to lower likelihood or impact.

**3b.** **Discretionary Access Control (DAC):** an access-control model where the owner of a resource decides who may access it and with which rights. Permissions are granted at the owner's discretion (e.g. UNIX file permissions, social-network sharing settings).

**3c.** **Control Flow Integrity (CFI):** goal is to prevent attackers from hijacking a program's execution flow (e.g. ROP/ret2libc). It is ensured by computing the legitimate control-flow graph and enforcing at runtime that every indirect jump/call/return only targets valid, pre-approved locations.

**3d.** **Reflected XSS:** the attacker crafts a URL/request containing a malicious script; the vulnerable server echoes (reflects) that input back in its response without sanitization. The victim's browser executes the injected script in the site's origin, letting the attacker steal cookies/session tokens or act as the user.

**3e.** **STRIDE:** **Repudiation** — a user denies having performed an action → violates **non-repudiation** (and accountability). **Information disclosure** — unauthorized exposure of data → violates **confidentiality**. **Denial of Service** — making a system/resource unavailable → violates **availability**.

**3f.** **(1) Identification** — the user claims an identity (e.g. username). **(2) Authentication** — the system verifies that claim via credentials (password, biometric, token). **(3) Authorization** — the system decides which resources/operations the authenticated identity is permitted to access.

**3g.** **owner/group/world** exist to give graded levels of privilege: the owner needs full control, a group lets a defined set of collaborators share access, and world covers everyone else (default access). Three levels avoid having to enumerate every user individually. Example: a shared project file — owner can read/write, the project group can read/write, world can only read (or has no access).

**3h.** **Cookie theft locations + countermeasures:** (1) **In transit over the network** → encrypt with HTTPS/TLS (and `Secure` flag). (2) **In the browser via client-side JavaScript (XSS)** → set the `HttpOnly` flag so JS cannot read cookies. (3) **On/at the server (or via session fixation)** → regenerate session IDs after login and protect server stores. *(Other accepted: physical access to the client machine → disk encryption/screen lock.)*

**3i.** Decrypt "zhoo grqh" by shifting each letter back by 3: z→w, h→e, o→l, o→l | g→d, r→o, q→n, h→e → **"well done"**.

---

## 4. Analysis — Risk assessment (GitHub) (2.0p each)

**4a. Three important assets:**
1. **User code repositories** — the source code / intellectual property of millions of developers; core value and a supply-chain target.
2. **Authentication & authorization credentials** — OAuth/PATs, SSH keys, sessions that grant access to private repos and orgs.
3. **Platform infrastructure & data** — servers, databases, CI/CD systems that store and distribute code.

**4b. Three threat scenarios (impacting GitHub):**
1. **Credential compromise & unauthorized repo access** — stolen tokens/keys (phishing, malware, leaked secrets) enable access and malicious code injection into popular projects (supply-chain attack).
2. **Infrastructure breach & mass data exfiltration** — attackers (zero-day / social engineering) compromise internal systems and exfiltrate private repos, secrets, user data.
3. **DDoS / service disruption** — volumetric attacks on API/web infrastructure make the platform unavailable to millions.

**4c. Impact on assets:**
- *Credential compromise* → hits **credentials** and **code**: unauthorized read/modify of repos; injected code cascades downstream, damaging GitHub's trust model.
- *Infrastructure breach* → hits **all three** assets: direct access exposes code, embedded secrets, and credentials at scale.
- *DDoS* → hits **infrastructure (availability)**: users cannot reach code or manage accounts; revenue loss and SLA breaches.

**4d. Risk quantification:**

| Threat | Likelihood | Impact | Risk |
|--------|-----------|--------|------|
| Credential compromise | High (phishing/malware common) | High (supply-chain cascade) | **HIGH** |
| Infrastructure breach | Medium (strong defenses; needs advanced actor) | Critical (total compromise) | **HIGH** |
| DDoS | High (low barrier, attractive target) | Medium (availability only; good mitigation exists) | **MEDIUM-HIGH** |

**4e. One countermeasure per risk:**
1. *Credential compromise* → enforce **hardware security keys (FIDO2/WebAuthn)** + 2FA for high-value accounts/maintainers (eliminates phishing & stolen-token reuse). Partially implemented today.
2. *Infrastructure breach* → **zero-trust architecture + continuous monitoring** (network segmentation, mutual TLS, anomaly detection on credential/data-access patterns) for early breach detection.
3. *DDoS* → **anycast CDN with automatic mitigation and rate limiting** (edge absorption/filtering, throttling unauthenticated API endpoints). Already deployed.

---

## 5. Analysis — Base Rate Fallacy

Model a population of 10⁶ packets. Base rate 1/10⁵ → 10 malicious, ~999,990 benign.
Detection (TP) rates from the 10-packet test; false-positive rates from the million-benign test.

**5a. (2.5p) AdvanceDetectSyst:** TP rate = 2/10 = 0.2; FP rate = 1/10⁶.

P(mal | alert) = (0.2 × 10⁻⁵) / (0.2 × 10⁻⁵ + 10⁻⁶ × (1−10⁻⁵))
= 2×10⁻⁶ / (2×10⁻⁶ + ~1×10⁻⁶) = 2/3 ≈ **67%**

(In the 10⁶ population: ~2 true alerts + ~1 false alert ⇒ 2/3.)

**5b. (2.5p) B3S4fe:** TP rate = 9/10 = 0.9; FP rate = 50/10⁶.

P(mal | alert) = (0.9 × 10⁻⁵) / (0.9 × 10⁻⁵ + 50×10⁻⁶ × (1−10⁻⁵))
= 9×10⁻⁶ / (9×10⁻⁶ + ~50×10⁻⁶) = 9/59 ≈ **15%**

(In the 10⁶ population: ~9 true alerts + ~50 false alerts ⇒ 9/59.)

**5c. (5.0p) Choice: AdvanceDetectSyst.**
- An ADS alert is malicious 67% of the time vs only 15% for B3S4fe — far higher precision, so alerts are actionable instead of noise.
- ADS's far lower false-positive rate (10⁻⁶ vs 50×10⁻⁶) avoids alert fatigue, the core lesson of the base-rate fallacy: a high detection rate is worthless if false positives swamp the true ones.
- Trade-off: ADS misses more attacks (20% vs 90% detection). If near-total detection is mandatory you could keep B3S4fe but you must add a second filtering stage to cut its false positives — otherwise its alerts are mostly false alarms. With the stated constraints, ADS is the better standalone choice.

---

## 6. Analysis — Vulnerable program

**6a. (7.5p)**

**Element A — NOP sled (70 × `0x90`):** `0x90` is the x86 NOP instruction. A run of NOPs forms a "sled": execution that lands anywhere in it harmlessly slides forward into the shellcode. This relaxes precision — the overwritten return address only has to point *somewhere* in the sled, not at the exact shellcode byte.

**Element B — shellcode (30 bytes):** position-independent x86-64 machine code that performs `execve("/bin/sh", NULL, NULL)`. It sets up the registers (rdi="/bin/sh", rsi=0, rdx=0, rax=0x3b = execve syscall number) and issues `syscall` (`0x0f 0x05`), spawning an interactive shell once control reaches it.

**Element C — padding + return address (36 × `0x42` then `70 ec ff ff ff 7f`):** `username[128]` has no bounds check, so the input overflows the stack frame. The 36 `'B'` bytes fill the gap from the buffer's end up to the saved return pointer (saved `%rip`). The final 8 bytes overwrite that saved return address with `0x00007fffffffec70` (little-endian) — an address inside the NOP sled. When `authorized()` returns, control jumps to that address → into the sled → slides into the shellcode → shell.

**Flow:** overflow buffer → overwrite saved %rip with stack address → return jumps into NOP sled → executes shellcode → attacker gets `/bin/sh`.

**6b. (2.5p)** The vulnerable line is `scanf("%s", username);` — `%s` is unbounded and writes past the 128-byte buffer. Fix it with a bounded read:
- `scanf("%127s", username);` (leave 1 byte for the NUL), or preferably
- `fgets(username, sizeof(username), stdin);`

Additionally enable system-level mitigations: **stack canaries** (`-fstack-protector-strong`) to detect the overwrite before return, **NX/DEP** (non-executable stack) so the shellcode cannot run, and **ASLR** so the hardcoded `0x7fffffffec70` address no longer reliably hits the sled.

---

## 7. Analysis — RSA

Alice's private primes p = 5, q = 7; public exponent e = 5.

**7a. (1.0p)** n = p × q

**7b. (1.0p)** n = 5 × 7 = **35**

**7c. (1.0p)** λ = lcm(p−1, q−1)  *(Carmichael; φ = (p−1)(q−1) = 24 is also acceptable)*

**7d. (1.0p)** λ = lcm(4, 6) = **12**

**7e. (1.0p)** d = e⁻¹ mod λ  (i.e. e·d ≡ 1 mod λ)

**7f. (2.0p)** 5·d ≡ 1 (mod 12) → 5·5 = 25 ≡ 1 (mod 12) → **d = 5**

**7g. (1.0p)** c = mᵉ mod n

**7h. (2.0p)** c = 2⁵ mod 35 = 32 mod 35 = **32**

---

## 8. Space for comments (0.0p, optional, not graded)

- **2e:** Default key = {PIN+fingerprint, token+password}. If your lecture treats "voice pattern" + "token" as two distinct factors (inherence + possession), that pair is also valid — check course definition.
- **7c/7d:** Key uses Carmichael λ = lcm = 12. If the course uses Euler φ = (p−1)(q−1) = 24, then d = e⁻¹ mod 24 = 5 as well (5·5=25≡1 mod 24), so d = 5 either way.
