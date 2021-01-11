/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
      id
      createdAt
      content
      upvotes
      view
      answers {
        items {
          id
          questionID
          createdAt
          content
          upvotes
          updatedAt
        }
        nextToken
      }
      commentsOnQuestion {
        items {
          id
          questionID
          createdAt
          content
          updatedAt
        }
        nextToken
      }
      tags
      noOfBookmarks
      updatedAt
    }
  }
`;
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
      id
      createdAt
      content
      upvotes
      view
      answers {
        items {
          id
          questionID
          createdAt
          content
          upvotes
          updatedAt
        }
        nextToken
      }
      commentsOnQuestion {
        items {
          id
          questionID
          createdAt
          content
          updatedAt
        }
        nextToken
      }
      tags
      noOfBookmarks
      updatedAt
    }
  }
`;
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
      id
      createdAt
      content
      upvotes
      view
      answers {
        items {
          id
          questionID
          createdAt
          content
          upvotes
          updatedAt
        }
        nextToken
      }
      commentsOnQuestion {
        items {
          id
          questionID
          createdAt
          content
          updatedAt
        }
        nextToken
      }
      tags
      noOfBookmarks
      updatedAt
    }
  }
`;
export const createCommentOnQuestion = /* GraphQL */ `
  mutation CreateCommentOnQuestion(
    $input: CreateCommentOnQuestionInput!
    $condition: ModelCommentOnQuestionConditionInput
  ) {
    createCommentOnQuestion(input: $input, condition: $condition) {
      id
      questionID
      createdAt
      content
      question {
        id
        createdAt
        content
        upvotes
        view
        answers {
          nextToken
        }
        commentsOnQuestion {
          nextToken
        }
        tags
        noOfBookmarks
        updatedAt
      }
      updatedAt
    }
  }
`;
export const updateCommentOnQuestion = /* GraphQL */ `
  mutation UpdateCommentOnQuestion(
    $input: UpdateCommentOnQuestionInput!
    $condition: ModelCommentOnQuestionConditionInput
  ) {
    updateCommentOnQuestion(input: $input, condition: $condition) {
      id
      questionID
      createdAt
      content
      question {
        id
        createdAt
        content
        upvotes
        view
        answers {
          nextToken
        }
        commentsOnQuestion {
          nextToken
        }
        tags
        noOfBookmarks
        updatedAt
      }
      updatedAt
    }
  }
`;
export const deleteCommentOnQuestion = /* GraphQL */ `
  mutation DeleteCommentOnQuestion(
    $input: DeleteCommentOnQuestionInput!
    $condition: ModelCommentOnQuestionConditionInput
  ) {
    deleteCommentOnQuestion(input: $input, condition: $condition) {
      id
      questionID
      createdAt
      content
      question {
        id
        createdAt
        content
        upvotes
        view
        answers {
          nextToken
        }
        commentsOnQuestion {
          nextToken
        }
        tags
        noOfBookmarks
        updatedAt
      }
      updatedAt
    }
  }
`;
export const createAnswer = /* GraphQL */ `
  mutation CreateAnswer(
    $input: CreateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    createAnswer(input: $input, condition: $condition) {
      id
      questionID
      createdAt
      content
      upvotes
      question {
        id
        createdAt
        content
        upvotes
        view
        answers {
          nextToken
        }
        commentsOnQuestion {
          nextToken
        }
        tags
        noOfBookmarks
        updatedAt
      }
      commentsOnAnswer {
        items {
          id
          answerID
          createdAt
          content
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const updateAnswer = /* GraphQL */ `
  mutation UpdateAnswer(
    $input: UpdateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    updateAnswer(input: $input, condition: $condition) {
      id
      questionID
      createdAt
      content
      upvotes
      question {
        id
        createdAt
        content
        upvotes
        view
        answers {
          nextToken
        }
        commentsOnQuestion {
          nextToken
        }
        tags
        noOfBookmarks
        updatedAt
      }
      commentsOnAnswer {
        items {
          id
          answerID
          createdAt
          content
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const deleteAnswer = /* GraphQL */ `
  mutation DeleteAnswer(
    $input: DeleteAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    deleteAnswer(input: $input, condition: $condition) {
      id
      questionID
      createdAt
      content
      upvotes
      question {
        id
        createdAt
        content
        upvotes
        view
        answers {
          nextToken
        }
        commentsOnQuestion {
          nextToken
        }
        tags
        noOfBookmarks
        updatedAt
      }
      commentsOnAnswer {
        items {
          id
          answerID
          createdAt
          content
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const createCommentOnAnswer = /* GraphQL */ `
  mutation CreateCommentOnAnswer(
    $input: CreateCommentOnAnswerInput!
    $condition: ModelCommentOnAnswerConditionInput
  ) {
    createCommentOnAnswer(input: $input, condition: $condition) {
      id
      answerID
      createdAt
      content
      answer {
        id
        questionID
        createdAt
        content
        upvotes
        question {
          id
          createdAt
          content
          upvotes
          view
          tags
          noOfBookmarks
          updatedAt
        }
        commentsOnAnswer {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
export const updateCommentOnAnswer = /* GraphQL */ `
  mutation UpdateCommentOnAnswer(
    $input: UpdateCommentOnAnswerInput!
    $condition: ModelCommentOnAnswerConditionInput
  ) {
    updateCommentOnAnswer(input: $input, condition: $condition) {
      id
      answerID
      createdAt
      content
      answer {
        id
        questionID
        createdAt
        content
        upvotes
        question {
          id
          createdAt
          content
          upvotes
          view
          tags
          noOfBookmarks
          updatedAt
        }
        commentsOnAnswer {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
export const deleteCommentOnAnswer = /* GraphQL */ `
  mutation DeleteCommentOnAnswer(
    $input: DeleteCommentOnAnswerInput!
    $condition: ModelCommentOnAnswerConditionInput
  ) {
    deleteCommentOnAnswer(input: $input, condition: $condition) {
      id
      answerID
      createdAt
      content
      answer {
        id
        questionID
        createdAt
        content
        upvotes
        question {
          id
          createdAt
          content
          upvotes
          view
          tags
          noOfBookmarks
          updatedAt
        }
        commentsOnAnswer {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
