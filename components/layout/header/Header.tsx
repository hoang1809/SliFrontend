import { useEffect, useState } from "react";
import HeaderGuest from "./headerGuest"
import HeaderLogin from "./headerLogin"


export default function Header({ setSearchTerm }: { setSearchTerm: any }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the access_token is present in localStorage on the client side
        const isClientSide = typeof window !== 'undefined';
        if (isClientSide) {
            const storedToken = localStorage.getItem('access_token');
            setIsLoggedIn(!!storedToken);
        }
    }, [])
    return (
        <div style={{
            zIndex: 2,
            position: 'relative',
          }}>
            
            {isLoggedIn ? <HeaderLogin setSearchTerm={setSearchTerm}/> : <HeaderGuest setSearchTerm={setSearchTerm}/>}
        </div>
    )
}
