import React from "react"
import { css } from "@emotion/core"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

export default function Home({ data }) {
    const { nodesets } = data

    console.log(nodesets)

    return (
        <Layout>
            <div>
                <h1
                    css={css`
                        display: inline-block;
                        border-bottom: 1px solid;
                    `}
                >
                    Skill Trees
                </h1>
                <h4>{nodesets.distinct.length} trees</h4>
                {nodesets.edges.map(({ node }) => (
                    <div key={node.key}>
                        <h3>
                            <Link to={node.fields.slug}>{node.key}</Link>
                        </h3>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export const query = graphql`
    query {
        nodesets: allCharacterSkillNodeSetsTablesTsv {
            distinct(field: key)
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
                    agent_subtype_key
                    key
                }
            }
        }
    }
`
