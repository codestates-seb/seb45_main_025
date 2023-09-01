import { BackgroundImageContainer } from './BackgroundImage.styled';

export default function BackgroundImage({ imgSrc, title }) {
  return (
    <BackgroundImageContainer backgroundImage={`url(${imgSrc})`}>
      {title}
    </BackgroundImageContainer>
  )
}