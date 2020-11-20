export class DictionaryItem {
    key: string;
    value: string;
    displayText: string;
    code: string;
    checked?: boolean;
    typeGroup?: string;
    constructor(
      key: string,
      value: string,
      displayText: string,
      code: string,
      checked?: boolean,
      typeGroup?: string
    ) {
      (this.key = key),
        (this.value = value),
        (this.displayText = displayText),
        (this.code = code),
        (this.checked = checked),
        (this.typeGroup = typeGroup);
    }
}

