import { ReadingJsonService } from '../services/reading-json.service';

export default class ErrorMessageHelper {
  // static jsonService: ReadingJsonService = ReadingJsonService.getInstance();
  static errorMessages = [
    {
      errorCode: 'ACCOUNT_NOT_EXIST',
      mesage: 'Tài khoản không tồn tại'
    },
    {
      errorCode: 'WRONG_PASSWORD',
      mesage: 'Mật khẩu sai'
    },
    {
      errorCode: 'WRONG_USERNAME',
      mesage: 'Tên đăng nhập sai'
    },
    {
      errorCode: "ACCOUNT_NOT_ACTIVE'",
      mesage: 'Tài khoản chưa được kích hoạt. (Account not yet activated)'
    },
    {
      errorCode: 'TOKEN_NOT_EXIST',
      mesage: 'Token không tồn tại'
    }
  ];

  static getInvalidMessages(errorMessage) {
    const data = this.errorMessages.find(o => o.errorCode === errorMessage);
    return data ? data.mesage : null;
  }
}
