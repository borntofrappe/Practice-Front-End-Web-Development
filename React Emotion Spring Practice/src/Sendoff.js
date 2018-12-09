/** @jsx jsx */
import { jsx } from '@emotion/core'
import SVGIcons from './SVGIcons';

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
        background: 'var(--theme-dd)'
      }}>
      <h2
        css={{
          fontWeight: 500,
          textTransform: 'capitalize',
          fontSize: 'calc(2rem + 1vw)'
        }}>
        A final animation
      </h2>

      <div
        css={{
          margin: '10vh 1rem',
          width: '180px',
          height: '180px',
          'svg': {
            width: '100%',
            height: '100%'
          }
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.458 26.458"><g fill="#49e8df" fill-opacity=".941"><path d="M21.583 8.933a8.354 8.14 0 0 1-8.354 8.14 8.354 8.14 0 0 1-8.354-8.14A8.354 8.14 0 0 1 13.23.793a8.354 8.14 0 0 1 8.354 8.14z" paint-order="stroke fill markers" /><path d="M4.869 6.737h1.049c.355 0 .641.261.641.585v5.806c0 .325-.286.586-.641.586h-1.05c-.354 0-.64-.261-.64-.586V7.322c0-.324.286-.585.64-.585zM20.54 6.737h1.05c.355 0 .64.261.64.585v5.806c0 .325-.285.586-.64.586h-1.05c-.355 0-.64-.261-.64-.586V7.322c0-.324.285-.585.64-.585z" paint-order="stroke fill markers" /></g><path d="M8.599 7.125c-.626 0-1.13.502-1.13 1.126v1.843c0 .117.018.23.051.336a2.64 2.64 0 0 0-.05.506c0 2.112 2.517 3.811 5.645 3.811h.228c3.128 0 5.646-1.7 5.646-3.811 0-.172-.019-.34-.05-.506a1.13 1.13 0 0 0 .05-.336V8.251c0-.624-.504-1.126-1.13-1.126h-4.744z" fill="#040926" paint-order="stroke fill markers" /><path d="M7.034 15.798c-1.841.933-3.065 2.616-3.065 4.545 0 .351.042.695.12 1.027-.077.059-.12.124-.12.194v2.995c0 1.117 1.34 1.106 2.051 1.106H20.44c.71 0 2.05-.003 2.05-1.106v-2.995c0-.07-.043-.135-.119-.194.078-.332.12-.676.12-1.027 0-1.93-1.225-3.612-3.066-4.545-1.58 1.439-3.832 2.261-6.195 2.264-2.363-.003-4.614-.826-6.195-2.264z" fill="#49e8df" fill-opacity=".941" paint-order="stroke fill markers" /><path d="M10.463 20.823c-.434 0-.783.251-.783.564V25.665h1.272v-2.226c0-.286.199-.515.446-.515.248 0 .447.23.447.515v2.226H16.778V21.387c0-.313-.349-.564-.782-.564zm4.98.837a.343.343 0 0 1 .344.342.343.343 0 0 1-.343.343.343.343 0 0 1-.343-.343.343.343 0 0 1 .343-.342z" fill="#040926" paint-order="stroke fill markers" /><path d="M10.037 8.66s.186.957.512 1.282c.326.326 1.286.511 1.286.511s-.96.185-1.286.51c-.326.326-.512 1.284-.512 1.284s-.185-.958-.512-1.283c-.326-.326-1.286-.511-1.286-.511s.96-.185 1.286-.51c.327-.326.512-1.284.512-1.284z" fill="#49e8df" paint-order="stroke fill markers" /></svg>
      </div>
    </div>
  );
}

export default Sendoff;
