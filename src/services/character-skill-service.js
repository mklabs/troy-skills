const textReplacementRegex = /{{tr:(.+)}}/

export default class CharacterSkillService {
    constructor(data) {
        this.data = data
    }

    getSkillNodeset(nodesetKey) {
        const { allCharacterSkillNodeSetsTablesTsv } = this.data
        return allCharacterSkillNodeSetsTablesTsv.nodes.find(node => node.key === nodesetKey)
    }

    getTextReplacement(text, prefix) {
        const { allUiTextReplacementsLocTsv } = this.data

        if (!textReplacementRegex.test(text)) {
            return text
        }

        const [, textReplacementKey] = text.match(textReplacementRegex) || []
        const textReplacement = allUiTextReplacementsLocTsv.nodes.find(
            node => node.key === `${prefix}${textReplacementKey}`
        )

        return textReplacement ? textReplacement.text : text
    }

    getSkillNodes(agentSubtypeKey) {
        const { allCharacterSkillNodesTablesTsv, allCharacterSkillNodeSetsTablesTsv } = this.data

        const nodeset = allCharacterSkillNodeSetsTablesTsv.nodes.find(
            node => node.agent_subtype_key === agentSubtypeKey
        )
        return allCharacterSkillNodesTablesTsv.nodes
            .filter(node => node.character_skill_node_set_key === nodeset.key)
            .sort((a, b) => {
                const tier = (Number(a.tier) - Number(b.tier)) * 100
                const indent = Number(a.indent) - Number(b.indent)

                return tier + indent
            })
    }

    mapCharacterSkillLevelToEffects() {
        const { allEffectsLocTsv, allEffectsTablesTsv } = this.data

        return effect => {
            const loc = allEffectsLocTsv.nodes.find(
                node => node.key === `effects_description_${effect.effect_key}`
            )

            const effectData = allEffectsTablesTsv.nodes.find(
                node => node.effect === effect.effect_key
            )

            const effectValue = Number(effect.value)
            let text = loc ? loc.text : ""

            text = this.getTextReplacement(text, "ui_text_replacements_localised_text_")

            effect.description = text.replace(/%\+n/, `${effectValue < 0 ? "" : "+"}${effectValue}`)

            return {
                ...effect,
                ...effectData
            }
        }
    }

    getSkillsForTier(items) {
        const {
            allCharacterSkillsTableTsv,
            allCharacterSkillLevelToEffectsJunctionsTablesTsv,
            allImageSharp
        } = this.data

        return items.map(item => {
            const skill = allCharacterSkillsTableTsv.nodes.find(
                node => node.key === item.character_skill_key
            )

            if (!skill) {
                return item
            }

            const effects = allCharacterSkillLevelToEffectsJunctionsTablesTsv.nodes
                .filter(node => node.character_skill_key === skill.key)
                .map(this.mapCharacterSkillLevelToEffects())

            skill.localised_name = this.getTextReplacement(
                skill.localised_name,
                "ui_text_replacements_localised_text_"
            )

            item.skill = skill
            item.img = item.effects = effects

            const img = allImageSharp.nodes.find(
                node => node.childImageSharp.fixed.originalName === skill.image_path
            )

            item.img = img ? img.childImageSharp : null
            return item
        })
    }

    getSkillRows(agentSubtypeKey) {
        const nodes = this.getSkillNodes(agentSubtypeKey)

        const tree = {}
        nodes.forEach(node => {
            const { tier } = node
            tree[tier] = tree[tier] || []
            tree[tier].push(node)
        })

        const rows = []
        Object.keys(tree).forEach(tier => {
            const items = tree[tier]
            const skills = this.getSkillsForTier(items)
            rows.push(skills)
        })

        return rows
    }
}
