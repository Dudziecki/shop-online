import { NavLink } from "react-router-dom";
import s from "./Sidebar.module.css";

export const Sidebar = () => {
  return (
    <section className={s.sidebar}>
      <div className={s.title}>CATEGORIES</div>
      <nav>
        <ul className={s.menu}>
          <NavLink to={`/categories/${1}`} className={s.link}>Computers</NavLink>
          <NavLink to="/clothes" className={s.link}>Clothes</NavLink>
          <NavLink to="/shoes" className={s.link}>Shoes</NavLink>
          <NavLink to="/furniture" className={s.link}>Furniture</NavLink>
          <NavLink to="/cosmetics" className={s.link}>Cosmetics</NavLink>
          <NavLink to="/travel" className={s.link}>Travel</NavLink>
          <NavLink to="/automotive" className={s.link}>Automotive</NavLink>
        </ul>
      </nav>
      <div className={s.footer}>
        <a href="#" target="_blank" className={s.help}>Help</a>
        <a href="#" target="_blank" className={s.terms}>Terms & Conditions</a>
      </div>
    </section>
  );
}