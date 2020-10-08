import React from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"

export default function CharactersList() {
    const data = useStaticQuery(graphql`
        query AllNodeSets {
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
    `)

    const { nodesets } = data

    const onChange = e => {
        const target = e.target
        const value = target.value
        if (!value) {
            return
        }

        const nodeset = nodesets.edges.find(({ node }) => node.key === value)
        if (!nodeset) {
            return
        }

        target.disabled = true

        if (typeof window !== `undefined`) {
            // code that references a browser global
            navigate(`/${value}`)
        }
    }

    return (
        <div className="header-datalist-wrapper">
            <input
                placeholder="Choose a characters"
                list="characters-list"
                onChange={onChange}
            />

            <datalist id="characters-list">
                {nodesets.edges.map(({ node }) => (
                    <option value={node.key} key={node.key}>
                        {node.agent_subtype_key}
                    </option>
                ))}
            </datalist>
        </div>
    )
}
