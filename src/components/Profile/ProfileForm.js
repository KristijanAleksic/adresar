import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const history = useHistory();
  const newPassowrdInputRef = useRef();
  const AuthCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPassowrdInputRef.current.value;

    let specialChars = /[!#$+-]/;
    const hasNumber = /\d/;
    const err = "Password must be at least 6 characters long and contain at least one number and one special character!";

    if (enteredNewPassword.trim().length > 5) {
      if (hasNumber.test(enteredNewPassword)) {
        if (specialChars.test(enteredNewPassword)) {
          fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDa2pV8Ct34q84wK_2DrS2ugSE8olf5I8U",
            {
              method: "POST",
              body: JSON.stringify({
                idToken: AuthCtx.token,
                password: enteredNewPassword,
                returnSecureToken: false,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          ).then((res) => {
            history.replace("/");
          });
        } else {
          toast.error(err);
        }
      } else {
        toast.error(err);
      }
    } else {
      toast.error(err);
    }
  };

  // if (enteredNewPassword !== "") {

  // } else {
  //   toast.error("Cannot be emty!");
  // }

  //validacija
  //};

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="6"
          ref={newPassowrdInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
