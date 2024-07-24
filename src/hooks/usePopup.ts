import {IPopupData} from "@/types/interfaces/popup-interface";
import {useRecoilState, useResetRecoilState} from "recoil";
import {popupData, popupState} from "@/atoms/popupAtom";
import {EPopup} from "@/types/enums/common-enum";

const usePopup = () => {
    const [state, setState] = useRecoilState(popupState);
    const [data, setData] = useRecoilState(popupData);
    const resetPopupState = useResetRecoilState(popupState);
    const resetPopupData = useResetRecoilState(popupData);

    const openPopup = (popupName:EPopup, data?:IPopupData) => {
        setState((prev) => ({ ...prev, [popupName]: true }));
        setData((prev) => ({ ...prev, [popupName]: data }));
    };

    const closePopup = (popupName:EPopup) => {
        setState((prev) => ({ ...prev, [popupName]: false }));
        setData((prev) => ({ ...prev, [popupName]: undefined }));
    };

    const isPopupOpen = (popupName) => state[popupName];

    const getPopupData = (popupName) => data[popupName];

    const closeAll = () => {
        resetPopupState();
        resetPopupData();
    }

    return {
        openPopup,
        closePopup,
        isPopupOpen,
        getPopupData,
        closeAll
    };
}

export default usePopup;