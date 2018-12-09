/** @jsx jsx */
import { jsx } from '@emotion/core'
import SVGIcons from './SVGIcons';
import { Spring } from 'react-spring';

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
      <Spring
        delay={850}
        from={{ opacity: 0, transform: 'translate(0, -0.5rem)' }}
        to={{ opacity: 1, transform: 'translate(0, 0)' }}
      >
        {
          ({ opacity, transform }) =>
            <h2
              style={{ opacity, transform }}
              css={{
                fontWeight: 500,
                textTransform: 'capitalize',
                fontSize: 'calc(2rem + 1vw)'
              }}>
              A few icons
            </h2>
        }
      </Spring>

      <Spring
        delay={950}
        from={{ opacity: 0, transform: 'translate(0, -0.5rem)' }}
        to={{ opacity: 1, transform: 'translate(0, 0)' }}
      >
        {
          ({ opacity, transform }) =>
            <p
              style={{ opacity, transform }}
              css={{
                margin: '1rem 0',
                fontSize: '1.1rem',
                borderBottom: '1px dashed var(--text)',
                padding: '0.25rem 0'
              }}>
              Try hovering on them
            </p>
        }
      </Spring>


      <div
        className="Icons"
        css={{
          margin: '2rem 0 0',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
        {
          icons.map((icon, index) =>
            <Spring
              delay={1500}
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
            >
              {
                ({ opacity }) =>
                  <div
                    key={index}
                    style={{ opacity }}
                    css={{
                      margin: '2rem',
                      padding: '1rem',
                      background: 'var(--accent)',
                      width: '150px',
                      height: '150px',
                      transition: 'all 0.25s ease-out',
                      '&:hover': {
                        transform: 'perspective(500px) rotateX(15deg) rotateY(20deg) rotateZ(-15deg)',
                        filter: 'drop-shadow(0 1px 5px var(--theme-l))'
                      },
                      '&:nth-of-type(even):hover': {
                        transform: 'perspective(500px) rotateX(15deg) rotateY(-20deg) rotateZ(15deg)'
                      },
                      'svg': {
                        width: '100%',
                        height: '100%'
                      }
                    }}>
                    <SVGIcons icon={icon} />
                  </div>
              }


            </Spring>

          )
        }
      </div>


    </div>
  );
}

export default Details;
