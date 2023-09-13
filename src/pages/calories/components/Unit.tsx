import { Unit } from '../models/Unit';

export function UnitComponent(props: { unit: Unit }) {
    return <span>{props.unit}</span>;
}
