/* eslint-disable i18next/no-literal-string */

import { Section } from '~/components/layout/Section';
import { PFC } from '../models/PFC';
import { ValueComponent as VC } from './Value';
import { SectionTitle } from '~/components/layout/SectionTitle';

interface ResultRatesProps {
    resultRates: PFC;
    targetRates: PFC;
    pfcRates: PFC;
}

export function ResultRates(props: ResultRatesProps) {
    return (
        <Section>
            <SectionTitle>Result Rates</SectionTitle>
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
        </Section>
    );
}
