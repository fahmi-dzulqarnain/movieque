import { MovieModel } from "./movie"

test("can be created", () => {
  const instance = MovieModel.create({
    movieId: 3,
    title: "Tenet"
  })

  expect(instance).toBeTruthy()
})
