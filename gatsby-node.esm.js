import path from "path"
import { createFilePath } from "gatsby-source-filesystem"
import { exec } from "child_process"
import AgentSubtypeService from "./src/services/agent-subtype-service"

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const result = await graphql(`
        query {
            allCharacterSkillNodeSetsTablesTsv {
                distinct(field: key)
                totalCount
                nodes {
                    agent_subtype_key
                    agent_key
                    subculture
                    key
                }
            }

            allCharacterSkillNodesTablesTsv {
                nodes {
                    id
                    key
                    character_skill_key
                    character_skill_node_set_key
                    visible_in_ui
                }
            }

            locAgentSubtypes: allAgentSubtypesLocTsv {
                nodes {
                    key
                    text
                    tooltip
                }
            }

            allFactionAgentPermittedSubtypesTablesTsv {
                nodes {
                    faction
                    agent
                    subtype
                }
            }

            allCulturesSubculturesLocTsv {
                nodes {
                    key
                    text
                    tooltip
                }
            }

            allLandUnitsLocTsv {
                nodes {
                    key
                    text
                    tooltip
                }
            }

            allAgentsSubtypesTablesTsv {
                nodes {
                    id
                    key
                    associated_unit_override
                }
            }

            allFactionAgentPermittedSubtypesTablesTsv {
                nodes {
                    faction
                    agent
                    subtype
                }
            }

            allFactionsLocTsv {
                nodes {
                    key
                    text
                    tooltip
                }
            }
        }
    `)

    const service = new AgentSubtypeService(result.data)

    const nodesets = service.getDistinctSkillNodesets()

    nodesets.forEach(node => {
        const slug = service.getSlugForSkillNodeset(node)
        createPage({
            path: slug,
            component: path.resolve(`./src/templates/character-skills.js`),
            context: {
                slug: slug,
                key: node.key,
                agent_subtype_key: node.agent_subtype_key
            }
        })
    })
}

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
    const { createNode } = actions

    return new Promise(async (resolve, reject) => {
        exec("git rev-parse --short HEAD", (err, stdout, stderr) => {
            if (err) {
                reject(new Error("Error in child process"))
            }

            const hash = stdout.trim()
            const data = { hash }
            const nodeContent = JSON.stringify(data)

            const nodeMeta = {
                id: createNodeId(`git-commit-head`),
                parent: null,
                children: [],
                internal: {
                    type: `GitCommit`,
                    content: nodeContent,
                    contentDigest: createContentDigest(data)
                }
            }

            const node = Object.assign({}, data, nodeMeta)
            createNode(node)
            resolve()
        })
    })
}
