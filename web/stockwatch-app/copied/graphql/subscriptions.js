/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateShow = /* GraphQL */ `
  subscription OnCreateShow {
    onCreateShow {
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
          name
          currentWeek
          status
          closesAt
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
export const onUpdateShow = /* GraphQL */ `
  subscription OnUpdateShow {
    onUpdateShow {
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
          name
          currentWeek
          status
          closesAt
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
export const onDeleteShow = /* GraphQL */ `
  subscription OnDeleteShow {
    onDeleteShow {
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
          name
          currentWeek
          status
          closesAt
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
export const onCreateSeason = /* GraphQL */ `
  subscription OnCreateSeason {
    onCreateSeason {
      id
      showID
      startDate
      endDate
      shortName
      name
      currentWeek
      status
      closesAt
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
export const onUpdateSeason = /* GraphQL */ `
  subscription OnUpdateSeason {
    onUpdateSeason {
      id
      showID
      startDate
      endDate
      shortName
      name
      currentWeek
      status
      closesAt
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
export const onDeleteSeason = /* GraphQL */ `
  subscription OnDeleteSeason {
    onDeleteSeason {
      id
      showID
      startDate
      endDate
      shortName
      name
      currentWeek
      status
      closesAt
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
export const onCreateContestant = /* GraphQL */ `
  subscription OnCreateContestant {
    onCreateContestant {
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
        name
        currentWeek
        status
        closesAt
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
export const onUpdateContestant = /* GraphQL */ `
  subscription OnUpdateContestant {
    onUpdateContestant {
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
        name
        currentWeek
        status
        closesAt
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
export const onDeleteContestant = /* GraphQL */ `
  subscription OnDeleteContestant {
    onDeleteContestant {
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
        name
        currentWeek
        status
        closesAt
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
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage {
    onCreateImage {
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
          name
          currentWeek
          status
          closesAt
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
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage {
    onUpdateImage {
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
          name
          currentWeek
          status
          closesAt
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
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage {
    onDeleteImage {
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
          name
          currentWeek
          status
          closesAt
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePlayer = /* GraphQL */ `
  subscription OnCreatePlayer {
    onCreatePlayer {
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
        name
        currentWeek
        status
        closesAt
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
export const onUpdatePlayer = /* GraphQL */ `
  subscription OnUpdatePlayer {
    onUpdatePlayer {
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
        name
        currentWeek
        status
        closesAt
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
export const onDeletePlayer = /* GraphQL */ `
  subscription OnDeletePlayer {
    onDeletePlayer {
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
        name
        currentWeek
        status
        closesAt
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
export const onCreateStock = /* GraphQL */ `
  subscription OnCreateStock {
    onCreateStock {
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
          name
          currentWeek
          status
          closesAt
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
          name
          currentWeek
          status
          closesAt
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
export const onUpdateStock = /* GraphQL */ `
  subscription OnUpdateStock {
    onUpdateStock {
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
          name
          currentWeek
          status
          closesAt
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
          name
          currentWeek
          status
          closesAt
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
export const onDeleteStock = /* GraphQL */ `
  subscription OnDeleteStock {
    onDeleteStock {
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
          name
          currentWeek
          status
          closesAt
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
          name
          currentWeek
          status
          closesAt
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
export const onCreateRating = /* GraphQL */ `
  subscription OnCreateRating {
    onCreateRating {
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
        name
        currentWeek
        status
        closesAt
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
          name
          currentWeek
          status
          closesAt
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
          name
          currentWeek
          status
          closesAt
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
export const onUpdateRating = /* GraphQL */ `
  subscription OnUpdateRating {
    onUpdateRating {
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
        name
        currentWeek
        status
        closesAt
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
          name
          currentWeek
          status
          closesAt
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
          name
          currentWeek
          status
          closesAt
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
export const onDeleteRating = /* GraphQL */ `
  subscription OnDeleteRating {
    onDeleteRating {
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
        name
        currentWeek
        status
        closesAt
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
          name
          currentWeek
          status
          closesAt
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
          name
          currentWeek
          status
          closesAt
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
export const onCreatePrice = /* GraphQL */ `
  subscription OnCreatePrice {
    onCreatePrice {
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
        name
        currentWeek
        status
        closesAt
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
          name
          currentWeek
          status
          closesAt
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
export const onUpdatePrice = /* GraphQL */ `
  subscription OnUpdatePrice {
    onUpdatePrice {
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
        name
        currentWeek
        status
        closesAt
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
          name
          currentWeek
          status
          closesAt
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
export const onDeletePrice = /* GraphQL */ `
  subscription OnDeletePrice {
    onDeletePrice {
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
        name
        currentWeek
        status
        closesAt
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
          name
          currentWeek
          status
          closesAt
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
export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction {
    onCreateTransaction {
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
          name
          currentWeek
          status
          closesAt
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
          name
          currentWeek
          status
          closesAt
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
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction {
    onUpdateTransaction {
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
          name
          currentWeek
          status
          closesAt
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
          name
          currentWeek
          status
          closesAt
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
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction {
    onDeleteTransaction {
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
          name
          currentWeek
          status
          closesAt
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
          name
          currentWeek
          status
          closesAt
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
export const onCreateLeaderboard = /* GraphQL */ `
  subscription OnCreateLeaderboard {
    onCreateLeaderboard {
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
        name
        currentWeek
        status
        closesAt
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
          name
          currentWeek
          status
          closesAt
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
export const onUpdateLeaderboard = /* GraphQL */ `
  subscription OnUpdateLeaderboard {
    onUpdateLeaderboard {
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
        name
        currentWeek
        status
        closesAt
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
          name
          currentWeek
          status
          closesAt
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
export const onDeleteLeaderboard = /* GraphQL */ `
  subscription OnDeleteLeaderboard {
    onDeleteLeaderboard {
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
        name
        currentWeek
        status
        closesAt
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
          name
          currentWeek
          status
          closesAt
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
