'use client';

import {Controller, useFormContext, FieldValues, FieldPath} from "react-hook-form";

import {EInputShape} from "@/types/enums/common-enum";

import styles from './Input.module.scss';

interface IInput<TFieldValues extends FieldValues> {
    formDataName: FieldPath<TFieldValues>,
    width: string,
    placeholder: string,
    shape?: EInputShape,
    textAlign?: string
}

const Input = <TFieldValues extends FieldValues>(props: IInput<TFieldValues>) => {
    const {control} = useFormContext<TFieldValues>();

    return (
        <Controller
            control={control}
            name={props.formDataName}
            render={({field}) => (
                <input
                    className={
                        `${styles.inputBox} ${styles[props.shape || EInputShape.Round]} ${props.textAlign === 'left' ? styles.textAlignLeft : styles.textAlignCenter}`
                    }
                    style={{
                        width: `${props.width.includes('%') ? props.width : `${props.width}px`}`
                    }}
                    placeholder={props.placeholder}
                    {...field}
                />
            )}
        />
    )
}

export default Input;