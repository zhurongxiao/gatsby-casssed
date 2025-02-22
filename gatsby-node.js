/**
 * 当创建新节点时触发的函数。主要用于给 MarkdownRemark 类型的节点添加 slug 字段。
 * @param {Object} params 包含节点信息和动作的对象。
 * @param {Object} params.node 当前处理的节点对象。
 * @param {Object} params.actions 提供了创建、删除和连接节点等操作的动作对象。
 * 
 * 这段代码位于名为 gatsby-node.js 的文件中，这是Gatsby框架中的一个特殊文件，用于定义自定义的Node.js API钩子。
 * Gatsby在构建过程中会自动调用这些API钩子，因此你不需要在其他组件中直接关联这些参数，Gatsby会为你处理好这一切。
 */



const { slugify } = require('./src/util/utilityFunctions')
const path = require('path')
const authors = require('./src/util/authors')
const _ = require('lodash')




// onCreateNode 是Gatsby提供的一种API钩子，每当Gatsby创建或更新一个节点时，它就会自动触发这个函数。
exports.onCreateNode = ({ node, actions }) => {

  // 从 actions 对象中解构出了 createNodeField 方法，该方法用于向节点添加自定义字段。
  const { createNodeField } = actions

  // 检查当前节点类型是否为 MarkdownRemark
  if (node.internal.type === 'MarkdownRemark') {
    // 从节点的 frontmatter 中的标题生成 slug
    const slugFromTitle = slugify(node.frontmatter.title)
    // 为当前节点添加 slug 字段
    // 最后，通过 createNodeField 方法为当前Markdown节点添加了一个名为 slug 的字段，
    // 并将其值设置为刚刚生成的 slugFromTitle。
    createNodeField({
      node,
      name: 'slug',
      value: slugFromTitle,
    })
  }
}

// 导出一个用于创建网页的异步函数，该函数接受一个包含actions与graphql的对象作为参数
exports.createPages = ({ actions, graphql }) => {
  // 从actions对象中解构出createPage方法，该方法用于在Gatsby中创建新的网页
  const { createPage } = actions

  // 解析出单篇帖子模板文件的绝对路径，这个模板将用于生成每篇Markdown文章的页面
  const templates = {
    singlePost: path.resolve('src/templates/single-post.js'),
    tagsPage: path.resolve('src/templates/tags-page.js'),
    tagPosts: path.resolve('src/templates/tag-posts.js'),
    postList: path.resolve('src/templates/post-list.js'),

  }

  // 使用graphql函数执行一个GraphQL查询，目的是获取所有Markdown格式的文章信息
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    // 如果查询过程中出现错误，则通过Promise.reject返回这些错误
    if (result.errors) return Promise.reject(result.errors)

    // 从查询结果中提取所有的文章节点信息
    const posts = result.data.allMarkdownRemark.edges

    // 遍历每一篇文章节点
    posts.forEach(({ node }) => {
      // 调用createPage方法创建一个新的网页
      // 页面路径由当前文章的slug字段确定，确保每篇文章有唯一的URL
      // 使用之前解析出的singlePostTemplate作为页面组件模板
      // 向页面上下文中传递slug，这样在渲染模板时可以知道当前是哪篇文章
      createPage({
        // 页面的路径
        path: node.fields.slug,
        // 页面组件模板路径
        component: templates.singlePost,
        // 传递给页面组件的上下文数据
        context: {
          // 将当前文章的slug传递给模板，用于定位和渲染具体文章内容
          slug: node.fields.slug,
          //Find author imageUrl from authors and pass it to the single post template
          // 从作者中找到作者 imageUrl 并将其传递给单个帖子模板
          imageUrl: authors.find(x => x.name === node.frontmatter.author).imageUrl,
        },
      })
    })


    //获取标签
    let tags = []

    // 遍历所有文章边缘（edges），即所有MarkdownRemark节点
    _.each(posts, edge => {
      // 如果当前文章有标签（tags）属性
      if (_.get(edge, 'node.frontmatter.tags')) {
        // 将文章的所有标签添加到 tags 数组中  
        tags = tags.concat(edge.node.frontmatter.tags)
      }

    })

    // 创建一个对象来存储每个标签对应的文章数量
    let tagPostCounts = {}

    // 遍历 tags 数组
    tags.forEach(tag => {
      // 对于每一个标签，如果 tagPostCounts 中已经有这个标签，则计数加一；
      //如果没有，则初始化计数为1
      tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1

      // 使用 lodash 的 uniq 方法去重，确保 tags 数组中没有重复的标签
      tags = _.uniq(tags)

      // 创建一个标签页面
      createPage({
        // 设置页面路径为 /tags，这将是一个汇总所有标签的页面
        path: `/tags`,
        // 设置页面组件模板为 tagsPage.js
        component: templates.tagsPage,
        // 设置页面上下文，包括所有标签和每个标签对应的文章数量
        context: {
          tags,
          tagPostCounts
        }
      })
    })

    //Create tag posts pages
    tags.forEach(tag => {
      createPage({
        // 设置页面路径为 /tags/:tag，其中 :tag 是一个占位符，表示当前标签的名称
        path: `/tag/${slugify(tag)}`,
        // 设置页面组件模板为 tagsPosts.js
        component: templates.tagPosts,
        // 设置页面上下文，包括当前标签的名称和所有文章
        context: {
          tag,

        }
      })
    })


    // 定义每页显示的文章数量
    const postsPerPage = 2
    // 计算总页数，向上取整确保即使文章数量不能被每页文章数整除也能覆盖所有文章
    const numberOfPages = Math.ceil(posts.length / postsPerPage)

    // 使用 Array.from 生成一个数组，长度等于总页数，用于遍历每一页
    Array.from({ length: numberOfPages }).forEach((_, index) => {
      // 判断是否为第一页
      const isFirstPage = index === 0
      // 当前页码，从1开始计数
      const currentPage = index + 1
      // 如果是第一页，不执行下面的代码块，通常第一页的处理可能不同，或者已经在其他地方处理过了
      if (isFirstPage) return
      // 使用 createPage 方法创建一个新的页面
      createPage({
        // 设置页面的路径，例如 /page/2, /page/3 等
        path: `/page/${currentPage}`,
        component: templates.postList,
        context: {
          // 每页显示的文章数量
          limit: postsPerPage,
          // 跳过的文章数量，用于分页查询，例如第二页跳过前两篇文章
          skip: index * postsPerPage,
          // 当前页码，用于显示当前是第几页
          currentPage,
          numberOfPages
        },
      })
    })



  })


}
// // 查询Markdown类型的全部数据
// allMarkdownRemark {
//   // 获取每篇文章的关联信息
//   edges {
//     // 获取文章节点详细信息
//     node {
//       // 获取文章的元数据，如作者、标签等
//       frontmatter {
//         author
//         tags
//       }
//       // 获取自动生成的字段信息，如slug（用于页面URL）
//       fields {
//         slug
//       }


// 此段代码是Gatsby框架中常见的用于动态生成静态页面的逻辑，主要用于根据Markdown文件自动生成对应的网页。
//它首先通过GraphQL查询Markdown文件的信息，然后基于查询结果为每篇Markdown文章创建一个独立的网页。