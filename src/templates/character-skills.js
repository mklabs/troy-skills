import React, { useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SkillSingle from "../components/skills/skill-single"
import SkillPair from "../components/skills/skill-pair"
import SkillColour from "../components/skills/skill-colour"
import SEO from "../components/seo"
import AgentSubtypeService from "../services/agent-subtype-service"
import "../styles/character-skills.scss"
import CharacterSkillService from "../services/character-skill-service"

export default function CharacterSkills({ data, pageContext }) {
    const agentSubtypeKey = pageContext.agent_subtype_key
    const nodesetKey = pageContext.key

    const service = new AgentSubtypeService()
    const characterSkillService = new CharacterSkillService(data)
    const nodeset = characterSkillService.getSkillNodeset(nodesetKey)
    const rows = characterSkillService.getSkillRows(nodesetKey)

    const [isRawHidden, setIsRawHidden] = useState(true)
    const [buttonValue, setButtonValue] = useState("See raw content")

    const onRawContentClick = ev => {
        ev.preventDefault()
        const isHidden = !isRawHidden
        setIsRawHidden(isHidden)
        setButtonValue(!isHidden ? "Hide raw content" : "See raw content")
    }

    const jsonClassname = isRawHidden ? "hidden" : ""
    const category = service.getCategoryForSkillNodeset(nodeset)
    const name = service.getOnScreenName(agentSubtypeKey)
    const title = `${name} (${category})`
    const porthole = service.getPorthole(agentSubtypeKey)

    return (
        <Layout>
            <SEO title={title} />
            <div className="container">
                <h2 className="character-page-header">
                    <span className="character-page-title">{title}</span>
                    <span
                        className="character-page-nodeset"
                        title="This is the internal key for this character skill tree"
                    >
                        {nodesetKey}
                    </span>
                </h2>

                <div className="character-frame">
                    <div className="character-portrait-frame">
                        <div className="character-portrait-ornament">
                            <div className="character-portrait-ornament-left" />
                            <div className="character-portrait-ornament-basic" />
                            <div className="character-portrait-ornament-right" />
                        </div>
                        <div className="character-portrait">
                            <Img fixed={porthole.childImageSharp.fixed} />
                        </div>
                        <div className="character-portrait-ornament">
                            <div className="character-portrait-ornament-left" />
                            <div className="character-portrait-ornament-basic" />
                            <div className="character-portrait-ornament-right" />
                        </div>
                    </div>
                    <div className="character-skills-frame">
                        <div className="character-skills-points-holder"></div>
                        <div className="character-skills">
                            {rows.map((row, i) => {
                                if (!row.length) {
                                    return null
                                }

                                const visibleInUI = row.find(
                                    skill => skill.visible_in_ui === "true"
                                )

                                if (!visibleInUI) {
                                    return null
                                }

                                const isSingleSkill = row.length === 1

                                const tier = Number(row[0].tier)

                                return (
                                    <div
                                        className="skill-tier"
                                        key={`skill-tier-${i}`}
                                        id={`tier-${tier}`}
                                    >
                                        <SkillColour skills={row} level={i + 1} />

                                        {isSingleSkill ? (
                                            <SkillSingle skills={row} />
                                        ) : (
                                            <SkillPair skills={row} />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <button onClick={onRawContentClick}>{buttonValue}</button>
                <pre className={jsonClassname}>{JSON.stringify(rows, null, 4)}</pre>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query {
        allAgentsSubtypesTablesTsv {
            nodes {
                key
                auto_generate
                small_icon
                associated_unit_override
                show_in_ui
                can_gain_xp
                loyalty_is_applicable
            }
        }

        allCharacterSkillNodeSetsTablesTsv {
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
            totalCount
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
                        ...GatsbyImageSharpFixed
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
`
