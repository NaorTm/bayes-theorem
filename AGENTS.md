# AGENTS.md , Authoritative Specification for â€œBayesâ€™ Theoremâ€ Tutorial Website

## 0) Purpose, Audience, Outcomes

### 0.1 Goal
Build an educational website that teaches Bayesâ€™ theorem in a deep, intuitive, and mathematically correct way, using:
â€¢ Visual reasoning (area diagrams, trees, flows, matrices)  
â€¢ Step by step derivations  
â€¢ Many worked examples across domains  
â€¢ Interactive labs with sliders and simulations  
â€¢ Practice sets with hints and full solutions  

### 0.2 Target Audience
â€¢ Students in probability, statistics, engineering  
â€¢ Learners who know basic probability but struggle with conditional probability and base rates  
â€¢ Advanced learners who want Bayesian updating and continuous cases  

### 0.3 Learning Outcomes
By the end, the learner can:
1. Translate word problems into events and conditional probabilities
2. Derive Bayesâ€™ theorem from definitions
3. Use the law of total probability to compute the normalizing constant
4. Compute posteriors in discrete and continuous settings
5. Interpret Bayes as belief updating, prior to posterior
6. Visualize Bayes using multiple complementary diagrams
7. Avoid common pitfalls, especially base rate neglect
8. Recognize Bayes factors and odds form as practical computation tools
9. Apply Bayes to real scenarios, tests, classification, inference, sensor fusion

---

## 1) Pedagogical Design Principles

### 1.1 Core teaching loop for every concept
For each concept page:
1. Intuition first, one picture, one sentence
2. Formal definition
3. Derivation or proof sketch
4. Worked example, fully solved
5. Interactive visualization that matches the example
6. Quick check quiz, immediate feedback
7. One â€œtrapâ€ question exposing a common mistake

### 1.2 Multiple mental models, mandatory
Bayes must be taught through at least four equivalent lenses:
â€¢ Area model, unit square probability geometry  
â€¢ Tree model, two stage branching  
â€¢ Confusion matrix model, 2Ã—2 table  
â€¢ Odds model, likelihood ratios and log odds  

Learners can switch lenses, the content stays consistent.

---

## 2) Site Structure, Pages, Navigation

### 2.1 Global layout
â€¢ Top navigation: Home, Tutorial, Visual Labs, Example Library, Practice, Glossary, References  
â€¢ Tutorial pages include a left side module list with progress indicators  
â€¢ Math rendering with KaTeX or MathJax  
â€¢ Every page supports light and dark mode

### 2.2 Pages
1. Home
   â€¢ One paragraph summary
   â€¢ Buttons: Start Tutorial, Open Visual Labs, Explore Examples
2. Tutorial, multi module
3. Visual Labs, interactive playgrounds
4. Example Library, searchable and filterable
5. Practice, graded levels
6. Glossary
7. References

---

## 3) Mathematical Content, Required Coverage

### 3.1 Prerequisites module must be included
The site must teach, or quickly refresh:
â€¢ Events, sample space, probability axioms  
â€¢ Joint probability, marginal probability  
â€¢ Conditional probability  
\[
P(A \mid B)=\frac{P(A\cap B)}{P(B)}
\]
â€¢ Independence and why it matters  
â€¢ Law of total probability, discrete partition form  
If \{B_i\} partitions the space, then:
\[
P(A)=\sum_i P(A\mid B_i)P(B_i)
\]

### 3.2 Bayesâ€™ theorem, discrete
Derive Bayes from definitions:
\[
P(A\mid B)=\frac{P(B\mid A)P(A)}{P(B)}
\]
and with total probability:
\[
P(B)=\sum_i P(B\mid A_i)P(A_i)
\]
so:
\[
P(A_k\mid B)=\frac{P(B\mid A_k)P(A_k)}{\sum_i P(B\mid A_i)P(A_i)}
\]

