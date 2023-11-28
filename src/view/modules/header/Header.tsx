import s from './Header.module.scss'
import logo from '../../assets/pictures/logo.png'
import { HeaderAvatarPopup } from '@/view/modules/header/HeaderSelect/HeaderAvatarPopup'

export const Header = () => {
  return (
    <div className={s.header}>
      <img src={logo} alt={'logoPicture'} />
      <div className={s.avatarAndName}>
        <HeaderAvatarPopup />
      </div>
    </div>
  )
}
