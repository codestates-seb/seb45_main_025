import { useState } from 'react';
import {
  MainConceptStoryContainer,
  TextContainer,
  ImageContainer
} from './MainConceptStory.styled';
import { conceptStoryData } from '../../common/data/ConceptStoryData';

export default function MainConceptStory() {
  const [curIndex, setCurIndex] = useState(0);
  const [showContent, setShowContent] = useState(1);

  return (
    <MainConceptStoryContainer>
      <TextContainer>
        <div className='title'>CONCEPT STORY</div>
        <div className='title-description'>
          &#8220; I LOVE SNACKS I LOVE KOREAN SNACKS &#8221;
        </div>
        {conceptStoryData.map((data, index) => {
          if (index === curIndex) {
            return (
              <div key={data.title} className={showContent ? 'show' : 'hidden'} >
                <div className='content-title'>{data.title}</div>
                <div className='content-tags'>{data.tags.map(tag => <span key={tag}>#{tag}</span>)}</div>
                <div className='content-description'>{data.description}</div>
              </div>
            );
          }
          return null;
        })}
        <div className='button-container'>
          <button onClick={() => {
            setTimeout(() => {
              setShowContent(0);
              setTimeout(() => {
                setCurIndex((curIndex + conceptStoryData.length - 1) % conceptStoryData.length);
              }, 200);
              setTimeout(() => {
                setShowContent(1);
              }, 300);
            }, 0);
          }}>&#8249;</button>
          <button onClick={() => {
            setTimeout(() => {
              setShowContent(0);
              setTimeout(() => {
                setCurIndex((curIndex + 1) % conceptStoryData.length);
              }, 200);
              setTimeout(() => {
                setShowContent(1);
              }, 300);
            }, 0);
          }
          }>&#8250;</button>
        </div>
      </TextContainer>
      <ImageContainer>
        {conceptStoryData.map((data, idx) => {
          return (
            (idx === curIndex) ?
              <img src={data.image} alt="" key={idx} className={showContent ? 'show' : 'hidden'} /> :
              null
          )
        })}
      </ImageContainer>
    </MainConceptStoryContainer>
  );
}