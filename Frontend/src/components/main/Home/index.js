import React from 'react'
import { Featured } from './Featured'
import { HomeHero } from './HomeHero'
import { Releases } from './Releases'
import { LimeLight } from './LimeLight'
import { StayOfCurve } from './StayOfCurve'
import { TrendingCollections } from './TrendingCollections'
import { OriginalBar } from './OriginalBar'
import { Empowering } from './Empowering'

export const Home = () => {
const styles = { display: 'flex',justifyContent: 'center',marginTop:50,marginBottom:50}
  return (
    <>
      <div style = {styles}>
        <OriginalBar/>
      </div>
      <Releases />
      <HomeHero />
      <Featured /> 
      {/* <LimeLight /> */}
      {/* <StayOfCurve /> */}
      {/* <TrendingCollections /> */}
      <Empowering />
    </>
  )
}
