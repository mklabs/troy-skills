import React from "react"
import { format } from "util"

export default function SkillTooltipAbilityEffect({ ability, prop, label, value, template }) {
    if (!ability) {
        return null
    }

    let field = ability[prop]
    if (field === "true" || field === "false") {
        field = Boolean(field)
    } else if (!isNaN(Number(field))) {
        field = Number(field)
    }

    if (field === -1) {
        return null
    }

    if (prop === "rage_cost" && field === 0) {
        return null
    }

    if (prop === "effect_range" && field === 0) {
        return null
    }

    if (prop === "damage_amount" && field === 0) {
        return null
    }

    return (
        <div className="tooltip-ability-effect">
            <span className="tooltip-ability-effect-name">{label}:</span>
            <span className="tooltip-ability-effect-value">{value || format(template, field)}</span>
        </div>
    )
}
