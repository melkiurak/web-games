import { gql} from '@apollo/client';

const GET_GAMES = gql `
  query {
    games {
      count
      edges {
        node {
          name
          objectId
          description
          date
          metacriticScore
          metacriticScoreMax
          price
          genre
          category{
            name
          }
          platform {
            ... on Element{
              value
            }
          }
          BackgroundTop {
            url
          }
          BannerImg {
            url
          }
          discount
          gameOfTheMonthDate
        }
      }
    }
  }
`
const GET_CATEGORY = gql `
  query{
    categoryGames{
      count
      edges {
        node {
          objectId
          name
          img {
            url
          }
          type
        }
      }
    }
  }
`

const GET_DISCOUNTS = gql `
    query{
      discounts{
        count 
        edges{
          node{
            name
            discountValue
            discountType
            startDate
            endDate
          }
        }
      }
    }
`

export { GET_GAMES, GET_CATEGORY, GET_DISCOUNTS}