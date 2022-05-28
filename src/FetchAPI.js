import React from "react";
import { useState, useEffect } from "react";

function FetchAPI() {
  const [items, setItems] = useState([]);
  const [filterItems, setFilterItems] = useState(items);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setItems(json);
        setFilterItems(json);
      });
  }, []);

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    let result = [];
    result = items.filter((data) => {
      return (data.name.toLowerCase().search(value) && data.username.toLowerCase().search(value)) !== -1;
    });

    setFilterItems(result);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          className="search"
          placeholder="Search Name/Username"
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div className="table">
        <table className="table table-light table-hover table-striped table-bordered table-responsive">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col" className="email">Email</th>
              <th scope="col" className="username">Username</th>
            </tr>
          </thead>
          <tbody>
            {filterItems &&
              filterItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td className="email">{item.email}</td>
                  <td className="username">{item.username}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FetchAPI;
