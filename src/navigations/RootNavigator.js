import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";

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
                if (authenticatedUser && authenticatedUser.emailVerified) { //This will return true or false
                    setUser(authenticatedUser)
                    console.log('is virfy');
                } else {
                    console.log('not virfy');
                    setUser(null)
                }
                // authenticatedUser ? setUser(authenticatedUser) : setUser(null);

                setIsLoading(false);
                // console.log(user.emailVerified)
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