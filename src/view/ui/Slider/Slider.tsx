import * as RSlider from '@radix-ui/react-slider'
import s from './Slider.module.scss'
import { useState } from 'react'
type SliderPropsType = {
  onSubmit: (handleOnSubmit: number[]) => void
  // cleanOnSubmit: boolean
}

export const Slider = ({ onSubmit }: SliderPropsType) => {
  const [minMaxCardsInDecks, setMinMaxCardsInDecks] = useState<number[]>([0, 100])
  console.log('render')
  const handleUpdate = (newValues: number[]) => {
    setMinMaxCardsInDecks(newValues)
  }

  const handleOnSubmit = () => {
    onSubmit(minMaxCardsInDecks)
  }

  return (
    // <form>
    <div className={s.sliderContainer}>
      <span>{minMaxCardsInDecks?.[0]}</span>
      <RSlider.Root
        className={s.SliderRoot}
        defaultValue={[0, 100]}
        max={100}
        step={1}
        value={minMaxCardsInDecks}
        minStepsBetweenThumbs={10}
        onValueChange={handleUpdate}
        onValueCommit={handleOnSubmit}
      >
        <RSlider.Track className={s.SliderTrack}>
          <RSlider.Range className={s.SliderRange} />
        </RSlider.Track>
        <RSlider.Thumb className={s.SliderThumb} />
        <RSlider.Thumb className={s.SliderThumb} />
      </RSlider.Root>
      <span>{minMaxCardsInDecks?.[1]}</span>
    </div>
    // </form>
  )
}
