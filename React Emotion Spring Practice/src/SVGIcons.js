import React from 'react';

const SVGIcons = ({ icon }) => {
  switch (icon) {
    case 'thumbs':
      return <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 26.458 26.458"><g fill="#49e8df"><path d="M6.716 10.491c-.789 0-1.424.622-1.424 1.394v6.767c0 .772.635 1.394 1.424 1.394h.814c.789 0 1.424-.622 1.424-1.394v-6.767c0-.772-.635-1.394-1.424-1.394zm.407 7.106a.814.796 0 0 1 .814.796.814.796 0 0 1-.814.796.814.796 0 0 1-.814-.796.814.796 0 0 1 .814-.796z" paint-order="stroke fill markers" /><path d="M9.46 19.191v-7.846s2.544-.794 2.79-2.616c.244-1.822 1.052-2.322 1.052-2.322s2.653-1.977 2.653 2.32c0 2.267-1.19 1.525-1.19 1.525h5.138s2.646 1.352.281 2.915c0 0 1.89 1.207-.306 2.586 0 0 1.87 1.23-.395 2.594 0 0 1.018.948-1.813 1.963-1.377.4-3.43.12-5.138-.26-1.708-.379-3.072-.859-3.072-.859z" /></g></svg>;
    case 'volume':
      return <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 26.458 26.458"><g fill="#49e8df"><path paint-order="stroke fill markers" d="M7.482 15.875h-2.19v5.292h2.19zM10.903 13.229h-2.19v7.938h2.19zM14.324 10.583h-2.19v10.584h2.19zM17.745 7.938h-2.19v13.229h2.19zM21.167 5.292h-2.19v15.875h2.19z" /></g></svg>;
    case 'crown':
      return <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 26.458 26.458"><g transform="matrix(.40104 0 0 .45082 -20.839 -98.174)" fill="#49e8df"><rect width="25.935" height="2.932" x="71.981" y="257.386" rx="1.03" ry=".566" paint-order="stroke fill markers" /><g transform="matrix(1 0 0 .9456 -4.137 19.912)"><path d="M72.023 229.238l10.666 9.852 6.299-9.852 6.298 9.852 10.666-9.852-5.46 19.938h-23.01z" paint-order="stroke fill markers" /><ellipse ry="2.737" rx="2.73" cy="229.238" cx="72.023" paint-order="stroke fill markers" /><ellipse cx="88.988" cy="229.14" rx="2.827" ry="2.834" paint-order="stroke fill markers" /><ellipse ry="2.834" rx="2.827" cy="229.14" cx="106.05" paint-order="stroke fill markers" /></g></g></svg>;
    case 'book':
      return <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 26.458 26.458"><path d="M7.872 5.292c-.697 0-1.257.61-1.257 1.366V19.8c0 .757.56 1.367 1.257 1.367H18.806c.575 0 1.038-.428 1.038-.96 0-.405-.271-.748-.654-.888V17.21h.102c.28 0 .506-.247.506-.552V6.25c0-.53-.46-.958-1.033-.958H15.472zM10.94 9.44h4.578c.277 0 .5.184.5.412 0 .228-.223.412-.5.412H10.94c-.277 0-.5-.184-.5-.412 0-.228.223-.412.5-.412zm0 1.285h4.578c.277 0 .5.184.5.412 0 .228-.223.412-.5.412H10.94c-.277 0-.5-.184-.5-.412 0-.228.223-.412.5-.412zm-1.368 6.513H17.526V19.1H9.572c-.59 0-1.064-.415-1.064-.932 0-.516.474-.931 1.064-.931z" fill="#49e8df" paint-order="stroke fill markers" /></svg>;
    default:
      return null;
  }
}

export default SVGIcons;
