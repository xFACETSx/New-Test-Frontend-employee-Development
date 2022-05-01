import styles from './Stock.module.css'
import { NavLink } from 'react-router-dom'
import css from 'classnames'
import { IoCartOutline } from 'react-icons/io5'
import logo from '../../picture/logocoffee.png'

export function Stock() {
  return (
    <nav className={styles.Stock}>
      <div className={styles.shopName}>
        <img src={logo} alt="Logocoffee" width={45} />
        <NavLink to="/">COFFEE SHOP</NavLink>
      </div>
      <ul className={styles.text}>
        <li className={styles.link}>
          <NavLink
            exact
            to="/"
            activeClassName={styles.active}
            className={styles.navlink}
          >
            STOCK
          </NavLink>
        </li>

        <li className={styles.link}>
          <NavLink
            to="/updatestock"
            activeClassName={styles.active}
            className={styles.navlink}
          >
            UPDATESTOCK
          </NavLink>
        </li>

        <li className={styles.link}>
          <NavLink
            to="/dashboard"
            activeClassName={styles.active}
            className={styles.navlink}
          >
            DASHBOARD
          </NavLink>
        </li>

        <li className={css(styles.link, styles.cart)}>
          <div activeClassName={styles.active} className={css(styles.navlink)}>
            <IoCartOutline size={24} />
          </div>
        </li>

        <li className={styles.link}>
          <div activeClassName={styles.activeLogin} className={styles.login}>
            LOGIN
          </div>
        </li>
      </ul>
    </nav>
  )
}
