import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import SkillTooltipAbilityEffect from "./skill-tooltip-ability-effect"

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
                edges {
                    node {
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
            }

            unitAbilities: allUnitAbilitiesTablesTsv {
                edges {
                    node {
                        key
                        source_type
                    }
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
        }
    `)

    const {
        bonusValueUnitAbilities,
        specialAbilities,
        locAbilities,
        unitAbilities,
        locUnitAbilitySourceType
    } = data
    const { effects } = skill
    const abilityEffect = effects.find(
        ({ effect_key }) =>
            !effect_key.includes("replace") && !effect_key.includes("level_up_health")
    )

    const bonusValueUnitAbility = bonusValueUnitAbilities.edges.find(
        ({ node }) => node.effect === abilityEffect.effect_key
    )

    if (!bonusValueUnitAbility) {
        return null
    }

    const abilityKey = bonusValueUnitAbility.node.unit_ability
    const ability = specialAbilities.edges.find(({ node }) => node.key === abilityKey).node
    const localisedAbilityName = locAbilities.edges.find(
        ({ node }) => node.key === `unit_abilities_onscreen_name_${abilityKey}`
    ).node.text

    const unitAbility = unitAbilities.edges.find(({ node }) => node.key === abilityKey)
    const localisedSourceType = locUnitAbilitySourceType.edges.find(
        ({ node }) => node.key === `unit_ability_source_types_name_${unitAbility.node.source_type}`
    ).node.text

    const rechargeTime = Number(ability.recharge_time)

    return (
        <div className="skill-tooltip-ability">
            <div className="tooltip-ability-title">
                <h4 className="tooltip-ability-name" title="foo">
                    {localisedAbilityName}
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
                <SkillTooltipAbilityEffect
                    ability={ability}
                    prop="active_time"
                    label="Duration"
                    template="%d seconds"
                />

                <SkillTooltipAbilityEffect
                    ability={ability}
                    prop="affect_self"
                    label="Target"
                    value="Self"
                />

                <SkillTooltipAbilityEffect
                    ability={ability}
                    prop="effect_range"
                    label="Effect range"
                    template="%dm"
                />
            </div>
        </div>
    )
}
