/** @jsx jsx */
// import jsx for styling (with emotion), spring for animation
import { jsx } from '@emotion/core'
import { Spring } from 'react-spring';

// show the anchor link elements transitioning the navigation first and the anchor link later
const Navigation = ({ links }) => {
  return (
    <Spring
      delay={250}
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
    >
      {

        ({ opacity }) =>
          <nav
            className="Navigation"
            style={{ opacity }}
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
              links.map((link, index) =>
                <Spring
                  key={link.name}
                  delay={350 + 200 * index}
                  from={{ opacity: 0, transform: 'translateY(-2rem)' }}
                  to={{ opacity: 1, transform: 'translateY(0)' }}
                >
                  {
                    ({ opacity, transform }) =>
                      <a
                        href={link.url}
                        style={{ opacity, transform }}
                        css={{
                          color: 'inherit',
                          textTransform: 'uppercase',
                          letterSpacing: '0.2rem',
                          textDecoration: 'none',
                          transition: 'color 0.2s ease-out',
                          '&:hover': {
                            color: 'var(--theme-l)'
                          }
                        }}
                      >
                        {link.name}
                      </a>
                  }

                </Spring>
              )
            }
          </nav>
      }
    </Spring>

  );
}

export default Navigation;
