import React from "react"
import { withPrefix } from "gatsby"
import Img from "gatsby-image"
import path from "path"

const textReplacementRegex = /{{tr:(.+)}}/
const imgRegex = /\[\[img:(.+)\]\]\[\[\/img\]\]/
const locUIEffectRegex = /\[\[col:(green|red)\]\](.+)\[\[\/col\]\]/
const hiddenStats = ["stat_in_combat_rage", "stat_out_combat_rage"]
const hiddenBonusValueUnitAbilities = ["troy_effect_hero_self_cooldown", "troy_effect_hero_self_cooldown_spec_cost"]

export default class TooltibAbilityService {
    constructor(skill, data) {
        this.skill = skill
        this.data = data

        this.ability = this.getAbility()
        this.specialAbilityPhase = this.getSpecialAbilityPhase()
        this.abilityPhase = this.getAbilityPhase()
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

        if (hiddenBonusValueUnitAbilities.includes(bonusValueUnitAbility.node.effect)) {
            return
        }

        return specialAbilities.nodes.find(
            node => node.key === bonusValueUnitAbility.node.unit_ability
        )
    }

    getUnitAbility() {
        const { unitAbilities } = this.data
        return unitAbilities.nodes.find(node => node.key === this.ability.key)
    }

    getSpecialAbilityPhase() {
        const { allSpecialAbilityToSpecialAbilityPhaseJunctionsTablesTsv } = this.data
        if (!this.ability) {
            return
        }

        return allSpecialAbilityToSpecialAbilityPhaseJunctionsTablesTsv.nodes.find(
            node => node.special_ability === this.ability.key
        )
    }

    getAbilityPhase() {
        const { allSpecialAbilityPhasesTablesTsv } = this.data
        if (!this.specialAbilityPhase) {
            return
        }

        return allSpecialAbilityPhasesTablesTsv.nodes.find(
            node => node.id === this.specialAbilityPhase.phase
        )
    }

    getLocalisedSourceType(unitAbility) {
        const { locUnitAbilitySourceType } = this.data
        const loc = locUnitAbilitySourceType.edges.find(
            ({ node }) => node.key === `unit_ability_source_types_name_${unitAbility.source_type}`
        )

        return loc ? loc.node.text : ""
    }

    getLocalisedAbilityName() {
        const ability = this.ability
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

    getTargetValues() {
        const ability = this.ability
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

    mapSpecialAbilityPhaseStatEffects() {
        const abilityPhase = this.abilityPhase
        const { locUnitStatLocalisations } = this.data
        return node => {
            const loc = locUnitStatLocalisations.nodes.find(
                l => l.key === `unit_stat_localisations_onscreen_name_${node.stat}`
            )
            node.loc = loc

            let value = Number(node.value)
            value = node.how === "mult" ? value * 100 - 100 : value
            value = value.toFixed(0)
            const valueText = `${value < 0 ? "" : "+"}${value}${node.how === "mult" ? "%" : ""}`

            node.positive = abilityPhase.effect_type === "positive"
            node.content = [valueText, this.replaceInlineIcon(loc.text)]
            return node
        }
    }

    getAdditionalUIEffectsStats() {
        const { skill, ability, specialAbilityPhase } = this

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

    getFatigueChangeStatEffect() {
        const abilityPhase = this.abilityPhase
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

    getAbilityPhaseAttributes() {
        const specialAbilityPhase = this.specialAbilityPhase
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

                attribute.imbuedEffect = imbuedEffect
                    ? this.replaceInlineIcon(imbuedEffect.text, { static: false })
                    : ""

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

    replaceInlineIcon(text, options = { static: true }) {
        const matches = text.match(imgRegex)
        const isStatic = options.static
        const img = matches && matches[1]
        const splits = text.split(imgRegex).map((s, i) => {
            const isAbilityIcon = s.includes("/ability_icons/")
            return (
                <span key={i}>
                    {s === img
                        ? isStatic && !isAbilityIcon
                            ? this.getStaticImage(s)
                            : this.getAbilityIconImage(s)
                        : s}
                </span>
            )
        })
        return splits
    }

    getStaticImage(img) {
        img = /^ui\//.test(img) ? img : `ui/skins/default/${img}.png`
        return (
            <img
                className="tooltip-ability-effect-icon"
                src={withPrefix(img)}
                alt={img}
                style={{ marginBottom: 0 }}
            />
        )
    }

    getAbilityIconImage(img) {
        const { allAbilityIconsImageSharp } = this.data
        const sharpImg = allAbilityIconsImageSharp.nodes.find(
            node => node.name === path.basename(img, ".png")
        )

        if (!sharpImg) {
            return
        }

        return (
            <Img
                fixed={sharpImg.childImageSharp.fixed}
                Tag="span"
                style={{ width: "1rem", height: "1rem" }}
                className="tooltip-ability-effect-icon"
            />
        )
    }

    getAbilityPhasesStatEffects() {
        const ability = this.ability
        const {
            allSpecialAbilityToSpecialAbilityPhaseJunctionsTablesTsv,
            allSpecialAbilityPhasesTablesTsv,
            allSpecialAbilityPhaseStatEffectsTablesTsv
        } = this.data

        const specialAbilityPhases = allSpecialAbilityToSpecialAbilityPhaseJunctionsTablesTsv.nodes.filter(
            node => node.special_ability === ability.key
        )

        const abilityPhases = specialAbilityPhases.map(abilityPhase => {
            return allSpecialAbilityPhasesTablesTsv.nodes.find(
                node => node.id === abilityPhase.phase
            )
        })

        return abilityPhases
            .map(abilityPhase => {
                return allSpecialAbilityPhaseStatEffectsTablesTsv.nodes.filter(
                    node => node.phase === abilityPhase.id
                )
            })
            .flat()
            .filter(node => !hiddenStats.includes(node.stat))
            .map(this.mapSpecialAbilityPhaseStatEffects())
    }

    getAbilityTooltipEffects() {
        const { ability, specialAbilityPhase } = this
        const fatigueChangeStatEffect = this.getFatigueChangeStatEffect()
        const additionalUIEffectsStats = this.getAdditionalUIEffectsStats(
            ability,
            specialAbilityPhase
        )
        const abilityPhaseAttributes = this.getAbilityPhaseAttributes()
        const abilityPhasesStatEffects = this.getAbilityPhasesStatEffects()

        return additionalUIEffectsStats
            .concat(fatigueChangeStatEffect ? fatigueChangeStatEffect : [])
            .concat(abilityPhasesStatEffects)
            .concat(abilityPhaseAttributes)
    }

    getAbilityBullets() {
        const abilityPhaseAttributes = this.getAbilityPhaseAttributes()
        return abilityPhaseAttributes.filter(attribute => attribute.bulletText !== "")
    }
}
