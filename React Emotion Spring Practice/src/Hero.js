/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Spring } from 'react-spring';

// show the strings for the heading each in a span (animated in sequence)
// below the heading detail a button and in between a connecting svg element
const Hero = ({ hero }) => {
  return (
    <div
      className="Hero"
      css={{
        minHeight: '110vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        // escape the single quotes ' in the svg background
        background: 'linear-gradient(to right, transparent, var(--theme-dt) 30%, var(--theme-dt) 70%, transparent), url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 26.458 26.458"><g opacity="0.1" fill="none" stroke="%23fff" strokeWidth="1.093" stroke-linecap="round"><path d="M68.52 219.894v8.293M72.656 224.04h-8.273" transform="matrix(.42448 0 0 .42071 -25.772 -90.943)"/></g></svg>\'), var(--theme-d)',
        backgroundSize: '100%, 50px, 100%'
      }}>

      <h1
        css={{
          textTransform: 'uppercase',
          letterSpacing: '0.2rem',
          fontSize: 'calc(2rem + 1vw)',
          textAlign: 'center'
        }}>
        {
          hero.map((span, index) =>
            // detail the key in the wrapping spring component
            <Spring
              key={span}
              delay={1400 + index * 200}
              from={{ opacity: 0, transform: 'translate(0, 1.5rem)' }}
              to={{ opacity: 1, transform: 'translate(0, 0)' }}
            >
              {
                ({ opacity, transform }) =>
                  <span
                    style={{ opacity, transform }}
                    css={{
                      margin: '0 0.5rem',
                      display: 'inline-block'
                    }}
                  >
                    {span}
                  </span>
              }
            </Spring>
          )
        }
      </h1>

      {/* delay progressively mounting up */}
      <Spring
        delay={1800}
        from={{ opacity: 0, transform: 'translate(0, -1rem)' }}
        to={{ opacity: 1, transform: 'translate(0, 0)' }}
      >

        {
          ({ opacity, transform }) =>
            <button
              style={{ opacity, transform }}
              css={{
                marginTop: '3.5rem',
                border: '1px solid var(--text)',
                background: 'var(--theme-d)',
                padding: '0.7rem 1.7rem',
                color: 'inherit',
                fontFamily: 'inherit',
                letterSpacing: '0.15rem',
                textTransform: 'uppercase',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease-out',
                transitionDelay: '0.1s',
                position: 'relative',
                '&:hover': {
                  color: 'var(--theme-dd)',
                  background: 'var(--theme-l)',
                  borderColor: 'var(--theme-l)'
                }
              }}>
              Simple button
            </button>
        }
      </Spring>

      {/* line connecting the button with the underlying element */}
      <Spring
        config={{ mass: 1, tension: 200, velocity: 40, friction: 15 }}
        delay={2800}
        from={{ strokeDasharray: 50, strokeDashoffset: 50 }}
        to={{ strokeDasharray: 50, strokeDashoffset: 0 }}
      >
        {
          ({ strokeDasharray, strokeDashoffset }) =>

            <svg
              style={{ strokeDasharray, strokeDashoffset }}
              viewBox="0 0 2 50"
              height="50px"
              css={{
                margin: '-0.5rem 0'
              }}
            >
              <path d="M 1 0 v 50" stroke="#fff" strokeWidth="1" />
            </svg>
        }
      </Spring>

      {/* paragraph 'banner' animated with higher velocity */}
      <Spring
        config={{ mass: 1, tension: 170, velocity: 40 }}
        delay={3000}
        from={{ opacity: 0, transform: 'translate(0, -3rem) rotateZ(8deg)' }}
        to={{ opacity: 1, transform: 'translate(0, 0) rotateZ(-4deg)' }}
      >
        {
          ({ opacity, transform }) =>
            <p
              style={{ opacity, transform }}
              css={{
                textTransform: 'capitalize',
                padding: '0.5rem 1rem',
                background: 'var(--theme-l)',
                color: 'var(--theme-d)',
                fontSize: '1.1rem',
                fontStyle: 'italic',
                fontWeight: 300
              }}
            >
              Scroll for more
          </p>
        }
      </Spring>
    </div>
  );
}

export default Hero;
