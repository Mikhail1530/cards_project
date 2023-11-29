import s from './Header.module.scss'
import fancy_logo from '../../assets/pictures/fancy_logo.png'
import { HeaderAvatarPopup } from '@/view/modules/header/HeaderSelect/HeaderAvatarPopup'

export const Header = () => {
  return (
    <div className={s.header}>
      <img src={fancy_logo} alt={'logoPicture'} />
      <div className={s.avatarAndName}>
        <HeaderAvatarPopup />
      </div>
    </div>
  )
}
