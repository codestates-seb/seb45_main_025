import { AutoCompleteContainer} from "./AutoComplete.styled";

const Autocomplete = () => {


  return (
    <AutoCompleteContainer className="autocomplete">
      <div className="search__input">
        <input
          className="input--small-icon"
          placeholder="Search Snacks ex. choco, vanila..."
        ></input>
        <div className="clearbtn" >
          Clear
        </div>
      </div>
    </AutoCompleteContainer>
  );
};
  
  export default Autocomplete;
