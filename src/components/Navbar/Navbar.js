import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import css from 'classnames'

import axios from 'axios'

import { Badge } from 'antd'

import { FaBoxOpen } from 'react-icons/fa'
import { FaHome } from 'react-icons/fa'
import { FaClipboardList } from 'react-icons/fa'
import { FaUserTie } from 'react-icons/fa'

import logo from '../../picture/logocoffee.png'

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.shopName}>
        <NavLink to="/" className={styles.home}>
          <FaHome />
        </NavLink>
      </div>
      <ul className={styles.text}>
        {/* <li className={styles.link}>
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

        <li className={styles.link}>
          <NavLink
            to="/employee"
            activeClassName={styles.active}
            className={styles.navlink}
          >
            EMPLOYEE
          </NavLink>
        </li>

        <li className={styles.link}>
          <NavLink
            to="/member"
            activeClassName={styles.active}
            className={styles.navlink}
          >
            MEMBER
          </NavLink>
        </li> */}
        {/* <div className={styles.divider} /> */}

        {/* <Badge count={1} size="small" color="#a1744a">
          <NavLink to="/order" className={css(styles.link, styles.cart)}>
            <div
              activeClassName={styles.active}
              className={css(styles.navlink)}
            >
              <FaClipboardList size={32} />
            </div>
          </NavLink>
        </Badge> */}

        <NavLink to="/order" className={css(styles.link, styles.cart)}>
          <div activeClassName={styles.active} className={css(styles.navlink)}>
            <FaClipboardList size={32} />
          </div>
        </NavLink>

        {/* <NavLink to="/re" className={css(styles.link, styles.cart)}>
          <div activeClassName={styles.active} className={css(styles.navlink)}>
            <FaBoxOpen size={36} />
          </div>
        </NavLink> */}
        <NavLink to="/admin" className={css(styles.link, styles.cart)}>
          <div activeClassName={styles.active} className={css(styles.navlink)}>
            <FaUserTie size={32} />
          </div>
        </NavLink>

        {/* <li className={styles.link}>
          <div activeClassName={styles.activeLogin} className={styles.login}>
            LOGIN
          </div>
        </li> */}
      </ul>
    </nav>
  )
}
