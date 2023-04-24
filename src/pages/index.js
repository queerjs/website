import React from 'react'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Panel, { LargeParagraph } from '../components/Panel'
import City, { Cities } from '../components/City'

import { isFuture, isToday } from 'date-fns'
import { graphql } from 'gatsby'

const IndexPage = ({ data: { allEvent } }) => {
  const sortedCities = allEvent.edges
    .sort((a, b) => new Date(a.node.info.date) - new Date(b.node.info.date))
    .reverse()
  const futureMeetups = sortedCities.filter(
    (city) => isFuture(new Date(city.node.info.date)) || isToday(new Date(city.node.info.date))
  )
  const pastMeetups = sortedCities.filter(
    (city) => !isFuture(new Date(city.node.info.date)) && !isToday(new Date(city.node.info.date))
  )

  return (
    <Layout>
      <SEO
        title={'QueerJS'}
        description={'A meetup for everyone where Queer Speakers take the stage'}
      />
      <Panel>
        <LargeParagraph>
          QueerJS is a meetup series where everyone is encouraged to attend and support the speakers and the idea.
          <br />
          <br />
          If you're queer and want to speak this meetup is for you! It exists to give you a voice and to make a safe space where everyone is welcome.
        </LargeParagraph>
        <LargeParagraph>
          Join us! There will be food and stickers{' '}
          <span role="img" aria-label="Queer Rainbow">
            🌈
          </span>
        </LargeParagraph>
      </Panel>
      {futureMeetups.length ? (
        <Panel wide heading="Upcoming meetups">
          <Cities>
            {futureMeetups.map(({ node }) => (
              <City {...node.info} key={node.id} />
            ))}
          </Cities>
        </Panel>
      ) : null}
      {pastMeetups.length ? (
        <Panel wide heading="Past Meetups">
          <Cities>
            {pastMeetups.map(({ node }) => (
              <City {...node.info} past key={node.id} />
            ))}
          </Cities>
        </Panel>
      ) : null}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allEvent {
      edges {
        node {
          id
          info {
            city
            link
            date
            bySeason
            hour
            hostName
            hour
            icon {
              publicURL
            }
            iconHover {
              publicURL
            }
            hostIcon {
              publicURL
            }
          }
        }
      }
    }
  }
`
