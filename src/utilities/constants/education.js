const NEET = 'NEET';
const JEE = 'JEE';
const NEETPG = 'NEET PG';
const AIIMSPG = 'AIIMS PG';
const JIPMERPG = 'JIPMER PG';
const PGIMER = 'PGIMER';
const SSCCGL = 'SSC-CGL';
const SSCJE = 'SSC-JE';
const SSCGD = 'SSC_GD';
const SSCCPO = 'SSC-CPO';
const SSCCHSL = 'SSC-CHSL';
const CSE = 'CIVIL SERVICE EXAMINATION';
const IFSE = 'INDIAN FOREST SERVICE EXAMINATION';
const IESE = 'INDIAN ENGINEERING SERVICE EXAMINATION';
const CAT = 'CAT';
const XAT = 'XAT';
const GATE = 'GATE';
const SBI = 'SBI EXAM';
const RBI = 'RBI EXAM';
const IBPS = 'IBPS EXAM';
const RRBJE = 'RRB-JE';
const RRBNTPC = 'RRB-NTPC';
const RRBALP = 'RRB-ALP';

const MBA = [CAT, XAT];
const Banking = [SBI, RBI, IBPS];
const SSC = [SSCCGL, SSCJE, SSCGD, SSCCPO, SSCCHSL];

const Branches = {
  BIO: 'Bio Technology',
  CER: 'Ceramic Engineering',
  CHE: 'Chemical Engineering',
  CE: 'Civil Engineering',
  CSE: 'Computer Science and Engineering',
  EE: 'Electrical Engineering',
  ECE: 'Electronics and Communication Engineering',
  EIE: 'Electronics and Instrumentation Engineering',
  ME: 'Mechanical Engineering',
  MME: 'Metallurgical and Materials Engineering',
  MIN: 'Mining Engineering',
  FOO: 'Food Process Engineering',
};

export const education = [
  {
    LEVEL: 'Class 12',
    EXAMS: [NEET, JEE],
  },
  {
    LEVEL: 'Class 11',
    EXAMS: [NEET, JEE],
  },
  {LEVEL: 'Class 10'},
  {LEVEL: 'Class 9'},
  {LEVEL: 'Class 8'},
  {LEVEL: 'Class 7'},
  {LEVEL: 'Class 6'},
  {LEVEL: 'Class 5'},
  {
    LEVEL: 'B.Tech',
    BRANCHES: Branches,
    EXAMS: [GATE, CSE, IESE, ...MBA, ...Banking, SSCCGL],
  },
  {
    LEVEL: 'MBBS (Bachelor of Medicine and Bachelor of Surgery)',
    EXAMS: [NEETPG, AIIMSPG, JIPMERPG, PGIMER, CAT],
  },
  {
    LEVEL: 'Bachelor of Commerce',
    EXAMS: [CAT, ...SSC, ...Banking],
  },
  {
    LEVEL: 'Bachelor of Science',
    EXAMS: [CAT, CSE, IFSE, ...SSC, ...Banking, RRBNTPC],
  },
  {LEVEL: 'Chartered Accountant (CA)'},
  {LEVEL: 'Certified Management AccountantCMA (CMA)'},
  {LEVEL: 'Company secretary(CS)'},
  {
    LEVEL: 'Diploma',
    EXAMS: [RRBJE, RRBALP, SSCJE, SSCGD],
  },
];
