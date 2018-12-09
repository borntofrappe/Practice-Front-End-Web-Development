/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Spring } from 'react-spring';

const anchorLink = ({ url, name }) => (
  <a
    key={name}
    href={url}
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

    <Spring
      delay={500}
      from={{ opacity: 0, transform: 'translate(0, -1rem)' }}
      to={{ opacity: 1, transform: 'translate(0, 0)' }}
    >
      {

        ({ opacity, transform }) =>
          <nav
            className="Navigation"
            style={{ opacity, transform }}
            css={{
              position: 'fixed',
              top: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              padding: '2rem 1rem',
              background: 'var(--theme-dd)',
              zIndex: 100
            }}>
            {
              links.map(link => anchorLink(link))
            }
          </nav >
      }
    </Spring >

  );
}

export default Navigation;
