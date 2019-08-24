import React, { useState, useRef, useEffect } from 'react'
import SEO from '../../components/seo'
import Layout from '../../containers/layout'
import Panel from '../../components/Panel'
import cities from '../_cities'
import useImage from 'use-image'
import { Stage, Layer, Image as KonvaImage, Text, Circle, Line } from 'react-konva'
import domtoimage from 'dom-to-image'
import City from '../../components/City'
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
const Generator = ({ location }) => {
  const [selectedCity, setCity] = useState(null)
  const dom = useRef(null)

  useEffect(() => {
    domtoimage
      .toPng(dom.current)
      .then(function(dataUrl) {
        var img = new Image()
        img.src = dataUrl
        console.log(dataUrl)
      })
      .catch(function(error) {
        console.error('oops, something went wrong!', error)
      })
  }, [selectedCity])

  const { site } = location.state || {
    site: {
      title: 'QueerJS',
      description: 'A meetup for everyone where Queer Speakers take the stage'
    }
  }

  const getCity = e => {
    const value = e.target.value
    const city = cities.find(city => city.city === value)

    setCity(city)

    console.log(city)
  }
  return (
    <Layout>
      <SEO title={site.title} description={site.description} />
      <main>
        <h1 hidden>Welcome to {site.title}</h1>
        <Panel heading="Generator">
          <p>
            Please add the city to <code>_cities.json</code> and select it from the dropdown
          </p>
          <select onChange={getCity}>
            <option selected>Please select a city</option>
            {cities.map((city, i) => (
              <option key={i} value={city.city}>
                {city.city}
              </option>
            ))}
          </select>
        </Panel>
        {selectedCity ? (
          <div
            css={`
              background: #1e1126;
            `}
            ref={dom}
          >
            <City {...selectedCity} />
          </div>
        ) : null}
      </main>
    </Layout>
  )
}

export default Generator
