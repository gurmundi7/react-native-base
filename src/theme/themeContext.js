import * as React from 'react';
import color from 'color';
import {useContext} from 'react';
import {useColorScheme} from 'react-native';
import configureFonts from './fonts';
import {black, white, pinkA400, pinkA100} from './colors';
import {useState} from 'react';

/**
 * Check font.js file for more details
 */
const fontConfig = {};
const fonts = configureFonts(fontConfig);

const DefaultTheme = {
  dark: false,
  roundness: 4,
  colors: {
    primary: '#6200ee',
    onPrimary: white,
    accent: '#03dac4',
    background: '#f6f6f6',
    surface: white,
    error: '#B00020',
    text: black,
    onBackground: '#000000',
    onSurface: '#000000',
    disabled: color(black).alpha(0.26).rgb().string(),
    placeholder: color(black).alpha(0.54).rgb().string(),
    backdrop: color(black).alpha(0.5).rgb().string(),
    notification: pinkA400,
  },
  fonts,
  animation: {
    scale: 1.0,
  },
};

const DefaultDarkTheme = {
  ...DefaultTheme,
  dark: true,
  mode: 'adaptive',
  colors: {
    ...DefaultTheme.colors,
    primary: '#BB86FC',
    onPrimary: black,
    accent: '#03dac6',
    background: '#121212',
    surface: '#121212',
    error: '#CF6679',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    text: white,
    disabled: color(white).alpha(0.38).rgb().string(),
    placeholder: color(white).alpha(0.54).rgb().string(),
    backdrop: color(black).alpha(0.5).rgb().string(),
    notification: pinkA100,
  },
};

const defaultThemes = {light: DefaultTheme, dark: DefaultDarkTheme};

const ThemeContext = React.createContext(defaultThemes.light);

export const ThemeProvider = ({children}) => {
  
	const colorScheme = 'dark'; // useColorScheme();
  console.log(colorScheme);
  
  const [theme, setTheme] = useState(
    defaultThemes[colorScheme ? colorScheme : 'light'],
  );

  const toggleTheme = () => {
		setTheme(theme.dark?defaultThemes.light:defaultThemes.dark)
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeConsumer = ThemeContext.Consumer;

export const useTheme = () => {
  return useContext(ThemeContext).theme;
};

export const useToggleTheme = () => {
  return useContext(ThemeContext).toggleTheme;
};
