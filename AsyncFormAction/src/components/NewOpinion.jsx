import { useActionState,use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";


export function NewOpinion() {
  const {addOpinion}=use(OpinionsContext);
  // first argument is the function name second argument is the initialState.
  const [formState,formAction]=useActionState(shareOpinionAction,{errors:null});
  async function shareOpinionAction(prevState,formData){
  const userName=formData.get('userName');
  const title=formData.get('title');
  const body=formData.get('body');

  let errors=[];

  if(!userName.trim())
  {
    errors.push("UserName must be provided");
  }

  if(title.trim().length<5)
  {
    errors.push("Title must be of length 6 characters");
  }

  if(body.trim().length<10 && body.trim().length>300)
  {
    errors.push("Body must be in between 10 to 300 words");
  }

  if(errors.length>0)
  {
    return {
      errors,
      enteredValues:{
        userName,
        title,
        body,
      }
    }
  }

  //Here logic for submitting to backend
  await addOpinion({title,userName,body});

  return { errors:null};
 }

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.userName}/>
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.body}></textarea>
        </p>

        {
          formState.errors && <ul className="errors">
            {
              formState.errors.map((error)=>(
                 <li key="error">{error}</li>
              ))
            }
          </ul>
        }

      {/* useFormStatus can't be used in the component where form and formAction is written. It should written in some nested component */}
       <Submit/>
      </form>
    </div>
  );
}