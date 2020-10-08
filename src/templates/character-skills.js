import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SkillSingle from "../components/skills/skill-single"
import SkillPair from "../components/skills/skill-pair"
import SkillColour from "../components/skills/skill-colour"
import SEO from "../components/seo"

import "../styles/character-skills.scss"

function getSkillRows(data) {
    const {
        characterSkillNodeSetsTablesTsv,
        allCharacterSkillNodesTablesTsv,
        allCharacterSkillsTableTsv,
        allCharacterSkillLevelToEffectsJunctionsTablesTsv,
        allImageSharp,
        allEffectsLocTsv,
        allEffectsTablesTsv,
    } = data

    const nodes = allCharacterSkillNodesTablesTsv.edges
        .filter(
            s =>
                s.node.character_skill_node_set_key ===
                characterSkillNodeSetsTablesTsv.key
        )
        .sort((a, b) => {
            const tier = (Number(a.node.tier) - Number(b.node.tier)) * 100
            const indent = Number(a.node.indent) - Number(b.node.indent)

            return tier + indent
        })

    const tree = {}
    nodes.forEach(({ node }) => {
        const { tier } = node
        tree[tier] = tree[tier] || []
        tree[tier].push(node)
    })

    const rows = []
    Object.keys(tree).forEach(t => {
        const items = tree[t]
        const skills = items.map(item => {
            const skill = allCharacterSkillsTableTsv.edges.find(
                s => s.node.key === item.character_skill_key
            )

            if (!skill) {
                return item
            }

            const effects = allCharacterSkillLevelToEffectsJunctionsTablesTsv.edges
                .filter(
                    effect => effect.node.character_skill_key === skill.node.key
                )
                .map(effect => effect.node)
                .map(effect => {
                    const loc = allEffectsLocTsv.edges.find(
                        l =>
                            l.node.key ===
                            `effects_description_${effect.effect_key}`
                    )

                    const effectData = allEffectsTablesTsv.edges.find(
                        ({ node }) => node.effect === effect.effect_key
                    )

                    const effectValue = Number(effect.value)

                    effect.description = loc
                        ? loc.node.text.replace(
                              /%\+n/,
                              `${effectValue < 0 ? "" : "+"}${effectValue}`
                          )
                        : ""
                    return {
                        ...effect,
                        ...effectData.node,
                    }
                })

            item.skill = skill.node
            item.img = item.effects = effects

            const img = allImageSharp.edges.find(
                ({ node }) =>
                    node.childImageSharp.fixed.originalName ===
                    skill.node.image_path
            )

            item.img = img ? img.node.childImageSharp : null
            return item
        })

        rows.push(skills)
    })

    return rows
}

export default function CharacterSkills({ data }) {
    const { characterSkillNodeSetsTablesTsv } = data
    const rows = getSkillRows(data)

    const [isRawHidden, setIsRawHidden] = useState(true)
    const [buttonValue, setButtonValue] = useState("See raw content")

    const onRawContentClick = ev => {
        ev.preventDefault()
        const isHidden = !isRawHidden
        setIsRawHidden(isHidden)
        setButtonValue(!isHidden ? "Hide raw content" : "See raw content")
    }

    const jsonClassname = isRawHidden ? "hidden" : ""

    return (
        <Layout>
            <SEO title={characterSkillNodeSetsTablesTsv.key} />
            <h2>{characterSkillNodeSetsTablesTsv.key}</h2>

            <Link to="/">Return to list</Link>

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

                    return (
                        <div className="skill-tier" key={`skill-tier-${i}`}>
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

            <button onClick={onRawContentClick}>{buttonValue}</button>
            <pre className={jsonClassname}>{JSON.stringify(rows, null, 4)}</pre>
        </Layout>
    )
}

export const query = graphql`
    query($agent_subtype_key: String, $key: String) {
        agentsSubtypesTablesTsv(key: { eq: $agent_subtype_key }) {
            key
            auto_generate
            small_icon
            associated_unit_override
            show_in_ui
            can_gain_xp
            loyalty_is_applicable
        }

        characterSkillNodeSetsTablesTsv(key: { eq: $key }) {
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

        allCharacterSkillNodesTablesTsv {
            totalCount
            edges {
                node {
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
        }

        allCharacterSkillsTableTsv {
            totalCount
            edges {
                node {
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
        }

        allEffectsTablesTsv {
            totalCount
            edges {
                node {
                    effect
                    icon
                    priority
                    icon_negative
                    category
                    is_positive_value_good
                }
            }
        }

        allCharacterSkillLevelToEffectsJunctionsTablesTsv {
            totalCount
            edges {
                node {
                    character_skill_key
                    effect_key
                    effect_scope
                    level
                    value
                }
            }
        }

        allImageSharp: allFile(
            filter: { relativeDirectory: { eq: "skills/large" } }
        ) {
            totalCount
            edges {
                node {
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
        }

        allEffectsLocTsv {
            edges {
                node {
                    key
                    text
                    tooltip
                }
            }
        }
    }
`
