/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getShow = /* GraphQL */ `
  query GetShow($id: ID!) {
    getShow(id: $id) {
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
export const listShows = /* GraphQL */ `
  query ListShows(
    $filter: ModelShowFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShows(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        seasons {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSeason = /* GraphQL */ `
  query GetSeason($id: ID!) {
    getSeason(id: $id) {
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
export const listSeasons = /* GraphQL */ `
  query ListSeasons(
    $filter: ModelSeasonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSeasons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getContestant = /* GraphQL */ `
  query GetContestant($id: ID!) {
    getContestant(id: $id) {
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
export const listContestants = /* GraphQL */ `
  query ListContestants(
    $filter: ModelContestantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContestants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        seasonID
        season {
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
  }
`;
