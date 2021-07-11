import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import { Movie, Ticket } from "../../models/movie/movie"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a single user by ID
   */

   async getMovie(movieId: number): Promise<Types.GetMovieResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`movie/view?id=${movieId}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const resultMovie: Movie = {
        movieId: response.data.movieId,
        title: response.data.name,
        subtitle: response.data.subtitle,
        description: response.data.description,
        rating: response.data.rating,
        duration: response.data.duration,
        category: response.data.category,
        studio: response.data.studio,
        imageUrl: response.data.imageUrl,
        // list_Showtimes: response.data.list_Showtimes
      }
      return { kind: "ok", movie: resultMovie }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async postTicket(movieId: number, timeId: number) {
    const response: ApiResponse<any> = await this.apisauce.post('/ticket/create', {
      'movieId': movieId,
      'timeId': timeId
    }, 
    {
      headers: {
        'Content-Type':'multipart/form-data'
      }
    })

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const resultTicket: Ticket = {
        ticketId: response.data.ticketId,
        title: response.data.title,
        imageUrl: response.data.imageUrl,
        studio: response.data.studio,
        createdAt: response.data.createdAt,
        showTimes: response.data.showTimes,
        ticketCode: response.data.ticketCode
        // list_Showtimes: response.data.list_Showtimes
      }
      return { kind: "ok", ticket: resultTicket }
    } catch {
      return { kind: "bad-data" }
    }
  }
  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = (raw) => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
