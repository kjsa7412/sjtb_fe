import {EButtonShape, EButtonSize, EButtonType} from "@/types/enums/common-enum";

export interface ITextButton {
    controller?: {
        isOpen?: boolean,
        onClick?: Function,
        label?: string
    },
    styles?: {
        size?: EButtonSize,
        shape?: EButtonShape,
        type?: EButtonType
    }
}