### 3.3 Bayesâ€™ theorem, continuous densities
Define conditional density and state Bayes:
\[
f_{\Theta\mid X}(\theta\mid x)=\frac{f_{X\mid \Theta}(x\mid \theta)\,f_\Theta(\theta)}{f_X(x)}
\]
where
\[
f_X(x)=\int f_{X\mid \Theta}(x\mid \theta)\,f_\Theta(\theta)\,d\theta
\]

### 3.4 Bayesian updating language, mandatory
Teach Bayes as:
Posterior âˆ Likelihood Ã— Prior
\[
f(\theta\mid x)\propto f(x\mid \theta)f(\theta)
\]
Emphasize the normalizing constant as â€œevidenceâ€.

### 3.5 Odds form, mandatory
Teach the odds update:
\[
\frac{P(H_1\mid D)}{P(H_0\mid D)}=\frac{P(D\mid H_1)}{P(D\mid H_0)}\cdot \frac{P(H_1)}{P(H_0)}
\]
Teach log odds:
\[
\log \text{odds posterior}=\log \text{likelihood ratio}+\log \text{odds prior}
\]
Use the Unicode minus sign â€œâˆ’â€ if subtraction appears in examples.

---

## 4) Tutorial Modules, Required Content

### Module A , Conditional Probability That Actually Sticks
A1. Intuition with area diagram  
A2. Definitions and algebra  
A3. Three worked examples  
A4. Quick check quiz, 6 questions

### Module B , Deriving Bayes From One Line
B1. Start from \(P(A\cap B)\) two ways  
B2. Show Bayes in one slide, then unpack each term  
B3. Worked example where \(P(B)\) is not given directly, use total probability  
B4. â€œSpot the denominatorâ€ drill

### Module C , The Normalizing Constant and Total Probability
C1. Partition idea and why it matters  
C2. Evidence term as weighted average of likelihood  
C3. At least 5 examples that fail unless you compute \(P(B)\) correctly

### Module D , Visualizations That Match the Math
D1. Unit square area model  
D2. Tree diagram model  
D3. Confusion matrix model  
D4. Sankey flow model  
D5. Each visualization must be linked to the same numeric example, with a toggle

### Module E , Base Rates and Why Humans Get It Wrong
E1. Base rate neglect, show the typical mistake  
E2. Fix it with confusion matrix and counts per 10,000 people  
E3. Sensitivity, specificity, prevalence, false positives  
E4. At least 4 medical style examples, increasing difficulty

### Module F , Continuous Bayes and Parameter Inference
F1. Densities, not probabilities  
F2. Gaussian prior and Gaussian likelihood, posterior is Gaussian, show formulas and intuition  
F3. Beta prior with Bernoulli or Binomial likelihood, posterior is Beta  
F4. At least 6 worked examples, include one with two observations

### Module G , Bayes Factors and Decision Thresholds
G1. Likelihood ratio as evidence strength  
G2. Bayes factor interpretation  
G3. Decision rules, choose action based on posterior and costs  
G4. At least 3 examples with asymmetric costs

### Module H , Naive Bayes Classification, Intuition First
H1. Why independence is an approximation  
H2. Text toy example with word counts  
H3. Show log space computation to avoid underflow  
H4. At least 4 classification examples

### Module I , Bayesian Networks, Optional Advanced Track
I1. Graphical model basics, nodes are random variables  
I2. Conditional independence from graph structure  
I3. Simple inference via enumeration for small networks  
I4. One interactive Bayes net toy with 4 to 6 nodes

### Module J , Common Pitfalls, Debugging Checklist
J1. Confusing \(P(A\mid B)\) with \(P(B\mid A)\)  
J2. Forgetting the denominator  
J3. Using independence when it is false  
J4. Conditioning on impossible events  
J5. Mixing discrete and continuous incorrectly  
Provide a â€œBayes debugging checklistâ€ that users can apply to any problem.

---

## 5) Visual Labs, Interactive Components

