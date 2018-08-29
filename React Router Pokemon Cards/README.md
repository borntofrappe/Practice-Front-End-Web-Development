Link to the working pen right [here](https://codepen.io/borntofrappe/full/YOpzLE/).

## Preface

With this rather challenging project I started coding with quite little planning. The following notes are appended on the working project. A project which entailed a lot of practice and a few lessons learned in React-land:

- React components and lifecycle methods;

- React routing;

- Styled components.

All while retrieving data from an external source, and specifically the Pokemon Trading Card game API, and showcasing pokemon cards from the first set.

**Codepen Nuisance**

For some reason the code, which works fine locally, does not function on codepen. The issue seems to boil down to the `exact` flag, used alongside the `render` property. Go figure why.

A rough solution to this annoyance is the inclusion of a link forwarding toward the first component. Of courst this means the back button needs to forward toward the new path.

```JS
<Link to="/grid" className="notice">Load the demo.</Link>
```