import { useState } from 'react'
import { PersonalInformationForm } from '@/view/modules/profile'

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
          avatar={''}
          changeAvatar={() => {}}
          changeName={() => {}}
          email={''}
          nickname={''}
          saveChangedName={() => {}}
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
