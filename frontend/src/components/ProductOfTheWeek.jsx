import React from 'react'
import Heading from './Heading'
import Cards from './Cards'

const ProductOfTheWeek = () => {
  return (
    <div>
      <Heading
        title="Products of the Week"
        subtitle="Discover our featured product! I don't have any time available to keep maintaining this package. If you have any request, try to sort."
      />

      <Cards />
    </div>
  )
}

export default ProductOfTheWeek
