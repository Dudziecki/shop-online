import s from "./Poster.module.css"
import BG from "@/assets/images/comp.png"

export const Poster = () => {
  return (
    <section className={s.home}>
      <div className={s.title}>BIG SALE 20%</div>
      <div className={s.product}>
        <div className={s.text}>
          <div className={s.subtitle}>the bestseller of 2025</div>
          <h1 className={s.head}>LENNON r2d2 with NVIDIA 5090 TI</h1>
          <button className={s.button}>Shop Now</button>
        </div>
        <div className={s.image}>
          <img src={BG} alt="computer"/>
        </div>
      </div>
    </section>
  )
}