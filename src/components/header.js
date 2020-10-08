import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../styles/header.scss"
import CharactersList from "./header/characters-list"

const Header = ({ siteTitle }) => (
    <header className="header-title">
        <div
            className="header-title-wrapper"
            style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `1.45rem 1.0875rem`,
            }}
        >
            <h1 style={{ margin: 0 }}>
                <Link to="/">{siteTitle}</Link>
            </h1>

            <CharactersList />
        </div>
    </header>
)

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header
