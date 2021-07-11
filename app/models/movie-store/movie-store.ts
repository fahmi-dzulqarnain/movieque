import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { MovieApi } from "../../services/api/movie-api"
import { withEnvironment } from "../extensions/with-environment"
import { MovieModel, MoviesSnapshot, TicketModel, TicketSnapshot } from "../movie/movie"
import { timeId } from "../root-store/root-store-context"

export const MoviesStoreModel = types
  .model("MoviesStore")
  .props({
    movies: types.optional(types.array(MovieModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveMovies: (movieSnapshots: MoviesSnapshot[]) => {
      self.movies.replace(movieSnapshots)
    },
  }))
  .actions((self) => ({
    getMovies: async () => {
      const movieApi = new MovieApi(self.environment.api)
      const result = await movieApi.getMovies()

      if (result.kind === "ok") {
        self.saveMovies(result.movies)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

export const MovieStoreModel = types
  .model("MovieStore")
  .props({
    movie: types.optional(MovieModel, Object),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveMovies: (movieSnapshot: MoviesSnapshot) => {
      self.movie = movieSnapshot
    },
  }))
  .actions((self) => ({
    getMovie: async (movieId: number) => {
      const movieApi = new MovieApi(self.environment.api)
      const result = await movieApi.getMovie(movieId.toString())

      if (result.kind === "ok") {
        self.saveMovies(result.movie)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

export const TicketStoreModel = types
  .model("TicketStore")
  .props({
    ticket: types.optional(TicketModel, Object),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveTicket: (ticketSnapshot: TicketSnapshot) => {
      self.ticket = ticketSnapshot
    },
  }))
  .actions((self) => ({
    getMovie: async (movieId: number) => {
      const movieApi = new MovieApi(self.environment.api)
      const result = await movieApi.postTicket(movieId, timeId)

      if (result.kind === "ok") {
        self.saveTicket(result.ticket)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type MovieStoreType = Instance<typeof MovieStoreModel>
export interface MovieStore extends MovieStoreType {}
type MovieStoreSnapshotType = SnapshotOut<typeof MovieStoreModel>
export interface MovieStoreSnapshot extends MovieStoreSnapshotType {}
export const createMovieStoreDefaultModel = () => types.optional(MovieStoreModel, {})

type TicketStoreType = Instance<typeof TicketStoreModel>
export interface TicketStore extends TicketStoreType {}
type TicketStoreSnapshotType = SnapshotOut<typeof TicketStoreModel>
export interface TicketStoreSnapshot extends TicketStoreSnapshotType {}
export const createTicketStoreDefaultModel = () => types.optional(TicketStoreModel, {})

type MoviesStoreType = Instance<typeof MoviesStoreModel>
export interface MoviesStore extends MoviesStoreType {}
type MoviesStoreSnapshotType = SnapshotOut<typeof MoviesStoreModel>
export interface MoviesStoreSnapshot extends MoviesStoreSnapshotType {}
export const createMoviesStoreDefaultModel = () => types.optional(MoviesStoreModel, {})