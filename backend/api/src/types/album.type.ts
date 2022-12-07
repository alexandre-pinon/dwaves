import { Album, Prisma } from '@prisma/client'

export type AlbumCreateInput = Omit<Prisma.AlbumCreateInput, 'coverCID'>

export type ViewAlbum = Omit<
  Album,
  'artistId' | 'genreId' | 'updatedAt' | 'coverCID'
> & {
  genre: string
  artist: string
  cover: string
  subscribers: number
}
