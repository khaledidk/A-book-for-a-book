import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";

import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppNavigation";
import { AuthenticatedUserContext } from "../providers";
import { LoadingIndicator } from "../components/LoadingIndicator/LoadingIndicator";
import { auth } from "../config/firebase";

export const RootNavigator = () => {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [IsVerified, setIsVerified] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // onAuthStateChanged returns an unsubscriber
        const unsubscribeAuthStateChanged = onAuthStateChanged(
            auth,
            (authenticatedUser) => {
                if (authenticatedUser) {
                    onIdTokenChanged(auth, (Changeuser) => {




                        if (Changeuser && (Changeuser.emailVerified || Changeuser.phoneNumber)) { //This will return true or false
                            // console.log('virfy : ' + Changeuser.emailVerified);

                            setUser(authenticatedUser)

                        } else {
                            console.log('not virfy');
                            setUser(null)

                        }
                    })
                }

                // authenticatedUser ? setUser(authenticatedUser) : setUser(null);

                setIsLoading(false);

            }
        );

        // unsubscribe auth listener on unmount
        return unsubscribeAuthStateChanged;
    }, [user]);

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};