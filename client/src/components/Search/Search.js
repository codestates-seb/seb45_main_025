import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { 
    useSearchTextStore,
    useSearchSelectedStore,
    useSearchApiStore,
    useSearchIsUpdateStore,
 } from "../../stores/listSearchStore";
 import {
    useListCurrentPageStore,
    useListPageStore,
 } from "../../stores/listPageStore";
 import {
    SearchBox,
    SearchSelBox,
    SearchBtn,
    SearchSelect,
    SearchSelectDown,
 } from "./Search.styled";

 const Search = () => {
    const { setSearchText } = useSearchTextStore(state => state);
    const { setSearchSelected } = useSearchSelectedStore(state => state);
    const { setSearchApi } = useSearchApiStore(state => state);
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
    const selectHandler = e => {
        const selected = e.target.value;
        if (selected === 'name') {
            setSearchApi('productName');
        } else if (selected === 'content') {
            setSearchApi('content');
        }
        setSearchSelected(selected);
        setSearchIsUpdate(true);
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
        setSearchApi('productName');
        setSearchSelected('name');
        setSearchIsUpdate(false);
        setListCurrentPage(1);
        setListPage(1);
    }, []);

    return (
        <SearchBox>
            <label htmlFor="search">Product Search</label>
            <SearchSelBox>
                <SearchSelect onChange={selectHandler}>
                    <option value="name">Product Name</option>
                    <option value="content">Content</option>
                </SearchSelect>
                <SearchSelectDown>
                    <FaChevronDown />
                </SearchSelectDown>
            </SearchSelBox>
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