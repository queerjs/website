import React from 'react'
import useHover from '../../helpers/useHover'
import Helmet from 'react-helmet'

import { Wrapper, sizes, CityInfo, CityIcon, Cities, Name, MeetupDate, Host } from './elements'

const City = ({ past, city, link, date, bySeason, icon, iconHover, hostIcon, hostName }) => {
  const [hoverRef, isHovering] = useHover()

  return (
    <Wrapper
      itemScope
      itemType="http://schema.org/Event"
      title={`QueerJS ${city}`}
      to={`/${link}`}
      innerRef={hoverRef}
    >
      <CityIcon>
        {isHovering && !past ? (
          <img src={iconHover.publicURL} className="animated bounceIn" css={sizes} alt={city} />
        ) : (
          <img css={sizes} src={icon.publicURL} alt={city} />
        )}
        {!past && (
          <Helmet>
            <link rel="preload" href={iconHover.publicURL} as="image" />
          </Helmet>
        )}
      </CityIcon>
      <CityInfo>
        <MeetupDate itemprop={date} content={date} past={past}>
          {bySeason ? <span>{bySeason}</span> : date}
        </MeetupDate>
        <Name past={past} itemprop="name">
          {city}
        </Name>
        {hostIcon && <Host past={past} src={hostIcon.publicURL} alt={hostName} />}
      </CityInfo>
    </Wrapper>
  )
}

export default City

export { Cities }
