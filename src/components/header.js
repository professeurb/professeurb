import React from 'react'
import NavBar from '@components/navbar.js'

const Header = ({ title, subtitle }) => (
  // add slug and tags?
  <>
    <NavBar />
    <div class='py-8 mb-8 bg-blue-500 text-white'>
      <header class='w-2/3 mx-auto'>
        {/* <BreadCrumbs slug={slug} /> */}
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
        {/* {tags && (
          <div className='tags'>
            {tags.map((tag, index) => {
              return (
                <Tag key={index} isColor='black'>
                  {tag}
                </Tag>
              )
            })}
          </div>
        )} */}
      </header>
    </div>
  </>
)

export default Header
