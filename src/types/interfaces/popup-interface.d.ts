export interface IOptionPopup {
    isOpen: boolean;
    contents?: {
        title: string,
        desc: string
    }
    position?: {
        top: number;
        left: number;
    };
}

