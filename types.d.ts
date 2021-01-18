import * as React from 'react';

type VoidFunction = (...args: any[]) => void;

interface ModalTriggerProps {
    isOpen: boolean;
    toggle: VoidFunction;
    close: VoidFunction; 
    open: VoidFunction;
}

export interface ModalProps {
    /**
     * Modal trigger
     * @default undefined
     */
    children?: React.ReactChildren | ((props: ModalTriggerProps) => React.ReactChildren);
    /**
     * Modal content
     * @default undefined
     */
    content?: React.ReactChildren | (({ close: VoidFunction }) => React.ReactChildren);
    /**
     * Modal content className
     * @default undefined
     */
    className?: string;
    /**
     * Event, fired on modal close
     * @default () => {}
     */
    onClose?: VoidFunction;
    /**
     * Whether close modal on Escape button press or not
     * @default true
     */
    closeOnEscape?: boolean;
    /**
     * Whether close modal on Enter button press or not
     * @default false
     */
    closeOnEnter?: boolean;
    /**
     * Whether close modal on remote click or not
     * @default true
     */
    closeOnRemoteClick?: boolean;
    /**
     * Tag for modal trigger (used only if children are not a function)
     * @default div
     */
    tag?: string;
}

export default class Modal extends React.Component<ModalProps> {}

export class ModalsRoot extends React.Component {}

interface ModalsProviderProps {
    children: React.ReactChildren
}

export class ModalsProvider extends React.Component<ModalsProviderProps> {}

export const useModal: () => void;