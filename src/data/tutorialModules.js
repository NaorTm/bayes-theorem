export const tutorialModules = [
  {
    id: "P",
    title: "Prerequisites Refresh",
    oneSentenceIntuition:
      "Before Bayes, lock in events, conditional probability, independence, and total probability.",
    visualHint: "Sample space split into mutually exclusive partitions.",
    formalDefinition: {
      text: "These are the minimum tools used in every later module.",
      formulas: [
        "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}",
        "P(A)=\\sum_i P(A\\mid B_i)P(B_i)",
        "P(A\\cap B)=P(A)P(B)\\text{ if independent}"
      ]
    },
    derivationSteps: [
      "Start with a sample space and define events as subsets.",
      "Joint probability captures overlap; marginal probability sums relevant overlap.",
      "Conditional probability rescales the overlap by the conditioning event.",
      "Partitions convert hard denominators into weighted sums."
    ],
    workedExamples: [
      {
        title: "Partition warm-up",
        statement:
          "Factory has lines L1, L2 with output shares 0.7 and 0.3. Defect rates are 0.02 and 0.05.",
        solution:
          "P(D)=P(D|L1)P(L1)+P(D|L2)P(L2)=0.02*0.7+0.05*0.3=0.029.",
        formula: "P(D)=\\sum_iP(D\\mid L_i)P(L_i)",
        takeaway: "Weighted averages appear constantly in Bayes denominators."
      }
    ],
    quickCheck: [
      {
        id: "p1",
        prompt: "If A and B are independent, P(A|B) equals",
        options: ["P(A)", "P(B|A)", "P(A cap B)", "1 - P(A)"],
        correctIndex: 0,
        feedbackCorrect:
          "Correct. Conditioning on B changes nothing when events are independent.",
        feedbackIncorrect: "Independence means P(A|B)=P(A)."
      },
      {
        id: "p2",
        prompt: "Total probability requires",
        options: [
          "A partition of the sample space",
          "Independent events only",
          "Equal priors",
          "Continuous densities"
        ],
        correctIndex: 0,
        feedbackCorrect:
          "Correct. Partition events must be mutually exclusive and exhaustive.",
        feedbackIncorrect: "You need partition events that cover all outcomes."
      }
    ],
    trapQuestion: {
      prompt: "Trap: Can you divide by P(B)=0 in conditional probability?",
      commonMistake: "Treating impossible evidence as ordinary data.",
      correction: "No. Conditioning on zero-probability events needs a different formalism."
    },
    linkedLabs: ["lab1", "lab2"]
  },
  {
    id: "A",
    title: "Conditional Probability That Actually Sticks",
    oneSentenceIntuition:
      "Conditioning means zooming into event B and recomputing proportions only inside that region.",
    visualHint: "Area rectangle where B is the new whole.",
    formalDefinition: {
      text: "Conditional probability is overlap divided by the conditioning event.",
      formulas: [
        "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}",
        "P(A\\cap B)=P(A\\mid B)P(B)=P(B\\mid A)P(A)"
      ]
    },
    derivationSteps: [
      "View B as the restricted universe.",
      "Inside B, count only points that are also in A.",
      "Translate counts to probabilities by dividing by P(B)."
    ],
    workedExamples: [
      {
        title: "Weather and umbrella",
        statement: "P(Rain)=0.3, P(Umbrella and Rain)=0.21. Compute P(Umbrella|Rain).",
        solution: "0.21/0.3=0.7.",
        formula: "P(U\\mid R)=\\frac{P(U\\cap R)}{P(R)}",
        takeaway: "The denominator is always the condition."
      },
      {
        title: "Card draw without replacement",
        statement: "First card is king. What is P(second is king)?",
        solution: "There are 3 kings in 51 cards, so 3/51.",
        formula: "P(K_2\\mid K_1)=\\frac{3}{51}",
        takeaway: "Conditioning changes the sample space size."
      },
      {
        title: "Study group attendance",
        statement: "40% attend tutorial, 18% attend tutorial and office hours. Find P(office|tutorial).",
        solution: "0.18/0.4=0.45.",
        formula: "P(O\\mid T)=\\frac{P(O\\cap T)}{P(T)}",
        takeaway: "Joint to conditional is always divide by the condition."
      }
    ],
    quickCheck: [
      {
        id: "a1",
        prompt: "In P(A|B), what is the denominator?",
        options: ["P(B)", "P(A)", "P(A cap B)", "P(A union B)"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Conditioning always puts P(B) in the denominator."
      },
      {
        id: "a2",
        prompt: "If P(A cap B)=0.12 and P(B)=0.3, P(A|B)=",
        options: ["0.4", "0.36", "0.18", "0.7"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Compute 0.12 / 0.3."
      },
      {
        id: "a3",
        prompt: "If A and B are independent, then P(A|B)=",
        options: ["P(A)", "P(B)", "0", "1"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Independence means no update from B."
      },
      {
        id: "a4",
        prompt: "Which identity is always true?",
        options: [
          "P(A cap B)=P(A|B)P(B)",
          "P(A|B)=P(B|A)",
          "P(A cap B)=P(A)+P(B)",
          "P(A|B)=P(A)P(B)"
        ],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Only the product rule is universally true."
      },
      {
        id: "a5",
        prompt: "Conditional probability can exceed 1?",
        options: ["No", "Yes", "Only for rare events", "Only if independent"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Probabilities stay in [0,1]."
      },
      {
        id: "a6",
        prompt: "When P(B)=0, P(A|B) is",
        options: ["Undefined in elementary form", "0", "1", "P(A)"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Division by zero is undefined."
      }
    ],
    trapQuestion: {
      prompt:
        "Trap: You computed P(A|B) using P(A) in the denominator. Why is that wrong?",
      commonMistake:
        "Confusing the event asked about with the event being conditioned on.",
      correction:
        "The condition defines the restricted universe, so denominator must be P(B)."
    },
    linkedLabs: ["lab1"]
  },
  {
    id: "B",
    title: "Deriving Bayes From One Line",
    oneSentenceIntuition:
      "Bayes is the same joint probability written from two directions and solved for the unknown conditional.",
    visualHint: "Two arrows into the same intersection A cap B.",
    formalDefinition: {
      text: "Start from the product rule in two forms.",
      formulas: [
        "P(A\\cap B)=P(A\\mid B)P(B)",
        "P(A\\cap B)=P(B\\mid A)P(A)",
        "P(A\\mid B)=\\frac{P(B\\mid A)P(A)}{P(B)}"
      ]
    },
    derivationSteps: [
      "Write P(A cap B) with conditioning on B.",
      "Write P(A cap B) with conditioning on A.",
      "Set both equal and isolate P(A|B).",
      "Then unpack numerator (prior x likelihood) and denominator (evidence)."
    ],
    workedExamples: [
      {
        title: "Spot the denominator",
        statement:
          "Disease prevalence 0.02, sensitivity 0.9, false positive 0.08. Compute P(D|+).",
        solution:
          "P(+)=0.9*0.02+0.08*0.98=0.0964. Posterior=0.018/0.0964=0.1867.",
        formula: "P(D\\mid +)=\\frac{P(+\\mid D)P(D)}{P(+)}",
        takeaway: "If P(+) is omitted, the answer is wrong by design."
      }
    ],
    quickCheck: [
      {
        id: "b1",
        prompt: "Bayes numerator is",
        options: ["Likelihood x prior", "Prior + likelihood", "Posterior x evidence", "Likelihood only"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Use P(B|A)P(A)."
      },
      {
        id: "b2",
        prompt: "If P(B) is tiny, posterior can",
        options: ["Increase sharply", "Always decrease", "Stay equal to prior", "Become negative"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Small evidence can amplify odds for compatible hypotheses."
      },
      {
        id: "b3",
        prompt: "\"Spot the denominator\" means",
        options: [
          "Compute probability of observed evidence",
          "Compute prior odds",
          "Ignore complements",
          "Assume independence"
        ],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "P(B) is the normalizer."
      }
    ],
    trapQuestion: {
      prompt: "Trap: Is P(B) equal to P(B|A)?",
      commonMistake: "Treating conditional evidence under one hypothesis as total evidence.",
      correction: "No. P(B) averages likelihood over all hypotheses."
    },
    linkedLabs: ["lab2", "lab3"]
  },
  {
    id: "C",
    title: "The Normalizing Constant and Total Probability",
    oneSentenceIntuition:
      "Evidence is a weighted average of likelihood values across all plausible causes.",
    visualHint: "Partition bars summed into one evidence bar.",
    formalDefinition: {
      text: "Use partitions to compute the denominator exactly.",
      formulas: [
        "P(B)=\\sum_i P(B\\mid A_i)P(A_i)",
        "P(A_k\\mid B)=\\frac{P(B\\mid A_k)P(A_k)}{\\sum_i P(B\\mid A_i)P(A_i)}"
      ]
    },
    derivationSteps: [
      "Choose hypotheses A1..An that partition the sample space.",
      "Compute each weighted likelihood term P(B|Ai)P(Ai).",
      "Add them to get evidence P(B).",
      "Divide target numerator by this sum."
    ],
    workedExamples: [
      {
        title: "Three-factory defect source",
        statement: "P(F1,F2,F3)=(0.5,0.3,0.2), defect rates=(0.01,0.03,0.05). Find P(F3|D).",
        solution: "P(D)=0.005+0.009+0.01=0.024. Posterior=0.01/0.024=0.4167.",
        formula: "P(F_3\\mid D)=\\frac{P(D\\mid F_3)P(F_3)}{\\sum_iP(D\\mid F_i)P(F_i)}",
        takeaway: "Ignoring one factory distorts evidence and posterior."
      },
      {
        title: "Fraud alert channels",
        statement: "Alerts may come from stolen card, merchant error, or user typo. Compute posterior cause of an alert.",
        solution: "Compute denominator by summing all three channel contributions before dividing any one cause.",
        formula: "P(Cause_j\\mid Alert)=\\frac{P(Alert\\mid Cause_j)P(Cause_j)}{\\sum_i ...}",
        takeaway: "Multi-hypothesis denominator prevents overconfident attribution."
      },
      {
        title: "Email classification with 3 classes",
        statement: "Classes are spam, promo, personal with priors and word likelihood for discount.",
        solution: "Weighted sum across all three classes gives P(word), then normalize each class score.",
        formula: "P(class\\mid word)=\\frac{P(word\\mid class)P(class)}{\\sum_{c}P(word\\mid c)P(c)}",
        takeaway: "Naive Bayes still needs full denominator conceptually."
      },
      {
        title: "Sensor source attribution",
        statement: "Alarm can come from fire, steam, or fault. Infer cause from alarm.",
        solution: "Posterior for each cause equals weighted likelihood over total weighted likelihood.",
        formula: "P(Fire\\mid Alarm)=\\frac{P(Alarm\\mid Fire)P(Fire)}{\\sum_i...}",
        takeaway: "Rare causes can dominate if likelihood ratio is high enough."
      },
      {
        title: "Hiring pipeline stage attribution",
        statement: "Drop-off may occur at screening, interview, or offer stage. Infer stage from observed delay pattern.",
        solution: "Compute all stage contributions to delay pattern, then divide target stage contribution by total.",
        formula: "P(Stage_k\\mid Pattern)=\\frac{P(Pattern\\mid Stage_k)P(Stage_k)}{\\sum_i...}",
        takeaway: "Evidence is always a weighted sum, never a single likelihood term."
      }
    ],
    quickCheck: [
      {
        id: "c1",
        prompt: "Evidence term is best described as",
        options: ["Weighted average of likelihood", "Prior", "Posterior", "Cost function"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Each likelihood gets weighted by its prior mass."
      },
      {
        id: "c2",
        prompt: "If hypotheses do not partition the space, denominator is",
        options: ["Incomplete", "Still exact", "Always 1", "Irrelevant"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Missing hypotheses means missing evidence mass."
      },
      {
        id: "c3",
        prompt: "Total probability is needed when",
        options: ["P(B) is not directly given", "P(A)=0", "P(B)=1", "Events are independent"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Most real problems hide P(B)."
      }
    ],
    trapQuestion: {
      prompt: "Trap: Why is dividing by only P(B|A_k) wrong?",
      commonMistake: "Forgetting competing hypotheses that also generate B.",
      correction: "Denominator must include all pathways that lead to evidence B."
    },
    linkedLabs: ["lab2", "lab3"]
  },
  {
    id: "D",
    title: "Visualizations That Match the Math",
    oneSentenceIntuition:
      "Area, tree, matrix, and Sankey are the same calculation dressed differently.",
    visualHint: "Toggle lenses for one fixed numeric example.",
    formalDefinition: {
      text: "All lenses preserve numerator and denominator terms.",
      formulas: [
        "P(A\\mid B)=\\frac{P(B\\mid A)P(A)}{P(B\\mid A)P(A)+P(B\\mid A^c)P(A^c)}"
      ]
    },
    derivationSteps: [
      "Fix one numeric case: prior, true-positive rate, false-positive rate.",
      "Represent the same terms as geometric area, branches, table cells, and flow width.",
      "Verify each lens yields identical posterior."
    ],
    workedExamples: [
      {
        title: "One case, four lenses",
        statement: "Use prevalence 1%, sensitivity 95%, false positive 8%.",
        solution: "All views produce P(D|+)=0.1076 when denominator includes both positive pathways.",
        formula: "P(D\\mid +)=\\frac{0.95\\cdot 0.01}{0.95\\cdot 0.01+0.08\\cdot 0.99}",
        takeaway: "Visual choice can change intuition without changing math."
      }
    ],
    quickCheck: [
      {
        id: "d1",
        prompt: "In matrix view, denominator for P(D|+) is",
        options: ["All positive tests", "All diseased", "All negatives", "Population size"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Conditioning on + means sum positive row totals."
      },
      {
        id: "d2",
        prompt: "Sankey width represents",
        options: ["Probability mass flow", "Time", "Cost", "Variance"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Flow width encodes mass."
      }
    ],
    trapQuestion: {
      prompt: "Trap: Different diagrams gave different answers. What failed?",
      commonMistake: "Mixing mismatched parameters between lenses.",
      correction: "Keep one numeric configuration and map each term consistently."
    },
    linkedLabs: ["lab1", "lab2", "lab3", "lab4"],
    lensConfig: {
      prior: 0.01,
      pBGivenA: 0.95,
      pBGivenNotA: 0.08
    }
  },
  {
    id: "E",
    title: "Base Rates and Why Humans Get It Wrong",
    oneSentenceIntuition:
      "Even accurate tests can yield low positive predictive value when prevalence is small.",
    visualHint: "Counts per 10,000 make base-rate neglect obvious.",
    formalDefinition: {
      text: "Medical test interpretation depends on prevalence, sensitivity, and specificity together.",
      formulas: [
        "P(D\\mid +)=\\frac{Se\\cdot Prev}{Se\\cdot Prev +(1-Sp)(1-Prev)}",
        "FPR=1-Sp,\\quad FNR=1-Se"
      ]
    },
    derivationSteps: [
      "Convert rates to counts per 10,000.",
      "Compute true positives and false positives.",
      "Condition on positive test by dividing true positives by all positives."
    ],
    workedExamples: [
      {
        title: "Rare disease screening",
        statement: "Prev 0.5%, Se 98%, Sp 95%.",
        solution: "In 10,000: TP=49, FP=498, so P(D|+)=49/547=8.96%.",
        formula: "\\frac{0.98\\cdot0.005}{0.98\\cdot0.005+0.05\\cdot0.995}",
        takeaway: "High sensitivity alone does not guarantee high PPV."
      },
      {
        title: "Moderate prevalence follow-up",
        statement: "Prev 5%, Se 92%, Sp 96%.",
        solution: "PPV rises because base rate is larger and false positives are fewer.",
        formula: "P(D\\mid +)=\\frac{0.92\\cdot0.05}{0.92\\cdot0.05+0.04\\cdot0.95}",
        takeaway: "Prevalence shifts posterior strongly."
      },
      {
        title: "Two-stage testing",
        statement: "Apply independent second confirmatory test with same Se/Sp.",
        solution: "Use first posterior as prior, then update again for second + result.",
        formula: "Posterior_2\\propto P(+\\mid D)Posterior_1",
        takeaway: "Sequential updates can rescue low initial PPV."
      },
      {
        title: "Emergency triage with symptoms",
        statement: "Symptom presence raises prior before test; then test result updates again.",
        solution: "Model symptom as first evidence node, then diagnostic test as second evidence node.",
        formula: "P(D\\mid Sym,+)\\propto P(+\\mid D,Sym)P(D\\mid Sym)",
        takeaway: "Context modifies prior; test modifies posterior."
      }
    ],
    quickCheck: [
      {
        id: "e1",
        prompt: "Base rate neglect means",
        options: [
          "Ignoring prevalence while interpreting test result",
          "Ignoring sensitivity",
          "Ignoring specificity",
          "Ignoring sample size"
        ],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "The usual error is dropping prior prevalence."
      },
      {
        id: "e2",
        prompt: "False positive rate equals",
        options: ["1 - specificity", "1 - sensitivity", "specificity", "prevalence"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "FPR = 1 minus specificity."
      }
    ],
    trapQuestion: {
      prompt: "Trap: The test is 99% accurate, so positive means 99% sick.",
      commonMistake: "Confusing test accuracy summary with posterior probability.",
      correction: "Posterior requires prevalence and both error directions."
    },
    linkedLabs: ["lab3"]
  },
  {
    id: "F",
    title: "Continuous Bayes and Parameter Inference",
    oneSentenceIntuition:
      "For continuous parameters, Bayes updates densities: posterior is proportional to prior times likelihood.",
    visualHint: "Prior curve x likelihood shape -> posterior curve.",
    formalDefinition: {
      text: "Continuous Bayes requires density normalization by an integral evidence term.",
      formulas: [
        "f(\\theta\\mid x)=\\frac{f(x\\mid\\theta)f(\\theta)}{f(x)}",
        "f(x)=\\int f(x\\mid\\theta)f(\\theta)d\\theta",
        "f(\\theta\\mid x)\\propto f(x\\mid\\theta)f(\\theta)"
      ]
    },
    derivationSteps: [
      "Multiply prior density by likelihood as a function of theta.",
      "Integrate to obtain evidence and normalize.",
      "Use conjugate pairs to get closed-form posteriors quickly."
    ],
    workedExamples: [
      {
        title: "Gaussian prior + Gaussian likelihood",
        statement: "Theta~N(mu0,sigma0^2), x|theta~N(theta,sigma^2).",
        solution: "Posterior is Gaussian with precision additivity.",
        formula: "\\mu_n=\\frac{\\mu_0/\\sigma_0^2+x/\\sigma^2}{1/\\sigma_0^2+1/\\sigma^2}",
        takeaway: "Posterior mean is shrinkage between prior mean and observation."
      },
      {
        title: "Two observations sequential Gaussian update",
        statement: "Update with x1 then x2.",
        solution: "Apply one-step formula twice; variance tightens after each observation.",
        formula: "p(\\theta\\mid x_1,x_2)\\propto p(x_2\\mid\\theta)p(\\theta\\mid x_1)",
        takeaway: "Sequential and batch updates match."
      },
      {
        title: "Beta prior with Bernoulli likelihood",
        statement: "Beta(alpha,beta) prior, observe one success.",
        solution: "Posterior Beta(alpha+1,beta).",
        formula: "\\text{Beta}(\\alpha,\\beta)+1\\text{ success}\\Rightarrow\\text{Beta}(\\alpha+1,\\beta)",
        takeaway: "Conjugacy gives instant updates."
      },
      {
        title: "Beta prior with Binomial data",
        statement: "k successes in n trials.",
        solution: "Posterior Beta(alpha+k,beta+n-k).",
        formula: "\\text{Beta}(\\alpha+k,\\beta+n-k)",
        takeaway: "Only counts matter for Bernoulli exchangeable model."
      },
      {
        title: "Posterior predictive for Bernoulli",
        statement: "After Beta posterior, find probability next trial is success.",
        solution: "Posterior predictive mean is alpha_n/(alpha_n+beta_n).",
        formula: "P(X_{n+1}=1\\mid data)=\\frac{\\alpha_n}{\\alpha_n+\\beta_n}",
        takeaway: "Predictions come directly from posterior moments."
      },
      {
        title: "A/B conversion inference",
        statement: "Independent Beta-Binomial models for A and B.",
        solution: "Posterior probability A>B estimated via Monte Carlo from posterior draws.",
        formula: "P(\\theta_A>\\theta_B\\mid data)",
        takeaway: "Continuous Bayes supports direct probabilistic comparison."
      }
    ],
    quickCheck: [
      {
        id: "f1",
        prompt: "Continuous Bayes denominator is",
        options: ["An integral evidence term", "A sum over classes", "Always 1", "A derivative"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Need integral over theta for normalization."
      },
      {
        id: "f2",
        prompt: "Beta-Binomial posterior parameters are",
        options: ["alpha+k, beta+n-k", "alpha-k, beta-n", "alpha+n, beta+k", "alpha, beta"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Add observed successes and failures to prior pseudo-counts."
      }
    ],
    trapQuestion: {
      prompt: "Trap: Treating f(theta|x) as a probability at a point.",
      commonMistake: "Confusing density value with probability mass.",
      correction: "Point probability is zero; integrate density over intervals."
    },
    linkedLabs: ["lab5", "lab6"]
  },
  {
    id: "G",
    title: "Bayes Factors and Decision Thresholds",
    oneSentenceIntuition:
      "Bayes factor tells evidence strength; decision rules then add utility or cost.",
    visualHint: "Odds dial multiplied by likelihood ratio.",
    formalDefinition: {
      text: "Odds form separates prior belief from evidence impact.",
      formulas: [
        "\\frac{P(H_1\\mid D)}{P(H_0\\mid D)}=BF_{10}\\cdot\\frac{P(H_1)}{P(H_0)}",
        "\\log odds_{post}=\\log BF_{10}+\\log odds_{prior}"
      ]
    },
    derivationSteps: [
      "Convert prior probability to odds.",
      "Multiply by likelihood ratio (Bayes factor).",
      "Convert posterior odds back to probability for decisions.",
      "Apply expected-loss threshold using asymmetric costs."
    ],
    workedExamples: [
      {
        title: "Medical triage action threshold",
        statement: "Treat if posterior > 0.15 because false negative cost is high.",
        solution: "Posterior from Bayes update crosses threshold and treatment is optimal.",
        formula: "\\text{Choose action minimizing }\\mathbb{E}[\\text{Loss}\\mid data]",
        takeaway: "Decision can differ from most likely class when costs are asymmetric."
      },
      {
        title: "Fraud block vs allow",
        statement: "Blocking legitimate transaction costs 5, missing fraud costs 200.",
        solution: "Block when posterior fraud exceeds 5/(5+200)=0.0244.",
        formula: "Threshold=\\frac{C_{FP}}{C_{FP}+C_{FN}}",
        takeaway: "Low threshold is rational when misses are expensive."
      },
      {
        title: "Manufacturing shutdown decision",
        statement: "False alarm stop cost 10k, missed fault cost 120k.",
        solution: "Shutdown threshold = 10/(10+120)=0.0769.",
        formula: "\\text{Act if }P(Fault\\mid data)>0.0769",
        takeaway: "Posterior-to-action map depends on stakes, not only probabilities."
      }
    ],
    quickCheck: [
      {
        id: "g1",
        prompt: "Bayes factor compares",
        options: ["Evidence likelihood under two hypotheses", "Prior odds", "Posterior odds", "Costs"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "BF is likelihood ratio P(D|H1)/P(D|H0)."
      },
      {
        id: "g2",
        prompt: "With fixed posterior, action still can change if",
        options: ["Costs change", "Priors change", "Data fixed", "Likelihood fixed"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Decision layer is cost-sensitive."
      }
    ],
    trapQuestion: {
      prompt: "Trap: Large BF means always choose H1.",
      commonMistake: "Ignoring extremely small prior odds or decision costs.",
      correction: "Posterior odds and utility both matter."
    },
    linkedLabs: ["lab4"]
  },
  {
    id: "H",
    title: "Naive Bayes Classification, Intuition First",
    oneSentenceIntuition:
      "Naive Bayes assumes conditional independence to turn high-dimensional evidence into simple products.",
    visualHint: "Word contributions add in log space.",
    formalDefinition: {
      text: "Class score is prior times product of feature likelihoods, usually computed in logs.",
      formulas: [
        "P(C\\mid x_1,...,x_n)\\propto P(C)\\prod_i P(x_i\\mid C)",
        "\\log score(C)=\\log P(C)+\\sum_i\\log P(x_i\\mid C)"
      ]
    },
    derivationSteps: [
      "Assume x_i are conditionally independent given class C.",
      "Multiply class-conditional likelihood terms.",
      "Move to log domain to prevent underflow and convert products to sums."
    ],
    workedExamples: [
      {
        title: "Spam vs ham single-word",
        statement: "Word free appears with class-specific frequencies.",
        solution: "Posterior class proportional to prior x word likelihood.",
        formula: "P(Spam\\mid free)\\propto P(free\\mid Spam)P(Spam)",
        takeaway: "Simple features already show Bayes update logic."
      },
      {
        title: "Two-word classification",
        statement: "Words free and urgent under independence.",
        solution: "Multiply both likelihoods per class, normalize.",
        formula: "P(C\\mid w_1,w_2)\\propto P(C)P(w_1\\mid C)P(w_2\\mid C)",
        takeaway: "Independence approximation enables scalability."
      },
      {
        title: "Log-space underflow fix",
        statement: "Many tiny probabilities multiplied become numerically zero.",
        solution: "Use sum of logs and subtract max-log for stable softmax.",
        formula: "\\log p_i' = \\log p_i - \\max_j \\log p_j",
        takeaway: "Log space is mandatory in real models."
      },
      {
        title: "Product review sentiment",
        statement: "Classify positive/negative using token frequencies.",
        solution: "Compute log scores for both classes and choose argmax.",
        formula: "\\hat c=\\arg\\max_c \\left[\\log P(c)+\\sum_i \\log P(w_i\\mid c)\\right]",
        takeaway: "Prediction is class with highest posterior score."
      }
    ],
    quickCheck: [
      {
        id: "h1",
        prompt: "Naive assumption is",
        options: [
          "Features are conditionally independent given class",
          "Classes are equally likely",
          "Features are uncorrelated always",
          "Likelihoods sum to one"
        ],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Independence is conditional on class."
      },
      {
        id: "h2",
        prompt: "Main reason for log-space computation",
        options: ["Avoid underflow", "Speed up network IO", "Reduce bias", "Enforce priors"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Products of many small probabilities underflow."
      }
    ],
    trapQuestion: {
      prompt: "Trap: Independence is exactly true in language data.",
      commonMistake: "Taking a modeling approximation as a literal fact.",
      correction: "It is usually false but still useful for robust baseline classification."
    },
    linkedLabs: ["lab7"]
  },
  {
    id: "I",
    title: "Bayesian Networks (Optional Advanced Track)",
    oneSentenceIntuition:
      "Graph structure encodes conditional independence and enables modular probability models.",
    visualHint: "Directed acyclic graph with local conditional tables.",
    formalDefinition: {
      text: "Joint distribution factorizes over graph parents.",
      formulas: ["P(X_1,...,X_n)=\\prod_i P(X_i\\mid Pa(X_i))"]
    },
    derivationSteps: [
      "Define nodes as random variables.",
      "Attach a conditional table to each node given its parents.",
      "Infer posterior by summing over hidden nodes (enumeration for small nets)."
    ],
    workedExamples: [
      {
        title: "Cloudy-Rain-Sprinkler-WetGrass",
        statement: "Observe wet grass, infer rain probability.",
        solution: "Enumerate hidden variables and normalize.",
        formula: "P(R\\mid W)=\\sum_{c,s}\\frac{P(c,s,R,W)}{P(W)}",
        takeaway: "Structure clarifies dependencies and reusable factors."
      }
    ],
    quickCheck: [
      {
        id: "i1",
        prompt: "In Bayes nets, edges usually represent",
        options: ["Direct probabilistic dependence", "Time order only", "Correlation sign", "Causation certainty"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Edges encode conditional dependence used in factorization."
      }
    ],
    trapQuestion: {
      prompt: "Trap: Removing an edge never changes inference.",
      commonMistake: "Ignoring how graph structure changes independencies.",
      correction: "Edge removal changes factorization and can alter posterior results."
    },
    linkedLabs: ["lab8"]
  },
  {
    id: "J",
    title: "Common Pitfalls and Debugging Checklist",
    oneSentenceIntuition:
      "Most Bayes errors come from event definitions, missing denominators, or invalid assumptions.",
    visualHint: "Checklist before final numeric answer.",
    formalDefinition: {
      text: "Debug Bayes by validating events, assumptions, and normalization.",
      formulas: ["\\sum_i P(A_i\\mid B)=1", "P(B)>0\\text{ before conditioning}"]
    },
    derivationSteps: [
      "Name events explicitly.",
      "Write target posterior and identify numerator and denominator.",
      "Check denominator uses all evidence paths.",
      "Check assumptions (independence, model class, support).",
      "Validate output range and normalization."
    ],
    workedExamples: [
      {
        title: "A|B versus B|A confusion",
        statement: "Student swaps the two terms in medical testing problem.",
        solution: "Rebuild from event definitions and conditioning direction.",
        formula: "P(D\\mid +)\\neq P(+\\mid D)",
        takeaway: "Direction matters more than symbol familiarity."
      }
    ],
    quickCheck: [
      {
        id: "j1",
        prompt: "If posterior values over hypotheses do not sum to 1, likely issue is",
        options: ["Missing denominator normalization", "Too many decimals", "Wrong prior units", "Underflow only"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Normalization error is first suspect."
      },
      {
        id: "j2",
        prompt: "Conditioning on impossible event requires",
        options: ["Different formal treatment", "Set posterior to zero", "Set posterior to prior", "Ignore the event"],
        correctIndex: 0,
        feedbackCorrect: "Correct.",
        feedbackIncorrect: "Elementary formula divides by P(B), so P(B)=0 needs care."
      }
    ],
    trapQuestion: {
      prompt: "Trap: I can mix PMF and PDF directly in one formula.",
      commonMistake: "Combining discrete and continuous objects without consistent measure.",
      correction: "Use coherent discrete or continuous framework, with correct normalization units."
    },
    linkedLabs: ["lab1", "lab3", "lab4", "lab5", "lab6", "lab8"],
    debuggingChecklist: [
      "Define target event and evidence event clearly.",
      "Write Bayes template before plugging numbers.",
      "Compute denominator using total probability over all hypotheses.",
      "Check independence assumptions explicitly.",
      "Verify support: no conditioning on impossible evidence.",
      "For continuous models, distinguish density from probability.",
      "Confirm posteriors sum or integrate to one.",
      "Run a simulation sanity check when possible."
    ]
  }
];

export const moduleOrder = tutorialModules.map((module) => module.id);

export function getModuleById(moduleId) {
  return tutorialModules.find((module) => module.id === moduleId);
}

