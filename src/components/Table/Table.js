import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import classes from "./Table.module.css";

import fireDb from "../../firebase";

const Table = () => {
  const [data, setData] = useState({});
  const [sorted, setSorted] = useState([]);
  const [sort, setSort] = useState(false);

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
  }, []);

  const onDelete = (id) => {
    if(window.confirm("Delete contact?")){
      fireDb.child(`contacts/${id}`).remove((err) => {
        if(err) {
          toast.error(err);
        } else {
          toast.success("Contact Deleted!")
        }
      })
    }
  }


  const changeHandler = (event) => {
    setSort(true);
    toast.success("Sorted!");
    fireDb.child("contacts").orderByChild(`${event.target.value}`).on("value", (snapshot) => {
      let sorted = [];
      snapshot.forEach((snap) => {
        sorted.push(snap.val())
      });
      setSorted(sorted);
    })
  };
  const resetHandler = () => {
    setSort(false);
  };

  return (
    <>
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
            {!sort && (<th>Action</th>)}
          </tr>
        </thead>
        {!sort && (
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
                <td>
                  <div>
                    <Link to={`/kontakt/update/${id}`}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => onDelete(id)}>Delete</button>
                    <Link to={`/kontakt/detalji/${id}`}>
                      <button >View</button>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        )}

        {sort && (
          <tbody>
            {sorted.map((item, index) => {
              return (
                <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.lastName}</td>
                <td>{item.date}</td>
                <td>{item.contactType}</td>
                <td>{item.typeValue}</td>
                </tr>
              )
            })}
          </tbody>
        )}
        
      </table>
    </section>
    <section className={classes.sort}>
    <label>Sort by: </label>
    <select className="dropdown" name="colValue" onChange={changeHandler}>
      <option>Select...</option>
      <option value="name">Name</option>
      <option value="lastName">Last name</option>
      <option value="date">date</option>
      <option value="contactType">Contact type</option>

    </select>
    <button onClick={resetHandler}>Reset</button>
    </section>
    </>
  );
};

export default Table;
