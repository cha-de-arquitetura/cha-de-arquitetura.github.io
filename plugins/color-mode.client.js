// if (localStorage.theme === 'dark' || (!('theme' in localStorage) && matchMedia('(prefers-color-scheme: dark)').matches)) {
export default function ({ app }, inject) {
  if (matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
    setTimeout(() => app.store.commit('SET_COLOR_MODE', 'dark'));
  } else {
    setTimeout(() => app.store.commit('SET_COLOR_MODE', 'light'));
  }
}
