import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import '../styles/index.scss'
import Footer from './Footer'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {  
        site {
            siteMetadata {
              title
            }
          }
        }
  `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        {/* <Header fixed="top" light expand="sm" /> */}
        {/* <Header  /> */}

        <div
          className="container" id="content"
        >
          {children}
        </div>
        <Footer />
      </>
    )}
  />
)

Layout.proTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout