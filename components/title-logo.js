import { useTranslation } from "react-i18next";
import "../i18n/i18n";


function adjustTextSize(text, limit = 8, startingSize = 80) {
  if (text.length > limit) {
    let shrink = 0;

    if (text.length - limit >= 25) shrink = (text.length - limit) * 2.2;
    else if (text.length - limit >= 20) shrink = (text.length - limit) * 2.7;
    else if (text.length - limit >= 15) shrink = (text.length - limit) * 3.2;
    else if (text.length - limit >= 10) shrink = (text.length - limit) * 3.7;
    else if (text.length - limit >= 5) shrink = (text.length - limit) * 5.5;
    else shrink = (text.length - limit) * 9;
    return startingSize - shrink;
  }
  return startingSize;
}

export default function TitleLogo(props) {
  let hasTitle = props.insert.length > 0 ? true : false;
  const { t } = useTranslation();

  let logo = `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:cc="http://creativecommons.org/ns#"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:svg="http://www.w3.org/2000/svg"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 507.285 250.08613"
  version="1.1"
  id="svg72"
>
  <metadata id="metadata76">
    <rdf:RDF>
      <cc:Work rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>

  <defs id="defs22">
    <linearGradient id="b">
      <stop offset="0" stop-color="#FFFCE5" id="stop12" />
      <stop offset="1" stop-color="#FFFCE5" id="stop14" />
    </linearGradient>
    
    <linearGradient id="c">
     <stop offset="0" stop-color="#DBF227" id="stop2" />
      <stop offset="1" stop-color="#ffd0b2" id="stop4" />
     </linearGradient>


     <linearGradient id="11" x1="0%" y1="0%" x2="100%" y2="100%">
     <stop offset="0%" style="stop-color: #042940" />
     <stop offset="40%" style="stop-color: #042940" />
     <stop offset="60%" style="stop-color: #9FC131" />
     <stop offset="100%" style="stop-color: #9FC131" />
   </linearGradient>


    // EEEEEEEEEEEEEEEEEEEEEE
    <linearGradient
      xlink:href="#c"
      id="e"
      x1="161.01601"
      y1="131.42599"
      x2="248.19501"
      y2="82.411003"
      gradientUnits="userSpaceOnUse"
    />

    // FFFFFFFFFFFFFFFFF
    <linearGradient
      id="f"
      xlink:href="#b"
      x1="15.48"
      x2="14.362"
      y1="${hasTitle ? 10 : 10}"
      y2="${hasTitle ? 60 : 60}"
      gradientUnits="userSpaceOnUse"
    />

    // GGGGGGGGGGGGGGG
    <linearGradient
      id="g"
      xlink:href="#b"
      gradientUnits="userSpaceOnUse"
      x1="15.48"
      x2="14.362"
      y1="${hasTitle ? 100 : 50}"
      y2="${hasTitle ? 140 : 120}"
    />

    // HHHHHHHHHHHHHHHH
    <linearGradient
      id="h"
      xlink:href="#b"
      x1="21.422001"
      x2="19.037001"
      y1="${hasTitle ? 150 : 120}"
      y2="${hasTitle ? 180 : 150}"
      gradientUnits="userSpaceOnUse"
    />
  </defs>


  <g id="g120" transform="translate(100,30.0287)">
    <g
      transform="translate(63.490999,-44.629822)"
      stroke-linejoin="round"
      stroke-dashoffset="1.457"
      paint-order="stroke fill markers"
      id="g30"
    >
    // ----------- MAIN CIRCLE -----------
      <ellipse
        cx="105.604"
        cy="151.672"
        rx="168.745"
        ry="95.946999"
        fill="url(#11)"
        stroke="#000000"
        stroke-width="0.7"
        id="mainCircle"
        style="fill: url(#11)"
      />

      <ellipse
        cx="104.889"
        cy="151.70599"
        rx="150.55701"
        ry="85.606003"
        fill="none"
        stroke="url(#e)"
        stroke-width="5.307"
        id="secondCircle"
        style="stroke: black"
      />

      <ellipse
        cx="102.357"
        cy="151.52499"
        rx="135.53101"
        ry="77.061996"
        fill="none"
        stroke="white"
        stroke-width="2.656"
        id="thirdCircle"
      />
    </g>
      // ------ Text of Family -------
    <text
      stroke="black"
      transform="rotate(-4.3169998)"
      id="text64"
    >
      <tspan
        y="${hasTitle ? 148 : 120}"
        x="155.30832"
        font-weight="700"
        font-family="Rufing"
        id="tspan62"
      >
        <tspan
          style="fill: url(#g);"
          font-size="${adjustTextSize(t("family"))}"
          text-anchor="middle"
          stroke-width="1"
          stroke-linejoin="round"
          id="tspan60"
        >
          ${t("family")}
        </tspan>
      </tspan>
    </text>

    // ------ Text of FACE OFF -------
    <text
      stroke="black"
      transform="rotate(-4.3169998)"
      id="faceOffTextContour"
    >
      <tspan
        y="${hasTitle ? 218 : 187}"
        x="156"
        font-weight="700"
        font-family="Rufing"
        id="tspan68"
      >
        <tspan
          style="
            -inkscape-font-specification: 'C059 Bold';
            text-align: center;
            fill: url(#h);
          "
         font-size="${adjustTextSize(t("feud"))}"
          text-anchor="middle"
          stroke-width="1"
          id="tspan66"
        >
          ${t("feud")}
        </tspan>
      </tspan>
    </text>
    </g>
  </g>

  
</svg>
  `;
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: logo }} />
    </div>
  );
}
