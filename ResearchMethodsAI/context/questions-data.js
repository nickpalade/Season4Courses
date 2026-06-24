window.RMAI_QUESTIONS = [
  {
    "id": "L1-Q1",
    "source": "L1 Slides",
    "topic": "Confirmation bias in practice",
    "question": "[MID] Dr. Vos believes her new tutoring chatbot improves grades. While reviewing logs, she carefully reads every transcript where students improved, but skims past sessions where grades dropped, assuming those students 'didn't use it properly'. Which cognitive trap best describes this?",
    "options": [
      ["A", "Availability heuristic - the vivid improvement stories dominate her recall"],
      ["B", "Confirmation bias - she weights evidence according to her prior belief"],
      ["C", "Sampling bias - the transcripts she reviews are a non-random subset"],
      ["D", "Hindsight bias - the improvements look predictable once she has read them"]
    ],
    "answer": "B",
    "note": "The subset she reads is non-random, but the selection is driven by her belief - that motivated weighting is confirmation bias. Sampling bias refers to unrepresentativeness arising at data collection, not belief-driven reading; availability would require her judging frequency by recall ease, and hindsight bias is about feeling outcomes were foreseeable.",
    "anchor": "Research Methods AI — L1 Slides"
  },
  {
    "id": "L1-Q2",
    "source": "L1 Slides",
    "topic": "Availability heuristic",
    "question": "[MID] After two widely reported incidents of AI chatbots giving dangerous medical advice, a policy student estimates that 'most' chatbot health answers are harmful, even though audits show error rates below 3%. Which heuristic best explains the overestimate?",
    "options": [
      ["A", "Availability heuristic - the memorable incidents come to mind easily"],
      ["B", "Anchoring - the first incident set a reference point for the estimate"],
      ["C", "Confirmation bias - the student already distrusted chatbot advice"],
      ["D", "Representativeness - the incidents fit the stereotype of dangerous AI"]
    ],
    "answer": "A",
    "note": "Frequency is being judged by how easily examples come to mind - the defining mechanism of availability. Representativeness would involve judging category membership by similarity, anchoring requires a numeric starting value being adjusted from, and nothing in the scenario says the student held a prior belief.",
    "anchor": "Research Methods AI — L1 Slides"
  },
  {
    "id": "L1-Q3",
    "source": "L1 Slides",
    "topic": "Representativeness and base rates",
    "question": "[HARD] Kim is quiet, loves logic puzzles, and codes on weekends. Asked whether Kim is more likely (a) a professional AI researcher or (b) a schoolteacher, most people pick (a) - yet there are vastly more schoolteachers than AI researchers. What error are they making?",
    "options": [
      ["A", "Availability heuristic - AI researchers are more salient in the media"],
      ["B", "Anchoring - the description anchors judgment on the first profession listed"],
      ["C", "Representativeness heuristic - similarity to a stereotype overrides base rates"],
      ["D", "Confirmation bias - people seek traits that confirm the researcher label"]
    ],
    "answer": "C",
    "note": "The judgment is driven by how well Kim's description matches the stereotype of an AI researcher while ignoring how rare that profession is - the classic representativeness error. Media salience (availability) could contribute, but the question describes matching a personality sketch to a category, which is representativeness territory; the slides' Arthur problem has exactly this structure.",
    "anchor": "Research Methods AI — L1 Slides"
  },
  {
    "id": "L1-Q4",
    "source": "L1 Slides",
    "topic": "First principle of science",
    "question": "[EASY] Feynman's dictum, quoted in the lecture as the first principle of scientific thinking, states that:",
    "options": [
      ["A", "Extraordinary claims require extraordinary evidence"],
      ["B", "A theory that explains everything explains nothing"],
      ["C", "You must not fool yourself - and you are the easiest person to fool"],
      ["D", "All models are wrong, but some are useful"]
    ],
    "answer": "C",
    "note": "All four are famous scientific aphorisms (Sagan, Popper-style, Feynman, Box), but the lecture's first principle is Feynman's warning about self-deception: methods exist to protect you from your own cognition.",
    "anchor": "Research Methods AI — L1 Slides"
  },
  {
    "id": "L1-Q5",
    "source": "L1 Slides",
    "topic": "Empirical cycle - phase order",
    "question": "[EASY] Place the empirical cycle in its correct order:",
    "options": [
      ["A", "Observation → Induction → Deduction → Testing → Evaluation"],
      ["B", "Observation → Deduction → Induction → Testing → Evaluation"],
      ["C", "Observation → Induction → Testing → Deduction → Evaluation"],
      ["D", "Observation → Deduction → Testing → Induction → Evaluation"]
    ],
    "answer": "A",
    "note": "From specific cases you generalize to a hypothesis (induction), then derive a concrete testable prediction from it (deduction), then test and evaluate. The most common confusion is swapping induction and deduction: induction goes specific→general, deduction goes general→specific.",
    "anchor": "Research Methods AI — L1 Slides"
  },
  {
    "id": "L1-Q6",
    "source": "L1 Slides",
    "topic": "Empirical cycle - induction",
    "question": "[MID] A support team notices that several customers who waited more than five minutes in the chatbot queue later cancelled their subscriptions. From this they form the general claim: 'long waiting times drive churn'. In the empirical cycle, forming this claim is:",
    "options": [
      ["A", "Observation - the team noticed a recurring pattern in the data"],
      ["B", "Deduction - they inferred the cause of churn from the cases"],
      ["C", "Induction - they generalized from specific cases to a hypothesis"],
      ["D", "Evaluation - they interpreted the cancellations as supporting evidence"]
    ],
    "answer": "C",
    "note": "Noticing the cases is observation, but the question asks about the next step: moving from particular instances to a general claim, which is induction. Deduction would run the other way - deriving a specific prediction from the general claim. Evaluation only happens after a test has produced results.",
    "anchor": "Research Methods AI — L1 Slides"
  },
  {
    "id": "L1-Q7",
    "source": "L1 Slides",
    "topic": "Empirical cycle - deduction",
    "question": "[MID] Continuing the churn example: the team reasons, 'If long waits drive churn, then cutting average wait time below two minutes should reduce cancellations next quarter.' Which phase of the empirical cycle is this?",
    "options": [
      ["A", "Induction - extending the wait-churn link to a new quarter"],
      ["B", "Deduction - deriving a specific testable prediction from the hypothesis"],
      ["C", "Testing - stating what the data will show under the hypothesis"],
      ["D", "Evaluation - assessing whether the hypothesis survived the evidence"]
    ],
    "answer": "B",
    "note": "They start from the general hypothesis and derive a concrete, falsifiable prediction - general to specific is deduction. It only becomes testing once data is actually collected, and evaluation once result and prediction are compared. Induction would be building the general claim, which already happened.",
    "anchor": "Research Methods AI — L1 Slides"
  },
  {
    "id": "L1-Q8",
    "source": "L1 Slides",
    "topic": "Confounding variables",
    "question": "[MID] A wellness app reports: 'Users who enable our night-mode screen filter sleep 40 minutes longer.' A skeptic replies that people who enable night mode are probably people who already care about sleep hygiene. In the skeptic's critique, 'caring about sleep hygiene' plays the role of:",
    "options": [
      ["A", "A confounding variable, offering an alternative explanation for the link"],
      ["B", "A reverse cause, with longer sleep leading users to enable the filter"],
      ["C", "A sampling bias, making filter users unrepresentative of all users"],
      ["D", "A moderator variable, strengthening the filter's effect on sleep"]
    ],
    "answer": "A",
    "note": "Sleep-hygiene motivation plausibly drives both filter adoption and longer sleep - a third variable correlated with cause and effect, i.e., a confound threatening internal validity. Reverse causation is a different critique (the outcome causing the exposure), sampling bias concerns generalization rather than the causal link, and a moderator changes the size of a real effect rather than explaining it away.",
    "anchor": "Research Methods AI — L1 Slides"
  },
  {
    "id": "L1-Q9",
    "source": "L1 Slides",
    "topic": "External validity and sampling",
    "question": "[MID] A lab study at a technical university concludes that 'people quickly learn to distrust over-confident AI assistants', based on 60 computer science undergraduates. The strongest threat to this conclusion as stated is:",
    "options": [
      ["A", "Sampling bias - the conclusion targets 'people' but the sample is narrow"],
      ["B", "A confound - prior AI experience varied within the participant group"],
      ["C", "Low statistical power - 60 participants is too few to detect the effect"],
      ["D", "Demand characteristics - participants guessed the study's hypothesis"]
    ],
    "answer": "A",
    "note": "The conclusion generalizes to 'people', yet CS undergraduates differ systematically (age, tech fluency, AI familiarity) from that population - an external validity problem rooted in the sample. The effect was detected, so power is not the issue; within-group variation in experience is noise rather than a confound between conditions; demand characteristics are speculative here, while the sample-population mismatch is built into the design.",
    "anchor": "Research Methods AI — L1 Slides"
  },
  {
    "id": "L1-Q10",
    "source": "L1 Slides",
    "topic": "Internal vs external validity trade-off",
    "question": "[HARD] Study A tests an AI study-planner in a controlled lab with scripted tasks and random assignment. Study B observes thousands of real students using the same planner however they like in daily life. Which statement about validity is most accurate?",
    "options": [
      ["A", "Study A ranks higher on internal validity, Study B on external validity"],
      ["B", "Study B ranks higher on both, since real behavior at scale beats artificial tasks"],
      ["C", "Study A ranks higher on both, since control removes error of every kind"],
      ["D", "Study B ranks higher on internal validity, Study A on external validity"]
    ],
    "answer": "A",
    "note": "Control plus random assignment isolates cause and effect (internal validity) at the price of artificiality; naturalistic observation reflects the real world (external validity) but is full of self-selection and confounds. Sample size buys precision, not internal validity - thousands of confounded observations are still confounded.",
    "anchor": "Research Methods AI — L1 Slides"
  },
  {
    "id": "L1-Q11",
    "source": "L1 Slides",
    "topic": "Correlational vs experimental design",
    "question": "[HARD] A streaming service compares eye-strain complaints between users who chose dark mode and users who chose light mode, finding fewer complaints among dark-mode users. Why can't they conclude dark mode reduces eye strain?",
    "options": [
      ["A", "Complaints are self-reported, so the dependent variable is invalid"],
      ["B", "Reverse causation is likely - strained users would switch to dark mode"],
      ["C", "Users self-selected into modes, so the groups may differ in many ways"],
      ["D", "Without a no-preference control group, mode effects cannot be compared"]
    ],
    "answer": "C",
    "note": "Nothing was manipulated: users chose their own mode, so dark-mode users may differ in age, device, usage hours, or eye sensitivity - uncontrolled confounds. Note the reverse-causation story actually predicts the opposite pattern (strained users flocking to dark mode would raise complaints there). Self-report DVs are imperfect but usable; the fatal flaw is the missing random assignment, not a missing third group.",
    "anchor": "Research Methods AI — L1 Slides"
  },
  {
    "id": "L1-Q12",
    "source": "L1 Slides",
    "topic": "Identifying IV and DV",
    "question": "[EASY] A researcher randomly assigns students to receive feedback from an AI tutor either as plain text or as annotated diagrams, then measures their quiz scores. The independent and dependent variables are:",
    "options": [
      ["A", "IV: quiz score; DV: feedback format"],
      ["B", "IV: feedback format; DV: quiz score"],
      ["C", "IV: random assignment; DV: quiz score"],
      ["D", "IV: feedback format; DV: learning ability"]
    ],
    "answer": "B",
    "note": "The IV is what is manipulated (text vs diagram feedback); the DV is the measured outcome (quiz score). Random assignment is a procedure, not a variable, and 'learning ability' is an unmeasured construct - the study measures quiz scores.",
    "anchor": "Research Methods AI — L1 Slides"
  },
  {
    "id": "L1-Q13",
    "source": "L1 Slides",
    "topic": "Within-subjects design and order effects",
    "question": "[MID] To compare two keyboard layouts, every participant types a passage on layout X first and then the same passage on layout Y. Typing on Y is faster. What is the most serious problem?",
    "options": [
      ["A", "Practice effects - typing the passage during X improves performance on Y"],
      ["B", "Fatigue effects - performance degrades over the course of the session"],
      ["C", "Individual differences - typing skill varies between participants"],
      ["D", "Regression to the mean - extreme first attempts drift toward average"]
    ],
    "answer": "A",
    "note": "Everyone did X first, so practice on the identical passage is fully confounded with layout - and it predicts exactly the observed advantage for Y. Fatigue is also an order effect but predicts Y being slower, not faster. Individual differences are what within-subjects designs control by design, and regression to the mean applies to selected extreme scores, not this setup. Counterbalancing order is the fix.",
    "anchor": "Research Methods AI — L1 Slides"
  },
  {
    "id": "L1-Q14",
    "source": "L1 Slides",
    "topic": "Between-subjects advantages",
    "question": "[EASY] Compared to a within-subjects design, the main advantage of a between-subjects design is that it:",
    "options": [
      ["A", "Needs fewer participants to reach the same statistical power"],
      ["B", "Controls for stable individual differences between participants"],
      ["C", "Prevents carryover between conditions, since each person sees only one"],
      ["D", "Produces a more representative sample of the target population"]
    ],
    "answer": "C",
    "note": "One condition per person means nothing learned or felt in one condition can contaminate another. The first two options describe within-subjects advantages (fewer participants, individual differences controlled), and representativeness depends on sampling, not on the assignment design.",
    "anchor": "Research Methods AI — L1 Slides"
  },
  {
    "id": "L1-Q15",
    "source": "L1 Slides",
    "topic": "Purpose of random assignment",
    "question": "[EASY] Why does random assignment strengthen causal claims in an experiment?",
    "options": [
      ["A", "It makes the sample representative of the wider population"],
      ["B", "It equalizes groups, in expectation, on known and unknown variables"],
      ["C", "It guarantees the two groups have identical scores at baseline"],
      ["D", "It reduces measurement error in the dependent variable"]
    ],
    "answer": "B",
    "note": "Randomization balances confounds in expectation - including variables nobody thought to measure - so condition differences can be attributed to the manipulation. It does not guarantee identical groups in any single experiment (chance imbalance remains), and it has nothing to do with sample representativeness or measurement precision.",
    "anchor": "Research Methods AI — L1 Slides"
  },
  {
    "id": "L1-Q16",
    "source": "L1 Slides",
    "topic": "Clever Hans logic in modern AI",
    "question": "[HARD] A deep-learning model 'diagnoses' pneumonia from chest X-rays with stellar accuracy - until someone discovers it is reading hospital-specific scanner tags burned into the image corners, because one hospital in the training data treated sicker patients. Methodologically, this is best described as:",
    "options": [
      ["A", "Overfitting - the model memorized noise specific to its training images"],
      ["B", "A Clever Hans effect - performance rests on an uncontrolled correlated cue"],
      ["C", "Data leakage - test-set information contaminated the training process"],
      ["D", "Sampling bias - one hospital was overrepresented in the training data"]
    ],
    "answer": "B",
    "note": "Like the horse that 'did arithmetic' by reading its questioner's posture, the model exploits a real, systematic cue (scanner tag ↔ patient severity) instead of the intended signal. It is not overfitting - the pattern is genuine and generalizes within these hospitals; it is not leakage - no test information entered training; the cue is a confound in the data-generating process. The remedy is the same as with Hans: design tests that rule out alternative explanations.",
    "anchor": "Research Methods AI — L1 Slides"
  },
  {
    "id": "L1-Q17",
    "source": "L1 Slides",
    "topic": "GenAI use policy",
    "question": "[EASY] A student uses a GenAI assistant to draft the related-work section of a research report. Under the course policy on GenAI in research, what is required?",
    "options": [
      ["A", "Verifying the output is correct, after which disclosure is unnecessary"],
      ["B", "Using GenAI only for editing language, never for drafting content"],
      ["C", "Disclosing the use transparently while remaining responsible for correctness"],
      ["D", "Obtaining the instructor's written approval before each use"]
    ],
    "answer": "C",
    "note": "The policy couples transparency with accountability: disclose the tool and own the result, including its hallucination and bias risks. Verification alone does not replace disclosure, and the policy works through openness rather than per-use approvals or a drafting/editing distinction.",
    "anchor": "Research Methods AI — L1 Slides"
  },
  {
    "id": "W2-Q1",
    "source": "Week 2 Slides",
    "topic": "Features vs targets",
    "question": "[EASY] A team builds a model to predict which students will drop out of an online course, using click counts, forum posts, and login frequency. In this setup, 'dropout' is the:",
    "options": [
      ["A", "Feature, since it describes each student's behavior"],
      ["B", "Target, since it is the outcome being predicted"],
      ["C", "Unit of analysis, since students are observed over time"],
      ["D", "Predictor, since it correlates with the other variables"]
    ],
    "answer": "B",
    "note": "Features (clicks, posts, logins) are the inputs; the target is what the model predicts - dropout. The unit of analysis is the student, and 'predictor' is a synonym for feature, which dropout is not in this design.",
    "anchor": "Research Methods AI — Week 2 Slides"
  },
  {
    "id": "W2-Q2",
    "source": "Week 2 Slides",
    "topic": "Exhaustive and mutually exclusive categories",
    "question": "[MID] A survey asks for age group: '18-25', '25-35', '35-50'. A 25-year-old hesitates between the first two boxes, and a 60-year-old finds no box at all. Which two requirements for categorical answers are violated?",
    "options": [
      ["A", "Exhaustiveness by the 25-year-old; mutual exclusivity by the 60-year-old"],
      ["B", "Mutual exclusivity by the 25-year-old; exhaustiveness by the 60-year-old"],
      ["C", "Mutual exclusivity in both cases, since the boundaries are ill-defined"],
      ["D", "Validity by the 25-year-old; reliability by the 60-year-old"]
    ],
    "answer": "B",
    "note": "Fitting two boxes at once (the boundary 25 appears in two categories) breaks mutual exclusivity; fitting no box (nothing above 50) breaks exhaustiveness. The two failures are easy to swap under exam pressure - anchor them as: overlap = exclusivity, gap = exhaustiveness.",
    "anchor": "Research Methods AI — Week 2 Slides"
  },
  {
    "id": "W2-Q3",
    "source": "Week 2 Slides",
    "topic": "Quantitative vs qualitative variables",
    "question": "[EASY] In a dataset about voice assistants, which variable is qualitative (categorical)?",
    "options": [
      ["A", "Number of daily voice commands per user"],
      ["B", "Response latency measured in milliseconds"],
      ["C", "User satisfaction rated on a 0-100 slider"],
      ["D", "Assistant brand (Alexa / Siri / Google)"]
    ],
    "answer": "D",
    "note": "Brand is a label without numeric meaning. The satisfaction slider is the tempting one - satisfaction feels subjective - but a 0-100 score is still a numeric (quantitative) variable; subjective does not mean categorical.",
    "anchor": "Research Methods AI — Week 2 Slides"
  },
  {
    "id": "W2-Q4",
    "source": "Week 2 Slides",
    "topic": "Choosing a collection method",
    "question": "[MID] A researcher suspects participants will under-report how stressed a debugging task makes them, because admitting stress feels embarrassing. Which data collection method most directly sidesteps this problem?",
    "options": [
      ["A", "An anonymous questionnaire administered right after the task"],
      ["B", "A semi-structured interview that builds rapport before asking"],
      ["C", "Heart-rate and skin-conductance recording during the task"],
      ["D", "Video coding of facial expressions and posture during the task"]
    ],
    "answer": "C",
    "note": "Physiological signals are largely outside conscious control, so they bypass self-presentation entirely. Anonymity and rapport reduce but do not remove the motive to under-report (people also manage their self-image), and facial expressions can be deliberately masked - observable behavior is still performable in a way heart rate is not.",
    "anchor": "Research Methods AI — Week 2 Slides"
  },
  {
    "id": "W2-Q5",
    "source": "Week 2 Slides",
    "topic": "Classifying an observation study",
    "question": "[MID] To study how people really use laptops in cafés, a researcher sits at a corner table posing as a customer and discreetly codes behavior on a tablet. This observation is best described as:",
    "options": [
      ["A", "Naturalistic and concealed"],
      ["B", "Naturalistic and overt"],
      ["C", "Contrived and concealed"],
      ["D", "Contrived and overt"]
    ],
    "answer": "A",
    "note": "The café situation is spontaneous and unmanipulated (naturalistic - the researcher staged nothing, only her own cover), and the observed people don't know they are being studied (concealed). It would become contrived if she, say, planted a malfunctioning laptop to watch reactions.",
    "anchor": "Research Methods AI — Week 2 Slides"
  },
  {
    "id": "W2-Q6",
    "source": "Week 2 Slides",
    "topic": "Contrived observation",
    "question": "[EASY] What makes an observation 'contrived' rather than naturalistic?",
    "options": [
      ["A", "The observer keeps their identity hidden from those observed"],
      ["B", "The researcher stages the situation rather than awaiting a spontaneous one"],
      ["C", "The behavior is coded with a predefined, structured scheme"],
      ["D", "The observation happens in a public rather than private setting"]
    ],
    "answer": "B",
    "note": "Contrived = the situation itself is engineered (a staged 'broken' kiosk, a planted request for help). Concealment is a separate dimension - either type can be hidden or open - and how systematically you code behavior says nothing about whether the situation was staged.",
    "anchor": "Research Methods AI — Week 2 Slides"
  },
  {
    "id": "W2-Q7",
    "source": "Week 2 Slides",
    "topic": "Reactivity and concealment",
    "question": "[MID] Warehouse workers move noticeably faster during the week a clipboard-carrying observer walks the floor, then return to normal pace afterwards. Concealing the observation would have prevented which problem?",
    "options": [
      ["A", "Social desirability bias distorting the workers' behavior records"],
      ["B", "Observer expectancy - the observer coding what they expect to see"],
      ["C", "Reactivity - people changing behavior because they know they are watched"],
      ["D", "Acquiescence - workers complying with the observer's implicit wishes"]
    ],
    "answer": "C",
    "note": "Behavior changed because observation was visible - reactivity. Social desirability and acquiescence are response biases in self-report (questionnaires, interviews), not in being watched; observer expectancy is a bias in the observer's coding, which concealment from workers would not touch. Concealment trades reactivity away against an ethical cost: people are studied without knowing.",
    "anchor": "Research Methods AI — Week 2 Slides"
  },
  {
    "id": "W2-Q8",
    "source": "Week 2 Slides",
    "topic": "Archival data trade-offs",
    "question": "[MID] A student trains a triage model on ten-year-old hospital admission records because collecting new data is too slow. Which statement best captures the core trade-off of archival data?",
    "options": [
      ["A", "It is collected without researcher involvement, so it is relatively bias-free"],
      ["B", "It avoids consent issues, since the records already exist independently"],
      ["C", "It saves collection cost, but its limitations and quirks are inherited unseen"],
      ["D", "It suits exploratory analysis but cannot support confirmatory testing"]
    ],
    "answer": "C",
    "note": "Archives are cheap and instant, but you had no control over how they were made: definitions drift, clinical practice changes over a decade, and recording biases get baked into the model. Researcher absence does not make data unbiased, existing data still raises consent and privacy questions, and archival data can absolutely be used confirmatorily.",
    "anchor": "Research Methods AI — Week 2 Slides"
  },
  {
    "id": "W2-Q9",
    "source": "Week 2 Slides",
    "topic": "Recognizing response formats",
    "question": "[EASY] 'The chatbot understood my questions: Strongly disagree / Disagree / Neutral / Agree / Strongly agree.' This item is an example of:",
    "options": [
      ["A", "A semantic differential scale"],
      ["B", "A Likert-type rating scale"],
      ["C", "A visual analogue scale"],
      ["D", "A forced-choice ranking item"]
    ],
    "answer": "B",
    "note": "Symmetric agree-disagree options around a neutral midpoint define the Likert format. A semantic differential anchors two opposite adjectives (e.g., 'useless ... useful'), a visual analogue scale is a continuous line, and forced-choice ranking asks respondents to order alternatives.",
    "anchor": "Research Methods AI — Week 2 Slides"
  },
  {
    "id": "W2-Q10",
    "source": "Week 2 Slides",
    "topic": "Interview types",
    "question": "[EASY] An interviewer works from a fixed list of core questions but freely asks follow-ups whenever an answer is interesting. This interview is:",
    "options": [
      ["A", "Structured, since the core questions are fixed in advance"],
      ["B", "Semi-structured, combining a fixed guide with free follow-ups"],
      ["C", "Unstructured, since the conversation can go anywhere"],
      ["D", "Standardized, since every participant hears the same core list"]
    ],
    "answer": "B",
    "note": "The fixed list pulls toward 'structured' and the freedom pulls toward 'unstructured' - the combination of both is precisely what defines semi-structured interviewing: comparability from the guide, flexibility from the follow-ups.",
    "anchor": "Research Methods AI — Week 2 Slides"
  },
  {
    "id": "W2-Q11",
    "source": "Week 2 Slides",
    "topic": "Social desirability bias",
    "question": "[MID] In a face-to-face survey, 95% of respondents claim they 'always read terms of service before clicking accept'. Telemetry from the same product shows almost nobody scrolls past the first paragraph. The gap is best explained by:",
    "options": [
      ["A", "Acquiescence bias - respondents tend to agree with whatever is asked"],
      ["B", "Recall error - people genuinely misremember their own habits"],
      ["C", "Social desirability bias - respondents answer so as to appear conscientious"],
      ["D", "Sampling bias - survey takers differ from the telemetry population"]
    ],
    "answer": "C",
    "note": "The distortion runs systematically in the flattering direction and is amplified by the face-to-face setting - the fingerprint of social desirability. Pure recall error would scatter in both directions rather than land 95% on the virtuous side; acquiescence would require agree-format items regardless of content; and a sampling story would need the surveyed users to actually be diligent readers, which telemetry contradicts.",
    "anchor": "Research Methods AI — Week 2 Slides"
  },
  {
    "id": "W2-Q12",
    "source": "Week 2 Slides",
    "topic": "Detecting acquiescence bias",
    "question": "[HARD] A participant answers 'Agree' to both 'I find the app easy to use' and, later, 'I find the app difficult to use'. What does this pattern suggest, and which questionnaire design feature caught it?",
    "options": [
      ["A", "Social desirability bias, caught by administering the survey anonymously"],
      ["B", "Central tendency bias, caught by offering a neutral midpoint option"],
      ["C", "Acquiescence bias, caught by including reverse-worded items"],
      ["D", "Honest ambivalence, caught by repeating the question in both directions"]
    ],
    "answer": "C",
    "note": "Agreeing with two logically opposite statements is the signature of yea-saying, and reverse-keyed items exist precisely to expose it. Social desirability would push answers toward flattering content, not blanket agreement; central tendency would produce strings of 'Neutral'; genuine ambivalence is conceivable but contradictory agreement across reversed items is the standard operational indicator of acquiescence.",
    "anchor": "Research Methods AI — Week 2 Slides"
  },
  {
    "id": "W2-Q13",
    "source": "Week 2 Slides",
    "topic": "Crowdworking quality control",
    "question": "[MID] A lab pays crowdworkers to label 50,000 tweets as 'sarcastic' or 'not sarcastic'. Some workers click through as fast as possible. Which countermeasure most directly identifies the careless workers?",
    "options": [
      ["A", "Collecting more labels per tweet and taking the majority vote"],
      ["B", "Inserting gold-standard items with known answers as attention checks"],
      ["C", "Raising the payment per label to motivate careful work"],
      ["D", "Splitting the work into shorter batches to reduce fatigue"]
    ],
    "answer": "B",
    "note": "Attention checks identify which workers are careless, so their labels can be excluded or down-weighted. Majority vote merely dilutes bad labels without finding their source - and fails when speeders are numerous; pay raises and shorter batches may help motivation but identify no one. The verb in the question - 'identifies' - is what separates the options.",
    "anchor": "Research Methods AI — Week 2 Slides"
  },
  {
    "id": "W2-Q14",
    "source": "Week 2 Slides",
    "topic": "Annotation aggregation",
    "question": "[HARD] Five annotators label a comment: three say 'toxic', two say 'fine'. Reliability scores show the two dissenters agree with expert gold labels 95% of the time, the other three around 60%. Majority vote says 'toxic'. What does weighted voting most plausibly conclude?",
    "options": [
      ["A", "'Toxic' - weighting refines confidence but cannot overturn a majority"],
      ["B", "'Toxic' - the 60% annotators are above chance, so their votes stand"],
      ["C", "'Fine' - two high-reliability votes outweigh three low-reliability ones"],
      ["D", "'Fine' - annotators below 70% reliability are excluded before voting"]
    ],
    "answer": "C",
    "note": "Weighted voting multiplies each vote by annotator reliability: 2 × 0.95 = 1.90 beats 3 × 0.60 = 1.80. The whole point is that it CAN overturn a raw majority - majority vote treats expert and careless annotators identically. No standard exclusion threshold at 70% exists; weighting, not exclusion, is the mechanism asked about.",
    "anchor": "Research Methods AI — Week 2 Slides"
  },
  {
    "id": "W2-Q15",
    "source": "Week 2 Slides",
    "topic": "SMART research goals",
    "question": "[MID] A draft proposal states its goal as: 'Make our recommendation model better.' Judged against the SMART criteria, the two most glaring failures are:",
    "options": [
      ["A", "Specific and Measurable"],
      ["B", "Measurable and Achievable"],
      ["C", "Achievable and Time-bound"],
      ["D", "Specific and Relevant"]
    ],
    "answer": "A",
    "note": "'Better' names no metric (not Measurable) and no defined aspect of improvement (not Specific). Nothing suggests the goal is unrealistic (Achievable) or off-mission (Relevant) - those criteria can't even be evaluated until the goal is specific and measurable. A SMART rewrite: 'Raise top-10 precision from 0.62 to 0.70 on the holdout set by the end of Q3.'",
    "anchor": "Research Methods AI — Week 2 Slides"
  },
  {
    "id": "W2-Q16",
    "source": "Week 2 Slides",
    "topic": "Structured vs unstructured data",
    "question": "[MID] A dataset has one row per tweet with columns: tweet text, like count, retweet count, posting hour. Which description is most precise?",
    "options": [
      ["A", "Structured data, since every value sits in a defined table column"],
      ["B", "Unstructured data, since free text is the substantive content"],
      ["C", "A structured table containing an unstructured free-text field"],
      ["D", "Semi-structured data, since it mixes numeric and text types"]
    ],
    "answer": "C",
    "note": "Tabular storage does not make content structured: counts and hour are analysis-ready, but the raw text needs NLP-style processing first - so the precise description is a hybrid. 'Semi-structured' is a real term but refers to tagged, self-describing formats like JSON or XML, not to a table that happens to mix types.",
    "anchor": "Research Methods AI — Week 2 Slides"
  },
  {
    "id": "W2-Q17",
    "source": "Week 2 Slides",
    "topic": "Combining collection methods",
    "question": "[HARD] You must study user frustration with a voice assistant. Colleagues propose four designs. Which is methodologically strongest?",
    "options": [
      ["A", "Interaction logs only - repeated commands and abandonment are objective"],
      ["B", "Questionnaires only - frustration is subjective, so ask those who feel it"],
      ["C", "Skin-conductance sensors only - arousal is objective and reflects inner state"],
      ["D", "Logs and questionnaires combined - each covers the other's blind spot"]
    ],
    "answer": "D",
    "note": "Every single method has a principled defense, which is exactly the trap: logs cannot distinguish frustration from confusion or distraction, self-report invites bias, and physiological arousal is ambiguous (excitement and frustration look alike on a sensor). Converging evidence from methods with complementary weaknesses - triangulation - beats any single channel.",
    "anchor": "Research Methods AI — Week 2 Slides"
  },
  {
    "id": "L3-Q1",
    "source": "L3 Slides",
    "topic": "Measurement levels - interval",
    "question": "[EASY] Room temperature in degrees Celsius is measured at which level?",
    "options": [
      ["A", "Ordinal - temperatures can be ranked from cold to hot"],
      ["B", "Interval - the gaps are equal but the zero point is arbitrary"],
      ["C", "Ratio - degrees have equal spacing and a zero exists on the scale"],
      ["D", "Continuous - temperature can take any decimal value"]
    ],
    "answer": "B",
    "note": "Celsius has equal gaps but 0 °C is an arbitrary convention (water's freezing point), not 'no temperature' - so 20 °C is not 'twice as hot' as 10 °C. A zero appearing on the scale is not the same as a true zero meaning absence of the quantity. 'Continuous' describes the variable's value set, not its measurement level.",
    "anchor": "Research Methods AI — L3 Slides"
  },
  {
    "id": "L3-Q2",
    "source": "L3 Slides",
    "topic": "Measurement levels - ordinal",
    "question": "[MID] An app stores customer satisfaction as 1-5 stars. A data scientist averages the stars, treating the gap from 1 to 2 as equal to the gap from 4 to 5. What assumption is silently being made?",
    "options": [
      ["A", "That the stars are interval-level, when they are strictly only ordinal"],
      ["B", "That the stars are ratio-level, when they are strictly only interval"],
      ["C", "That the stars are ordinal-level, when they are strictly only nominal"],
      ["D", "No assumption - averaging is valid for any ordered numeric scale"]
    ],
    "answer": "A",
    "note": "Star ratings guarantee order but not equal psychological spacing: the jump from 4 to 5 may mean something quite different from 1 to 2. Computing a mean assumes equal intervals - an interval-level operation applied to ordinal data. This is extremely common practice, but it is an assumption, and the exam question is whether you notice making it.",
    "anchor": "Research Methods AI — L3 Slides"
  },
  {
    "id": "L3-Q3",
    "source": "L3 Slides",
    "topic": "Measurement levels - ratio",
    "question": "[EASY] Response time in milliseconds is ratio-level data because:",
    "options": [
      ["A", "It can be ranked unambiguously from fastest to slowest"],
      ["B", "It has equal intervals plus a true zero, making ratios meaningful"],
      ["C", "It has equal intervals between every pair of adjacent values"],
      ["D", "It is recorded by an instrument rather than reported by a person"]
    ],
    "answer": "B",
    "note": "The true zero (no time elapsed) is what upgrades interval to ratio and licenses statements like '400 ms is twice 200 ms'. Equal intervals alone describe interval level, ranking alone describes ordinal, and who or what does the measuring is irrelevant to the level.",
    "anchor": "Research Methods AI — L3 Slides"
  },
  {
    "id": "L3-Q4",
    "source": "L3 Slides",
    "topic": "Random variables",
    "question": "[EASY] In simulation terms, what is a random variable?",
    "options": [
      ["A", "A variable whose value is drawn from a probability distribution"],
      ["B", "A variable whose value differs from participant to participant"],
      ["C", "A variable measured with some unavoidable random error"],
      ["D", "A variable chosen at random from the available columns"]
    ],
    "answer": "A",
    "note": "The defining property is generation by a distribution (normal, Poisson, uniform...). Merely varying across participants or containing measurement error does not make a variable 'random' in the probabilistic sense - the distribution is what you specify when simulating.",
    "anchor": "Research Methods AI — L3 Slides"
  },
  {
    "id": "L3-Q5",
    "source": "L3 Slides",
    "topic": "Discrete vs continuous distributions",
    "question": "[MID] 'Number of support tickets a helpdesk receives per day' versus 'time in seconds until the first ticket arrives'. Which pairing of distribution type and probability function is correct?",
    "options": [
      ["A", "Tickets: continuous with a PDF; waiting time: discrete with a PMF"],
      ["B", "Tickets: discrete with a PMF; waiting time: continuous with a PDF"],
      ["C", "Tickets: discrete with a PDF; waiting time: continuous with a PMF"],
      ["D", "Both are discrete with PMFs, since both are measured per day"]
    ],
    "answer": "B",
    "note": "Counts take separate integer values - discrete, probability mass function. Time can take any value in a range - continuous, probability density function. Watch the letter swap in the distractors: mass (PMF) goes with discrete, density (PDF) with continuous, never crosswise.",
    "anchor": "Research Methods AI — L3 Slides"
  },
  {
    "id": "L3-Q6",
    "source": "L3 Slides",
    "topic": "Simulating normal data in R",
    "question": "[EASY] Which R call simulates 100 IQ scores from a normal distribution with mean 100 and standard deviation 15?",
    "options": [
      ["A", "rnorm(100, 100, 15)"],
      ["B", "rnorm(15, 100, 100)"],
      ["C", "rnorm(100, 15, 100)"],
      ["D", "dnorm(100, 100, 15)"]
    ],
    "answer": "A",
    "note": "Argument order is n, mean, sd: 100 draws, mean 100, sd 15. Option B draws only 15 values; option C sets mean 15 and sd 100; option D uses dnorm, which evaluates the density function rather than generating random draws - the r prefix is what simulates.",
    "anchor": "Research Methods AI — L3 Slides"
  },
  {
    "id": "L3-Q7",
    "source": "L3 Slides",
    "topic": "Choosing the right R distribution",
    "question": "[MID] You want to simulate 'number of emails each employee receives per hour' - non-negative whole counts, occasional busy spikes. Which R function fits most naturally?",
    "options": [
      ["A", "rnorm, since counts approximate a normal distribution at large means"],
      ["B", "rpois, since the Poisson distribution models event counts per interval"],
      ["C", "runif, since each possible email count should be equally likely"],
      ["D", "rbinom, since each email either arrives in the hour or does not"]
    ],
    "answer": "B",
    "note": "Poisson is the canonical model for counts of events in a fixed window: integer, non-negative, right-skewed. The rnorm claim is true asymptotically but rnorm still produces negative and fractional 'emails'; rbinom needs a fixed number of trials, which emails do not have; uniform counts contradict the described spikes.",
    "anchor": "Research Methods AI — L3 Slides"
  },
  {
    "id": "L3-Q8",
    "source": "L3 Slides",
    "topic": "Random assignment in R",
    "question": "[MID] To randomly assign 60 simulated participants to the conditions 'AI' or 'human', which R call does the job directly?",
    "options": [
      ["A", "sample(c(\"AI\", \"human\"), 60, replace = TRUE)"],
      ["B", "sample(60, c(\"AI\", \"human\"), replace = TRUE)"],
      ["C", "rep(c(\"AI\", \"human\"), each = 30)"],
      ["D", "sample(c(\"AI\", \"human\"), 60, replace = FALSE)"]
    ],
    "answer": "A",
    "note": "sample(x, size, replace = TRUE) draws 60 labels from the two conditions. Option B has the arguments in the wrong order; option C produces 30 of each but in a fixed deterministic block - balanced, yet not random; option D fails because sampling 60 items from a set of 2 without replacement is impossible.",
    "anchor": "Research Methods AI — L3 Slides"
  },
  {
    "id": "L3-Q9",
    "source": "L3 Slides",
    "topic": "Computing from a linear model",
    "question": "[MID] You simulate exam grades as y = 2 + 0.5*hours_studied + ε. Ignoring the noise term, what grade does the model predict for a student who studies 10 hours?",
    "options": [
      ["A", "5"],
      ["B", "7"],
      ["C", "12"],
      ["D", "25"]
    ],
    "answer": "B",
    "note": "2 + 0.5 × 10 = 7. The wrong options are each a typical slip: 5 forgets the intercept (0.5 × 10), 12 adds hours directly to the intercept (2 + 10), and 25 multiplies the whole bracket by hours ((2 + 0.5) × 10).",
    "anchor": "Research Methods AI — L3 Slides"
  },
  {
    "id": "L3-Q10",
    "source": "L3 Slides",
    "topic": "Interpreting slope coefficients",
    "question": "[EASY] In the simulation y = b0 + b1*x + ε, the coefficient b1 represents:",
    "options": [
      ["A", "The expected value of y when x equals zero"],
      ["B", "The change in y for each one-unit increase in x"],
      ["C", "The correlation between the variables x and y"],
      ["D", "The share of variance in y explained by x"]
    ],
    "answer": "B",
    "note": "b1 is the slope - the effect built into the simulated world. The value at x = 0 is the intercept b0; correlation and variance explained (R²) are standardized summaries of fit, related to but distinct from the raw slope.",
    "anchor": "Research Methods AI — L3 Slides"
  },
  {
    "id": "L3-Q11",
    "source": "L3 Slides",
    "topic": "Role of the noise term",
    "question": "[MID] A student simulates data as y = 3 + 2*x exactly, with no ε term, and the regression 'recovers' the coefficients perfectly every run. Why is adding ε essential for a meaningful simulation?",
    "options": [
      ["A", "Without ε the estimated coefficients are biased away from 3 and 2"],
      ["B", "Without ε the predictors become correlated with the outcome"],
      ["C", "Noise makes the test realistic: can analysis find signal despite scatter?"],
      ["D", "Noise increases the statistical power of the simulated experiment"]
    ],
    "answer": "C",
    "note": "Deterministic data makes recovery trivial and tells you nothing about your pipeline. Real measurements always contain unexplained variability; the simulation must mimic that to test anything. Without ε the coefficients are recovered exactly (not biased), predictors being correlated with the outcome is the point of a model, and noise lowers power rather than raising it.",
    "anchor": "Research Methods AI — L3 Slides"
  },
  {
    "id": "L3-Q12",
    "source": "L3 Slides",
    "topic": "Dummy coding",
    "question": "[HARD] You want 'operating system' (Windows / macOS / Linux) as a predictor in a linear model. How should it be dummy coded?",
    "options": [
      ["A", "Three 0/1 columns, one per category, so no information is lost"],
      ["B", "Two 0/1 columns, with the omitted category serving as the baseline"],
      ["C", "One column coded 0/1/2, keeping the model compact"],
      ["D", "Two 0/1 columns, dropping the rarest category from the data"]
    ],
    "answer": "B",
    "note": "k categories need k-1 dummies; the omitted category is not lost - it becomes the reference level absorbed by the intercept (both dummies 0 = Linux, say). Three columns are redundant with the intercept, 0/1/2 coding falsely imposes an ordered, equally spaced effect, and nothing gets dropped from the data - only from the coding.",
    "anchor": "Research Methods AI — L3 Slides"
  },
  {
    "id": "L3-Q13",
    "source": "L3 Slides",
    "topic": "Why simulate at all",
    "question": "[MID] Before collecting real data, a PhD student simulates her entire study - generating data with effects she chooses, then running her planned analysis on it. The key methodological payoff is that simulation:",
    "options": [
      ["A", "Lets her verify the analysis recovers effects whose true values she set"],
      ["B", "Lets her estimate the effect she will later find in the real data"],
      ["C", "Demonstrates external validity before any participant is recruited"],
      ["D", "Provides a backup dataset in case real data collection fails"]
    ],
    "answer": "A",
    "note": "Simulation provides ground truth - something real data never offers. If the pipeline cannot recover effects she planted herself, it cannot be trusted on real data. It does not predict what the real effect will be (she chose the simulated one), says nothing about generalizability, and simulated data can never substitute for real evidence.",
    "anchor": "Research Methods AI — L3 Slides"
  },
  {
    "id": "L3-Q14",
    "source": "L3 Slides",
    "topic": "Bounding simulated values",
    "question": "[MID] A simulation of ages with rnorm(500, 35, 20) produces some negative ages and a 112-year-old. Which R expression clamps every value into the range 18 to 90?",
    "options": [
      ["A", "pmax(18, pmin(90, ages))"],
      ["B", "pmin(18, pmax(90, ages))"],
      ["C", "ifelse(ages < 18, 18, 90)"],
      ["D", "pmax(90, pmin(18, ages))"]
    ],
    "answer": "A",
    "note": "Work inside-out: pmin(90, ages) caps the top, then pmax(18, ...) lifts the floor. Option B reversed returns 18 for everything (pmax(90,...) ≥ 90, then pmin with 18 gives 18); option D similarly collapses to 90; the ifelse maps every age of 18 or above to exactly 90, destroying the data.",
    "anchor": "Research Methods AI — L3 Slides"
  },
  {
    "id": "L3-Q15",
    "source": "L3 Slides",
    "topic": "Thresholding to binary outcomes",
    "question": "[EASY] A simulated continuous 'frustration score' must become a binary variable 'rage-quit (1) vs continued (0)', using 7 as the clinical cutoff. The appropriate transformation is:",
    "options": [
      ["A", "Standardize the scores to z-scores around the cutoff"],
      ["B", "Apply the threshold: scores above 7 become 1, the rest 0"],
      ["C", "Replace each score with its rank within the sample"],
      ["D", "Rescale the scores linearly into the interval 0 to 1"]
    ],
    "answer": "B",
    "note": "A cutoff dichotomizes: above 7 → 1, otherwise 0. Z-scores, ranks, and 0-1 rescaling all remain continuous - they transform the scale but never produce a binary variable. (The probabilistic alternative - converting scores to probabilities and sampling 0/1 - also exists in the simulation workflow, but the stated cutoff rule is thresholding.)",
    "anchor": "Research Methods AI — L3 Slides"
  },
  {
    "id": "L3-Q16",
    "source": "L3 Slides",
    "topic": "Why the logistic function",
    "question": "[EASY] In logistic regression, what job does the logistic function perform?",
    "options": [
      ["A", "It maps predicted probabilities onto the log-odds scale"],
      ["B", "It linearizes the relationship between the predictors"],
      ["C", "It maps the linear predictor into (0, 1) so output reads as probability"],
      ["D", "It standardizes the predictors to a common scale"]
    ],
    "answer": "C",
    "note": "The linear part b0 + b1*x ranges over all real numbers; the logistic (sigmoid) squashes it into (0,1). Watch the direction in the first option - it is exactly reversed: the logit (log-odds) maps probabilities to the real line, the logistic maps back. The model is linear in log-odds: log(p/(1-p)) = b0 + b1*x.",
    "anchor": "Research Methods AI — L3 Slides"
  },
  {
    "id": "L3-Q17",
    "source": "L3 Slides",
    "topic": "Intercept in logistic simulation",
    "question": "[HARD] You simulate click-through with a logistic model and decide the baseline click rate is too high. Lowering the intercept b0 while keeping the slopes fixed does what?",
    "options": [
      ["A", "Shrinks each predictor's effect on the odds toward zero"],
      ["B", "Lowers the predicted click probability at every predictor value"],
      ["C", "Steepens the probability curve around its midpoint"],
      ["D", "Lowers the probability only for cases near the baseline"]
    ],
    "answer": "B",
    "note": "The intercept sets the baseline log-odds; decreasing it slides the whole sigmoid down, so every predicted probability drops - not just cases near baseline. The slopes, which control effect sizes and the curve's steepness, are untouched.",
    "anchor": "Research Methods AI — L3 Slides"
  },
  {
    "id": "L4-Q1",
    "source": "L4 Slides",
    "topic": "Exploratory vs confirmatory analysis",
    "question": "[EASY] What is the essential difference between exploratory and confirmatory data analysis?",
    "options": [
      ["A", "Exploratory searches for patterns; confirmatory tests pre-specified hypotheses"],
      ["B", "Exploratory uses visualizations; confirmatory uses numerical statistics"],
      ["C", "Exploratory suits small samples; confirmatory requires large ones"],
      ["D", "Exploratory describes single variables; confirmatory relates multiple ones"]
    ],
    "answer": "A",
    "note": "The distinction is about when the hypothesis is fixed, not about tools or sample size - confirmatory work uses plots too, and exploration happens on huge datasets. Testing a pattern on the same data that suggested it blurs the line and inflates false positives.",
    "anchor": "Research Methods AI — L4 Slides"
  },
  {
    "id": "L4-Q2",
    "source": "L4 Slides",
    "topic": "Mean vs median under skew",
    "question": "[MID] In a survey of app users' yearly incomes, a handful of millionaires drag the mean to €95,000 while the typical user earns around €38,000. Which statistic best represents the typical user?",
    "options": [
      ["A", "The mean, since it uses the information in every data point"],
      ["B", "The median, since it is robust to the extreme high values"],
      ["C", "The mode, since 'typical' means the most frequently observed income"],
      ["D", "The trimmed range, since it excludes the millionaires directly"]
    ],
    "answer": "B",
    "note": "Skew splits mean and median apart, and the median - the middle person - ignores how extreme the extremes are. The mean's efficiency argument is a true property pointing to the wrong conclusion under skew. The mode is unstable for near-continuous data like income (every value may be unique), and 'trimmed range' conflates two different tools.",
    "anchor": "Research Methods AI — L4 Slides"
  },
  {
    "id": "L4-Q3",
    "source": "L4 Slides",
    "topic": "Cross-tabulation",
    "question": "[EASY] A researcher wants a first descriptive look at the relationship between subscription tier (free / premium) and churn (stayed / left). The natural exploratory tool is:",
    "options": [
      ["A", "A chi-squared test on the two variables"],
      ["B", "A Pearson correlation between tier and churn"],
      ["C", "A cross-tabulation of counts for each combination"],
      ["D", "A scatter plot of tier against churn status"]
    ],
    "answer": "C",
    "note": "Two categorical variables, first look → a contingency table of counts. The chi-squared test is the confirmatory follow-up to the cross-tab, not the exploratory first step the question asks for; Pearson correlation and scatter plots presume numeric variables and would render two binary variables as four overlapping points.",
    "anchor": "Research Methods AI — L4 Slides"
  },
  {
    "id": "L4-Q4",
    "source": "L4 Slides",
    "topic": "Correlation is not causation",
    "question": "[MID] A fitness platform finds r = 0.6 between owning a smartwatch and weekly exercise minutes, and marketing drafts the headline 'Smartwatches make people exercise'. The most fundamental objection is:",
    "options": [
      ["A", "An r of 0.6 is too weak to support any practical claim"],
      ["B", "Active people may buy smartwatches, or a third variable drives both"],
      ["C", "The platform's users are not representative of the population"],
      ["D", "Correlation cannot be computed between binary and continuous variables"]
    ],
    "answer": "B",
    "note": "A correlation is symmetric and silent on direction and third variables: reverse causation and confounding (income, health interest) fit r = 0.6 just as well as the headline does. r = 0.6 is actually substantial; representativeness is a real but secondary concern about generalizing, not about the causal verb 'make'; and binary-continuous correlations are perfectly computable (point-biserial).",
    "anchor": "Research Methods AI — L4 Slides"
  },
  {
    "id": "L4-Q5",
    "source": "L4 Slides",
    "topic": "What a p-value is (and is not)",
    "question": "[HARD] A study comparing two interface designs reports p = 0.03. Which interpretation is correct?",
    "options": [
      ["A", "There is a 3% probability that the null hypothesis is true"],
      ["B", "There is a 97% probability that the alternative hypothesis is true"],
      ["C", "Data at least this extreme would occur 3% of the time if H0 were true"],
      ["D", "Repeating the study would yield a significant result 97% of the time"]
    ],
    "answer": "C",
    "note": "The p-value conditions on H0 and asks how surprising the data are. It is not the probability of any hypothesis (those readings reverse the conditional), and it is not a replication probability - the chance a repeat study comes out significant depends on the unknown true effect and power, not on 1 minus p.",
    "anchor": "Research Methods AI — L4 Slides"
  },
  {
    "id": "L4-Q6",
    "source": "L4 Slides",
    "topic": "Type I error in context",
    "question": "[MID] A pharma team tests a drug that, in reality, does nothing. Their trial nevertheless yields p = 0.01 and they declare the drug effective. This outcome is:",
    "options": [
      ["A", "A Type II error - the trial detected an effect that is not there"],
      ["B", "A Type I error - a true null hypothesis was rejected"],
      ["C", "A correct rejection - the decision followed the p < 0.05 rule"],
      ["D", "A power failure - the trial was too small to test the drug fairly"]
    ],
    "answer": "B",
    "note": "The null ('no effect') was true and got rejected: false positive, Type I. The Type II option deliberately pairs the wrong label with the right description - read labels and descriptions together. Following the p < 0.05 rule correctly does not make the conclusion true: with α = 0.05, about 1 in 20 truly null effects passes anyway.",
    "anchor": "Research Methods AI — L4 Slides"
  },
  {
    "id": "L4-Q7",
    "source": "L4 Slides",
    "topic": "Type II error in context",
    "question": "[MID] An AI-tutoring intervention genuinely improves grades, but a study with 12 participants finds p = 0.20 and concludes 'no effect'. The study most likely committed:",
    "options": [
      ["A", "A Type I error, since the conclusion contradicts the truth"],
      ["B", "No error, since p above 0.05 establishes the absence of an effect"],
      ["C", "A Type II error, since a real effect went undetected"],
      ["D", "A sampling error, since 12 participants cannot be representative"]
    ],
    "answer": "C",
    "note": "A real effect was missed: false negative, Type II - the expected outcome when tiny samples meet modest effects, because power is low. Type I is the mirror image (rejecting a true null). And p > 0.05 never establishes absence: failing to find evidence is not finding evidence of absence. Representativeness is about external validity, a different axis entirely.",
    "anchor": "Research Methods AI — L4 Slides"
  },
  {
    "id": "L4-Q8",
    "source": "L4 Slides",
    "topic": "Confidence intervals",
    "question": "[HARD] A 95% confidence interval for the effect of dark mode on reading speed is [2, 14] words per minute. The best reading of this interval is:",
    "options": [
      ["A", "95% of users gained between 2 and 14 words per minute"],
      ["B", "The true effect lies in [2, 14] with 95% probability"],
      ["C", "The procedure generating such intervals captures the truth in 95% of studies"],
      ["D", "A replication would find an effect inside [2, 14] 95% of the time"]
    ],
    "answer": "C",
    "note": "Frequentist logic: the truth is fixed, the interval is random - 95% describes the long-run capture rate of the procedure, not the probability for this one interval (that Bayesian-sounding reading is the most seductive wrong option). It says nothing about individual users' spread or about where replications will land. Practically: values inside are plausible, and since 0 is excluded, the effect is significant.",
    "anchor": "Research Methods AI — L4 Slides"
  },
  {
    "id": "L4-Q9",
    "source": "L4 Slides",
    "topic": "Frequentist vs Bayesian",
    "question": "[MID] Two analysts study the same A/B test. Ana computes the probability of data this extreme under the null hypothesis. Boris starts from a prior belief about the effect and updates it into a posterior. Their approaches are, respectively:",
    "options": [
      ["A", "Bayesian and frequentist"],
      ["B", "Confirmatory and exploratory"],
      ["C", "Frequentist and Bayesian"],
      ["D", "Inferential and descriptive"]
    ],
    "answer": "C",
    "note": "P-values and long-run frequencies are frequentist; priors updated into posteriors are Bayesian - the frequentist never assigns probability to a hypothesis, the Bayesian does. Both analysts are doing confirmatory, inferential statistics; those labels describe a different distinction.",
    "anchor": "Research Methods AI — L4 Slides"
  },
  {
    "id": "L4-Q10",
    "source": "L4 Slides",
    "topic": "What OLS optimizes",
    "question": "[MID] Ordinary least squares (OLS) regression chooses the line that minimizes:",
    "options": [
      ["A", "The sum of absolute vertical distances to the data points"],
      ["B", "The sum of squared vertical distances to the data points"],
      ["C", "The sum of squared perpendicular distances to the line"],
      ["D", "The largest single vertical distance to any data point"]
    ],
    "answer": "B",
    "note": "OLS minimizes squared vertical residuals - 'least squares' is literal. The distractors are real alternative criteria (least absolute deviations, total least squares, minimax), which is why each sounds legitimate; they define different estimators, not OLS.",
    "anchor": "Research Methods AI — L4 Slides"
  },
  {
    "id": "L4-Q11",
    "source": "L4 Slides",
    "topic": "Reading regression output",
    "question": "[MID] Predicting exam score from hours_studied, the model output shows: coefficient = 3.2, p = 0.001. The correct interpretation is:",
    "options": [
      ["A", "Each extra study hour causes a 3.2-point gain in every student"],
      ["B", "Each extra study hour predicts 3.2 more points; reliably non-zero"],
      ["C", "Hours studied explains 3.2% of the variance in exam scores"],
      ["D", "Scores rise by 3.2% for every additional hour of studying"]
    ],
    "answer": "B",
    "note": "The coefficient is the predicted change in outcome per unit of predictor, and the small p says it differs reliably from zero. 'Causes... in every student' fails twice: causality needs random assignment, and a coefficient is an average association, not an individual law. Variance explained is R², and raw coefficients are in outcome units (points), not percentages.",
    "anchor": "Research Methods AI — L4 Slides"
  },
  {
    "id": "L4-Q12",
    "source": "L4 Slides",
    "topic": "Choosing the chi-squared test",
    "question": "[MID] You want to test whether device type (iOS / Android) is associated with churning (yes / no) in 4,000 users. The standard test is:",
    "options": [
      ["A", "A chi-squared test on the 2×2 table of counts"],
      ["B", "An independent-samples t-test comparing the two device groups"],
      ["C", "A Pearson correlation between device type and churn"],
      ["D", "A one-way ANOVA with device type as the factor"]
    ],
    "answer": "A",
    "note": "Both variables are categorical, so the question is whether observed cell counts deviate from independence - chi-squared territory. The t-test and ANOVA need a continuous outcome (churn yes/no is not one), and Pearson correlation presumes numeric variables. (Logistic regression could also model this; among the listed options, chi-squared is the standard association test.)",
    "anchor": "Research Methods AI — L4 Slides"
  },
  {
    "id": "L4-Q13",
    "source": "L4 Slides",
    "topic": "When logistic regression applies",
    "question": "[EASY] Logistic regression is the appropriate model when:",
    "options": [
      ["A", "The outcome variable is binary"],
      ["B", "The predictor variables are categorical"],
      ["C", "The outcome is a proportion between 0 and 1"],
      ["D", "The relationship between variables is nonlinear"]
    ],
    "answer": "A",
    "note": "The defining feature is the binary outcome, whose probability the model expresses through log-odds. Predictors may be numeric or categorical in any regression. The proportion option is the subtle trap: the model OUTPUTS probabilities in (0,1), but the observed outcome it models is 0-or-1. Nonlinearity alone calls for transformations or other models, not logistic regression specifically.",
    "anchor": "Research Methods AI — L4 Slides"
  },
  {
    "id": "L4-Q14",
    "source": "L4 Slides",
    "topic": "Confusion matrix arithmetic",
    "question": "[MID] A churn classifier evaluated on 100 customers produces: 40 true positives, 10 false positives, 45 true negatives, 5 false negatives. Its accuracy is:",
    "options": [
      ["A", "80%"],
      ["B", "85%"],
      ["C", "89%"],
      ["D", "95%"]
    ],
    "answer": "B",
    "note": "Accuracy = (TP + TN) / total = (40 + 45) / 100 = 85%. The distractors are other real metrics computed from the same matrix: 80% is precision (40/50), 89% is recall (40/45), 95% mistakes 'correct minus FN' bookkeeping. Knowing WHICH formula is accuracy is the actual skill being tested.",
    "anchor": "Research Methods AI — L4 Slides"
  },
  {
    "id": "L4-Q15",
    "source": "L4 Slides",
    "topic": "Cost-sensitive evaluation",
    "question": "[HARD] Two cancer-screening models: Model P rarely raises false alarms but misses 20% of real tumors; Model R flags some healthy patients but misses almost none. Given that a missed tumor is far costlier than a follow-up test, the initial screening step should use:",
    "options": [
      ["A", "Model P, since false alarms cause overtreatment and patient anxiety"],
      ["B", "Model R, since minimizing false negatives matters most here"],
      ["C", "Whichever model achieves the higher overall accuracy"],
      ["D", "Whichever model achieves the better balance of precision and recall"]
    ],
    "answer": "B",
    "note": "The stem stipulates the cost structure: FN ≫ FP, so recall dominates - missed tumors at the screening stage are unrecoverable, while false alarms get filtered by follow-up diagnostics. The overtreatment argument is a real concern in screening debates, but the question fixes the costs. Overall accuracy and a generic precision-recall 'balance' (e.g., F1) both ignore exactly this asymmetry.",
    "anchor": "Research Methods AI — L4 Slides"
  },
  {
    "id": "L4-Q16",
    "source": "L4 Slides",
    "topic": "Diagnosing overfitting",
    "question": "[MID] A student's random forest scores 99% accuracy on the data it was trained on but only 61% on a properly held-out test set. The most likely diagnosis is:",
    "options": [
      ["A", "Data leakage - information from the test set reached training"],
      ["B", "Class imbalance - accuracy is misleading when one class dominates"],
      ["C", "Overfitting - the model memorized training noise that does not generalize"],
      ["D", "Underfitting - the model is too simple for the underlying pattern"]
    ],
    "answer": "C",
    "note": "A large train-test gap with high train accuracy is overfitting's signature. Note the direction: leakage produces the opposite pattern - suspiciously HIGH test scores that later collapse in production. Class imbalance distorts both scores similarly rather than creating a gap, and an underfit model would score poorly on the training data too.",
    "anchor": "Research Methods AI — L4 Slides"
  },
  {
    "id": "L4-Q17",
    "source": "L4 Slides",
    "topic": "Interpretability trade-off",
    "question": "[HARD] A bank must give each rejected loan applicant the reasons for the decision, as regulators require. A deep neural network predicts defaults slightly better than logistic regression. The lecture's trade-off framework most supports:",
    "options": [
      ["A", "The network - predictive performance is the primary criterion for models"],
      ["B", "The network, paired with post-hoc explanation tools for each rejection"],
      ["C", "Logistic regression - its coefficients directly provide the required reasons"],
      ["D", "Both in parallel - the network decides, the regression explains its choices"]
    ],
    "answer": "C",
    "note": "When explanations are legally required per decision, a transparent model whose coefficients ARE the explanation beats a slightly more accurate black box. The post-hoc option is the serious rival (SHAP-style tools exist), but such explanations approximate the model rather than constitute its reasoning, which is contested ground for regulatory purposes - and option D is worse: the regression would 'explain' decisions the network actually made. The lecture's point: the right model depends on deployment context, not the leaderboard.",
    "anchor": "Research Methods AI — L4 Slides"
  },
  {
    "id": "L5-Q1",
    "source": "L5 Slides",
    "topic": "Computational reproducibility defined",
    "question": "[EASY] A result is computationally reproducible when:",
    "options": [
      ["A", "A new study with new participants finds the same effect"],
      ["B", "The original code runs on the original data without any errors"],
      ["C", "Running the original code on the original data yields the same result"],
      ["D", "An independent analysis of the same data reaches the same conclusion"]
    ],
    "answer": "C",
    "note": "Same data + same code → same numbers. Running without errors is weaker - code can execute cleanly and produce different output (versions, seeds). Independent re-analysis with different methods is robustness, and new data is replication; both are valuable, neither is computational reproducibility.",
    "anchor": "Research Methods AI — L5 Slides"
  },
  {
    "id": "L5-Q2",
    "source": "L5 Slides",
    "topic": "Replication defined",
    "question": "[EASY] Replication differs from reproducibility because replication requires:",
    "options": [
      ["A", "Re-running the original analysis scripts on the original dataset"],
      ["B", "Re-analyzing the original dataset with different statistical methods"],
      ["C", "Collecting new data with the same method and finding a consistent result"],
      ["D", "Repeating the study with the same participants at a later time"]
    ],
    "answer": "C",
    "note": "Replication tests whether the FINDING holds in fresh data - new sample, same method. Rerunning scripts is reproducibility, re-analyzing with new methods is a robustness check, and re-testing the same participants is a retest of the same sample, not an independent replication.",
    "anchor": "Research Methods AI — L5 Slides"
  },
  {
    "id": "L5-Q3",
    "source": "L5 Slides",
    "topic": "Diagnosing a reproducibility failure",
    "question": "[MID] You download the exact data and analysis scripts from a published AI paper, run them, and get noticeably different numbers than the paper reports. The most plausible explanation is:",
    "options": [
      ["A", "The finding failed to replicate in your computational environment"],
      ["B", "Different library versions, undocumented steps, or unseeded randomness"],
      ["C", "The original result was a Type I error that your rerun corrected"],
      ["D", "The original authors p-hacked the analysis to reach significance"]
    ],
    "answer": "B",
    "note": "Same data, same code, different output points to the computational environment: package versions, manual steps never scripted, random seeds nobody fixed. 'Replicate' is the wrong word - no new data is involved (the first option misuses the term). Type I errors and p-hacking concern the inference, which a rerun of identical code cannot detect or correct; accusing before auditing your environment gets the order of suspects backwards.",
    "anchor": "Research Methods AI — L5 Slides"
  },
  {
    "id": "L5-Q4",
    "source": "L5 Slides",
    "topic": "Replication vs reproducibility in a scenario",
    "question": "[MID] A famous finding claims priming people with money words makes them less helpful. A lab in another country repeats the full procedure with 500 new participants and finds nothing. This outcome is best described as:",
    "options": [
      ["A", "A reproducibility failure in the original computational pipeline"],
      ["B", "A failed replication - new data and same method gave an inconsistent result"],
      ["C", "A Type II error by the new lab's underpowered design"],
      ["D", "Evidence that the original authors fabricated their data"]
    ],
    "answer": "B",
    "note": "New sample, same method, effect gone - the definition of a failed replication. Reproducibility is about rerunning the original computation, which nobody did here. With 500 participants, power is high, making a Type II miss unlikely (the n is in the stem for exactly this reason). And failure to replicate suggests a false positive or fragile effect long before it suggests fraud.",
    "anchor": "Research Methods AI — L5 Slides"
  },
  {
    "id": "L5-Q5",
    "source": "L5 Slides",
    "topic": "The replication crisis",
    "question": "[EASY] The 'replication crisis' refers to the discovery that:",
    "options": [
      ["A", "Most published code no longer runs on modern software"],
      ["B", "A large share of published findings fail to replicate in new samples"],
      ["C", "Journals systematically refuse to publish replication studies"],
      ["D", "Fabricated data is widespread across the empirical sciences"]
    ],
    "answer": "B",
    "note": "Large-scale projects, most prominently in psychology, found many celebrated effects shrink or vanish with fresh data. Journals' reluctance to publish replications and broken code are related ecosystem problems, but the crisis names the failing findings themselves; fraud explains only a small fraction - questionable research practices and publication bias do most of the damage.",
    "anchor": "Research Methods AI — L5 Slides"
  },
  {
    "id": "L5-Q6",
    "source": "L5 Slides",
    "topic": "Barriers to data sharing",
    "question": "[MID] A medical AI group genuinely wants to share its dataset but ultimately doesn't. Which list contains the realistic barriers discussed in the lecture?",
    "options": [
      ["A", "Patient privacy, preparation effort, fear of scooping, weak career incentives"],
      ["B", "Patient privacy, journal prohibitions on sharing, lack of repository space"],
      ["C", "Preparation effort, copyright on clinical data, mandatory deletion rules"],
      ["D", "Fear of scooping, absence of open formats for medical records, cost of hosting"]
    ],
    "answer": "A",
    "note": "The real obstacles are practical and incentive-based: privacy obligations, the unglamorous work of cleaning and documenting, competitive worries, and reward systems that count papers rather than datasets. The other lists each smuggle in a fake barrier: journals increasingly REQUIRE sharing, repositories and open formats exist, and there is no general deletion mandate blocking research sharing.",
    "anchor": "Research Methods AI — L5 Slides"
  },
  {
    "id": "L5-Q7",
    "source": "L5 Slides",
    "topic": "Reproducibility checklists",
    "question": "[EASY] What is the purpose of a reproducibility checklist at submission time?",
    "options": [
      ["A", "To standardize what authors must report and share for verification"],
      ["B", "To certify that the paper's findings will replicate in new data"],
      ["C", "To score papers so reviewers can rank them by methodological rigor"],
      ["D", "To replace code review by having authors self-attest correctness"]
    ],
    "answer": "A",
    "note": "Checklists turn good intentions into concrete reporting requirements - code availability, data access, hyperparameters, compute. They make verification POSSIBLE; they cannot certify replication in advance, and they complement rather than replace review.",
    "anchor": "Research Methods AI — L5 Slides"
  },
  {
    "id": "L5-Q8",
    "source": "L5 Slides",
    "topic": "Data leakage",
    "question": "[HARD] A team builds a skin-lesion classifier. Several patients contributed multiple photos, and the random split scattered photos of the same patient into both training and test sets. Test accuracy is 96%; on a new hospital's data it drops to 71%. The 96% was inflated primarily by:",
    "options": [
      ["A", "Overfitting - the model memorized noise in its training photos"],
      ["B", "Data leakage - patient-level information straddled the train/test split"],
      ["C", "Domain shift - the new hospital's imaging differs from the original's"],
      ["D", "Label noise - dermatologists disagreed on the original diagnoses"]
    ],
    "answer": "B",
    "note": "Photos of the same patient on both sides of the split mean the test set partly measures patient recognition, not lesion classification - leakage, fixed by splitting group-wise by patient. Domain shift is the strong rival: it surely contributes to the drop at the new hospital, but the stem describes a specific split flaw that inflated the 96% itself. Plain overfitting would have shown up as a low score on ANY honest test set, and label noise depresses rather than inflates measured accuracy.",
    "anchor": "Research Methods AI — L5 Slides"
  },
  {
    "id": "L5-Q9",
    "source": "L5 Slides",
    "topic": "Reproducibility gaps in CS/AI",
    "question": "[MID] Surveys of AI papers find recurring reproducibility gaps. Which option lists the typical trio from the lecture?",
    "options": [
      ["A", "Missing documentation, no code repository link, data-split leakage confounds"],
      ["B", "Missing documentation, excessive dataset sizes, proprietary hardware needs"],
      ["C", "No code repository link, non-English documentation, deprecated frameworks"],
      ["D", "Data-split leakage, unreported funding sources, single-blind reviewing"]
    ],
    "answer": "A",
    "note": "The recurring trio: undocumented methods, unavailable code, and subtle evaluation flaws - especially leakage - that make reported numbers unverifiable or inflated. The distractor lists pad one genuine item with plausible-sounding issues (hardware, language, funding) that are not the lecture's reproducibility gaps.",
    "anchor": "Research Methods AI — L5 Slides"
  },
  {
    "id": "L5-Q10",
    "source": "L5 Slides",
    "topic": "Spotting a predatory journal",
    "question": "[MID] A PhD student receives an email: 'Dear Esteemed Author, submit to the International Journal of Advanced AI Sciences - guaranteed peer review in 48 hours, decision in 3 days, only $950 processing fee.' The single strongest red flag is:",
    "options": [
      ["A", "The $950 article processing charge demanded from authors"],
      ["B", "The unsolicited, flattering invitation sent by mass email"],
      ["C", "The guaranteed 48-hour peer review with a decision in days"],
      ["D", "The broad, grandiose journal title covering all of AI science"]
    ],
    "answer": "C",
    "note": "Real peer review takes weeks to months; 'guaranteed' review in 48 hours signals review is not actually happening - the defining feature of predation (fees without real review). The other three are genuine yellow flags but each has innocent counterparts: legitimate open-access journals charge APCs, real journals send calls for papers, and broad titles exist among reputable venues.",
    "anchor": "Research Methods AI — L5 Slides"
  },
  {
    "id": "L5-Q11",
    "source": "L5 Slides",
    "topic": "Peer review types",
    "question": "[EASY] In double-blind peer review:",
    "options": [
      ["A", "Reviewers see the authors' names, but authors never learn the reviewers'"],
      ["B", "Neither authors nor reviewers learn each other's identities"],
      ["C", "Reviews are published openly alongside the reviewers' names"],
      ["D", "Two independent reviewers must agree before acceptance"]
    ],
    "answer": "B",
    "note": "Double-blind hides identities in both directions, aiming to mute prestige and demographic bias. The first option describes single-blind, the third open review; the 'two reviewers' reading is a folk etymology of 'double' that has nothing to do with blinding.",
    "anchor": "Research Methods AI — L5 Slides"
  },
  {
    "id": "L5-Q12",
    "source": "L5 Slides",
    "topic": "Open review trade-offs",
    "question": "[HARD] A conference switches to fully open review: reviews and reviewer names are published alongside papers. The most realistic trade-off to expect is:",
    "options": [
      ["A", "Higher accountability, but junior reviewers may soften criticism of powerful authors"],
      ["B", "Higher review quality, but review volume drops as anonymity-seekers decline"],
      ["C", "Lower prestige bias, but reviewers collude more easily once identified"],
      ["D", "Faster reviewing, but the published reviews reveal unpublished ideas"]
    ],
    "answer": "A",
    "note": "Visible names encourage careful, civil reviews (accountability) but expose critics - especially junior ones - to social risk when reviewing senior figures, which is the chilling effect the lecture flags. The other options pair a plausible benefit with a speculative or incoherent cost: open review does not particularly reduce prestige bias (identities become MORE visible) nor speed anything up.",
    "anchor": "Research Methods AI — L5 Slides"
  },
  {
    "id": "L5-Q13",
    "source": "L5 Slides",
    "topic": "Publication bias",
    "question": "[MID] Twenty labs test whether a brain-training app boosts memory. Nineteen find nothing and shelve their results; one finds a positive effect and publishes. The published literature now suggests the app works. This distortion is called:",
    "options": [
      ["A", "p-hacking - flexible analysis pushed one study across the threshold"],
      ["B", "Publication bias - null results vanish into the file drawer"],
      ["C", "HARKing - the positive lab framed its result as predicted all along"],
      ["D", "Citation bias - positive findings get cited more than null ones"]
    ],
    "answer": "B",
    "note": "The distortion described operates at the publish/don't-publish step: nulls go unpublished, so readers see a censored record - the file-drawer problem. Nothing in the scenario says the one positive lab analyzed flexibly (p-hacking) or rewrote its hypothesis (HARKing); with twenty tests, one false positive is expected by chance alone. Citation bias is a further distortion downstream of publication.",
    "anchor": "Research Methods AI — L5 Slides"
  },
  {
    "id": "L5-Q14",
    "source": "L5 Slides",
    "topic": "Downstream cost of publication bias",
    "question": "[HARD] A meta-analysis pools all published studies on an intervention and finds a solid average effect. Why can publication bias make even this synthesis misleading?",
    "options": [
      ["A", "Pooling studies of different designs invalidates the averaged estimate"],
      ["B", "The pooled estimate inherits inflation if null studies never entered the pool"],
      ["C", "Meta-analyses weight large studies too heavily, drowning out small nulls"],
      ["D", "Averaging across labs compounds each study's individual Type I risk"]
    ],
    "answer": "B",
    "note": "A meta-analysis is only as unbiased as its input: if the file drawer swallowed the nulls, the pool is censored and the precise-looking average estimates a biased quantity. Heterogeneity (option A) and weighting are real methodological debates but don't capture the publication-bias mechanism; large-study weighting actually mitigates bias, since big studies get published regardless of outcome.",
    "anchor": "Research Methods AI — L5 Slides"
  },
  {
    "id": "L5-Q15",
    "source": "L5 Slides",
    "topic": "Making your own work reproducible",
    "question": "[MID] You are about to submit your first ML paper. Which package of actions does most for its computational reproducibility?",
    "options": [
      ["A", "Public code and data, pinned software versions, fixed seeds, scripted pipeline"],
      ["B", "Public code and data, detailed methods section, results tables in the appendix"],
      ["C", "Detailed methods section, code available on request, standard frameworks"],
      ["D", "Public code, fixed seeds, plus a video walkthrough of the analysis steps"]
    ],
    "answer": "A",
    "note": "Reproducibility is engineered: versioned code AND data, pinned environments, fixed seeds, and a fully scripted (no manual steps) pipeline. Prose descriptions and result tables describe outcomes without enabling regeneration; 'available on request' famously converges to unavailable; and a video of manual steps documents irreproducibility rather than fixing it.",
    "anchor": "Research Methods AI — L5 Slides"
  },
  {
    "id": "L5-Q16",
    "source": "L5 Slides",
    "topic": "Classifying verification claims",
    "question": "[HARD] Four claims about a published study. Which one describes REPLICATION rather than reproducibility?",
    "options": [
      ["A", "'I reran their notebook on their data and obtained their Table 2 exactly.'"],
      ["B", "'Their repository is offline, so nobody can rerun the analysis anymore.'"],
      ["C", "'We recruited a fresh sample, followed their protocol, and saw the same effect.'"],
      ["D", "'Their numbers change when the analysis runs on a newer pandas version.'"]
    ],
    "answer": "C",
    "note": "Only the fresh-sample claim involves new data - that is replication. The other three all concern rerunning the original computation: successfully (A), impossibly (B), and fragilely (D) - reproducibility in its success, failure, and brittleness modes.",
    "anchor": "Research Methods AI — L5 Slides"
  },
  {
    "id": "W6-Q1",
    "source": "Week 6 Slides",
    "topic": "Belmont principles overview",
    "question": "[EASY] The three core principles of the Belmont framework are:",
    "options": [
      ["A", "Transparency, accountability, and fairness"],
      ["B", "Respect for persons, beneficence, and justice"],
      ["C", "Consent, confidentiality, and debriefing"],
      ["D", "Autonomy, privacy, and non-maleficence"]
    ],
    "answer": "B",
    "note": "Belmont's triad: respect for persons (autonomy/consent), beneficence (maximize benefit, minimize harm), justice (fair distribution of burdens and benefits). The distractors mix AI-governance vocabulary, procedural safeguards, and bioethics terms that overlap conceptually - consent, autonomy, and non-maleficence are components or cousins of the principles, not the named triad.",
    "anchor": "Research Methods AI — Week 6 Slides"
  },
  {
    "id": "W6-Q2",
    "source": "Week 6 Slides",
    "topic": "Respect for persons",
    "question": "[EASY] The principle of respect for persons most directly requires researchers to:",
    "options": [
      ["A", "Obtain informed consent and protect those with reduced autonomy"],
      ["B", "Weigh anticipated benefits against possible harms before starting"],
      ["C", "Select participants so burdens and benefits are fairly distributed"],
      ["D", "Debrief participants fully after any use of deception"]
    ],
    "answer": "A",
    "note": "Respect for persons = treating people as autonomous decision-makers (informed, voluntary consent) plus extra protection where autonomy is reduced. Risk-benefit weighing belongs to beneficence and fair selection to justice; debriefing is a specific procedure that serves respect but is not its core definition.",
    "anchor": "Research Methods AI — Week 6 Slides"
  },
  {
    "id": "W6-Q3",
    "source": "Week 6 Slides",
    "topic": "Justice in subject selection",
    "question": "[HARD] A risky early-phase drug trial recruits exclusively from a low-income neighborhood by offering payments, while the resulting therapy will be priced for wealthy patients. Which Belmont principle is most directly violated?",
    "options": [
      ["A", "Respect for persons - the payments may render consent less than voluntary"],
      ["B", "Beneficence - the trial's risks plainly outweigh its expected benefits"],
      ["C", "Justice - one group bears the burdens while another reaps the benefits"],
      ["D", "All three equally - the design fails on every Belmont dimension"]
    ],
    "answer": "C",
    "note": "The defining feature of the scenario is the asymmetric DISTRIBUTION: burdens concentrated on the poor, benefits flowing to the wealthy - justice's exact subject matter. The undue-inducement worry (respect) is a legitimate secondary concern, which makes it the strong distractor; but payment per se doesn't invalidate consent, and nothing in the stem shows the trial's overall risk-benefit balance failing. 'Most directly' is doing the work.",
    "anchor": "Research Methods AI — Week 6 Slides"
  },
  {
    "id": "W6-Q4",
    "source": "Week 6 Slides",
    "topic": "Beneficence and risk-benefit",
    "question": "[MID] An ethics board reviews a study where participants are mildly deceived for 10 minutes, fully debriefed afterwards, and the results could substantially improve mental-health screening. Under beneficence, the board's core task is to:",
    "options": [
      ["A", "Reject the protocol, since deception negates autonomy regardless of debriefing"],
      ["B", "Weigh expected benefits against risks and verify harms are minimized"],
      ["C", "Approve the protocol, since the societal benefit plainly justifies mild deception"],
      ["D", "Ask participants to judge the risks themselves through the consent form"]
    ],
    "answer": "B",
    "note": "Beneficence is a balancing exercise: maximize expected benefit, minimize harm, and require residual risk to be justified by the gain - it neither bans all deception nor rubber-stamps important topics. The automatic-rejection stance is a real deontological position but answers a respect-for-persons question, not the beneficence question asked; and delegating the weighing to participants abdicates the board's distinct duty.",
    "anchor": "Research Methods AI — Week 6 Slides"
  },
  {
    "id": "W6-Q5",
    "source": "Week 6 Slides",
    "topic": "Facebook emotional contagion - core failure",
    "question": "[MID] In the 2014 Facebook emotional contagion study, news feeds of ~690,000 users were altered to study emotion. The study's central ethical failure was that:",
    "options": [
      ["A", "Users' emotions were manipulated without their informed consent"],
      ["B", "The possible emotional harm was never weighed against the benefits"],
      ["C", "The affected users were never debriefed after the experiment ended"],
      ["D", "The blanket terms-of-service agreement was never shown to the users"]
    ],
    "answer": "A",
    "note": "The central failure is consent: users never agreed to be subjects in an emotion-manipulation experiment, and a blanket ToS clause is not informed consent (note: the ToS WAS shown - the last option's premise is false; the problem is that ToS acceptance doesn't constitute consent to research). Unassessed harm and missing debriefing are genuine secondary failures the case also illustrates, but the lecture centers the consent violation.",
    "anchor": "Research Methods AI — Week 6 Slides"
  },
  {
    "id": "W6-Q6",
    "source": "Week 6 Slides",
    "topic": "Facebook study - systemic lessons",
    "question": "[MID] Beyond missing consent, the Facebook contagion case exposed which broader systemic problem for industry research?",
    "options": [
      ["A", "Corporate user studies could proceed with little independent ethical review"],
      ["B", "Academic journals lacked the expertise to evaluate industry methods"],
      ["C", "Platform A/B testing was technically incapable of measuring emotion"],
      ["D", "Industry researchers were unaware that consent rules applied to them"]
    ],
    "answer": "A",
    "note": "The systemic gap: experiments on hundreds of thousands of users passed through none of the independent review infrastructure (IRB-style) that university research must clear, and possible emotional harm was barely assessed. The study was published and methodologically capable; awareness wasn't the issue - the review STRUCTURE was missing.",
    "anchor": "Research Methods AI — Week 6 Slides"
  },
  {
    "id": "W6-Q7",
    "source": "Week 6 Slides",
    "topic": "Historical abuses behind Belmont",
    "question": "[MID] In the Tuskegee syphilis study, poor Black men were observed for decades, denied effective treatment after it existed, and misled about their condition. Which Belmont principles did it violate?",
    "options": [
      ["A", "Justice above all - the harm came from targeting a vulnerable group"],
      ["B", "Respect and beneficence, while selection fairness is a separate legal issue"],
      ["C", "All three - deception, withheld treatment, and targeting a vulnerable group"],
      ["D", "Beneficence above all - withholding treatment caused the concrete harm"]
    ],
    "answer": "C",
    "note": "Tuskegee fails on every dimension: deception destroyed informed consent (respect), withholding penicillin caused direct harm (beneficence), and burdens fell on a marginalized group (justice). The single-principle options each name a real violation - that's what makes them tempting - but the case is taught precisely as the total failure that motivated the Belmont Report.",
    "anchor": "Research Methods AI — Week 6 Slides"
  },
  {
    "id": "W6-Q8",
    "source": "Week 6 Slides",
    "topic": "Scraping and Terms of Service",
    "question": "[MID] A student scrapes a public web forum for an emotion-detection dataset. The posts are publicly visible, but the platform's Terms of Service forbid scraping, and users never imagined their posts becoming AI training data. The most accurate ethical assessment is:",
    "options": [
      ["A", "Acceptable - publicly posted content carries no expectation of privacy"],
      ["B", "Problematic - public visibility is not consent, and the ToS adds a compliance issue"],
      ["C", "Acceptable once usernames are stripped, since no one is identifiable"],
      ["D", "Problematic solely because of the ToS - ethics follows the platform's rules"]
    ],
    "answer": "B",
    "note": "Two distinct layers: 'public' does not equal 'consented to research use' (people post for an audience, not for dataset inclusion) - the ethical layer - and the ToS prohibition adds a separate compliance layer. Stripping usernames helps but post content often re-identifies people, and reducing ethics to ToS-compliance gets the relationship backwards: a permissive ToS wouldn't settle the consent question either.",
    "anchor": "Research Methods AI — Week 6 Slides"
  },
  {
    "id": "W6-Q9",
    "source": "Week 6 Slides",
    "topic": "GDPR data minimization",
    "question": "[MID] A simple quiz app's signup form demands name, home address, precise GPS location, and contacts access - none needed for quizzing. Which GDPR principle does this most directly violate?",
    "options": [
      ["A", "Purpose limitation - data may only be used for its declared purpose"],
      ["B", "Storage limitation - data may not be retained longer than necessary"],
      ["C", "Data minimization - only data necessary for the purpose may be collected"],
      ["D", "Lawfulness of processing - collection requires a valid legal basis"]
    ],
    "answer": "C",
    "note": "The violation happens at COLLECTION: gathering data the purpose doesn't need. Purpose limitation is the nearest neighbor but governs later USE of data beyond its declared purpose; storage limitation concerns retention time; lawful basis might also be questioned, but the stem's emphasis - 'none needed for quizzing' - is minimization's exact language.",
    "anchor": "Research Methods AI — Week 6 Slides"
  },
  {
    "id": "W6-Q10",
    "source": "Week 6 Slides",
    "topic": "Anonymization vs pseudonymization",
    "question": "[HARD] A hospital replaces patient names with random codes but keeps a secure key file linking codes back to identities for follow-up. Under GDPR, this data is:",
    "options": [
      ["A", "Anonymized - identities are removed from the working dataset"],
      ["B", "Pseudonymized - and therefore still personal data within GDPR's scope"],
      ["C", "Pseudonymized - and therefore exempt from GDPR like anonymous data"],
      ["D", "Anonymized for analysts without key access, pseudonymized for the rest"]
    ],
    "answer": "B",
    "note": "As long as a key permits re-identification, the data is pseudonymized and remains fully inside GDPR - that is the regulation's explicit position. The two-step trap: first classify correctly (pseudonymized, not anonymized), then attach the right consequence (still regulated, not exempt). The 'depends on who holds the key' reading is intuitive but GDPR ties status to the data's re-identifiability, not the individual analyst's access.",
    "anchor": "Research Methods AI — Week 6 Slides"
  },
  {
    "id": "W6-Q11",
    "source": "Week 6 Slides",
    "topic": "Recognizing p-hacking",
    "question": "[MID] A researcher's effect isn't significant, so they drop two 'outlier' participants, try three alternative outcome measures, and test subgroups until one combination yields p = 0.049, which they report as their finding. This practice is:",
    "options": [
      ["A", "Sensitivity analysis - probing whether results hold under analytic variations"],
      ["B", "HARKing - presenting the surviving result as the original hypothesis"],
      ["C", "p-hacking - searching the analysis space until significance appears"],
      ["D", "Multiple-comparison correction - exploring tests before choosing one"]
    ],
    "answer": "C",
    "note": "Analysis decisions made after seeing the data, steered toward p < .05, are p-hacking: the reported test no longer carries its advertised error rate. Sensitivity analysis runs the same variations but reports ALL of them - transparency is the difference. HARKing is the sibling QRP about rewriting the hypothesis (not described here), and correction procedures ADJUST for multiple tests rather than hiding them.",
    "anchor": "Research Methods AI — Week 6 Slides"
  },
  {
    "id": "W6-Q12",
    "source": "Week 6 Slides",
    "topic": "HARKing",
    "question": "[HARD] After exploring a dataset, a team finds an unexpected correlation, then writes the paper as if predicting exactly that correlation had been the study's hypothesis from day one. This QRP is called:",
    "options": [
      ["A", "p-hacking - the hypothesis was tuned until the data fit it"],
      ["B", "HARKing - hypothesizing after the results are known"],
      ["C", "Publication bias - only the successful prediction reached print"],
      ["D", "Confirmation bias - they believed the pattern because they found it"]
    ],
    "answer": "B",
    "note": "Disguising exploration as confirmation - presenting a data-discovered pattern as an a-priori prediction - is HARKing. p-hacking manipulates the ANALYSIS to reach significance; HARKing manipulates the NARRATIVE around an honest analysis. Exploratory findings are legitimate when labeled as exploratory and confirmed on new data; the sin is the disguise.",
    "anchor": "Research Methods AI — Week 6 Slides"
  },
  {
    "id": "W6-Q13",
    "source": "Week 6 Slides",
    "topic": "Honest visualization",
    "question": "[EASY] A press release plots user growth from 10,000 to 10,300 with the y-axis starting at 9,950, making the bar appear to triple. The ethical problem is that:",
    "options": [
      ["A", "The truncated axis visually exaggerates a negligible change"],
      ["B", "The underlying growth numbers were fabricated for the chart"],
      ["C", "Growth data should be shown as a line chart, never as bars"],
      ["D", "The chart omits confidence intervals around the user counts"]
    ],
    "answer": "A",
    "note": "Every number is true; the deception lives in the axis - a 3% change rendered as a 200% visual impression. That is the core of visualization ethics: axes, scales, and selections must not engineer impressions the data doesn't support. Chart-type conventions and missing uncertainty bands are style points, not the misleading mechanism here.",
    "anchor": "Research Methods AI — Week 6 Slides"
  },
  {
    "id": "W6-Q14",
    "source": "Week 6 Slides",
    "topic": "EU AI Act risk tiers",
    "question": "[MID] Under the EU AI Act's risk-based approach, classify: (1) a government 'social scoring' system ranking citizens' trustworthiness; (2) an AI tool screening job applicants' CVs.",
    "options": [
      ["A", "Both are high risk, permitted under strict transparency requirements"],
      ["B", "(1) is unacceptable risk and banned; (2) is high risk under strict requirements"],
      ["C", "(1) is high risk; (2) is limited risk, needing only a disclosure label"],
      ["D", "(1) is unacceptable risk and banned; (2) is limited risk with disclosure"]
    ],
    "answer": "B",
    "note": "Social scoring by governments sits in the banned 'unacceptable' tier. Employment and hiring systems are a flagship 'high-risk' category - legal but subject to bias audits, documentation, human oversight, and transparency. The composite options work by getting one classification right: check BOTH before answering.",
    "anchor": "Research Methods AI — Week 6 Slides"
  },
  {
    "id": "W6-Q15",
    "source": "Week 6 Slides",
    "topic": "AI disclosure to users",
    "question": "[MID] A company's customer-service chatbot is so fluent that most customers believe they are chatting with a human employee, and the company quietly enjoys this. Regarding disclosure, the defensible position is:",
    "options": [
      ["A", "Disclose proactively that customers are interacting with an AI system"],
      ["B", "Disclose in the website's terms of service, where the information is available"],
      ["C", "Disclose whenever a customer directly asks whether the agent is human"],
      ["D", "Disclosure is unneeded while service quality matches a human agent's"]
    ],
    "answer": "A",
    "note": "Transparency means people know they are talking to a machine at the point of interaction - the EU AI Act makes this an explicit obligation for human-facing AI. Burying the fact in ToS repeats the Facebook-consent fallacy (available is not informed), answer-only-if-asked exploits the deception by default, and good service quality answers a different question than honesty.",
    "anchor": "Research Methods AI — Week 6 Slides"
  },
  {
    "id": "W6-Q16",
    "source": "Week 6 Slides",
    "topic": "Data reuse beyond original consent",
    "question": "[HARD] In 2019, participants consented to share voice recordings 'for a study on regional accents'. In 2026, the lab wants to reuse those recordings to train a commercial voice-cloning model. Which assessment is correct?",
    "options": [
      ["A", "Proceeding is fine - the data was lawfully collected and remains the lab's"],
      ["B", "Proceeding requires removing names first, since voice data is then anonymous"],
      ["C", "Proceeding exceeds the consented purpose - new consent or safeguards are needed"],
      ["D", "Proceeding is covered by research exemptions for previously collected data"]
    ],
    "answer": "C",
    "note": "Consent is purpose-bound, not a blank check: accent research and commercial voice cloning differ in purpose, beneficiary, and risk profile (cloning is far more invasive), so respect for persons and GDPR purpose limitation both demand renewed consent or equivalent safeguards. The anonymization route fails because a voice IS a biometric identifier - names are not the identifying part. Research exemptions are real but narrow, and a commercial cloning product is not covered research.",
    "anchor": "Research Methods AI — Week 6 Slides"
  }
];
