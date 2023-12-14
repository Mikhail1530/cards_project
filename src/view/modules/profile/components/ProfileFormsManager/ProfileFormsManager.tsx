import { useState } from 'react'
import { PersonalInformationForm } from '@/view/modules/profile'
import { EditPencil, Logout } from '@/view/assets/icons'
import s from './ProfileFormsManager.module.scss'
import {
  useAuthMeQuery,
  useLogoutMutation,
  useUpdatePersonalInfoMutation,
} from '@/api/services/auth/auth.service'
import anonymous from '@/view/assets/pictures/anonymous.jpeg'
import { Button } from '@/view/ui'
import { useNavigate } from 'react-router-dom'
import { userActions } from '@/view/modules/auth/slices/auth-slice'
import { useDispatch } from 'react-redux'

type ProfileFormsManagerPropsType = {
  type: 'PROFILE' | 'LOGOUT-BTN' | 'SIGN-UP'
}

export const ProfileFormsManager = ({ type }: ProfileFormsManagerPropsType) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const { data: authData } = useAuthMeQuery()
  const [logout] = useLogoutMutation()
  const [updatePersonalInfo] = useUpdatePersonalInfoMutation()

  if (!authData) {
    return <div>Something went wrong!</div>
  }

  //error={error1 || error2 || error3}
  let formComponent
  switch (type) {
    case 'PROFILE': {
      formComponent = (
        <PersonalInformationForm
          onSubmit={updatePersonalInfo}
          logout={logout}
          icon={<EditPencil />}
          avatar={authData.avatar ?? anonymous}
          email={authData.email}
          nickname={authData.name}
          id={authData.id}
          onClose={() => setOpen(!open)}
          open={open}
        />
      )
      break
    }
    case 'LOGOUT-BTN': {
      const handleLogout = async () => {
        navigate('/login')
        await logout()
        dispatch(userActions.clearUsereDataAC())
      }
      formComponent = (
        <form onSubmit={handleLogout}>
          <Button className={s.signoutBtn} variant={'link'} icon={<Logout />} fullWidth={false}>
            Sign out
          </Button>
        </form>
      )
      break
    }
  }
  return formComponent
}
