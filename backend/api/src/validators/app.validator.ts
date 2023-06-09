import { FileType } from '@@types/pinata.type'
import AppError from '@errors/app.error'
import ValidatorError from '@errors/validator.error'
import { IAppValidator } from '@interfaces/validator.interface'
import genreService from '@services/genre.service'
import { RequestHandler } from 'express'
import { FileArray } from 'express-fileupload'
import {
  CustomSanitizer,
  CustomValidator,
  validationResult,
} from 'express-validator'
import { StatusCodes } from 'http-status-codes'

export class AppValidator implements IAppValidator {
  validate: RequestHandler = (req, _, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new ValidatorError(errors.array(), StatusCodes.BAD_REQUEST)
    }
    next()
  }

  hasOneFile =
    (filetype: FileType): CustomValidator =>
    (_, { req }) => {
      this._hasFiles(req.files, filetype)

      if (req.files[filetype].length > 1) {
        throw new AppError(
          `Only supporting single ${filetype} upload`,
          StatusCodes.BAD_REQUEST
        )
      }

      return true
    }

  hasFiles =
    (filetype: FileType): CustomValidator =>
    (_, { req }) =>
      this._hasFiles(req.files, filetype)

  hasOneFileOptional =
    (filetype: FileType): CustomValidator =>
    (_, meta) =>
      meta.req.files ? this.hasOneFile(filetype)(_, meta) : true

  toValidGenre: CustomSanitizer = (name: string) =>
    this._toValidGenre(name, StatusCodes.CONFLICT)

  toValidGenreIfExist: CustomSanitizer = (name: string) =>
    name ? this._toValidGenre(name, StatusCodes.UNPROCESSABLE_ENTITY) : null

  private _toValidGenre = async (name: string, status: StatusCodes) => {
    const genre = await genreService.findUnique({ name })
    if (!genre) {
      throw new AppError('Invalid genre', status)
    }
    return genre
  }

  private _hasFiles = (files: FileArray, filetype: FileType) => {
    if (!files || !files[filetype]) {
      throw new AppError(
        `${filetype} not found in request`,
        StatusCodes.BAD_REQUEST
      )
    }

    return true
  }
}

const appValidator = new AppValidator()

export default appValidator
