import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import "../styles/header.scss"
import SkillTreesList from "./list/skill-trees-list"

const Header = ({ siteTitle, page }) => {
    const [isDropdownActive, setIsDropdownActive] = useState(false)

    const onNavItemClick = ev => {
        setIsDropdownActive(!isDropdownActive)
    }

    return (
        <div className="header-wrapper">
            <header className="header">
                <div className="header-title-wrapper">
                    <h1 className="header-title">
                        <Link to="/">{siteTitle}</Link>
                    </h1>

                    {page !== "Home" ? (
                        <button className="header-nav-item" onClick={onNavItemClick}>
                            Characters
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            </header>

            {page !== "Home" ? (
                <div className={`header-dropdown ${isDropdownActive ? "header-dropdown-active" : ""}`}>
                    <div className="header-dropdown-wrapper">
                        <SkillTreesList />
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    )
}

Header.propTypes = {
    siteTitle: PropTypes.string
}

Header.defaultProps = {
    siteTitle: ``
}

export default Header
