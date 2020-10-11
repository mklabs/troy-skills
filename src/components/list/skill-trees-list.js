import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import SkillTreesListPage from "./skill-trees-list-page"
import SkillTreesListDropdown from "./skill-trees-list-dropdown"

export default function SkillTreesList({ size }) {
    const data = useStaticQuery(graphql`
        query Foo {
            nodesets: allCharacterSkillNodeSetsTablesTsv {
                distinct(field: key)
                totalCount
                nodes {
                    fields {
                        slug
                    }
                    agent_subtype_key
                    agent_key
                    subculture
                    key
                }
            }

            locAgentSubtypes: allAgentSubtypesLocTsv {
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

            allCharacterSkillNodesTablesTsv {
                nodes {
                    id
                    key
                    character_skill_key
                    character_skill_node_set_key
                    visible_in_ui
                }
            }

            allCulturesSubculturesLocTsv {
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

            allFactionsLocTsv {
                nodes {
                    key
                    text
                    tooltip
                }
            }
        }
    `)

    const {
        nodesets,
        locAgentSubtypes,
        allLandUnitsLocTsv,
        allAgentsSubtypesTablesTsv,
        allCharacterSkillNodesTablesTsv,
        allCulturesSubculturesLocTsv,
        allFactionAgentPermittedSubtypesTablesTsv,
        allFactionsLocTsv
    } = data

    const getAgentLoc = key => {
        return locAgentSubtypes.nodes.find(
            node => node.key === `agent_subtypes_onscreen_name_override_${key}`
        )
    }

    const getOnScreenName = key => {
        const node = getAgentLoc(key)
        const subtype = allAgentsSubtypesTablesTsv.nodes.find(node => node.key === key)

        if (!node || !subtype) {
            return ""
        }

        let name = node.text
        if (node.text === "Epic Hero") {
            const heroName = allLandUnitsLocTsv.nodes.find(
                node => node.key === `land_units_onscreen_name_${subtype.associated_unit_override}`
            )
            name = heroName.text
        }

        return name
    }

    const getSubcultureName = key => {
        const loc = allCulturesSubculturesLocTsv.nodes.find(
            node => node.key === `cultures_subcultures_name_${key}`
        )
        return loc ? loc.text : ""
    }

    const getFactionAgentPermittedSubtype = key => {
        return allFactionAgentPermittedSubtypesTablesTsv.nodes.find(node => node.subtype === key)
    }

    const getFactionName = faction => {
        const loc = allFactionsLocTsv.nodes.find(
            node => node.key === `factions_screen_name_${faction.faction}`
        )
        return loc ? loc.text : ""
    }

    const getFactionNameForAgentSubtype = key => {
        const permittedSubtypes = new Set(
            allFactionAgentPermittedSubtypesTablesTsv.nodes
                .filter(node => node.subtype === key)
                .map(node => node.faction)
        )

        if (permittedSubtypes.size !== 1) {
            return ""
        }

        const faction = getFactionAgentPermittedSubtype(key)
        if (!faction) {
            return ""
        }

        return getFactionName(faction)
    }

    const skillNodes = []
    const rows = nodesets.nodes.filter(({ key }) => {
        const nodes = allCharacterSkillNodesTablesTsv.nodes
            .filter(
                node => node.character_skill_node_set_key === key && node.visible_in_ui === "true"
            )
            .sort((a, b) => {
                if (a.character_skill_key < b.character_skill_key) {
                    return -1
                }
                if (a.character_skill_key > b.character_skill_key) {
                    return 1
                }
                return 0
            })

        if (!nodes.length) {
            return false
        }

        const orderedSkillKeys = nodes.map(n => n.character_skill_key).join(",")
        if (skillNodes.includes(orderedSkillKeys)) {
            return false
        }

        skillNodes.push(orderedSkillKeys)
        return true
    })

    const agents = {}
    const epicHeroes = {}
    const heroClasses = {}
    const agentKeys = ["champion", "dignitary", "spy"]
    const factionGroups = {
        troy_achilles: "Danaans",
        troy_aeneas: "Trojans",
        troy_agamemnon: "Danaans",
        troy_hector: "Trojans",
        troy_hippolyta: "Amazons",
        troy_menelaus: "Danaans",
        troy_odysseus: "Danaans",
        troy_paris: "Trojans",
        troy_penthesilea: "Amazons",
        troy_sarpedon: "Trojans"
    }

    rows.forEach(row => {
        const agentLoc = getAgentLoc(row.agent_subtype_key)
        if (agentLoc.text === "Epic Hero") {
            const factionGroup = factionGroups[row.agent_subtype_key]
            epicHeroes[factionGroup] = epicHeroes[factionGroup] || []
            epicHeroes[factionGroup].push(row)
        } else if (agentKeys.includes(row.agent_key)) {
            const subculture = getSubcultureName(row.subculture)
            const subcultureKey = subculture === "Achaeans" ? "Common" : subculture
            agents[subcultureKey] = agents[subcultureKey] || []
            agents[subcultureKey].push(row)
        } else {
            const faction = getFactionNameForAgentSubtype(row.agent_subtype_key) || "Common"
            heroClasses[faction] = heroClasses[faction] || []
            heroClasses[faction].push(row)
        }
    })

    const Component = size === "page" ? SkillTreesListPage : SkillTreesListDropdown
    return (
        <Component
            epicHeroes={epicHeroes}
            heroClasses={heroClasses}
            agents={agents}
            getOnScreenName={getOnScreenName}
        />
    )
}
