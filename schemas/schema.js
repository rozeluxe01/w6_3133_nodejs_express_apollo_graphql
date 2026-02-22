// schemas/schema.js

const movieSchema = `#graphql
  type Movie {
    id: ID!
    name: String!
    director_name: String!
    production_house: String!
    release_date: String!
    rating: Float!
    movie_age: Int
    summary: String
  }

  type Query {
    getAllMovies: [Movie]
    getMovieById(id: ID!): Movie
    getMoviesByDirector(director_name: String!): [Movie]
  }

  type Mutation {
    addMovie(
      name: String!
      director_name: String!
      production_house: String!
      release_date: String!
      rating: Float!
    ): Movie

    updateMovie(
      id: ID!
      name: String
      director_name: String
      production_house: String
      release_date: String
      rating: Float
    ): Movie

    deleteMovie(id: ID!): String
  }
`;

export default movieSchema;