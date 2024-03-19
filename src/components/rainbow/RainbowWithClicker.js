import React from 'react'
import Rainbow from './Rainbow'

import { useRainbow } from '../../helpers/useRainbow'

const RainbowWithClicker = ({ className, flag, ...props }) => {
  const [stripes, { cycle }] = useRainbow()
  return (
    <Rainbow
      {...props}
      stripes={flag || stripes}
      style={{ cursor: 'pointer', ...props.styles }}
      className={className}
      onClick={() => !flag && cycle()}
    />
  )
}

export default RainbowWithClicker
