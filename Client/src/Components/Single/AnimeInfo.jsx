import React, {useEffect, useState} from 'react'
import FlexAnimeItems from '../FlexAnimeItems'
import { FaShareAlt, FaPlay } from 'react-icons/fa'
import { getStudioAndSeasonOfAnime } from '../../api'
import { Link } from 'react-router-dom'
import { BiSolidPurchaseTag } from "react-icons/bi";

function AnimeInfo({anime}) {
  const [studioSeason, setStudioSeason] = useState([])

  useEffect(() => {
    const fetchStudioSeason = async () => {
      try {
        const data = await getStudioAndSeasonOfAnime(anime?.id)
        setStudioSeason(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchStudioSeason()
  }, [anime])

  return (
    <div className='w-full xl:h-screen relative text-white'>
      <img 
        src={anime?.bannerlink? anime.bannerlink : anime?.imagelink}
        alt={anime?.romaji_title}     
        className='w-full h-hidden xl:inline-block h-full object-cover'
        />
        <div className='xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0'>
          <div className='container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8'>
            <div className='xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden'>
                <img 
                    src={anime?.imagelink} 
                    alt={anime?.romaji_title} 
                    className='w-full h-full object-cover'
                />
            </div>
            <div className='col-span-2 md:grid grid-cols-5 gap-4 items-center'>
              <div className='col-span-3 flex flex-col gap-10'>
                {/* Title */}
                <h1 className='xl:text-4xl capitalize font-sans text-2xl font-bold'>
                    {anime?.english_title ? anime.english_title : anime?.romaji_title}
                </h1>
                {/* Flex Items */}
                <div className='flex items-center gap-4 font-medium text-dryGray'>
                 <div className='flex-colo bg-subMain text-xs px-2 py-1'>
                   HD 720P
                 </div>
                 <FlexAnimeItems anime={anime && anime}/>
                </div>
                {/* Description */}
                <p className='text-text text-sm leading-7'>
                  {anime?.description}
                </p>
                <div className='flex flex-cols-2'>
                  <div className='gap-4 p-2 text-bold'>
                    Seasons : 
                  </div>
                  <div className='gap-4 p-2 text-bold flex-1 flex items-center justify-left'>
                    {studioSeason?.length} 
                  </div>
                </div>
                
                <div className='flex flex-cols-2'>
                  <div className='gap-4 p-2 text-bold'>
                    Studios : 
                  </div>
                  <div className='gap-4 p-2 text-bold flex-1 flex items-center justify-center'>
                    {studioSeason?.length > 0 ? studioSeason.map((studio,index) => (
                      index === studioSeason.length - 1 ? (
                        <span key={index} className='capitalize'>
                        <Link to = '/'> {studio?.name}</Link></span>
                      ) : (
                        <span key={index} className='capitalize'>
                        <Link to = '/'> {studio?.name}</Link>,
                        </span>
                      )
                    )) : ''}
                  </div>
                </div>

                <div 
                    className='grid sm:grid-cols-5 grid-cols-3 gap-4 p-6 bg-main border border-gray-800 rounded-lg'>
                    {/*Options */}
                    <div className='col-span-1 flex-colo border-r border-border'>
                        <button className='w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20'>
                          <FaShareAlt/>
                        </button>
                    </div>
                    {/*status */}
                    <div className='col-span-2 flex-colo font-medium text-sm'>
                        <p>Premiered:{' '} <span className='ml-2 truncate'>{`${anime?.season} ${anime?.start_date.substring(0,4)}`}</span>
                        </p>
                    </div>
                    {/* Watch Button. Use conditional rendering here */}
                    <div className='sm:col-span-2 col-span-3 flex-justify-end font-medium text-sm'>
                      <Link to = {`/watch/${anime?.romaji_title}`} 
                            className='bg-dry py-4 hover:bg-subMain transitions border-2 border-subMain rounded-full flex-rows gap-4 w-full sm:py-3'>
                        <FaPlay className='w-3 h-3'/> Watch Trailer
                      </Link>
                    </div>
                </div>
              </div>
              <div className='col-span-2 md:mt-0 mt-2 flex justify-end'>
                <button className='md:w-1/4 w-full relative flex-colo bg-subMain hover:bg-transparent border-2 border-subMain transitions md:h-64 h-20 rounded font-medium'>
                  <div className='flex-rows gap-6 text-md uppercase tracking-widest absolute md:rotate-90 '>
                    Purchase <BiSolidPurchaseTag className="w-6 h-6"></BiSolidPurchaseTag>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AnimeInfo
