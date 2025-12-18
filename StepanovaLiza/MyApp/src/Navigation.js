import { NavigationContainer } from '@react-navigation/native';
import UseState from './screens/UseState';
import UseMemoExample from './screens/UseMemo';
import MoviesSearchComponent from './screens/UseEffect';
import ProfileScreen from './screens//Profile';
import PostsScreen from './screens//Posts';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function  Navigation() {
  return (
    <NavigationContainer>
        <Drawer.Navigator>
            <Drawer.Screen name="useState" component={UseState} /> 
            <Drawer.Screen name="useEffect" component={MoviesSearchComponent} /> 
            <Drawer.Screen name="useMemo" component={UseMemoExample} /> 
            <Drawer.Screen name="Profile" component={ProfileScreen} /> 
            <Drawer.Screen name="Posts" component={PostsScreen} /> 
        </Drawer.Navigator>
    </NavigationContainer>
  );
}