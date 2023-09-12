import { createDrawerNavigator } from "@react-navigation/drawer"

import Home from "../pages/Home"
import New from "../pages/New"
import Profile from "../pages/Profile"
import CustomDrawer from "../components/CustomDrawer"

const AppDrawer = createDrawerNavigator()

function AppRoutes() {
    return (
        <AppDrawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: "#131313",
                },
                drawerLabelStyle: {
                    color: "#fff",
                    fontWeight: "bold",
                },
                drawerActiveBackgroundColor: "#00b94a",
                drawerInactiveBackgroundColor: "#000",
                drawerInactiveTintColor: "#ddd",
                drawerItemStyle: {
                    marginVertical: 5,
                },
            }}
        >
            <AppDrawer.Screen
                name="Home"
                component={Home}
            />
            <AppDrawer.Screen
                name="Registrar"
                component={New}
            />
            <AppDrawer.Screen
                name="Perfil"
                component={Profile}
            />
        </AppDrawer.Navigator>
    )
}

export default AppRoutes
