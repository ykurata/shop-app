import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Item from "../components/Item";
import Loading from "../components/Loading";
import NoItem from "../components/NoItem";
import { ItemContext } from "../contexts/ItemContext";

const List = () => {
  const { allItems, loading } = useContext(ItemContext);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filteredItems, setFilteredItems] = useState([]);
  let card;

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  // Logic for displaying items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Map each items to Item component
  if (filteredItems.length > 0) {
    card = filteredItems.map((item, i) => (
      <Link to={`/detail/${item.id}`} className="card item-card" key={i}>
        <Item data={item} />
      </Link>
    ));
  } else {
    card = allItems.map((item, i) => (
      <Link to={`/detail/${item.id}`} className="card item-card" key={i}>
        <Item data={item} />
      </Link>
    ));
  }

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li key={number} id={number} onClick={handleClick}>
        {number}
      </li>
    );
  });

  // function to filter the item by userInput
  const filterData = () => {
    setFilteredItems(
      allItems.filter((item) => {
        const query = search.toLowerCase();
        return (
          item.name.toLowerCase().indexOf(query) >= 0 ||
          item.category.toLowerCase().indexOf(query) >= 0
        );
      })
    );
  };

  let numberOfItems;
  if (filteredItems.length === 0) {
    numberOfItems = null;
  } else if (filteredItems.length < indexOfLastItem) {
    numberOfItems = (
      <p>
        Showing {indexOfFirstItem + 1} - {filteredItems.length}&nbsp; of &nbsp;
        {filteredItems.length}&nbsp; items
      </p>
    );
  } else if (filteredItems.length > 5) {
    numberOfItems = (
      <p>
        Showing {indexOfFirstItem + 1} - {indexOfLastItem}&nbsp; of &nbsp;
        {filteredItems.length}&nbsp; items
      </p>
    );
  } else if (filteredItems.length < 5) {
    numberOfItems = <p>Showing {filteredItems.length} items</p>;
  }

  return (
    <div>
      <Navbar />
      {/* display number of items */}
      <div className="container-fluid item-list">
        <div className="row">
          <div className="col-lg-3 col-md-3"></div>
          <div className="col-lg-9 col-md-9">{numberOfItems}</div>
        </div>
        <div className="row list-outer">
          {/* Search input and select form category */}
          <div className="col-lg-3 col-md-3">
            <div className="input-group md-form form-sm form-1 pl-0 mb-5 search-form">
              <input
                onChange={onChange}
                name="search"
                value={search}
                className="form-control my-0 py-1"
                type="text"
                placeholder="Search item..."
                aria-label="Search"
              />
              <div className="input-group-append">
                <button
                  onClick={filterData}
                  className="btn btn-secondary"
                  type="button"
                >
                  <i
                    className="fas fa-search text-white"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            </div>
            <select
              onChange={onChange}
              name="search"
              className="browser-default custom-select mb-5"
            >
              <option value="">Categories</option>
              <option value="Phone/Laptop">Phone/Laptop</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Music">Music</option>
              <option value="Furniture">Furniture</option>
              <option value="Camera">Camera</option>
            </select>
          </div>
          <div className="col-lg-9 col-md-9">
            <div className="list-group">
              {/* display message if there is no items  */}
              {allItems.length < 0 && loading === true ? <NoItem /> : null}

              {/* Loading Message */}
              {loading === false ? <Loading /> : null}

              {card}
            </div>
          </div>
        </div>
        <div className="container-fluid text-center">
          <ul className="pagination justify-content-center">
            {renderPageNumbers}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default List;
