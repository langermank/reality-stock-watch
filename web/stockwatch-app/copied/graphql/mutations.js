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
export const updateShow = /* GraphQL */ `
  mutation UpdateShow(
    $input: UpdateShowInput!
    $condition: ModelShowConditionInput
  ) {
    updateShow(input: $input, condition: $condition) {
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
export const deleteShow = /* GraphQL */ `
  mutation DeleteShow(
    $input: DeleteShowInput!
    $condition: ModelShowConditionInput
  ) {
    deleteShow(input: $input, condition: $condition) {
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
export const createSeason = /* GraphQL */ `
  mutation CreateSeason(
    $input: CreateSeasonInput!
    $condition: ModelSeasonConditionInput
  ) {
    createSeason(input: $input, condition: $condition) {
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
export const updateSeason = /* GraphQL */ `
  mutation UpdateSeason(
    $input: UpdateSeasonInput!
    $condition: ModelSeasonConditionInput
  ) {
    updateSeason(input: $input, condition: $condition) {
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
export const deleteSeason = /* GraphQL */ `
  mutation DeleteSeason(
    $input: DeleteSeasonInput!
    $condition: ModelSeasonConditionInput
  ) {
    deleteSeason(input: $input, condition: $condition) {
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
export const createContestant = /* GraphQL */ `
  mutation CreateContestant(
    $input: CreateContestantInput!
    $condition: ModelContestantConditionInput
  ) {
    createContestant(input: $input, condition: $condition) {
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
export const updateContestant = /* GraphQL */ `
  mutation UpdateContestant(
    $input: UpdateContestantInput!
    $condition: ModelContestantConditionInput
  ) {
    updateContestant(input: $input, condition: $condition) {
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
export const deleteContestant = /* GraphQL */ `
  mutation DeleteContestant(
    $input: DeleteContestantInput!
    $condition: ModelContestantConditionInput
  ) {
    deleteContestant(input: $input, condition: $condition) {
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
export const createImage = /* GraphQL */ `
  mutation CreateImage(
    $input: CreateImageInput!
    $condition: ModelImageConditionInput
  ) {
    createImage(input: $input, condition: $condition) {
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
export const updateImage = /* GraphQL */ `
  mutation UpdateImage(
    $input: UpdateImageInput!
    $condition: ModelImageConditionInput
  ) {
    updateImage(input: $input, condition: $condition) {
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
export const deleteImage = /* GraphQL */ `
  mutation DeleteImage(
    $input: DeleteImageInput!
    $condition: ModelImageConditionInput
  ) {
    deleteImage(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer(
    $input: CreatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    createPlayer(input: $input, condition: $condition) {
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
export const updatePlayer = /* GraphQL */ `
  mutation UpdatePlayer(
    $input: UpdatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    updatePlayer(input: $input, condition: $condition) {
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
export const deletePlayer = /* GraphQL */ `
  mutation DeletePlayer(
    $input: DeletePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    deletePlayer(input: $input, condition: $condition) {
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
export const createStock = /* GraphQL */ `
  mutation CreateStock(
    $input: CreateStockInput!
    $condition: ModelStockConditionInput
  ) {
    createStock(input: $input, condition: $condition) {
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
export const updateStock = /* GraphQL */ `
  mutation UpdateStock(
    $input: UpdateStockInput!
    $condition: ModelStockConditionInput
  ) {
    updateStock(input: $input, condition: $condition) {
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
export const deleteStock = /* GraphQL */ `
  mutation DeleteStock(
    $input: DeleteStockInput!
    $condition: ModelStockConditionInput
  ) {
    deleteStock(input: $input, condition: $condition) {
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
export const createRating = /* GraphQL */ `
  mutation CreateRating(
    $input: CreateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    createRating(input: $input, condition: $condition) {
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
export const updateRating = /* GraphQL */ `
  mutation UpdateRating(
    $input: UpdateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    updateRating(input: $input, condition: $condition) {
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
export const deleteRating = /* GraphQL */ `
  mutation DeleteRating(
    $input: DeleteRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    deleteRating(input: $input, condition: $condition) {
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
export const createPrice = /* GraphQL */ `
  mutation CreatePrice(
    $input: CreatePriceInput!
    $condition: ModelPriceConditionInput
  ) {
    createPrice(input: $input, condition: $condition) {
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
export const updatePrice = /* GraphQL */ `
  mutation UpdatePrice(
    $input: UpdatePriceInput!
    $condition: ModelPriceConditionInput
  ) {
    updatePrice(input: $input, condition: $condition) {
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
export const deletePrice = /* GraphQL */ `
  mutation DeletePrice(
    $input: DeletePriceInput!
    $condition: ModelPriceConditionInput
  ) {
    deletePrice(input: $input, condition: $condition) {
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
export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
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
export const updateTransaction = /* GraphQL */ `
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {
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
export const deleteTransaction = /* GraphQL */ `
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    deleteTransaction(input: $input, condition: $condition) {
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
export const createLeaderboard = /* GraphQL */ `
  mutation CreateLeaderboard(
    $input: CreateLeaderboardInput!
    $condition: ModelLeaderboardConditionInput
  ) {
    createLeaderboard(input: $input, condition: $condition) {
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
export const updateLeaderboard = /* GraphQL */ `
  mutation UpdateLeaderboard(
    $input: UpdateLeaderboardInput!
    $condition: ModelLeaderboardConditionInput
  ) {
    updateLeaderboard(input: $input, condition: $condition) {
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
export const deleteLeaderboard = /* GraphQL */ `
  mutation DeleteLeaderboard(
    $input: DeleteLeaderboardInput!
    $condition: ModelLeaderboardConditionInput
  ) {
    deleteLeaderboard(input: $input, condition: $condition) {
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
