import { FormContext } from '../form-context';
import { FormControlParams } from './form-control-params';

export interface FormControlProps extends FormControlParams {
    testId?: string;
    label: string;
    context: FormContext;
}
