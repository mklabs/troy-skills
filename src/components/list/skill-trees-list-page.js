import React from "react"
import { Link } from "gatsby"
import "../../styles/skill-trees-list.scss"

const SkillTreesListPage = ({ epicHeroes, heroClasses, agents, getOnScreenName }) => (
    <div className="skill-trees-list">
        <h2>Epic Heroes</h2>
        <div className="skill-trees-list-section">
            {Object.keys(epicHeroes).map(factionGroup => (
                <div className="skill-trees-list-epic-heroes" key={factionGroup}>
                    <h4>{factionGroup}</h4>

                    {epicHeroes[factionGroup].map(
                        ({ key, fields, agent_subtype_key, subculture }) => (
                            <p key={key}>
                                <em>
                                    <Link to={fields.slug}>
                                        {getOnScreenName(agent_subtype_key)}
                                    </Link>
                                </em>
                            </p>
                        )
                    )}
                </div>
            ))}
        </div>

        <h2>Hero Classes</h2>
        <div className="skill-trees-list-section">
            {Object.keys(heroClasses).map(faction => (
                <div className="skill-trees-list-heroes" key={faction}>
                    <h4>{faction}</h4>

                    {heroClasses[faction].map(({ key, fields, agent_subtype_key, subculture }) => (
                        <p key={key}>
                            <em>
                                <Link to={fields.slug}>{getOnScreenName(agent_subtype_key)}</Link>
                            </em>
                        </p>
                    ))}
                </div>
            ))}
        </div>

        <h2>Agents</h2>
        <div className="skill-trees-list-section">
            {Object.keys(agents)
                .reverse()
                .map(subculture => (
                    <div className="skill-trees-list-agents" key={subculture}>
                        <h4>{subculture}</h4>

                        {agents[subculture].map(
                            ({ key, fields, agent_subtype_key, subculture }) => (
                                <p key={key}>
                                    <em>
                                        <Link to={fields.slug}>
                                            {getOnScreenName(agent_subtype_key)}
                                        </Link>
                                    </em>
                                </p>
                            )
                        )}
                    </div>
                ))}
        </div>
    </div>
)

export default SkillTreesListPage
