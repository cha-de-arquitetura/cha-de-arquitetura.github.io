export function state() {
  return {
    colorMode: 'light'
  }
}

export const getters = {
  isDarkMode({ colorMode }) {
    return colorMode === 'dark';
  }
}

export const mutations = {
  SET_COLOR_MODE,
  TOGGLE_COLOR_MODE
}

function SET_COLOR_MODE(state, payload) {
  if (state.colorMode !== payload) {
    state.colorMode = payload;
    switchFavIcon(payload);
  }
}

function TOGGLE_COLOR_MODE(state) {
  if (state.colorMode === 'dark') {
    state.colorMode = 'light';
  } else {
    state.colorMode = 'dark';
  }
  switchFavIcon(state.colorMode);
}

function switchFavIcon(colorMode) {
  console.log('call switch')
  const favicon = document.querySelector('link[rel=icon]');
  if (colorMode === 'dark') {
    favicon.setAttribute('href', './favicon-darkmode.svg');
  } else {
    favicon.setAttribute('href', './favicon.svg');
  }
}
