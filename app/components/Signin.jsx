import { doSignIn } from "../actions";

const Signin = () => {
    return (
            <form action={doSignIn}>
           <button type="submit" className="text-xl text-center text-red-700 bg-amber-400 p-4 rounded-full cursor-pointer">Signin</button>
            </form>
          
      
    );
};

export default Signin;