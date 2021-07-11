import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { Movie, Ticket } from "../../models/movie/movie"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

export type GetMoviesResult = { kind: "ok"; movies: Movie[] } | GeneralApiProblem
export type GetMovieResult = { kind: "ok"; movie: Movie } | GeneralApiProblem

export type GetTicketResult = { kind: "ok"; ticket: Ticket } | GeneralApiProblem