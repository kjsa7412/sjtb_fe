'use client';

import styles from './Banner.module.scss';
import {ILogin, IUser} from "@/types/interfaces/common-interface";
import {loginAtom} from "@/atoms/loginAtom";
import {useRecoilState} from "recoil";
import {userAtom} from "@/atoms/userAtom";
import {EIcon} from "@/types/enums/common-enum";
import Icons from "@/components/Icons";
import {IconPostOption} from "../../../public/svgs";

interface IBanner {
    title: string,
    writer?: string,
    info?: {
        date: string,
        avatar: string
    }
}

const Banner = (props: IBanner) => {
    const [rcLogin, setRcLogin] = useRecoilState<ILogin>(loginAtom);
    const [rcUser, setRcUser] = useRecoilState<IUser>(userAtom);

    return (
        <div className={styles.baseContainer}>
            <div className={styles.overlay}>
                <div className={styles.contentContainer}>
                    <div className={styles.content}>
                        <p>{props.title}</p>
                    </div>
                    {
                        !!rcLogin.isLogin &&
                        <div className={styles.info}>
                            <div className={styles.date}>
                                {props.info?.date || ""}
                            </div>
                            <Icons iconType={EIcon.Avatar} width={'32'} height={'32'} fill={'#C0C0C0'}/>
                            {
                                true &&
                                <div className={styles.option}>
                                    <Icons iconType={EIcon.Option} width={'32'} height={'32'} fill={'#FFFFFF'}/>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default Banner;