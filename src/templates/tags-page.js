import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { Badge, Button } from 'react-bootstrap'
import { slugify } from '../util/utilityFunctions'

const tagsPage = ({ pageContext }) => {
    const { tags, tagPostCounts } = pageContext;
    return (
        <Layout pageTitle="App tags">
            <Seo title="All tags" keywords={['tags', 'topics']} />
            <ul>
                {/* 使用 map 函数遍历 tags 数组，为每个标签生成一个列表项 */}
                {tags.map(tag => (
                    <li key={tag} style={{ marginBottom: '10px' }}>
                        {/* 渲染一个 Button 组件，其颜色为 primary，链接到以标签名生成的 slug URL */}
                        <Button color="primary" href={`/tag/${slugify(tag)}`}>
                            {tag} <Badge color="light">{tagPostCounts[tag]}</Badge>
                        </Button>

                    </li>
                ))}
            </ul>
        </Layout>
    )
}

export default tagsPage
