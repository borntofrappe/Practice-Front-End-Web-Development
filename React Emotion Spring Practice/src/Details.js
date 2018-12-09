/** @jsx jsx */
import { jsx } from '@emotion/core'
import SVGIcons from './SVGIcons';

const Details = ({ icons }) => {
  return (
    <div
      id="details"
      className="Details"
      css={{
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: 'var(--theme-d)'
      }}>
      <h2
        css={{
          fontWeight: 500,
          textTransform: 'capitalize',
          fontSize: 'calc(2rem + 1vw)'
        }}>
        A few icons
      </h2>
      <p
        css={{
          margin: '1rem 0',
          fontSize: '1.1rem',
          borderBottom: '1px dashed var(--text)',
          padding: '0.25rem 0'
        }}>
        Try hovering on them
      </p>
      <div
        className="Icons"
        css={{
          margin: '2rem 0 0',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
        {
          icons.map(icon =>
            <div
              css={{
                margin: '2rem',
                padding: '1rem',
                background: 'var(--accent)',
                width: '150px',
                height: '150px',
                'svg': {
                  width: '100%',
                  height: '100%'
                }
              }}>
              <SVGIcons icon={icon} />
            </div>
          )
        }
      </div>


    </div>
  );
}

export default Details;
