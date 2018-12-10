/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Spring } from 'react-spring';

const Hero = ({ hero }) => {
  return (
    <div
      id="hero"
      className="Hero"
      css={{
        minHeight: '110vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: 'linear-gradient(to right, transparent, var(--theme-dt) 30%, var(--theme-dt) 70%, transparent)'
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
            <Spring
              delay={1000 + index * 200}
              from={{ opacity: 0, transform: 'translate(0, 1.5rem)' }}
              to={{ opacity: 1, transform: 'translate(0, 0)' }}
            >
              {
                ({ opacity, transform }) =>
                  <span
                    key={span}
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



      <Spring
        delay={1200}
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

      <Spring
        config={{ mass: 1, tension: 200, velocity: 40, friction: 15 }}
        delay={2500}
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
              <path d="M 1 0 v 50" stroke="#fff" stroke-width="1" />
            </svg>
        }
      </Spring>

      <Spring
        config={{ mass: 1, tension: 170, velocity: 40 }}
        delay={2600}
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
