import { type FC, type FormEvent, useState } from "react"
import type { UserBody } from "@/features/user/api/userApi.types.ts"
import { registerUserTC } from "@/features/user/userSlice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"

type UserSignUpFormProps = {
  closeForm: () => void
  toggleFormHandler:(type:string)=>void
}

export const UserSignUpForm: FC<UserSignUpFormProps> = ({ closeForm,toggleFormHandler }) => {
  const dispatch=useAppDispatch()
  const [values, setValues] = useState<UserBody>({
    email: "",
    avatar: "",
    name: "",
    password: ""
  })
  const handleChange = ({ target: { value, name } }: { target: { value: string, name: string } }) => {
    setValues({ ...values, [name]: value })
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isEmpty = Object.values(values).some(val => !val)
    if(isEmpty)return
    dispatch(registerUserTC(values))
    closeForm()
  }
  return (
    <div className={"wrapper"}>
      <div className="close" onClick={closeForm}>
        <svg className="icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.375 1.375L12.625 12.625" stroke="#576067" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
          <path d="M1.375 12.625L12.625 1.375" stroke="#576067" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
      </div>

      <div className="title">Sign Up</div>
      <form className={"form"} onSubmit={handleSubmit}>
        <div className="group">
          <input type="email"
                 placeholder="Your Email"
                 name="email"
                 value={values.email}
                 autoComplete="off"
                 onChange={handleChange}
                 required
          />
        </div>

        <div className="group">
          <input type="name"
                 placeholder="Your name"
                 name="name"
                 value={values.name}
                 autoComplete="off"
                 onChange={handleChange}
                 required
          />
        </div>

        <div className="group">
          <input type="password"
                 placeholder="Your password"
                 name="password"
                 value={values.password}
                 autoComplete="off"
                 onChange={handleChange}
                 required
          />
        </div>

        <div className="group">
          <input type="text"
                 placeholder="Your avatar"
                 name="avatar"
                 value={values.avatar}
                 autoComplete="off"
                 onChange={handleChange}
                 required
          />
        </div>
        <div className="link" onClick={()=>toggleFormHandler("login")}>I already have an account</div>
        <button type="submit" className="submit" >Create an account</button>
      </form>
    </div>
  )
}

