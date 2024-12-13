import React, { useActionState } from "react";
import {
  isEmail,
  isNotEmpty,
  isEqualToOtherValue,
  hasMinLength,
} from "../util/validation.js";



 // For Working with useActionState we pass formData as the second argument while the firstArgument is the prevFormData and at the first time it is the initialFormData. But without the useActionState we don't need prevFormData only formData as the first argument.


//  Since we don't using any state and props which are using in this component or any other component so it is good to keep function outside so everytime when the component re-renders again the same function would not be created again. So it good from the performance perspective untill it need data from props and state..
 function signUpAction(prevFormData,formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");
  const firstName = formData.get("first-name");
  const lastName = formData.get("last-name");
  const role = formData.get("role");
  const terms=formData.get("terms");
  // For things the multiple select we use getAll as all option have the same name attributes.
  const acquisitionChannel = formData.getAll("acquisition");

  let error = [];

  if (!isEmail(email)) {
    error.push("Email is not valid");
  }

  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    error.push("Password should be of at least length 6");
  }
  if (!isEqualToOtherValue(password, confirmPassword)) {
    error.push("Password do not match.");
  }

  if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
    error.push("Please Provide both your first and last name.");
  }

  if (!isNotEmpty(role)) {
    error.push("Please select a role.");
  }
  if (!terms) {
    error.push("You must agree to the terms and conditions");
  }

  if (acquisitionChannel.length === 0) {
    error.push("Please select at least one acquistion channel.");
  }

  if (error.length > 0) {
    return { error, enteredValue:{
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      role,
      terms,
      acquisitionChannel
    } };
  }

  return { error: null };
}

export default function Signup() {
 

  // UseActionState accpets initialState as the second argument. It return three things first is the data it contained and second is the updating the data internally while the third argument is for whether the form is pending which is generally the case in asynchronous form code.
  const [formState, formAction, pending] = useActionState(signUpAction, {
    error: null,
  });
  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" defaultValue={formState.enteredValue?.email} />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" defaultValue={formState.enteredValue?.password} />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValue?.confirmPassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" defaultValue={formState.enteredValue?.firstName}/>
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" defaultValue={formState.enteredValue?.lastName}/>
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" defaultValue={formState.enteredValue?.role}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredValue?.acquisitionChannel.includes('google')}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValue?.acquisitionChannel.includes('friend')}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" defaultChecked={formState.enteredValue?.acquisitionChannel.includes('other')} />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms"  defaultChecked={formState.enteredValue?.terms}/>I
          agree to the terms and conditions
        </label>
      </div>

      {formState.error && (
        <ul className="error">
          {formState.error.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
