import { createMemo } from 'solid-js';
import { useRouter } from '~/stores/router';
import { Comp } from './Comp';

export default function () {
    const router = useRouter();
    const text = createMemo(() => {
        const state = router();
        if (state?.route !== 'testComp') return 'Wrong Route';
        return state.params?.text || 'No param';
    });

    return <Comp text={text()} />;
}
