import { Link } from "react-router-dom"
import { ROUTES } from "@/common/utils/Routes.ts"
import LOGO from "@/assets/images/LOGO.svg"
import search from "@/assets/images/search2.svg"
import Avatar from "@/assets/images/Avatar.svg"
import s from "./Header.module.css"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectCart, selectCurrentUser, toggleForm } from "@/features/user/userSlice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { type ChangeEvent, useEffect, useState } from "react"
import { useGetProductsQuery } from "@/features/products/product/productApi.ts"
import type { Product } from "@/components/Products/types.ts"

export const Header = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectCurrentUser)
  const cart = useAppSelector(selectCart)

  const [searchValue, setSearchValue] = useState("")
  const { data: searchResults = [], isLoading } = useGetProductsQuery(
    { title: searchValue },
    { skip: !searchValue }
  );
  const [values, setValues] = useState<{ name: string, avatar: string }>({ name: "Guest", avatar: Avatar })
  const handleClick = () => {
    if (!currentUser) {
      dispatch(toggleForm({ isShow: true }))
    }
  }
  const handleSearch=(e:ChangeEvent<HTMLInputElement>)=>{
    setSearchValue(e.currentTarget.value)
  }
  useEffect(() => {
    if (!currentUser) return
    setValues(currentUser)
  }, [currentUser])
  return (
    <div className={s.header}>
      <div className={s.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Stuff" />
        </Link>
      </div>

      <div className={s.info}>
        <div className={s.user} onClick={handleClick}>
          <div className={s.avatar} style={{ backgroundImage: `url(${values.avatar})` }} />
          <div className={s.username}>{values.name}</div>
        </div>
      </div>

      <form className={s.searchForm}>
        <div className={s.icon}>
          <img src={search} alt="search" />
        </div>
        <div className={s.inputWrapper}>
          <input
            type="search"
            name="search"
            placeholder="Search for anything..."
            autoComplete="off"
            onChange={handleSearch}
            value={searchValue}
          />
        </div>
        {searchValue && (
          <div className={s.box}>
            {isLoading ? "Loading" : !searchResults.length ? "No results" : (
              searchResults.map((el: Product) => (
                <Link
                  key={el.id}
                  onClick={() => setSearchValue("")}
                  className={s.item}
                  to={`/products/${el.id}`}
                >
                  <div
                    className={s.image}
                    style={{ backgroundImage: `url(${el.images[0]})` }}
                  />
                  <div className={s.title}>{el.title}</div>
                </Link>
              ))
            )}
          </div>
        )}

      </form>

      <div className={s.account}>
        <Link to={ROUTES.FAVOURITES}>
          <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 11C0.75 8 1.5 3.5 5.25 2C9 0.5 11.25 3.5 12 5C12.75 3.5 15.75 0.5 19.5 2C23.25 3.5 23.25 8 21 11C18.75 14 12 20 12 20C12 20 5.25 14 3 11Z"
              stroke="#B8B8B8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>

        <Link to={ROUTES.CART} className={s.cartLink}>
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.94 17.06L16.26 7.31C16.1453 6.47997 15.7404 5.71734 15.1172 5.15725C14.4939 4.59716 13.6926 4.27576 12.855 4.25H12.75C12.75 3.25544 12.3549 2.30161 11.6517 1.59835C10.9484 0.895088 9.99458 0.5 9.00002 0.5C8.00546 0.5 7.05163 0.895088 6.34837 1.59835C5.64511 2.30161 5.25002 3.25544 5.25002 4.25H5.14502C4.30749 4.27576 3.50611 4.59716 2.88287 5.15725C2.25963 5.71734 1.85477 6.47997 1.74002 7.31L0.0600206 17.06C-0.0431661 17.6256 -0.0207379 18.2071 0.125717 18.7631C0.272172 19.3191 0.539073 19.8361 0.907521 20.2775C1.21796 20.6565 1.60803 20.9625 2.05003 21.1738C2.49204 21.385 2.97513 21.4964 3.46502 21.5H14.535C15.0249 21.4964 15.508 21.385 15.95 21.1738C16.392 20.9625 16.7821 20.6565 17.0925 20.2775C17.461 19.8361 17.7279 19.3191 17.8743 18.7631C18.0208 18.2071 18.0432 17.6256 17.94 17.06ZM9.00002 2C9.59676 2 10.1691 2.23705 10.591 2.65901C11.013 3.08097 11.25 3.65326 11.25 4.25H6.75002C6.75002 3.65326 6.98707 3.08097 7.40903 2.65901C7.83099 2.23705 8.40328 2 9.00002 2ZM15.945 19.31C15.7755 19.522 15.5612 19.6938 15.3174 19.8131C15.0736 19.9325 14.8064 19.9963 14.535 20H3.46502C3.19362 19.9963 2.92643 19.9325 2.68263 19.8131C2.43883 19.6938 2.2245 19.522 2.05502 19.31C1.82646 19.0365 1.66149 18.7157 1.57199 18.3707C1.4825 18.0257 1.47073 17.6651 1.53752 17.315L3.21752 7.565C3.27335 7.08382 3.49737 6.63782 3.85004 6.30574C4.20271 5.97365 4.66135 5.77683 5.14502 5.75H12.855C13.3387 5.77683 13.7973 5.97365 14.15 6.30574C14.5027 6.63782 14.7267 7.08382 14.7825 7.565L16.4625 17.315C16.5293 17.6651 16.5175 18.0257 16.428 18.3707C16.3386 18.7157 16.1736 19.0365 15.945 19.31Z"
              fill="#B8B8B8"
            />
          </svg>
          {!!cart.length && <span className={s.count}>{cart.length}</span>}

        </Link>
      </div>
    </div>
  )
}

