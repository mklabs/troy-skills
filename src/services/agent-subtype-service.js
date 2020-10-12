import { useStaticQuery, graphql } from "gatsby"
import slugify from "slugify"

export default class AgentSubtypeService {
    static agentKeys = ["champion", "dignitary", "spy"]

    static factionGroups = {
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

    constructor(data) {
        this.data =
            data ||
            useStaticQuery(graphql`
                query AgentSubtypeService {
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
    }

    getAgentLoc(key) {
        const { locAgentSubtypes } = this.data
        return locAgentSubtypes.nodes.find(
            node => node.key === `agent_subtypes_onscreen_name_override_${key}`
        )
    }

    getOnScreenName(key) {
        const { allAgentsSubtypesTablesTsv, allLandUnitsLocTsv } = this.data
        const node = this.getAgentLoc(key)
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

    getFactionNameForAgentSubtype(key) {
        const { allFactionAgentPermittedSubtypesTablesTsv } = this.data
        const permittedSubtypes = new Set(
            allFactionAgentPermittedSubtypesTablesTsv.nodes
                .filter(node => node.subtype === key)
                .map(node => node.faction)
        )

        if (permittedSubtypes.size !== 1) {
            return ""
        }

        const faction = this.getFactionAgentPermittedSubtype(key)
        if (!faction) {
            return ""
        }

        return this.getFactionName(faction)
    }

    getFactionAgentPermittedSubtype(key) {
        const { allFactionAgentPermittedSubtypesTablesTsv } = this.data
        return allFactionAgentPermittedSubtypesTablesTsv.nodes.find(node => node.subtype === key)
    }

    getFactionName(faction) {
        const { allFactionsLocTsv } = this.data
        const loc = allFactionsLocTsv.nodes.find(
            node => node.key === `factions_screen_name_${faction.faction}`
        )
        return loc ? loc.text : ""
    }

    getAgentSubtypeKeyForSkillNodeset(key) {
        const { allCharacterSkillNodeSetsTablesTsv } = this.data
        const nodeset = allCharacterSkillNodeSetsTablesTsv.nodes.find(node => node.key === key)
        return nodeset ? nodeset.agent_subtype_key : ""
    }

    getSubcultureName(key) {
        const { allCulturesSubculturesLocTsv } = this.data
        const loc = allCulturesSubculturesLocTsv.nodes.find(
            node => node.key === `cultures_subcultures_name_${key}`
        )
        return loc ? loc.text : ""
    }

    getCategoryForSkillNodeset(nodeset) {
        const agentLoc = this.getAgentLoc(nodeset.agent_subtype_key)
        if (agentLoc.text === "Epic Hero") {
            return AgentSubtypeService.factionGroups[nodeset.agent_subtype_key]
        } else if (AgentSubtypeService.agentKeys.includes(nodeset.agent_key)) {
            const subculture = this.getSubcultureName(nodeset.subculture)
            return subculture === "Achaeans" ? "Common" : subculture
        } else {
            return this.getFactionNameForAgentSubtype(nodeset.agent_subtype_key) || "Common"
        }
    }

    getSlugForSkillNodeset(nodeset) {
        const category = this.getCategoryForSkillNodeset(nodeset)
        const name = this.getOnScreenName(nodeset.agent_subtype_key)
        return `/${slugify(category, { lower: true })}/${slugify(name, { lower: true })}`
    }

    getDistinctSkillNodesets() {
        const { allCharacterSkillNodeSetsTablesTsv, allCharacterSkillNodesTablesTsv } = this.data

        const skillNodes = []
        return allCharacterSkillNodeSetsTablesTsv.nodes.filter(({ key }) => {
            const nodes = allCharacterSkillNodesTablesTsv.nodes
                .filter(
                    node =>
                        node.character_skill_node_set_key === key && node.visible_in_ui === "true"
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
    }
}
