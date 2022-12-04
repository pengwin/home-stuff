import type { Component } from 'solid-js';
import { A } from '@solidjs/router';

const Index: Component = () => {
    return (
        <div>
            <A class="block" href="/test/comp/111">
                Test.Comp 111
            </A>
            <A class="block" href="/test/comp/abc">
                Test.Comp abc
            </A>
            <A class="block" href="/test/state">
                Test.State
            </A>
        </div>
    );
};

export default Index;
