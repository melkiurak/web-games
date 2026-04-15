import { gql} from '@apollo/client';

interface gameFetch {
  [key: string]: string | number | boolean | undefined;
}

const getGames = async(params:gameFetch) => {
  try{
    const searchParams = new URLSearchParams(params as any)
    const response = await fetch(`http://localhost:3000/games?${searchParams.toString()}`);
    return  response.json()
  } catch (error) {
    console.log('Error to get the game:', error)
    return [];
  }
}

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
        genre {
          ...on Element {
            value
          }
        }
        category {
          name
        }
        platform {
          ...on Element {
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
        MinimumSystemRequirments
        RecommendedSystemRequirments
        Trailler
        TraillerImg {
          img1 {
            url
          }
          img2 {
            url
          }
          img3 {
            url
          }
        }
        Reviews
        Comments
        Publisher
        players {
          ...on Element {
            value
          }
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
const GET_UPCOMING_GAMES = gql`
  query {
    upcomingGames {
      count
      edges {
        node {
          name
          bannerGame{
            url
          }
          date
        }
      }
    }
  }

`
const GET_NEWS_GAMES = gql`
query {
  news {
    count
    edges {
      node {
        objectId
        Date
        genre{
          ...on Element{
            value
          }
        }
        Background{
          url
        }
        Title
      	}
      }
    }
  }
`
export { getGames}