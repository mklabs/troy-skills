const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions

    if (node.internal.type === `CharacterSkillNodeSetsTablesTsv`) {
        createNodeField({
            node,
            name: `slug`,
            value: `/${node.key}`,
        })
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const result = await graphql(`
        query {
            allCharacterSkillNodeSetsTablesTsv {
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

    const { allCharacterSkillNodeSetsTablesTsv } = result.data
    const nodesets = allCharacterSkillNodeSetsTablesTsv.distinct

    nodesets.forEach(key => {
        const node = allCharacterSkillNodeSetsTablesTsv.edges.find(
            ({ node }) => node.key === key
        )

        if (!node) {
            return
        }

        createPage({
            path: node.node.fields.slug,
            component: path.resolve(`./src/templates/character-skills.js`),
            context: {
                slug: node.node.fields.slug,
                key: node.node.key,
                agent_subtype_key: node.node.agent_subtype_key,
            },
        })
    })
}
