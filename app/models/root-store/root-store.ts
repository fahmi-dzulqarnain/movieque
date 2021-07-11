import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { MoviesStoreModel, MovieStoreModel, TicketStoreModel } from "../movie-store/movie-store"

/**
 * A RootStore model.
 */
// prettier-ignore
// export const RootStoreModel = types.model("RootStore").props({
//   characterStore: types.optional(CharacterStoreModel, {} as any),
// })
export const RootStoreModel = types.model("RootStore").props({
  moviesStore: types.optional(MoviesStoreModel, {} as any),
  movieStore: types.optional(MovieStoreModel, {}) as any,
  // ticketStore: types.optional(TicketStoreModel, {}) as any
})
/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}