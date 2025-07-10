import React from 'react'
import MainCarousel from '../components/MainCarousel'
import AppLinkSection from '../components/ApplinkSection'
import FeatureSection from '../components/FeatureSection'
import CardGrid from '../components/CardGrid'
import ThreeDCarousel from '../components/ThreeDCarousel'
import ProductGrid from '../components/ProductGrid'
import ProductCarousel from '../components/ProductCarousel'
import DispatchCarousel from '../components/DispatchCarousel'
import VideoShopping from '../components/VideoShopping'
import CustomerStories from '../components/CustomerStoryCard'
import CustomerStoryCarousel from '../components/CustomerStoryCarousel'

const LandingPage = () => {
  return (<>
    <MainCarousel/>
    <AppLinkSection/>
    <FeatureSection/>
    <CardGrid apiUrl='/Jsons/DSC-Card.json'/>
    <ThreeDCarousel/>
    <ProductCarousel title='BestSeller Trends' 
      apiUrl='https://mvcgroup.in/api/public/products/' />    
    <DispatchCarousel title='Curated Collections' />
    <VideoShopping/>
    <ProductCarousel title='Most Wishlisted Styles on Sale'
     apiUrl='/Jsons/MostWishlisted.json' />
    <CardGrid apiUrl='/Jsons/StylesUnderBudget.json'/>
    <CustomerStoryCarousel apiUrl='/Jsons/customerStories.json'/>
    </>
  )
}

export default LandingPage