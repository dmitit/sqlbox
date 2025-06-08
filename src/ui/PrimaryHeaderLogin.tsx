import {
   loginSuccess,
   logout,
   selectIsAuthenticated,
   selectUser,
} from '@/core/store/auth.slice';
import {
   Avatar,
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownTrigger,
} from '@heroui/react';
import {
   CredentialResponse,
   GoogleLogin,
   googleLogout,
} from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

interface DecodedCredential {
   aud: string;
   azp: string;
   email: string;
   email_verified: boolean;
   exp: number;
   family_name: string;
   given_name: string;
   iat: number;
   iss: string;
   jti: string;
   name: string;
   nbf: number;
   picture: string;
   sub: string;
}

const PrimaryHeaderLogin = () => {
   const dispatch = useDispatch();
   const isAuthenticated = useSelector(selectIsAuthenticated);
   const user = useSelector(selectUser);

   const handleSuccess = (credentialResponse: CredentialResponse) => {
      if (credentialResponse.credential) {
         try {
            const decoded = jwtDecode<DecodedCredential>(
               credentialResponse.credential,
            );

            dispatch(
               loginSuccess({
                  user: {
                     email: decoded.email,
                     name: decoded.name,
                     picture: decoded.picture,
                  },
                  token: credentialResponse.credential,
               }),
            );
         } catch (error) {
            console.error('Error setting user:', error);
         }
      }
      console.log('Google login successful:', credentialResponse);
   };

   const handleError = () => {
      console.error('Google login failed');
   };

   const handleLogout = () => {
      googleLogout(); // Sign out from Google
      dispatch(logout()); // Dispatch logout action to clear Redux state
   };

   return (
      <>
         {isAuthenticated && user ? (
            <Dropdown placement="bottom-end">
               <DropdownTrigger>
                  <Avatar
                     isBordered
                     as="button"
                     className="transition-transform cursor-pointer"
                     color="primary"
                     name={user.name || user.email}
                     size="sm"
                     src={user.picture}
                  />
               </DropdownTrigger>
               <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                     <p className="font-semibold">Signed in as</p>
                     <p className="font-semibold">{user.email}</p>
                  </DropdownItem>
                  <DropdownItem
                     key="logout"
                     color="danger"
                     onPress={handleLogout}
                  >
                     Log Out
                  </DropdownItem>
               </DropdownMenu>
            </Dropdown>
         ) : (
            <GoogleLogin
               onSuccess={handleSuccess}
               onError={handleError}
               useOneTap
            />
         )}
      </>
   );
};

export default PrimaryHeaderLogin;
