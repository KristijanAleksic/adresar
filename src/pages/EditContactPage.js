import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import classes from "./EditContactPage.module.css";
import fireDb from "../firebase";

const initialState = {
  name: "",
  lastName: "",
  date: "",
  contactType: "",
  typeValue: "",
};

const EditContactPage = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const { name, lastName, date, contactType, typeValue } = state;

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!name || !lastName || !date || !typeValue || !contactType) {
      toast.error("Please fill in each input field");
    } else {
      if(!id){
        fireDb.child("contacts").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contact Added!");
          }
        });
      } else {
        fireDb.child(`contacts/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contact Updated!");
          }
        });
      }
      
      setTimeout(() => history.push("/"), 500);
    }
  };
  return (
    <section className={classes.input}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name || ""}
            onChange={inputChangeHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName || ""}
            onChange={inputChangeHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date || ""}
            min="1900-01-01"
            onChange={inputChangeHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Contact type</label>
          <select
            id="contactType"
            name="contactType"
            onChange={inputChangeHandler}
            value={contactType || ""}
          >
            <option value="">please select an option</option>
            <option value="phone">Phone</option>
            <option value="email">E-Mail</option>
            <option value="pager">Pager</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="typeValue">Contact</label>
          <input
            type="text"
            id="typeValue"
            name="typeValue"
            value={typeValue || ""}
            onChange={inputChangeHandler}
          />
        </div>

        <button type="sumbit" value={id ? "Update" : "Save"}>
          Save
        </button>
      </form>
    </section>
  );
};

export default EditContactPage;
