import React, { FC } from 'react'
import { FormattedEvents } from '../models'

interface Props {
  allMyEvents: {
    name: string
    date: string
    daysUntilConcert: string
    place: string
    genre: string
    totalTickets: number
    price: number
    ticketSold: number
  }[]
}

const TheEvent = ({ event }: any) => {
  return (
    <div className="card bg-gray-50 border mx-2 my-4 hover:bg-teal-300">
      <div className="absolute pl-5 pt-3 w-80">
        <p className="text-3xl text-white font-bold">{event.name}</p>
        <p className="pt-3 text-white text-xl">{event.date}</p>
        {/*<p>{event.daysUntilConcert}</p>*/}
        <p className="pt-1 text-white text-xl">{event.place}</p>
        <p className="pt-1 text-white text-xl">{event.genre}</p>
        <p className="pt-1 text-white text-xl">
          {event.ticketSold}/{event.totalTickets} tickets sold
        </p>
        {/*<p className="pt-1 text-white text-2xl font-bold">*/}
        {/*  {event.price} Vibes*/}
        {/*</p>*/}
      </div>
      <div>
        <img src="./../../concertTemplate.png" alt="" width={600} />
      </div>
    </div>
  )
}

export const YourConcerts: FC<Props> = ({ allMyEvents }) => {
  return (
    <div className="h-[95%] overflow-scroll">
      <h1 className="text-center text-3xl mb-5">
        Your future Decentralized Concerts !
      </h1>
      <div className="flex flex-row flex-wrap">
        {allMyEvents.length > 0 && allMyEvents.map((myEvent) => (
          <div key={myEvent.name} className="w-1/3">
            <TheEvent event={myEvent} />
          </div>
        ))}
      </div>
    </div>
  )
}
