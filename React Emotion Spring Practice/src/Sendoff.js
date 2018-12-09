/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Spring } from 'react-spring';

const Sendoff = () => {
  return (
    <div
      id="sendoff"
      className="Sendoff"
      css={{
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 26.458 26.458"><g fill="%23fff" opacity="0.5" transform="matrix(.4846 0 0 .4834 -28.193 -104.296)"><ellipse cx="67.83" cy="234.49" rx="1.25" ry="1.25" paint-order="stroke fill markers"/><ellipse ry="1" rx="1" cy="223.944" cx="100.936" paint-order="stroke fill markers"/><ellipse cx="109.14" cy="247.262" rx="0.9" ry="0.9" paint-order="stroke fill markers"/><ellipse ry="2.5" rx="2.5" cy="260.42" cx="97.365" paint-order="stroke fill markers"/><ellipse cx="67.637" cy="265.839" rx="1.8" ry="1.8" paint-order="stroke fill markers"/><ellipse ry="2.1" rx="2.1" cy="219.977" cx="85.396" paint-order="stroke fill markers"/><ellipse ry="1.161" rx="1.158" cy="250.358" cx="75.745" paint-order="stroke fill markers"/></g></svg>\'), var(--theme-dd)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '400px',
        backgroundPosition: '50%'
      }}>
      <Spring
        delay={1000}
        from={{ opacity: 0, transform: 'translate(0, -0.5rem)' }}
        to={{ opacity: 1, transform: 'translate(0, 0)' }}
      >
        {
          ({ opacity, transform }) =>
            <h2
              style={{ opacity, transform }}
              css={{
                fontWeight: 900,
                textTransform: 'uppercase',
                fontSize: 'calc(2rem + 1vw)'
              }}>
              Blasting off
          </h2>

        }
      </Spring>

      <div
        css={{
          margin: '10vh 1rem',
          width: '180px',
          height: '180px',
          transition: 'filter 0.2s ease-out',
          '&:hover': {
            filter: 'drop-shadow(0 1px 5px var(--text-t))'
          },
          'svg': {
            width: '100%',
            height: '100%'
          }

        }}>

        <Spring
          delay={1200}
          from={{ opacity: 0, transform: 'translate(0, 10rem)' }}
          to={{ opacity: 1, transform: 'translate(0, 0)' }}
        >

          {
            ({ opacity, transform }) =>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ opacity, transform }} viewBox="0 0 26.458 26.458"><g fill="#49e8df" fillOpacity=".941"><path d="M21.583 8.933a8.354 8.14 0 0 1-8.354 8.14 8.354 8.14 0 0 1-8.354-8.14A8.354 8.14 0 0 1 13.23.793a8.354 8.14 0 0 1 8.354 8.14z" paintOrder="stroke fill markers" /><path d="M4.869 6.737h1.049c.355 0 .641.261.641.585v5.806c0 .325-.286.586-.641.586h-1.05c-.354 0-.64-.261-.64-.586V7.322c0-.324.286-.585.64-.585zM20.54 6.737h1.05c.355 0 .64.261.64.585v5.806c0 .325-.285.586-.64.586h-1.05c-.355 0-.64-.261-.64-.586V7.322c0-.324.285-.585.64-.585z" paintOrder="stroke fill markers" /></g><path d="M8.599 7.125c-.626 0-1.13.502-1.13 1.126v1.843c0 .117.018.23.051.336a2.64 2.64 0 0 0-.05.506c0 2.112 2.517 3.811 5.645 3.811h.228c3.128 0 5.646-1.7 5.646-3.811 0-.172-.019-.34-.05-.506a1.13 1.13 0 0 0 .05-.336V8.251c0-.624-.504-1.126-1.13-1.126h-4.744z" fill="#040926" paintOrder="stroke fill markers" /><path d="M7.034 15.798c-1.841.933-3.065 2.616-3.065 4.545 0 .351.042.695.12 1.027-.077.059-.12.124-.12.194v2.995c0 1.117 1.34 1.106 2.051 1.106H20.44c.71 0 2.05-.003 2.05-1.106v-2.995c0-.07-.043-.135-.119-.194.078-.332.12-.676.12-1.027 0-1.93-1.225-3.612-3.066-4.545-1.58 1.439-3.832 2.261-6.195 2.264-2.363-.003-4.614-.826-6.195-2.264z" fill="#49e8df" fillOpacity=".941" paintOrder="stroke fill markers" /><path d="M10.463 20.823c-.434 0-.783.251-.783.564V25.665h1.272v-2.226c0-.286.199-.515.446-.515.248 0 .447.23.447.515v2.226H16.778V21.387c0-.313-.349-.564-.782-.564zm4.98.837a.343.343 0 0 1 .344.342.343.343 0 0 1-.343.343.343.343 0 0 1-.343-.343.343.343 0 0 1 .343-.342z" fill="#040926" paintOrder="stroke fill markers" /><path d="M10.037 8.66s.186.957.512 1.282c.326.326 1.286.511 1.286.511s-.96.185-1.286.51c-.326.326-.512 1.284-.512 1.284s-.185-.958-.512-1.283c-.326-.326-1.286-.511-1.286-.511s.96-.185 1.286-.51c.327-.326.512-1.284.512-1.284z" fill="#49e8df" paintOrder="stroke fill markers" /></svg>
          }
        </Spring>
      </div>
    </div>
  );
}

export default Sendoff;
