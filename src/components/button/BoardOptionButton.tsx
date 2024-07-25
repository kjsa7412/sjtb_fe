import {useRef} from "react";
import usePopup from "@/hooks/usePopup";
import {EElementId, EIcon, EPopup} from "@/types/enums/common-enum";
import styles from "./BoardOptionButton.module.scss";
import Icons from "@/components/Icons";

const BoardOptionButton = () => {
    const targetRef = useRef(null);
    const popupController = usePopup();

    const togglePopup = () => {
        if (popupController.isPopupOpen(EPopup.BoardOption)) {
            console.log('a');
            popupController.closePopup(EPopup.BoardOption);
        } else {
            console.log('b');
            const rect = targetRef.current.getBoundingClientRect();
            popupController.openPopup(EPopup.BoardOption, {position: {top: rect.bottom, left: rect.left}})
        }
    };

    return (
        <div id={EElementId.BoardOption} ref={targetRef} className={styles.baseContainer} onClick={togglePopup}>
            <Icons iconType={EIcon.Option} width={'32'} height={'32'} fill={'#FFFFFF'}/>
        </div>
    )
}

export default BoardOptionButton;