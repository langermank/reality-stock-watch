/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const me = /* GraphQL */ `
  query Me {
    me {
      Username
      UserAttributes {
        Name
        Value
      }
      UserCreateDate
      UserLastModifiedDate
      Enabled
      UserStatus
      MFAOptions {
        DeliveryMedium
        AttributeName
      }
      PreferredMfaSetting
      UserMFASettingList
    }
  }
`;
export const profile = /* GraphQL */ `
  query Profile {
    profile {
      id
      profileCreated
      isBanned
      isAdmin
      displayName
      shows {
        seasonID
        displayName
        bankBalance
        stockValue
        stocks {
          contestantID
          contestantDisplayName
          shares
          sharePrice
        }
      }
      message
    }
  }
`;
export const getShow = /* GraphQL */ `
  query GetShow($id: ID!) {
    getShow(id: $id) {
      id
      name
      createdAt
      updatedAt
      seasons {
        items {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          nextMarketOpen
          nextMarketClose
          marketStatus
          lastBatchUpdate
          scheduledBatchUpdate
          createdAt
          updatedAt
        }
        nextToken
      }
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
        createdAt
        updatedAt
        seasons {
          nextToken
        }
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
      startDate
      endDate
      shortName
      currentWeek
      status
      nextMarketOpen
      nextMarketClose
      marketStatus
      lastBatchUpdate
      scheduledBatchUpdate
      createdAt
      updatedAt
      show {
        id
        name
        createdAt
        updatedAt
        seasons {
          nextToken
        }
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
      players {
        items {
          id
          userID
          seasonID
          bankBalance
          netWorth
          createdAt
          updatedAt
        }
        nextToken
      }
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
        startDate
        endDate
        shortName
        currentWeek
        status
        nextMarketOpen
        nextMarketClose
        marketStatus
        lastBatchUpdate
        scheduledBatchUpdate
        createdAt
        updatedAt
        show {
          id
          name
          createdAt
          updatedAt
        }
        contestants {
          nextToken
        }
        players {
          nextToken
        }
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
      firstName
      lastName
      nickName
      image
      status
      slug
      createdAt
      updatedAt
      season {
        id
        showID
        startDate
        endDate
        shortName
        currentWeek
        status
        nextMarketOpen
        nextMarketClose
        marketStatus
        lastBatchUpdate
        scheduledBatchUpdate
        createdAt
        updatedAt
        show {
          id
          name
          createdAt
          updatedAt
        }
        contestants {
          nextToken
        }
        players {
          nextToken
        }
      }
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
        firstName
        lastName
        nickName
        image
        status
        slug
        createdAt
        updatedAt
        season {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          nextMarketOpen
          nextMarketClose
          marketStatus
          lastBatchUpdate
          scheduledBatchUpdate
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getImage = /* GraphQL */ `
  query GetImage($id: ID!) {
    getImage(id: $id) {
      id
      contestantID
      s3ObjectKey
      createdAt
      updatedAt
      contestant {
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
        season {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          nextMarketOpen
          nextMarketClose
          marketStatus
          lastBatchUpdate
          scheduledBatchUpdate
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        contestantID
        s3ObjectKey
        createdAt
        updatedAt
        contestant {
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
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      profileCreated
      isBanned
      isAdmin
      displayName
      email
      emailVerifiedAt
      password
      providerUserID
      provider
      avatarID
      lastSeen
      legacyNetWorth
      netWorth
      rank
      dummy
      createdAt
      updatedAt
      players {
        items {
          id
          userID
          seasonID
          bankBalance
          netWorth
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        profileCreated
        isBanned
        isAdmin
        displayName
        email
        emailVerifiedAt
        password
        providerUserID
        provider
        avatarID
        lastSeen
        legacyNetWorth
        netWorth
        rank
        dummy
        createdAt
        updatedAt
        players {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const usersByProvider = /* GraphQL */ `
  query UsersByProvider(
    $provider: String
    $providerUserID: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByProvider(
      provider: $provider
      providerUserID: $providerUserID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        profileCreated
        isBanned
        isAdmin
        displayName
        email
        emailVerifiedAt
        password
        providerUserID
        provider
        avatarID
        lastSeen
        legacyNetWorth
        netWorth
        rank
        dummy
        createdAt
        updatedAt
        players {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const usersByNetWorth = /* GraphQL */ `
  query UsersByNetWorth(
    $dummy: String
    $netWorth: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByNetWorth(
      dummy: $dummy
      netWorth: $netWorth
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        profileCreated
        isBanned
        isAdmin
        displayName
        email
        emailVerifiedAt
        password
        providerUserID
        provider
        avatarID
        lastSeen
        legacyNetWorth
        netWorth
        rank
        dummy
        createdAt
        updatedAt
        players {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPlayer = /* GraphQL */ `
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
      id
      userID
      seasonID
      bankBalance
      netWorth
      createdAt
      updatedAt
      season {
        id
        showID
        startDate
        endDate
        shortName
        currentWeek
        status
        nextMarketOpen
        nextMarketClose
        marketStatus
        lastBatchUpdate
        scheduledBatchUpdate
        createdAt
        updatedAt
        show {
          id
          name
          createdAt
          updatedAt
        }
        contestants {
          nextToken
        }
        players {
          nextToken
        }
      }
      user {
        id
        profileCreated
        isBanned
        isAdmin
        displayName
        email
        emailVerifiedAt
        password
        providerUserID
        provider
        avatarID
        lastSeen
        legacyNetWorth
        netWorth
        rank
        dummy
        createdAt
        updatedAt
        players {
          nextToken
        }
      }
      stocks {
        items {
          id
          playerID
          contestantID
          shares
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        seasonID
        bankBalance
        netWorth
        createdAt
        updatedAt
        season {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          nextMarketOpen
          nextMarketClose
          marketStatus
          lastBatchUpdate
          scheduledBatchUpdate
          createdAt
          updatedAt
        }
        user {
          id
          profileCreated
          isBanned
          isAdmin
          displayName
          email
          emailVerifiedAt
          password
          providerUserID
          provider
          avatarID
          lastSeen
          legacyNetWorth
          netWorth
          rank
          dummy
          createdAt
          updatedAt
        }
        stocks {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getStock = /* GraphQL */ `
  query GetStock($id: ID!) {
    getStock(id: $id) {
      id
      playerID
      contestantID
      shares
      createdAt
      updatedAt
      contestant {
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
        season {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          nextMarketOpen
          nextMarketClose
          marketStatus
          lastBatchUpdate
          scheduledBatchUpdate
          createdAt
          updatedAt
        }
      }
      player {
        id
        userID
        seasonID
        bankBalance
        netWorth
        createdAt
        updatedAt
        season {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          nextMarketOpen
          nextMarketClose
          marketStatus
          lastBatchUpdate
          scheduledBatchUpdate
          createdAt
          updatedAt
        }
        user {
          id
          profileCreated
          isBanned
          isAdmin
          displayName
          email
          emailVerifiedAt
          password
          providerUserID
          provider
          avatarID
          lastSeen
          legacyNetWorth
          netWorth
          rank
          dummy
          createdAt
          updatedAt
        }
        stocks {
          nextToken
        }
      }
    }
  }
`;
export const listStocks = /* GraphQL */ `
  query ListStocks(
    $filter: ModelStockFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStocks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        playerID
        contestantID
        shares
        createdAt
        updatedAt
        contestant {
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
        player {
          id
          userID
          seasonID
          bankBalance
          netWorth
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getRating = /* GraphQL */ `
  query GetRating($id: ID!) {
    getRating(id: $id) {
      id
      userID
      contestantID
      seasonID
      week
      rating
      createdAt
      updatedAt
      season {
        id
        showID
        startDate
        endDate
        shortName
        currentWeek
        status
        nextMarketOpen
        nextMarketClose
        marketStatus
        lastBatchUpdate
        scheduledBatchUpdate
        createdAt
        updatedAt
        show {
          id
          name
          createdAt
          updatedAt
        }
        contestants {
          nextToken
        }
        players {
          nextToken
        }
      }
      user {
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
        season {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          nextMarketOpen
          nextMarketClose
          marketStatus
          lastBatchUpdate
          scheduledBatchUpdate
          createdAt
          updatedAt
        }
      }
      contestant {
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
        season {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          nextMarketOpen
          nextMarketClose
          marketStatus
          lastBatchUpdate
          scheduledBatchUpdate
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listRatings = /* GraphQL */ `
  query ListRatings(
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRatings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        contestantID
        seasonID
        week
        rating
        createdAt
        updatedAt
        season {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          nextMarketOpen
          nextMarketClose
          marketStatus
          lastBatchUpdate
          scheduledBatchUpdate
          createdAt
          updatedAt
        }
        user {
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
        contestant {
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
      }
      nextToken
    }
  }
`;
export const getPrice = /* GraphQL */ `
  query GetPrice($id: ID!) {
    getPrice(id: $id) {
      id
      contestantID
      seasonID
      week
      price
      createdAt
      updatedAt
      season {
        id
        showID
        startDate
        endDate
        shortName
        currentWeek
        status
        nextMarketOpen
        nextMarketClose
        marketStatus
        lastBatchUpdate
        scheduledBatchUpdate
        createdAt
        updatedAt
        show {
          id
          name
          createdAt
          updatedAt
        }
        contestants {
          nextToken
        }
        players {
          nextToken
        }
      }
      contestant {
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
        season {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          nextMarketOpen
          nextMarketClose
          marketStatus
          lastBatchUpdate
          scheduledBatchUpdate
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listPrices = /* GraphQL */ `
  query ListPrices(
    $filter: ModelPriceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        contestantID
        seasonID
        week
        price
        createdAt
        updatedAt
        season {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          nextMarketOpen
          nextMarketClose
          marketStatus
          lastBatchUpdate
          scheduledBatchUpdate
          createdAt
          updatedAt
        }
        contestant {
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
      }
      nextToken
    }
  }
`;
export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
      id
      playerID
      contestantID
      week
      shares
      price
      createdAt
      updatedAt
      contestant {
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
        season {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          nextMarketOpen
          nextMarketClose
          marketStatus
          lastBatchUpdate
          scheduledBatchUpdate
          createdAt
          updatedAt
        }
      }
      player {
        id
        userID
        seasonID
        bankBalance
        netWorth
        createdAt
        updatedAt
        season {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          nextMarketOpen
          nextMarketClose
          marketStatus
          lastBatchUpdate
          scheduledBatchUpdate
          createdAt
          updatedAt
        }
        user {
          id
          profileCreated
          isBanned
          isAdmin
          displayName
          email
          emailVerifiedAt
          password
          providerUserID
          provider
          avatarID
          lastSeen
          legacyNetWorth
          netWorth
          rank
          dummy
          createdAt
          updatedAt
        }
        stocks {
          nextToken
        }
      }
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        playerID
        contestantID
        week
        shares
        price
        createdAt
        updatedAt
        contestant {
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
        player {
          id
          userID
          seasonID
          bankBalance
          netWorth
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getLeaderboard = /* GraphQL */ `
  query GetLeaderboard($id: ID!) {
    getLeaderboard(id: $id) {
      id
      seasonID
      playerID
      week
      rank
      rankPercentage
      netWorth
      stocks
      createdAt
      updatedAt
      season {
        id
        showID
        startDate
        endDate
        shortName
        currentWeek
        status
        nextMarketOpen
        nextMarketClose
        marketStatus
        lastBatchUpdate
        scheduledBatchUpdate
        createdAt
        updatedAt
        show {
          id
          name
          createdAt
          updatedAt
        }
        contestants {
          nextToken
        }
        players {
          nextToken
        }
      }
      player {
        id
        userID
        seasonID
        bankBalance
        netWorth
        createdAt
        updatedAt
        season {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          nextMarketOpen
          nextMarketClose
          marketStatus
          lastBatchUpdate
          scheduledBatchUpdate
          createdAt
          updatedAt
        }
        user {
          id
          profileCreated
          isBanned
          isAdmin
          displayName
          email
          emailVerifiedAt
          password
          providerUserID
          provider
          avatarID
          lastSeen
          legacyNetWorth
          netWorth
          rank
          dummy
          createdAt
          updatedAt
        }
        stocks {
          nextToken
        }
      }
    }
  }
`;
export const listLeaderboards = /* GraphQL */ `
  query ListLeaderboards(
    $filter: ModelLeaderboardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeaderboards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        seasonID
        playerID
        week
        rank
        rankPercentage
        netWorth
        stocks
        createdAt
        updatedAt
        season {
          id
          showID
          startDate
          endDate
          shortName
          currentWeek
          status
          nextMarketOpen
          nextMarketClose
          marketStatus
          lastBatchUpdate
          scheduledBatchUpdate
          createdAt
          updatedAt
        }
        player {
          id
          userID
          seasonID
          bankBalance
          netWorth
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
