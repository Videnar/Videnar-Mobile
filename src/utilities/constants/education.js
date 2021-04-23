const NEET = {
  key: 'NEET',
  description: 'National Eligibility cum Entrance Test (UG)',
};
const JEE = {
  key: 'JEE',
  description: 'Joint Entrance Examination',
};
const NEETPG = {
  key: 'NEET PG',
  description: 'National Eligibility cum Entrance Test (PG)',
};
const AIIMSPG = {
  key: 'AIIMS PG',
  description: 'All India Institute of Medical Science (PG)',
};
const JIPMERPG = {
  key: 'JIPMER PG',
  description:
    'Jawaharlal Institute of Postgraduate Medical Education & Research (PG)',
};
const PGIMER = {
  key: 'PGIMER',
  description: 'Postgraduate Institute of Medical Education and Research',
};
const NIMHANS = {
  key: 'NIMHANS',
  description: 'National Institute of Mental Health and Neurosciences',
};
const SSCCGL = {
  key: 'SSC-CGL',
  description: 'Combined Graduate Level',
};
const SSCJE = {
  key: 'SSC-JE',
  description: 'Junior Engineers',
};
const SSCGD = {
  key: 'SSC-GD',
  description: 'General Duty',
};
const SSCCPO = {
  key: 'SSC-CPO',
  description: 'Central Police Organization',
};
const SSCCHSL = {
  key: 'SSC-CHSL',
  description: 'Combined Higher Secondary Level',
};
const CSE = {
  key: 'CSE',
  description: 'Civil Services Examination',
};
const IFS = {
  key: 'IFS',
  description: 'Indian Forest Service',
};
const IES = {
  key: 'IES',
  description: 'Indian Engineering Service',
};
const CAT = {
  key: 'CAT',
  description: 'Common Admission Test',
};
const XAT = {
  key: 'XAT',
  description: 'Xavier Aptitude Test',
};
const GATE = {
  key: 'GATE',
  description: 'Graduate Aptitude Test in Engineering',
};
const SBI = {
  key: 'SBI',
  description: 'SBI PO & Clerk',
};
const RBI = {
  key: 'RBI',
  description: 'RBI Grade-B & Assistant',
};
const IBPS = {
  key: 'IBPS',
  description: 'Institute of Banking Personnel Selection',
};
const RRBJE = {
  key: 'RRB-JE',
  description: 'Junior Engineer',
};
const RRBNTPC = {
  key: 'RRB-NTPC',
  description: 'Non Technical Popular Categories',
};
const RRBALP = {
  key: 'RRB-ALP',
  description: 'Assistant Loco Pilot',
};

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
    exams: [GATE, IES, ...MBA, CSE, ...Banking, SSCCGL],
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
    exams: [CAT, CSE, IFS, ...SSC, ...Banking, RRBNTPC],
  },
  { level: 'Chartered Accountant (CA)' },
  { level: 'Certified Management AccountantCMA (CMA)' },
  { level: 'Company secretary(CS)' },
  {
    level: 'Diploma',
    exams: [RRBJE, RRBALP, SSCJE, SSCGD],
  },
];
