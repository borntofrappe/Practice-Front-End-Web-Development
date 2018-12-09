/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Spring } from 'react-spring';

const Hero = () => {
  return (
    <div
      id="hero"
      className="Hero"
      css={{
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: 'linear-gradient(to right, transparent, var(--theme-dt) 30%, var(--theme-dt) 70%, transparent)'
      }}>

      <Spring
        delay={700}
        from={{ opacity: 0, transform: 'translate(0, -1rem)' }}
        to={{ opacity: 1, transform: 'translate(0, 0)' }}
      >
        {
          ({ opacity, transform }) =>
            <h1
              style={{ opacity, transform }}
              css={{
                textTransform: 'uppercase',
                wordSpacing: '0.2rem',
                letterSpacing: '0.25rem',
                fontSize: 'calc(2rem + 1vw)',
                textAlign: 'center'
              }}>
              Giant Bold Heading
        </h1>
        }

      </Spring>


      <Spring
        delay={700}
        from={{ opacity: 0, transform: 'translate(0, -1rem)' }}
        to={{ opacity: 1, transform: 'translate(0, 0)' }}
      >

        {
          ({ opacity, transform }) =>
            <button
              style={{ opacity, transform }}
              css={{
                marginTop: '2rem',
                border: '1px solid var(--text)',
                background: 'none',
                padding: '0.7rem 1.7rem',
                color: 'inherit',
                fontFamily: 'inherit',
                letterSpacing: '0.15rem',
                textTransform: 'uppercase',
                fontSize: '0.9rem',
                transition: 's 0.2s ease-out',
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


    </div>
  );
}

export default Hero;
