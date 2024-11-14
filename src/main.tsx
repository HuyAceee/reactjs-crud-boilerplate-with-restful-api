import 'antd/dist/reset.css';
import enUs from 'antd/locale/en_US';
import i18next from 'i18next';
import * as ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { App } from './App';
import { Empty, ThemeProvider } from '~/shared/ReactJS';
import './css/tailwind.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log('Service worker registration successful:', registration);
      })
      .catch(error => {
        console.log('Service worker registration failed:', error);
      });
  });
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProvider isSSR={false} config={{ fontFamily: 'Lexend Deca' }} locale={enUs} renderEmpty={() => <Empty />}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </ThemeProvider>,
);
