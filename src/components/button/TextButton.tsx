import {ITextButton} from "@/types/interfaces/button-interface";
import styles from "./TextButton.module.scss"
import {EButtonShape, EButtonSize, EButtonType} from "@/types/enums/common-enum";

const TextButton = (props: ITextButton) => {
    const isOpen = props.controller?.isOpen || true;
    return (
        <>
            {
                isOpen &&
                    <button className={`${styles.baseContainer}
                                     ${styles[props.styles?.size || EButtonSize.Medium]}
                                     ${styles[props.styles?.shape || EButtonShape.Round]}
                                     ${styles[props.styles?.type || EButtonType.Red]}`}
                            onClick={props.controller?.onClick || null}
                            type={props.controller?.isSubmit ? "submit" : undefined}
                    >
                        {!!props.controller?.label && props.controller.label}
                    </button>
            }
        </>
    )
}

export default TextButton;