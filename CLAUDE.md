# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a course study material repository containing PDFs and context files for 4 university courses:

- **MachineLearning/** — 11 lecture PDFs on classical ML (foundations through ensemble methods + XAI)
- **NeuralComputing/** — 19 PDFs (perceptron theory, Hopfield networks, backprop, RNNs, CNNs + exercises with solutions)
- **ReinforcementLearning/** — 10 lecture PDFs (fundamentals through policy approximation + neuroscience context)
- **Security/** — 20 PDFs (11 lectures spanning crypto, network security, web security, identity management + supplementary handouts)

Each course folder contains a `context/` subdirectory with PDFs and a `CONTEXT.md` index file listing all PDFs and their main topics.

## Course Indexing

Each course folder has a **CONTEXT.md** file mapping PDF filenames to topics. These files enable Claude to quickly locate relevant material without re-analyzing PDFs.

Example: To explain "SVM", Claude reads `MachineLearning/CONTEXT.md`, finds the relevant PDF, and reads that section.

## Study Skills

Four interactive study skills are available in `~/.claude/skills/`:

### `/study-quiz <course> <topic>`
Generates 5 questions with scoring and explanations from course PDFs.
```
/study-quiz ml decision trees
/study-quiz security crypto
```

### `/study-explain <concept>`
3-tier explanation (intuition → formal definition → example) sourced from relevant PDFs.
```
/study-explain backpropagation
/study-explain Markov decision process
```

### `/study-cards <course> <topic>`
10 interactive flashcards with tracking of difficult cards.
```
/study-cards nc hopfield
/study-cards rl bandits
```

### `/study-exam <course>`
10-question full mock exam spanning all topics in a course.
```
/study-exam ml
/study-exam sec
```

Course shortcuts: `ml`, `nc`, `rl`, `sec`

See `SKILLS.md` in project root for quick reference.

## Working with Material

### Asking Questions About Content

When you need to answer questions about course material:

1. Check the relevant `CONTEXT.md` to locate the topic
2. Read the PDF section(s) covering that topic
3. Answer the question with cited sources (PDF name, section)

Example workflow for "What is LIME?":
- Read `MachineLearning/CONTEXT.md` → find "ML_Session_11_25_xAI.pdf"
- Read that PDF's LIME section
- Explain with page/section reference

### Running Study Sessions

When user invokes a study skill:

1. Parse course shorthand and topic from command
2. Locate relevant PDF(s) via CONTEXT.md
3. Execute the skill's workflow (quiz generation, explanation, flashcards, or exam)
4. Provide feedback and track performance

### Cross-Course Questions

For questions spanning multiple courses (e.g., "Compare gradient descent in ML and RNNs"):

1. Search both `MachineLearning/CONTEXT.md` and `NeuralComputing/CONTEXT.md`
2. Read relevant sections from both courses
3. Synthesize comparison with citations from both sources

## File Structure

```
AllCourseInfo/
├── CLAUDE.md                    (this file)
├── SKILLS.md                    (quick skill reference)
├── MachineLearning/
│   ├── CONTEXT.md              (11 PDF index + topics)
│   └── context/                (11 lecture PDFs)
├── NeuralComputing/
│   ├── CONTEXT.md              (19 PDF index + topics)
│   └── context/                (19 PDFs: lectures + exercises/answers)
├── ReinforcementLearning/
│   ├── CONTEXT.md              (10 PDF index + topics)
│   └── context/                (10 lecture PDFs)
└── Security/
    ├── CONTEXT.md              (20 PDF index + topics)
    └── context/                (20 PDFs: 11 lectures + handouts)
```

## Important Patterns

### CONTEXT.md Format

Each `CONTEXT.md` lists:
- Filename of each PDF
- Main topics covered (2-3 keywords)
- 1-2 line summary of content

Claude uses these to route queries to specific PDFs without re-reading all material.

### Study Workflow

Typical study session:
1. User picks a course or topic
2. User invokes a study skill (`/study-quiz`, `/study-explain`, `/study-cards`, `/study-exam`)
3. Claude reads relevant CONTEXT.md → finds PDF → reads relevant section → executes skill
4. Interactive feedback loop (quiz answers, flashcard reviews, exam scoring)

### Citation Standard

When explaining content, always cite:
- PDF filename (e.g., "ML_Session_4_26.pdf")
- Section/topic name if available
- Page number if precise

Example: "Decision trees use information gain (entropy reduction) to select splits. See ML_Session_4_26.pdf, 'Tree Growing Algorithms' section."
