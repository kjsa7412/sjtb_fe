import {EButtonShape, EButtonSize, EButtonType} from "@/types/enums/common-enum";

export interface ITextButton {
    controller?: {
        isOpen?: boolean,
        onClick?: Function,
        label?: string,
        isSubmit?: boolean
    },
    styles?: {
        size?: EButtonSize,
        shape?: EButtonShape,
        type?: EButtonType
    }
}