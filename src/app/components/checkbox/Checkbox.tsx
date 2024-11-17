'use client'

import { InputHTMLAttributes, useEffect, useState } from 'react'
import styles from './checkbox.module.scss'
import cn from 'classnames'
import { motion } from 'framer-motion'

export interface CheckboxProps
    extends InputHTMLAttributes<HTMLInputElement> {
    checked: boolean,
    changeState?: () => void,
    label?: string;
}

export const CustomCheckbox = (
    { className, name, value, id, label, changeState, checked }: CheckboxProps
) => {

    const [isChecked, setIsChecked] = useState<boolean>(checked)

    const svgVariants = {
        unchecked: { opacity: 0, pathLength: 0, transition: { duration: 0.4 } },
        checked: { opacity: 1, pathLength: 1, transition: { duration: 0.4 } }
    }

    useEffect(() => {
        if (checked === true) {
            setIsChecked(true)
        }
        else setIsChecked(false)

        return () => setIsChecked(false)
    }, [checked])

    return (
        <>
            <svg
                className={cn(styles.checkbox, {
                    [styles.active]: isChecked
                })}
                aria-hidden='true'
                viewBox='0 0 15 11'
                fill='none'
                onClick={changeState}
            >
                <motion.path
                    d='M2 4.5L5 8L13 1'
                    strokeWidth='2'
                    stroke={
                        isChecked ? 'var(--white)' : 'none'
                    }
                    variants={svgVariants}
                    initial='unchecked'
                    animate={isChecked ? 'checked' : 'unchecked'}
                />
            </svg>
            <input type='checkbox'
                className={styles.customCheckbox}
                name={name}
                checked={checked}
                id={id}
                onChange={() => setIsChecked(!isChecked)}
            />
        </>
    )
}