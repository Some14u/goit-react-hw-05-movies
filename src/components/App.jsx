import Navigation from "./Navigation";
import Home from 'views/Home';
import Movies from 'views/Movies';

import { Wrapper, Header } from "./App.styled";


import { useUrlContext } from "../helpers/urlApi";


export default function App() {
  useUrlContext();

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <Wrapper>
        <Home />
        <Movies />
      </Wrapper>
    </>
  );
}
