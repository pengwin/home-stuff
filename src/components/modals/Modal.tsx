import { children, createMemo, ParentProps } from 'solid-js';
import { Portal } from 'solid-js/web';
import { useApp } from '~/store';
import type { ModalType } from '~/store';

import IconCloseThick from '~icons/mdi/close-thick';

interface ModalProps {
    modal: ModalType;
    title: string;
}

export function Modal(props: ParentProps<ModalProps>) {
    const [appState, appStore] = useApp();
    const modalId = createMemo(() => `modal-id-${props.modal}`);
    const isVisible = createMemo(() => appState.modals[props.modal]);

    const content = children(() => props.children);
    return (
        <Portal mount={document.body}>
            <input
                type="checkbox"
                id={modalId()}
                class="modal-toggle"
                checked={isVisible()}
            />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box relative">
                    <label
                        class="btn-sm btn-circle btn absolute right-2 top-2"
                        onClick={() => appStore.hideModal(props.modal)}
                    >
                        <IconCloseThick />
                    </label>
                    <h3 class="text-lg font-bold">{props.title}</h3>
                    <div class="py-4">{content}</div>
                </div>
            </div>
        </Portal>
    );
}
