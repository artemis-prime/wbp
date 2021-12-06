import React from 'react'
import ReactPlayer from 'react-player'

const Video: React.FC<{
  url: string
  width: number
  height: number
  rightJustify: boolean
}> = ({ 
  url, 
  width, 
  height, 
  rightJustify 
}) => (
  <ReactPlayer
    url={url}
    width='100%'
    height={height}
    style={{
      display: 'flex',
      justifyContent: (rightJustify) ? 'flex-end' : 'flex-start'
    }}
    playing={true}
    loop={true}
    muted={true}
    controls={true}
    config={{
      file: {
        attributes: {
          style: {
            width,
            height
          }
        }
      }
    }}
  />
)

export default Video

