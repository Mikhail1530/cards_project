import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

import s from './MyCheckbox.module.scss'

const MyCheckbox = () => {

  return (
    <form>
      <div>
        <Checkbox.Root type="button" className={s.CheckboxRoot} defaultChecked id="c1">
          <Checkbox.Indicator className={s.CheckboxIndicator}>
            <CheckIcon />
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