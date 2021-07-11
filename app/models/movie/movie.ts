import { Instance, SnapshotOut, types } from "mobx-state-tree"

const TimeModel = types.model("Time").props({
  timeId: types.integer,
  showTime: types.string
})

export const MovieModel = types.model("Movie").props({
  movieId: types.identifierNumber,
  title: types.maybe(types.string),
  subtitle: types.maybe(types.string),
  description: types.maybe(types.string),
  rating: types.maybe(types.integer),
  duration: types.maybe(types.integer),
  category: types.maybe(types.string),
  studio: types.maybe(types.string),
  imageUrl: types.maybe(types.string),
  //list_Showtimes: types.array(TimeModel)
})

export const TicketModel = types.model("Ticket").props({
  ticketId: types.identifierNumber,
  title: types.maybe(types.string),
  imageUrl: types.maybe(types.string),
  studio: types.maybe(types.string),
  createdAt: types.maybe(types.string),
  showTimes: types.maybe(types.string),
  ticketCode: types.maybe(types.string)
})

type MovieType = Instance<typeof MovieModel>
export interface Movie extends MovieType {}
type MovieSnapshotType = SnapshotOut<typeof MovieModel>
export interface MoviesSnapshot extends MovieSnapshotType {}
export const createMovieDefaultModel = () => types.optional(MovieModel, {})

type TimeType = Instance<typeof TimeModel>
export interface Time extends TimeType {}
type TimeSnapshotType = SnapshotOut<typeof TimeModel>
export interface TimeSnapshot extends TimeSnapshotType {}
export const createTimeDefaultModel = () => types.optional(TimeModel, {})

type TicketType = Instance<typeof TicketModel>
export interface Ticket extends TicketType {}
type TicketSnapshotType = SnapshotOut<typeof TicketModel>
export interface TicketSnapshot extends TicketSnapshotType {}
export const createTicketDefaultModel = () => types.optional(TicketModel, {})