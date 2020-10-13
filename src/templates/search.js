import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import * as JsSearch from "js-search"
import qs from "query-string"
import "../styles/search.scss"

const options = {
    indexStrategy: "Prefix match",
    searchSanitizer: "Lower Case"
}

const createSearch = (documents, options) => {
    const { indexStrategy, searchSanitizer } = options

    const search = new JsSearch.Search(`uid`)

    // search.tokenizer = new JsSearch.StopWordsTokenizer(new JsSearch.SimpleTokenizer())

    if (indexStrategy === `All`) {
        search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy()
    } else if (indexStrategy === `Exact match`) {
        search.indexStrategy = new JsSearch.ExactWordIndexStrategy()
    } else if (indexStrategy === `Prefix match`) {
        search.indexStrategy = new JsSearch.PrefixIndexStrategy()
    }

    if (searchSanitizer === `Lower Case`) {
        search.sanitizer = new JsSearch.LowerCaseSanitizer()
    } else if (searchSanitizer === `Case Sensitive`) {
        search.sanitizer = new JsSearch.CaseSensitiveSanitizer()
    }

    // search.searchIndex = new JsSearch.TfIdfSearchIndex()
    // search.searchIndex = new JsSearch.UnorderedSearchIndex()

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
    const hash = window.location.hash
    const { searchData } = pageContext
    const { documents } = searchData
    const { images } = data

    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [search, setSearch] = useState(null)
    const [initialLoad, setInitialLoad] = useState(true)

    const buildIndex = () => {
        setSearch(createSearch(documents, options))
    }

    const performSearch = searchQuery => {
        const searchResults = getSearchResults(search, searchQuery)
        setResults(searchResults)
    }

    const handleSubmit = e => {
        e.preventDefault()
        window.location.hash = qs.stringify({ query })
        performSearch()
    }

    const onSearchChange = e => {
        const searchQuery = e.target.value
        setInitialLoad(false)
        setQuery(searchQuery)
    }

    useEffect(buildIndex, [])

    useEffect(() => {
        const result = qs.parse(hash)
        if (!result.query) return
        setQuery(result.query)
        setResults(getSearchResults(search, result.query))
    }, [search, hash])

    useEffect(() => {
        if (!query) return
        if (!initialLoad) return
        window.search = search
        setResults(getSearchResults(search, query))
    }, [search, query, initialLoad])

    return (
        <Layout>
            <SEO title={`Search`} />

            <div className="search">
                <div className="page-header">
                    <div className="container">
                        <h2 className="page-header-title">Search Results /</h2>
                        <h3 className="page-header-subtitle">{query}</h3>
                    </div>
                </div>

                <div className="container" style={{ paddingTop: 0 }}>
                    <div className="search-results">
                        {results.map((result, i) => {
                            const img = images.nodes.find(
                                node => result.image_path === `${node.name}${node.ext}`
                            )

                            return (
                                <div className="search-result" key={i}>
                                    <div className="search-result-icon">
                                        <Img fixed={img.childImageSharp.fixed} />
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
                </div>
            </div>
        </Layout>
    )
}

export default SearchTemplate

export const query = graphql`
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
`
