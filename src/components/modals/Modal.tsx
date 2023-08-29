import { children, createEffect, createMemo, ParentProps } from 'solid-js';
import { Portal } from 'solid-js/web';
import { useApp } from '~/store';
import type { ModalType } from '~/store';

import IconCloseThick from '~icons/mdi/close-thick';

interface ModalProps {
    modal: ModalType;
    title: string;
    dialogRole?: boolean;
}

export function Modal(props: ParentProps<ModalProps>) {
    const [appState, appStore] = useApp();
    // eslint-disable-next-line prefer-const
    let modalRef: HTMLDialogElement | undefined;
    const modalId = createMemo(() => `modal-id-${props.modal}`);
    const isVisible = createMemo(() => appState.modals[props.modal]);

    createEffect(() => {
        if (modalRef) {
            if (isVisible()) {
                modalRef.showModal();
            } else {
                modalRef.close();
            }
        }
    });

    const content = children(() => props.children);
    return (
        <Portal mount={document.body}>
            <dialog
                id={modalId()}
                ref={modalRef}
                class="modal modal-bottom sm:modal-middle"
                data-testid={`modal-${props.modal}`}
                role={props.dialogRole ? 'dialog' : undefined}
            >
                <div
                    class="modal-box relative"
                    data-testid={`modal-${props.modal}-content`}
                >
                    <label
                        class="btn-sm btn-circle btn-ghost btn absolute right-2 top-2"
                        onClick={() => appStore.hideModal(props.modal)}
                    >
                        <IconCloseThick />
                    </label>
                    <h3 class="text-lg font-bold">{props.title}</h3>
                    <div class="py-4">{content()}</div>
                </div>
            </dialog>
        </Portal>
    );
}
