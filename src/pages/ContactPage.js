import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import classes from "./ContactPage.module.css";

import fireDb from "../firebase";

const ContactPage = () => {
  const [contact, setContact] = useState({});
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    fireDb
      .child(`contacts/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setContact({ ...snapshot.val() });
        } else {
          setContact({});
        }
      });
  }, [id]);

  const onDelete = (id) => {
    if(window.confirm("Delete contact?")){
      fireDb.child(`contacts/${id}`).remove((err) => {
        if(err) {
          toast.error(err);
        } else {
          toast.success("Contact Deleted!")
          setTimeout(() => history.push("/"), 500);
        }
      })
    }
  }

  console.log("user", contact);
  return (
    <section className={classes.card}>
      <h2>Contact detail</h2>
      <div className={classes.cardInner}>
        <ul>
          <li>
            <h3>ID:</h3>
            <p>{id}</p>
          </li>
          <li>
            <h3>Name: </h3>
            <p>{contact.name}</p>
          </li>
          <li>
            <h3>Last name: </h3>
            <p>{contact.lastName}</p>
          </li>
          <li>
            <h3>Date: </h3>
            <p>{contact.date}</p>
          </li>
          <li>
            <h3>Contact: </h3>
            <p>
              {contact.contactType}: {contact.typeValue}
            </p>
          </li>
        </ul>
      </div>
      <Link to={`/kontakt/update/${id}`}>
          <button style={{float: "left"}}>Edit</button>
        </Link>
        <button style={{float: "right"}} onClick={() => onDelete(id)}>Delete</button>
    </section>
  );
};

export default ContactPage;
