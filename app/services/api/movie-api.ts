import { ApiResponse } from "apisauce"
import { Ticket } from "../../models/movie/movie"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { GetMovieResult, GetMoviesResult } from "./api.types"

const API_PAGE_SIZE = 50

export class MovieApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getMovies(): Promise<GetMoviesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "https://tesuto.vkp.co.id/api/movie",
        { amount: API_PAGE_SIZE },
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      } 

      const movies = response.data.data
      return { kind: "ok", movies }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getMovie(movieId: string): Promise<GetMovieResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "https://tesuto.vkp.co.id/api/movie/view?id=" + movieId,
        { amount: API_PAGE_SIZE },
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      } 

      const movie = response.data.data
      return { kind: "ok", movie: movie }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async postTicket(movieId: number, timeId: number) {
    const response: ApiResponse<any> = await this.api.apisauce.post('/ticket/create', {
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
      }
      return { kind: "ok", ticket: resultTicket }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
