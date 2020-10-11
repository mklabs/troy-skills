import React from "react"
import { withPrefix } from "gatsby"

const textReplacementRegex = /{{tr:(.+)}}/
const imgRegex = /\[\[img:(.+)\]\]\[\[\/img\]\]/
const locUIEffectRegex = /\[\[col:(green|red)\]\](.+)\[\[\/col\]\]/
const hiddenStats = ["stat_in_combat_rage", "stat_out_combat_rage"]

export default class TooltibAbilityService {
    constructor(skill, data) {
        this.skill = skill
        this.data = data
    }

    getAbility() {
        const skill = this.skill
        const { bonusValueUnitAbilities, specialAbilities } = this.data
        const abilityEffect = skill.effects.find(
            ({ effect_key }) =>
                !effect_key.includes("replace") && !effect_key.includes("level_up_health")
        )

        const bonusValueUnitAbility = bonusValueUnitAbilities.edges.find(
            ({ node }) => node.effect === abilityEffect.effect_key
        )

        if (!bonusValueUnitAbility) {
            return
        }

        return specialAbilities.nodes.find(
            node => node.key === bonusValueUnitAbility.node.unit_ability
        )
    }

    getUnitAbility(ability) {
        const { unitAbilities } = this.data
        return unitAbilities.nodes.find(node => node.key === ability.key)
    }

    getLocalisedSourceType(unitAbility) {
        const { locUnitAbilitySourceType } = this.data
        const loc = locUnitAbilitySourceType.edges.find(
            ({ node }) => node.key === `unit_ability_source_types_name_${unitAbility.source_type}`
        )

        return loc ? loc.node.text : ""
    }

    getLocalisedAbilityName(ability) {
        const { locAbilities, allUiTextReplacementsLocTsv } = this.data

        let localisedAbilityName = locAbilities.edges.find(
            ({ node }) => node.key === `unit_abilities_onscreen_name_${ability.key}`
        ).node.text

        if (textReplacementRegex.test(localisedAbilityName)) {
            const [, textReplacementKey] = localisedAbilityName.match(textReplacementRegex) || []
            const textReplacement = allUiTextReplacementsLocTsv.nodes.find(
                node => node.key === textReplacementKey
            )
            if (textReplacement) {
                localisedAbilityName = textReplacement.text
            }
        }

        return localisedAbilityName
    }

    getTargetValues(ability) {
        const results = []
        const numEffectedEnemyUnits = Number(ability.num_effected_enemy_units)
        const numEffectedFriendlyUnits = Number(ability.num_effected_friendly_units)
        const targetInterceptRange = Number(ability.target_intercept_range)

        if (ability.affect_self === "true") {
            results.push("Self")
        }

        if (ability.target_enemies === "true") {
            results.push("Enemy")
        }

        if (ability.ai_usage === "hex_melee_area_self") {
            results.push("Around self")
        }

        if (numEffectedFriendlyUnits === -1) {
            results.push("Affects allies in range")
        }

        if (numEffectedEnemyUnits === -1) {
            results.push("Affects enemies in range")
        }

        if (targetInterceptRange !== 0 && ability.ai_usage !== "hex_melee_area_self") {
            results.push(
                <span>
                    <img
                        className="tooltip-ability-effect-icon"
                        src={withPrefix("ui/skins/default/icon_distance_to_target.png")}
                        alt="Distance to Target"
                    />
                    {targetInterceptRange}m
                </span>
            )
        }

        return results
    }

    mapSpecialAbilityPhaseStatEffects(abilityPhase) {
        const { locUnitStatLocalisations } = this.data
        return function (node) {
            const loc = locUnitStatLocalisations.nodes.find(
                l => l.key === `unit_stat_localisations_onscreen_name_${node.stat}`
            )
            node.loc = loc

            let value = Number(node.value)
            value = node.how === "mult" ? value * 100 - 100 : value
            value = value.toFixed(0)
            const valueText = `${value < 0 ? "" : "+"}${value}${node.how === "mult" ? "%" : ""}`

            const matches = loc.text.match(imgRegex)
            const img = matches && matches[1]
            const text = `${valueText} ${loc.text}`
            const splits = text
                .split(imgRegex)
                .map((s, i) => (
                    <span key={i}>
                        {s === img ? (
                            <img
                                className="tooltip-ability-effect-icon"
                                src={withPrefix(s)}
                                alt={s}
                            />
                        ) : (
                            s
                        )}
                    </span>
                ))

            node.positive = abilityPhase.effect_type === "positive"
            node.content = splits
            return node
        }
    }

