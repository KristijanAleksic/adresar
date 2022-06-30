import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import classes from "./SearchPage.module.css";
import fireDb from "../firebase";

const SearchPage = () => {
  const [data, setData] = useState({});

  
  let params = new URLSearchParams(useLocation().search);
  let search = params.get("name");
  console.log(search);

  useEffect(() => {
    searchData();
  }, [search]);

  console.log(search);

  
  const searchData = () => {
    fireDb
      .child("contacts")
      .orderByChild("name")
      .equalTo(search)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          console.log(data)
          setData(data);
        }
      });
  };

  console.log(data);
  return (
    <section className={classes.table}>
      <table className={classes.tableEdit}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Last name</th>
            <th>Date</th>
            <th>Contact type</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].lastName}</td>
                <td>{data[id].date}</td>
                <td>{data[id].contactType}</td>
                <td>{data[id].typeValue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default SearchPage;
