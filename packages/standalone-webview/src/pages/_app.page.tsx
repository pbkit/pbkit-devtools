import type { AppProps } from "next/app";
import "normalize.css/normalize.css";
import "open-color/open-color.css";
import "./_app.scss";
import "@pbkit-devtools/core/styles/flexlayout-light.scss";
import "@pbkit-devtools/core/styles/flexlayout-dark.scss";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
