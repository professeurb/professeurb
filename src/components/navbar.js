import React from 'react'
import { Link } from 'gatsby'
import { FaTwitter, FaEnvelope } from 'react-icons/fa'

const NavBar = () => (
  <div class='navbar px-0 py-1'>
    <div class='w-2/3 mx-auto flex items-center'>
      <Link to='/' style={{ fontWeight: 600 }}>
        Professeur&nbsp;B.
      </Link>{' '}
      <Link to='/'>Articles</Link> <Link to='/'>IPT</Link>{' '}
      <Link to='/'>Option Info</Link>
      <div class='flex-auto' />
      <a
        class='mr-4'
        href='mailto:professeurb at free.fr'
        style={{ boxShadow: `none` }}
      >
        <FaEnvelope />
      </a>
      <a href='https://twitter.com/professeur_b/' style={{ boxShadow: `none` }}>
        <FaTwitter />
      </a>
    </div>
  </div>
)

export default NavBar
