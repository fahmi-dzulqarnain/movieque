import { createContext, useContext } from "react"
import { RootStore } from "./root-store"

/**
 * Create a context we can use to
 * - Provide access to our stores from our root component
 * - Consume stores in our screens (or other components, though it's
 *   preferable to just connect screens)
 */
const RootStoreContext = createContext<RootStore>({} as RootStore)

/**
 * The provider our root component will use to expose the root store
 */
export const RootStoreProvider = RootStoreContext.Provider

/**
 * A hook that screens can use to gain access to our stores, with
 * `const { someStore, someOtherStore } = useStores()`,
 * or less likely: `const rootStore = useStores()`
 */
export const useStores = () => useContext(RootStoreContext)
export var movieId = 1
export const setMovieId = (movie_id: number) => {
    movieId = movie_id
}
export var timeId = 3
export const setTimeId = (time_id: number) => {
    timeId = time_id
}