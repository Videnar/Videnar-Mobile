const NEET = 'NEET';
const JEE = 'JEE';
const NEETPG = 'NEET PG';
const AIIMSPG = 'AIIMS PG';
const JIPMERPG = 'JIPMER PG';
const PGIMER = 'PGIMER';
const NIMHANS = 'NIMHANS';
const SSCCGL = 'SSC-CGL';
const SSCJE = 'SSC-JE';
const SSCGD = 'SSC-GD';
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

const BIO = 'Bio Technology';
const CER = 'Ceramic Engineering';
const CHE = 'Chemical Engineering';
const CE = 'Civil Engineering';
const CS = 'Computer Science and Engineering';
const EE = 'Electrical Engineering';
const ECE = 'Electronics and Communication Engineering';
const EIE = 'Electronics and Instrumentation Engineering';
const ME = 'Mechanical Engineering';
const MME = 'Metallurgical and Materials Engineering';
const MIN = 'Mining Engineering';
const FOO = 'Food Process Engineering';

const CBSE = 'CBSE';
const KVPY = 'KVPY';

export const Branches = [
  BIO,
  CER,
  CHE,
  CE,
  CS,
  EE,
  ECE,
  EIE,
  ME,
  MME,
  MIN,
  FOO,
];

export const educations = [
  // { level: 'Class 5' },
  // { level: 'Class 6' },
  // { level: 'Class 7' },
  // { level: 'Class 8' },
  {
    level: 'Class 9',
    exams: [CBSE, KVPY, JEE, NEET],
  },
  {
    level: 'Class 10',
    exams: [CBSE, KVPY, JEE, NEET],
  },
  {
    level: 'Class 11',
    exams: [CBSE, NEET, JEE],
  },
  {
    level: 'Class 12',
    exams: [CBSE, NEET, JEE],
  },
  {
    level: 'B.Tech',
    branches: Branches,
    exams: [GATE, IESE, ...MBA, CSE, ...Banking, SSCCGL],
  },
  {
    level: 'MBBS (Bachelor of Medicine and Bachelor of Surgery)',
    exams: [NEETPG, AIIMSPG, JIPMERPG, PGIMER, NIMHANS, CAT],
  },
  {
    level: 'Bachelor of Commerce',
    exams: [CAT, ...SSC, ...Banking],
  },
  {
    level: 'Bachelor of Science',
    exams: [CAT, CSE, IFSE, ...SSC, ...Banking, RRBNTPC],
  },
  { level: 'Chartered Accountant (CA)' },
  { level: 'Certified Management AccountantCMA (CMA)' },
  { level: 'Company secretary(CS)' },
  {
    level: 'Diploma',
    exams: [RRBJE, RRBALP, SSCJE, SSCGD],
  },
];
