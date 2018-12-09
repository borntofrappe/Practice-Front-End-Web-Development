/** @jsx jsx */
import { jsx } from '@emotion/core'

const anchorLink = ({ url, name }) => (
  <a
    href={`#${url}`}
    css={{
      color: 'inherit',
      textTransform: 'uppercase',
      letterSpacing: '0.2rem',
      textDecoration: 'none',
      transition: 'color 0.2s ease-out',
      '&:hover': {
        color: 'var(--theme-l)'
      }
    }}>
    {
      name
    }
  </a>
);

const Navigation = ({ links }) => {
  return (

    <nav
      className="Navigation"
      css={{
        position: 'fixed',
        top: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '2rem 1rem',
        background: 'var(--theme-dd)'
      }}>
      {
        links.map(link => anchorLink(link))
      }
    </nav >

  );
}

export default Navigation;
