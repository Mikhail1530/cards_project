import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

import s from './MyCheckbox.module.scss'
import { ComponentPropsWithoutRef, ElementType } from "react";

export type MyCheckboxProps<T extends ElementType> = {
  as?: T
  title?: string
  children?: string
} & ComponentPropsWithoutRef<T>


const MyCheckbox = <T extends ElementType = 'button'>(props: MyCheckboxProps<T>) => {
  const {as: Component = 'button', ...rest} = props
  return (
    <form>
      <div>
        <Checkbox.Root type="button" className={s.CheckboxRoot} defaultChecked {...rest}>
          <Checkbox.Indicator className={s.CheckboxIndicator}>
            {/*<CheckIcon /> // todo: add svg here*/}
          </Checkbox.Indicator>git
        </Checkbox.Root>
        <label className={s.Label} htmlFor="c1">
          Accept terms and conditions.
        </label>
      </div>
    </form>
  );
};

export default MyCheckbox;