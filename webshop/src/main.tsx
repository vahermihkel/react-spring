import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './i18n';
import { CartSumContextProvider } from './context/CartSumContextProvider.tsx';
import { AuthContextProvider } from './context/AuthContextProvider.tsx';
import { store } from './redux/store'
import { Provider } from 'react-redux'

// "react" --> node_modulest
// "react-dom" --> node_modulest
// "react-router-dom" --> node_modulest

// ./   ../   --> minu fail

// import {StrictMode} from "react" ---> võtab selle moodulist tüki
// import App from "./App.tsx" ---> võtab terve faili

// import './index.css' ---> läheb igasse faili Reacti projektis
// import bla from "react"  ---> on vaid siin failis

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartSumContextProvider>
        <AuthContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthContextProvider>
      </CartSumContextProvider>
    </BrowserRouter>
  </StrictMode>,
)

// 1h varus

// 5. L 17.05 taaskasutamine, otsing, ID unikaalsuse kontroll
// 6. N 22.05 kell 18.00 online makse, context
// 7. P 25.05 kell 9.00  util, redux, custom HOOK
// 8. E 26.05 kell 17.30 modal, useImperativeRef, CSS moodulid, CSS library
// 9. P 01.06 kell 9.00 unit testid, JAVA + SPRING
//10. T 03.06 kell 17.30
//11. P 08.06 kell 9
//12. R 13.06 kell 17.00 autentimine
//13. P 15.06 kell 9.00-13.30
//14. P 22.06 kell 9
//15. K 25.06 kell 17.30
//16. P 29.06 kell 17.00
//17. T 01.07 kell 17.30
//18. T 15.07 kell 17.30-20.00  lõpuprojekti arutlus

// service+++
// bean -> ise tekitamine+++
// autentimine: JWT token. API kinnipanek. Rollid.
// ostukorv
// makse osas -> backendi tõsta + kontroll

// logid, profiilid, muutujad application.properties, CRON