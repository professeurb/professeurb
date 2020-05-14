import React from 'react'
import { MDXProvider } from '@mdx-js/react'
// import MarkdownLink from '@components/markdownlink.js'
import Header from '@components/header.js'

class Layout extends React.Component {
  render() {
    console.log(title)
    const { title, subtitle, children } = this.props
    return (
      <>
        <Header title={title} subtitle={subtitle}></Header>
        <div class='bubu'>
          <div class='container w-2/3 mx-auto'>
            <MDXProvider
              components={[
                {
                  // a: props => <MarkdownLink {...props} />,
                },
              ]}
            >
              {children}
            </MDXProvider>
          </div>
        </div>
      </>
    )
  }
}

export default Layout
