import React from "react"
import { Link } from "gatsby"
import "../../styles/skill-trees-list-dropdown.scss"

const SkillTreesListDropdown = ({ epicHeroes, heroClasses, agents, getOnScreenName }) => (
    <div className="skill-trees-list-dropdown">
        <div className="dropdown-section">
            <h2>Epic Heroes</h2>
            <div className="dropdown-section-list dropdown-section-epic-heroes">
                {Object.keys(epicHeroes).map(factionGroup => (
                    <div className="dropdown-list list-epic-heroes" key={factionGroup}>
                        <h3>{factionGroup}</h3>

                        <ul>
                            {epicHeroes[factionGroup].map(({ key, fields, agent_subtype_key, subculture }) => (
                                <li key={key}>
                                    <Link to={fields.slug}>{getOnScreenName(agent_subtype_key)}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        <div className="dropdown-section">
            <h2>Hero Classes</h2>
            <div className="dropdown-section-list dropdown-section-heroes">
                {Object.keys(heroClasses).map(faction => (
                    <div className="dropdown-list list-heroes" key={faction}>
                        <h3>{faction}</h3>

                        <ul>
                            {heroClasses[faction].map(({ key, fields, agent_subtype_key, subculture }) => (
                                <li key={key}>
                                    <Link to={fields.slug}>{getOnScreenName(agent_subtype_key)}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        <div className="dropdown-section">
            <h2>Agents</h2>
            <div className="dropdown-section-list dropdown-section-agents">
                {Object.keys(agents)
                    .reverse()
                    .map(subculture => (
                        <div className="dropdown-list list-agents" key={subculture}>
                            <h3>{subculture}</h3>

                            <ul>
                                {agents[subculture].map(({ key, fields, agent_subtype_key, subculture }) => (
                                    <li key={key}>
                                        <Link to={fields.slug}>{getOnScreenName(agent_subtype_key)}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
            </div>
        </div>
    </div>
)

export default SkillTreesListDropdown
