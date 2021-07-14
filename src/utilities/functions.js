import Share from 'react-native-share';

export const shareQuestion = (questionId) => {
  const options = {
    message: `Can you answer this question on Videnar https://videnar.com/question?id=${questionId}`,
  };
  Share.open(options)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      err && console.log(err);
    });
};

export const getExamsString = (exams) => {
  let ExamsString = '';
  exams.forEach((exam) => {
    if (exam.match('GATE')) {
      exam = 'GATE';
    }
    if (exam.match('IES')) {
      exam = 'IES';
    }
    ExamsString = ExamsString.concat(exam + ', ');
  });
  if (ExamsString.length > 20) {
    ExamsString = ExamsString.substring(0, 19);
    ExamsString = ExamsString.concat('...');
  } else if (ExamsString.length === 0) {
    ExamsString = 'Select';
  } else {
    ExamsString = ExamsString.split('')
      .reverse()
      .join('')
      .replace(',', '')
      .split('')
      .reverse()
      .join('');
  }
  return ExamsString;
};
