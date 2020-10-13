import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, { useState, useRef, useEffect } from "react"
import "../styles/header.scss"
import SkillTreesList from "./list/skill-trees-list"
import qs from "query-string"

const Header = ({ siteTitle, page }) => {
    const [isCharactersActive, setIsCharactersActive] = useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [query, setQuery] = useState("")
    const inputRef = useRef(null)
    const searchRef = useRef(null)

    const onCharactersClick = ev => {
        setIsCharactersActive(!isCharactersActive)
        setIsSearchActive(false)
    }

    const onSearchClick = ev => {
        setIsCharactersActive(false)
        setIsSearchActive(!isSearchActive)
    }

    const handleSubmit = ev => {
        ev.preventDefault()
        setIsSearchActive(false)
        navigate(`/search#${qs.stringify({ query })}`)
    }

    const onSearchInputChange = e => {
        const searchQuery = e.target.value
        setQuery(searchQuery)
    }

    useEffect(() => {
        if (!isSearchActive) return

        searchRef.current.addEventListener(
            "transitionend",
            () => {
                inputRef.current.focus()
            },
            { capture: false, once: true }
        )
    }, [isSearchActive])

    return (
        <>
            <div className="header-wrapper">
                <header className="header">
                    <div className="header-title-wrapper">
                        <h1 className="header-title">
                            <Link to="/">{siteTitle}</Link>
                        </h1>

                        <div className="header-actions">
                            <button
                                aria-label="Search"
                                className="header-action"
                                onClick={onSearchClick}
                            >
                                <svg className="icon-search" viewBox="0 0 18 18">
                                    <path d="M12.5 11h-.8l-.3-.3c1-1.1 1.6-2.6 1.6-4.2C13 2.9 10.1 0 6.5 0S0 2.9 0 6.5 2.9 13 6.5 13c1.6 0 3.1-.6 4.2-1.6l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0C4 11 2 9 2 6.5S4 2 6.5 2 11 4 11 6.5 9 11 6.5 11z"></path>
                                </svg>
                            </button>
                            <button className="header-action" onClick={onCharactersClick}>
                                Characters
                            </button>
                        </div>
                    </div>
                </header>
                <div
                    className={`header-dropdown ${
                        isCharactersActive ? "header-dropdown-active" : ""
                    }`}
                >
                    <div className="header-dropdown-wrapper">
                        <SkillTreesList />
                    </div>
                </div>
                <div
                    className={`header-search ${isSearchActive ? "header-search-active" : ""}`}
                    ref={searchRef}
                >
                    <form className="container" onSubmit={handleSubmit}>
                        <input
                            id="Search"
                            className="header-search-input"
                            autoComplete="off"
                            tabIndex="0"
                            ref={inputRef}
                            onChange={onSearchInputChange}
                            placeholder="Search Skills"
                            style={{ margin: "0 auto", width: "400px" }}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

Header.propTypes = {
    siteTitle: PropTypes.string
}

Header.defaultProps = {
    siteTitle: ``
}

export default Header