    getAdditionalUIEffectsStats(ability, specialAbilityPhase) {
        const skill = this.skill
        const {
            allUnitAbilitiesToAdditionalUiEffectsJuncsTablesTsv,
            locAdditionalUIEffects
        } = this.data

        const additionalUIEffects = allUnitAbilitiesToAdditionalUiEffectsJuncsTablesTsv.nodes.filter(
            node =>
                node.ability === skill.character_skill_key ||
                node.ability === ability.key ||
                (specialAbilityPhase ? node.ability === specialAbilityPhase.phase : false)
        )

        const uiEffects = [...new Set(additionalUIEffects.map(node => node.effect))]

        return uiEffects.map(effect => {
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
    }

    getSpecialAbilityStatEffects(ability, abilityPhase, specialAbilityPhase) {
        const { allSpecialAbilityPhaseStatEffectsTablesTsv, locUnitStatLocalisations } = this.data
        const phaseKey = specialAbilityPhase ? specialAbilityPhase.phase : ability.key
        const specialAbilityStatEffects = allSpecialAbilityPhaseStatEffectsTablesTsv.nodes
            .filter(node => node.phase === phaseKey)
            .filter(node => !hiddenStats.includes(node.stat))
            .map(this.mapSpecialAbilityPhaseStatEffects(abilityPhase, locUnitStatLocalisations))
        return specialAbilityStatEffects
    }

    getFatigueChangeStatEffect(abilityPhase) {
        if (!abilityPhase) {
            return
        }

        const fatigueChangeRatio = Number(abilityPhase.fatigue_change_ratio)
        if (fatigueChangeRatio === 0) {
            return
        }

        const value = (-fatigueChangeRatio * 100).toFixed(0)
        const valueText = `${value < 0 ? "" : "+"}${value}%`

        return {
            stat: "fatigue_change_ratio",
            positive: fatigueChangeRatio <= 0,
            content: (
                <span key="fatigue">
                    {valueText}{" "}
                    <img
                        className="tooltip-ability-effect-icon"
                        src={withPrefix("ui/skins/default/fatigue.png")}
                        alt="Fatigue"
                    />{" "}
                    Stamina
                </span>
            )
        }
    }

    getAbilityPhaseAttributes(specialAbilityPhase) {
        if (!specialAbilityPhase) {
            return []
        }

        const { allSpecialAbilityPhaseAttributeEffectsTablesTsv, locUnitAttributes } = this.data

        return allSpecialAbilityPhaseAttributeEffectsTablesTsv.nodes
            .filter(node => node.phase === specialAbilityPhase.phase)
            .map(attribute => {
                const imbuedEffect = locUnitAttributes.nodes.find(
                    node => node.key === `unit_attributes_imued_effect_text_${attribute.attribute}`
                )
                const bulletText = locUnitAttributes.nodes.find(
                    node => node.key === `unit_attributes_bullet_text_${attribute.attribute}`
                )

                attribute.imbuedEffect = imbuedEffect ? imbuedEffect.text : ""
                attribute.bulletText = bulletText ? bulletText.text : ""

                const positive = attribute.attribute_type === "positive"

                return {
                    stat: attribute.attribute,
                    positive,
                    content: (
                        <>
                            <span className={positive ? "arrow-up" : "arrow-down"}></span>{" "}
                            {attribute.imbuedEffect}
                        </>
                    ),
                    ...attribute
                }
            })
    }

    getAbilityTooltipEffects(ability, abilityPhase, specialAbilityPhase) {
        const fatigueChangeStatEffect = this.getFatigueChangeStatEffect(abilityPhase)
        const additionalUIEffectsStats = this.getAdditionalUIEffectsStats(ability, specialAbilityPhase)
        const abilityPhaseAttributes = this.getAbilityPhaseAttributes(specialAbilityPhase)
        const specialAbilityStatEffects = this.getSpecialAbilityStatEffects(
            ability,
            abilityPhase,
            specialAbilityPhase
        )

        return additionalUIEffectsStats
            .concat(fatigueChangeStatEffect ? fatigueChangeStatEffect : [])
            .concat(specialAbilityStatEffects)
            .concat(abilityPhaseAttributes)
    }

    getAbilityBulletText(specialAbilityPhase) {
        const abilityPhaseAttributes = this.getAbilityPhaseAttributes(specialAbilityPhase)
        return abilityPhaseAttributes.find(attribute => attribute.bulletText !== "")
    }
}
