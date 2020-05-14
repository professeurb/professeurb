import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div className='flex bg-white rounded-lg p-6 border'>
      <Image
        className='rounded-full mr-8'
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
      />
      <div class='text-left'>
        <h2 class='text-xl'>{author}</h2>
        <div class='text-purple-500'>Customer Support</div>
        <div class='text-gray-600'>erinlindford@example.com</div>
        <div class='text-gray-600'>(555) 765-4321</div>
      </div>
    </div>
  )
}

export default Bio
