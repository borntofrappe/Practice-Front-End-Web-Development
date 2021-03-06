// object describing the path elements making up the glyphs
const glyphs = {
  a: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
   <g transform="matrix(.97986 0 0 .96475 .01511 3.6251)" stroke="#000" stroke-width="1px">
    <path d="m49.526 284.95-48.672 83.715h27.865l7.9219-13.627h32.471l-4.1797-15.488h-19.285l13.32-22.912c10.706 16.491 25.938 33.189 14.414 53.418h24.006l-22.949-85.047z"/>
    <path d="m53.526 286.95-48.672 83.715h27.865l7.9219-13.627h32.471l-4.1797-15.488h-19.285l13.32-22.912c10.706 16.491 25.938 33.189 14.414 53.418h24.006l-22.949-85.047z" fill="currentColor"/>
   </g>
  </g>
 </svg>`,
  b: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
    <g stroke="#000" stroke-width=".96533">
    <path d="m18.13 360.36 22.182-81.837h37.615c-6.0183 16.2 2.8021 38.375-40.554 39.537 16.532 9.9181 39.745 15.874 27.98 42.576z"/>
    <path d="m22.014 362.28 22.182-81.837h37.615c-6.0183 16.2 2.8021 38.375-40.554 39.537 16.532 9.9181 39.745 15.874 27.98 42.576z" fill="currentColor"/>
    </g>
  </g>
  </svg>`,
  c: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
   <g transform="matrix(.92457 0 0 .95765 -110.16 16.488)" stroke="#000" stroke-width="1px">
    <path d="m179.8 273.62h-26.214l-22.979 85.759h50.622l2.907-25.777s-21.561 7.1534-27.05 0c-7.778-10.136-0.21588-29.246 9.9206-37.024 7.2368-5.553 27.365 0 27.365 0l17.114-22.713z"/>
    <path d="m183.8 275.62h-26.214l-22.979 85.759h50.622l2.907-25.777s-21.561 7.1534-27.05 0c-7.778-10.136-0.21588-29.246 9.9206-37.024 7.2368-5.553 27.365 0 27.365 0l17.114-22.713z" fill="currentColor"/>
   </g>
  </g>
 </svg>`,
  d: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
 <g transform="translate(0 -270.54)">
  <g transform="matrix(.8833 0 0 .91741 -91.407 38.069)" stroke="#000" stroke-width="1px">
   <path d="m126.77 350.77 23.766-88.698h36.52c-6.0868 29.338 23.921 57.793-33.758 89.647z"/>
   <path d="m130.77 352.77 23.766-88.698h36.52c-6.0868 29.338 23.921 57.793-33.758 89.647z" fill="currentColor"/>
  </g>
 </g>
</svg>`,
  e: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(0 -270.54)">
 <g transform="matrix(.91478 0 0 .90436 -65.557 43.913)" stroke="#000" stroke-width="1px">
  <path d="m90.77 326.91 18.092-67.519h53.248l-19.277 19.277s-17.779-4.9047-24.171 0c-5.1641 3.9625-9.0166 13.698-5.0541 18.862 2.9848 3.8898 22.219 0 22.219 0l-9.8558 17.071s-12.885-1.4831-14.818 0c-3.4648 2.6587-6.0497 9.1908-3.3911 12.656 6.2392 8.1311 30.747 0 30.747 0l-13.35 23.123h-39.216z"/>
  <path d="m94.77 328.91 18.092-67.519h53.248l-19.277 19.277s-17.779-4.9047-24.171 0c-5.1641 3.9625-9.0166 13.698-5.0541 18.862 2.9848 3.8898 22.219 0 22.219 0l-9.8558 17.071s-12.885-1.4831-14.818 0c-3.4648 2.6587-6.0497 9.1908-3.3911 12.656 6.2392 8.1311 30.747 0 30.747 0l-13.35 23.123h-39.216z" fill="currentColor"/>
 </g>
</g>
</svg>`,
  f: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(0 -270.54)">
 <g transform="matrix(.85724 0 0 .86416 -59.521 79.779)" stroke="#000" stroke-width="1px">
  <path d="m102.27 286.5 15.16-56.577h43.59l-6.6758 24.914s-18.358-5.0646-24.958 0c-5.1197 3.9285-8.9392 13.58-5.0107 18.7 3.7679 4.9104 18.568 0 18.568 0l-6.0895 22.726s-15.465-4.2665-21.026 0c-7.9451 6.0965-7.7759 29.02-7.7759 29.02h-17.531z"/>
  <path d="m106.27 288.5 15.16-56.577h43.59l-6.6758 24.914s-18.358-5.0646-24.958 0c-5.1197 3.9285-8.9392 13.58-5.0107 18.7 3.7679 4.9104 18.568 0 18.568 0l-6.0895 22.726s-15.465-4.2665-21.026 0c-7.9451 6.0965-7.7759 29.02-7.7759 29.02h-17.531z" fill="currentColor"/>
 </g>
</g>
</svg>`,
  g: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(0 -270.54)">
 <g transform="matrix(.79309 0 0 .85608 -58.191 35.595)" stroke="#000" stroke-width="1px">
  <path d="m109.28 283.71-25.8 96.287h59.196l9.7314-32.318s-18.957-5.088-25.955 0c-5.4129 3.9359-0.7767 15.164-6.1896 19.1-3.778 2.7471-11.17 3.7059-14.013 0-10.081-13.137 0.71612-36.725 12.858-47.985 7.9073-7.3335 24.123-15.994 31.792-6 5.4134 7.0548-6.9046 25.768-6.9046 25.768h19.108l22.16-54.311z"/>
  <path d="m113.28 285.71-25.8 96.287h59.196l9.7314-32.318s-18.957-5.088-25.955 0c-5.4129 3.9359-0.7767 15.164-6.1896 19.1-3.778 2.7471-11.17 3.7059-14.013 0-10.081-13.137 0.71612-36.725 12.858-47.985 7.9073-7.3335 24.123-15.994 31.792-6 5.4134 7.0548-6.9046 25.768-6.9046 25.768h19.108l22.16-54.311z" fill="currentColor"/>
 </g>
</g>
</svg>`,
  h: `
<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
 <g transform="translate(0 -270.54)">
  <g transform="matrix(.59446 0 0 .58195 -42.194 126.84)" stroke="#000" stroke-width="1px">
   <path d="m102.68 369.57 29.274-109.25h28.726s-31.536 47.909-17.677 65.971c4.4566 5.808 16.155 4.4567 21.963 0 17.949-13.773 17.567-65.56 17.567-65.56h31.005l-37.338 139.35h-21.233s22.664-34.431 12.704-47.412c-4.3172-5.6263-15.649-4.3172-21.275 0-13.884 10.654-13.589 50.713-13.589 50.713h-40.126z"/>
   <path d="m106.68 371.57 29.274-109.25h28.726s-31.536 47.909-17.677 65.971c4.4566 5.808 16.155 4.4567 21.963 0 17.949-13.773 17.567-65.56 17.567-65.56h31.005l-37.338 139.35h-21.233s22.664-34.431 12.704-47.412c-4.3172-5.6263-15.649-4.3172-21.275 0-13.884 10.654-13.589 50.713-13.589 50.713h-40.126z" fill="currentColor"/>
  </g>
 </g>
</svg>`,
  i: `
  <svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
 <g transform="translate(0 -270.54)">
  <g transform="matrix(.59307 0 0 .57994 -40.987 131.38)" stroke="#000" stroke-width="1px">
   <path d="m111.91 395.19 37.992-141.79h40.579c-42.402 47.843-49.248 95.685-38.458 143.53z"/>
   <path d="m115.91 397.19 37.992-141.79h40.579c-42.402 47.843-49.248 95.685-38.458 143.53z" fill="currentColor"/>
  </g>
 </g>
</svg>`,
  j: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
   <g transform="matrix(.40467 0 0 .45079 8.0396 153.02)" stroke="#000" stroke-width="1px">
    <path d="m90.993 277.83h112.86l-107.13 185.56h-97.153l49.905-80.438h32.952s-40.421 35.006-30.316 52.509c3.2431 5.6172 13.884 3.3162 19.459 0 32.907-19.576 74.393-68.038 54.817-100.95-11.63-19.55-68.245 0-68.245 0z"/>
    <path d="m94.993 279.83h112.86l-107.13 185.56h-97.153l49.905-80.438h32.952s-40.421 35.006-30.316 52.509c3.2431 5.6172 13.884 3.3162 19.459 0 32.907-19.576 74.393-68.038 54.817-100.95-11.63-19.55-68.245 0-68.245 0z" fill="currentColor"/>
   </g>
  </g>
 </svg>
 `,
  k: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
   <g transform="matrix(.33422 0 0 .34677 -33.87 136.31)" stroke="#000" stroke-width="1px">
    <path d="m132.48 609.38 53.63-200.15h57.487s-66.26 96.729-31.323 116.9c39.712 22.928 97.275-97.275 97.275-97.275h63.348l-120.57 120.57 27.312 101.93h-50.186s6.581-85.31-22.859-85.31c-27.955 2e-5 -21.706 81.007-21.706 81.007h-60.492z"/>
    <path d="m136.48 611.38 53.63-200.15h57.487s-66.26 96.729-31.323 116.9c39.712 22.928 97.275-97.275 97.275-97.275h63.348l-120.57 120.57 27.312 101.93h-50.186s6.581-85.31-22.859-85.31c-27.955 2e-5 -21.706 81.007-21.706 81.007h-60.492z" fill="currentColor"/>
   </g>
  </g>
 </svg>
 `,
  l: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
   <g transform="matrix(.33872 0 0 .34766 2.9844 196.6)" stroke="#000" stroke-width="1px">
    <path d="m108.21 234.76-64.706 241.48h167.74l18.714-55.306s-83.871 27.705-105.57 0c-39.173-50.021 45.688-185.05 45.688-185.05z"/>
    <path d="m112.21 236.76-64.706 241.48h167.74l18.714-55.306s-83.871 27.705-105.57 0c-39.173-50.021 45.688-185.05 45.688-185.05z" fill="currentColor"/>
   </g>
  </g>
 </svg>
 `,
  m: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
   <g transform="matrix(.23743 0 0 .27399 22.045 245.82)" stroke="#000" stroke-width="1px">
    <path d="m-54.976 364.49 66.022-246.4h95.602v125.18l114.15-114.15h81.822l-77.225 288.21h-110.66s77.18-112.73 36.391-135.81c-24.074-13.624-57.66 59.681-57.66 59.681s3.7512-92.458-28.284-91.867c-60.72 1.1196-47.154 175.98-47.154 175.98h-89.16z"/>
    <path d="m-50.976 366.49 66.022-246.4h95.602v125.18l114.15-114.15h81.822l-77.225 288.21h-110.66s77.18-112.73 36.391-135.81c-24.074-13.624-57.66 59.681-57.66 59.681s3.7512-92.458-28.284-91.867c-60.72 1.1196-47.154 175.98-47.154 175.98h-89.16z" fill="currentColor"/>
   </g>
  </g>
 </svg>`,
  n: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
   <g transform="matrix(.2637 0 0 .27465 24.815 224.35)" stroke="#000" stroke-width="1px">
    <path d="m-74.5 495.17 75.079-295.94h82.064s-14.072 182.41 48.877 182.41c64.065-1e-5 49.744-185.65 49.744-185.65h80.236l-82.123 306.49h-102.45s12.603-163.37-43.774-163.37c-54.003 1e-5 -41.931 156.49-41.931 156.49z"/>
    <path d="m-70.5 497.17 75.079-295.94h82.064s-14.072 182.41 48.877 182.41c64.065-1e-5 49.744-185.65 49.744-185.65h80.236l-82.123 306.49h-102.45s12.603-163.37-43.774-163.37c-54.003 1e-5 -41.931 156.49-41.931 156.49z" fill="currentColor"/>
   </g>
  </g>
 </svg>
 `,
  o: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)" stroke="#000" stroke-width="1px">
   <path d="m34.233 278.16c-27.403 22.692-39.809 48.961-17.853 83.425l49.653 0.78062c50.571-43 16.891-62.585 18.02-84.206zm6.4841 17.809h28.747c-0.65129 12.476 18.783 23.777-10.397 48.588l-28.651-0.45029c-12.669-19.886-5.5106-35.044 10.301-48.138z"/>
   <path d="m35.108 278.71c-27.403 22.692-39.809 48.961-17.853 83.425l49.653 0.78063c50.571-43 16.891-62.585 18.02-84.206zm6.4841 17.809h28.747c-0.6513 12.476 18.783 23.777-10.398 48.588l-28.651-0.45028c-12.669-19.886-5.5106-35.044 10.301-48.138z" fill="currentColor"/>
  </g>
 </svg>
 `,
  p: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
   <g transform="matrix(.25271 0 0 .26471 21.474 245.29)" stroke="#000" stroke-width="1px">
    <path d="m-44.766 434.79 83.216-310.57h228.21s1.0048 136.13-46.176 172.33c-35.39 27.156-98.434-27.156-133.82 0-39.9 30.616-39.05 145.74-39.05 145.74z"/>
    <path d="m-40.766 436.79 83.216-310.57h228.21s1.0048 136.13-46.176 172.33c-35.39 27.156-98.434-27.156-133.82 0-39.9 30.616-39.05 145.74-39.05 145.74z" fill="currentColor"/>
   </g>
  </g>
 </svg>
 `,
  q: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
   <g transform="matrix(.219 0 0 .27391 193.56 213.23)" stroke="#000" stroke-width="1px">
    <path d="m-727.54 237.12c-125.17 82.779-181.83 178.61-81.545 304.33l226.8 2.8476c3.6858-2.5028 7.2717-4.9836 10.764-7.4433 7.9692 5.0383 13.549 7.5859 13.549 7.5859h85.98l-30.23-65.555c108.16-113.15-2.1325-174.78 2.246-241.76zm29.617 64.965h131.31c-1.8432 28.198 31.514 54.754 25.473 92.402l-0.998-2.166s-63.005-16.328-76.682 15.551c-12.077 28.15-10.895 51.925-3.5019 71.354l-122.65-1.539c-57.868-72.544-25.17-127.84 47.053-175.6z"/>
    <path d="m-723.54 239.12c-125.17 82.779-181.83 178.61-81.545 304.33l226.8 2.8476c3.6858-2.5028 7.2717-4.9836 10.764-7.4433 7.9692 5.0383 13.549 7.5859 13.549 7.5859h85.98l-30.23-65.555c108.16-113.15-2.1325-174.78 2.246-241.76zm29.617 64.965h131.31c-1.8432 28.198 31.514 54.754 25.473 92.402l-0.998-2.166s-63.005-16.328-76.682 15.551c-12.077 28.15-10.895 51.925-3.5019 71.354l-122.65-1.539c-57.868-72.544-25.17-127.84 47.053-175.6z" fill="currentColor"/>
   </g>
  </g>
 </svg>
 `,
  r: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
   <g transform="matrix(.2466 0 0 .24138 -24.287 271.52)" stroke="#000" stroke-width="1px">
    <path d="m149.84 348.48 86.001-320.96h223.11s1.0086 136.63-46.347 172.97c-39.034 29.952-128.77-45.456-147.6 0-28.656 69.182 158.85 158.85 158.85 158.85h-142.69s-34.868-71.828-64.017-64.017c-27.111 7.2644-21.793 81.333-21.793 81.333h-55.611z"/>
    <path d="m153.84 350.48 86.001-320.96h223.11s1.0086 136.63-46.347 172.97c-39.034 29.952-128.77-45.456-147.6 0-28.656 69.182 158.85 158.85 158.85 158.85h-142.69s-34.868-71.828-64.017-64.017c-27.111 7.2644-21.793 81.333-21.793 81.333h-55.611z" fill="currentColor"/>
   </g>
  </g>
 </svg>
 `,
  s: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
   <g transform="matrix(.24637 0 0 .23044 -18.397 265.14)" stroke="#000">
    <path d="m369.61 56.572-184.08 365.7s380.6-31.618 89.637-178.08c-290.97-146.46 94.439-187.62 94.439-187.62z"/>
    <path d="m373.61 58.572-184.08 365.7s380.6-31.618 89.637-178.08c-290.97-146.46 94.439-187.62 94.439-187.62z" fill="currentColor"/>
   </g>
  </g>
 </svg>
 `,
  t: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)" stroke="#000" stroke-width="1px">
   <path d="m18.706 361.99s27.372-42.467 15.343-58.476c-5.3537-7.1252-26.383 0-26.383 0l6.6519-25.352h77.123l-7.1447 27.231s-19.584-5.5175-26.625 0c-15.301 11.99-14.975 57.073-14.975 57.073z"/>
   <path d="m19.615 362.45s27.372-42.467 15.343-58.476c-5.3537-7.1252-26.383 0-26.383 0l6.6519-25.352h77.123l-7.1447 27.231s-19.584-5.5175-26.625 0c-15.301 11.99-14.975 57.073-14.975 57.073z" fill="currentColor"/>
  </g>
 </svg>
 `,
  u: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
   <g transform="matrix(.20417 0 0 .21367 38.579 252.51)" stroke="#000" stroke-width="1px">
    <path d="m-49.197 132.72-102.38 382.07h305.23l105.79-394.81h-108.64s1.6417 222.41-75.443 281.56c-26.895 20.637-81.063 26.895-101.7 0-57.492-74.926 73.33-273.67 73.33-273.67z"/>
    <path d="m-45.197 134.72-102.38 382.07h305.23l105.79-394.81h-108.64s1.6417 222.41-75.443 281.56c-26.895 20.637-81.063 26.895-101.7 0-57.492-74.926 73.33-273.67 73.33-273.67z" fill="currentColor"/>
   </g>
  </g>
 </svg>
 `,
  v: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
   <g transform="matrix(.1911 0 0 .21785 35.24 251.7)" stroke="#000" stroke-width="1px">
    <path d="m-157.58 141.73 98.305 366.88h147.41l219.67-380.47h-148.24s-52.499 281.68-154.85 268.2c-94.032-12.38-73.642-274.84-73.642-274.84z"/>
    <path d="m-153.58 143.73 98.305 366.88h147.41l219.67-380.47h-148.24s-52.499 281.68-154.85 268.2c-94.032-12.38-73.642-274.84-73.642-274.84z" fill="currentColor"/>
   </g>
  </g>
 </svg>
 `,
  w: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
   <g transform="matrix(.084571 0 0 .11462 56.946 291.01)" stroke="#000" stroke-width="1px">
    <path d="m-579.16 88.455 144.03 537.54h190.82s51.773-269.02 155.32-269.02c98.393 0 147.59 255.63 147.59 255.63h192.23l194.36-725.36h-278.08s35.613 458.4-128.62 480.02c-95.437 12.564-144.39-250.09-144.39-250.09s-47.523 254.98-140.17 242.78c-130.82-17.223-102.45-382.37-102.45-382.37h-264.93z"/>
    <path d="m-575.16 90.455 144.03 537.54h190.82s51.773-269.02 155.32-269.02c98.393 0 147.59 255.63 147.59 255.63h192.23l194.36-725.36h-278.08s35.613 458.4-128.62 480.02c-95.437 12.564-144.39-250.09-144.39-250.09s-47.523 254.98-140.17 242.78c-130.82-17.223-102.45-382.37-102.45-382.37h-264.93z" fill="currentColor"/>
   </g>
  </g>
 </svg>
 `,
  x: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
   <g transform="matrix(.084175 0 0 .084271 -21.109 283.58)" stroke="#000" stroke-width="1px">
    <path d="m437.72-47.533h282.84s-26.152 336.62 94.452 352.5c141.27 18.598 213.73-370.19 213.73-370.19h314.07l-348.5 603.62 230.95 400.03h-270.35s-62.514-324.83-187.54-324.83c-120.05 0-180.08 311.91-180.08 311.91h-246.55l290.71-503.53z"/>
    <path d="m443.72-43.533h282.84s-26.152 336.62 94.452 352.5c141.27 18.598 213.73-370.19 213.73-370.19h314.07l-348.5 603.62 230.95 400.03h-270.35s-62.514-324.83-187.54-324.83c-120.05 0-180.08 311.91-180.08 311.91h-246.55l290.71-503.53z" fill="currentColor"/>
   </g>
  </g>
 </svg>
 `,
  y: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
   <g transform="matrix(.11062 0 0 .11201 36.474 275.6)" stroke="#000" stroke-width="1px">
    <path d="m-209.82 22.273s130.08 272.82 124.16 418.08c-4.889 120-130.33 335.9-130.33 335.9l178.54-1.6549s75.964-235.41 140.75-339.32c94.198-151.08 352.93-400.92 352.93-400.92h-234.74s-50.97 308.76-187.21 290.82c-131.35-17.292-93.408-294.06-93.408-294.06z"/>
    <path d="m-205.82 26.273s130.08 272.82 124.16 418.08c-4.889 120-130.33 335.9-130.33 335.9l178.54-1.6549s75.964-235.41 140.75-339.32c94.198-151.08 352.93-400.92 352.93-400.92h-234.74s-50.97 308.76-187.21 290.82c-131.35-17.292-93.408-294.06-93.408-294.06z" fill="currentColor"/>
   </g>
  </g>
 </svg>
 `,
  z: `<svg width="100" height="100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0 -270.54)">
   <g transform="matrix(.25669 0 0 .25095 13.717 213.65)" stroke="#000" stroke-width="1px">
    <path d="m-4.5252 320.42s107.99-49.777 137.43 1.8078c51.646 90.511-115.58 270.74-115.58 270.74h221.57l43.816-75.891s-99.002 43.704-124.23 0c-50.074-86.731 123.06-260.19 123.06-260.19h-222.53l-63.533 63.533"/>
    <path d="m-0.52525 322.42s107.99-49.777 137.43 1.8078c51.646 90.511-115.58 270.74-115.58 270.74h221.57l43.816-75.891s-99.002 43.704-124.23 0c-50.074-86.731 123.06-260.19 123.06-260.19h-222.53l-63.533 63.533" fill="currentColor"/>
   </g>
  </g>
 </svg>
 `

};

// target the heading
const heading = document.querySelector('h1');

// function including the SVG elements in stead of the letters
function typeSVG(element) {
  // extract the lower case version of each element text
  const text = element.textContent.toLowerCase();
  // loop through each letter substituting a glyphs where one is available in the glyphs object
  const html = [...text].map(letter => (glyphs[letter] ? glyphs[letter] : letter)).join('');
  // include the markup in the element
  element.innerHTML = html;
}

// call the function to immediately include the glyphs for the existing word
typeSVG(heading);


// target the input element
const input = document.querySelector('input[type="text"]');
// on change alter the text of the heading and call the typeSVG function
input.addEventListener('input', function () {
  const value = this.value;
  heading.textContent = value;
  typeSVG(heading);
});
