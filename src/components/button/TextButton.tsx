import {ITextButton} from "@/types/interfaces/button-interface";
import styles from "./TextButton.module.scss"
import {EButtonShape, EButtonSize, EButtonType} from "@/types/enums/common-enum";

const TextButton = (props: ITextButton) => {
    const isOpen = props.controller?.isOpen || true;
    return (
        <>
            {
                isOpen &&
                    <div className={`${styles.baseContainer}
                                     ${styles[props.styles?.size || EButtonSize.Medium]}
                                     ${styles[props.styles?.shape || EButtonShape.Round]}
                                     ${styles[props.styles?.type || EButtonType.Red]}`}
                         onClick={props.controller?.onClick || null}
                    >
                        {!!props.controller?.label && props.controller.label}
                    </div>
            }
        </>
    )
}

export default TextButton;