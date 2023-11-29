import { useState } from 'react'
import { PersonalInformationForm } from '@/view/modules/profile'
import { Bin } from '@/view/assets/icons'
import avatar from '../../../../../view/assets/pictures/logo.png'

type ProfileFormsManagerPropsType = {
  type: 'PROFILE' | 'LOGOUT'
}

export const ProfileFormsManager = ({ type }: ProfileFormsManagerPropsType) => {
  // const [createNewCard] = useCreateCardMutation()
  // const [handleCardEdit] = useUpdateCardMutation()
  // const [handleCardDelete] = useDeleteCardMutation()
  const [open, setOpen] = useState(false)
  //error={error1 || error2 || error3}
  let formComponent
  switch (type) {
    case 'PROFILE': {
      formComponent = (
        <PersonalInformationForm
          onSubmit={() => {}}
          // open={open}
          // onClose={() => setOpen(!open)}
          icon={<Bin />}
          avatar={avatar}
          changeAvatar={() => {}}
          changeName={() => {}}
          email={''}
          nickname={''}
          saveChangedName={() => {}}
          onClose={() => setOpen(!open)}
          open={open}
        />
      )
      break
    }
    // case 'LOGOUT': {
    //   formComponent = (
    //     <EditCardForm
    //       open={open}
    //       onClose={() => setOpen(!open)}
    //     />
    //   )
    //   break
    // }
  }
  return formComponent
}
