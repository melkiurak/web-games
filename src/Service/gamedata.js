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
export { GET_GAMES, GET_CATEGORY}