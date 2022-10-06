import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Layout from "./Component/Layout";

import GlobalStyle from "./Theme/GloablStyled";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <BrowserRouter>
    <GlobalStyle />
    <Layout>
      <App />
    </Layout>
  </BrowserRouter>
);