### 5.1 Lab 1 , Area Diagram, Unit Square
Inputs:
â€¢ \(P(A)\), \(P(B\mid A)\), \(P(B\mid A^c)\)
Outputs:
â€¢ Colored rectangle areas for \(A\cap B\), \(A^c\cap B\), etc
â€¢ Computed \(P(B)\) and \(P(A\mid B)\)
â€¢ Toggle between probabilities and counts per N, default N=10,000

### 5.2 Lab 2 , Tree Diagram Builder
Stage 1, choose hypothesis or class  
Stage 2, generate evidence  
Auto compute:
â€¢ Joint probabilities along leaves  
â€¢ Posterior from leaf totals  
Show both the tree and the matching formula

### 5.3 Lab 3 , Confusion Matrix Playground
Inputs:
â€¢ Prevalence  
â€¢ Sensitivity  
â€¢ Specificity  
Outputs:
â€¢ 2Ã—2 table with counts  
â€¢ False positive rate and false negative rate  
â€¢ Posterior \(P(\text{disease}\mid +)\) and \(P(\text{disease}\mid âˆ’)\)

### 5.4 Lab 4 , Odds and Bayes Factor
Inputs:
â€¢ Prior odds  
â€¢ Likelihood ratio  
Outputs:
â€¢ Posterior odds  
â€¢ Log odds update  
â€¢ Interpretation scale, weak, moderate, strong evidence

### 5.5 Lab 5 , Beta Binomial Updater
Inputs:
â€¢ Prior Beta(\(\alpha,\beta\)) sliders  
â€¢ Observations, number of successes k out of n  
Outputs:
â€¢ Posterior Beta(\(\alpha+k,\beta+nâˆ’k\))  
â€¢ Plot prior vs posterior density  
â€¢ Posterior mean and credible interval  
Include simulation of coin flips to validate convergence.

### 5.6 Lab 6 , Gaussian Gaussian Updater
Assume:
â€¢ Prior \(\Theta\sim \mathcal{N}(\mu_0,\sigma_0^2)\)  
â€¢ Likelihood \(X\mid \Theta=\theta \sim \mathcal{N}(\theta,\sigma^2)\)  
Inputs:
â€¢ \(\mu_0\), \(\sigma_0\), \(\sigma\), observed x  
Outputs:
â€¢ Posterior mean and variance  
â€¢ Plot prior, likelihood shape, posterior  
Explain shrinkage toward prior mean.

### 5.7 Lab 7 , Naive Bayes Toy Text Classifier
Small vocabulary, user can type a sentence.  
The lab shows:
â€¢ Word likelihoods per class  
â€¢ Log likelihood sum  
â€¢ Posterior scores and predicted class  

### 5.8 Lab 8 , Bayes Net Playground
User can set conditional tables and observe posterior changes.  
Keep network small to ensure exact inference is fast.

---

## 6) Example Library, Many Worked Examples

### 6.1 Requirements
Provide at least 30 examples total. Each example must include:
â€¢ Problem statement  
â€¢ Definitions of events or variables  
â€¢ Bayes computation with explicit denominator  
â€¢ A visualization that matches the computation, at least one of: area, tree, matrix, odds  
â€¢ Optional Monte Carlo simulation check  
â€¢ One sentence takeaway

### 6.2 Required example set, minimum 18 fully written in content
Example 1 , Medical test, classic base rate  
Given prevalence p, sensitivity s, specificity c  
Compute \(P(D\mid +)\) and interpret.

Example 2 , Two independent tests  
Same disease, two tests results, update sequentially using posterior as new prior.

Example 3 , Quality control  
Defect rate, test accuracy, probability item is defective given test positive.

Example 4 , Courtroom evidence  
Rare match, false match rate, compute posterior under two hypotheses.

Example 5 , Spam filtering, discrete toy  
Two classes, spam and ham, given word presence probabilities.

Example 6 , Naive Bayes with log space  
Show how multiplying many probabilities underflows, use logs.

Example 7 , Urn selection  
Choose one of two urns, then draw colored ball, infer which urn.

Example 8 , Box with coins  
Pick a coin type then observe flips, compute posterior for coin type.

