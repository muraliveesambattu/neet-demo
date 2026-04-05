export const chemistryQuestions = [
  // ─── ATOMIC STRUCTURE ────────────────────────────────────────────────────
  {
    subject: "CHEMISTRY" as const,
    chapter: "Atomic Structure",
    concept: "Quantum numbers",
    year: 2016,
    difficulty: "MEDIUM" as const,
    questionText:
      "Which set of quantum numbers is NOT possible for an electron?",
    optionA: "n=2, l=1, ml=0, ms=+½",
    optionB: "n=3, l=2, ml=−2, ms=−½",
    optionC: "n=2, l=2, ml=1, ms=+½",
    optionD: "n=4, l=0, ml=0, ms=−½",
    correctOption: "C" as const,
    explanation:
      "For n=2, l can be 0 or 1 only (l < n). l=2 is not allowed when n=2.",
    tags: ["atomic structure", "quantum numbers", "orbitals"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Atomic Structure",
    concept: "Electronic configuration",
    year: 2019,
    difficulty: "EASY" as const,
    questionText:
      "The electronic configuration of Fe²⁺ ion (atomic number of Fe = 26) is:",
    optionA: "[Ar] 3d⁶",
    optionB: "[Ar] 3d⁵ 4s¹",
    optionC: "[Ar] 3d⁴ 4s²",
    optionD: "[Ar] 3d⁶ 4s²",
    correctOption: "A" as const,
    explanation:
      "Fe: [Ar] 3d⁶ 4s². Fe²⁺ loses the 4s² electrons first → [Ar] 3d⁶.",
    tags: ["atomic structure", "electronic configuration", "transition metals"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Atomic Structure",
    concept: "Heisenberg's uncertainty principle",
    year: 2021,
    difficulty: "MEDIUM" as const,
    questionText:
      "Heisenberg's uncertainty principle states that it is impossible to simultaneously determine with precision:",
    optionA: "Mass and velocity",
    optionB: "Position and momentum",
    optionC: "Charge and mass",
    optionD: "Energy and charge",
    correctOption: "B" as const,
    explanation:
      "Heisenberg's principle: Δx · Δp ≥ h/4π. The more precisely position is determined, the less precisely momentum can be known, and vice versa.",
    tags: ["atomic structure", "Heisenberg", "uncertainty principle"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Atomic Structure",
    concept: "Bohr's model – energy levels",
    year: 2017,
    difficulty: "HARD" as const,
    questionText:
      "The energy of an electron in the nth orbit of a hydrogen atom is En = −13.6/n² eV. The energy required to excite an electron from n=2 to n=4 is:",
    optionA: "2.55 eV",
    optionB: "10.2 eV",
    optionC: "3.4 eV",
    optionD: "0.85 eV",
    correctOption: "A" as const,
    explanation:
      "ΔE = E4 − E2 = −13.6/16 − (−13.6/4) = −0.85 + 3.4 = 2.55 eV.",
    tags: ["atomic structure", "Bohr model", "energy levels", "hydrogen"],
  },

  // ─── CHEMICAL BONDING ────────────────────────────────────────────────────
  {
    subject: "CHEMISTRY" as const,
    chapter: "Chemical Bonding",
    concept: "VSEPR theory",
    year: 2018,
    difficulty: "EASY" as const,
    questionText:
      "The shape of a water molecule (H₂O) according to VSEPR theory is:",
    optionA: "Linear",
    optionB: "Trigonal planar",
    optionC: "Bent (V-shaped)",
    optionD: "Tetrahedral",
    correctOption: "C" as const,
    explanation:
      "H₂O has 2 bond pairs and 2 lone pairs around oxygen. VSEPR predicts bent/V-shape with bond angle ~104.5°.",
    tags: ["chemical bonding", "VSEPR", "molecular geometry"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Chemical Bonding",
    concept: "Hybridization",
    year: 2022,
    difficulty: "MEDIUM" as const,
    questionText:
      "The hybridization of carbon in ethyne (C₂H₂) is:",
    optionA: "sp³",
    optionB: "sp²",
    optionC: "sp",
    optionD: "sp³d",
    correctOption: "C" as const,
    explanation:
      "In ethyne (acetylene), each carbon forms a triple bond: one sigma and two pi bonds. Carbon is sp hybridized with bond angle 180° (linear).",
    tags: ["chemical bonding", "hybridization", "ethyne", "sp"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Chemical Bonding",
    concept: "Hydrogen bonding",
    year: 2020,
    difficulty: "EASY" as const,
    questionText:
      "Which of the following shows intramolecular hydrogen bonding?",
    optionA: "o-Nitrophenol",
    optionB: "p-Nitrophenol",
    optionC: "Water",
    optionD: "HF",
    correctOption: "A" as const,
    explanation:
      "o-Nitrophenol forms intramolecular hydrogen bonding between the –OH group and the –NO₂ group within the same molecule, due to their proximity in the ortho position.",
    tags: ["chemical bonding", "hydrogen bonding", "intramolecular", "phenol"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Chemical Bonding",
    concept: "Bond order",
    year: null,
    difficulty: "MEDIUM" as const,
    questionText:
      "The bond order of O₂ molecule according to Molecular Orbital Theory is:",
    optionA: "1",
    optionB: "2",
    optionC: "3",
    optionD: "1.5",
    correctOption: "B" as const,
    explanation:
      "O₂ has 16 electrons. MO configuration gives bond order = (bonding − antibonding)/2 = (8−4)/2 = 2. O₂ is also paramagnetic (2 unpaired electrons).",
    tags: ["chemical bonding", "MOT", "bond order", "O2"],
  },

  // ─── EQUILIBRIUM ─────────────────────────────────────────────────────────
  {
    subject: "CHEMISTRY" as const,
    chapter: "Equilibrium",
    concept: "Le Chatelier's principle",
    year: 2019,
    difficulty: "MEDIUM" as const,
    questionText:
      "For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + heat, increasing pressure will:",
    optionA: "Shift equilibrium to the left",
    optionB: "Shift equilibrium to the right",
    optionC: "Have no effect",
    optionD: "Decrease the rate of forward reaction",
    correctOption: "B" as const,
    explanation:
      "Increasing pressure favours the side with fewer moles of gas. Left side: 1+3=4 moles; right: 2 moles. Equilibrium shifts right (towards NH₃).",
    tags: ["equilibrium", "Le Chatelier", "Haber process"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Equilibrium",
    concept: "pH calculation",
    year: 2021,
    difficulty: "EASY" as const,
    questionText:
      "The pH of a 0.001 M HCl solution is:",
    optionA: "3",
    optionB: "11",
    optionC: "1",
    optionD: "7",
    correctOption: "A" as const,
    explanation:
      "HCl is a strong acid, fully dissociated. [H⁺] = 0.001 M = 10⁻³ M. pH = −log[H⁺] = −log(10⁻³) = 3.",
    tags: ["equilibrium", "pH", "strong acid"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Equilibrium",
    concept: "Buffer solution",
    year: 2023,
    difficulty: "MEDIUM" as const,
    questionText:
      "A buffer solution is formed by mixing:",
    optionA: "Strong acid and strong base in equal moles",
    optionB: "Weak acid and its conjugate base (salt)",
    optionC: "Strong acid and weak base",
    optionD: "Two strong acids",
    correctOption: "B" as const,
    explanation:
      "A buffer consists of a weak acid and its conjugate base (e.g., CH₃COOH + CH₃COONa) or a weak base and its conjugate acid, which resists pH changes.",
    tags: ["equilibrium", "buffer", "Henderson-Hasselbalch"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Equilibrium",
    concept: "Kp and Kc relation",
    year: 2016,
    difficulty: "HARD" as const,
    questionText:
      "For the reaction N₂O₄(g) ⇌ 2NO₂(g), the relation between Kp and Kc is:",
    optionA: "Kp = Kc(RT)",
    optionB: "Kp = Kc(RT)²",
    optionC: "Kp = Kc/(RT)",
    optionD: "Kp = Kc",
    correctOption: "A" as const,
    explanation:
      "Kp = Kc(RT)^Δn. Here Δn = 2−1 = 1, so Kp = Kc(RT)¹ = Kc·RT.",
    tags: ["equilibrium", "Kp", "Kc", "Δn"],
  },

  // ─── ELECTROCHEMISTRY ────────────────────────────────────────────────────
  {
    subject: "CHEMISTRY" as const,
    chapter: "Electrochemistry",
    concept: "Nernst equation",
    year: 2020,
    difficulty: "HARD" as const,
    questionText:
      "The standard electrode potential of Zn²⁺/Zn is −0.76 V and Cu²⁺/Cu is +0.34 V. The EMF of the Daniell cell at standard conditions is:",
    optionA: "0.42 V",
    optionB: "1.10 V",
    optionC: "0.76 V",
    optionD: "0.34 V",
    correctOption: "B" as const,
    explanation:
      "E°cell = E°cathode − E°anode = +0.34 − (−0.76) = 1.10 V. (Cu is cathode, Zn is anode).",
    tags: ["electrochemistry", "Daniell cell", "standard EMF"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Electrochemistry",
    concept: "Faraday's laws of electrolysis",
    year: 2018,
    difficulty: "MEDIUM" as const,
    questionText:
      "The mass of silver deposited when 2 A of current is passed through AgNO₃ solution for 965 s (Faraday = 96500 C/mol, M of Ag = 108 g/mol) is:",
    optionA: "2.16 g",
    optionB: "21.6 g",
    optionC: "1.08 g",
    optionD: "10.8 g",
    correctOption: "A" as const,
    explanation:
      "Q = I×t = 2×965 = 1930 C. Moles of Ag = Q/(F×n) = 1930/(96500×1) = 0.02 mol. Mass = 0.02×108 = 2.16 g.",
    tags: ["electrochemistry", "electrolysis", "Faraday's law"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Electrochemistry",
    concept: "Conductance",
    year: 2022,
    difficulty: "MEDIUM" as const,
    questionText:
      "Molar conductance of an electrolytic solution increases with dilution because:",
    optionA: "Number of ions per unit volume increases",
    optionB: "Degree of dissociation increases",
    optionC: "Viscosity increases",
    optionD: "Temperature decreases",
    correctOption: "B" as const,
    explanation:
      "For weak electrolytes, dilution increases degree of dissociation, producing more ions and increasing molar conductance. For strong electrolytes, interionic attractions decrease with dilution.",
    tags: ["electrochemistry", "molar conductance", "dilution"],
  },

  // ─── ORGANIC CHEMISTRY: BASIC PRINCIPLES ─────────────────────────────────
  {
    subject: "CHEMISTRY" as const,
    chapter: "Organic Chemistry: Basic Principles",
    concept: "Inductive effect",
    year: 2017,
    difficulty: "MEDIUM" as const,
    questionText:
      "Which of the following groups shows a positive inductive (+I) effect?",
    optionA: "–NO₂",
    optionB: "–COOH",
    optionC: "–C(CH₃)₃",
    optionD: "–Cl",
    correctOption: "C" as const,
    explanation:
      "Alkyl groups (like tert-butyl) are electron-donating due to the +I effect. –NO₂, –COOH, and –Cl are electron-withdrawing (−I effect).",
    tags: ["organic chemistry", "inductive effect", "electronic effects"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Organic Chemistry: Basic Principles",
    concept: "Isomerism",
    year: 2019,
    difficulty: "EASY" as const,
    questionText:
      "2-butanol and 1-butanol are examples of:",
    optionA: "Geometrical isomers",
    optionB: "Position isomers",
    optionC: "Chain isomers",
    optionD: "Functional group isomers",
    correctOption: "B" as const,
    explanation:
      "They have the same molecular formula (C₄H₁₀O) and same functional group (–OH) but differ in position of –OH group → position isomers.",
    tags: ["organic chemistry", "isomerism", "positional isomers"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Organic Chemistry: Basic Principles",
    concept: "Reaction intermediates",
    year: null,
    difficulty: "MEDIUM" as const,
    questionText:
      "Which of the following is the most stable carbocation?",
    optionA: "CH₃⁺",
    optionB: "(CH₃)₂CH⁺",
    optionC: "(CH₃)₃C⁺",
    optionD: "CH₃CH₂⁺",
    correctOption: "C" as const,
    explanation:
      "Tertiary carbocations are most stable due to the +I effect of three alkyl groups and hyperconjugation. Stability: 3° > 2° > 1° > methyl.",
    tags: ["organic chemistry", "carbocation", "stability"],
  },

  // ─── HYDROCARBONS ─────────────────────────────────────────────────────────
  {
    subject: "CHEMISTRY" as const,
    chapter: "Hydrocarbons",
    concept: "Markovnikov's rule",
    year: 2018,
    difficulty: "MEDIUM" as const,
    questionText:
      "When HBr is added to propene (CH₃–CH=CH₂) following Markovnikov's rule, the major product is:",
    optionA: "1-Bromopropane",
    optionB: "2-Bromopropane",
    optionC: "1,2-Dibromopropane",
    optionD: "Propane",
    correctOption: "B" as const,
    explanation:
      "Markovnikov's rule: H adds to carbon with more H atoms (C1), Br adds to C2 (less H). Major product: CH₃CHBrCH₃ = 2-bromopropane.",
    tags: ["hydrocarbons", "Markovnikov's rule", "HBr addition", "alkenes"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Hydrocarbons",
    concept: "Aromaticity",
    year: 2020,
    difficulty: "MEDIUM" as const,
    questionText:
      "Which of the following is NOT aromatic according to Hückel's rule (4n+2 π electrons)?",
    optionA: "Benzene (6π)",
    optionB: "Naphthalene (10π)",
    optionC: "Cyclobutadiene (4π)",
    optionD: "Azulene (10π)",
    correctOption: "C" as const,
    explanation:
      "Cyclobutadiene has 4 π electrons (4n where n=1), which is antiaromatic by Hückel's rule. Benzene (n=1), naphthalene, and azulene satisfy 4n+2.",
    tags: ["hydrocarbons", "aromaticity", "Hückel's rule"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Hydrocarbons",
    concept: "Electrophilic aromatic substitution",
    year: 2023,
    difficulty: "MEDIUM" as const,
    questionText:
      "In the nitration of benzene, the electrophile that attacks the ring is:",
    optionA: "NO₂⁻",
    optionB: "NO₂⁺ (nitronium ion)",
    optionC: "HNO₃",
    optionD: "NO₃⁻",
    correctOption: "B" as const,
    explanation:
      "Nitronium ion (NO₂⁺) is the electrophile in nitration, formed by: HNO₃ + H₂SO₄ → NO₂⁺ + HSO₄⁻ + H₂O.",
    tags: ["hydrocarbons", "EAS", "nitration", "electrophile"],
  },

  // ─── ALCOHOLS PHENOLS ETHERS ──────────────────────────────────────────────
  {
    subject: "CHEMISTRY" as const,
    chapter: "Alcohols Phenols Ethers",
    concept: "Acidity of phenol",
    year: 2021,
    difficulty: "MEDIUM" as const,
    questionText:
      "Phenol is more acidic than ethanol because:",
    optionA: "The C–O bond is longer in phenol",
    optionB: "Phenoxide ion is stabilized by resonance with benzene ring",
    optionC: "Phenol has higher molecular weight",
    optionD: "Ethanol has more hydrogen bonds",
    correctOption: "B" as const,
    explanation:
      "After losing a proton, phenoxide ion is stabilized by delocalization of negative charge into the benzene ring through resonance. This makes phenol a better acid (pKa ≈ 10) compared to ethanol (pKa ≈ 16).",
    tags: ["alcohols phenols ethers", "acidity", "phenol", "resonance"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Alcohols Phenols Ethers",
    concept: "Lucas test",
    year: null,
    difficulty: "EASY" as const,
    questionText:
      "In Lucas test, a tertiary alcohol reacts with Lucas reagent (HCl/ZnCl₂) to give turbidity:",
    optionA: "Only upon heating",
    optionB: "After 5 minutes",
    optionC: "Immediately",
    optionD: "No turbidity",
    correctOption: "C" as const,
    explanation:
      "Tertiary alcohols react immediately with Lucas reagent at room temperature, giving an immediate turbidity (insoluble alkyl chloride). Secondary alcohols take 5 min, primary alcohols require heating.",
    tags: ["alcohols phenols ethers", "Lucas test", "classification of alcohols"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Alcohols Phenols Ethers",
    concept: "Williamson synthesis",
    year: 2016,
    difficulty: "MEDIUM" as const,
    questionText:
      "Williamson synthesis involves reaction of an alkyl halide with:",
    optionA: "Alcohol",
    optionB: "Sodium alkoxide",
    optionC: "Grignard reagent",
    optionD: "Sodium hydroxide",
    correctOption: "B" as const,
    explanation:
      "Williamson ether synthesis: R–X + R'–O⁻Na⁺ → R–O–R' + NaX. The alkyl halide undergoes SN2 reaction with sodium alkoxide.",
    tags: ["alcohols phenols ethers", "Williamson synthesis", "ether preparation"],
  },

  // ─── ALDEHYDES AND KETONES ────────────────────────────────────────────────
  {
    subject: "CHEMISTRY" as const,
    chapter: "Aldehydes Ketones",
    concept: "Nucleophilic addition",
    year: 2019,
    difficulty: "MEDIUM" as const,
    questionText:
      "Aldehydes are more reactive than ketones towards nucleophilic addition because:",
    optionA: "Aldehydes have higher molecular weight",
    optionB: "The carbonyl carbon in aldehydes is less sterically hindered and more electrophilic",
    optionC: "Ketones are more polar",
    optionD: "Aldehydes have stronger C=O bonds",
    correctOption: "B" as const,
    explanation:
      "In aldehydes, the carbonyl C is bonded to H (small), reducing steric hindrance. Alkyl groups in ketones are electron-donating (+I), decreasing electrophilicity. Both effects make aldehydes more reactive.",
    tags: ["aldehydes ketones", "nucleophilic addition", "reactivity"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Aldehydes Ketones",
    concept: "Tollens' test",
    year: 2017,
    difficulty: "EASY" as const,
    questionText:
      "Tollens' reagent (ammoniacal silver nitrate) gives a silver mirror test positive for:",
    optionA: "Ketones only",
    optionB: "Aldehydes only",
    optionC: "Both aldehydes and ketones",
    optionD: "Neither aldehydes nor ketones",
    correctOption: "B" as const,
    explanation:
      "Tollens' test distinguishes aldehydes from ketones. Aldehydes reduce Ag⁺ to Ag (silver mirror). Ketones do not react.",
    tags: ["aldehydes ketones", "Tollens' test", "reducing agents"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Aldehydes Ketones",
    concept: "Aldol condensation",
    year: 2022,
    difficulty: "HARD" as const,
    questionText:
      "The aldol condensation of acetaldehyde (CH₃CHO) in dilute NaOH produces:",
    optionA: "Ethanol",
    optionB: "3-Hydroxybutanal",
    optionC: "Acetic acid",
    optionD: "Crotonaldehyde directly",
    correctOption: "B" as const,
    explanation:
      "Aldol condensation of CH₃CHO gives 3-hydroxybutanal (aldol product: CH₃CH(OH)CH₂CHO). Subsequent dehydration gives crotonaldehyde.",
    tags: ["aldehydes ketones", "aldol condensation", "base catalysis"],
  },

  // ─── AMINES ───────────────────────────────────────────────────────────────
  {
    subject: "CHEMISTRY" as const,
    chapter: "Amines",
    concept: "Basicity of amines",
    year: 2020,
    difficulty: "MEDIUM" as const,
    questionText:
      "In aqueous solution, the correct order of basicity of methylamine, dimethylamine, and trimethylamine is:",
    optionA: "CH₃NH₂ > (CH₃)₂NH > (CH₃)₃N",
    optionB: "(CH₃)₂NH > CH₃NH₂ > (CH₃)₃N",
    optionC: "(CH₃)₃N > (CH₃)₂NH > CH₃NH₂",
    optionD: "All equal",
    correctOption: "B" as const,
    explanation:
      "In aqueous solution, basicity order is: (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃, because solvation effects reduce basicity of trimethylamine despite higher +I effect.",
    tags: ["amines", "basicity", "order of basicity"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Amines",
    concept: "Diazonium salts",
    year: 2024,
    difficulty: "HARD" as const,
    questionText:
      "Benzene diazonium chloride on reaction with phenol in alkaline medium gives:",
    optionA: "Chlorobenzene",
    optionB: "Aniline",
    optionC: "p-Hydroxyazobenzene (orange dye)",
    optionD: "Benzene",
    correctOption: "C" as const,
    explanation:
      "The coupling reaction of benzene diazonium chloride with phenol (in alkaline medium) gives p-hydroxyazobenzene, an azo dye. This is an electrophilic aromatic substitution.",
    tags: ["amines", "diazonium salts", "coupling reaction", "azo dye"],
  },

  // ─── COORDINATION COMPOUNDS ───────────────────────────────────────────────
  {
    subject: "CHEMISTRY" as const,
    chapter: "Coordination Compounds",
    concept: "Werner's theory",
    year: 2018,
    difficulty: "MEDIUM" as const,
    questionText:
      "In [Co(NH₃)₆]Cl₃, the coordination number of cobalt is:",
    optionA: "3",
    optionB: "4",
    optionC: "6",
    optionD: "9",
    correctOption: "C" as const,
    explanation:
      "The coordination number is the number of ligands directly bonded to the metal. In [Co(NH₃)₆]³⁺, 6 NH₃ ligands are bonded to Co → coordination number = 6.",
    tags: ["coordination compounds", "coordination number", "Werner's theory"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Coordination Compounds",
    concept: "Crystal field theory",
    year: 2021,
    difficulty: "HARD" as const,
    questionText:
      "The CFSE (Crystal Field Stabilization Energy) for a d⁶ ion in a strong field (low spin) octahedral complex is:",
    optionA: "−2.4 Δo",
    optionB: "−0.4 Δo",
    optionC: "0",
    optionD: "−1.6 Δo",
    correctOption: "A" as const,
    explanation:
      "For d⁶ low spin in octahedral: electrons fill t2g (6 electrons). CFSE = 6×(−0.4Δo) = −2.4Δo.",
    tags: ["coordination compounds", "CFT", "CFSE", "octahedral"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Coordination Compounds",
    concept: "Isomerism in coordination compounds",
    year: 2016,
    difficulty: "MEDIUM" as const,
    questionText:
      "[Pt(NH₃)₂Cl₂] shows which type of isomerism?",
    optionA: "Linkage isomerism",
    optionB: "Ionization isomerism",
    optionC: "Geometrical isomerism (cis-trans)",
    optionD: "Optical isomerism only",
    correctOption: "C" as const,
    explanation:
      "Square planar [Pt(NH₃)₂Cl₂] shows cis-trans (geometrical) isomerism. Cis-platin (cis form) is an anti-cancer drug.",
    tags: ["coordination compounds", "geometrical isomerism", "cis-platin"],
  },

  // ─── p-BLOCK ELEMENTS ─────────────────────────────────────────────────────
  {
    subject: "CHEMISTRY" as const,
    chapter: "p-Block Elements",
    concept: "Interhalogen compounds",
    year: 2019,
    difficulty: "MEDIUM" as const,
    questionText:
      "Which of the following is an interhalogen compound?",
    optionA: "Cl₂O",
    optionB: "BrF₃",
    optionC: "OF₂",
    optionD: "I₂O₅",
    correctOption: "B" as const,
    explanation:
      "Interhalogen compounds are formed between two different halogens. BrF₃ (bromine trifluoride) is an interhalogen compound.",
    tags: ["p-block", "interhalogen compounds", "halogens"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "p-Block Elements",
    concept: "Oxoacids of sulphur",
    year: 2023,
    difficulty: "HARD" as const,
    questionText:
      "The oxidation state of sulphur in H₂S₂O₇ (oleum) is:",
    optionA: "+4",
    optionB: "+6",
    optionC: "+7",
    optionD: "+2",
    correctOption: "B" as const,
    explanation:
      "In H₂S₂O₇: 2×(+1) + 2×x + 7×(−2) = 0 → 2 + 2x − 14 = 0 → 2x = 12 → x = +6.",
    tags: ["p-block", "sulphur", "oxidation state", "oleum"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "p-Block Elements",
    concept: "Noble gases",
    year: 2017,
    difficulty: "EASY" as const,
    questionText:
      "Which noble gas is used in advertising signs due to its characteristic red glow?",
    optionA: "Helium",
    optionB: "Krypton",
    optionC: "Argon",
    optionD: "Neon",
    correctOption: "D" as const,
    explanation:
      "Neon emits a characteristic reddish-orange glow when an electric discharge is passed through it, hence used in neon signs.",
    tags: ["p-block", "noble gases", "neon"],
  },

  // ─── d-BLOCK ELEMENTS ─────────────────────────────────────────────────────
  {
    subject: "CHEMISTRY" as const,
    chapter: "d-Block Elements",
    concept: "Properties of transition metals",
    year: 2020,
    difficulty: "EASY" as const,
    questionText:
      "Which of the following transition metals has the highest melting point?",
    optionA: "Iron (Fe)",
    optionB: "Chromium (Cr)",
    optionC: "Tungsten (W)",
    optionD: "Copper (Cu)",
    correctOption: "C" as const,
    explanation:
      "Tungsten (W) has the highest melting point of all metals (3422°C), due to strong metallic bonding from its half-filled d orbitals.",
    tags: ["d-block", "transition metals", "melting point"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "d-Block Elements",
    concept: "Oxidation states of Mn",
    year: 2022,
    difficulty: "MEDIUM" as const,
    questionText:
      "The oxidation state of manganese in KMnO₄ is:",
    optionA: "+6",
    optionB: "+7",
    optionC: "+4",
    optionD: "+5",
    correctOption: "B" as const,
    explanation:
      "In KMnO₄: K(+1) + Mn(x) + O4(−8) = 0 → 1 + x − 8 = 0 → x = +7.",
    tags: ["d-block", "manganese", "oxidation state", "KMnO4"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "d-Block Elements",
    concept: "Catalytic properties",
    year: null,
    difficulty: "EASY" as const,
    questionText:
      "Which metal is used as a catalyst in the Haber process for the synthesis of ammonia?",
    optionA: "Platinum",
    optionB: "Nickel",
    optionC: "Iron",
    optionD: "Vanadium",
    correctOption: "C" as const,
    explanation:
      "Iron (Fe) is the catalyst used in the Haber process (N₂ + 3H₂ → 2NH₃). Mo is the promoter.",
    tags: ["d-block", "Haber process", "catalysis", "iron"],
  },

  // ─── THERMODYNAMICS ───────────────────────────────────────────────────────
  {
    subject: "CHEMISTRY" as const,
    chapter: "Thermodynamics",
    concept: "Gibbs free energy",
    year: 2018,
    difficulty: "MEDIUM" as const,
    questionText:
      "A reaction is spontaneous at all temperatures when:",
    optionA: "ΔH > 0 and ΔS > 0",
    optionB: "ΔH < 0 and ΔS < 0",
    optionC: "ΔH < 0 and ΔS > 0",
    optionD: "ΔH > 0 and ΔS < 0",
    correctOption: "C" as const,
    explanation:
      "ΔG = ΔH − TΔS. For spontaneity ΔG < 0. If ΔH < 0 and ΔS > 0, then ΔG is always negative regardless of T.",
    tags: ["thermodynamics", "Gibbs free energy", "spontaneity"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Thermodynamics",
    concept: "Hess's law",
    year: 2015,
    difficulty: "MEDIUM" as const,
    questionText:
      "Hess's law states that the enthalpy change of a reaction is:",
    optionA: "Dependent on the pathway",
    optionB: "Independent of the pathway taken",
    optionC: "Always exothermic",
    optionD: "Equal to the activation energy",
    correctOption: "B" as const,
    explanation:
      "Hess's law: The total enthalpy change is independent of the route taken. It is a consequence of enthalpy being a state function.",
    tags: ["thermodynamics", "Hess's law", "state function", "enthalpy"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Thermodynamics",
    concept: "Entropy",
    year: 2024,
    difficulty: "EASY" as const,
    questionText:
      "Which of the following processes is associated with an increase in entropy?",
    optionA: "Freezing of water",
    optionB: "Dissolving sugar in water",
    optionC: "Crystallization",
    optionD: "Compression of a gas",
    correctOption: "B" as const,
    explanation:
      "Dissolving sugar increases the disorder (more randomness of molecules in solution) → increase in entropy. Freezing and crystallization decrease entropy.",
    tags: ["thermodynamics", "entropy", "disorder"],
  },

  // ─── SOLUTIONS ────────────────────────────────────────────────────────────
  {
    subject: "CHEMISTRY" as const,
    chapter: "Solutions",
    concept: "Raoult's law",
    year: 2019,
    difficulty: "MEDIUM" as const,
    questionText:
      "A solution of glucose (non-volatile solute) lowers the vapour pressure of water. This phenomenon is explained by:",
    optionA: "Henry's law",
    optionB: "Raoult's law",
    optionC: "Nernst equation",
    optionD: "Van't Hoff equation",
    correctOption: "B" as const,
    explanation:
      "Raoult's law states: PA = xA × P°A. Adding a non-volatile solute lowers the mole fraction of solvent, reducing its vapour pressure.",
    tags: ["solutions", "Raoult's law", "vapour pressure lowering"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Solutions",
    concept: "Colligative properties – boiling point elevation",
    year: 2021,
    difficulty: "MEDIUM" as const,
    questionText:
      "The boiling point elevation of 0.5 mol/kg aqueous solution of NaCl (Kb = 0.52 K·kg/mol, i = 2) is:",
    optionA: "0.26 K",
    optionB: "0.52 K",
    optionC: "1.04 K",
    optionD: "0.13 K",
    correctOption: "B" as const,
    explanation:
      "ΔTb = i × Kb × m = 2 × 0.52 × 0.5 = 0.52 K.",
    tags: ["solutions", "boiling point elevation", "van't Hoff factor"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Solutions",
    concept: "Osmotic pressure",
    year: 2016,
    difficulty: "HARD" as const,
    questionText:
      "The osmotic pressure of a 0.2 M solution of a non-electrolyte at 27°C (R = 0.082 L·atm/mol·K) is:",
    optionA: "4.92 atm",
    optionB: "0.492 atm",
    optionC: "49.2 atm",
    optionD: "0.0492 atm",
    correctOption: "A" as const,
    explanation:
      "π = CRT = 0.2 × 0.082 × 300 = 4.92 atm. (T = 27+273 = 300 K)",
    tags: ["solutions", "osmotic pressure", "Van't Hoff"],
  },

  // ─── CHEMICAL KINETICS ────────────────────────────────────────────────────
  {
    subject: "CHEMISTRY" as const,
    chapter: "Chemical Kinetics",
    concept: "Order of reaction",
    year: 2020,
    difficulty: "MEDIUM" as const,
    questionText:
      "For a first-order reaction, the half-life is:",
    optionA: "Directly proportional to initial concentration",
    optionB: "Independent of initial concentration",
    optionC: "Inversely proportional to initial concentration",
    optionD: "Dependent on temperature only",
    correctOption: "B" as const,
    explanation:
      "For a first-order reaction: t₁/₂ = 0.693/k. The half-life is independent of initial concentration (unique to first-order reactions).",
    tags: ["chemical kinetics", "first order", "half-life"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Chemical Kinetics",
    concept: "Arrhenius equation",
    year: 2023,
    difficulty: "HARD" as const,
    questionText:
      "According to Arrhenius equation, a plot of ln k vs 1/T gives a straight line. The slope of this line equals:",
    optionA: "−Ea/R",
    optionB: "Ea/R",
    optionC: "−R/Ea",
    optionD: "A (frequency factor)",
    correctOption: "A" as const,
    explanation:
      "Arrhenius equation: ln k = ln A − Ea/RT. Plotting ln k vs 1/T: slope = −Ea/R, y-intercept = ln A.",
    tags: ["chemical kinetics", "Arrhenius equation", "activation energy"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Chemical Kinetics",
    concept: "Rate law",
    year: 2017,
    difficulty: "MEDIUM" as const,
    questionText:
      "If the rate of a reaction doubles when the concentration of a reactant is doubled, the order of reaction with respect to that reactant is:",
    optionA: "0",
    optionB: "1",
    optionC: "2",
    optionD: "−1",
    correctOption: "B" as const,
    explanation:
      "Rate = k[A]^n. If [A] doubles and rate doubles: 2 = 2^n → n = 1. First-order reaction.",
    tags: ["chemical kinetics", "rate law", "order of reaction"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Chemical Kinetics",
    concept: "Catalysis",
    year: 2015,
    difficulty: "EASY" as const,
    questionText:
      "A catalyst increases the rate of reaction by:",
    optionA: "Increasing the activation energy",
    optionB: "Decreasing the activation energy",
    optionC: "Increasing the temperature",
    optionD: "Changing the equilibrium constant",
    correctOption: "B" as const,
    explanation:
      "A catalyst provides an alternative reaction pathway with lower activation energy, increasing the rate without being consumed. It does not change equilibrium constant or ΔH.",
    tags: ["chemical kinetics", "catalysis", "activation energy"],
  },

  // ─── ADDITIONAL MIXED QUESTIONS ───────────────────────────────────────────
  {
    subject: "CHEMISTRY" as const,
    chapter: "Atomic Structure",
    concept: "de Broglie wavelength",
    year: 2022,
    difficulty: "HARD" as const,
    questionText:
      "An electron (mass 9.1×10⁻³¹ kg) moving at 10⁶ m/s. Its de Broglie wavelength (h = 6.626×10⁻³⁴ J·s) is approximately:",
    optionA: "0.73 nm",
    optionB: "7.3 nm",
    optionC: "0.073 nm",
    optionD: "7.3 pm",
    correctOption: "A" as const,
    explanation:
      "λ = h/mv = 6.626×10⁻³⁴/(9.1×10⁻³¹×10⁶) ≈ 7.28×10⁻¹⁰ m ≈ 0.73 nm.",
    tags: ["atomic structure", "de Broglie", "wave-particle duality"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "p-Block Elements",
    concept: "Allotropes of phosphorus",
    year: 2014,
    difficulty: "EASY" as const,
    questionText:
      "White phosphorus is stored under water because:",
    optionA: "It is insoluble in water",
    optionB: "It reacts with oxygen spontaneously and catches fire in air",
    optionC: "Water stabilizes its crystal structure",
    optionD: "It reacts violently with air to produce P₂O₅",
    correctOption: "B" as const,
    explanation:
      "White phosphorus is highly reactive and ignites spontaneously in air (pyrophoric). Storing under water prevents contact with O₂.",
    tags: ["p-block", "phosphorus", "allotropes", "white phosphorus"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "d-Block Elements",
    concept: "Potassium dichromate",
    year: 2018,
    difficulty: "MEDIUM" as const,
    questionText:
      "Potassium dichromate (K₂Cr₂O₇) acts as an oxidising agent in acidic medium. The Cr changes from:",
    optionA: "+6 to +3",
    optionB: "+3 to +6",
    optionC: "+6 to 0",
    optionD: "+4 to +6",
    correctOption: "A" as const,
    explanation:
      "In K₂Cr₂O₇, Cr is in +6 state. As an oxidising agent, Cr gains electrons and is reduced to Cr³⁺ (+3 state).",
    tags: ["d-block", "potassium dichromate", "oxidation state", "redox"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Organic Chemistry: Basic Principles",
    concept: "Resonance",
    year: 2019,
    difficulty: "MEDIUM" as const,
    questionText:
      "Which of the following species is stabilised by resonance?",
    optionA: "Methyl carbanion (CH₃⁻)",
    optionB: "Allyl carbocation (CH₂=CH–CH₂⁺)",
    optionC: "Ethyl radical",
    optionD: "Neopentyl cation",
    correctOption: "B" as const,
    explanation:
      "The allyl carbocation is stabilized by resonance: CH₂=CH–CH₂⁺ ↔ ⁺CH₂–CH=CH₂. The positive charge is delocalized over two carbons.",
    tags: ["organic chemistry", "resonance", "allyl carbocation"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Equilibrium",
    concept: "Solubility product",
    year: 2021,
    difficulty: "HARD" as const,
    questionText:
      "The solubility product of AgCl is 1.8×10⁻¹⁰ at 25°C. The molar solubility of AgCl is:",
    optionA: "1.34×10⁻⁵ mol/L",
    optionB: "1.8×10⁻¹⁰ mol/L",
    optionC: "9×10⁻¹¹ mol/L",
    optionD: "1.34×10⁻¹⁰ mol/L",
    correctOption: "A" as const,
    explanation:
      "AgCl ⇌ Ag⁺ + Cl⁻. Ksp = s² = 1.8×10⁻¹⁰. s = √(1.8×10⁻¹⁰) ≈ 1.34×10⁻⁵ mol/L.",
    tags: ["equilibrium", "Ksp", "solubility", "AgCl"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Hydrocarbons",
    concept: "Wurtz reaction",
    year: 2015,
    difficulty: "MEDIUM" as const,
    questionText:
      "In the Wurtz reaction, alkyl halides react with sodium in dry ether to form:",
    optionA: "Alkenes",
    optionB: "Higher alkanes",
    optionC: "Alcohols",
    optionD: "Alkyl sodium compounds",
    correctOption: "B" as const,
    explanation:
      "Wurtz reaction: 2R–X + 2Na → R–R + 2NaX. Two alkyl halide molecules couple to form a higher alkane with twice the carbon number.",
    tags: ["hydrocarbons", "Wurtz reaction", "alkane synthesis"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Amines",
    concept: "Carbylamine test",
    year: 2016,
    difficulty: "EASY" as const,
    questionText:
      "The carbylamine (isocyanide) test is used to distinguish:",
    optionA: "Primary amines from secondary and tertiary amines",
    optionB: "Aromatic amines from aliphatic amines",
    optionC: "Secondary amines from tertiary amines",
    optionD: "Amines from amides",
    correctOption: "A" as const,
    explanation:
      "Primary amines react with CHCl₃ and KOH to give isocyanides (carbylamines) with a foul smell. Secondary and tertiary amines do not give this test.",
    tags: ["amines", "carbylamine test", "primary amines"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Solutions",
    concept: "Henry's law",
    year: 2023,
    difficulty: "MEDIUM" as const,
    questionText:
      "Henry's law states that at a constant temperature, the solubility of a gas in a liquid is:",
    optionA: "Inversely proportional to the partial pressure of the gas",
    optionB: "Directly proportional to the partial pressure of the gas",
    optionC: "Independent of pressure",
    optionD: "Proportional to the square of the pressure",
    correctOption: "B" as const,
    explanation:
      "Henry's law: p = KH × x (or C ∝ p). The solubility of a gas is directly proportional to the partial pressure of the gas above the solution.",
    tags: ["solutions", "Henry's law", "gas solubility"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Coordination Compounds",
    concept: "EAN rule – magnetic properties",
    year: 2024,
    difficulty: "HARD" as const,
    questionText:
      "The complex [Fe(CN)₆]⁴⁻ is diamagnetic because:",
    optionA: "Fe is in +4 oxidation state",
    optionB: "CN⁻ is a strong field ligand causing pairing of d electrons",
    optionC: "CN⁻ is a weak field ligand",
    optionD: "Fe²⁺ has no d electrons",
    correctOption: "B" as const,
    explanation:
      "Fe²⁺ is d⁶. CN⁻ is a strong field ligand → low spin complex. All 6 d electrons pair up in t2g → no unpaired electrons → diamagnetic.",
    tags: ["coordination compounds", "diamagnetic", "strong field ligand", "CN"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Electrochemistry",
    concept: "Galvanic cell",
    year: 2015,
    difficulty: "EASY" as const,
    questionText:
      "In an electrochemical cell, oxidation takes place at the:",
    optionA: "Cathode",
    optionB: "Anode",
    optionC: "Salt bridge",
    optionD: "Both electrodes simultaneously",
    correctOption: "B" as const,
    explanation:
      "OIL RIG (Oxidation Is Loss, Reduction Is Gain). In a galvanic cell, oxidation occurs at the anode (negative electrode), releasing electrons into the external circuit.",
    tags: ["electrochemistry", "galvanic cell", "anode", "oxidation"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Chemical Bonding",
    concept: "Dipole moment",
    year: 2020,
    difficulty: "MEDIUM" as const,
    questionText:
      "Which of the following molecules has zero dipole moment?",
    optionA: "H₂O",
    optionB: "NH₃",
    optionC: "CCl₄",
    optionD: "CHCl₃",
    correctOption: "C" as const,
    explanation:
      "CCl₄ is tetrahedral and perfectly symmetric. The four C–Cl bond dipoles cancel out, giving a net zero dipole moment.",
    tags: ["chemical bonding", "dipole moment", "symmetry", "CCl4"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Aldehydes Ketones",
    concept: "Cannizzaro reaction",
    year: 2017,
    difficulty: "HARD" as const,
    questionText:
      "Cannizzaro reaction is given by aldehydes that:",
    optionA: "Have alpha-hydrogen atoms",
    optionB: "Do not have alpha-hydrogen atoms",
    optionC: "Are aromatic",
    optionD: "Have more than 4 carbons",
    correctOption: "B" as const,
    explanation:
      "Cannizzaro reaction involves disproportionation of aldehydes without α-H (like HCHO, PhCHO, CCl₃CHO). One molecule oxidizes to acid, the other reduces to alcohol.",
    tags: ["aldehydes ketones", "Cannizzaro reaction", "alpha hydrogen"],
  },
  {
    subject: "CHEMISTRY" as const,
    chapter: "Thermodynamics",
    concept: "Bond enthalpy",
    year: 2022,
    difficulty: "HARD" as const,
    questionText:
      "Using bond enthalpies: H–H = 436 kJ/mol, Cl–Cl = 242 kJ/mol, H–Cl = 431 kJ/mol; ΔH for H₂ + Cl₂ → 2HCl is:",
    optionA: "−184 kJ/mol",
    optionB: "+184 kJ/mol",
    optionC: "−431 kJ/mol",
    optionD: "+862 kJ/mol",
    correctOption: "A" as const,
    explanation:
      "ΔH = Bonds broken − Bonds formed = (436 + 242) − (2×431) = 678 − 862 = −184 kJ/mol.",
    tags: ["thermodynamics", "bond enthalpy", "Hess's law"],
  },
];
