import React from "react"
export default function SkillColour({ skills, level }) {
    const skill = skills[0]
    if (!skill) {
        return null
    }

    const colour = skill.skill.skill_colour || "campaign"
    const className = `skill-colour-${colour}`

    return (
        <div className={`skill-colour-wrapper ${className}`}>
            <div className={`skill-colour-bar`} />
            <div className="skill-colour-level">
                <span>{level}</span>
            </div>
        </div>
    )
}
