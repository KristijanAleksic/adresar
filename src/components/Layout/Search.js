import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import classes from "./Search.module.css";
const Search = () => {
  const [search, setSearch] = useState("");
  const history = useHistory();
  

  const submitHandler = (event) => {
    event.preventDefault();
    history.push(`/kontakt/search?name=${search}`);
    setSearch("");
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <input
        type="text"
        className="inputField"
        placeholder="Search by name"
        onChange={(event) => setSearch(event.target.value)}
        value={search}
      />
    </form>
  );
};

export default Search;
