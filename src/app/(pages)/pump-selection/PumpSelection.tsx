'use client'
import Link from 'next/link'
import styles from './pump-selection.module.scss'
import cn from 'classnames'
import { Dispatch, SetStateAction, useState } from 'react'
import { type pumpSeriesType, pumpsSeries } from './pumpSeries'
import { CustomCheckbox } from '@/app/components/checkbox/Checkbox'
import Image from 'next/image'
import { motion } from 'framer-motion'

export type FilterType = {
    date: string,
    performance: number,
    pressure: number,
    pumps: number,
    series: string[]
}

const PumpSelection = () => {
    const [isFieldOfApplication, setFieldOfApplication] = useState<string>('')
    const fieldOfApplication = ['Все насосы', 'Водоснабжение', 'Канализация и водоотведение', 'Отопление/Кондиционирование']
    const [seriesFromSelectedField, setSeriesFromSelectedField] = useState<pumpSeriesType[]>([])

    const [performance, setPerformance] = useState<number>(1)
    const [pressure, setPressure] = useState<number>(1)
    const [pumps, setPumps] = useState<number>(1)

    type LoadingType = 'idle' | 'pending' | 'succeeded' | 'failed'
    const [isloading, setLoading] = useState<LoadingType>('idle')
    const [resultInfo, setResultInfo] = useState<any>('')

    function handleChange(e: any, func: Dispatch<SetStateAction<number>>, number: number) {
        if (e.target.value > number) {
            func(number)
        }
        else if (e.target.value < 0) {
            func(1)
        }
        else {
            func(e.target.value)
        }
    }

    const submitHandler = async () => {
        const date = new Intl.DateTimeFormat('ru-Ru').format(new Date())
        const series: string[] = []
        seriesFromSelectedField.filter(item => {
            if (item.checked === true) {
                series.push(item.series)
            }
        })

        const data: FilterType = {
            date,
            performance,
            pressure,
            pumps,
            series,
        }

        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/pumps-info'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()
        return result
    }

    return <section className={styles.container}>
        <div className={styles.header_section}>
            {isloading === 'succeeded' ? <p className={styles.title}>Результат подбора насосов</p> : <p className={styles.title}>Подбор насосов</p>}
            <div className={styles.navigation}>
                <Link href={'/'}><span className={styles.navigation_title}>Главная</span></Link>
                <span className={styles.separator}>-</span>
                <span className={styles.navigation_title}>Подбор насосов</span>
                {isloading === 'succeeded' && <>
                    <span className={styles.separator}>-</span>
                    <span className={styles.navigation_title}>Результат подбора насосов</span>
                </>}
            </div>
        </div>

        <motion.div className={styles.content_main}
            initial={{ x: 0, opacity: 1, visibility: 'visible', height: 'max-content', display: 'block' }}
            animate={isloading === 'succeeded' ? { x: '-100vw', opacity: 0, visibility: 'hidden', height: 0, display: 'none' } :
                { x: 0, opacity: 1, visibility: 'visible' }
            }
            transition={{
                type: 'keyframes',
                duration: 0.3,
            }}
        >
            <div className={styles.pump_selection_container}>
                <div className={styles.left_block}>
                    <div className={styles.block_container}>
                        <span data-title={'1'} className={styles.title}>Область применения</span>
                        <div className={styles.selector}>
                            {fieldOfApplication.map((item, index) => {
                                return <span className={cn(styles.list_item, {
                                    [styles.active]: item === isFieldOfApplication
                                })} key={index}
                                    onClick={() => {
                                        setFieldOfApplication(item)
                                        const filteredArr = pumpsSeries.filter(scope => {
                                            if (item === 'Все насосы') {
                                                return pumpsSeries
                                            }
                                            return scope.scope === item
                                        }
                                        )
                                        setSeriesFromSelectedField([...filteredArr])
                                    }}
                                >{item}</span>
                            })}
                        </div>
                    </div>
                </div>

                <div className={styles.center_block}>
                    <div className={styles.block_container}>

                        <span data-title={'2'} className={styles.title}>Серии насосов</span>

                        <div className={styles.selector}>
                            <div className={styles.header}>
                                {seriesFromSelectedField.length === 0 ? <span className={styles.selectOf}>Выберите область применения</span> :
                                    <motion.div
                                        initial={{ x: 10, opacity: 0.9, }}
                                        animate={{ x: 0, opacity: 1, }}
                                        transition={{
                                            type: 'keyframes',
                                            duration: 0.2
                                        }}
                                    >
                                        <span className={styles.selectOf}>{`${seriesFromSelectedField.filter(item => item.checked === true).length} из ${seriesFromSelectedField.length} выбрано`}</span>
                                        <span className={cn(styles.reset, {
                                            [styles.active]: seriesFromSelectedField.filter(item => item.checked === true).length !== 0
                                        })}
                                            onClick={() => {
                                                const newArr = seriesFromSelectedField.map(series => {
                                                    return {
                                                        ...series,
                                                        checked: false,
                                                    }
                                                })
                                                setSeriesFromSelectedField([...newArr])
                                            }}
                                        >Сбросить выбор</span></motion.div>}
                            </div>

                            <div className={styles.series_container}>
                                {seriesFromSelectedField.map((el, index) => {
                                    return <motion.div key={index} className={styles.series}
                                        onClick={() => {
                                            const newArr = seriesFromSelectedField.map(series => {
                                                if (series.series === el.series) {
                                                    return {
                                                        ...series,
                                                        checked: !series.checked
                                                    }
                                                }
                                                return series
                                            })
                                            setSeriesFromSelectedField([...newArr])
                                        }}
                                        initial={{ x: 10, opacity: 0.9, }}
                                        animate={{ x: 0, opacity: 1, }}
                                        transition={{
                                            type: 'keyframes',
                                            duration: 0.2
                                        }}
                                    >
                                        <CustomCheckbox checked={el.checked} />
                                        <Image
                                            src={el.image}
                                            alt={el.series}
                                            width={48}
                                            height={48}
                                            style={{
                                                aspectRatio: '1',
                                                objectFit: 'contain'
                                            }}
                                        />
                                        <span className={styles.name}>{el.series}</span>
                                    </motion.div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.right_block}>
                    <div className={styles.block_container}>
                        <span data-title={'3'} className={styles.title}>Вводимые данные</span>
                    </div>

                    <div className={styles.selector}>
                        {isFieldOfApplication.length !== 0 && seriesFromSelectedField.filter(item => item.checked === true).length === 0 ?
                            <span className={styles.empty}>Выберите одну или несколько серий насосов</span> :
                            <></>}
                        {seriesFromSelectedField.filter(item => item.checked === true).length !== 0 ? <motion.div
                            initial={{ x: 20, opacity: 0.9, }}
                            animate={{ x: 0, opacity: 1, }}
                            transition={{
                                type: 'keyframes',
                                duration: 0.2
                            }}
                        ><div className={styles.filter_item}>
                                <span className={styles.filter_title} data-star={'*'}>Производительность</span>
                                <div>
                                    <input type="number" min={1} max={12} value={performance}
                                        onChange={(e) => handleChange(e, setPerformance, 12)}
                                    />
                                    <span className={styles.measure}>м<span className={styles.sup}>3</span><span className={styles.divider} />/ч</span>
                                </div>
                            </div>
                            <div className={styles.filter_item}>
                                <span className={styles.filter_title} data-star={'*'}>Напор</span>
                                <div>
                                    <input type="number" min={1} max={12} value={pressure}
                                        onChange={(e) => handleChange(e, setPressure, 12)}
                                    />
                                    <span className={styles.measure}>м</span>
                                </div>
                            </div>
                            <div className={styles.filter_item}>
                                <span className={styles.filter_title}>Количество параллельно работающих насосов</span>
                                <div>
                                    <input type="range" min={1} max={8} value={pumps} step={1}
                                        onChange={(e) => handleChange(e, setPumps, 8)}
                                    />
                                    <span className={styles.count}>{pumps}</span>
                                </div>
                            </div>
                            <button className={styles.submit}
                                onClick={async () => {
                                    setLoading('pending')
                                    try {
                                        const result = await submitHandler()
                                        if (result?.message === 'Данные успешно получены') {
                                            setLoading('succeeded')
                                            setResultInfo(result)
                                        }

                                    } catch (error) {
                                        setLoading('failed')
                                    }
                                }}
                            >Далее</button>
                        </motion.div> : <></>}
                    </div>
                </div>

            </div>
        </motion.div>
        <motion.div className={styles.content_info}
            initial={{ x: '100vw', opacity: 0, visibility: 'hidden', height: 0, display: 'none' }}
            animate={isloading === 'succeeded' ? { x: 0, opacity: 1, visibility: 'visible', height: 'max-content', display: 'block' } :
                { x: '100vw', opacity: 0, visibility: 'hidden', height: 0 }
            }
            transition={{
                type: 'keyframes',
                duration: 0.3,
                delay: 0.3,
            }}
        >
            <span onClick={() => {
                setLoading('idle')
                setResultInfo('')
            }} className={styles.back}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12L6 8L10 4" stroke="#999999" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"></path>
                </svg>Назад к параметрам поиска</span>
            <span className={styles.title}>Рабочая точка</span>
            <div className={styles.filters_container}>
                <div className={cn(styles.filter_item, styles.result)}>
                    <span className={styles.filter_title}>Производительность</span>
                    <div>
                        <input type="number" min={1} max={12} value={performance}
                            onChange={(e) => handleChange(e, setPerformance, 12)}
                        />
                        <span className={styles.measure}>м<span className={styles.sup}>3</span><span className={styles.divider} />/ч</span>
                    </div>
                </div>
                <div className={cn(styles.filter_item, styles.result)}>
                    <span className={styles.filter_title}>Напор</span>
                    <div>
                        <input type="number" min={1} max={12} value={pressure}
                            onChange={(e) => handleChange(e, setPressure, 12)}
                        />
                        <span className={styles.measure}>м</span>
                    </div>
                </div>
                <button className={styles.pick_up}>Подобрать</button>
            </div>
            <p className={styles.title}>Результат по сериям насосов:</p>
            {
                resultInfo.series && resultInfo.series.map((el: any, index: number) => <p key={index} className={styles.title}>{el}</p>)
            }
            {
                resultInfo.info &&
                <p className={styles.info}>{resultInfo.info}</p>
            }


        </motion.div>
    </section>
}

export default PumpSelection