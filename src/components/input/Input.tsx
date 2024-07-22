'use client';

import styles from './Input.module.scss';
import {EInputShape} from "@/types/enums/common-enum";
import {Controller, useFormContext, FieldValues, FieldPath} from "react-hook-form";

interface IInput<TFieldValues extends FieldValues> {
    formDataName: FieldPath<TFieldValues>,
    width: string,
    placeholder: string,
    shape?: EInputShape
}

const Input = <TFieldValues extends FieldValues>(props: IInput<TFieldValues>) => {
    const { control } = useFormContext<TFieldValues>();

    return (
        <Controller
            control={control}
            name={props.formDataName}
            render={({field}) => (
                <input
                    className={`${styles.inputBox} ${styles[props.shape || EInputShape.Round]}`}
                    style={{width: `${props.width}px`}}
                    placeholder={props.placeholder}
                    {...field}
                />
            )}
        />
    )
}

export default Input;