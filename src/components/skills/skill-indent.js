import React from "react"
import SkillIcon from "./skill-icon"

const indentAssociation = {
    1: 2,
    2: 1,
    4: 5,
    5: 4
}

const SkillIndent = ({
    skills,
    indent,
    isRightSkillShifted,
    style = { width: "38px", height: "38px" }
}) => {
    if (!skills) {
        return null
    }

    if (!indent) {
        return null
    }

    indent = Number(indent)
    if (isNaN(indent)) {
        return null
    }

    const skill = skills.find(s => Number(s.indent) === indent)
    if (!skill) {
        return null
    }

    let className = `skill-indent skill-indent-${indent}`
    let hasOnlyOneSpecSkill = false
    if (indent !== 3 && indent !== 6) {
        hasOnlyOneSpecSkill = !skills.find(s => Number(s.indent) === indentAssociation[indent])
    }

    if (hasOnlyOneSpecSkill) {
        className += " skill-indent-spec-only-skill"
    }

    return (
        <div className={className} data-skill-key={skill.key}>
            <SkillIcon skill={skill} size={48} />
        </div>
    )
}

export default SkillIndent
