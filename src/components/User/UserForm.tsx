import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import {
  selectCurrentUser,
  selectFormType,
  selectShowForm,
  toggleForm,
  toggleFormType
} from "@/features/user/userSlice.ts"
import { UserSignUpForm } from "@/components/User/UserSignUpForm.tsx"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { UserLoginForm } from "@/components/User/UserLoginForm.tsx"


export const UserForm = () => {
  const dispatch = useAppDispatch()
  const formType = useAppSelector(selectFormType)

  const closeForm = () => {
    dispatch(toggleForm({ isShow: false }))
  }
  const toggleFormHandler = (formType: string) => {
    dispatch(toggleFormType({ formType }))
  }
  const isShow = useAppSelector(selectShowForm)
  return isShow ? (
    <>
      <div className="overlay" onClick={closeForm}></div>
      {formType === "signup" ? <UserSignUpForm toggleFormHandler={toggleFormHandler} closeForm={closeForm} /> :
        <UserLoginForm  toggleFormHandler={toggleFormHandler} closeForm={closeForm} />}
    </>
  ) : <></>
}

// isShow ? <UserSignUpForm /> : <></>