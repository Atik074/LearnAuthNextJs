import { auth  } from "@/auth";
import Image from "next/image";
import SignOut from "./SignOut";
import Signin from "./Signin";

const Header = async() => {
    const session = await auth()

   

    return (
        <div>
            {
                session?.user ? (
                    <div className="flex items-center justify-center gap-4">
                        <p className="text-xl">{ session?.user?.name}</p>  |
                        <Image 
                        className="rounded-full"
                        src={session?.user?.image}
                         alt={session?.user?.image} 
                         width={52}
                         height={52}
                          />
                          <SignOut/>
                    </div>
                ) :(
                    <Signin/>
                )
            }
        </div>
    );
};

export default Header;