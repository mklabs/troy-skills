import React from "react"
import SkillIcon from "./skill-icon"

const SkillSingle = ({ skills = [] }) => {
    const skill = skills.find(s => Number(s.indent) === 3)
    if (!skill) {
        return null
    }

    return (
        <div className="skill-single">
            <h3 className="skill-name skill-single-name">
                {skill.skill.localised_name}
            </h3>
            <div className="skill-card skill-single-card">
                <SkillIcon skill={skill} size={86} />
            </div>
        </div>
    )
}

export default SkillSingle
