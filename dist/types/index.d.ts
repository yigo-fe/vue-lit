import { TemplateResult } from 'lit-html';
import { PropsType } from "./props";
declare type HookFn = () => unknown;
interface SetupFn<Props extends PropsType = {}> {
    (props: {
        [key in keyof Props]: any;
    }, context: {
        $el: ShadowRoot;
        $refs: Record<string, HTMLElement>;
        emit(event: string, payload?: any): void;
    }): () => TemplateResult;
}
export declare function defineComponent(name: string, setup: SetupFn): void;
export declare function defineComponent<Props extends PropsType = {}>(name: string, props: Props, setup: SetupFn<Props>): void;
export declare const onBeforeMount: (cb: HookFn) => void;
export declare const onMounted: (cb: HookFn) => void;
export declare const onBeforeUpdate: (cb: HookFn) => void;
export declare const onUpdated: (cb: HookFn) => void;
export declare const onUnmounted: (cb: HookFn) => void;
export * from 'lit-html';
export * from '@vue/reactivity';
export * from 'lit-html/directives/repeat';
export * from 'lit-html/directives/style-map';
export * from 'lit-html/directives/class-map';
