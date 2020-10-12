import React from "react"
import Img from "gatsby-image"
import ReactTooltip from "react-tooltip"
import { useStaticQuery, graphql } from "gatsby"
import SkillTooltipAbility from "./skill-tooltip-ability"
import "../../styles/skill-tooltip.scss"

const SkillIcon = ({ skill, size = 70, transformationCoef = 0.79, offset }) => {
    const data = useStaticQuery(graphql`
        query AllTheStuff {
            allEffectBonusValueUnitAbilityJunctionsTablesTsv {
                totalCount
                nodes {
                    effect
                    unit_ability
                    bonus_value_id
                }
            }

            allUnitAbilitiesTablesTsv {
                nodes {
                    key
                    icon_name
                }
            }

            allEffectBundlesImageSharp: allFile(
                filter: { relativeDirectory: { eq: "effect_bundles" } }
            ) {
                totalCount
                nodes {
                    relativePath
                    relativeDirectory
                    ext
                    extension
                    name
                    childImageSharp {
                        fixed(width: 25) {
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

            allAbilityIconsImageSharp: allFile(
                filter: { relativeDirectory: { eq: "ability_icons" } }
            ) {
                totalCount
                nodes {
                    relativePath
                    relativeDirectory
                    ext
                    extension
                    name
                    childImageSharp {
                        fixed(width: 25) {
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
    `)

    if (!skill) {
        return null
    }

    const {
        allUnitAbilitiesTablesTsv,
        allEffectBonusValueUnitAbilityJunctionsTablesTsv,
        allEffectBundlesImageSharp,
        allAbilityIconsImageSharp
    } = data

    let title = `${skill.skill.localised_name} -  ${skill.skill.localised_description}`
    title += `\n---\n`
    title += skill.effects
        .map(effect => {
            return effect.description
        })
        .join("\n")

    const style = {
        width: `${size}px`,
        height: `${size}px`,
        backgroundSize: "contain"
    }

    offset = offset || Math.ceil(size * 0.1)
    const imgSize = Math.floor(size * transformationCoef)
    const imgStyle = {
        width: `${imgSize}px`,
        height: `${imgSize}px`,
        top: `${offset}px`,
        left: `${offset}px`
    }

    if (!skill.img) {
        return null
    }

    const indent = Number(skill.indent)
    const tooltipDirection = indent <= 3 ? "left" : "right"

    const effects = skill.effects
        .filter(
            node => !node.effect_key.includes("_replace") && !node.description.includes("[HIDDEN]")
        )
        .sort((a, b) => {
            return a.effect_key.includes("level_up_health") ? 1 : -1
        })

    console.log("effects", effects)
    return (
        <div className="skill-icon-wrapper">
            <div data-tip={title} data-for={`skill-tooltip-${skill.key}`} data-event="click">
                <Img
                    fixed={skill.img.fixed}
                    className="skill-icon-img-wrapper"
                    style={style}
                    imgStyle={imgStyle}
                />
            </div>

            <ReactTooltip
                className="skill-tooltip hidden"
                place={tooltipDirection}
                id={`skill-tooltip-${skill.key}`}
            >
                <h4 className="tooltip-title">{skill.skill.localised_name}</h4>
                <div className="tooltip-content">
                    <p className="tooltip-description">{skill.skill.localised_description}</p>
                    <div className="tooltip-effects">
                        {effects.map(effect => {
                            const isPositiveValueGood = effect.is_positive_value_good === "true"
                            const value = Number(effect.value)
                            const isPositiveEffect = isPositiveValueGood ? value >= 0 : value < 0

                            let img = isPositiveEffect
                                ? allEffectBundlesImageSharp.nodes.find(
                                      node => effect.icon === `${node.name}${node.ext}`
                                  )
                                : allEffectBundlesImageSharp.nodes.find(
                                      node => effect.icon_negative === `${node.name}${node.ext}`
                                  )

                            const bonusValueUnitAbility = allEffectBonusValueUnitAbilityJunctionsTablesTsv.nodes.find(
                                node => node.effect === effect.effect_key
                            )
                            if (bonusValueUnitAbility) {
                                const unitAbility = allUnitAbilitiesTablesTsv.nodes.find(
                                    node => node.key === bonusValueUnitAbility.unit_ability
                                )

                                if (unitAbility) {
                                    img = allAbilityIconsImageSharp.nodes.find(
                                        node => node.name === unitAbility.icon_name
                                    )
                                }
                            }

                            return (
                                <div
                                    key={effect.effect_key}
                                    className={`tooltip-effect ${
                                        isPositiveEffect ? "positive" : "negative"
                                    }`}
                                >
                                    {img ? <Img fixed={img.childImageSharp.fixed} /> : ""}
                                    <span className="tooltip-effect-description">
                                        {effect.description}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <SkillTooltipAbility skill={skill} />
            </ReactTooltip>
        </div>
    )
}

export default SkillIcon
