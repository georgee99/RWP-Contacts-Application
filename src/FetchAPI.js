import React from 'react'
import { useState, useEffect } from 'react'

function FetchAPI() {

    const [items, setItems] = useState([]);
    const [filterItems, setFilterItems] = useState(items)
console.log(window.innerWidth)
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users`)
        .then(response => response.json())
        .then((json) => {
            console.log(json);
            setItems(json);

            setFilterItems(json)
        })        
    }, [])


    const handleSearch = (e) => {
        let value = e.target.value;
        let result = [];
        console.log(value);
        result = items.filter((data) => {
            // return data.name.search(value) != -1;
            return ( data.name.search(value) && data.username.search(value)) != -1
        });

        setFilterItems(result);
        console.log(result)
    }

    return (
        <div>
            <div>
                <input type="text" className="search" placeholder="Case Sensitive Name/Username Search"
                 onChange={(e) =>handleSearch(e)} />
            </div>           
            <div class="table">
            <table class="table table-light table-hover table-striped table-bordered table-responsive">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col" className='username'>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterItems && filterItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.email}</td>

                                <td className="username">{item.username}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
            </div>            
        </div>
    )
}

export default FetchAPI
