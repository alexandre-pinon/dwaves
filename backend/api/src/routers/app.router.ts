import { Router } from 'express'

import { deserializeUser } from '@middlewares/auth.middleware'
import userRouter from '@routers/user.router'
import albumRouter from '@routers/album.router'
import musicRouter from '@routers/music.router'
import authRouter from '@routers/auth.router'
import genreRouter from '@routers/genre.router'
import appController from '@controllers/app.controller'
import playlistRouter from '@routers/playlist.router'
import eventRouter from '@routers/event.router'

const appRouter = Router()

appRouter.get('/', appController.healthcheck)
appRouter.use('/auth', authRouter)
appRouter.use('/albums', albumRouter)
appRouter.use('/playlists', playlistRouter)

appRouter.use(deserializeUser)

appRouter.use('/users', userRouter)
appRouter.use('/musics', musicRouter)
appRouter.use('/genres', genreRouter)
appRouter.use('/events', eventRouter)

export default appRouter
