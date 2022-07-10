import type { Component } from 'solid-js';
import Comp from './Comp';

const App: Component = () => {
  return (
    <>
      <h1>Hello world!!!!</h1>
      <Comp text='test' />
    </>
  );
};

export default App;
