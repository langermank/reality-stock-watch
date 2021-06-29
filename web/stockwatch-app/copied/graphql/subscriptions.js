/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateShow = /* GraphQL */ `
  subscription OnCreateShow {
    onCreateShow {
      id
      name
      seasons {
        items {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateShow = /* GraphQL */ `
  subscription OnUpdateShow {
    onUpdateShow {
      id
      name
      seasons {
        items {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteShow = /* GraphQL */ `
  subscription OnDeleteShow {
    onDeleteShow {
      id
      name
      seasons {
        items {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSeason = /* GraphQL */ `
  subscription OnCreateSeason {
    onCreateSeason {
      id
      showID
      show {
        id
        name
        seasons {
          nextToken
        }
        createdAt
        updatedAt
      }
      contestants {
        items {
          id
          seasonID
          firstName
          lastName
          nickName
          image
          status
          slug
          createdAt
          updatedAt
        }
        nextToken
      }
      startDate
      endDate
      shortName
      currentWeek
      status
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSeason = /* GraphQL */ `
  subscription OnUpdateSeason {
    onUpdateSeason {
      id
      showID
      show {
        id
        name
        seasons {
          nextToken
        }
        createdAt
        updatedAt
      }
      contestants {
        items {
          id
          seasonID
          firstName
          lastName
          nickName
          image
          status
          slug
          createdAt
          updatedAt
        }
        nextToken
      }
      startDate
      endDate
      shortName
      currentWeek
      status
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSeason = /* GraphQL */ `
  subscription OnDeleteSeason {
    onDeleteSeason {
      id
      showID
      show {
        id
        name
        seasons {
          nextToken
        }
        createdAt
        updatedAt
      }
      contestants {
        items {
          id
          seasonID
          firstName
          lastName
          nickName
          image
          status
          slug
          createdAt
          updatedAt
        }
        nextToken
      }
      startDate
      endDate
      shortName
      currentWeek
      status
      createdAt
      updatedAt
    }
  }
`;
export const onCreateContestant = /* GraphQL */ `
  subscription OnCreateContestant {
    onCreateContestant {
      id
      seasonID
      season {
        id
        showID
        show {
          id
          name
          createdAt
          updatedAt
        }
        contestants {
          nextToken
        }
        startDate
        endDate
        shortName
        currentWeek
        status
        createdAt
        updatedAt
      }
      firstName
      lastName
      nickName
      image
      status
      slug
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateContestant = /* GraphQL */ `
  subscription OnUpdateContestant {
    onUpdateContestant {
      id
      seasonID
      season {
        id
        showID
        show {
          id
          name
          createdAt
          updatedAt
        }
        contestants {
          nextToken
        }
        startDate
        endDate
        shortName
        currentWeek
        status
        createdAt
        updatedAt
      }
      firstName
      lastName
      nickName
      image
      status
      slug
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteContestant = /* GraphQL */ `
  subscription OnDeleteContestant {
    onDeleteContestant {
      id
      seasonID
      season {
        id
        showID
        show {
          id
          name
          createdAt
          updatedAt
        }
        contestants {
          nextToken
        }
        startDate
        endDate
        shortName
        currentWeek
        status
        createdAt
        updatedAt
      }
      firstName
      lastName
      nickName
      image
      status
      slug
      createdAt
      updatedAt
    }
  }
`;
