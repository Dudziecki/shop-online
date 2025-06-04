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
import s from "./UserStyles.module.css"


export const UserForm = () => {
  const dispatch = useAppDispatch()
  const formType = useAppSelector(selectFormType)

  const closeForm = () => {
    dispatch(toggleForm({ isShow: false }))
  }
  const toggleFormHandler = (formType: "signup" | "login") => {
    dispatch(toggleFormType({ formType }))
  }
  const isShow = useAppSelector(selectShowForm)
  return isShow ? (
    <>
      <div className={s.overlay} onClick={closeForm}></div>
      {formType === "signup" ? <UserSignUpForm isShow={isShow} toggleFormHandler={toggleFormHandler} closeForm={closeForm} /> :
        <UserLoginForm isShow={isShow} toggleFormHandler={toggleFormHandler} closeForm={closeForm} />}
    </>
  ) : <></>
}

// isShow ? <UserSignUpForm /> : <></>