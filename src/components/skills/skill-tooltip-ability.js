import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import SkillTooltipAbilityEffect from "./skill-tooltip-ability-effect"
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
                edges {
                    node {
                        key
                        source_type
                    }
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
        bonusValueUnitAbilities,
        specialAbilities,
        locAbilities,
        unitAbilities,
        locUnitAbilitySourceType,
        allSpecialAbilityPhaseStatEffectsTablesTsv,
        locUnitStatLocalisations,
        allSpecialAbilityPhasesTablesTsv,
        allUnitAbilitiesToAdditionalUiEffectsJuncsTablesTsv,
        locAdditionalUIEffects,
        allSpecialAbilityToSpecialAbilityPhaseJunctionsTablesTsv,
        allUiTextReplacementsLocTsv
    } = data

    const hiddenStats = ["stat_in_combat_rage", "stat_out_combat_rage"]

    const { effects } = skill
    const abilityEffect = effects.find(
        ({ effect_key }) => !effect_key.includes("replace") && !effect_key.includes("level_up_health")
    )

    const bonusValueUnitAbility = bonusValueUnitAbilities.edges.find(
        ({ node }) => node.effect === abilityEffect.effect_key
    )

    if (!bonusValueUnitAbility) {
        return null
    }

    let abilityKey = bonusValueUnitAbility.node.unit_ability
    const ability = specialAbilities.nodes.find(node => node.key === abilityKey)
    if (!ability) {
        return null
    }

    const specialAbilityPhase = allSpecialAbilityToSpecialAbilityPhaseJunctionsTablesTsv.nodes.find(
        node => node.special_ability === ability.key
    )

    const abilityPhase = allSpecialAbilityPhasesTablesTsv.nodes.find(node => node.id === specialAbilityPhase ? specialAbilityPhase.phase : ability.key)

    let localisedAbilityName = locAbilities.edges.find(
        ({ node }) => node.key === `unit_abilities_onscreen_name_${abilityKey}`
    ).node.text

    const textReplacementRegex = /{{tr:(.+)}}/
    if (textReplacementRegex.test(localisedAbilityName)) {
        const [, textReplacementKey] = localisedAbilityName.match(textReplacementRegex) || []
        const textReplacement = allUiTextReplacementsLocTsv.nodes.find(node => node.key === textReplacementKey)
        if (textReplacement) {
            localisedAbilityName = textReplacement.text
        }
    }

    const unitAbility = unitAbilities.edges.find(({ node }) => node.key === abilityKey)
    const localisedSourceType = locUnitAbilitySourceType.edges.find(
        ({ node }) => node.key === `unit_ability_source_types_name_${unitAbility.node.source_type}`
    ).node.text

    const rechargeTime = Number(ability.recharge_time)

    const imgRegex = /\[\[img:(.+)\]\]\[\[\/img\]\]/

    const additionalUIEffects = allUnitAbilitiesToAdditionalUiEffectsJuncsTablesTsv.nodes.filter(
        node =>
            node.ability === skill.character_skill_key ||
            node.ability === ability.key ||
            (specialAbilityPhase ? node.ability === specialAbilityPhase.phase : false)
    )

    const uiEffects = [...new Set(additionalUIEffects.map(node => node.effect))]

    const locUIEffectRegex = /\[\[col:(green|red)\]\](.+)\[\[\/col\]\]/
    const abilityStatEffects = uiEffects.map(effect => {
        const loc = locAdditionalUIEffects.nodes.find(
            l => l.key === `unit_abilities_additional_ui_effects_localised_text_${effect}`
        )
        const [, colour, text] = loc.text.match(locUIEffectRegex) || []
        const [, description] = text.split(imgRegex).slice(1)
        const positive = colour === "green"
        const iconClassname = positive ? "arrow-up" : "arrow-down"

        return {
            stat: effect,
            positive,
            content: (
                <span>
                    <span className={iconClassname}></span> {description}
                </span>
            )
        }
    })

    const phaseKey = specialAbilityPhase ? specialAbilityPhase.phase : ability.key
    const specialAbilityStatEffects = allSpecialAbilityPhaseStatEffectsTablesTsv.nodes
        .filter(node => node.phase === phaseKey)
        .filter(node => !hiddenStats.includes(node.stat))
        .map(node => {
            const loc = locUnitStatLocalisations.nodes.find(
                l => l.key === `unit_stat_localisations_onscreen_name_${node.stat}`
            )
            node.loc = loc

            let value = Number(node.value)
            value = node.how === "mult" ? value * 100 - 100 : value
            const valueText = `${value < 0 ? "" : "+"}${value}${node.how === "mult" ? "%" : ""}`

            const matches = loc.text.match(imgRegex)
            const img = matches && matches[1]
            const text = `${valueText} ${loc.text}`
            const splits = text
                .split(imgRegex)
                .map((s, i) => (
                    <span key={i}>
                        {s === img ? <img className="tooltip-ability-effect-icon" src={s} alt={s} /> : s}
                    </span>
                ))

            node.positive = abilityPhase.effect_type === "positive"
            // node.positive = value >= 0
            node.content = splits
            return node
        })

    abilityStatEffects.push(...specialAbilityStatEffects)

    if (abilityPhase) {
        const fatigueChangeRatio = Number(abilityPhase.fatigue_change_ratio)
        if (fatigueChangeRatio !== 0) {
            const value = -fatigueChangeRatio * 100
            const valueText = `${value < 0 ? "" : "+"}${value}%`

            abilityStatEffects.push({
                stat: "fatigue_change_ratio",
                positive: fatigueChangeRatio <= 0,
                content: (
                    <span key="fatigue">
                        {valueText}{" "}
                        <img className="tooltip-ability-effect-icon" src="ui/skins/default/fatigue.png" alt="Fatigue" />{" "}
                        Stamina
                    </span>
                )
            })
        }
    }

    // console.log(skill.character_skill_key, skill.tier, ability, abilityPhase, abilityStatEffects)
    // console.log(skill.character_skill_key, ability.effect_range, ability.target_intercept_range)

    const targetValues = []
    const numEffectedEnemyUnits = Number(ability.num_effected_enemy_units)
    const numEffectedFriendlyUnits = Number(ability.num_effected_friendly_units)
    const targetInterceptRange = Number(ability.target_intercept_range)

    if (ability.affect_self === "true") {
        targetValues.push("Self")
    }

    if (ability.target_enemies === "true") {
        targetValues.push("Enemy")
    }

    if (ability.ai_usage === "hex_melee_area_self") {
        targetValues.push("Around self")
    }

    if (numEffectedFriendlyUnits === -1) {
        targetValues.push("Affects allies in range")
    }

    if (numEffectedEnemyUnits === -1) {
        targetValues.push("Affects enemies in range")
    }

    if (targetInterceptRange !== 0 && ability.ai_usage !== "hex_melee_area_self") {
        targetValues.push(
            <span>
                <img
                    className="tooltip-ability-effect-icon"
                    src="ui/skins/default/icon_distance_to_target.png"
                    alt="Distance to Target"
                />
                {targetInterceptRange}m
            </span>
        )
    }

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

                <SkillTooltipAbilityEffect ability={ability} prop="rage_cost" label="Rage cost" template="%d" />

                <SkillTooltipAbilityEffect ability={ability} prop="effect_range" label="Effect range" template="%dm" />

                <div className="tooltip-ability-effect">
                    <span className="tooltip-ability-effect-name">Effects:</span>
                    <div className="tooltip-ability-effect-value">
                        {abilityStatEffects.map(effect => (
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
        </div>
    )
}
