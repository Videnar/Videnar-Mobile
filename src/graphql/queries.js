/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      username
      createdAt
      content
      upvotes
      view
      answers {
        items {
          id
          username
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
          username
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
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
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
      nextToken
    }
  }
`;
export const getCommentOnQuestion = /* GraphQL */ `
  query GetCommentOnQuestion($id: ID!) {
    getCommentOnQuestion(id: $id) {
      id
      username
      questionID
      createdAt
      content
      question {
        id
        username
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
export const listCommentOnQuestions = /* GraphQL */ `
  query ListCommentOnQuestions(
    $filter: ModelCommentOnQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentOnQuestions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        questionID
        createdAt
        content
        question {
          id
          username
          createdAt
          content
          upvotes
          view
          tags
          noOfBookmarks
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAnswer = /* GraphQL */ `
  query GetAnswer($id: ID!) {
    getAnswer(id: $id) {
      id
      username
      questionID
      createdAt
      content
      upvotes
      question {
        id
        username
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
          username
          answerID
          questionID
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
export const listAnswers = /* GraphQL */ `
  query ListAnswers(
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        questionID
        createdAt
        content
        upvotes
        question {
          id
          username
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
      nextToken
    }
  }
`;
export const getCommentOnAnswer = /* GraphQL */ `
  query GetCommentOnAnswer($id: ID!) {
    getCommentOnAnswer(id: $id) {
      id
      username
      answerID
      questionID
      createdAt
      content
      answer {
        id
        username
        questionID
        createdAt
        content
        upvotes
        question {
          id
          username
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
export const listCommentOnAnswers = /* GraphQL */ `
  query ListCommentOnAnswers(
    $filter: ModelCommentOnAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentOnAnswers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        answerID
        questionID
        createdAt
        content
        answer {
          id
          username
          questionID
          createdAt
          content
          upvotes
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const questionsByUsername = /* GraphQL */ `
  query QuestionsByUsername(
    $username: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    questionsByUsername(
      username: $username
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
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
      nextToken
    }
  }
`;
export const commentsOnQuestionByquestionId = /* GraphQL */ `
  query CommentsOnQuestionByquestionId(
    $questionID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentOnQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsOnQuestionByquestionID(
      questionID: $questionID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        questionID
        createdAt
        content
        question {
          id
          username
          createdAt
          content
          upvotes
          view
          tags
          noOfBookmarks
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const commentsOnQuestionByUsername = /* GraphQL */ `
  query CommentsOnQuestionByUsername(
    $username: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentOnQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsOnQuestionByUsername(
      username: $username
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        questionID
        createdAt
        content
        question {
          id
          username
          createdAt
          content
          upvotes
          view
          tags
          noOfBookmarks
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const answersByquestionId = /* GraphQL */ `
  query AnswersByquestionId(
    $questionID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    answersByquestionID(
      questionID: $questionID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        questionID
        createdAt
        content
        upvotes
        question {
          id
          username
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
      nextToken
    }
  }
`;
export const answersByUsername = /* GraphQL */ `
  query AnswersByUsername(
    $username: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    answersByUsername(
      username: $username
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        questionID
        createdAt
        content
        upvotes
        question {
          id
          username
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
      nextToken
    }
  }
`;
export const commentsOnAnswerByUsername = /* GraphQL */ `
  query CommentsOnAnswerByUsername(
    $username: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentOnAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsOnAnswerByUsername(
      username: $username
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        answerID
        questionID
        createdAt
        content
        answer {
          id
          username
          questionID
          createdAt
          content
          upvotes
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchQuestions = /* GraphQL */ `
  query SearchQuestions(
    $filter: SearchableQuestionFilterInput
    $sort: SearchableQuestionSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchQuestions(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
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
      nextToken
      total
    }
  }
`;
export const searchCommentOnQuestions = /* GraphQL */ `
  query SearchCommentOnQuestions(
    $filter: SearchableCommentOnQuestionFilterInput
    $sort: SearchableCommentOnQuestionSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchCommentOnQuestions(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        questionID
        createdAt
        content
        question {
          id
          username
          createdAt
          content
          upvotes
          view
          tags
          noOfBookmarks
          updatedAt
        }
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchAnswers = /* GraphQL */ `
  query SearchAnswers(
    $filter: SearchableAnswerFilterInput
    $sort: SearchableAnswerSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchAnswers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        questionID
        createdAt
        content
        upvotes
        question {
          id
          username
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
      nextToken
      total
    }
  }
`;
export const searchCommentOnAnswers = /* GraphQL */ `
  query SearchCommentOnAnswers(
    $filter: SearchableCommentOnAnswerFilterInput
    $sort: SearchableCommentOnAnswerSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchCommentOnAnswers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        answerID
        questionID
        createdAt
        content
        answer {
          id
          username
          questionID
          createdAt
          content
          upvotes
          updatedAt
        }
        updatedAt
      }
      nextToken
      total
    }
  }
`;
