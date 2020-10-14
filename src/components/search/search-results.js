import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Img from "gatsby-image"

const SearchResults = ({ results, query, categories, names }) => {
    const { images } = useStaticQuery(graphql`
        {
            images: allFile(filter: { relativeDirectory: { eq: "skills/large" } }) {
                totalCount
                nodes {
                    name
                    ext
                    childImageSharp {
                        fixed(width: 88) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        }
    `)

    const [selectedCategory, setSelectedCategory] = useState(
        window.localStorage.getItem(`search.filter.categories`) || "All"
    )
    const [selectedName, setSelectedName] = useState(
        window.localStorage.getItem(`search.filter.names`) || "All"
    )

    const onFilterChange = (filterName, e) => {
        const value = e.target.value
        if (filterName === "categories") {
            setSelectedCategory(value)
        } else if (filterName === "names") {
            setSelectedName(value)
        }

        window.localStorage.setItem(`search.filter.${filterName}`, value)
    }

    const handleOnBlur = () => {}
    const onClearFilters = () => {
        setSelectedName("All")
        setSelectedCategory("All")
    }

    const noResultsMessage = query
        ? `No results for "${query}" query`
        : "Please, enter a search query to see some results."

    if (!results.length) {
        return <div className="search-results">{noResultsMessage}</div>
    }

    const agents = ["Envoy", "Priestess", "Spy"]
    const epicHeroNames = [
        "Achilles",
        "Aeneas",
        "Agamemnon",
        "Hector",
        "Hippolyta",
        "Menelaus",
        "Odysseus",
        "Paris",
        "Penthesilea",
        "Sarpedon"
    ]
    const countBeforeFilters = results.length
    const selectedNameIsAgent = agents.includes(selectedName)
    const selectedNameIsEpicHero = epicHeroNames.includes(selectedName)

    if (selectedCategory && selectedCategory !== "All") {
        const filteredCategory =
            selectedNameIsAgent && selectedCategory === "Hippolyta's Amazons"
                ? "Common"
                : selectedCategory

        const isPenthesilea =
            selectedCategory === "Penthesilea's Amazons" && selectedName === "Penthesilea"
        const isHippolyta =
            selectedCategory === "Hippolyta's Amazons" && selectedName === "Hippolyta"
        const isEpicHero = selectedNameIsEpicHero && selectedCategory === "Common"

        if (!isPenthesilea && !isHippolyta && !isEpicHero) {
            results = results.filter(result => result.category === filteredCategory)
        }
    }

    if (selectedName && selectedName !== "All") {
        results = results.filter(result => result.name === selectedName)
    }

    return (
        <div className="search-results">
            <div className="search-results-header">
                <div className="search-results-count">{results.length} results</div>
                <div className="search-results-filters">
                    <span className="select search-results-filter">
                        <select
                            value={selectedCategory}
                            onBlur={handleOnBlur}
                            onChange={e => onFilterChange("categories", e)}
                        >
                            <option value="All">All categories</option>
                            <option disabled aria-label="Disabled" />
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </span>

                    <span className="select search-results-filter">
                        <select
                            value={selectedName}
                            onBlur={handleOnBlur}
                            onChange={e => onFilterChange("names", e)}
                        >
                            <option value="All">All names</option>
                            <optgroup label="Epic Heroes">
                                {names.map(name => {
                                    if (!epicHeroNames.includes(name)) {
                                        return null
                                    }

                                    return (
                                        <option key={name} value={name}>
                                            {name}
                                        </option>
                                    )
                                })}
                            </optgroup>
                            <optgroup label="Hero Classes">
                                {names.map(name => {
                                    if (epicHeroNames.includes(name) || agents.includes(name)) {
                                        return null
                                    }

                                    return (
                                        <option key={name} value={name}>
                                            {name}
                                        </option>
                                    )
                                })}
                            </optgroup>
                            <optgroup label="Agents">
                                {names.map(name => {
                                    if (!agents.includes(name)) {
                                        return null
                                    }

                                    return (
                                        <option key={name} value={name}>
                                            {name}
                                        </option>
                                    )
                                })}
                            </optgroup>
                        </select>
                    </span>
                </div>
            </div>

            {!results.length ? (
                <>
                    <p>There is however {countBeforeFilters} results without filters.</p>
                    <p>
                        <button onClick={onClearFilters} style={{ paddingLeft: 0 }}>
                            Clear filters
                        </button>
                    </p>
                </>
            ) : (
                ""
            )}

            {results.map((result, i) => {
                const img = images.nodes.find(
                    node => result.image_path === `${node.name}${node.ext}`
                )

                return (
                    <div className="search-result" key={i}>
                        <div className="search-result-icon">
                            {img ? <Img fixed={img.childImageSharp.fixed} /> : ""}
                        </div>
                        <div className="search-result-content">
                            <h4 className="search-result-title">
                                <Link to={result.slug}>{result.localised_name}</Link>
                                <span className="search-result-character">
                                    {result.character.title}
                                </span>
                            </h4>
                            <p className="search-result-description">
                                {result.localised_description}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SearchResults
