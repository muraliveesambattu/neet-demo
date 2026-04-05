export const SUBJECTS = ["PHYSICS", "CHEMISTRY", "BOTANY", "ZOOLOGY"] as const;
export type SubjectType = (typeof SUBJECTS)[number];

export const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"] as const;
export type DifficultyType = (typeof DIFFICULTIES)[number];

export const SUBJECT_COLORS: Record<SubjectType, string> = {
  PHYSICS: "#3B82F6",
  CHEMISTRY: "#10B981",
  BOTANY: "#84CC16",
  ZOOLOGY: "#F59E0B",
};

export const SUBJECT_LABELS: Record<SubjectType, string> = {
  PHYSICS: "Physics",
  CHEMISTRY: "Chemistry",
  BOTANY: "Botany",
  ZOOLOGY: "Zoology",
};

export const QUESTIONS_PER_SUBJECT = 45;
export const TOTAL_QUESTIONS = 180;
export const MAX_SCORE = 720;
export const TEST_DURATION_SECS = 200 * 60; // 3h 20min

export const DIFFICULTY_RATIO = {
  default: { EASY: 0.3, MEDIUM: 0.5, HARD: 0.2 },
  easy: { EASY: 0.4, MEDIUM: 0.45, HARD: 0.15 },   // accuracy < 50%
  hard: { EASY: 0.15, MEDIUM: 0.45, HARD: 0.4 },   // accuracy > 70%
};

export const CHAPTERS: Record<SubjectType, string[]> = {
  PHYSICS: [
    "Physical World and Measurement",
    "Kinematics",
    "Laws of Motion",
    "Work, Energy and Power",
    "Motion of System of Particles and Rigid Body",
    "Gravitation",
    "Properties of Bulk Matter",
    "Thermodynamics",
    "Kinetic Theory of Gases",
    "Oscillations and Waves",
    "Electrostatics",
    "Current Electricity",
    "Magnetic Effects of Current and Magnetism",
    "Electromagnetic Induction and Alternating Currents",
    "Electromagnetic Waves",
    "Optics",
    "Dual Nature of Matter and Radiation",
    "Atoms and Nuclei",
    "Electronic Devices",
    "Communication Systems",
  ],
  CHEMISTRY: [
    "Some Basic Concepts of Chemistry",
    "Structure of Atom",
    "Classification of Elements and Periodicity",
    "Chemical Bonding and Molecular Structure",
    "States of Matter",
    "Thermodynamics",
    "Equilibrium",
    "Redox Reactions",
    "Hydrogen",
    "s-Block Elements",
    "p-Block Elements",
    "Organic Chemistry: Basic Principles",
    "Hydrocarbons",
    "Environmental Chemistry",
    "Solid State",
    "Solutions",
    "Electrochemistry",
    "Chemical Kinetics",
    "Surface Chemistry",
    "General Principles and Processes of Isolation of Elements",
    "d and f Block Elements",
    "Coordination Compounds",
    "Haloalkanes and Haloarenes",
    "Alcohols, Phenols and Ethers",
    "Aldehydes, Ketones and Carboxylic Acids",
    "Amines",
    "Biomolecules",
    "Polymers",
    "Chemistry in Everyday Life",
  ],
  BOTANY: [
    "The Living World",
    "Biological Classification",
    "Plant Kingdom",
    "Morphology of Flowering Plants",
    "Anatomy of Flowering Plants",
    "Cell: The Unit of Life",
    "Cell Cycle and Cell Division",
    "Transport in Plants",
    "Mineral Nutrition",
    "Photosynthesis in Higher Plants",
    "Respiration in Plants",
    "Plant Growth and Development",
    "Reproduction in Organisms",
    "Sexual Reproduction in Flowering Plants",
    "Principles of Inheritance and Variation",
    "Molecular Basis of Inheritance",
    "Evolution",
    "Strategies for Enhancement in Food Production",
    "Microbes in Human Welfare",
    "Biotechnology: Principles and Processes",
    "Biotechnology and its Applications",
    "Organisms and Populations",
    "Ecosystem",
    "Biodiversity and Conservation",
    "Environmental Issues",
  ],
  ZOOLOGY: [
    "Animal Kingdom",
    "Structural Organisation in Animals",
    "Biomolecules",
    "Digestion and Absorption",
    "Breathing and Exchange of Gases",
    "Body Fluids and Circulation",
    "Excretory Products and their Elimination",
    "Locomotion and Movement",
    "Neural Control and Coordination",
    "Chemical Coordination and Integration",
    "Human Reproduction",
    "Reproductive Health",
    "Human Health and Disease",
    "Animal Husbandry",
    "Human Genetics",
  ],
};
