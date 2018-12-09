/** @jsx jsx */
import { jsx } from '@emotion/core'


const Hero = () => {
  return (
    <div
      id="hero"
      className="Hero"
      css={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
      <h1
        css={{
          textTransform: 'uppercase',
          wordSpacing: '0.2rem',
          letterSpacing: '0.25rem',
          fontSize: 'calc(2rem + 1vw)',
          textAlign: 'center'
        }}>
        Giant Bold Heading
        </h1>

      <button
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
          transition: 'all 0.2s ease-out',
          transitionDelay: '0.1s',
          position: 'relative',
          '&:hover': {
            color: 'var(--theme-dd)',
            background: 'var(--theme-l)',
            borderColor: 'var(--theme-l)'
          },
          '&::after': {
            content: 'hello',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'var(--theme-l)'
          }
        }}>
        Neat button
      </button>
    </div>
  );
}

export default Hero;
