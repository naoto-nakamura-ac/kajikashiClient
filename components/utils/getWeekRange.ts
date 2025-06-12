import {startOfWeek,endOfWeek , addWeeks,format} from "date-fns";
import {ja} from 'date-fns/locale'

export type WeekRange = {
    from: string;
    to: string;
}

export const getWeekRange= (offset: number = 0): WeekRange =>{
    const now = new Date();

    const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);

    // 開始日・終了日を取得（月曜始まり）
    const monday = startOfWeek(addWeeks(jstNow, offset), {
        weekStartsOn: 1,
        locale: ja,
    });

    const sunday = endOfWeek(monday, {
        weekStartsOn: 1,
        locale: ja,
    });

    return {
        from: format(monday, 'yyyy-MM-dd'),
        to: format(sunday, 'yyyy-MM-dd'),
    };
}