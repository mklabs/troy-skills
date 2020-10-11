import { useStaticQuery, graphql } from "gatsby"

export default class AgentSubtypeService {
    constructor() {
        const data = useStaticQuery(graphql`
            query AgentSubtypeService {
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

        this.data = data;

        console.log("AgentSubtypeService.constructor", data)
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
}
