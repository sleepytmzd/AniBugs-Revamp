import React from 'react'
import { useState, useEffect } from 'react' 
import {Autoplay} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import { getAllAnimes } from '../../api'
import FlexAnimeItems from '../FlexAnimeItems'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'

function Banner() {
    const[animes, setAnimes] = useState([])

    useEffect(() => {
        const fetchAnimes = async () => {
            const data = await getAllAnimes()
            setAnimes(data.animes)
        }
        fetchAnimes()
    },[])

    //console.log(animes) 
  return (
    <div className='relative w-full z-0'>
      <Swiper 
         direction='vertical'
         spaceBetween={0} 
         slidesPerView={1} 
         loop={true}  
         speed={1000}
         modules={[Autoplay]}
         autoplay={{delay : 4000, disableOnInteraction:false}}
         className='w-full xl:h-96 bg-dry lg:h-64 h-48'
        >
        {
            animes.slice(0,8).map((anime, index) => (
                <SwiperSlide key={index} className='relative rounded overflow-hidden'>
                   <img 
                   src= {anime?.bannerlink ? anime.bannerlink : anime?.imagelink} 
                   alt={anime?.romaji_title} className='w-full h-full object-cover'/>
                   <div className='absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0
                   left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4'
                   >
                    <h1 className='xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold'>
                        {anime?.romaji_title}
                    </h1>
                    <div className='flex gap-5 items-center text-dryGray'>
                        <FlexAnimeItems anime = {anime}/>
                    </div>
                    <div className='flex gap-5 items-center'>
                      <Link 
                        to = {`/anime/${anime?.romaji_title}`} 
                        className='bg-subMain hover:text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs'>
                        Watch Now
                      </Link>
                      <button className='bg-white hover:text-subMain transitions text-white px-4 py-3 rounded text-sm bg-opacity-30'>
                        <FaHeart/>
                      </button>
                    </div>
                   </div>
                </SwiperSlide>
            ))
        }
      </Swiper>
    </div>
  )
}

export default Banner
