import Comp from './Comp';

import { useParams } from '@solidjs/router';

export default function () {
    const params = useParams();
    return <Comp text={params.text} />;
}
