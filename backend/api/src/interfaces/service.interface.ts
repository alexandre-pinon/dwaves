import { CoverMetadata, MusicMetadata } from '@@types/pinata.type'
import { TokenType } from '@@types/token.type'
import { UserAddressAndMonthlyListenings, ViewUser } from '@@types/user.type'
import { Album, Genre, Prisma, User } from '@prisma/client'
import { UploadedFile } from 'express-fileupload'
import { JwtPayload, SignOptions } from 'jsonwebtoken'

interface IService {}

export interface IUserService extends IService {
  exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[]
  ): Omit<User, Key>
  findMany: (where?: Prisma.UserWhereInput) => Promise<ViewUser[]>
  findFirst: (
    where: Prisma.UserWhereInput,
    includePassword?: boolean
  ) => Promise<User | ViewUser | null>
  create: (user: Prisma.UserCreateInput) => Promise<ViewUser>
  findArtistsMonthlyListenings: (
    startDate: Date,
    endDate: Date
  ) => Promise<UserAddressAndMonthlyListenings[]>
  signToken: (user: User) => { accessToken: string; refreshToken: string }
  verifyPassword: (
    hashedPassword: string,
    candidatePassword: string
  ) => Promise<boolean>
}

export interface IAlbumService extends IService {
  findMany: (where?: Prisma.AlbumWhereInput) => Promise<Album[]>
  create: (album: Prisma.AlbumCreateInput) => Promise<Album>
}

export interface IGenreService extends IService {
  findMany: (where?: Prisma.GenreWhereInput) => Promise<Genre[]>
  findUnique: (where: Prisma.GenreWhereUniqueInput) => Promise<Genre | null>
  create: (genre: Prisma.GenreCreateInput) => Promise<Genre>
}

export interface IPinataService extends IService {
  pinFileToIPFS: (
    file: UploadedFile,
    metadata: CoverMetadata | MusicMetadata
  ) => Promise<string>
}

export interface ITokenService extends IService {
  signJwt: (
    payload: JwtPayload,
    tokenType: TokenType,
    options?: SignOptions
  ) => string
  verifyJwt: <T>(token: string, tokenType: TokenType) => T | null
}