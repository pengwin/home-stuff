/* eslint-disable i18next/no-literal-string */

import { Container } from './Container';
import { PFC } from '../models/PFC';
import { ValueComponent as VC } from './Value';

interface ResultRatesProps {
    resultRates: PFC;
    targetRates: PFC;
    pfcRates: PFC;
}

export function ResultRates(props: ResultRatesProps) {
    return (
        <Container>
            <h2 class="uppercase font-bold font-mono">Result Rates</h2>
            <div>
                <span>Proteins:</span> <VC value={props.resultRates.p} />/
                <VC value={props.targetRates.p} /> (
                <VC value={props.pfcRates.p} />)
            </div>
            <div>
                <span>Fats:</span> <VC value={props.resultRates.f} />/
                <VC value={props.targetRates.f} /> (
                <VC value={props.pfcRates.f} />)
            </div>
            <div>
                <span>Carbohydrates:</span>
                <VC value={props.resultRates.c} />/
                <VC value={props.targetRates.c} /> (
                <VC value={props.pfcRates.c} />)
            </div>
        </Container>
    );
}
