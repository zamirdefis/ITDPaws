const icons = {
  unknown : `
<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg fill="none" width="800px" height="800px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;}</style></defs><title>unknown--filled</title><path d="M29.4163,14.5906,17.41,2.5842a1.9937,1.9937,0,0,0-2.8191,0L2.5837,14.5906a1.994,1.994,0,0,0,0,2.8193L14.5906,29.4163a1.9937,1.9937,0,0,0,2.8191,0L29.4163,17.41A1.994,1.994,0,0,0,29.4163,14.5906ZM16,24a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,24Zm1.125-6.7519v1.8769h-2.25V15H17a1.875,1.875,0,0,0,0-3.75H15a1.8771,1.8771,0,0,0-1.875,1.875v.5h-2.25v-.5A4.13,4.13,0,0,1,15,9h2a4.125,4.125,0,0,1,.125,8.2481Z"/><path id="inner-path" class="cls-1" d="M16,21a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,21Zm1.125-3.752A4.1249,4.1249,0,0,0,17,9H15a4.13,4.13,0,0,0-4.125,4.125v.5h2.25v-.5A1.8772,1.8772,0,0,1,15,11.25h2A1.875,1.875,0,0,1,17,15H14.875v4.125h2.25Z"/><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/></svg>

`,
  json : `
<svg viewBox="0 0 512 512" aria-hidden="true">
<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
  <g id="icon" fill="currentColor" transform="translate(37.333333, 128.141872)">
    <path d="M111.084954,16.7215774 L141.254831,46.8914721 L60.356556,127.806522 L141.254831,208.721577 L111.084954,238.891472 L7.10542736e-15,127.806522 L111.084954,16.7215774 Z M326.063211,16.758697 L295.893333,46.9285921 L376.791607,127.843642 L295.893333,208.758697 L326.063211,238.928592 L437.148163,127.843642 L326.063211,16.758697 Z M231.145356,3.69482223e-12 L272.358192,11.0429459 L206.100516,258.319957 L164.887681,247.277012 L231.145356,3.69482223e-12 Z" id="Combined-Shape">

    </path>
  </g>
</g>
</svg>
`
}

export const add = (name, svg_data) => {
  icons.name = svg_data
}

export const remove = (name) => {
  if (name in icons) {
    delete icons.name
  }
}

export const get = (name) => {
  if (name in icons) {
    return 
  }
  return icons.unknown
}
