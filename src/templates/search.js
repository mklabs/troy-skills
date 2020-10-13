import React, { useState } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const SearchTemplate = ({ pageContext }) => {
    const { searchData } = pageContext
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    //   const { allBooks, options } = bookData
    const title = "Search"

    const { data } = searchData

    const onSearchData = e => {
        console.log("search", e.target.value)
        const searchQuery = e.target.value

        setQuery(searchQuery)
    }

    const handleSubmit = e => {
        e.preventDefault()

        const searchResults = []

        Object.keys(data).forEach(key => {
            const rows = data[key]
            const flat = rows.flat()
            const results = flat.filter(node => node.localised_name.includes(query))
            searchResults.push(...results)
        })

        setResults(searchResults)
    }

    console.log(data)
    return (
        <Layout>
            <SEO title={title} />
            <h2>{title}</h2>

            <Link to="/">Return to list</Link>
            <div>
                <h1 style={{ marginTop: `3em`, textAlign: `center` }}>
                    Search data using JS Search using Gatsby API
                </h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div style={{ margin: "0 auto" }}>
                            <label htmlFor="Search" style={{ paddingRight: "10px" }}>
                                Enter your search here
                            </label>
                            <input
                                id="Search"
                                value={query}
                                onChange={onSearchData}
                                placeholder="Enter your search here"
                                style={{ margin: "0 auto", width: "400px" }}
                            />
                        </div>
                    </form>

                    <div>Number of items {results.length}</div>
                    {results.map((result, i) => {
                        // return(<pre key={i}>{JSON.stringify(result, null, 4)}</pre>)

                        return (
                            <div key={i}>
                                <h4>{result.localised_name}</h4>
                                <Link to={result.slug}>{result.slug}</Link>
                                {/* <p>{result.image_path}</p> */}
                                <p>{result.localised_description}</p>
                            </div>
                        )
                    })}
                    {/* <ClientSearch books={allBooks} engine={options} /> */}
                    {/* <pre>{JSON.stringify(searchData, null, 4)}</pre> */}
                </div>
            </div>
        </Layout>
    )
}

export default SearchTemplate
