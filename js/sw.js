;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_pato_restaurant',
  urlsToCache = [
    './',
    'vendor/bootstrap/css/bootstrap.min.css',
    'fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    'fonts/themify/themify-icons.css',
    'vendor/animate/animate.css',
    'vendor/css-hamburgers/hamburgers.min.css',
    'vendor/animsition/css/animsition.min.css',
    'vendor/select2/select2.min.css',
    'vendor/daterangepicker/daterangepicker.css',
    'vendor/slick/slick.css',
    'vendor/lightbox2/css/lightbox.min.css',
    'css/main.css',
    'css/util.css',
    'vendor/jquery/jquery-3.2.1.min.js',
    'vendor/animsition/js/animsition.min.js',
    'vendor/bootstrap/js/popper.js',
    'vendor/bootstrap/js/bootstrap.min.js',
    'vendor/select2/select2.min.js',
    'vendor/daterangepicker/moment.min.js',
    'vendor/daterangepicker/daterangepicker.js',
    'vendor/slick/slick.min.js',
    'js/slick-custom.js',
    'vendor/parallax100/parallax100.js',
    'vendor/countdowntime/countdowntime.js',
    'vendor/lightbox2/js/lightbox.min.js',
    'js/main.js',
    'js/script.js',
    'images/icons/favicon.png'
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})
