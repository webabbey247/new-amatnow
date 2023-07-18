import {extendTheme} from 'native-base';
export const CustomTheme = extendTheme({
  colors: {
    red: {
      100: '#FFF2F2',
      200: '#FDEAEA',
      300: "#D64732",
      400: "#F9E6E6",
      500: '#D93622',
      600: '#A72817',
      700: '#771A0C',
    },
    white: {
      100: 'transparent',
      200: '#EFEFEF',
      500: '#FFFFFF',
    },
    black: {
      100: 'rgba(0,0,0, .5)',
      200: '#28303F',
      500: '#1B1B1B',
    },
    grey: {
      200: '#808080',
      250: '#646464',
      300: '#E5E5E5',
      400: '#EDEDED',
      500: '#F8F8F8',
      600: '#858585',
      700: '#A7AAA9',
      800: '#787878',
    },
    green: {
      100: "#E8F9E6",
      200: '#EAFDEC',
      300: '#5B8754',
      400: '#82A261',
      500: '#68AC21',
      600: '#5B770C',
      700: '#34B120',
      800: '#105A29',
    },
    pink: {
      300: '#FDF9EA',
      400: '#BE7EA6',
      500: '#770C46',
    },
    orange: {
      500: '#DCBC4B',
      600: '#EDA61E',
    },
    blue: {
      200: '#EAF2FD',
      400: '#4C88DC',
    },
  },
  config: {
    initialColorMode: 'white',
  },
});
