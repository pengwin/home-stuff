import type { Component } from 'solid-js';
import Comp from './Comp';

const App: Component = () => {
    return (
        <div class="container mx-auto">
            <h1>Hello world!!!!</h1>
            <Comp text="test" />
        </div>
    );
};

export default App;
