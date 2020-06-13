export const defaultColors = {
  light: {
    bg: null,
    main: null,
    sub: null,
    text: null,
  },
  dark: {
    bg: null,
    main: null,
    sub: null,
    text: null,
  },
}

export const themeColors = {
  metaverse: {
    bg: '#232323',
    main: '#d82934',
    sub: '#5e5e5e',
    text: '#e8e8e8',
    buttonColor: '#232323',
    buttonText: '#d82934',
  },
  bliss: {
    bg: '#665957',
    main: '#262727',
    sub: '#BDA096',
    text: '#fff',
    buttonColor: '#BDA096',
    buttonText: '#262727',
  },
  carbon: {
    bg: '#313131',
    main: '#C33B00',
    sub: '#616161',
    text: '#f5e6c8',
    buttonColor: '#313131',
    buttonText: '#C33B00',
  },
  nautilus: {
    bg: '#132237',
    main: '#9F6B00',
    sub: '#0b4c6c',
    text: '#1cbaa',
    buttonColor: '#132237',
    buttonText: '#9F6B00',
  },
  nord: {
    bg: '#242933',
    main: '#d8dee9',
    sub: '#617b94',
    text: '#d8dee9',
    buttonColor: '#242933',
    buttonText: '#d8dee9',
  },
  blink: {
    bg: '#18181a',
    main: '#CB4782',
    sub: '#14878D',
    text: '#fff',
    buttonColor: '#18181a',
    buttonText: '#CB4782',
  },
}

export default {
  metaverse: {
    forceMode: 'dark',
    light: themeColors.metaverse,
    dark: themeColors.metaverse,
    gray: {
      100: themeColors.metaverse.sub,
      200: themeColors.metaverse.sub,
      800: themeColors.metaverse.bg,
    },
  },
  bliss: {
    forceMode: 'dark',
    light: themeColors.bliss,
    dark: themeColors.bliss,
    gray: {
      100: themeColors.bliss.sub,
      200: themeColors.bliss.main,
      800: themeColors.bliss.bg,
    },
  },
  carbon: {
    forceMode: 'dark',
    light: themeColors.carbon,
    dark: themeColors.carbon,
    gray: {
      100: themeColors.carbon.sub,
      200: themeColors.carbon.sub,
      800: themeColors.carbon.bg,
    },
  },
  blink: {
    forceMode: 'dark',
    light: themeColors.blink,
    dark: themeColors.blink,
    gray: {
      100: themeColors.blink.sub,
      200: themeColors.blink.sub,
      800: themeColors.blink.bg,
    },
  },
  nautilus: {
    forceMode: 'dark',
    light: themeColors.nautilus,
    dark: themeColors.nautilus,
    gray: {
      100: themeColors.nautilus.sub,
      200: themeColors.nautilus.sub,
      800: themeColors.nautilus.bg,
    },
  },
  nord: {
    forceMode: 'dark',
    light: themeColors.nord,
    dark: themeColors.nord,
    gray: {
      100: themeColors.nord.sub,
      200: themeColors.nord.sub,
      800: themeColors.nord.bg,
    },
  },
}
