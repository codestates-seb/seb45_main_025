import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    useSearchTextStore,
    useSearchIsUpdateStore,
 } from "../../stores/listSearchStore";
 import {
    useListCurrentPageStore,
    useListPageStore,
 } from "../../stores/listPageStore";
 import {
    SearchBox,
    SearchBtn,
 } from "./Search.styled";

 const Search = () => {
    const { setSearchText } = useSearchTextStore(state => state);
    const { setSearchIsUpdate } = useSearchIsUpdateStore(state => state);
    const { setListPage } = useListPageStore(state => state);
    const { setListCurrentPage } = useListCurrentPageStore(state => state);
    const navigate = useNavigate();
    
    const [searchTxt, setSearchTxt] = useState('');
    const searchHandler = e => {
        const txt = e.target.value;
        setSearchTxt(txt);
    };
    const submitPageHandler = () => {
        setListCurrentPage(1);
        setListPage(1);
    };

    const searchSubmit = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setSearchText(searchTxt);
            submitPageHandler();
            setSearchIsUpdate(true);
            navigate('/list');
        }
    };

    useEffect(() => {
        //Reset
        setSearchTxt('');
        setSearchIsUpdate(false);
        setListCurrentPage(1);
        setListPage(1);
    }, []);

    return (
        <SearchBox>
            <label htmlFor="search">Product Search</label>
            <input
              type="text"
              id="search"
              title="Search Snack"
              value={searchTxt}
              onChange={searchHandler}
              onKeyDown={searchSubmit}
            />
            <SearchBtn
              onClick={e => {
                e.preventDefault();
                setSearchText(searchTxt);
                submitPageHandler();
                setSearchIsUpdate(true);
                navigate('/list');
              }}
            >
                Search
            </SearchBtn>  
        </SearchBox>
    );
 };

 export default Search;