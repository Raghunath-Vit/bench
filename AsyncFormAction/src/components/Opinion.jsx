import { use } from "react";
import { OpinionsContext } from "../store/opinions-context";
// useOptimistic gives only temporary Ui so it increase the ui and send to backend but it fails in backends then it revert back because useOptimistic is just the temporary


// OptimisticVotes here the first argument of useOptimistic will act as a temporary untill the formAction use called the function (2nd argument) is executing. Once the function is done, it replace with the updated value or UI
import { useActionState, useOptimistic } from "react";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const {upvoteOpinion,downvoteOpinion}=use(OpinionsContext);
  // useOptimistic first argument is the data or things where it is used while there is second argument which is the function which is to be called inside the formAction.

  // The second argument of useOptimistic i.e. the function recieves argument where the first agument is fixed by react which we named here prevVotes which generally stores the previous data while the remaining aguments are the parameters which are passed by developers like here we passing mode. We passed here it from formAction.


  // useOptimistic is designed to used alongside with formAction. and the function to be called inside the formAction.
  const [optimisticVotes,setVotesOptimistically]=useOptimistic(votes,(prevVotes,mode)=>(
    mode==="up"?prevVotes+1:prevVotes-1
  ));

  useOptimistic(votes);
  async function upvote(){
    setVotesOptimistically('up');
    await upvoteOpinion(id);
  }

  async function downvote(){
    setVotesOptimistically('down');
    await downvoteOpinion(id);
  }


  // formAction can also be used as the triggered. This is also a way to add multiple formAction when we have different buttons
  const [upvoteFormState,upvoteFormAction,upvoteFormPending]=useActionState(upvote);
  const [downvoteFormState,downvoteFormAction,downvoteFormPending]=useActionState(downvote);


  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button formAction={upvoteFormAction} disabled={upvoteFormPending || downvoteFormPending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotes}</span>

        <button formAction={downvoteFormAction}  disabled={upvoteFormPending || downvoteFormPending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
