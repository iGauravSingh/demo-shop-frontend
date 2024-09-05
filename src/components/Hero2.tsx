import { useState } from 'react'




const heroData = [
    {id: 1, title1: 'Super Sale',title2: 'Enjoy our super Sale.',description: '', image: "/sale.jpg"},
    {id: 2, title1: 'Weekend Sale',title2: '',description: 'Enjoy special sale on weekend', image: "sale2.jpg"}
]

const Hero2 = () => {

    const [heroDataState, setHeroDataState] = useState(0)

    const handleFirst = () => {
        setHeroDataState(0)
    }

    const handleSecond = () => {
        setHeroDataState(1)
    }

  return (
    <div className=' relative w-screen'>
        {/* image  */}
        <div className='w-full'>
            <img className=' w-full h-[300px] md:h-[500px] object-left md:object-cover brightness-75' src={heroData[heroDataState].image} alt="hero" />
        </div>

        {/* image data  */}
        <div className=' absolute top-[50%] left-0 -translate-y-1/2 flex flex-col font-poppins gap-6 pl-4 md:pl-32 '>
            <div className=' flex flex-col gap-1 md:gap-2'>
            <h2 className='text-xl md:text-6xl text-white'>{heroData[heroDataState].title1}</h2>
            <h2 className='text-xl text-white'>{heroData[heroDataState].title2}</h2>
            <p className=' text-sm text-white'>{heroData[heroDataState].description}</p>
            </div>
            <button className=' px-4 py-2 bg-red-500 text-white'>Shop Now</button>
        </div>

        {/* image changer bottom  */}
        <div className=' absolute bottom-1 left-[50%] -translate-x-1/2 flex gap-2'>
            <div onClick={handleFirst} className={` w-3 h-3 rounded-full ${heroDataState === 0 ? 'bg-cyan-500' : 'bg-slate-500'} border shadow-sm cursor-pointer`}></div>
            <div onClick={handleSecond} className={` w-3 h-3 rounded-full ${heroDataState === 1 ? 'bg-cyan-500' : 'bg-slate-500'} border shadow-sm cursor-pointer`}></div>
        </div>

    </div>
  )
}

export default Hero2