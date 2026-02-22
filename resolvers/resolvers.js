// resolvers/resolvers.js
import Movie from "../models/Movie.js";   

const movieResolvers = {
  // Field resolvers for virtual + instance method
  Movie: {
    movie_age: (parent) => parent.movie_age,            // virtual property
    summary: (parent) => parent.getMovieSummary(),      // schema.methods
  },

  Query: {
    // a) Get all movies
    getAllMovies: async () => {
      return await Movie.find();
    },

    // b) Get movie by ID
    getMovieById: async (_, { id }) => {
      return await Movie.findById(id);
    },

    // c) Get movies by director (STATIC METHOD requirement)
    getMoviesByDirector: async (_, { director_name }) => {
      return await Movie.findByDirector(director_name); // your .statics
    },
  },

  Mutation: {
    // a) Insert new movie
    addMovie: async (_, args) => {
      const movie = new Movie(args);
      await movie.save();        // triggers pre('save') hook
      return movie;
    },

    // b) Update movie
    updateMovie: async (_, { id, ...updates }) => {
      const updated = await Movie.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
      return updated;            // null if not found
    },

    // c) Delete movie by ID
    deleteMovie: async (_, { id }) => {
      const deleted = await Movie.findByIdAndDelete(id);
      return deleted ? "Movie deleted successfully" : "Movie not found";
    },
  },
};

export default movieResolvers;