/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
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
export const onCreateCommentOnQuestion = /* GraphQL */ `
  subscription OnCreateCommentOnQuestion {
    onCreateCommentOnQuestion {
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
export const onUpdateCommentOnQuestion = /* GraphQL */ `
  subscription OnUpdateCommentOnQuestion {
    onUpdateCommentOnQuestion {
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
export const onDeleteCommentOnQuestion = /* GraphQL */ `
  subscription OnDeleteCommentOnQuestion {
    onDeleteCommentOnQuestion {
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
export const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer {
    onCreateAnswer {
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
export const onUpdateAnswer = /* GraphQL */ `
  subscription OnUpdateAnswer {
    onUpdateAnswer {
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
export const onDeleteAnswer = /* GraphQL */ `
  subscription OnDeleteAnswer {
    onDeleteAnswer {
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
export const onCreateCommentOnAnswer = /* GraphQL */ `
  subscription OnCreateCommentOnAnswer {
    onCreateCommentOnAnswer {
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
export const onUpdateCommentOnAnswer = /* GraphQL */ `
  subscription OnUpdateCommentOnAnswer {
    onUpdateCommentOnAnswer {
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
export const onDeleteCommentOnAnswer = /* GraphQL */ `
  subscription OnDeleteCommentOnAnswer {
    onDeleteCommentOnAnswer {
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
