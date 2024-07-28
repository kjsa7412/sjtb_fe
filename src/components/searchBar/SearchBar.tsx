'use client';

import styles from './SearchBar.module.scss';
import Icons from "@/components/Icons";
import {EIcon} from "@/types/enums/common-enum";
import {useState} from "react";
import useActionAndNavigate from "@/hooks/useActionAndNavigate";

const SearchBar = () => {
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
        <div className={styles.baseContainer}>
            <div className={styles.inputContainer}>
                <div className={styles.buttonContainer} onClick={handleSearch}>
                    <Icons iconType={EIcon.Search} fill={'#929292'} width={'20'} height={'20'}/>
                </div>
                <input className={styles.input}
                       type="text"
                       value={query}
                       onChange={(e) => setQuery(e.target.value)}
                       onKeyPress={handleKeyPress}
                />
            </div>
        </div>
    )
}

export default SearchBar;