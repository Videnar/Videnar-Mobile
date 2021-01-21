/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
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
export const onCreateCommentOnQuestion = /* GraphQL */ `
  subscription OnCreateCommentOnQuestion {
    onCreateCommentOnQuestion {
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
export const onUpdateCommentOnQuestion = /* GraphQL */ `
  subscription OnUpdateCommentOnQuestion {
    onUpdateCommentOnQuestion {
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
export const onDeleteCommentOnQuestion = /* GraphQL */ `
  subscription OnDeleteCommentOnQuestion {
    onDeleteCommentOnQuestion {
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
export const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer {
    onCreateAnswer {
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
export const onUpdateAnswer = /* GraphQL */ `
  subscription OnUpdateAnswer {
    onUpdateAnswer {
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
export const onDeleteAnswer = /* GraphQL */ `
  subscription OnDeleteAnswer {
    onDeleteAnswer {
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
export const onCreateCommentOnAnswer = /* GraphQL */ `
  subscription OnCreateCommentOnAnswer {
    onCreateCommentOnAnswer {
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
export const onUpdateCommentOnAnswer = /* GraphQL */ `
  subscription OnUpdateCommentOnAnswer {
    onUpdateCommentOnAnswer {
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
export const onDeleteCommentOnAnswer = /* GraphQL */ `
  subscription OnDeleteCommentOnAnswer {
    onDeleteCommentOnAnswer {
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
