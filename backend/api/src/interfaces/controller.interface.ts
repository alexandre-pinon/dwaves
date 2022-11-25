import { RequestHandler } from 'express'

interface IController {}

export interface IAppController extends IController {
  healthcheck: RequestHandler
}

export interface IUserController extends IController {
  get: RequestHandler
  getMonthlyListenings: RequestHandler
}

export interface IAlbumController extends IController {
  get: RequestHandler
  create: RequestHandler
}

export interface IMusicController extends IController {
  createSingleMusic: RequestHandler
}
