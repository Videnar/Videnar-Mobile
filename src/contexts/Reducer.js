export const Reducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'setUser': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'removeUser':
      return { ...state, ...initialState };
    case 'update_preferences':
      return { ...state, preferences: action.payload };
    case 'changeScreen':
      return { ...state, screen: action.payload };
    case 'toggleAnswerEditor':
      return { ...state, showAnswerEditor: !state.showAnswerEditor };
    case 'setAnswerEditorData':
      return { ...state, ...action.payload };
    case 'clearAnswerEditorData':
      return {
        ...state,
        answerIdToEdit: null,
        answerContentToEdit: null,
        showAnswerEditor: false,
      };
    default:
      return state;
  }
};

export const initialState = {
  screen: 'Main',
  userID: null,
  attributes: null,
  preferences: null,
  answerIdToEdit: null,
  answerContentToEdit: null,
  showAnswerEditor: false,
};
