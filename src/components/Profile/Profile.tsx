import { type FormEvent, useState } from "react"
import type { UserBody } from "@/features/user/api/userApi.types.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectCurrentUser, updateUserTC } from "@/features/user/userSlice.ts"


export const Profile = () => {
  const dispatch = useAppDispatch()
  const currentUser=useAppSelector(selectCurrentUser)
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
    if (isEmpty) return
    // dispatch(updateUserTC({id:currentUser.,}))

  }

  return (
    <div className={`Profile`}>
      {!currentUser?<span>You need to log in</span>: (
        <form className={s.form} onSubmit={handleSubmit}>
          <div className={s.group}>
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={values.email}
              autoComplete="off"
              onChange={handleChange}
              required
              className={s.input}
            />
          </div>

          <div className={s.group}>
            <input
              type="text"
              placeholder="Your name"
              name="name"
              value={values.name}
              autoComplete="off"
              onChange={handleChange}
              required
              className={s.input}
            />
          </div>

          <div className={s.group}>
            <input
              type="password"
              placeholder="Your password"
              name="password"
              value={values.password}
              autoComplete="off"
              onChange={handleChange}
              required
              className={s.input}
            />
          </div>

          <div className={s.group}>
            <input
              type="text"
              placeholder="Your avatar"
              name="avatar"
              value={values.avatar}
              autoComplete="off"
              onChange={handleChange}
              required
              className={s.input}
            />
          </div>


          <button type="submit" className={s.submit}>
            Update an account
          </button>
        </form>
      )}


    </div>
  )
}

