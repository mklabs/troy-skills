import React from "react"
import SkillTreesListPage from "./skill-trees-list-page"
import SkillTreesListDropdown from "./skill-trees-list-dropdown"
import AgentSubtypeService from "../../services/agent-subtype-service"

export default function SkillTreesList({ size }) {
    const service = new AgentSubtypeService()
    const rows = service.getDistinctSkillNodesets()

    const agents = {}
    const epicHeroes = {}
    const heroClasses = {}

    rows.forEach(row => {
        const agentLoc = service.getAgentLoc(row.agent_subtype_key)
        const category = service.getCategoryForSkillNodeset(row)

        if (agentLoc.text === "Epic Hero") {
            epicHeroes[category] = epicHeroes[category] || []
            epicHeroes[category].push(row)
        } else if (AgentSubtypeService.agentKeys.includes(row.agent_key)) {
            agents[category] = agents[category] || []
            agents[category].push(row)
        } else {
            heroClasses[category] = heroClasses[category] || []
            heroClasses[category].push(row)
        }
    })

    const Component = size === "page" ? SkillTreesListPage : SkillTreesListDropdown
    return (
        <Component
            epicHeroes={epicHeroes}
            heroClasses={heroClasses}
            agents={agents}
            service={service}
        />
    )
}
