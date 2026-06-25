import { Workbox } from 'workbox-window'

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js')

    wb.addEventListener('controlling', () => {
      window.location.reload()
    })

    wb.register()
  }
}
