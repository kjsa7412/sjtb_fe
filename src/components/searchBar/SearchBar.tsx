'use client';

import {useState} from "react";

import {EIcon} from "@/types/enums/common-enum";
import useActionAndNavigate from "@/hooks/useActionAndNavigate";
import useIsLargeScreen from "@/hooks/useIsLargeScreen";

import styles from './SearchBar.module.scss';
import Icons from "@/components/Icons";

const SearchBar = () => {
    const isLargeScreen = useIsLargeScreen();
    const [query, setQuery] = useState('');
    const actionAndNavigate = useActionAndNavigate();

    const handleSearch = () => {
        actionAndNavigate.actionAndNavigate(`/board/search/${query}`);
        setQuery('');
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            actionAndNavigate.actionAndNavigate(`/board/search/${query}`);
            setQuery('');
        }
    };

    return (
        <>
            {
                isLargeScreen &&
                <div className={styles.baseContainer}>
                    <div className={styles.inputContainer}>
                        <button className={styles.buttonContainer} onClick={handleSearch}>
                            <Icons iconType={EIcon.Search} fill={'#929292'} width={20} height={20}/>
                        </button>
                        <input className={styles.input}
                               type="text"
                               value={query}
                               onChange={(e) => setQuery(e.target.value)}
                               onKeyPress={handleKeyPress}
                        />
                    </div>
                </div>
            }
        </>
    )
}

export default SearchBar;