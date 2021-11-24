import React, {createRef, useContext, useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer, NavigationContainerRef, useNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackList} from "./src/screens/stack-lists";
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {fbInit} from './src/services/FirebaseServices';
import {ShoppingContextProvider} from './src/contexts/ShoppingContext';
import {theme} from "./utilities/themes";
import ShoppingList from "./src/screens/ShoppingList";
import Header from "./src/components/Header";
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

import {AuthContext, AuthContextProvider} from './src/contexts/AuthContext';
import ShoppingItemScreen from './src/screens/ShoppingItemScreen';
import { setI18nConfig } from './src/translation/TranslationConfig';


export const RootStack = createNativeStackNavigator<RootStackList>();

export default function App() {

    const navigationRef = useNavigationContainerRef();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        fbInit();
        setI18nConfig();
    }, [])

    return (
        <AuthContextProvider>
            <PaperProvider theme={theme}>
                <SafeAreaProvider>
                    <ShoppingContextProvider>
                        <NavigationContainer ref={navigationRef}>
                            <RootStack.Navigator
                                screenOptions={{
                                    header: (props) => <Header/>,
                                }}>
                                {!authContext?.isUserSignedIn && (
                                    <>
                                        <RootStack.Screen
                                            name={"LoginScreen"}
                                            component={LoginScreen}
                                            options={{title: "Login screen", headerBackVisible: false}}
                                        />

                                        <RootStack.Screen
                                            name={"RegisterScreen"}
                                            component={RegisterScreen}
                                            options={{title: "Register screen"}}
                                        />

                                        <RootStack.Screen
                                            name={"ShoppingList"}
                                            component={ShoppingList}
                                            options={{title: "Shopping list screen", headerBackVisible: false}}
                                        />

                                        <RootStack.Screen
                                            name={"ShoppingEditAddItem"}
                                            component={ShoppingItemScreen}
                                            options={{title: "Add item screen"}}
                                        />
                                    </>
                                )}

                            </RootStack.Navigator>
                        </NavigationContainer>
                    </ShoppingContextProvider>
                </SafeAreaProvider>
            </PaperProvider>
        </AuthContextProvider>
    );
};
function useRef<T>() {
    throw new Error('Function not implemented.');
}

