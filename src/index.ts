import { render } from './view/pageTemplate';
import { updateState } from './components';
import { listenPage } from './utils/listenPage';
import './style/style.scss';
const renderPage = async () => {
  await updateState();
  render();
  listenPage();
};
renderPage();