Example 9 , Monty Hall as Bayes  
Formalize host behavior as likelihood.

Example 10 , Sensor fusion, discrete states  
Two sensors with known error model, posterior over state.

Example 11 , Reliability, two failure modes  
Failure observed, infer which mode is more likely.

Example 12 , Communication, bit detection  
Channel flips bits with known probabilities, infer sent bit given received bit.

Example 13 , Continuous measurement, Gaussian noise  
Prior on true value, measurement noise, posterior.

Example 14 , Two measurements, sequential update  
Observe x1 then x2, show posterior tightening.

Example 15 , Beta Bernoulli, coin bias inference  
Start with Beta prior, observe flips, compute posterior.

Example 16 , A or B testing, Beta Binomial  
Posterior distribution over conversion rates, probability A is better than B.

Example 17 , Mixture classification, Gaussian mixture  
Given x, compute posterior class probability.

Example 18 , Cost sensitive decision  
Posterior plus asymmetric loss, pick optimal action.

### 6.3 Additional examples, at least 12 more
Add examples across:
â€¢ Medical, engineering, security, finance, everyday reasoning  
â€¢ Both discrete and continuous cases  
â€¢ At least 3 examples where the denominator must be computed via total probability over 3 or more hypotheses

Total examples required: at least 30.

---

## 7) Practice Section

### 7.1 Levels and counts
â€¢ Level 1, direct Bayes with two hypotheses, 12 problems  
â€¢ Level 2, multi hypothesis and total probability, 14 problems  
â€¢ Level 3, base rate heavy and confusion matrix, 14 problems  
â€¢ Level 4, continuous Bayes, densities, 12 problems  
â€¢ Level 5, Bayesian updating sequences, 10 problems  

### 7.2 For each practice problem
Must include:
â€¢ Hint 1, define events and what you want  
â€¢ Hint 2, write Bayes formula template with missing pieces  
â€¢ Hint 3, compute the denominator using total probability  
â€¢ Full solution with steps  
â€¢ Optional simulation check

---

## 8) Glossary Requirements
Include clear definitions with examples:
â€¢ Prior, likelihood, evidence, posterior  
â€¢ Sensitivity, specificity, false positive rate, false negative rate  
â€¢ Odds, likelihood ratio, Bayes factor  
â€¢ Conditional independence  
â€¢ Conjugate prior  
Optional advanced toggle:
â€¢ Sigma algebra view, conditioning as information

---

## 9) Technical Implementation Requirements

### 9.1 Frontend stack
â€¢ React or Next.js  
â€¢ KaTeX or MathJax  
â€¢ Visualization library: D3 or Plotly  
â€¢ Clean, minimal design, strong readability

### 9.2 Data model for examples
Store each example as JSON:
â€¢ id, title, difficulty, tags  
â€¢ problemMarkdown  
â€¢ variables, definitions  
â€¢ solutionSteps, array of step objects {title, explanationMarkdown, mathLatex}  
â€¢ visuals, list of widgets to render with parameters  
â€¢ simulationSpec, seeded RNG, sampling function  
â€¢ finalAnswer, both numeric and symbolic

### 9.3 Seeded reproducibility
Every simulation must be seedable to show identical demo results.

### 9.4 Performance
Visual labs must run smoothly on typical laptops and mobile devices.

### 9.5 Accessibility
â€¢ Keyboard navigation for all interactive controls  
â€¢ Alt text, ARIA labels  
â€¢ Avoid color only explanations, include labels and counts

---

## 10) Acceptance Criteria
A build is accepted when:
1. All modules A to J exist and are fully populated
2. Visual Labs 1 to 8 are implemented and integrated into tutorial pages
3. Example Library contains at least 30 examples, with at least 18 fully written in rich step by step format
4. Practice section includes required problem counts, hints, and full solutions
5. Every major concept is shown through at least two visualization lenses
6. Math renders correctly, no broken formulas, no missing diagrams
7. Simulations match theoretical results within sampling error
8. Navigation, search, filtering, and progress tracking work correctly

