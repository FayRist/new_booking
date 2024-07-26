import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'thaidate'
})
export class ThaiDatePipe implements PipeTransform {
    transform(date: any, format: string): string {
        let ThaiDay = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
        let shortEngMonth = [
            'Jan', 'Feb', 'Mar', 'Ape', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        let shortThaiMonth = [
            'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
            'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
        ];
        let longThaiMonth = [
            'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
            'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
        ];
        let inputDate = new Date(date);
        let dataDate = [
            inputDate.getDay(), inputDate.getDate(), inputDate.getMonth(), inputDate.getFullYear(), inputDate.getHours(), inputDate.getMinutes(), inputDate.getSeconds()
        ];
        let outputDateFull = [
            'วัน ' + ThaiDay[dataDate[0]],
            'ที่ ' + dataDate[1],
            'เดือน ' + shortThaiMonth[dataDate[2]],
            'พ.ศ. ' + (dataDate[3] + 543),
            'เวลา ' + dataDate[4] + ':' + ('0' + dataDate[5]).slice(-2) + ':' + dataDate[6]
        ];
        let outputDateShort = [
            dataDate[1] + '-',
            shortEngMonth[dataDate[2]] + '-',
            dataDate[3] + ' ',
            dataDate[4] + ':' + ('0' + dataDate[5]).slice(-2)
        ];
        let outputDateShortThai = [
            longThaiMonth[dataDate[2]] + '/',
            dataDate[3]
        ];
        let outputDateShortYMD = [
            dataDate[1] + '-',
            shortEngMonth[dataDate[2]] + '-',
            dataDate[3]

        ];
        let outputDateShortHHMM = [
            ('0' + dataDate[4]).slice(-2) + ':' + ('0' + dataDate[5]).slice(-2)

        ];

        let outputDateTimeBot = [
            dataDate[4] + ':' + ('0' + dataDate[5]).slice(-2) + ':' + ('0' + dataDate[6]).slice(-2)
        ];

        let outputDateShortStake = [
            ('0' + dataDate[1]).slice(-2) + '-' + ('0' + (dataDate[2] + 1)).slice(-2) + '-' + dataDate[3],
            dataDate[4] + ':' + ('0' + dataDate[5]).slice(-2)
        ];

        let outputDateShortRequest = [
            ('0' + dataDate[1]).slice(-2) + '-' + ('0' + dataDate[2]).slice(-2) + '-' + dataDate[3],
            dataDate[4] + ':' + ('0' + dataDate[5]).slice(-2)
        ];

        let outputDateMedium = [
            dataDate[1],
            longThaiMonth[dataDate[2]],
            dataDate[3] + 543
        ];
        let outputDateSmall = [
            dataDate[1],
            shortThaiMonth
            [dataDate[2]],
            ', (' + ThaiDay[dataDate[0]] + ')',
        ];
        let outputDateTime = [
            'เวลา ' + dataDate[4] + ':' + ('0' + dataDate[5]).slice(-2) + ' น.'
        ];
        let outputDateBegin = [
            ('0' + dataDate[1]).slice(-2) + '-' +
            ('0' + (dataDate[2] + 1)).slice(-2) + '-' +
            dataDate[3]
        ];
        let outputDateThai = [
            dataDate[1],
            shortEngMonth[dataDate[2]],
            dataDate[3],
        ];
        let outputDateThaiTime = [
            dataDate[1] + '-',
            shortEngMonth[dataDate[2]] + '-',
            dataDate[3],
            ' รอบ ' + dataDate[4] + ':' + ('0' + dataDate[5]).slice(-2)
        ];

        let returnDate: string;
        returnDate = outputDateMedium.join(" ");
        if (format == 'full') {
            returnDate = outputDateFull.join(" ");
        }
        if (format == 'medium') {
            returnDate = outputDateMedium.join(" ");
        }
        if (format == 'short') {
            returnDate = outputDateShort.join("");
        }
        if (format == 'shortT') {
            returnDate = outputDateShortThai.join("");
        }
        if (format == 'shortYMD') {
            returnDate = outputDateShortYMD.join("");
        }
        if (format == 'shortHHMM') {
            returnDate = outputDateShortHHMM.join("");
        }
        if (format == 'shortstake') {
            returnDate = outputDateShortStake.join(" ");
        }
        if (format == 'small') {
            returnDate = outputDateSmall.join(" ");
        }
        if (format == 'time') {
            returnDate = outputDateTime.join(" ");
        }
        if (format == 'begin') {
            returnDate = outputDateBegin.join(" ");
        }
        if (format == 'pingpong') {
            returnDate = outputDateTimeBot.join(" ");
        }
        if (format == 'shortrequest') {
            returnDate = outputDateShortRequest.join(" ");
        }
        if (format == 'minithai') {
            returnDate = outputDateThai.join("-");
        }
        if (format == 'minithaitime') {
            returnDate = outputDateThaiTime.join("");
        }



        return returnDate;
    }
}
