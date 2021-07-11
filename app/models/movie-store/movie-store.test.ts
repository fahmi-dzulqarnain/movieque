import { MovieStoreModel } from "./movie-store"

test("can be created", () => {
  const instance = MovieStoreModel.create({})

  expect(instance).toBeTruthy()
})
