const NEET = {
  key: 'NEET',
  description: 'National Eligibility cum Entrance Test (UG)',
};
const JEE = {
  key: 'JEE',
  description: 'Joint Entrance Examination',
};
const NEXT = {
  key: 'NEXT',
  description: 'National Exit Test',
};
const NEETPG = {
  key: 'NEET PG',
  description: 'National Eligibility cum Entrance Test (PG)',
};
const INICET = {
  key: 'INI CET',
  description: 'Institute of National Importance Combined Entrance Test',
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

const CIP = {
  key: 'Coding Inteview',
  description: 'Coding Inteview Preparation for Tech jobs',
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
const CBSE = {
  key: 'CBSE',
  description: 'Central Board of Secondary Education',
};
const ICSE = {
  key: 'ICSE',
  description: 'Indian Certificate of Secondary Education',
};
const HSCE = {
  key: 'HSCE',
  description: 'High School Certificate Examination, Odisha',
};
const CHSE = {
  key: 'CHSE',
  description: 'Council of Higher Secondary Education, Odisha',
};
const KVPY = {
  key: 'KVPY',
  description: 'Kishore Vaigyanik Protsahan Yojana',
};

const CA = {
  key: 'CA',
  description: 'ICAI CA Exam',
};

const MBA = [CAT, XAT];
const Banking = [SBI, RBI, IBPS];
const SSC = [SSCCGL, SSCJE, SSCGD, SSCCPO, SSCCHSL];

const BIO = 'Bio-Technology Engineering';
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
  {
    level: 'Class 9',
    exams: [CBSE, ICSE, HSCE, JEE, NEET],
  },
  {
    level: 'Class 10',
    exams: [CBSE, ICSE, HSCE, JEE, NEET],
  },
  {
    level: 'Class 11',
    exams: [JEE, NEET, KVPY, CBSE, ICSE, CHSE],
  },
  {
    level: 'Class 12',
    exams: [JEE, NEET, KVPY, CBSE, ICSE, CHSE],
  },
  {
    level: 'B.Tech',
    branches: Branches,
    exams: [CIP, GATE, IES, ...MBA, CSE, ...Banking, SSCCGL],
  },
  {
    level: 'MBBS',
    exams: [NEXT, INICET, NEETPG, CSE, CAT],
  },
  {
    level: 'Chartered Accountant (CA)',
    exams: [CA],
  },
  {
    level: 'B.Com',
    exams: [CAT, ...SSC, ...Banking],
  },
  {
    level: 'B.Sc',
    exams: [CAT, CSE, IFS, ...SSC, ...Banking, RRBNTPC],
  },
  // { level: 'Certified Management AccountantCMA (CMA)' },
  // { level: 'Company secretary(CS)' },
  {
    level: 'Diploma',
    exams: [RRBJE, RRBALP, SSCJE, SSCGD],
  },
];
