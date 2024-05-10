import { useToImage } from '@hcorta/react-to-image'
import { PropsWithChildren } from 'react'

export const IconBase({ children }: PropsWithChildren) => {
  const { ref, isLoading, getSvg } = useToImage()

    return (
      <div ref={ref}>
        <h1>My title</h1>
        <button onClick={getSvg}>Download SVG</button>
        {isLoading && 'loading...'}
      </div>
    )
}
