/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createShow = /* GraphQL */ `
  mutation CreateShow(
    $input: CreateShowInput!
    $condition: ModelShowConditionInput
  ) {
    createShow(input: $input, condition: $condition) {
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
export const updateShow = /* GraphQL */ `
  mutation UpdateShow(
    $input: UpdateShowInput!
    $condition: ModelShowConditionInput
  ) {
    updateShow(input: $input, condition: $condition) {
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
export const deleteShow = /* GraphQL */ `
  mutation DeleteShow(
    $input: DeleteShowInput!
    $condition: ModelShowConditionInput
  ) {
    deleteShow(input: $input, condition: $condition) {
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
export const createSeason = /* GraphQL */ `
  mutation CreateSeason(
    $input: CreateSeasonInput!
    $condition: ModelSeasonConditionInput
  ) {
    createSeason(input: $input, condition: $condition) {
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
export const updateSeason = /* GraphQL */ `
  mutation UpdateSeason(
    $input: UpdateSeasonInput!
    $condition: ModelSeasonConditionInput
  ) {
    updateSeason(input: $input, condition: $condition) {
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
export const deleteSeason = /* GraphQL */ `
  mutation DeleteSeason(
    $input: DeleteSeasonInput!
    $condition: ModelSeasonConditionInput
  ) {
    deleteSeason(input: $input, condition: $condition) {
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
export const createContestant = /* GraphQL */ `
  mutation CreateContestant(
    $input: CreateContestantInput!
    $condition: ModelContestantConditionInput
  ) {
    createContestant(input: $input, condition: $condition) {
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
export const updateContestant = /* GraphQL */ `
  mutation UpdateContestant(
    $input: UpdateContestantInput!
    $condition: ModelContestantConditionInput
  ) {
    updateContestant(input: $input, condition: $condition) {
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
export const deleteContestant = /* GraphQL */ `
  mutation DeleteContestant(
    $input: DeleteContestantInput!
    $condition: ModelContestantConditionInput
  ) {
    deleteContestant(input: $input, condition: $condition) {
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
