import { NextResponse } from "next/server";
import { type FilterType } from "../../pump-selection/PumpSelection";

async function getResult(data: FilterType) {

  return {
    status: 'succeeded',
    series: data.series,
    info: 'Насосы представляют собой вертикальные многоступенчатые центробежные насосы с нормальным всасыванием со стандартным электродвигателем. Насос состоит из основания и головной части. Промежуточные камеры и цилиндрический кожух соединены между собой, а также с основанием и головной частью при помощи стяжных болтов. Всасывающий и напорный патрубки находятся в основании насоса и расположены соосно (конструкция «ин-лайн»), что позволяет устанавливать насос на горизонтальном трубопроводе. Все насосы оснащаются необслуживаемым торцевым механическим уплотнением вала картриджевого типа.'
  }
}

export async function POST(request: Request) {
  const body = await request.json()

  try {
    const result = await getResult({ ...body })
    if (result?.status) {
      return NextResponse.json({ message: 'Данные успешно получены', ...result });
    } else {
      return NextResponse.json({ message: "Возникла ошибка при получении данных" })
    }
  } catch (error: any) {
    return NextResponse.json({ message: `${error.message}` })
  }
}