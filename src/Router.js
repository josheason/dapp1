import React from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Dimensions } from 'react-native';
import { Router, Scene, Drawer, Actions } from 'react-native-router-flux';
import styles from "./App.css";

import App from './App.js';
import ethereumEx from './ethereumEx.js';

const Routes = ()=> {    
	return (
		 <Router navigationBarStyle={styles.titlebackground} titleStyle={styles.titlestyle} tintColor='#ffffff' headerTitleContainerStyle={styles.centertitle}>
		 <Scene
							key="App"
							title="App"
							component={App}>
						   </Scene>
							<Scene
							key="ethereumEx"
							title="ethereumEx"
							component={ethereumEx}>
						   </Scene>
		</Router>
			)
	}

	export default Routes
