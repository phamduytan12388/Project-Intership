import * as moment from 'moment';

export default class DateTimeConvertHelper {
    private static readonly dateFormat = 'DD/MM/YYYY';
    private static readonly secondFormat = 'X';

    static fromDtObjectToTimestamp(dtObject: Date): number {
        return dtObject ? Math.floor(dtObject.getTime() / 1000) : null;
    }

    static fromTimestampToDtObject(timestamp: number): Date {
        return timestamp ? new Date(timestamp * 1000) : null;
    }

    static fromTimestampToDtStr(timestamp: number): string {
        return moment(timestamp).format(this.dateFormat);
    }
}
