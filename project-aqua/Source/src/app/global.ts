declare var window: any;

import * as moment from 'moment';
import { EventEmitterService } from './shared/services/event-emitter.service';



const eventEmitterService = new EventEmitterService();

export { eventEmitterService };

window.myParseDate = (input: string, format: string): Date => {
  // TODO check format string;
  // dd/MM/yyyy  => moment : DD/MM/YYYY
  const format1 = 'ddMMyyyy';
  const format2 = 'd/m/yyyy';
  const format3 = 'dd/MM/yyyy';
  let formatMoment: string;
  switch (format) {
    case format1:
    case format2:
    case format3: {
      formatMoment = 'DD/MM/YYYY';
      break;
    }
    default: {
      formatMoment = format;
    }
  }
  const mDate = moment(input, formatMoment);
  if (mDate.isValid()) {
    return mDate.toDate();
  }
  return null;
};
