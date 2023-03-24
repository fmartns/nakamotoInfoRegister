import React, { useRef, useEffect } from 'react'
import AddData from './AddData'
import AddNakamotoData from './AddNakamotoData'
import style from './AddData.module.css'
import { Card } from '@material-ui/core'

export default function Add(props) {
    const cardRef = useRef()
  const {
    userBio,
    setuserBio,
    addUpdateuserBio,
    NakamotoData,
    setNakamotoData,
    addUpdateNakamotoData,
  } = props

  useEffect(() => {
    if(cardRef.current.scrollLeft > 0)
    window.addEventListener('resize', correctPosition)
    return () => {
      window.removeEventListener('resize', correctPosition)
    }
  }, [])

  const correctPosition = () => {
    cardRef.current.scrollTo(cardRef.current.scrollWidth/2,0)
  }

  const next = () => {
    cardRef.current.scrollBy(1000000,0)
  }
  const handleBack = () => {
    console.log(cardRef.current.scrollWidth)
    cardRef.current.scrollTo(0,0)
}
  return (
    <div>
      <Card className={style.cardsContainer} ref={cardRef}>
      <AddData
        userBio={userBio}
        setuserBio={(obj) => setuserBio(obj)}
        addUpdateuserBio={addUpdateuserBio}
        next={next}
      />
      <AddNakamotoData
        NakamotoData={NakamotoData}
        setNakamotoData={(obj) => setNakamotoData(obj)}
        addUpdateNakamotoData={addUpdateNakamotoData}
        handleBack={handleBack}
      />
      </Card>
    </div>
  )
}
