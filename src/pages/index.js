import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SkillTreesList from "../components/list/skill-trees-list"

export default () => (
    <Layout page="Home">
        <SEO title="Home" />

        <SkillTreesList size="page" />
    </Layout>
)
