import { exec } from "child_process"
import path from "path"
import AgentSubtypeService from "./src/services/agent-subtype-service"
import CharacterSkillService from "./src/services/character-skill-service"

exports.createPages = async ({ graphql, actions }) => {
    const { createPage, createNode } = actions

    const result = await graphql(`
        query {
            allCharacterSkillNodeSetsTablesTsv {
                distinct(field: key)
                totalCount
                nodes {
                    agent_key
                    agent_subtype_key
                    campaign_key
                    faction_key
                    for_army
                    for_navy
                    id
                    key
                    subculture
                }
            }

            allCharacterSkillNodesTablesTsv {
                nodes {
                    key
                    character_skill_key
                    tier
                    indent
                    campaign_key
                    character_skill_node_set_key
                    faction_key
                    points_on_creation
                    required_num_parents
                    subculture
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
                    auto_generate
                    small_icon
                    associated_unit_override
                    show_in_ui
                    can_gain_xp
                    loyalty_is_applicable
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

            allCharacterSkillsTableTsv {
                totalCount
                nodes {
                    key
                    image_path
                    unlocked_at_rank
                    localised_name
                    localised_description
                    background_weighting
                    is_background_skill
                    is_female_only_background_skill
                    is_male_only_background_skill
                    influence_cost
                    skill_colour
                }
            }

            allEffectsTablesTsv {
                totalCount
                nodes {
                    effect
                    icon
                    priority
                    icon_negative
                    category
                    is_positive_value_good
                }
            }

            allCharacterSkillLevelToEffectsJunctionsTablesTsv {
                totalCount
                nodes {
                    character_skill_key
                    effect_key
                    effect_scope
                    level
                    value
                }
            }

            allImageSharp: allFile(filter: { relativeDirectory: { eq: "skills/large" } }) {
                totalCount
                nodes {
                    relativePath
                    relativeDirectory
                    childImageSharp {
                        fixed(width: 88) {
                            originalName
                            height
                            width
                        }
                        original {
                            height
                            width
                        }
                    }
                }
            }

            allEffectsLocTsv {
                nodes {
                    key
                    text
                    tooltip
                }
            }

            allUiTextReplacementsLocTsv {
                nodes {
                    key
                    text
                    tooltip
                }
            }
        }
    `)

    const agentSubtypeService = new AgentSubtypeService(result.data)
    const characterSkillService = new CharacterSkillService(result.data)
    const documents = []

    const nodesets = agentSubtypeService.getDistinctSkillNodesets()
    nodesets.forEach(node => {
        const slug = agentSubtypeService.getSlugForSkillNodeset(node)
        const rows = characterSkillService.getSkillRows(node.key)

        let category = agentSubtypeService.getCategoryForSkillNodeset(node)
        const name = agentSubtypeService.getOnScreenName(node.agent_subtype_key)
        const title = `${name} (${category})`

        if (category === "Horde Amazons") {
            category = "Penthesilea's Amazons"
        }

        const results = rows
            .map(row => {
                return row.map(({ tier, indent, skill }) => {
                    return {
                        uid: `${slug}/${skill.key}`,
                        slug: `${slug}#tier-${Number(tier)}`,
                        indent,
                        tier,
                        category,
                        name,
                        character: {
                            title,
                            category,
                            name
                        },
                        ...skill
                    }
                })
            })
            .flat()
            .filter(
                row =>
                    !(row.key.includes("HIDDEN") || row.localised_description.includes("[HIDDEN]"))
            )

        documents.push(...results)

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

    createPage({
        path: "/search",
        component: path.resolve(`./src/templates/search.js`),
        context: {
            searchData: {
                documents
            }
        }
    })
}

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
    const { createNode } = actions

    const gitCommit = new Promise(async (resolve, reject) => {
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

    return Promise.all([gitCommit])
}
