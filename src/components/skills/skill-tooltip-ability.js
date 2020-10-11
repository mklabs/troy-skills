import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import SkillTooltipAbilityEffect from "./skill-tooltip-ability-effect"
import SkillTooltipAbilityBulletText from "./skill-tooltip-ability-bullet"
import TooltipAbilityService from "../../services/tooltip-ability-service.js"
import "../../styles/skill-tooltip-ability.scss"

export default function SkillTooltipAbility({ skill }) {
    const data = useStaticQuery(graphql`
        query TooltipAbility {
            bonusValueUnitAbilities: allEffectBonusValueUnitAbilityJunctionsTablesTsv {
                totalCount
                edges {
                    node {
                        effect
                        unit_ability
                        bonus_value_id
                    }
                }
            }

            specialAbilities: allUnitSpecialAbilitiesTablesTsv {
                nodes {
                    key
                    active_time
                    recharge_time
                    num_uses
                    effect_range
                    affect_self
                    num_effected_friendly_units
                    num_effected_enemy_units
                    initial_recharge
                    activated_projectile
                    target_friends
                    target_enemies
                    target_ground
                    target_intercept_range
                    targetting_aoe
                    passive_aoe
                    active_aoe
                    ai_usage
                    rage_cost
                    cost_type
                }
            }

            unitAbilities: allUnitAbilitiesTablesTsv {
                nodes {
                    key
                    source_type
                    icon_name
                }
            }

            allSpecialAbilityPhaseStatEffectsTablesTsv {
                nodes {
                    phase
                    value
                    stat
                    how
                }
            }

            allSpecialAbilityPhaseAttributeEffectsTablesTsv {
                nodes {
                    phase
                    attribute
                    attribute_type
                }
            }

            allSpecialAbilityPhasesTablesTsv {
                nodes {
                    id
                    duration
                    effect_type
                    fatigue_change_ratio
                    hp_change_frequency
                    heal_amount_duplicate
                    damage_chance
                    damage_amount
                    heal_amount
                    freeze_fatigue
                    recharge_time
                    affects_allies
                    affects_enemies
                }
            }

            allUnitAbilitiesToAdditionalUiEffectsJuncsTablesTsv {
                nodes {
                    ability
                    effect
                }
            }

            allSpecialAbilityToSpecialAbilityPhaseJunctionsTablesTsv {
                nodes {
                    special_ability
                    phase
                    order
                }
            }

            allUiTextReplacementsLocTsv {
                nodes {
                    key
                    text
                    tooltip
                }
            }

            locUnitAttributes: allUnitAttributesLocTsv {
                nodes {
                    key
                    text
                    tooltip
                }
            }

            locAdditionalUIEffects: allUnitAbilitiesAdditionalUiEffectsLocTsv {
                nodes {
                    key
                    text
                    tooltip
                }
            }

            locAbilities: allUnitAbilitiesLocTsv {
                edges {
                    node {
                        id
                        key
                        text
                        tooltip
                    }
                }
            }

            locUnitAbilitySourceType: allUnitAbilitySourceTypesLocTsv {
                edges {
                    node {
                        key
                        text
                        tooltip
                    }
                }
            }

            locUnitStatLocalisations: allUnitStatLocalisationsLocTsv {
                nodes {
                    key
                    text
                    tooltip
                }
            }
        }
    `)

    const {
        allSpecialAbilityPhaseStatEffectsTablesTsv,
        allSpecialAbilityPhasesTablesTsv,
        allSpecialAbilityToSpecialAbilityPhaseJunctionsTablesTsv,
    } = data

    const service = new TooltipAbilityService(skill, data)

    const ability = service.getAbility()
    if (!ability) {
        return null
    }

    const specialAbilityPhase = allSpecialAbilityToSpecialAbilityPhaseJunctionsTablesTsv.nodes.find(
        node => node.special_ability === ability.key
    )

    const specialAbilityPhases = allSpecialAbilityToSpecialAbilityPhaseJunctionsTablesTsv.nodes.filter(
        node => node.special_ability === ability.key
    )

    const abilityPhase = specialAbilityPhase
        ? allSpecialAbilityPhasesTablesTsv.nodes.find(node => node.id === specialAbilityPhase.phase)
        : null

    const abilityPhases = specialAbilityPhases.map(abilityPhase => {
        return allSpecialAbilityPhasesTablesTsv.nodes.find(node => node.id === abilityPhase.phase)
    })

    const abilityPhasesStatEffects = abilityPhases
        .map(abilityPhase => {
            return allSpecialAbilityPhaseStatEffectsTablesTsv.nodes.filter(
                node => node.phase === abilityPhase.id
            )
        })
        .flat()

    const unitAbility = service.getUnitAbility(ability)
    const localisedSourceType = service.getLocalisedSourceType(unitAbility)

    const abilityTooltipEffects = service.getAbilityTooltipEffects(ability, abilityPhase, specialAbilityPhase)
    const abilityBulletText = service.getAbilityBulletText(specialAbilityPhase)

    const rechargeTime = Number(ability.recharge_time)
    const localisedAbilityName = service.getLocalisedAbilityName(ability)
    const targetValues = service.getTargetValues(ability)

    return (
        <div className="skill-tooltip-ability">
            <div className="tooltip-ability-title">
                <h4 className="tooltip-ability-name" title="foo">
                    {localisedAbilityName}
                    {/* {getLocalisedAbilityName(ability, locAbilities, allUiTextReplacementsLocTsv)} */}
                </h4>

                {rechargeTime !== -1 ? (
                    <div className="tooltip-ability-cooldown">
                        <span className="tooltip-ability-cooldown-icon" />
                        {rechargeTime}
                    </div>
                ) : (
                    ""
                )}
            </div>

            <h5 className="tooltip-ability-source-type">{localisedSourceType}</h5>

            <hr />

            <div className="tooltip-ability-effects">
                {Number(ability.active_time) === -1 ? (
                    <div className="tooltip-ability-effect">
                        <span className="tooltip-ability-effect-name">Duration:</span>
                        <span className="tooltip-ability-effect-value">Constant</span>
                    </div>
                ) : (
                    <SkillTooltipAbilityEffect
                        ability={ability}
                        prop="active_time"
                        label="Duration"
                        template="%d seconds"
                    />
                )}

                {/* <SkillTooltipAbilityEffect ability={ability} prop="affect_self" label="Target" value="Self" /> */}
                <div className="tooltip-ability-effect">
                    <span className="tooltip-ability-effect-name">Target:</span>
                    <div className="tooltip-ability-effect-value">
                        {targetValues.map((value, i) => (
                            <p key={i}>{value}</p>
                        ))}
                    </div>
                </div>

                <SkillTooltipAbilityEffect
                    ability={abilityPhase}
                    prop="damage_amount"
                    label="Health cost"
                    template="%d"
                />

                <SkillTooltipAbilityEffect
                    ability={ability}
                    prop="rage_cost"
                    label="Rage cost"
                    template={ability.cost_type === "RAGE_PER_SEC" ? "%d per second" : "%d"}
                />

                <SkillTooltipAbilityEffect
                    ability={ability}
                    prop="effect_range"
                    label="Effect range"
                    template="%dm"
                />

                <div className="tooltip-ability-effect">
                    <span className="tooltip-ability-effect-name">Effects:</span>
                    <div className="tooltip-ability-effect-value">
                        {abilityTooltipEffects.map(effect => (
                            <p
                                key={effect.stat}
                                data-stat={effect.stat}
                                className={`tooltip-ability-effect-value-line ${
                                    effect.positive ? "positive" : "negative"
                                }`}
                            >
                                {effect.content}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <hr />

            <SkillTooltipAbilityBulletText
                abilityBulletText={abilityBulletText}
                unitAbility={unitAbility}
            />
        </div>
    )
}
