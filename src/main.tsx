import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';

const container: any = document.getElementById('root');
createRoot(container).render( 
 <StrictMode>
  <RecoilRoot>
    <App />
  </RecoilRoot>
</StrictMode>)