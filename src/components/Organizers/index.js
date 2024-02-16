import React from 'react'

import {
  InlineRainbow,
  OrganizerPhoto,
  OrganizersGrid,
  Unstyled,
  ListItem,
  UnstyledLink
} from './elements'

const size = 100

const humanHref = (human) => {
  if (human.githubLink) {
    return `https://github.com/${human.githubLink}`
  }
  if (human.twitterLink || human.twitterHandle) {
    return `https://twitter.com/${human.twitterLink || human.twitterHandle}`
  }
}

const Organizers = ({ organizers }) => {
  return (
    <OrganizersGrid size={size}>
      {organizers.map((human) => (
        <ListItem key={human.name}>
          <UnstyledLink
            as="a"
            href={humanHref(human)}
            target="_blank"
            rel="noopener noreferrer"
            title={human.name}
          >
            <OrganizerPhoto size={size}>
              <InlineRainbow flag={human.colors} />
              <img
                width={size + 'px'}
                height={size + 'px'}
                src={`https://github.com/${human.githubLink}.png`}
                alt="Organizer"
              />
            </OrganizerPhoto>
            <Unstyled>{human.name}</Unstyled>
          </UnstyledLink>
        </ListItem>
      ))}
    </OrganizersGrid>
  )
}

export default Organizers
