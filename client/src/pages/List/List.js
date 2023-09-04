// eslint-disable-next-line import/named
import { LogContainer,TopContainer,MainContainer,} from "./List.styled";
import { useState } from "react";
import Autocomplete from "../../components/AutoComplete/AutoComplete";
import Section from "../../components/Section/Section";
import Gnb from "../../components/Gnb/Gnb";
import Search from "../../components/Search/Search";

const List = () => {
    const [mode, setMode] = useState('boardId');
    const [destination, setDestination] = useState('');

    const handleDestination = destination => {
        setDestination(destination);
    };

  return (
    <LogContainer>
      <TopContainer>
        <div className="top__container">
          <div className="top__content">
            <h1>Product List </h1>
            <Autocomplete
              handleDestination={handleDestination} />
          </div>
        </div>
      </TopContainer>
      <Search />
      <Gnb />
      <MainContainer>
        <div className="main__header">
          <h2>Snacks</h2>
          <div className={'selection__tab'}>
            <button
              className={
                mode === "borderId"
                ? 'mode--selected mode--button'
                : 'mode--button'
              }
              onClick={e => {
                if (destination) e.preventDefault();
                else window.location.reload();
                setMode('boardId');
            }}>
              Newest
            </button>
            <button
              className={
                mode === "likes"
                ? 'mode--selected mode--button'
                : 'mode--button'
              }
              onClick={e => {
                if (destination) e.preventDefault();
                else window.location.reload();
                setMode('likes');
            }}>
              Rating
            </button>
            <button
              className={
                mode === "views"
                ? 'mode--selected mode--button'
                : 'mode--button'
              }
              onClick={e => {
                if (destination) e.preventDefault();
                else window.location.reload();
                setMode('views');
            }}>
              View count
            </button>
          </div>
        </div>
        <Section />
        <button
          className="button--default button--subtle button--top"
        >
          Top
        </button>
      </MainContainer>
    </LogContainer>
  );
};

export default List;