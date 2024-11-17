import { StaticImageData } from 'next/image'
import Img1 from '../../../../public/WRE.png'
import Img2 from '../../../../public/WRS-3.png'
import Img3 from '../../../../public/WRS-1.png'
import Img4 from '../../../../public/CV-ie3.jpg'
import Img5 from '../../../../public/CV.jpg'
import Img6 from '../../../../public/CVF.jpg'
import Img7 from '../../../../public/CUC.jpg'
import Img8 from '../../../../public/TG-TD.jpg'
import Img9 from '../../../../public/NBW.jpg'
import Img10 from '../../../../public/NBS.jpg'
import Img11 from '../../../../public/NKW.jpg'
import Img12 from '../../../../public/WQ.jpg'
import Img13 from '../../../../public/GNWQ.jpg'

export type pumpSeriesType = {
    scope: string,
    image: StaticImageData,
    series: string,
    checked: boolean,
}

export const pumpsSeries: pumpSeriesType[] = [
    {
        scope: 'Отопление/Кондиционирование',
        image: Img1,
        series: 'WRE (электронные)',
        checked: false,
    },
    {
        scope: 'Отопление/Кондиционирование',
        image: Img2,
        series: 'WRS (3 скорости)',
        checked: false,
    },
    {
        scope: 'Отопление/Кондиционирование',
        image: Img3,
        series: 'WRS (1 скорость)',
        checked: false,
    },
    {
        scope: 'Водоснабжение',
        image: Img4,
        series: 'CV (IE3)',
        checked: false,
    },
    {
        scope: 'Водоснабжение',
        image: Img5,
        series: 'CV',
        checked: false,
    },
    {
        scope: 'Водоснабжение',
        image: Img6,
        series: 'CVF',
        checked: false,
    },
    {
        scope: 'Водоснабжение',
        image: Img7,
        series: 'CUC',
        checked: false,
    },
    {
        scope: 'Отопление/Кондиционирование',
        image: Img8,
        series: 'TG/TD',
        checked: false,
    },
    {
        scope: 'Водоснабжение',
        image: Img9,
        series: 'NBW',
        checked: false,
    },
    {
        scope: 'Водоснабжение',
        image: Img10,
        series: 'NBS',
        checked: false,
    },
    {
        scope: 'Водоснабжение',
        image: Img11,
        series: 'NKW',
        checked: false,
    },
    {
        scope: 'Канализация и водоотведение',
        image: Img12,
        series: 'WQ',
        checked: false,
    },
    {
        scope: 'Канализация и водоотведение',
        image: Img13,
        series: 'GNWQ',
        checked: false,
    },
]

export default pumpsSeries