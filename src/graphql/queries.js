/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      createdAt
      title
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
          commentsOnAnswer {
            items {
              id
              answerID
              createdAt
              content
              upvotes
              updatedAt
            }
            nextToken
          }
        }
        nextToken
      }
      commentsOnQuestion {
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
        createdAt
        title
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
      questionID
      createdAt
      content
      upvotes
      question {
        id
        createdAt
        title
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
        questionID
        createdAt
        content
        upvotes
        question {
          id
          createdAt
          title
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
      questionID
      createdAt
      content
      upvotes
      question {
        id
        createdAt
        title
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
          upvotes
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
        questionID
        createdAt
        content
        upvotes
        question {
          id
          createdAt
          title
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
      answerID
      createdAt
      content
      upvotes
      answer {
        id
        questionID
        createdAt
        content
        upvotes
        question {
          id
          createdAt
          title
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
        answerID
        createdAt
        content
        upvotes
        answer {
          id
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
        questionID
        createdAt
        content
        upvotes
        question {
          id
          createdAt
          title
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
        questionID
        createdAt
        content
        upvotes
        question {
          id
          createdAt
          title
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
export const commentsOnAnswerByanswerId = /* GraphQL */ `
  query CommentsOnAnswerByanswerId(
    $answerID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentOnAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsOnAnswerByanswerID(
      answerID: $answerID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        answerID
        createdAt
        content
        upvotes
        answer {
          id
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
