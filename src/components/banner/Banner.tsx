'use client';

import styles from './Banner.module.scss';
import {IUser} from "@/types/interfaces/common-interface";
import {useRecoilState} from "recoil";
import {userAtom} from "@/atoms/userAtom";
import {EBannerType, EIcon} from "@/types/enums/common-enum";
import Icons from "@/components/Icons";
import BoardOptionButton from "@/components/button/BoardOptionButton";

interface IBanner {
    type?: EBannerType,
    title: string,
    writer?: string,
    info?: {
        date: string,
        avatar: string
    }
}

const Banner = (props: IBanner) => {
    const [rcUser, setRcUser] = useRecoilState<IUser>(userAtom);

    return (
        <div className={styles.baseContainer}>
            <div className={styles.overlay}>
                <div className={styles.contentContainer}>
                    <div className={styles.content}>
                        <p>{props.title}</p>
                    </div>
                    {
                        (props.type === EBannerType.Read) &&
                        <div className={styles.info}>
                            <div className={styles.date}>
                                {props.info?.date || ""}
                            </div>
                            <Icons iconType={EIcon.Avatar} width={'32'} height={'32'} fill={'#C0C0C0'}/>
                            {
                                rcUser.userId === props.writer &&
                                <BoardOptionButton/>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default Banner;