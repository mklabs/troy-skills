import React from "react"
import SkillIndent from "./skill-indent"
import SkillIcon from "./skill-icon"

const SkillPair = ({ skills }) => {
    const leftSkill = skills.find(s => Number(s.indent) === 3)
    let rightSkill = skills.find(s => Number(s.indent) === 6)

    let isRightSkillShifted = false
    if (!rightSkill) {
        rightSkill = skills.find(s => Number(s.indent) === 4)
        isRightSkillShifted = true
    }

    return (
        <div className="skill-pair">
            <div className="skill-left">
                <h3 className="skill-name skill-pair-name">
                    {leftSkill.skill.localised_name}
                </h3>
                <div className="skill-card">
                    <div className="skill-tier-spec">
                        <SkillIndent skills={skills} indent="1" />
                        <SkillIndent skills={skills} indent="2" />
                    </div>

                    <SkillIcon skill={leftSkill} />
                </div>
            </div>
            <div className="skill-right">
                <h3 className="skill-name skill-pair-name">
                    {rightSkill.skill.localised_name}
                </h3>
                <div className="skill-card">
                    <SkillIcon skill={rightSkill} />

                    <div className="skill-tier-spec">
                        {!isRightSkillShifted ? (
                            <SkillIndent skills={skills} indent="4" />
                        ) : (
                            ""
                        )}
                        <SkillIndent
                            skills={skills}
                            indent="5"
                            isRightSkillShifted={isRightSkillShifted}
                        />
                    </div>
                </div>
            </div>
            <div className="skill-arrow" />
        </div>
    )
}

export default SkillPair
