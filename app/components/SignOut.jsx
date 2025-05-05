import { doSingOut } from "../actions";

const SignOut = () => {
    return (
        <form action={doSingOut}>
          <button type="submit"> SignOut</button>  
        </form>
    );
};

export default SignOut;