'use client';

import {useRecoilState} from "recoil";
import {useQuery} from "react-query";

import {IUser} from "@/types/interfaces/common-interface";
import {userAtom} from "@/atoms/userAtom";
import {EBannerType, EIcon} from "@/types/enums/common-enum";
import {EQuerykey} from "@/types/enums/querykey-enum";
import axiosInstance from "@/libs/axios";
import {bannerAtom} from "@/atoms/bannerAtom";

import styles from './Banner.module.scss';
import Icons from "@/components/Icons";
import BoardOptionButton from "@/components/button/BoardOptionButton";

interface IBanner {
    type: EBannerType,
    title: string,
    writer?: string,
    date?: string,
    avatar?: string
}

const Banner = (props: IBanner) => {
    const [rcUser, setRcUser] = useRecoilState<IUser>(userAtom);
    const [rcBanner, setRcBanner] = useRecoilState<IBanner>(bannerAtom);

    const resUpdateImage = useQuery(
        [EQuerykey.UPDATE_IMAGE],
        () => axiosInstance.get('/api/updateImage', {
            params: {topic: "office", perPage: 30}
        }),
        {
            onSuccess: (data) => {
                !!data?.data?.imageUrl &&
                (rcBanner.bannerUrl !== data.data.imageUrl) &&
                setRcBanner({bannerUrl: data.data.imageUrl});
            }
        }
    )

    return (
        <div className={styles.baseContainer}>
            <div className={styles.imageWrapper}>
                {
                    resUpdateImage.status !== 'success' ||
                    resUpdateImage.isFetching === true ? (
                        <div
                            className={styles.backgroundImage}
                        />
                    ) : (
                        <div
                            className={styles.backgroundImage}
                            style={{backgroundImage: `url(${rcBanner.bannerUrl})`}}
                        />
                    )
                }
            </div>
            <div className={styles.overlay}>
                <div className={styles.contentContainer}>
                    <div className={styles.content}>
                        {props.title}
                    </div>
                    {
                        (props.type === EBannerType.Read) &&
                        <div className={styles.info}>
                            <div className={styles.date}>
                                {props.date}
                            </div>
                            <Icons iconType={EIcon.Avatar} width={32} height={32} fill={'#C0C0C0'}/>
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