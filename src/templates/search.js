import React, { useState, useEffect, useRef } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import * as JsSearch from "js-search"
import qs from "query-string"
import SearchResult from "../components/search/search-results"
import LoadingIndicator from "../components/search/loading-indicator"

import "../styles/search.scss"

const createSearch = documents => {
    const search = new JsSearch.Search(`uid`)
    search.indexStrategy = new JsSearch.PrefixIndexStrategy()

    search.sanitizer = new JsSearch.LowerCaseSanitizer()

    search.addIndex(`localised_name`)
    search.addDocuments(documents)
    return search
}

const getSearchResults = (search, searchQuery) => {
    if (!search) {
        return []
    }

    if (!searchQuery) {
        return []
    }

    return search.search(searchQuery).sort((a, b) => {
        if (a.slug === b.slug) return 0
        return a.slug > b.slug ? 1 : -1
    })
}

const SearchTemplate = ({ data, pageContext }) => {
    const hash = typeof window !== `undefined` ? window.location.hash : ""
    const { searchData } = pageContext
    const { documents } = searchData

    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState(null)

    const refContenteditable = useRef(null)

    const buildIndex = () => {
        setSearch(createSearch(documents))
    }

    const onQueryInput = e => {
        const { key } = e
        if (key !== "Enter") {
            return
        }

        const textContent = refContenteditable.current.textContent
        setQuery(textContent)
        refContenteditable.current.blur()
    }

    useEffect(buildIndex, [])

    useEffect(() => {
        const result = qs.parse(hash)
        if (!result.query) return
        setQuery(result.query)
    }, [search, hash])

    useEffect(() => {
        if (!query) return
        window.location.hash = qs.stringify({ query })
        setIsLoading(true)

        setTimeout(() => {
            setResults(getSearchResults(search, query))
            setIsLoading(false)
        }, 500)
    }, [search, query])

    const hiddenCategories = ["Amazons", "Danaans", "Trojans", "Horde Amazons"]
    const alphaSort = (a, b) => {
        if (a === b) return 0
        return a < b ? -1 : 1
    }
    const categories = [...new Set(documents.map(node => node.category))]
        .sort(alphaSort)
        .filter(category => !hiddenCategories.includes(category))
    const names = [...new Set(documents.map(node => node.name))].sort((a, b) => {
        if (a.includes("-") && !b.includes("-")) {
            return 1
        }

        if (b.includes("-") && !a.includes("-")) {
            return -1
        }

        return alphaSort(a, b)
    })

    return (
        <Layout>
            <SEO title={`Search`} />

            <div className="search">
                <div className="page-header">
                    <div className="container">
                        <h2 className="page-header-title">Search Results /</h2>
                        <h3
                            className="page-header-subtitle search-header-query"
                            contentEditable="true"
                            spellCheck="false"
                            ref={refContenteditable}
                            suppressContentEditableWarning={true}
                            role="presentation"
                            onKeyPress={onQueryInput}
                        >
                            {query}
                        </h3>
                    </div>
                </div>

                <div className="container" style={{ paddingTop: 0 }}>
                    {isLoading && query ? (
                        <div className="search-results">
                            <LoadingIndicator />
                        </div>
                    ) : (
                        <SearchResult
                            results={results}
                            query={query}
                            categories={categories}
                            names={names}
                        />
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default SearchTemplate
