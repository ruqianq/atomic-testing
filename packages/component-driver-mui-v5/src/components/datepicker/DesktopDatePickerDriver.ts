import { HTMLTextInputDriver } from '@atomic-testing/component-driver-html';
import {
  ComponentDriver,
  IComponentDriverOption,
  IInputDriver,
  Interactor,
  PartLocator,
  ScenePart,
  byTagName,
} from '@atomic-testing/core';
import { dateToTextEntry, textEntryToDate } from './dateUtil';

const parts = {
  dateInput: {
    locator: byTagName('input'),
    driver: HTMLTextInputDriver,
  },
} satisfies ScenePart;

export class DesktopDatePickerDriver extends ComponentDriver<typeof parts> implements IInputDriver<Date | null> {
  constructor(locator: PartLocator, interactor: Interactor, option?: Partial<IComponentDriverOption>) {
    super(locator, interactor, {
      ...option,
      parts,
    });
  }

  async setValue(value: Date | null): Promise<boolean> {
    await this.enforcePartExistence('dateInput');
    let textToEnter = '';
    if (value != null) {
      const format = await this.getFormat();
      textToEnter = dateToTextEntry(value, format);
    }
    await this.interactor.enterText(this.parts.dateInput.locator, textToEnter);

    return true;
  }

  async getValue(): Promise<Date | null> {
    await this.enforcePartExistence('dateInput');
    const value = await this.interactor.getInputValue(this.parts.dateInput.locator);
    if (value != null) {
      const format = await this.getFormat();
      return textEntryToDate(value, format);
    }
    return null;
  }

  async getFormat(defaultFormat: string = 'mm/dd/yyyy'): Promise<string> {
    const placeHolder = await this.parts.dateInput.getAttribute('placeholder');
    return placeHolder ?? defaultFormat;
  }

  get driverName(): string {
    return 'MuiV5DesktopDatePicker';
  }
}
