// ../../node_modules/@lucide/vue/dist/esm/createLucideIcon.mjs
import { h as h2 } from "vue";

// ../../node_modules/@lucide/vue/dist/esm/Icon.mjs
import { computed, h } from "vue";

// ../../node_modules/@lucide/vue/dist/esm/shared/src/utils/isEmptyString.mjs
var isEmptyString = (value) => value === "";

// ../../node_modules/@lucide/vue/dist/esm/shared/src/utils/mergeClasses.mjs
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

// ../../node_modules/@lucide/vue/dist/esm/shared/src/utils/toKebabCase.mjs
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

// ../../node_modules/@lucide/vue/dist/esm/shared/src/utils/toCamelCase.mjs
var toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);

// ../../node_modules/@lucide/vue/dist/esm/shared/src/utils/toPascalCase.mjs
var toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

// ../../node_modules/@lucide/vue/dist/esm/defaultAttributes.mjs
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};

// ../../node_modules/@lucide/vue/dist/esm/context.mjs
import { provide, inject } from "vue";
var LUCIDE_CONTEXT = /* @__PURE__ */ Symbol("lucide-icons");
function useLucideProps() {
  return inject(LUCIDE_CONTEXT, {});
}

// ../../node_modules/@lucide/vue/dist/esm/Icon.mjs
var Icon = ({
  name,
  iconNode,
  "icon-node": iconNodeKebabCase,
  absoluteStrokeWidth,
  "absolute-stroke-width": absoluteStrokeWidthKebabCase,
  strokeWidth,
  "stroke-width": strokeWidthKebabCase,
  size,
  color,
  ...props
}, { slots }) => {
  const {
    size: contextSize,
    color: contextColor,
    strokeWidth: contextStrokeWidth = 2,
    absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
    class: contextClass = ""
  } = useLucideProps();
  const calculatedStrokeWidth = computed(() => {
    const isAbsoluteStrokeWidth = isEmptyString(absoluteStrokeWidth) || isEmptyString(absoluteStrokeWidthKebabCase) || absoluteStrokeWidth === true || absoluteStrokeWidthKebabCase === true || contextAbsoluteStrokeWidth === true;
    const strokeWidthValue = strokeWidth || strokeWidthKebabCase || contextStrokeWidth || defaultAttributes["stroke-width"];
    if (isAbsoluteStrokeWidth) {
      return Number(strokeWidthValue) * 24 / Number(size ?? contextSize ?? defaultAttributes.width);
    }
    return strokeWidthValue;
  });
  return h(
    "svg",
    {
      ...defaultAttributes,
      ...props,
      width: size ?? contextSize ?? defaultAttributes.width,
      height: size ?? contextSize ?? defaultAttributes.height,
      stroke: color ?? contextColor ?? defaultAttributes.stroke,
      "stroke-width": calculatedStrokeWidth.value,
      class: mergeClasses(
        "lucide",
        contextClass,
        ...name ? [`lucide-${toKebabCase(toPascalCase(name))}-icon`, `lucide-${toKebabCase(name)}`] : ["lucide-icon"]
      )
    },
    [
      ...(iconNode ?? iconNodeKebabCase ?? []).map((child) => h(...child)),
      ...slots.default ? [slots.default()] : []
    ]
  );
};

// ../../node_modules/@lucide/vue/dist/esm/createLucideIcon.mjs
var createLucideIcon = (iconName, iconNode) => (props, { slots, attrs }) => h2(
  Icon,
  {
    ...attrs,
    ...props,
    iconNode,
    name: iconName
  },
  slots.default ? { default: slots.default } : void 0
);

// ../../node_modules/@lucide/vue/dist/esm/icons/accessibility.mjs
var __iconNode = [
  ["circle", { cx: "16", cy: "4", r: "1", key: "1grugj" }],
  ["path", { d: "m18 19 1-7-6 1", key: "r0i19z" }],
  ["path", { d: "m5 8 3-3 5.5 3-2.36 3.5", key: "9ptxx2" }],
  ["path", { d: "M4.24 14.5a5 5 0 0 0 6.88 6", key: "10kmtu" }],
  ["path", { d: "M13.76 17.5a5 5 0 0 0-6.88-6", key: "2qq6rc" }]
];
var Accessibility = createLucideIcon("accessibility", __iconNode);

// ../../node_modules/@lucide/vue/dist/esm/icons/activity.mjs
var __iconNode2 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
var Activity = createLucideIcon("activity", __iconNode2);

// ../../node_modules/@lucide/vue/dist/esm/icons/air-vent.mjs
var __iconNode3 = [
  ["path", { d: "M18 17.5a2.5 2.5 0 1 1-4 2.03V12", key: "yd12zl" }],
  [
    "path",
    {
      d: "M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "larmp2"
    }
  ],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "M6.6 15.572A2 2 0 1 0 10 17v-5", key: "1x1kqn" }]
];
var AirVent = createLucideIcon("air-vent", __iconNode3);

// ../../node_modules/@lucide/vue/dist/esm/icons/airplay.mjs
var __iconNode4 = [
  [
    "path",
    {
      d: "M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1",
      key: "ns4c3b"
    }
  ],
  ["path", { d: "m12 15 5 6H7Z", key: "14qnn2" }]
];
var Airplay = createLucideIcon("airplay", __iconNode4);

// ../../node_modules/@lucide/vue/dist/esm/icons/alarm-clock.mjs
var __iconNode5 = [
  ["circle", { cx: "12", cy: "13", r: "8", key: "3y4lt7" }],
  ["path", { d: "M12 9v4l2 2", key: "1c63tq" }],
  ["path", { d: "M5 3 2 6", key: "18tl5t" }],
  ["path", { d: "m22 6-3-3", key: "1opdir" }],
  ["path", { d: "M6.38 18.7 4 21", key: "17xu3x" }],
  ["path", { d: "M17.64 18.67 20 21", key: "kv2oe2" }]
];
var AlarmClock = createLucideIcon("alarm-clock", __iconNode5);

// ../../node_modules/@lucide/vue/dist/esm/icons/album.mjs
var __iconNode6 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["polyline", { points: "11 3 11 11 14 8 17 11 17 3", key: "1wcwz3" }]
];
var Album = createLucideIcon("album", __iconNode6);

// ../../node_modules/@lucide/vue/dist/esm/icons/circle-alert.mjs
var __iconNode7 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
var CircleAlert = createLucideIcon("circle-alert", __iconNode7);

// ../../node_modules/@lucide/vue/dist/esm/icons/triangle-alert.mjs
var __iconNode8 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
var TriangleAlert = createLucideIcon("triangle-alert", __iconNode8);

// ../../node_modules/@lucide/vue/dist/esm/icons/text-align-center.mjs
var __iconNode9 = [
  ["path", { d: "M21 5H3", key: "1fi0y6" }],
  ["path", { d: "M17 12H7", key: "16if0g" }],
  ["path", { d: "M19 19H5", key: "vjpgq2" }]
];
var TextAlignCenter = createLucideIcon("text-align-center", __iconNode9);

// ../../node_modules/@lucide/vue/dist/esm/icons/text-align-start.mjs
var __iconNode10 = [
  ["path", { d: "M21 5H3", key: "1fi0y6" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M17 19H3", key: "z6ezky" }]
];
var TextAlignStart = createLucideIcon("text-align-start", __iconNode10);

// ../../node_modules/@lucide/vue/dist/esm/icons/text-align-end.mjs
var __iconNode11 = [
  ["path", { d: "M21 5H3", key: "1fi0y6" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M21 19H7", key: "4cu937" }]
];
var TextAlignEnd = createLucideIcon("text-align-end", __iconNode11);

// ../../node_modules/@lucide/vue/dist/esm/icons/ambulance.mjs
var __iconNode12 = [
  ["path", { d: "M10 10H6", key: "1bsnug" }],
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14",
      key: "lrkjwd"
    }
  ],
  ["path", { d: "M8 8v4", key: "1fwk8c" }],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
var Ambulance = createLucideIcon("ambulance", __iconNode12);

// ../../node_modules/@lucide/vue/dist/esm/icons/anchor.mjs
var __iconNode13 = [
  ["path", { d: "M12 6v16", key: "nqf5sj" }],
  ["path", { d: "m19 13 2-1a9 9 0 0 1-18 0l2 1", key: "y7qv08" }],
  ["path", { d: "M9 11h6", key: "1fldmi" }],
  ["circle", { cx: "12", cy: "4", r: "2", key: "muu5ef" }]
];
var Anchor = createLucideIcon("anchor", __iconNode13);

// ../../node_modules/@lucide/vue/dist/esm/icons/antenna.mjs
var __iconNode14 = [
  ["path", { d: "M2 12 7 2", key: "117k30" }],
  ["path", { d: "m7 12 5-10", key: "1tvx22" }],
  ["path", { d: "m12 12 5-10", key: "ev1o1a" }],
  ["path", { d: "m17 12 5-10", key: "1e4ti3" }],
  ["path", { d: "M4.5 7h15", key: "vlsxkz" }],
  ["path", { d: "M12 16v6", key: "c8a4gj" }]
];
var Antenna = createLucideIcon("antenna", __iconNode14);

// ../../node_modules/@lucide/vue/dist/esm/icons/aperture.mjs
var __iconNode15 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m14.31 8 5.74 9.94", key: "1y6ab4" }],
  ["path", { d: "M9.69 8h11.48", key: "1wxppr" }],
  ["path", { d: "m7.38 12 5.74-9.94", key: "1grp0k" }],
  ["path", { d: "M9.69 16 3.95 6.06", key: "libnyf" }],
  ["path", { d: "M14.31 16H2.83", key: "x5fava" }],
  ["path", { d: "m16.62 12-5.74 9.94", key: "1vwawt" }]
];
var Aperture = createLucideIcon("aperture", __iconNode15);

// ../../node_modules/@lucide/vue/dist/esm/icons/apple.mjs
var __iconNode16 = [
  ["path", { d: "M12 6.528V3a1 1 0 0 1 1-1h0", key: "11qiee" }],
  [
    "path",
    {
      d: "M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21",
      key: "110c12"
    }
  ]
];
var Apple = createLucideIcon("apple", __iconNode16);

// ../../node_modules/@lucide/vue/dist/esm/icons/archive.mjs
var __iconNode17 = [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }],
  ["path", { d: "M10 12h4", key: "a56b0p" }]
];
var Archive = createLucideIcon("archive", __iconNode17);

// ../../node_modules/@lucide/vue/dist/esm/icons/archive-restore.mjs
var __iconNode18 = [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h2", key: "tvwodi" }],
  ["path", { d: "M20 8v11a2 2 0 0 1-2 2h-2", key: "1gkqxj" }],
  ["path", { d: "m9 15 3-3 3 3", key: "1pd0qc" }],
  ["path", { d: "M12 12v9", key: "192myk" }]
];
var ArchiveRestore = createLucideIcon("archive-restore", __iconNode18);

// ../../node_modules/@lucide/vue/dist/esm/icons/archive-x.mjs
var __iconNode19 = [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }],
  ["path", { d: "m9.5 17 5-5", key: "nakeu6" }],
  ["path", { d: "m9.5 12 5 5", key: "1hccrj" }]
];
var ArchiveX = createLucideIcon("archive-x", __iconNode19);

// ../../node_modules/@lucide/vue/dist/esm/icons/chart-area.mjs
var __iconNode20 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  [
    "path",
    {
      d: "M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z",
      key: "q0gr47"
    }
  ]
];
var ChartArea = createLucideIcon("chart-area", __iconNode20);

// ../../node_modules/@lucide/vue/dist/esm/icons/armchair.mjs
var __iconNode21 = [
  ["path", { d: "M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3", key: "irtipd" }],
  [
    "path",
    {
      d: "M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
      key: "1qyhux"
    }
  ],
  ["path", { d: "M5 18v2", key: "ppbyun" }],
  ["path", { d: "M19 18v2", key: "gy7782" }]
];
var Armchair = createLucideIcon("armchair", __iconNode21);

// ../../node_modules/@lucide/vue/dist/esm/icons/arrow-down.mjs
var __iconNode22 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
var ArrowDown = createLucideIcon("arrow-down", __iconNode22);

// ../../node_modules/@lucide/vue/dist/esm/icons/arrow-left.mjs
var __iconNode23 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
var ArrowLeft = createLucideIcon("arrow-left", __iconNode23);

// ../../node_modules/@lucide/vue/dist/esm/icons/arrow-right.mjs
var __iconNode24 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
var ArrowRight = createLucideIcon("arrow-right", __iconNode24);

// ../../node_modules/@lucide/vue/dist/esm/icons/arrow-up.mjs
var __iconNode25 = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
];
var ArrowUp = createLucideIcon("arrow-up", __iconNode25);

// ../../node_modules/@lucide/vue/dist/esm/icons/arrow-up-right.mjs
var __iconNode26 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
var ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode26);

// ../../node_modules/@lucide/vue/dist/esm/icons/asterisk.mjs
var __iconNode27 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m18.065 8.496-12.125 7", key: "1h26g9" }],
  ["path", { d: "m5.94 8.504 12.125 7", key: "k77sdm" }]
];
var Asterisk = createLucideIcon("asterisk", __iconNode27);

// ../../node_modules/@lucide/vue/dist/esm/icons/at-sign.mjs
var __iconNode28 = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8", key: "7n84p3" }]
];
var AtSign = createLucideIcon("at-sign", __iconNode28);

// ../../node_modules/@lucide/vue/dist/esm/icons/atom.mjs
var __iconNode29 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  [
    "path",
    {
      d: "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z",
      key: "1l2ple"
    }
  ],
  [
    "path",
    {
      d: "M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z",
      key: "1wam0m"
    }
  ]
];
var Atom = createLucideIcon("atom", __iconNode29);

// ../../node_modules/@lucide/vue/dist/esm/icons/award.mjs
var __iconNode30 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
var Award = createLucideIcon("award", __iconNode30);

// ../../node_modules/@lucide/vue/dist/esm/icons/axe.mjs
var __iconNode31 = [
  ["path", { d: "m14 12-8.381 8.38a1 1 0 0 1-3.001-3L11 9", key: "5z9253" }],
  [
    "path",
    {
      d: "M15 15.5a.5.5 0 0 0 .5.5A6.5 6.5 0 0 0 22 9.5a.5.5 0 0 0-.5-.5h-1.672a2 2 0 0 1-1.414-.586l-5.062-5.062a1.205 1.205 0 0 0-1.704 0L9.352 5.648a1.205 1.205 0 0 0 0 1.704l5.062 5.062A2 2 0 0 1 15 13.828z",
      key: "19zklq"
    }
  ]
];
var Axe = createLucideIcon("axe", __iconNode31);

// ../../node_modules/@lucide/vue/dist/esm/icons/baby.mjs
var __iconNode32 = [
  ["path", { d: "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5", key: "1u7htd" }],
  ["path", { d: "M15 12h.01", key: "1k8ypt" }],
  [
    "path",
    {
      d: "M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",
      key: "11xh7x"
    }
  ],
  ["path", { d: "M9 12h.01", key: "157uk2" }]
];
var Baby = createLucideIcon("baby", __iconNode32);

// ../../node_modules/@lucide/vue/dist/esm/icons/badge.mjs
var __iconNode33 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ]
];
var Badge = createLucideIcon("badge", __iconNode33);

// ../../node_modules/@lucide/vue/dist/esm/icons/badge-alert.mjs
var __iconNode34 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
var BadgeAlert = createLucideIcon("badge-alert", __iconNode34);

// ../../node_modules/@lucide/vue/dist/esm/icons/badge-cent.mjs
var __iconNode35 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "M12 7v10", key: "jspqdw" }],
  ["path", { d: "M15.4 10a4 4 0 1 0 0 4", key: "2eqtx8" }]
];
var BadgeCent = createLucideIcon("badge-cent", __iconNode35);

// ../../node_modules/@lucide/vue/dist/esm/icons/badge-check.mjs
var __iconNode36 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m16 9-5.5 5.5L8 12", key: "xofnsj" }]
];
var BadgeCheck = createLucideIcon("badge-check", __iconNode36);

// ../../node_modules/@lucide/vue/dist/esm/icons/badge-dollar-sign.mjs
var __iconNode37 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }]
];
var BadgeDollarSign = createLucideIcon("badge-dollar-sign", __iconNode37);

// ../../node_modules/@lucide/vue/dist/esm/icons/badge-euro.mjs
var __iconNode38 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "M7 12h5", key: "gblrwe" }],
  ["path", { d: "M15 9.4a4 4 0 1 0 0 5.2", key: "1makmb" }]
];
var BadgeEuro = createLucideIcon("badge-euro", __iconNode38);

// ../../node_modules/@lucide/vue/dist/esm/icons/badge-info.mjs
var __iconNode39 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["line", { x1: "12", x2: "12", y1: "16", y2: "12", key: "1y1yb1" }],
  ["line", { x1: "12", x2: "12.01", y1: "8", y2: "8", key: "110wyk" }]
];
var BadgeInfo = createLucideIcon("badge-info", __iconNode39);

// ../../node_modules/@lucide/vue/dist/esm/icons/badge-minus.mjs
var __iconNode40 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
];
var BadgeMinus = createLucideIcon("badge-minus", __iconNode40);

// ../../node_modules/@lucide/vue/dist/esm/icons/badge-plus.mjs
var __iconNode41 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "16", key: "10p56q" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
];
var BadgePlus = createLucideIcon("badge-plus", __iconNode41);

// ../../node_modules/@lucide/vue/dist/esm/icons/badge-x.mjs
var __iconNode42 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["line", { x1: "15", x2: "9", y1: "9", y2: "15", key: "f7djnv" }],
  ["line", { x1: "9", x2: "15", y1: "9", y2: "15", key: "1shsy8" }]
];
var BadgeX = createLucideIcon("badge-x", __iconNode42);

// ../../node_modules/@lucide/vue/dist/esm/icons/ban.mjs
var __iconNode43 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M4.929 4.929 19.07 19.071", key: "196cmz" }]
];
var Ban = createLucideIcon("ban", __iconNode43);

// ../../node_modules/@lucide/vue/dist/esm/icons/banana.mjs
var __iconNode44 = [
  ["path", { d: "M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5", key: "1cscit" }],
  [
    "path",
    {
      d: "M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z",
      key: "1y1nbv"
    }
  ]
];
var Banana = createLucideIcon("banana", __iconNode44);

// ../../node_modules/@lucide/vue/dist/esm/icons/banknote.mjs
var __iconNode45 = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M6 12h.01M18 12h.01", key: "113zkx" }]
];
var Banknote = createLucideIcon("banknote", __iconNode45);

// ../../node_modules/@lucide/vue/dist/esm/icons/chart-no-axes-column.mjs
var __iconNode46 = [
  ["path", { d: "M5 21v-6", key: "1hz6c0" }],
  ["path", { d: "M12 21V3", key: "1lcnhd" }],
  ["path", { d: "M19 21V9", key: "unv183" }]
];
var ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode46);

// ../../node_modules/@lucide/vue/dist/esm/icons/chart-column.mjs
var __iconNode47 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
var ChartColumn = createLucideIcon("chart-column", __iconNode47);

// ../../node_modules/@lucide/vue/dist/esm/icons/barcode.mjs
var __iconNode48 = [
  ["path", { d: "M3 5v14", key: "1nt18q" }],
  ["path", { d: "M8 5v14", key: "1ybrkv" }],
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "M17 5v14", key: "ycjyhj" }],
  ["path", { d: "M21 5v14", key: "nzette" }]
];
var Barcode = createLucideIcon("barcode", __iconNode48);

// ../../node_modules/@lucide/vue/dist/esm/icons/bath.mjs
var __iconNode49 = [
  ["path", { d: "M10 4 8 6", key: "1rru8s" }],
  ["path", { d: "M17 19v2", key: "ts1sot" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "M7 19v2", key: "12npes" }],
  [
    "path",
    {
      d: "M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5",
      key: "14ym8i"
    }
  ]
];
var Bath = createLucideIcon("bath", __iconNode49);

// ../../node_modules/@lucide/vue/dist/esm/icons/battery.mjs
var __iconNode50 = [
  ["path", { d: "M 22 14 L 22 10", key: "nqc4tb" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2", key: "13zb55" }]
];
var Battery = createLucideIcon("battery", __iconNode50);

// ../../node_modules/@lucide/vue/dist/esm/icons/battery-charging.mjs
var __iconNode51 = [
  ["path", { d: "m11 7-3 5h4l-3 5", key: "b4a64w" }],
  ["path", { d: "M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935", key: "lre1cr" }],
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936", key: "13q5k0" }]
];
var BatteryCharging = createLucideIcon("battery-charging", __iconNode51);

// ../../node_modules/@lucide/vue/dist/esm/icons/battery-full.mjs
var __iconNode52 = [
  ["path", { d: "M10 10v4", key: "1mb2ec" }],
  ["path", { d: "M14 10v4", key: "1nt88p" }],
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M6 10v4", key: "1n77qd" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2", key: "13zb55" }]
];
var BatteryFull = createLucideIcon("battery-full", __iconNode52);

// ../../node_modules/@lucide/vue/dist/esm/icons/battery-low.mjs
var __iconNode53 = [
  ["path", { d: "M22 14v-4", key: "14q9d5" }],
  ["path", { d: "M6 14v-4", key: "14a6bd" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2", key: "13zb55" }]
];
var BatteryLow = createLucideIcon("battery-low", __iconNode53);

// ../../node_modules/@lucide/vue/dist/esm/icons/beaker.mjs
var __iconNode54 = [
  ["path", { d: "M4.5 3h15", key: "c7n0jr" }],
  ["path", { d: "M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3", key: "m1uhx7" }],
  ["path", { d: "M6 14h12", key: "4cwo0f" }]
];
var Beaker = createLucideIcon("beaker", __iconNode54);

// ../../node_modules/@lucide/vue/dist/esm/icons/bed.mjs
var __iconNode55 = [
  ["path", { d: "M2 4v16", key: "vw9hq8" }],
  ["path", { d: "M2 8h18a2 2 0 0 1 2 2v10", key: "1dgv2r" }],
  ["path", { d: "M2 17h20", key: "18nfp3" }],
  ["path", { d: "M6 8v9", key: "1yriud" }]
];
var Bed = createLucideIcon("bed", __iconNode55);

// ../../node_modules/@lucide/vue/dist/esm/icons/bed-double.mjs
var __iconNode56 = [
  ["path", { d: "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8", key: "1k78r4" }],
  ["path", { d: "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4", key: "fb3tl2" }],
  ["path", { d: "M12 4v6", key: "1dcgq2" }],
  ["path", { d: "M2 18h20", key: "ajqnye" }]
];
var BedDouble = createLucideIcon("bed-double", __iconNode56);

// ../../node_modules/@lucide/vue/dist/esm/icons/bed-single.mjs
var __iconNode57 = [
  ["path", { d: "M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8", key: "1wm6mi" }],
  ["path", { d: "M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4", key: "4k93s5" }],
  ["path", { d: "M3 18h18", key: "1h113x" }]
];
var BedSingle = createLucideIcon("bed-single", __iconNode57);

// ../../node_modules/@lucide/vue/dist/esm/icons/beef.mjs
var __iconNode58 = [
  [
    "path",
    {
      d: "M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3",
      key: "cisjcv"
    }
  ],
  [
    "path",
    {
      d: "m18.5 6 1.754 3.5a6.48 6.48 0 0 1-1.854 8.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5",
      key: "hvizuk"
    }
  ],
  ["circle", { cx: "12.5", cy: "8.5", r: "2.5", key: "9738u8" }]
];
var Beef = createLucideIcon("beef", __iconNode58);

// ../../node_modules/@lucide/vue/dist/esm/icons/bell.mjs
var __iconNode59 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
var Bell = createLucideIcon("bell", __iconNode59);

// ../../node_modules/@lucide/vue/dist/esm/icons/bell-minus.mjs
var __iconNode60 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  ["path", { d: "M15 8h6", key: "8ybuxh" }],
  [
    "path",
    {
      d: "M16.243 3.757A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673A9.4 9.4 0 0 1 18.667 12",
      key: "bdwj86"
    }
  ]
];
var BellMinus = createLucideIcon("bell-minus", __iconNode60);

// ../../node_modules/@lucide/vue/dist/esm/icons/bell-off.mjs
var __iconNode61 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
];
var BellOff = createLucideIcon("bell-off", __iconNode61);

// ../../node_modules/@lucide/vue/dist/esm/icons/bell-plus.mjs
var __iconNode62 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  ["path", { d: "M15 8h6", key: "8ybuxh" }],
  ["path", { d: "M18 5v6", key: "g5ayrv" }],
  [
    "path",
    {
      d: "M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332",
      key: "1abcvy"
    }
  ]
];
var BellPlus = createLucideIcon("bell-plus", __iconNode62);

// ../../node_modules/@lucide/vue/dist/esm/icons/bell-ring.mjs
var __iconNode63 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  ["path", { d: "M22 8c0-2.3-.8-4.3-2-6", key: "5bb3ad" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ],
  ["path", { d: "M4 2C2.8 3.7 2 5.7 2 8", key: "tap9e0" }]
];
var BellRing = createLucideIcon("bell-ring", __iconNode63);

// ../../node_modules/@lucide/vue/dist/esm/icons/bike.mjs
var __iconNode64 = [
  ["circle", { cx: "18.5", cy: "17.5", r: "3.5", key: "15x4ox" }],
  ["circle", { cx: "5.5", cy: "17.5", r: "3.5", key: "1noe27" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["path", { d: "M12 17.5V14l-3-3 4-3 2 3h2", key: "1npguv" }]
];
var Bike = createLucideIcon("bike", __iconNode64);

// ../../node_modules/@lucide/vue/dist/esm/icons/binary.mjs
var __iconNode65 = [
  ["rect", { x: "14", y: "14", width: "4", height: "6", rx: "2", key: "p02svl" }],
  ["rect", { x: "6", y: "4", width: "4", height: "6", rx: "2", key: "xm4xkj" }],
  ["path", { d: "M6 20h4", key: "1i6q5t" }],
  ["path", { d: "M14 10h4", key: "ru81e7" }],
  ["path", { d: "M6 14h2v6", key: "16z9wg" }],
  ["path", { d: "M14 4h2v6", key: "1idq9u" }]
];
var Binary = createLucideIcon("binary", __iconNode65);

// ../../node_modules/@lucide/vue/dist/esm/icons/bird.mjs
var __iconNode66 = [
  ["path", { d: "M16 7h.01", key: "1kdx03" }],
  ["path", { d: "M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20", key: "oj1oa8" }],
  ["path", { d: "m20 7 2 .5-2 .5", key: "12nv4d" }],
  ["path", { d: "M10 18v3", key: "1yea0a" }],
  ["path", { d: "M14 17.75V21", key: "1pymcb" }],
  ["path", { d: "M7 18a6 6 0 0 0 3.84-10.61", key: "1npnn0" }]
];
var Bird = createLucideIcon("bird", __iconNode66);

// ../../node_modules/@lucide/vue/dist/esm/icons/blocks.mjs
var __iconNode67 = [
  [
    "path",
    {
      d: "M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2",
      key: "1ah6g2"
    }
  ],
  ["rect", { x: "14", y: "2", width: "8", height: "8", rx: "1", key: "88lufb" }]
];
var Blocks = createLucideIcon("blocks", __iconNode67);

// ../../node_modules/@lucide/vue/dist/esm/icons/bluetooth.mjs
var __iconNode68 = [["path", { d: "m7 7 10 10-5 5V2l5 5L7 17", key: "1q5490" }]];
var Bluetooth = createLucideIcon("bluetooth", __iconNode68);

// ../../node_modules/@lucide/vue/dist/esm/icons/bold.mjs
var __iconNode69 = [
  [
    "path",
    { d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8", key: "mg9rjx" }
  ]
];
var Bold = createLucideIcon("bold", __iconNode69);

// ../../node_modules/@lucide/vue/dist/esm/icons/bolt.mjs
var __iconNode70 = [
  [
    "path",
    {
      d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
      key: "yt0hxn"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }]
];
var Bolt = createLucideIcon("bolt", __iconNode70);

// ../../node_modules/@lucide/vue/dist/esm/icons/bone.mjs
var __iconNode71 = [
  [
    "path",
    {
      d: "M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z",
      key: "w610uw"
    }
  ]
];
var Bone = createLucideIcon("bone", __iconNode71);

// ../../node_modules/@lucide/vue/dist/esm/icons/book.mjs
var __iconNode72 = [
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ]
];
var Book = createLucideIcon("book", __iconNode72);

// ../../node_modules/@lucide/vue/dist/esm/icons/book-check.mjs
var __iconNode73 = [
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["path", { d: "m9 9.5 2 2 4-4", key: "1dth82" }]
];
var BookCheck = createLucideIcon("book-check", __iconNode73);

// ../../node_modules/@lucide/vue/dist/esm/icons/book-copy.mjs
var __iconNode74 = [
  ["path", { d: "M5 7a2 2 0 0 0-2 2v11", key: "1yhqjt" }],
  ["path", { d: "M5.803 18H5a2 2 0 0 0 0 4h9.5a.5.5 0 0 0 .5-.5V21", key: "edzzo5" }],
  [
    "path",
    {
      d: "M9 15V4a2 2 0 0 1 2-2h9.5a.5.5 0 0 1 .5.5v14a.5.5 0 0 1-.5.5H11a2 2 0 0 1 0-4h10",
      key: "1nwzrg"
    }
  ]
];
var BookCopy = createLucideIcon("book-copy", __iconNode74);

// ../../node_modules/@lucide/vue/dist/esm/icons/book-marked.mjs
var __iconNode75 = [
  ["path", { d: "M10 2v8l3-3 3 3V2", key: "sqw3rj" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ]
];
var BookMarked = createLucideIcon("book-marked", __iconNode75);

// ../../node_modules/@lucide/vue/dist/esm/icons/book-minus.mjs
var __iconNode76 = [
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["path", { d: "M9 10h6", key: "9gxzsh" }]
];
var BookMinus = createLucideIcon("book-minus", __iconNode76);

// ../../node_modules/@lucide/vue/dist/esm/icons/book-open.mjs
var __iconNode77 = [
  ["path", { d: "M12 5v16", key: "1f6ucr" }],
  [
    "path",
    {
      d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",
      key: "1fyvmf"
    }
  ]
];
var BookOpen = createLucideIcon("book-open", __iconNode77);

// ../../node_modules/@lucide/vue/dist/esm/icons/book-open-check.mjs
var __iconNode78 = [
  ["path", { d: "M12 5v16", key: "1f6ucr" }],
  ["path", { d: "m16 12 2 2 4-4", key: "mdajum" }],
  [
    "path",
    {
      d: "M22 6V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2h4.001A2 2 0 0022 17v-1.344",
      key: "144kbk"
    }
  ]
];
var BookOpenCheck = createLucideIcon("book-open-check", __iconNode78);

// ../../node_modules/@lucide/vue/dist/esm/icons/book-open-text.mjs
var __iconNode79 = [
  ["path", { d: "M12 5v16", key: "1f6ucr" }],
  ["path", { d: "M16 13h2", key: "weia3s" }],
  ["path", { d: "M16 9h2", key: "1n7gjm" }],
  [
    "path",
    {
      d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",
      key: "1fyvmf"
    }
  ],
  ["path", { d: "M6 13h2", key: "1cckiz" }],
  ["path", { d: "M6 9h2", key: "1k7j9f" }]
];
var BookOpenText = createLucideIcon("book-open-text", __iconNode79);

// ../../node_modules/@lucide/vue/dist/esm/icons/book-plus.mjs
var __iconNode80 = [
  ["path", { d: "M12 7v6", key: "lw1j43" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["path", { d: "M9 10h6", key: "9gxzsh" }]
];
var BookPlus = createLucideIcon("book-plus", __iconNode80);

// ../../node_modules/@lucide/vue/dist/esm/icons/book-text.mjs
var __iconNode81 = [
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["path", { d: "M8 11h8", key: "vwpz6n" }],
  ["path", { d: "M8 7h6", key: "1f0q6e" }]
];
var BookText = createLucideIcon("book-text", __iconNode81);

// ../../node_modules/@lucide/vue/dist/esm/icons/book-user.mjs
var __iconNode82 = [
  ["path", { d: "M15 13a3 3 0 1 0-6 0", key: "10j68g" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }]
];
var BookUser = createLucideIcon("book-user", __iconNode82);

// ../../node_modules/@lucide/vue/dist/esm/icons/book-x.mjs
var __iconNode83 = [
  ["path", { d: "m14.5 7.5-5 5", key: "3lb6iw" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ],
  ["path", { d: "m9.5 7.5 5 5", key: "ko136h" }]
];
var BookX = createLucideIcon("book-x", __iconNode83);

// ../../node_modules/@lucide/vue/dist/esm/icons/bookmark.mjs
var __iconNode84 = [
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
      key: "oz39mx"
    }
  ]
];
var Bookmark = createLucideIcon("bookmark", __iconNode84);

// ../../node_modules/@lucide/vue/dist/esm/icons/bookmark-minus.mjs
var __iconNode85 = [
  ["path", { d: "M15 10H9", key: "o6yqo3" }],
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
      key: "oz39mx"
    }
  ]
];
var BookmarkMinus = createLucideIcon("bookmark-minus", __iconNode85);

// ../../node_modules/@lucide/vue/dist/esm/icons/bookmark-plus.mjs
var __iconNode86 = [
  ["path", { d: "M12 7v6", key: "lw1j43" }],
  ["path", { d: "M15 10H9", key: "o6yqo3" }],
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
      key: "oz39mx"
    }
  ]
];
var BookmarkPlus = createLucideIcon("bookmark-plus", __iconNode86);

// ../../node_modules/@lucide/vue/dist/esm/icons/bookmark-x.mjs
var __iconNode87 = [
  ["path", { d: "m14.5 7.5-5 5", key: "3lb6iw" }],
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
      key: "oz39mx"
    }
  ],
  ["path", { d: "m9.5 7.5 5 5", key: "ko136h" }]
];
var BookmarkX = createLucideIcon("bookmark-x", __iconNode87);

// ../../node_modules/@lucide/vue/dist/esm/icons/bot.mjs
var __iconNode88 = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
];
var Bot = createLucideIcon("bot", __iconNode88);

// ../../node_modules/@lucide/vue/dist/esm/icons/box.mjs
var __iconNode89 = [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
];
var Box = createLucideIcon("box", __iconNode89);

// ../../node_modules/@lucide/vue/dist/esm/icons/boxes.mjs
var __iconNode90 = [
  [
    "path",
    {
      d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
      key: "lc1i9w"
    }
  ],
  ["path", { d: "m7 16.5-4.74-2.85", key: "1o9zyk" }],
  ["path", { d: "m7 16.5 5-3", key: "va8pkn" }],
  ["path", { d: "M7 16.5v5.17", key: "jnp8gn" }],
  [
    "path",
    {
      d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
      key: "8zsnat"
    }
  ],
  ["path", { d: "m17 16.5-5-3", key: "8arw3v" }],
  ["path", { d: "m17 16.5 4.74-2.85", key: "8rfmw" }],
  ["path", { d: "M17 16.5v5.17", key: "k6z78m" }],
  [
    "path",
    {
      d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
      key: "1xygjf"
    }
  ],
  ["path", { d: "M12 8 7.26 5.15", key: "1vbdud" }],
  ["path", { d: "m12 8 4.74-2.85", key: "3rx089" }],
  ["path", { d: "M12 13.5V8", key: "1io7kd" }]
];
var Boxes = createLucideIcon("boxes", __iconNode90);

// ../../node_modules/@lucide/vue/dist/esm/icons/brain.mjs
var __iconNode91 = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
];
var Brain = createLucideIcon("brain", __iconNode91);

// ../../node_modules/@lucide/vue/dist/esm/icons/brain-circuit.mjs
var __iconNode92 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  ["path", { d: "M9 13a4.5 4.5 0 0 0 3-4", key: "10igwf" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M12 13h4", key: "1ku699" }],
  ["path", { d: "M12 18h6a2 2 0 0 1 2 2v1", key: "105ag5" }],
  ["path", { d: "M12 8h8", key: "1lhi5i" }],
  ["path", { d: "M16 8V5a2 2 0 0 1 2-2", key: "u6izg6" }],
  ["circle", { cx: "16", cy: "13", r: ".5", key: "ry7gng" }],
  ["circle", { cx: "18", cy: "3", r: ".5", key: "1aiba7" }],
  ["circle", { cx: "20", cy: "21", r: ".5", key: "yhc1fs" }],
  ["circle", { cx: "20", cy: "8", r: ".5", key: "1e43v0" }]
];
var BrainCircuit = createLucideIcon("brain-circuit", __iconNode92);

// ../../node_modules/@lucide/vue/dist/esm/icons/brain-cog.mjs
var __iconNode93 = [
  ["path", { d: "m10.852 14.772-.383.923", key: "11vil6" }],
  ["path", { d: "m10.852 9.228-.383-.923", key: "1fjppe" }],
  ["path", { d: "m13.148 14.772.382.924", key: "je3va1" }],
  ["path", { d: "m13.531 8.305-.383.923", key: "18epck" }],
  ["path", { d: "m14.772 10.852.923-.383", key: "k9m8cz" }],
  ["path", { d: "m14.772 13.148.923.383", key: "1xvhww" }],
  [
    "path",
    {
      d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771",
      key: "jcbbz1"
    }
  ],
  ["path", { d: "M17.998 5.125a4 4 0 0 1 2.525 5.771", key: "1kkn7e" }],
  ["path", { d: "M19.505 10.294a4 4 0 0 1-1.5 7.706", key: "18bmuc" }],
  [
    "path",
    {
      d: "M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516",
      key: "uozx0d"
    }
  ],
  ["path", { d: "M4.5 10.291A4 4 0 0 0 6 18", key: "whdemb" }],
  ["path", { d: "M6.002 5.125a3 3 0 0 0 .4 1.375", key: "1kqy2g" }],
  ["path", { d: "m9.228 10.852-.923-.383", key: "1wtb30" }],
  ["path", { d: "m9.228 13.148-.923.383", key: "1a830x" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
var BrainCog = createLucideIcon("brain-cog", __iconNode93);

// ../../node_modules/@lucide/vue/dist/esm/icons/brick-wall.mjs
var __iconNode94 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M12 9v6", key: "199k2o" }],
  ["path", { d: "M16 15v6", key: "8rj2es" }],
  ["path", { d: "M16 3v6", key: "1j6rpj" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M8 15v6", key: "1stoo3" }],
  ["path", { d: "M8 3v6", key: "vlvjmk" }]
];
var BrickWall = createLucideIcon("brick-wall", __iconNode94);

// ../../node_modules/@lucide/vue/dist/esm/icons/briefcase.mjs
var __iconNode95 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
var Briefcase = createLucideIcon("briefcase", __iconNode95);

// ../../node_modules/@lucide/vue/dist/esm/icons/brush.mjs
var __iconNode96 = [
  ["path", { d: "m11 10 3 3", key: "fzmg1i" }],
  [
    "path",
    { d: "M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z", key: "p4q2r7" }
  ],
  ["path", { d: "M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031", key: "wy6l02" }]
];
var Brush = createLucideIcon("brush", __iconNode96);

// ../../node_modules/@lucide/vue/dist/esm/icons/brush-cleaning.mjs
var __iconNode97 = [
  ["path", { d: "m16 22-1-4", key: "1ow2iv" }],
  [
    "path",
    {
      d: "M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1",
      key: "11gii7"
    }
  ],
  ["path", { d: "M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z", key: "bju7h4" }],
  ["path", { d: "m8 22 1-4", key: "s3unb" }]
];
var BrushCleaning = createLucideIcon("brush-cleaning", __iconNode97);

// ../../node_modules/@lucide/vue/dist/esm/icons/bug.mjs
var __iconNode98 = [
  ["path", { d: "M12 20v-9", key: "1qisl0" }],
  ["path", { d: "M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z", key: "uouzyp" }],
  ["path", { d: "M14.12 3.88 16 2", key: "qol33r" }],
  ["path", { d: "M21 21a4 4 0 0 0-3.81-4", key: "1b0z45" }],
  ["path", { d: "M21 5a4 4 0 0 1-3.55 3.97", key: "5cxbf6" }],
  ["path", { d: "M22 13h-4", key: "1jl80f" }],
  ["path", { d: "M3 21a4 4 0 0 1 3.81-4", key: "1fjd4g" }],
  ["path", { d: "M3 5a4 4 0 0 0 3.55 3.97", key: "1d7oge" }],
  ["path", { d: "M6 13H2", key: "82j7cp" }],
  ["path", { d: "m8 2 1.88 1.88", key: "fmnt4t" }],
  ["path", { d: "M9 7.13V6a3 3 0 1 1 6 0v1.13", key: "1vgav8" }]
];
var Bug = createLucideIcon("bug", __iconNode98);

// ../../node_modules/@lucide/vue/dist/esm/icons/bug-off.mjs
var __iconNode99 = [
  ["path", { d: "M12 20v-8", key: "i3yub9" }],
  ["path", { d: "M12.656 7H14a4 4 0 0 1 4 4v1.344", key: "vvueyn" }],
  ["path", { d: "M14.12 3.88 16 2", key: "qol33r" }],
  ["path", { d: "M17.123 17.123A6 6 0 0 1 6 14v-3a4 4 0 0 1 1.72-3.287", key: "1cu21y" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M21 5a4 4 0 0 1-3.55 3.97", key: "5cxbf6" }],
  ["path", { d: "M22 13h-3.344", key: "qb08am" }],
  ["path", { d: "M3 21a4 4 0 0 1 3.81-4", key: "1fjd4g" }],
  ["path", { d: "M3 5a4 4 0 0 0 3.55 3.97", key: "1d7oge" }],
  ["path", { d: "M6 13H2", key: "82j7cp" }],
  ["path", { d: "m8 2 1.88 1.88", key: "fmnt4t" }],
  ["path", { d: "M9.712 4.06A3 3 0 0 1 15 6v1.13", key: "1bvup6" }]
];
var BugOff = createLucideIcon("bug-off", __iconNode99);

// ../../node_modules/@lucide/vue/dist/esm/icons/bug-play.mjs
var __iconNode100 = [
  ["path", { d: "M10 19.655A6 6 0 0 1 6 14v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 3.97", key: "1gnv52" }],
  [
    "path",
    {
      d: "M14 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z",
      key: "1weqy9"
    }
  ],
  ["path", { d: "M14.12 3.88 16 2", key: "qol33r" }],
  ["path", { d: "M21 5a4 4 0 0 1-3.55 3.97", key: "5cxbf6" }],
  ["path", { d: "M3 21a4 4 0 0 1 3.81-4", key: "1fjd4g" }],
  ["path", { d: "M3 5a4 4 0 0 0 3.55 3.97", key: "1d7oge" }],
  ["path", { d: "M6 13H2", key: "82j7cp" }],
  ["path", { d: "m8 2 1.88 1.88", key: "fmnt4t" }],
  ["path", { d: "M9 7.13V6a3 3 0 1 1 6 0v1.13", key: "1vgav8" }]
];
var BugPlay = createLucideIcon("bug-play", __iconNode100);

// ../../node_modules/@lucide/vue/dist/esm/icons/building.mjs
var __iconNode101 = [
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M12 6h.01", key: "1vi96p" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M16 6h.01", key: "1x0f13" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M8 6h.01", key: "1dz90k" }],
  ["path", { d: "M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3", key: "cabbwy" }],
  ["rect", { x: "4", y: "2", width: "16", height: "20", rx: "2", key: "1uxh74" }]
];
var Building = createLucideIcon("building", __iconNode101);

// ../../node_modules/@lucide/vue/dist/esm/icons/building-2.mjs
var __iconNode102 = [
  ["path", { d: "M10 12h4", key: "a56b0p" }],
  ["path", { d: "M10 8h4", key: "1sr2af" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  [
    "path",
    {
      d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
      key: "secmi2"
    }
  ],
  ["path", { d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16", key: "16ra0t" }]
];
var Building2 = createLucideIcon("building-2", __iconNode102);

// ../../node_modules/@lucide/vue/dist/esm/icons/bus.mjs
var __iconNode103 = [
  ["path", { d: "M8 6v6", key: "18i7km" }],
  ["path", { d: "M15 6v6", key: "1sg6z9" }],
  ["path", { d: "M2 12h19.6", key: "de5uta" }],
  [
    "path",
    {
      d: "M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3",
      key: "1wwztk"
    }
  ],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }],
  ["path", { d: "M9 18h5", key: "lrx6i" }],
  ["circle", { cx: "16", cy: "18", r: "2", key: "1v4tcr" }]
];
var Bus = createLucideIcon("bus", __iconNode103);

// ../../node_modules/@lucide/vue/dist/esm/icons/bus-front.mjs
var __iconNode104 = [
  ["path", { d: "M4 6 2 7", key: "1mqr15" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "m22 7-2-1", key: "1umjhc" }],
  ["rect", { width: "16", height: "16", x: "4", y: "3", rx: "2", key: "1wxw4b" }],
  ["path", { d: "M4 11h16", key: "mpoxn0" }],
  ["path", { d: "M8 15h.01", key: "a7atzg" }],
  ["path", { d: "M16 15h.01", key: "rnfrdf" }],
  ["path", { d: "M6 19v2", key: "1loha6" }],
  ["path", { d: "M18 21v-2", key: "sqyl04" }]
];
var BusFront = createLucideIcon("bus-front", __iconNode104);

// ../../node_modules/@lucide/vue/dist/esm/icons/cake.mjs
var __iconNode105 = [
  ["path", { d: "M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8", key: "1w3rig" }],
  ["path", { d: "M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1", key: "n2jgmb" }],
  ["path", { d: "M2 21h20", key: "1nyx9w" }],
  ["path", { d: "M7 8v3", key: "1qtyvj" }],
  ["path", { d: "M12 8v3", key: "hwp4zt" }],
  ["path", { d: "M17 8v3", key: "1i6e5u" }],
  ["path", { d: "M7 4h.01", key: "1bh4kh" }],
  ["path", { d: "M12 4h.01", key: "1ujb9j" }],
  ["path", { d: "M17 4h.01", key: "1upcoc" }]
];
var Cake = createLucideIcon("cake", __iconNode105);

// ../../node_modules/@lucide/vue/dist/esm/icons/cake-slice.mjs
var __iconNode106 = [
  ["path", { d: "M16 13H3", key: "1wpj08" }],
  ["path", { d: "M16 17H3", key: "3lvfcd" }],
  [
    "path",
    {
      d: "m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6",
      key: "1gmhf7"
    }
  ],
  ["circle", { cx: "9", cy: "7", r: "2", key: "1305pl" }]
];
var CakeSlice = createLucideIcon("cake-slice", __iconNode106);

// ../../node_modules/@lucide/vue/dist/esm/icons/calendar.mjs
var __iconNode107 = [
  ["path", { d: "M8 2v3", key: "1ioesn" }],
  ["path", { d: "M16 2v3", key: "otl347" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }],
  ["path", { d: "M3 9h18", key: "1pudct" }]
];
var Calendar = createLucideIcon("calendar", __iconNode107);

// ../../node_modules/@lucide/vue/dist/esm/icons/calendar-check.mjs
var __iconNode108 = [
  ["path", { d: "M8 2v3", key: "1ioesn" }],
  ["path", { d: "M16 2v3", key: "otl347" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "m9 15 2 2 4-4", key: "1grp1n" }]
];
var CalendarCheck = createLucideIcon("calendar-check", __iconNode108);

// ../../node_modules/@lucide/vue/dist/esm/icons/calendar-clock.mjs
var __iconNode109 = [
  ["path", { d: "M16 14v2.2l1.6 1", key: "fo4ql5" }],
  ["path", { d: "M16 2v3", key: "otl347" }],
  ["path", { d: "M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338", key: "7hb8p4" }],
  ["path", { d: "M3 9h5.859", key: "numkqi" }],
  ["path", { d: "M8 2v3", key: "1ioesn" }],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
];
var CalendarClock = createLucideIcon("calendar-clock", __iconNode109);

// ../../node_modules/@lucide/vue/dist/esm/icons/calendar-days.mjs
var __iconNode110 = [
  ["path", { d: "M8 2v3", key: "1ioesn" }],
  ["path", { d: "M16 2v3", key: "otl347" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M8 13h.01", key: "1sbv64" }],
  ["path", { d: "M12 13h.01", key: "y0uutt" }],
  ["path", { d: "M16 13h.01", key: "wip0gl" }],
  ["path", { d: "M8 17h.01", key: "p3bg7i" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }],
  ["path", { d: "M16 17h.01", key: "ql8jdd" }]
];
var CalendarDays = createLucideIcon("calendar-days", __iconNode110);

// ../../node_modules/@lucide/vue/dist/esm/icons/calendar-heart.mjs
var __iconNode111 = [
  ["path", { d: "M12.127 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v5.125", key: "1fsxpc" }],
  [
    "path",
    {
      d: "M14.62 17.8A2.25 2.25 0 1118 14.836a2.25 2.25 0 113.38 2.966l-2.626 2.856a.998.998 0 01-1.507 0z",
      key: "1gk3ue"
    }
  ],
  ["path", { d: "M16 2v3", key: "otl347" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M8 2v3", key: "1ioesn" }]
];
var CalendarHeart = createLucideIcon("calendar-heart", __iconNode111);

// ../../node_modules/@lucide/vue/dist/esm/icons/calendar-minus.mjs
var __iconNode112 = [
  ["path", { d: "M16 18h6", key: "987eiv" }],
  ["path", { d: "M16 2v3", key: "otl347" }],
  ["path", { d: "M21 14V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h8.3", key: "gcu0od" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M8 2v3", key: "1ioesn" }]
];
var CalendarMinus = createLucideIcon("calendar-minus", __iconNode112);

// ../../node_modules/@lucide/vue/dist/esm/icons/calendar-plus.mjs
var __iconNode113 = [
  ["path", { d: "M16 18h6", key: "987eiv" }],
  ["path", { d: "M16 2v3", key: "otl347" }],
  ["path", { d: "M19 15v6", key: "10aioa" }],
  ["path", { d: "M21 11.5V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h8.3", key: "jgwkxf" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M8 2v3", key: "1ioesn" }]
];
var CalendarPlus = createLucideIcon("calendar-plus", __iconNode113);

// ../../node_modules/@lucide/vue/dist/esm/icons/calendar-range.mjs
var __iconNode114 = [
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }],
  ["path", { d: "M16 2v3", key: "otl347" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M8 2v3", key: "1ioesn" }],
  ["path", { d: "M17 13h-6", key: "1qbiup" }],
  ["path", { d: "M13 17H7", key: "1x38vv" }],
  ["path", { d: "M7 13h.01", key: "1vezk1" }],
  ["path", { d: "M17 17h.01", key: "1sd3ek" }]
];
var CalendarRange = createLucideIcon("calendar-range", __iconNode114);

// ../../node_modules/@lucide/vue/dist/esm/icons/calendar-search.mjs
var __iconNode115 = [
  ["path", { d: "M16 2v3", key: "otl347" }],
  ["path", { d: "M21 10.69V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h7.25", key: "h6gkkz" }],
  ["path", { d: "m22 21-1.875-1.875", key: "1dzjql" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M8 2v3", key: "1ioesn" }],
  ["circle", { cx: "18", cy: "17", r: "3", key: "1hty4x" }]
];
var CalendarSearch = createLucideIcon("calendar-search", __iconNode115);

// ../../node_modules/@lucide/vue/dist/esm/icons/calendar-x.mjs
var __iconNode116 = [
  ["path", { d: "M8 2v3", key: "1ioesn" }],
  ["path", { d: "M16 2v3", key: "otl347" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "m14 13-4 4", key: "1gib57" }],
  ["path", { d: "m10 13 4 4", key: "153uiq" }]
];
var CalendarX = createLucideIcon("calendar-x", __iconNode116);

// ../../node_modules/@lucide/vue/dist/esm/icons/camera.mjs
var __iconNode117 = [
  [
    "path",
    {
      d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
      key: "18u6gg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
var Camera = createLucideIcon("camera", __iconNode117);

// ../../node_modules/@lucide/vue/dist/esm/icons/candy.mjs
var __iconNode118 = [
  ["path", { d: "M10 7v10.9", key: "1gynux" }],
  ["path", { d: "M14 6.1V17", key: "116kdf" }],
  [
    "path",
    {
      d: "M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4",
      key: "gpb6xx"
    }
  ],
  [
    "path",
    {
      d: "M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07",
      key: "1tsln4"
    }
  ],
  [
    "path",
    {
      d: "M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4",
      key: "qexcha"
    }
  ]
];
var Candy = createLucideIcon("candy", __iconNode118);

// ../../node_modules/@lucide/vue/dist/esm/icons/candy-cane.mjs
var __iconNode119 = [
  ["path", { d: "m10.8 5 2.111 4.223", key: "11kb8w" }],
  ["path", { d: "M17.75 7 15 2.1", key: "12x7e8" }],
  ["path", { d: "m4.874 14.647 2.12 4.24", key: "ccpt4b" }],
  [
    "path",
    {
      d: "M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2z",
      key: "u5e8z4"
    }
  ],
  ["path", { d: "m7.906 9.712 2.005 4.411", key: "1k0qph" }]
];
var CandyCane = createLucideIcon("candy-cane", __iconNode119);

// ../../node_modules/@lucide/vue/dist/esm/icons/car.mjs
var __iconNode120 = [
  [
    "path",
    {
      d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",
      key: "5owen"
    }
  ],
  ["circle", { cx: "7", cy: "17", r: "2", key: "u2ysq9" }],
  ["path", { d: "M9 17h6", key: "r8uit2" }],
  ["circle", { cx: "17", cy: "17", r: "2", key: "axvx0g" }]
];
var Car = createLucideIcon("car", __iconNode120);

// ../../node_modules/@lucide/vue/dist/esm/icons/car-front.mjs
var __iconNode121 = [
  [
    "path",
    { d: "m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8", key: "1imjwt" }
  ],
  ["path", { d: "M7 14h.01", key: "1qa3f1" }],
  ["path", { d: "M17 14h.01", key: "7oqj8z" }],
  ["rect", { width: "18", height: "8", x: "3", y: "10", rx: "2", key: "a7itu8" }],
  ["path", { d: "M5 18v2", key: "ppbyun" }],
  ["path", { d: "M19 18v2", key: "gy7782" }]
];
var CarFront = createLucideIcon("car-front", __iconNode121);

// ../../node_modules/@lucide/vue/dist/esm/icons/car-taxi-front.mjs
var __iconNode122 = [
  ["path", { d: "M10 2h4", key: "n1abiw" }],
  [
    "path",
    { d: "m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8", key: "1imjwt" }
  ],
  ["path", { d: "M7 14h.01", key: "1qa3f1" }],
  ["path", { d: "M17 14h.01", key: "7oqj8z" }],
  ["rect", { width: "18", height: "8", x: "3", y: "10", rx: "2", key: "a7itu8" }],
  ["path", { d: "M5 18v2", key: "ppbyun" }],
  ["path", { d: "M19 18v2", key: "gy7782" }]
];
var CarTaxiFront = createLucideIcon("car-taxi-front", __iconNode122);

// ../../node_modules/@lucide/vue/dist/esm/icons/carrot.mjs
var __iconNode123 = [
  [
    "path",
    {
      d: "M15 16a1 1 0 0 0-7-7q-4 4-5.987 12.385a.5.5 0 0 0 .602.602Q11 20 15 16l-3-3",
      key: "1ta62j"
    }
  ],
  ["path", { d: "M15 9q4 4 7 0-3-4-7 0 4-4 0-7-4 3 0 7", key: "1svf7i" }],
  ["path", { d: "m8 15-2.58-2.58", key: "7t238r" }]
];
var Carrot = createLucideIcon("carrot", __iconNode123);

// ../../node_modules/@lucide/vue/dist/esm/icons/case-lower.mjs
var __iconNode124 = [
  ["path", { d: "M10 9v7", key: "ylp826" }],
  ["path", { d: "M14 6v10", key: "1jy4vg" }],
  ["circle", { cx: "17.5", cy: "12.5", r: "3.5", key: "1a9481" }],
  ["circle", { cx: "6.5", cy: "12.5", r: "3.5", key: "2jlv1r" }]
];
var CaseLower = createLucideIcon("case-lower", __iconNode124);

// ../../node_modules/@lucide/vue/dist/esm/icons/case-sensitive.mjs
var __iconNode125 = [
  ["path", { d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16", key: "d5nyq2" }],
  ["path", { d: "M22 9v7", key: "pvm9v3" }],
  ["path", { d: "M3.304 13h6.392", key: "1q3zxz" }],
  ["circle", { cx: "18.5", cy: "12.5", r: "3.5", key: "z97x68" }]
];
var CaseSensitive = createLucideIcon("case-sensitive", __iconNode125);

// ../../node_modules/@lucide/vue/dist/esm/icons/case-upper.mjs
var __iconNode126 = [
  [
    "path",
    {
      d: "M15 11h4.5a1 1 0 0 1 0 5h-4a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h3a1 1 0 0 1 0 5",
      key: "nxs35"
    }
  ],
  ["path", { d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16", key: "d5nyq2" }],
  ["path", { d: "M3.304 13h6.392", key: "1q3zxz" }]
];
var CaseUpper = createLucideIcon("case-upper", __iconNode126);

// ../../node_modules/@lucide/vue/dist/esm/icons/cast.mjs
var __iconNode127 = [
  ["path", { d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6", key: "3zrzxg" }],
  ["path", { d: "M2 12a9 9 0 0 1 8 8", key: "g6cvee" }],
  ["path", { d: "M2 16a5 5 0 0 1 4 4", key: "1y1dii" }],
  ["line", { x1: "2", x2: "2.01", y1: "20", y2: "20", key: "xu2jvo" }]
];
var Cast = createLucideIcon("cast", __iconNode127);

// ../../node_modules/@lucide/vue/dist/esm/icons/castle.mjs
var __iconNode128 = [
  ["path", { d: "M10 5V3", key: "1y54qe" }],
  ["path", { d: "M14 5V3", key: "m6isi" }],
  ["path", { d: "M15 21v-3a3 3 0 0 0-6 0v3", key: "lbp5hj" }],
  ["path", { d: "M18 3v8", key: "2ollhf" }],
  ["path", { d: "M18 5H6", key: "98imr9" }],
  ["path", { d: "M22 11H2", key: "1lmjae" }],
  ["path", { d: "M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9", key: "1rly83" }],
  ["path", { d: "M6 3v8", key: "csox7g" }]
];
var Castle = createLucideIcon("castle", __iconNode128);

// ../../node_modules/@lucide/vue/dist/esm/icons/cat.mjs
var __iconNode129 = [
  [
    "path",
    {
      d: "M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z",
      key: "x6xyqk"
    }
  ],
  ["path", { d: "M8 14v.5", key: "1nzgdb" }],
  ["path", { d: "M16 14v.5", key: "1lajdz" }],
  ["path", { d: "M11.25 16.25h1.5L12 17l-.75-.75Z", key: "12kq1m" }]
];
var Cat = createLucideIcon("cat", __iconNode129);

// ../../node_modules/@lucide/vue/dist/esm/icons/check.mjs
var __iconNode130 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
var Check = createLucideIcon("check", __iconNode130);

// ../../node_modules/@lucide/vue/dist/esm/icons/circle-check-big.mjs
var __iconNode131 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
var CircleCheckBig = createLucideIcon("circle-check-big", __iconNode131);

// ../../node_modules/@lucide/vue/dist/esm/icons/chef-hat.mjs
var __iconNode132 = [
  [
    "path",
    {
      d: "M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z",
      key: "1qvrer"
    }
  ],
  ["path", { d: "M6 17h12", key: "1jwigz" }]
];
var ChefHat = createLucideIcon("chef-hat", __iconNode132);

// ../../node_modules/@lucide/vue/dist/esm/icons/cherry.mjs
var __iconNode133 = [
  ["path", { d: "M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z", key: "cvxqlc" }],
  ["path", { d: "M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z", key: "1ostrc" }],
  ["path", { d: "M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12", key: "hqx58h" }],
  ["path", { d: "M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z", key: "eykp1o" }]
];
var Cherry = createLucideIcon("cherry", __iconNode133);

// ../../node_modules/@lucide/vue/dist/esm/icons/chevron-down.mjs
var __iconNode134 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
var ChevronDown = createLucideIcon("chevron-down", __iconNode134);

// ../../node_modules/@lucide/vue/dist/esm/icons/chevron-left.mjs
var __iconNode135 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
var ChevronLeft = createLucideIcon("chevron-left", __iconNode135);

// ../../node_modules/@lucide/vue/dist/esm/icons/chevron-right.mjs
var __iconNode136 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
var ChevronRight = createLucideIcon("chevron-right", __iconNode136);

// ../../node_modules/@lucide/vue/dist/esm/icons/chevron-up.mjs
var __iconNode137 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
var ChevronUp = createLucideIcon("chevron-up", __iconNode137);

// ../../node_modules/@lucide/vue/dist/esm/icons/chevrons-left.mjs
var __iconNode138 = [
  ["path", { d: "m11 17-5-5 5-5", key: "13zhaf" }],
  ["path", { d: "m18 17-5-5 5-5", key: "h8a8et" }]
];
var ChevronsLeft = createLucideIcon("chevrons-left", __iconNode138);

// ../../node_modules/@lucide/vue/dist/esm/icons/chevrons-right.mjs
var __iconNode139 = [
  ["path", { d: "m6 17 5-5-5-5", key: "xnjwq" }],
  ["path", { d: "m13 17 5-5-5-5", key: "17xmmf" }]
];
var ChevronsRight = createLucideIcon("chevrons-right", __iconNode139);

// ../../node_modules/@lucide/vue/dist/esm/icons/church.mjs
var __iconNode140 = [
  ["path", { d: "M10 9h4", key: "u4k05v" }],
  ["path", { d: "M12 7v5", key: "ma6bk" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  [
    "path",
    {
      d: "m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9",
      key: "flvdwo"
    }
  ],
  [
    "path",
    {
      d: "M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14",
      key: "a5i0n2"
    }
  ]
];
var Church = createLucideIcon("church", __iconNode140);

// ../../node_modules/@lucide/vue/dist/esm/icons/cigarette.mjs
var __iconNode141 = [
  ["path", { d: "M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14", key: "1mb5g1" }],
  ["path", { d: "M18 8c0-2.5-2-2.5-2-5", key: "1il607" }],
  ["path", { d: "M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1", key: "1yl5r7" }],
  ["path", { d: "M22 8c0-2.5-2-2.5-2-5", key: "1gah44" }],
  ["path", { d: "M7 12v4", key: "jqww69" }]
];
var Cigarette = createLucideIcon("cigarette", __iconNode141);

// ../../node_modules/@lucide/vue/dist/esm/icons/cigarette-off.mjs
var __iconNode142 = [
  ["path", { d: "M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13", key: "1gdiyg" }],
  ["path", { d: "M18 8c0-2.5-2-2.5-2-5", key: "1il607" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866", key: "166zjj" }],
  ["path", { d: "M22 8c0-2.5-2-2.5-2-5", key: "1gah44" }],
  ["path", { d: "M7 12v4", key: "jqww69" }]
];
var CigaretteOff = createLucideIcon("cigarette-off", __iconNode142);

// ../../node_modules/@lucide/vue/dist/esm/icons/circle.mjs
var __iconNode143 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
var Circle = createLucideIcon("circle", __iconNode143);

// ../../node_modules/@lucide/vue/dist/esm/icons/circle-check.mjs
var __iconNode144 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m16 9-5.5 5.5L8 12", key: "xofnsj" }]
];
var CircleCheck = createLucideIcon("circle-check", __iconNode144);

// ../../node_modules/@lucide/vue/dist/esm/icons/circle-dollar-sign.mjs
var __iconNode145 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }]
];
var CircleDollarSign = createLucideIcon("circle-dollar-sign", __iconNode145);

// ../../node_modules/@lucide/vue/dist/esm/icons/circle-dot.mjs
var __iconNode146 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
var CircleDot = createLucideIcon("circle-dot", __iconNode146);

// ../../node_modules/@lucide/vue/dist/esm/icons/circle-minus.mjs
var __iconNode147 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }]
];
var CircleMinus = createLucideIcon("circle-minus", __iconNode147);

// ../../node_modules/@lucide/vue/dist/esm/icons/circle-off.mjs
var __iconNode148 = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.35 2.69A10 10 0 0 1 21.3 15.65", key: "1pfsoa" }],
  ["path", { d: "M19.08 19.08A10 10 0 1 1 4.92 4.92", key: "1ablyi" }]
];
var CircleOff = createLucideIcon("circle-off", __iconNode148);

// ../../node_modules/@lucide/vue/dist/esm/icons/circle-plus.mjs
var __iconNode149 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
var CirclePlus = createLucideIcon("circle-plus", __iconNode149);

// ../../node_modules/@lucide/vue/dist/esm/icons/circle-x.mjs
var __iconNode150 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
var CircleX = createLucideIcon("circle-x", __iconNode150);

// ../../node_modules/@lucide/vue/dist/esm/icons/circuit-board.mjs
var __iconNode151 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M11 9h4a2 2 0 0 0 2-2V3", key: "1ve2rv" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "M7 21v-4a2 2 0 0 1 2-2h4", key: "1fwkro" }],
  ["circle", { cx: "15", cy: "15", r: "2", key: "3i40o0" }]
];
var CircuitBoard = createLucideIcon("circuit-board", __iconNode151);

// ../../node_modules/@lucide/vue/dist/esm/icons/citrus.mjs
var __iconNode152 = [
  [
    "path",
    {
      d: "M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z",
      key: "4ite01"
    }
  ],
  ["path", { d: "M19.65 15.66A8 8 0 0 1 8.35 4.34", key: "1gxipu" }],
  ["path", { d: "m14 10-5.5 5.5", key: "92pfem" }],
  ["path", { d: "M14 17.85V10H6.15", key: "xqmtsk" }]
];
var Citrus = createLucideIcon("citrus", __iconNode152);

// ../../node_modules/@lucide/vue/dist/esm/icons/clapperboard.mjs
var __iconNode153 = [
  ["path", { d: "m12.296 3.464 3.02 3.956", key: "qash78" }],
  [
    "path",
    { d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z", key: "1h7j8b" }
  ],
  ["path", { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "4lm6w1" }],
  ["path", { d: "m6.18 5.276 3.1 3.899", key: "zjj9t3" }]
];
var Clapperboard = createLucideIcon("clapperboard", __iconNode153);

// ../../node_modules/@lucide/vue/dist/esm/icons/clipboard.mjs
var __iconNode154 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ]
];
var Clipboard = createLucideIcon("clipboard", __iconNode154);

// ../../node_modules/@lucide/vue/dist/esm/icons/clipboard-check.mjs
var __iconNode155 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "m9 14 2 2 4-4", key: "df797q" }]
];
var ClipboardCheck = createLucideIcon("clipboard-check", __iconNode155);

// ../../node_modules/@lucide/vue/dist/esm/icons/clipboard-copy.mjs
var __iconNode156 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2", key: "4jdomd" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v4", key: "3hqy98" }],
  ["path", { d: "M21 14H11", key: "1bme5i" }],
  ["path", { d: "m15 10-4 4 4 4", key: "5dvupr" }]
];
var ClipboardCopy = createLucideIcon("clipboard-copy", __iconNode156);

// ../../node_modules/@lucide/vue/dist/esm/icons/clipboard-list.mjs
var __iconNode157 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
var ClipboardList = createLucideIcon("clipboard-list", __iconNode157);

// ../../node_modules/@lucide/vue/dist/esm/icons/clipboard-paste.mjs
var __iconNode158 = [
  ["path", { d: "M11 14h10", key: "1w8e9d" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v1.344", key: "1e62lh" }],
  ["path", { d: "m17 18 4-4-4-4", key: "z2g111" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113", key: "bjbb7m" }],
  ["rect", { x: "8", y: "2", width: "8", height: "4", rx: "1", key: "ublpy" }]
];
var ClipboardPaste = createLucideIcon("clipboard-paste", __iconNode158);

// ../../node_modules/@lucide/vue/dist/esm/icons/clipboard-x.mjs
var __iconNode159 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "m14.5 11.5-5 5", key: "1eaq8h" }],
  ["path", { d: "m9.5 11.5 5 5", key: "1exjew" }]
];
var ClipboardX = createLucideIcon("clipboard-x", __iconNode159);

// ../../node_modules/@lucide/vue/dist/esm/icons/clock.mjs
var __iconNode160 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
];
var Clock = createLucideIcon("clock", __iconNode160);

// ../../node_modules/@lucide/vue/dist/esm/icons/cloud.mjs
var __iconNode161 = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
];
var Cloud = createLucideIcon("cloud", __iconNode161);

// ../../node_modules/@lucide/vue/dist/esm/icons/cloud-download.mjs
var __iconNode162 = [
  ["path", { d: "M12 13v8l-4-4", key: "1f5nwf" }],
  ["path", { d: "m12 21 4-4", key: "1lfcce" }],
  ["path", { d: "M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284", key: "ui1hmy" }]
];
var CloudDownload = createLucideIcon("cloud-download", __iconNode162);

// ../../node_modules/@lucide/vue/dist/esm/icons/cloud-drizzle.mjs
var __iconNode163 = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M8 19v1", key: "1dk2by" }],
  ["path", { d: "M8 14v1", key: "84yxot" }],
  ["path", { d: "M16 19v1", key: "v220m7" }],
  ["path", { d: "M16 14v1", key: "g12gj6" }],
  ["path", { d: "M12 21v1", key: "q8vafk" }],
  ["path", { d: "M12 16v1", key: "1mx6rx" }]
];
var CloudDrizzle = createLucideIcon("cloud-drizzle", __iconNode163);

// ../../node_modules/@lucide/vue/dist/esm/icons/cloud-fog.mjs
var __iconNode164 = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M16 17H7", key: "pygtm1" }],
  ["path", { d: "M17 21H9", key: "1u2q02" }]
];
var CloudFog = createLucideIcon("cloud-fog", __iconNode164);

// ../../node_modules/@lucide/vue/dist/esm/icons/cloud-hail.mjs
var __iconNode165 = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M16 14v2", key: "a1is7l" }],
  ["path", { d: "M8 14v2", key: "1e9m6t" }],
  ["path", { d: "M16 20h.01", key: "xwek51" }],
  ["path", { d: "M8 20h.01", key: "1vjney" }],
  ["path", { d: "M12 16v2", key: "z66u1j" }],
  ["path", { d: "M12 22h.01", key: "1urd7a" }]
];
var CloudHail = createLucideIcon("cloud-hail", __iconNode165);

// ../../node_modules/@lucide/vue/dist/esm/icons/cloud-lightning.mjs
var __iconNode166 = [
  ["path", { d: "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973", key: "1cez44" }],
  ["path", { d: "m13 12-3 5h4l-3 5", key: "1t22er" }]
];
var CloudLightning = createLucideIcon("cloud-lightning", __iconNode166);

// ../../node_modules/@lucide/vue/dist/esm/icons/cloud-moon.mjs
var __iconNode167 = [
  ["path", { d: "M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z", key: "ie2ih4" }],
  [
    "path",
    {
      d: "M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36",
      key: "zwnc1e"
    }
  ]
];
var CloudMoon = createLucideIcon("cloud-moon", __iconNode167);

// ../../node_modules/@lucide/vue/dist/esm/icons/cloud-off.mjs
var __iconNode168 = [
  ["path", { d: "M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057", key: "1uxyv8" }],
  ["path", { d: "M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78", key: "99tcn7" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
var CloudOff = createLucideIcon("cloud-off", __iconNode168);

// ../../node_modules/@lucide/vue/dist/esm/icons/cloud-rain.mjs
var __iconNode169 = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M16 14v6", key: "1j4efv" }],
  ["path", { d: "M8 14v6", key: "17c4r9" }],
  ["path", { d: "M12 16v6", key: "c8a4gj" }]
];
var CloudRain = createLucideIcon("cloud-rain", __iconNode169);

// ../../node_modules/@lucide/vue/dist/esm/icons/cloud-snow.mjs
var __iconNode170 = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M8 15h.01", key: "a7atzg" }],
  ["path", { d: "M8 19h.01", key: "puxtts" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }],
  ["path", { d: "M12 21h.01", key: "h35vbk" }],
  ["path", { d: "M16 15h.01", key: "rnfrdf" }],
  ["path", { d: "M16 19h.01", key: "1vcnzz" }]
];
var CloudSnow = createLucideIcon("cloud-snow", __iconNode170);

// ../../node_modules/@lucide/vue/dist/esm/icons/cloud-sun.mjs
var __iconNode171 = [
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }],
  ["path", { d: "M15.947 12.65a4 4 0 0 0-5.925-4.128", key: "dpwdj0" }],
  ["path", { d: "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z", key: "s09mg5" }]
];
var CloudSun = createLucideIcon("cloud-sun", __iconNode171);

// ../../node_modules/@lucide/vue/dist/esm/icons/cloud-upload.mjs
var __iconNode172 = [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }]
];
var CloudUpload = createLucideIcon("cloud-upload", __iconNode172);

// ../../node_modules/@lucide/vue/dist/esm/icons/club.mjs
var __iconNode173 = [
  [
    "path",
    {
      d: "M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z",
      key: "27yuqz"
    }
  ],
  ["path", { d: "M12 17.66L12 22", key: "ogfahf" }]
];
var Club = createLucideIcon("club", __iconNode173);

// ../../node_modules/@lucide/vue/dist/esm/icons/code.mjs
var __iconNode174 = [
  ["path", { d: "m16 18 6-6-6-6", key: "eg8j8" }],
  ["path", { d: "m8 6-6 6 6 6", key: "ppft3o" }]
];
var Code = createLucideIcon("code", __iconNode174);

// ../../node_modules/@lucide/vue/dist/esm/icons/coffee.mjs
var __iconNode175 = [
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M14 2v2", key: "6buw04" }],
  [
    "path",
    {
      d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
      key: "pwadti"
    }
  ],
  ["path", { d: "M6 2v2", key: "colzsn" }]
];
var Coffee = createLucideIcon("coffee", __iconNode175);

// ../../node_modules/@lucide/vue/dist/esm/icons/cog.mjs
var __iconNode176 = [
  ["path", { d: "M11 10.27 7 3.34", key: "16pf9h" }],
  ["path", { d: "m11 13.73-4 6.93", key: "794ttg" }],
  ["path", { d: "M12 22v-2", key: "1osdcq" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M14 12h8", key: "4f43i9" }],
  ["path", { d: "m17 20.66-1-1.73", key: "eq3orb" }],
  ["path", { d: "m17 3.34-1 1.73", key: "2wel8s" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "m20.66 17-1.73-1", key: "sg0v6f" }],
  ["path", { d: "m20.66 7-1.73 1", key: "1ow05n" }],
  ["path", { d: "m3.34 17 1.73-1", key: "nuk764" }],
  ["path", { d: "m3.34 7 1.73 1", key: "1ulond" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["circle", { cx: "12", cy: "12", r: "8", key: "46899m" }]
];
var Cog = createLucideIcon("cog", __iconNode176);

// ../../node_modules/@lucide/vue/dist/esm/icons/columns-2.mjs
var __iconNode177 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M12 3v18", key: "108xh3" }]
];
var Columns2 = createLucideIcon("columns-2", __iconNode177);

// ../../node_modules/@lucide/vue/dist/esm/icons/columns-3.mjs
var __iconNode178 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
];
var Columns3 = createLucideIcon("columns-3", __iconNode178);

// ../../node_modules/@lucide/vue/dist/esm/icons/columns-4.mjs
var __iconNode179 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7.5 3v18", key: "w0wo6v" }],
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["path", { d: "M16.5 3v18", key: "10tjh1" }]
];
var Columns4 = createLucideIcon("columns-4", __iconNode179);

// ../../node_modules/@lucide/vue/dist/esm/icons/combine.mjs
var __iconNode180 = [
  ["path", { d: "M14 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1", key: "1l7d7l" }],
  ["path", { d: "M19 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1", key: "9955pe" }],
  ["path", { d: "m7 15 3 3", key: "4hkfgk" }],
  ["path", { d: "m7 21 3-3H5a2 2 0 0 1-2-2v-2", key: "1xljwe" }],
  ["rect", { x: "14", y: "14", width: "7", height: "7", rx: "1", key: "1cdgtw" }],
  ["rect", { x: "3", y: "3", width: "7", height: "7", rx: "1", key: "zi3rio" }]
];
var Combine = createLucideIcon("combine", __iconNode180);

// ../../node_modules/@lucide/vue/dist/esm/icons/compass.mjs
var __iconNode181 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  [
    "path",
    {
      d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
      key: "9ktpf1"
    }
  ]
];
var Compass = createLucideIcon("compass", __iconNode181);

// ../../node_modules/@lucide/vue/dist/esm/icons/component.mjs
var __iconNode182 = [
  [
    "path",
    {
      d: "M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z",
      key: "1uwlt4"
    }
  ],
  [
    "path",
    {
      d: "M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z",
      key: "10291m"
    }
  ],
  [
    "path",
    {
      d: "M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z",
      key: "1tqoq1"
    }
  ],
  [
    "path",
    {
      d: "M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z",
      key: "1x6lto"
    }
  ]
];
var Component = createLucideIcon("component", __iconNode182);

// ../../node_modules/@lucide/vue/dist/esm/icons/construction.mjs
var __iconNode183 = [
  ["rect", { x: "2", y: "6", width: "20", height: "8", rx: "1", key: "1estib" }],
  ["path", { d: "M17 14v7", key: "7m2elx" }],
  ["path", { d: "M7 14v7", key: "1cm7wv" }],
  ["path", { d: "M17 3v3", key: "1v4jwn" }],
  ["path", { d: "M7 3v3", key: "7o6guu" }],
  ["path", { d: "M10 14 2.3 6.3", key: "1023jk" }],
  ["path", { d: "m14 6 7.7 7.7", key: "1s8pl2" }],
  ["path", { d: "m8 6 8 8", key: "hl96qh" }]
];
var Construction = createLucideIcon("construction", __iconNode183);

// ../../node_modules/@lucide/vue/dist/esm/icons/contact.mjs
var __iconNode184 = [
  ["path", { d: "M16 2v2", key: "scm5qe" }],
  ["path", { d: "M7 21v-2a2 2 0 012-2h6a2 2 0 012 2v2", key: "k82dct" }],
  ["path", { d: "M8 2v2", key: "pbkmx" }],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }]
];
var Contact = createLucideIcon("contact", __iconNode184);

// ../../node_modules/@lucide/vue/dist/esm/icons/contact-round.mjs
var __iconNode185 = [
  ["path", { d: "M16 2v2", key: "scm5qe" }],
  ["path", { d: "M17.915 21a6 6 0 10-12 0", key: "13n4mv" }],
  ["path", { d: "M8 2v2", key: "pbkmx" }],
  ["circle", { cx: "12", cy: "11", r: "4", key: "1gt34v" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }]
];
var ContactRound = createLucideIcon("contact-round", __iconNode185);

// ../../node_modules/@lucide/vue/dist/esm/icons/container.mjs
var __iconNode186 = [
  [
    "path",
    {
      d: "M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z",
      key: "1t2lqe"
    }
  ],
  ["path", { d: "M10 21.9V14L2.1 9.1", key: "o7czzq" }],
  ["path", { d: "m10 14 11.9-6.9", key: "zm5e20" }],
  ["path", { d: "M14 19.8v-8.1", key: "159ecu" }],
  ["path", { d: "M18 17.5V9.4", key: "11uown" }]
];
var Container = createLucideIcon("container", __iconNode186);

// ../../node_modules/@lucide/vue/dist/esm/icons/contrast.mjs
var __iconNode187 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 18a6 6 0 0 0 0-12v12z", key: "j4l70d" }]
];
var Contrast = createLucideIcon("contrast", __iconNode187);

// ../../node_modules/@lucide/vue/dist/esm/icons/cookie.mjs
var __iconNode188 = [
  ["path", { d: "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5", key: "laymnq" }],
  ["path", { d: "M8.5 8.5v.01", key: "ue8clq" }],
  ["path", { d: "M16 15.5v.01", key: "14dtrp" }],
  ["path", { d: "M12 12v.01", key: "u5ubse" }],
  ["path", { d: "M11 17v.01", key: "1hyl5a" }],
  ["path", { d: "M7 14v.01", key: "uct60s" }]
];
var Cookie = createLucideIcon("cookie", __iconNode188);

// ../../node_modules/@lucide/vue/dist/esm/icons/cooking-pot.mjs
var __iconNode189 = [
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8", key: "u0tga0" }],
  ["path", { d: "m4 8 16-4", key: "16g0ng" }],
  [
    "path",
    {
      d: "m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8",
      key: "12cejc"
    }
  ]
];
var CookingPot = createLucideIcon("cooking-pot", __iconNode189);

// ../../node_modules/@lucide/vue/dist/esm/icons/copy.mjs
var __iconNode190 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
var Copy = createLucideIcon("copy", __iconNode190);

// ../../node_modules/@lucide/vue/dist/esm/icons/cpu.mjs
var __iconNode191 = [
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M17 20v2", key: "1rnc9c" }],
  ["path", { d: "M17 2v2", key: "11trls" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M2 17h2", key: "7oei6x" }],
  ["path", { d: "M2 7h2", key: "asdhe0" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "M20 17h2", key: "1fpfkl" }],
  ["path", { d: "M20 7h2", key: "1o8tra" }],
  ["path", { d: "M7 20v2", key: "4gnj0m" }],
  ["path", { d: "M7 2v2", key: "1i4yhu" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
];
var Cpu = createLucideIcon("cpu", __iconNode191);

// ../../node_modules/@lucide/vue/dist/esm/icons/credit-card.mjs
var __iconNode192 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
var CreditCard = createLucideIcon("credit-card", __iconNode192);

// ../../node_modules/@lucide/vue/dist/esm/icons/crop.mjs
var __iconNode193 = [
  ["path", { d: "M6 2v14a2 2 0 0 0 2 2h14", key: "ron5a4" }],
  ["path", { d: "M18 22V8a2 2 0 0 0-2-2H2", key: "7s9ehn" }]
];
var Crop = createLucideIcon("crop", __iconNode193);

// ../../node_modules/@lucide/vue/dist/esm/icons/cross.mjs
var __iconNode194 = [
  [
    "path",
    {
      d: "M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z",
      key: "1xbrqy"
    }
  ]
];
var Cross = createLucideIcon("cross", __iconNode194);

// ../../node_modules/@lucide/vue/dist/esm/icons/crosshair.mjs
var __iconNode195 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "22", x2: "18", y1: "12", y2: "12", key: "l9bcsi" }],
  ["line", { x1: "6", x2: "2", y1: "12", y2: "12", key: "13hhkx" }],
  ["line", { x1: "12", x2: "12", y1: "6", y2: "2", key: "10w3f3" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "18", key: "15g9kq" }]
];
var Crosshair = createLucideIcon("crosshair", __iconNode195);

// ../../node_modules/@lucide/vue/dist/esm/icons/crown.mjs
var __iconNode196 = [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
var Crown = createLucideIcon("crown", __iconNode196);

// ../../node_modules/@lucide/vue/dist/esm/icons/database.mjs
var __iconNode197 = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
var Database = createLucideIcon("database", __iconNode197);

// ../../node_modules/@lucide/vue/dist/esm/icons/diamond.mjs
var __iconNode198 = [
  [
    "path",
    {
      d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z",
      key: "1f1r0c"
    }
  ]
];
var Diamond = createLucideIcon("diamond", __iconNode198);

// ../../node_modules/@lucide/vue/dist/esm/icons/disc.mjs
var __iconNode199 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
var Disc = createLucideIcon("disc", __iconNode199);

// ../../node_modules/@lucide/vue/dist/esm/icons/disc-2.mjs
var __iconNode200 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }]
];
var Disc2 = createLucideIcon("disc-2", __iconNode200);

// ../../node_modules/@lucide/vue/dist/esm/icons/dna.mjs
var __iconNode201 = [
  ["path", { d: "m10 16 1.5 1.5", key: "11lckj" }],
  ["path", { d: "m14 8-1.5-1.5", key: "1ohn8i" }],
  ["path", { d: "M15 2c-1.798 1.998-2.518 3.995-2.807 5.993", key: "80uv8i" }],
  ["path", { d: "m16.5 10.5 1 1", key: "696xn5" }],
  ["path", { d: "m17 6-2.891-2.891", key: "xu6p2f" }],
  ["path", { d: "M2 15c6.667-6 13.333 0 20-6", key: "1pyr53" }],
  ["path", { d: "m20 9 .891.891", key: "3xwk7g" }],
  ["path", { d: "M3.109 14.109 4 15", key: "q76aoh" }],
  ["path", { d: "m6.5 12.5 1 1", key: "cs35ky" }],
  ["path", { d: "m7 18 2.891 2.891", key: "1sisit" }],
  ["path", { d: "M9 22c1.798-1.998 2.518-3.995 2.807-5.993", key: "q3hbxp" }]
];
var Dna = createLucideIcon("dna", __iconNode201);

// ../../node_modules/@lucide/vue/dist/esm/icons/dog.mjs
var __iconNode202 = [
  ["path", { d: "M11.25 16.25h1.5L12 17z", key: "w7jh35" }],
  ["path", { d: "M16 14v.5", key: "1lajdz" }],
  [
    "path",
    {
      d: "M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309",
      key: "u7s9ue"
    }
  ],
  ["path", { d: "M8 14v.5", key: "1nzgdb" }],
  [
    "path",
    {
      d: "M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5",
      key: "v8hric"
    }
  ]
];
var Dog = createLucideIcon("dog", __iconNode202);

// ../../node_modules/@lucide/vue/dist/esm/icons/dollar-sign.mjs
var __iconNode203 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
var DollarSign = createLucideIcon("dollar-sign", __iconNode203);

// ../../node_modules/@lucide/vue/dist/esm/icons/door-closed.mjs
var __iconNode204 = [
  ["path", { d: "M10 12h.01", key: "1kxr2c" }],
  ["path", { d: "M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14", key: "36qu9e" }],
  ["path", { d: "M2 20h20", key: "owomy5" }]
];
var DoorClosed = createLucideIcon("door-closed", __iconNode204);

// ../../node_modules/@lucide/vue/dist/esm/icons/door-open.mjs
var __iconNode205 = [
  ["path", { d: "M11 20H2", key: "nlcfvz" }],
  [
    "path",
    {
      d: "M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z",
      key: "au4z13"
    }
  ],
  ["path", { d: "M11 4H8a2 2 0 0 0-2 2v14", key: "74r1mk" }],
  ["path", { d: "M14 12h.01", key: "1jfl7z" }],
  ["path", { d: "M22 20h-3", key: "vhrsz" }]
];
var DoorOpen = createLucideIcon("door-open", __iconNode205);

// ../../node_modules/@lucide/vue/dist/esm/icons/download.mjs
var __iconNode206 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
var Download = createLucideIcon("download", __iconNode206);

// ../../node_modules/@lucide/vue/dist/esm/icons/drafting-compass.mjs
var __iconNode207 = [
  ["path", { d: "m12.99 6.74 1.93 3.44", key: "iwagvd" }],
  ["path", { d: "M19.136 12a10 10 0 0 1-14.271 0", key: "ppmlo4" }],
  ["path", { d: "m21 21-2.16-3.84", key: "vylbct" }],
  ["path", { d: "m3 21 8.02-14.26", key: "1ssaw4" }],
  ["circle", { cx: "12", cy: "5", r: "2", key: "f1ur92" }]
];
var DraftingCompass = createLucideIcon("drafting-compass", __iconNode207);

// ../../node_modules/@lucide/vue/dist/esm/icons/droplet.mjs
var __iconNode208 = [
  [
    "path",
    {
      d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
      key: "c7niix"
    }
  ]
];
var Droplet = createLucideIcon("droplet", __iconNode208);

// ../../node_modules/@lucide/vue/dist/esm/icons/droplets.mjs
var __iconNode209 = [
  [
    "path",
    {
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz"
    }
  ]
];
var Droplets = createLucideIcon("droplets", __iconNode209);

// ../../node_modules/@lucide/vue/dist/esm/icons/ear.mjs
var __iconNode210 = [
  ["path", { d: "M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0", key: "1dfaln" }],
  ["path", { d: "M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4", key: "1qnva7" }]
];
var Ear = createLucideIcon("ear", __iconNode210);

// ../../node_modules/@lucide/vue/dist/esm/icons/ear-off.mjs
var __iconNode211 = [
  ["path", { d: "M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46", key: "1qngmn" }],
  ["path", { d: "M6 8.5c0-.75.13-1.47.36-2.14", key: "b06bma" }],
  ["path", { d: "M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76", key: "g10hsz" }],
  ["path", { d: "M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18", key: "ygzou7" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
];
var EarOff = createLucideIcon("ear-off", __iconNode211);

// ../../node_modules/@lucide/vue/dist/esm/icons/earth.mjs
var __iconNode212 = [
  ["path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54", key: "1djwo0" }],
  [
    "path",
    {
      d: "M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",
      key: "1tzkfa"
    }
  ],
  ["path", { d: "M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05", key: "14pb5j" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
var Earth = createLucideIcon("earth", __iconNode212);

// ../../node_modules/@lucide/vue/dist/esm/icons/eclipse.mjs
var __iconNode213 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a7 7 0 1 0 10 10", key: "1yuj32" }]
];
var Eclipse = createLucideIcon("eclipse", __iconNode213);

// ../../node_modules/@lucide/vue/dist/esm/icons/square-pen.mjs
var __iconNode214 = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
var SquarePen = createLucideIcon("square-pen", __iconNode214);

// ../../node_modules/@lucide/vue/dist/esm/icons/egg.mjs
var __iconNode215 = [
  ["path", { d: "M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12", key: "1le142" }]
];
var Egg = createLucideIcon("egg", __iconNode215);

// ../../node_modules/@lucide/vue/dist/esm/icons/egg-fried.mjs
var __iconNode216 = [
  ["circle", { cx: "11.5", cy: "12.5", r: "3.5", key: "1cl1mi" }],
  [
    "path",
    {
      d: "M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z",
      key: "165ef9"
    }
  ]
];
var EggFried = createLucideIcon("egg-fried", __iconNode216);

// ../../node_modules/@lucide/vue/dist/esm/icons/eraser.mjs
var __iconNode217 = [
  [
    "path",
    {
      d: "M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21",
      key: "g5wo59"
    }
  ],
  ["path", { d: "m5.082 11.09 8.828 8.828", key: "1wx5vj" }]
];
var Eraser = createLucideIcon("eraser", __iconNode217);

// ../../node_modules/@lucide/vue/dist/esm/icons/ethernet-port.mjs
var __iconNode218 = [
  ["path", { d: "M10 8v1", key: "1talb4" }],
  ["path", { d: "M14 8v1", key: "1rsfgr" }],
  ["path", { d: "M18 8v1", key: "gnkwox" }],
  [
    "path",
    {
      d: "M19 17a2 2 0 00-1.765 1.059l-.47.882A2 2 0 0115 20H9a2 2 0 01-1.765-1.059l-.47-.882A2 2 0 005 17H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v9a2 2 0 01-2 2z",
      key: "v5qa57"
    }
  ],
  ["path", { d: "M6 8v1", key: "1636ez" }]
];
var EthernetPort = createLucideIcon("ethernet-port", __iconNode218);

// ../../node_modules/@lucide/vue/dist/esm/icons/euro.mjs
var __iconNode219 = [
  ["path", { d: "M4 10h12", key: "1y6xl8" }],
  ["path", { d: "M4 14h9", key: "1loblj" }],
  [
    "path",
    {
      d: "M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2",
      key: "1j6lzo"
    }
  ]
];
var Euro = createLucideIcon("euro", __iconNode219);

// ../../node_modules/@lucide/vue/dist/esm/icons/ev-charger.mjs
var __iconNode220 = [
  [
    "path",
    { d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5", key: "1wtuz0" }
  ],
  ["path", { d: "M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16", key: "e09ifn" }],
  ["path", { d: "M2 21h13", key: "1x0fut" }],
  ["path", { d: "M3 7h11", key: "19efrr" }],
  ["path", { d: "m9 11-2 3h3l-2 3", key: "lmzxi1" }]
];
var EvCharger = createLucideIcon("ev-charger", __iconNode220);

// ../../node_modules/@lucide/vue/dist/esm/icons/expand.mjs
var __iconNode221 = [
  ["path", { d: "m15 15 6 6", key: "1s409w" }],
  ["path", { d: "m15 9 6-6", key: "ko1vev" }],
  ["path", { d: "M21 16v5h-5", key: "1ck2sf" }],
  ["path", { d: "M21 8V3h-5", key: "1qoq8a" }],
  ["path", { d: "M3 16v5h5", key: "1t08am" }],
  ["path", { d: "m3 21 6-6", key: "wwnumi" }],
  ["path", { d: "M3 8V3h5", key: "1ln10m" }],
  ["path", { d: "M9 9 3 3", key: "v551iv" }]
];
var Expand = createLucideIcon("expand", __iconNode221);

// ../../node_modules/@lucide/vue/dist/esm/icons/external-link.mjs
var __iconNode222 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
var ExternalLink = createLucideIcon("external-link", __iconNode222);

// ../../node_modules/@lucide/vue/dist/esm/icons/eye.mjs
var __iconNode223 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
var Eye = createLucideIcon("eye", __iconNode223);

// ../../node_modules/@lucide/vue/dist/esm/icons/eye-closed.mjs
var __iconNode224 = [
  ["path", { d: "m15 18-.722-3.25", key: "1j64jw" }],
  ["path", { d: "M2 8a10.645 10.645 0 0 0 20 0", key: "1e7gxb" }],
  ["path", { d: "m20 15-1.726-2.05", key: "1cnuld" }],
  ["path", { d: "m4 15 1.726-2.05", key: "1dsqqd" }],
  ["path", { d: "m9 18 .722-3.25", key: "ypw2yx" }]
];
var EyeClosed = createLucideIcon("eye-closed", __iconNode224);

// ../../node_modules/@lucide/vue/dist/esm/icons/eye-off.mjs
var __iconNode225 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
var EyeOff = createLucideIcon("eye-off", __iconNode225);

// ../../node_modules/@lucide/vue/dist/esm/icons/factory.mjs
var __iconNode226 = [
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ["path", { d: "M16 16h.01", key: "1f9h7w" }],
  [
    "path",
    {
      d: "M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z",
      key: "1iv0i2"
    }
  ],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
var Factory = createLucideIcon("factory", __iconNode226);

// ../../node_modules/@lucide/vue/dist/esm/icons/fan.mjs
var __iconNode227 = [
  [
    "path",
    {
      d: "M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z",
      key: "484a7f"
    }
  ],
  ["path", { d: "M12 12v.01", key: "u5ubse" }]
];
var Fan = createLucideIcon("fan", __iconNode227);

// ../../node_modules/@lucide/vue/dist/esm/icons/fence.mjs
var __iconNode228 = [
  ["path", { d: "M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z", key: "1n2rgs" }],
  ["path", { d: "M6 8h4", key: "utf9t1" }],
  ["path", { d: "M6 18h4", key: "12yh4b" }],
  ["path", { d: "m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z", key: "3ha7mj" }],
  ["path", { d: "M14 8h4", key: "1r8wg2" }],
  ["path", { d: "M14 18h4", key: "1t3kbu" }],
  ["path", { d: "m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z", key: "dfd4e2" }]
];
var Fence = createLucideIcon("fence", __iconNode228);

// ../../node_modules/@lucide/vue/dist/esm/icons/file.mjs
var __iconNode229 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }]
];
var File = createLucideIcon("file", __iconNode229);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-headphone.mjs
var __iconNode230 = [
  [
    "path",
    {
      d: "M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343",
      key: "1vfytu"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    {
      d: "M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0",
      key: "1etmh7"
    }
  ]
];
var FileHeadphone = createLucideIcon("file-headphone", __iconNode230);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-box.mjs
var __iconNode231 = [
  ["path", { d: "M14 2v5a1 1 0 001 1h5", key: "9v5fu7" }],
  [
    "path",
    {
      d: "M14.692 22H18a2 2 0 002-2V8a2.4 2.4 0 00-.706-1.706l-3.588-3.588A2.4 2.4 0 0014 2H6a2 2 0 00-2 2v3.804",
      key: "1ne0j7"
    }
  ],
  ["path", { d: "M2.264 13.752 7 16.5l4.737-2.748", key: "t73mg3" }],
  [
    "path",
    {
      d: "M2.995 13.014A2 2 0 002 14.744v3.516a2 2 0 00.996 1.73l3 1.74a2 2 0 002.008 0l3-1.74A2 2 0 0012 18.26v-3.517a2 2 0 00-.995-1.73l-3-1.742a2 2 0 00-1.892-.064z",
      key: "h4qck"
    }
  ],
  ["path", { d: "M7 16.5V22", key: "1i1gou" }]
];
var FileBox = createLucideIcon("file-box", __iconNode231);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-check.mjs
var __iconNode232 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m9 15 2 2 4-4", key: "1grp1n" }]
];
var FileCheck = createLucideIcon("file-check", __iconNode232);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-code.mjs
var __iconNode233 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 12.5 8 15l2 2.5", key: "1tg20x" }],
  ["path", { d: "m14 12.5 2 2.5-2 2.5", key: "yinavb" }]
];
var FileCode = createLucideIcon("file-code", __iconNode233);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-down.mjs
var __iconNode234 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }],
  ["path", { d: "m9 15 3 3 3-3", key: "1npd3o" }]
];
var FileDown = createLucideIcon("file-down", __iconNode234);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-image.mjs
var __iconNode235 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["circle", { cx: "10", cy: "12", r: "2", key: "737tya" }],
  ["path", { d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22", key: "wt3hpn" }]
];
var FileImage = createLucideIcon("file-image", __iconNode235);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-input.mjs
var __iconNode236 = [
  [
    "path",
    {
      d: "M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1",
      key: "1q9hii"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M2 15h10", key: "jfw4w8" }],
  ["path", { d: "m9 18 3-3-3-3", key: "112psh" }]
];
var FileInput = createLucideIcon("file-input", __iconNode236);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-braces.mjs
var __iconNode237 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    { d: "M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1", key: "1oajmo" }
  ],
  [
    "path",
    { d: "M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1", key: "mpwhp6" }
  ]
];
var FileBraces = createLucideIcon("file-braces", __iconNode237);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-minus.mjs
var __iconNode238 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M9 15h6", key: "cctwl0" }]
];
var FileMinus = createLucideIcon("file-minus", __iconNode238);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-output.mjs
var __iconNode239 = [
  [
    "path",
    {
      d: "M4.226 20.925A2 2 0 0 0 6 22h12a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.127",
      key: "wfxp4w"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m5 11-3 3", key: "1dgrs4" }],
  ["path", { d: "m5 17-3-3h10", key: "1mvvaf" }]
];
var FileOutput = createLucideIcon("file-output", __iconNode239);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-pen.mjs
var __iconNode240 = [
  [
    "path",
    {
      d: "M12.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v9.34",
      key: "o6klzx"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    {
      d: "M10.378 12.622a1 1 0 0 1 3 3.003L8.36 20.637a2 2 0 0 1-.854.506l-2.867.837a.5.5 0 0 1-.62-.62l.836-2.869a2 2 0 0 1 .506-.853z",
      key: "zhnas1"
    }
  ]
];
var FilePen = createLucideIcon("file-pen", __iconNode240);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-plus.mjs
var __iconNode241 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M9 15h6", key: "cctwl0" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }]
];
var FilePlus = createLucideIcon("file-plus", __iconNode241);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-question-mark.mjs
var __iconNode242 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M12 17h.01", key: "p32p05" }],
  ["path", { d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3", key: "mhlwft" }]
];
var FileQuestionMark = createLucideIcon("file-question-mark", __iconNode242);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-search.mjs
var __iconNode243 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["circle", { cx: "11.5", cy: "14.5", r: "2.5", key: "1bq0ko" }],
  ["path", { d: "M13.3 16.3 15 18", key: "2quom7" }]
];
var FileSearch = createLucideIcon("file-search", __iconNode243);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-pen-line.mjs
var __iconNode244 = [
  [
    "path",
    {
      d: "M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z",
      key: "ukzhwg"
    }
  ],
  ["path", { d: "M14.487 7.858A1 1 0 0 1 14 7V2", key: "1klhew" }],
  [
    "path",
    {
      d: "M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516",
      key: "rxaxab"
    }
  ],
  ["path", { d: "M8 18h1", key: "13wk12" }]
];
var FilePenLine = createLucideIcon("file-pen-line", __iconNode244);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-sliders.mjs
var __iconNode245 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M10 11v2", key: "1s651w" }],
  ["path", { d: "M8 17h8", key: "wh5c61" }],
  ["path", { d: "M14 16v2", key: "12fp5e" }]
];
var FileSliders = createLucideIcon("file-sliders", __iconNode245);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-spreadsheet.mjs
var __iconNode246 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }]
];
var FileSpreadsheet = createLucideIcon("file-spreadsheet", __iconNode246);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-stack.mjs
var __iconNode247 = [
  ["path", { d: "M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1", key: "likhh7" }],
  ["path", { d: "M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1", key: "17ky3x" }],
  [
    "path",
    {
      d: "M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z",
      key: "1hyeo0"
    }
  ]
];
var FileStack = createLucideIcon("file-stack", __iconNode247);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-symlink.mjs
var __iconNode248 = [
  [
    "path",
    {
      d: "M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7",
      key: "huwfnr"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m10 18 3-3-3-3", key: "18f6ys" }]
];
var FileSymlink = createLucideIcon("file-symlink", __iconNode248);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-text.mjs
var __iconNode249 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
var FileText = createLucideIcon("file-text", __iconNode249);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-type.mjs
var __iconNode250 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M11 18h2", key: "12mj7e" }],
  ["path", { d: "M12 12v6", key: "3ahymv" }],
  ["path", { d: "M9 13v-.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v.5", key: "qbrxap" }]
];
var FileType = createLucideIcon("file-type", __iconNode250);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-type-corner.mjs
var __iconNode251 = [
  [
    "path",
    {
      d: "M12 22h6a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6",
      key: "15usau"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M3 16v-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V16", key: "s1gz5" }],
  ["path", { d: "M6 22h2", key: "194x9m" }],
  ["path", { d: "M7 14v8", key: "11ixej" }]
];
var FileTypeCorner = createLucideIcon("file-type-corner", __iconNode251);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-up.mjs
var __iconNode252 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M12 12v6", key: "3ahymv" }],
  ["path", { d: "m15 15-3-3-3 3", key: "15xj92" }]
];
var FileUp = createLucideIcon("file-up", __iconNode252);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-user.mjs
var __iconNode253 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M16 22a4 4 0 0 0-8 0", key: "7a83pg" }],
  ["circle", { cx: "12", cy: "15", r: "3", key: "g36mzq" }]
];
var FileUser = createLucideIcon("file-user", __iconNode253);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-play.mjs
var __iconNode254 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  [
    "path",
    {
      d: "M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z",
      key: "1tzo1f"
    }
  ]
];
var FilePlay = createLucideIcon("file-play", __iconNode254);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-volume.mjs
var __iconNode255 = [
  [
    "path",
    {
      d: "M4 11.55V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-1.95",
      key: "44gpjv"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M12 15a5 5 0 0 1 0 6", key: "oxg87a" }],
  [
    "path",
    {
      d: "M8 14.502a.5.5 0 0 0-.826-.381l-1.893 1.631a1 1 0 0 1-.651.243H3.5a.5.5 0 0 0-.5.501v3.006a.5.5 0 0 0 .5.501h1.129a1 1 0 0 1 .652.243l1.893 1.633a.5.5 0 0 0 .826-.38z",
      key: "8rtoi1"
    }
  ]
];
var FileVolume = createLucideIcon("file-volume", __iconNode255);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-exclamation-point.mjs
var __iconNode256 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
var FileExclamationPoint = createLucideIcon("file-exclamation-point", __iconNode256);

// ../../node_modules/@lucide/vue/dist/esm/icons/file-x.mjs
var __iconNode257 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "m14.5 12.5-5 5", key: "b62r18" }],
  ["path", { d: "m9.5 12.5 5 5", key: "1rk7el" }]
];
var FileX = createLucideIcon("file-x", __iconNode257);

// ../../node_modules/@lucide/vue/dist/esm/icons/files.mjs
var __iconNode258 = [
  ["path", { d: "M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8", key: "14sh0y" }],
  [
    "path",
    {
      d: "M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z",
      key: "1970lx"
    }
  ],
  ["path", { d: "M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1", key: "l4dndm" }]
];
var Files = createLucideIcon("files", __iconNode258);

// ../../node_modules/@lucide/vue/dist/esm/icons/film.mjs
var __iconNode259 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 3v18", key: "bbkbws" }],
  ["path", { d: "M3 7.5h4", key: "zfgn84" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 16.5h4", key: "1230mu" }],
  ["path", { d: "M17 3v18", key: "in4fa5" }],
  ["path", { d: "M17 7.5h4", key: "myr1c1" }],
  ["path", { d: "M17 16.5h4", key: "go4c1d" }]
];
var Film = createLucideIcon("film", __iconNode259);

// ../../node_modules/@lucide/vue/dist/esm/icons/funnel.mjs
var __iconNode260 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
var Funnel = createLucideIcon("funnel", __iconNode260);

// ../../node_modules/@lucide/vue/dist/esm/icons/fingerprint-pattern.mjs
var __iconNode261 = [
  ["path", { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4", key: "1nerag" }],
  ["path", { d: "M14 13.12c0 2.38 0 6.38-1 8.88", key: "o46ks0" }],
  ["path", { d: "M17.29 21.02c.12-.6.43-2.3.5-3.02", key: "ptglia" }],
  ["path", { d: "M2 12a10 10 0 0 1 18-6", key: "ydlgp0" }],
  ["path", { d: "M2 16h.01", key: "1gqxmh" }],
  ["path", { d: "M21.8 16c.2-2 .131-5.354 0-6", key: "drycrb" }],
  ["path", { d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2", key: "1tidbn" }],
  ["path", { d: "M8.65 22c.21-.66.45-1.32.57-2", key: "13wd9y" }],
  ["path", { d: "M9 6.8a6 6 0 0 1 9 5.2v2", key: "1fr1j5" }]
];
var FingerprintPattern = createLucideIcon("fingerprint-pattern", __iconNode261);

// ../../node_modules/@lucide/vue/dist/esm/icons/fire-extinguisher.mjs
var __iconNode262 = [
  ["path", { d: "M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5", key: "sqyvz" }],
  ["path", { d: "M9 18h8", key: "i7pszb" }],
  ["path", { d: "M18 3h-3", key: "7idoqj" }],
  ["path", { d: "M11 3a6 6 0 0 0-6 6v11", key: "1v5je3" }],
  ["path", { d: "M5 13h4", key: "svpcxo" }],
  ["path", { d: "M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z", key: "vsjego" }]
];
var FireExtinguisher = createLucideIcon("fire-extinguisher", __iconNode262);

// ../../node_modules/@lucide/vue/dist/esm/icons/fish.mjs
var __iconNode263 = [
  [
    "path",
    {
      d: "M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z",
      key: "15baut"
    }
  ],
  ["path", { d: "M18 12v.5", key: "18hhni" }],
  ["path", { d: "M16 17.93a9.77 9.77 0 0 1 0-11.86", key: "16dt7o" }],
  [
    "path",
    {
      d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33",
      key: "l9di03"
    }
  ],
  [
    "path",
    { d: "M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4", key: "1kjonw" }
  ],
  [
    "path",
    { d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98", key: "1zlm23" }
  ]
];
var Fish = createLucideIcon("fish", __iconNode263);

// ../../node_modules/@lucide/vue/dist/esm/icons/fish-off.mjs
var __iconNode264 = [
  [
    "path",
    {
      d: "M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058",
      key: "1j1hse"
    }
  ],
  [
    "path",
    {
      d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618",
      key: "1q46z8"
    }
  ],
  [
    "path",
    {
      d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20",
      key: "1407gh"
    }
  ]
];
var FishOff = createLucideIcon("fish-off", __iconNode264);

// ../../node_modules/@lucide/vue/dist/esm/icons/flag.mjs
var __iconNode265 = [
  [
    "path",
    {
      d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
      key: "1jaruq"
    }
  ]
];
var Flag = createLucideIcon("flag", __iconNode265);

// ../../node_modules/@lucide/vue/dist/esm/icons/flag-off.mjs
var __iconNode266 = [
  ["path", { d: "M16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528", key: "1q158e" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M4 22V4", key: "1plyxx" }],
  ["path", { d: "M7.656 2H8c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10.347", key: "xj1b71" }]
];
var FlagOff = createLucideIcon("flag-off", __iconNode266);

// ../../node_modules/@lucide/vue/dist/esm/icons/flame.mjs
var __iconNode267 = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
];
var Flame = createLucideIcon("flame", __iconNode267);

// ../../node_modules/@lucide/vue/dist/esm/icons/flashlight.mjs
var __iconNode268 = [
  ["path", { d: "M12 13v1", key: "176q98" }],
  [
    "path",
    {
      d: "M17 2a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8A4 4 0 0 0 16 12v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V3a1 1 0 0 1 1-1z",
      key: "17vh7j"
    }
  ],
  ["path", { d: "M6 6h12", key: "n6hhss" }]
];
var Flashlight = createLucideIcon("flashlight", __iconNode268);

// ../../node_modules/@lucide/vue/dist/esm/icons/flask-conical.mjs
var __iconNode269 = [
  [
    "path",
    {
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
      key: "18mbvz"
    }
  ],
  ["path", { d: "M6.453 15h11.094", key: "3shlmq" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
];
var FlaskConical = createLucideIcon("flask-conical", __iconNode269);

// ../../node_modules/@lucide/vue/dist/esm/icons/square-centerline-dashed-horizontal.mjs
var __iconNode270 = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3", key: "1i73f7" }],
  ["path", { d: "M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3", key: "saxlbk" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 14v2", key: "8jcxud" }],
  ["path", { d: "M12 8v2", key: "1woqiv" }],
  ["path", { d: "M12 2v2", key: "tus03m" }]
];
var SquareCenterlineDashedHorizontal = createLucideIcon(
  "square-centerline-dashed-horizontal",
  __iconNode270
);

// ../../node_modules/@lucide/vue/dist/esm/icons/square-centerline-dashed-vertical.mjs
var __iconNode271 = [
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3", key: "14bfxa" }],
  ["path", { d: "M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3", key: "14rx03" }],
  ["path", { d: "M4 12H2", key: "rhcxmi" }],
  ["path", { d: "M10 12H8", key: "s88cx1" }],
  ["path", { d: "M16 12h-2", key: "10asgb" }],
  ["path", { d: "M22 12h-2", key: "14jgyd" }]
];
var SquareCenterlineDashedVertical = createLucideIcon(
  "square-centerline-dashed-vertical",
  __iconNode271
);

// ../../node_modules/@lucide/vue/dist/esm/icons/flower.mjs
var __iconNode272 = [
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  [
    "path",
    {
      d: "M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5",
      key: "14wa3c"
    }
  ],
  ["path", { d: "M12 7.5V9", key: "1oy5b0" }],
  ["path", { d: "M7.5 12H9", key: "eltsq1" }],
  ["path", { d: "M16.5 12H15", key: "vk5kw4" }],
  ["path", { d: "M12 16.5V15", key: "k7eayi" }],
  ["path", { d: "m8 8 1.88 1.88", key: "nxy4qf" }],
  ["path", { d: "M14.12 9.88 16 8", key: "1lst6k" }],
  ["path", { d: "m8 16 1.88-1.88", key: "h2eex1" }],
  ["path", { d: "M14.12 14.12 16 16", key: "uqkrx3" }]
];
var Flower = createLucideIcon("flower", __iconNode272);

// ../../node_modules/@lucide/vue/dist/esm/icons/focus.mjs
var __iconNode273 = [
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }]
];
var Focus = createLucideIcon("focus", __iconNode273);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder.mjs
var __iconNode274 = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
];
var Folder = createLucideIcon("folder", __iconNode274);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-archive.mjs
var __iconNode275 = [
  ["circle", { cx: "15", cy: "19", r: "2", key: "u2pros" }],
  [
    "path",
    {
      d: "M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1",
      key: "1jj40k"
    }
  ],
  ["path", { d: "M15 11v-1", key: "cntcp" }],
  ["path", { d: "M15 17v-2", key: "1279jj" }]
];
var FolderArchive = createLucideIcon("folder-archive", __iconNode275);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-check.mjs
var __iconNode276 = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ],
  ["path", { d: "m9 13 2 2 4-4", key: "6343dt" }]
];
var FolderCheck = createLucideIcon("folder-check", __iconNode276);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-cog.mjs
var __iconNode277 = [
  [
    "path",
    {
      d: "M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3",
      key: "128dxu"
    }
  ],
  ["path", { d: "m14.305 19.53.923-.382", key: "3m78fa" }],
  ["path", { d: "m15.228 16.852-.923-.383", key: "npixar" }],
  ["path", { d: "m16.852 15.228-.383-.923", key: "5xggr7" }],
  ["path", { d: "m16.852 20.772-.383.924", key: "dpfhf9" }],
  ["path", { d: "m19.148 15.228.383-.923", key: "1reyyz" }],
  ["path", { d: "m19.53 21.696-.382-.924", key: "1goivc" }],
  ["path", { d: "m20.772 16.852.924-.383", key: "htqkph" }],
  ["path", { d: "m20.772 19.148.924.383", key: "9w9pjp" }],
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }]
];
var FolderCog = createLucideIcon("folder-cog", __iconNode277);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-dot.mjs
var __iconNode278 = [
  [
    "path",
    {
      d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
      key: "1fr9dc"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "1", key: "49l61u" }]
];
var FolderDot = createLucideIcon("folder-dot", __iconNode278);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-down.mjs
var __iconNode279 = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ],
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "m15 13-3 3-3-3", key: "6j2sf0" }]
];
var FolderDown = createLucideIcon("folder-down", __iconNode279);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-git.mjs
var __iconNode280 = [
  ["circle", { cx: "12", cy: "13", r: "2", key: "1c1ljs" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ],
  ["path", { d: "M14 13h3", key: "1dgedf" }],
  ["path", { d: "M7 13h3", key: "1pygq7" }]
];
var FolderGit = createLucideIcon("folder-git", __iconNode280);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-git-2.mjs
var __iconNode281 = [
  ["path", { d: "M18 19a5 5 0 0 1-5-5v8", key: "sz5oeg" }],
  [
    "path",
    {
      d: "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5",
      key: "1w6njk"
    }
  ],
  ["circle", { cx: "13", cy: "12", r: "2", key: "1j92g6" }],
  ["circle", { cx: "20", cy: "19", r: "2", key: "1obnsp" }]
];
var FolderGit2 = createLucideIcon("folder-git-2", __iconNode281);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-heart.mjs
var __iconNode282 = [
  [
    "path",
    {
      d: "M10.638 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.417",
      key: "10r6g4"
    }
  ],
  [
    "path",
    {
      d: "M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
      key: "15cy7q"
    }
  ]
];
var FolderHeart = createLucideIcon("folder-heart", __iconNode282);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-input.mjs
var __iconNode283 = [
  [
    "path",
    {
      d: "M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1",
      key: "fm4g5t"
    }
  ],
  ["path", { d: "M2 13h10", key: "pgb2dq" }],
  ["path", { d: "m9 16 3-3-3-3", key: "6m91ic" }]
];
var FolderInput = createLucideIcon("folder-input", __iconNode283);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-kanban.mjs
var __iconNode284 = [
  [
    "path",
    {
      d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
      key: "1fr9dc"
    }
  ],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M12 10v2", key: "hh53o1" }],
  ["path", { d: "M16 10v6", key: "1d6xys" }]
];
var FolderKanban = createLucideIcon("folder-kanban", __iconNode284);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-key.mjs
var __iconNode285 = [
  [
    "path",
    {
      d: "M13 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1.36",
      key: "1shsnm"
    }
  ],
  ["path", { d: "M19 12v6", key: "kflna4" }],
  ["path", { d: "M19 14h2", key: "wp2qbk" }],
  ["circle", { cx: "19", cy: "20", r: "2", key: "1jfyz6" }]
];
var FolderKey = createLucideIcon("folder-key", __iconNode285);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-lock.mjs
var __iconNode286 = [
  ["rect", { width: "8", height: "5", x: "14", y: "17", rx: "1", key: "19aais" }],
  [
    "path",
    {
      d: "M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5",
      key: "1w6v7t"
    }
  ],
  ["path", { d: "M20 17v-2a2 2 0 1 0-4 0v2", key: "pwaxnr" }]
];
var FolderLock = createLucideIcon("folder-lock", __iconNode286);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-minus.mjs
var __iconNode287 = [
  ["path", { d: "M9 13h6", key: "1uhe8q" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
];
var FolderMinus = createLucideIcon("folder-minus", __iconNode287);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-open.mjs
var __iconNode288 = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
var FolderOpen = createLucideIcon("folder-open", __iconNode288);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-output.mjs
var __iconNode289 = [
  [
    "path",
    {
      d: "M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5",
      key: "1yk7aj"
    }
  ],
  ["path", { d: "M2 13h10", key: "pgb2dq" }],
  ["path", { d: "m5 10-3 3 3 3", key: "1r8ie0" }]
];
var FolderOutput = createLucideIcon("folder-output", __iconNode289);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-pen.mjs
var __iconNode290 = [
  [
    "path",
    {
      d: "M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5",
      key: "a8xqs0"
    }
  ],
  [
    "path",
    {
      d: "M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "1saktj"
    }
  ]
];
var FolderPen = createLucideIcon("folder-pen", __iconNode290);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-plus.mjs
var __iconNode291 = [
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "M9 13h6", key: "1uhe8q" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
];
var FolderPlus = createLucideIcon("folder-plus", __iconNode291);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-search.mjs
var __iconNode292 = [
  [
    "path",
    {
      d: "M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1",
      key: "1bw5m7"
    }
  ],
  ["path", { d: "m21 21-1.9-1.9", key: "1g2n9r" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }]
];
var FolderSearch = createLucideIcon("folder-search", __iconNode292);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-sync.mjs
var __iconNode293 = [
  [
    "path",
    {
      d: "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5",
      key: "1dkoa9"
    }
  ],
  ["path", { d: "M12 10v4h4", key: "1czhmt" }],
  ["path", { d: "m12 14 1.535-1.605a5 5 0 0 1 8 1.5", key: "lvuxfi" }],
  ["path", { d: "M22 22v-4h-4", key: "1ewp4q" }],
  ["path", { d: "m22 18-1.535 1.605a5 5 0 0 1-8-1.5", key: "14ync0" }]
];
var FolderSync = createLucideIcon("folder-sync", __iconNode293);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-tree.mjs
var __iconNode294 = [
  [
    "path",
    {
      d: "M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
      key: "hod4my"
    }
  ],
  [
    "path",
    {
      d: "M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
      key: "w4yl2u"
    }
  ],
  ["path", { d: "M3 5a2 2 0 0 0 2 2h3", key: "f2jnh7" }],
  ["path", { d: "M3 3v13a2 2 0 0 0 2 2h3", key: "k8epm1" }]
];
var FolderTree = createLucideIcon("folder-tree", __iconNode294);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-up.mjs
var __iconNode295 = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ],
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "m9 13 3-3 3 3", key: "1pxg3c" }]
];
var FolderUp = createLucideIcon("folder-up", __iconNode295);

// ../../node_modules/@lucide/vue/dist/esm/icons/folder-x.mjs
var __iconNode296 = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ],
  ["path", { d: "m9.5 10.5 5 5", key: "ra9qjz" }],
  ["path", { d: "m14.5 10.5-5 5", key: "l2rkpq" }]
];
var FolderX = createLucideIcon("folder-x", __iconNode296);

// ../../node_modules/@lucide/vue/dist/esm/icons/footprints.mjs
var __iconNode297 = [
  [
    "path",
    {
      d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",
      key: "1dudjm"
    }
  ],
  [
    "path",
    {
      d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",
      key: "l2t8xc"
    }
  ],
  ["path", { d: "M16 17h4", key: "1dejxt" }],
  ["path", { d: "M4 13h4", key: "1bwh8b" }]
];
var Footprints = createLucideIcon("footprints", __iconNode297);

// ../../node_modules/@lucide/vue/dist/esm/icons/forklift.mjs
var __iconNode298 = [
  ["path", { d: "M12 12H5a2 2 0 0 0-2 2v5", key: "7zsz91" }],
  ["path", { d: "M15 19h7", key: "1askl3" }],
  ["path", { d: "M16 19V2", key: "1gf9nk" }],
  [
    "path",
    {
      d: "M6 12V7a2 2 0 0 1 2-2h2.172a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 16 10.828",
      key: "enx9tf"
    }
  ],
  ["path", { d: "M7 19h4", key: "fumhkk" }],
  ["circle", { cx: "13", cy: "19", r: "2", key: "wjnkru" }],
  ["circle", { cx: "5", cy: "19", r: "2", key: "v8kfzx" }]
];
var Forklift = createLucideIcon("forklift", __iconNode298);

// ../../node_modules/@lucide/vue/dist/esm/icons/forward.mjs
var __iconNode299 = [
  ["path", { d: "m15 17 5-5-5-5", key: "nf172w" }],
  ["path", { d: "M4 18v-2a4 4 0 0 1 4-4h12", key: "jmiej9" }]
];
var Forward = createLucideIcon("forward", __iconNode299);

// ../../node_modules/@lucide/vue/dist/esm/icons/face-slightly-frowning.mjs
var __iconNode300 = [
  ["path", { d: "M15 10V9", key: "4dkmfx" }],
  ["path", { d: "M9 10V9", key: "1lazqi" }],
  ["path", { d: "M9 16a5 5 0 016 0", key: "34mdxb" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
var FaceSlightlyFrowning = createLucideIcon("face-slightly-frowning", __iconNode300);

// ../../node_modules/@lucide/vue/dist/esm/icons/fuel.mjs
var __iconNode301 = [
  [
    "path",
    { d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5", key: "1wtuz0" }
  ],
  ["path", { d: "M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16", key: "e09ifn" }],
  ["path", { d: "M2 21h13", key: "1x0fut" }],
  ["path", { d: "M3 9h11", key: "1p7c0w" }]
];
var Fuel = createLucideIcon("fuel", __iconNode301);

// ../../node_modules/@lucide/vue/dist/esm/icons/fullscreen.mjs
var __iconNode302 = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["rect", { width: "10", height: "8", x: "7", y: "8", rx: "1", key: "vys8me" }]
];
var Fullscreen = createLucideIcon("fullscreen", __iconNode302);

// ../../node_modules/@lucide/vue/dist/esm/icons/gallery-horizontal.mjs
var __iconNode303 = [
  ["path", { d: "M2 3v18", key: "pzttux" }],
  ["rect", { width: "12", height: "18", x: "6", y: "3", rx: "2", key: "btr8bg" }],
  ["path", { d: "M22 3v18", key: "6jf3v" }]
];
var GalleryHorizontal = createLucideIcon("gallery-horizontal", __iconNode303);

// ../../node_modules/@lucide/vue/dist/esm/icons/gallery-thumbnails.mjs
var __iconNode304 = [
  ["rect", { width: "18", height: "14", x: "3", y: "3", rx: "2", key: "74y24f" }],
  ["path", { d: "M4 21h1", key: "16zlid" }],
  ["path", { d: "M9 21h1", key: "15o7lz" }],
  ["path", { d: "M14 21h1", key: "v9vybs" }],
  ["path", { d: "M19 21h1", key: "edywat" }]
];
var GalleryThumbnails = createLucideIcon("gallery-thumbnails", __iconNode304);

// ../../node_modules/@lucide/vue/dist/esm/icons/gallery-vertical.mjs
var __iconNode305 = [
  ["path", { d: "M3 2h18", key: "15qxfx" }],
  ["rect", { width: "18", height: "12", x: "3", y: "6", rx: "2", key: "1439r6" }],
  ["path", { d: "M3 22h18", key: "8prr45" }]
];
var GalleryVertical = createLucideIcon("gallery-vertical", __iconNode305);

// ../../node_modules/@lucide/vue/dist/esm/icons/gamepad.mjs
var __iconNode306 = [
  ["line", { x1: "6", x2: "10", y1: "12", y2: "12", key: "161bw2" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "15", x2: "15.01", y1: "13", y2: "13", key: "dqpgro" }],
  ["line", { x1: "18", x2: "18.01", y1: "11", y2: "11", key: "meh2c" }],
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }]
];
var Gamepad = createLucideIcon("gamepad", __iconNode306);

// ../../node_modules/@lucide/vue/dist/esm/icons/gamepad-2.mjs
var __iconNode307 = [
  ["line", { x1: "6", x2: "10", y1: "11", y2: "11", key: "1gktln" }],
  ["line", { x1: "8", x2: "8", y1: "9", y2: "13", key: "qnk9ow" }],
  ["line", { x1: "15", x2: "15.01", y1: "12", y2: "12", key: "krot7o" }],
  ["line", { x1: "18", x2: "18.01", y1: "10", y2: "10", key: "1lcuu1" }],
  [
    "path",
    {
      d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
      key: "mfqc10"
    }
  ]
];
var Gamepad2 = createLucideIcon("gamepad-2", __iconNode307);

// ../../node_modules/@lucide/vue/dist/esm/icons/gavel.mjs
var __iconNode308 = [
  ["path", { d: "m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381", key: "pgg06f" }],
  ["path", { d: "m16 16 6-6", key: "vzrcl6" }],
  ["path", { d: "m21.5 10.5-8-8", key: "a17d9x" }],
  ["path", { d: "m8 8 6-6", key: "18bi4p" }],
  ["path", { d: "m8.5 7.5 8 8", key: "1oyaui" }]
];
var Gavel = createLucideIcon("gavel", __iconNode308);

// ../../node_modules/@lucide/vue/dist/esm/icons/gem.mjs
var __iconNode309 = [
  ["path", { d: "M10.5 3 8 9l4 13 4-13-2.5-6", key: "b3dvk1" }],
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z",
      key: "7w4byz"
    }
  ],
  ["path", { d: "M2 9h20", key: "16fsjt" }]
];
var Gem = createLucideIcon("gem", __iconNode309);

// ../../node_modules/@lucide/vue/dist/esm/icons/gift.mjs
var __iconNode310 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  ["path", { d: "M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8", key: "1sqzm4" }],
  [
    "path",
    { d: "M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5", key: "kc0143" }
  ],
  ["rect", { x: "3", y: "7", width: "18", height: "4", rx: "1", key: "1hberx" }]
];
var Gift = createLucideIcon("gift", __iconNode310);

// ../../node_modules/@lucide/vue/dist/esm/icons/git-branch.mjs
var __iconNode311 = [
  ["path", { d: "M15 6a9 9 0 0 0-9 9V3", key: "1cii5b" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }]
];
var GitBranch = createLucideIcon("git-branch", __iconNode311);

// ../../node_modules/@lucide/vue/dist/esm/icons/git-commit-horizontal.mjs
var __iconNode312 = [
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["line", { x1: "3", x2: "9", y1: "12", y2: "12", key: "1dyftd" }],
  ["line", { x1: "15", x2: "21", y1: "12", y2: "12", key: "oup4p8" }]
];
var GitCommitHorizontal = createLucideIcon("git-commit-horizontal", __iconNode312);

// ../../node_modules/@lucide/vue/dist/esm/icons/git-fork.mjs
var __iconNode313 = [
  ["circle", { cx: "12", cy: "18", r: "3", key: "1mpf1b" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["path", { d: "M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9", key: "1uq4wg" }],
  ["path", { d: "M12 12v3", key: "158kv8" }]
];
var GitFork = createLucideIcon("git-fork", __iconNode313);

// ../../node_modules/@lucide/vue/dist/esm/icons/git-merge.mjs
var __iconNode314 = [
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M6 21V9a9 9 0 0 0 9 9", key: "7kw0sc" }]
];
var GitMerge = createLucideIcon("git-merge", __iconNode314);

// ../../node_modules/@lucide/vue/dist/esm/icons/git-pull-request.mjs
var __iconNode315 = [
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7", key: "1yeb86" }],
  ["line", { x1: "6", x2: "6", y1: "9", y2: "21", key: "rroup" }]
];
var GitPullRequest = createLucideIcon("git-pull-request", __iconNode315);

// ../../node_modules/@lucide/vue/dist/esm/icons/glass-water.mjs
var __iconNode316 = [
  [
    "path",
    {
      d: "M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z",
      key: "p55z4y"
    }
  ],
  ["path", { d: "M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0", key: "mjntcy" }]
];
var GlassWater = createLucideIcon("glass-water", __iconNode316);

// ../../node_modules/@lucide/vue/dist/esm/icons/glasses.mjs
var __iconNode317 = [
  ["circle", { cx: "6", cy: "15", r: "4", key: "vux9w4" }],
  ["circle", { cx: "18", cy: "15", r: "4", key: "18o8ve" }],
  ["path", { d: "M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2", key: "1ag4bs" }],
  ["path", { d: "M2.5 13 5 7c.7-1.3 1.4-2 3-2", key: "1hm1gs" }],
  ["path", { d: "M21.5 13 19 7c-.7-1.3-1.5-2-3-2", key: "1r31ai" }]
];
var Glasses = createLucideIcon("glasses", __iconNode317);

// ../../node_modules/@lucide/vue/dist/esm/icons/globe.mjs
var __iconNode318 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
var Globe = createLucideIcon("globe", __iconNode318);

// ../../node_modules/@lucide/vue/dist/esm/icons/globe-lock.mjs
var __iconNode319 = [
  [
    "path",
    {
      d: "M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13",
      key: "qkt0x6"
    }
  ],
  ["path", { d: "M2 12h8.5", key: "ovaggd" }],
  ["path", { d: "M20 6V4a2 2 0 1 0-4 0v2", key: "1of5e8" }],
  ["rect", { width: "8", height: "5", x: "14", y: "6", rx: "1", key: "1fmf51" }]
];
var GlobeLock = createLucideIcon("globe-lock", __iconNode319);

// ../../node_modules/@lucide/vue/dist/esm/icons/graduation-cap.mjs
var __iconNode320 = [
  [
    "path",
    {
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0"
    }
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
];
var GraduationCap = createLucideIcon("graduation-cap", __iconNode320);

// ../../node_modules/@lucide/vue/dist/esm/icons/grape.mjs
var __iconNode321 = [
  ["path", { d: "M22 5V2l-5.89 5.89", key: "1eenpo" }],
  ["circle", { cx: "16.6", cy: "15.89", r: "3", key: "xjtalx" }],
  ["circle", { cx: "8.11", cy: "7.4", r: "3", key: "u2fv6i" }],
  ["circle", { cx: "12.35", cy: "11.65", r: "3", key: "i6i8g7" }],
  ["circle", { cx: "13.91", cy: "5.85", r: "3", key: "6ye0dv" }],
  ["circle", { cx: "18.15", cy: "10.09", r: "3", key: "snx9no" }],
  ["circle", { cx: "6.56", cy: "13.2", r: "3", key: "17x4xg" }],
  ["circle", { cx: "10.8", cy: "17.44", r: "3", key: "1hogw9" }],
  ["circle", { cx: "5", cy: "19", r: "3", key: "1sn6vo" }]
];
var Grape = createLucideIcon("grape", __iconNode321);

// ../../node_modules/@lucide/vue/dist/esm/icons/grid-3x3.mjs
var __iconNode322 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
];
var Grid3x3 = createLucideIcon("grid-3x3", __iconNode322);

// ../../node_modules/@lucide/vue/dist/esm/icons/grip-vertical.mjs
var __iconNode323 = [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
];
var GripVertical = createLucideIcon("grip-vertical", __iconNode323);

// ../../node_modules/@lucide/vue/dist/esm/icons/ham.mjs
var __iconNode324 = [
  ["path", { d: "M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856", key: "1k1t7q" }],
  [
    "path",
    {
      d: "M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288",
      key: "153t1g"
    }
  ],
  [
    "path",
    {
      d: "M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025",
      key: "gzrt0n"
    }
  ],
  ["path", { d: "m8.5 16.5-1-1", key: "otr954" }]
];
var Ham = createLucideIcon("ham", __iconNode324);

// ../../node_modules/@lucide/vue/dist/esm/icons/hammer.mjs
var __iconNode325 = [
  ["path", { d: "m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9", key: "1hayfq" }],
  ["path", { d: "m18 15 4-4", key: "16gjal" }],
  [
    "path",
    {
      d: "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",
      key: "15ts47"
    }
  ]
];
var Hammer = createLucideIcon("hammer", __iconNode325);

// ../../node_modules/@lucide/vue/dist/esm/icons/hand.mjs
var __iconNode326 = [
  ["path", { d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2", key: "1fvzgz" }],
  ["path", { d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2", key: "1kc0my" }],
  ["path", { d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8", key: "10h0bg" }],
  [
    "path",
    {
      d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
      key: "1s1gnw"
    }
  ]
];
var Hand = createLucideIcon("hand", __iconNode326);

// ../../node_modules/@lucide/vue/dist/esm/icons/hand-coins.mjs
var __iconNode327 = [
  ["path", { d: "M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17", key: "geh8rc" }],
  [
    "path",
    {
      d: "m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",
      key: "1fto5m"
    }
  ],
  ["path", { d: "m2 16 6 6", key: "1pfhp9" }],
  ["circle", { cx: "16", cy: "9", r: "2.9", key: "1n0dlu" }],
  ["circle", { cx: "6", cy: "5", r: "3", key: "151irh" }]
];
var HandCoins = createLucideIcon("hand-coins", __iconNode327);

// ../../node_modules/@lucide/vue/dist/esm/icons/hand-heart.mjs
var __iconNode328 = [
  ["path", { d: "M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16", key: "1v1a37" }],
  [
    "path",
    {
      d: "m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95",
      key: "fhfbnt"
    }
  ],
  ["path", { d: "m2 15 6 6", key: "10dquu" }],
  [
    "path",
    {
      d: "m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91",
      key: "1x6kdw"
    }
  ]
];
var HandHeart = createLucideIcon("hand-heart", __iconNode328);

// ../../node_modules/@lucide/vue/dist/esm/icons/hand-helping.mjs
var __iconNode329 = [
  ["path", { d: "M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14", key: "1j4xps" }],
  [
    "path",
    {
      d: "m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",
      key: "uospg8"
    }
  ],
  ["path", { d: "m2 13 6 6", key: "16e5sb" }]
];
var HandHelping = createLucideIcon("hand-helping", __iconNode329);

// ../../node_modules/@lucide/vue/dist/esm/icons/hand-metal.mjs
var __iconNode330 = [
  ["path", { d: "M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4", key: "wc6myp" }],
  ["path", { d: "M14 11V9a2 2 0 1 0-4 0v2", key: "94qvcw" }],
  ["path", { d: "M10 10.5V5a2 2 0 1 0-4 0v9", key: "m1ah89" }],
  [
    "path",
    {
      d: "m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5",
      key: "t1skq1"
    }
  ]
];
var HandMetal = createLucideIcon("hand-metal", __iconNode330);

// ../../node_modules/@lucide/vue/dist/esm/icons/hand-platter.mjs
var __iconNode331 = [
  ["path", { d: "M12 3V2", key: "ar7q03" }],
  [
    "path",
    {
      d: "m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5",
      key: "n2g93r"
    }
  ],
  ["path", { d: "M2 14h12a2 2 0 0 1 0 4h-2", key: "1o2jem" }],
  ["path", { d: "M4 10h16", key: "img6z1" }],
  ["path", { d: "M5 10a7 7 0 0 1 14 0", key: "1ega1o" }],
  ["path", { d: "M5 14v6a1 1 0 0 1-1 1H2", key: "1hescx" }]
];
var HandPlatter = createLucideIcon("hand-platter", __iconNode331);

// ../../node_modules/@lucide/vue/dist/esm/icons/handshake.mjs
var __iconNode332 = [
  ["path", { d: "m11 17 2 2a1 1 0 1 0 3-3", key: "efffak" }],
  [
    "path",
    {
      d: "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
      key: "9pr0kb"
    }
  ],
  ["path", { d: "m21 3 1 11h-2", key: "1tisrp" }],
  ["path", { d: "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3", key: "1uvwmv" }],
  ["path", { d: "M3 4h8", key: "1ep09j" }]
];
var Handshake = createLucideIcon("handshake", __iconNode332);

// ../../node_modules/@lucide/vue/dist/esm/icons/hard-drive.mjs
var __iconNode333 = [
  ["path", { d: "M10 16h.01", key: "1bzywj" }],
  [
    "path",
    {
      d: "M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "18tbho"
    }
  ],
  ["path", { d: "M21.946 12.013H2.054", key: "zqlbp7" }],
  ["path", { d: "M6 16h.01", key: "1pmjb7" }]
];
var HardDrive = createLucideIcon("hard-drive", __iconNode333);

// ../../node_modules/@lucide/vue/dist/esm/icons/hard-drive-download.mjs
var __iconNode334 = [
  ["path", { d: "M12 2v8", key: "1q4o3n" }],
  ["path", { d: "m16 6-4 4-4-4", key: "6wukr" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", key: "w68u3i" }],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "M10 18h.01", key: "h775k" }]
];
var HardDriveDownload = createLucideIcon("hard-drive-download", __iconNode334);

// ../../node_modules/@lucide/vue/dist/esm/icons/hard-drive-upload.mjs
var __iconNode335 = [
  ["path", { d: "m16 6-4-4-4 4", key: "13yo43" }],
  ["path", { d: "M12 2v8", key: "1q4o3n" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", key: "w68u3i" }],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "M10 18h.01", key: "h775k" }]
];
var HardDriveUpload = createLucideIcon("hard-drive-upload", __iconNode335);

// ../../node_modules/@lucide/vue/dist/esm/icons/hard-hat.mjs
var __iconNode336 = [
  ["path", { d: "M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5", key: "1p9q5i" }],
  ["path", { d: "M14 6a6 6 0 0 1 6 6v3", key: "1hnv84" }],
  ["path", { d: "M4 15v-3a6 6 0 0 1 6-6", key: "9ciidu" }],
  ["rect", { x: "2", y: "15", width: "20", height: "4", rx: "1", key: "g3x8cw" }]
];
var HardHat = createLucideIcon("hard-hat", __iconNode336);

// ../../node_modules/@lucide/vue/dist/esm/icons/hash.mjs
var __iconNode337 = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
];
var Hash = createLucideIcon("hash", __iconNode337);

// ../../node_modules/@lucide/vue/dist/esm/icons/heading.mjs
var __iconNode338 = [
  ["path", { d: "M6 12h12", key: "8npq4p" }],
  ["path", { d: "M6 20V4", key: "1w1bmo" }],
  ["path", { d: "M18 20V4", key: "o2hl4u" }]
];
var Heading = createLucideIcon("heading", __iconNode338);

// ../../node_modules/@lucide/vue/dist/esm/icons/headphones.mjs
var __iconNode339 = [
  [
    "path",
    {
      d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
      key: "1xhozi"
    }
  ]
];
var Headphones = createLucideIcon("headphones", __iconNode339);

// ../../node_modules/@lucide/vue/dist/esm/icons/heart.mjs
var __iconNode340 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
];
var Heart = createLucideIcon("heart", __iconNode340);

// ../../node_modules/@lucide/vue/dist/esm/icons/heart-handshake.mjs
var __iconNode341 = [
  [
    "path",
    {
      d: "M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762",
      key: "17lmqv"
    }
  ]
];
var HeartHandshake = createLucideIcon("heart-handshake", __iconNode341);

// ../../node_modules/@lucide/vue/dist/esm/icons/heart-pulse.mjs
var __iconNode342 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ],
  ["path", { d: "M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27", key: "auskq0" }]
];
var HeartPulse = createLucideIcon("heart-pulse", __iconNode342);

// ../../node_modules/@lucide/vue/dist/esm/icons/heater.mjs
var __iconNode343 = [
  ["path", { d: "M11 8c2-3-2-3 0-6", key: "1ldv5m" }],
  ["path", { d: "M15.5 8c2-3-2-3 0-6", key: "1otqoz" }],
  ["path", { d: "M6 10h.01", key: "1lbq93" }],
  ["path", { d: "M6 14h.01", key: "zudwn7" }],
  ["path", { d: "M10 16v-4", key: "1c25yv" }],
  ["path", { d: "M14 16v-4", key: "1dkbt8" }],
  ["path", { d: "M18 16v-4", key: "1yg9me" }],
  [
    "path",
    { d: "M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3", key: "1ubg90" }
  ],
  ["path", { d: "M5 20v2", key: "1abpe8" }],
  ["path", { d: "M19 20v2", key: "kqn6ft" }]
];
var Heater = createLucideIcon("heater", __iconNode343);

// ../../node_modules/@lucide/vue/dist/esm/icons/helicopter.mjs
var __iconNode344 = [
  ["path", { d: "M11 17v4", key: "14wq8k" }],
  ["path", { d: "M14 3v8a2 2 0 0 0 2 2h5.865", key: "12oo5h" }],
  ["path", { d: "M17 17v4", key: "hdt4hh" }],
  [
    "path",
    { d: "M18 17a4 4 0 0 0 4-4 8 6 0 0 0-8-6 6 5 0 0 0-6 5v3a2 2 0 0 0 2 2z", key: "yynif" }
  ],
  ["path", { d: "M2 10v5", key: "sa5akn" }],
  ["path", { d: "M6 3h16", key: "27qw71" }],
  ["path", { d: "M7 21h14", key: "1ugz0u" }],
  ["path", { d: "M8 13H2", key: "1thz1o" }]
];
var Helicopter = createLucideIcon("helicopter", __iconNode344);

// ../../node_modules/@lucide/vue/dist/esm/icons/circle-question-mark.mjs
var __iconNode345 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
var CircleQuestionMark = createLucideIcon("circle-question-mark", __iconNode345);

// ../../node_modules/@lucide/vue/dist/esm/icons/hexagon.mjs
var __iconNode346 = [
  [
    "path",
    {
      d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
      key: "yt0hxn"
    }
  ]
];
var Hexagon = createLucideIcon("hexagon", __iconNode346);

// ../../node_modules/@lucide/vue/dist/esm/icons/highlighter.mjs
var __iconNode347 = [
  ["path", { d: "m9 11-6 6v3h9l3-3", key: "1a3l36" }],
  ["path", { d: "m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4", key: "14a9rk" }]
];
var Highlighter = createLucideIcon("highlighter", __iconNode347);

// ../../node_modules/@lucide/vue/dist/esm/icons/rotate-ccw-clock.mjs
var __iconNode348 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
var RotateCcwClock = createLucideIcon("rotate-ccw-clock", __iconNode348);

// ../../node_modules/@lucide/vue/dist/esm/icons/house.mjs
var __iconNode349 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
];
var House = createLucideIcon("house", __iconNode349);

// ../../node_modules/@lucide/vue/dist/esm/icons/hospital.mjs
var __iconNode350 = [
  ["path", { d: "M12 7v4", key: "xawao1" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  ["path", { d: "M14 9h-4", key: "1w2s2s" }],
  [
    "path",
    {
      d: "M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2",
      key: "1tthqt"
    }
  ],
  ["path", { d: "M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16", key: "dw4p4i" }]
];
var Hospital = createLucideIcon("hospital", __iconNode350);

// ../../node_modules/@lucide/vue/dist/esm/icons/hotel.mjs
var __iconNode351 = [
  ["path", { d: "M10 22v-6.57", key: "1wmca3" }],
  ["path", { d: "M12 11h.01", key: "z322tv" }],
  ["path", { d: "M12 7h.01", key: "1ivr5q" }],
  ["path", { d: "M14 15.43V22", key: "1q2vjd" }],
  ["path", { d: "M15 16a5 5 0 0 0-6 0", key: "o9wqvi" }],
  ["path", { d: "M16 11h.01", key: "xkw8gn" }],
  ["path", { d: "M16 7h.01", key: "1kdx03" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 7h.01", key: "1vti4s" }],
  ["rect", { x: "4", y: "2", width: "16", height: "20", rx: "2", key: "1uxh74" }]
];
var Hotel = createLucideIcon("hotel", __iconNode351);

// ../../node_modules/@lucide/vue/dist/esm/icons/hourglass.mjs
var __iconNode352 = [
  ["path", { d: "M5 22h14", key: "ehvnwv" }],
  ["path", { d: "M5 2h14", key: "pdyrp9" }],
  [
    "path",
    {
      d: "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",
      key: "1d314k"
    }
  ],
  [
    "path",
    { d: "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2", key: "1vvvr6" }
  ]
];
var Hourglass = createLucideIcon("hourglass", __iconNode352);

// ../../node_modules/@lucide/vue/dist/esm/icons/house-heart.mjs
var __iconNode353 = [
  [
    "path",
    {
      d: "M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
      key: "n9s7kx"
    }
  ],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
];
var HouseHeart = createLucideIcon("house-heart", __iconNode353);

// ../../node_modules/@lucide/vue/dist/esm/icons/house-plug.mjs
var __iconNode354 = [
  ["path", { d: "M10 12V8.964", key: "1vll13" }],
  ["path", { d: "M14 12V8.964", key: "1x3qvg" }],
  [
    "path",
    { d: "M15 12a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z", key: "ppykja" }
  ],
  [
    "path",
    {
      d: "M8.5 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2",
      key: "365xoy"
    }
  ]
];
var HousePlug = createLucideIcon("house-plug", __iconNode354);

// ../../node_modules/@lucide/vue/dist/esm/icons/house-plus.mjs
var __iconNode355 = [
  [
    "path",
    {
      d: "M12.35 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v2.35",
      key: "8ek5ge"
    }
  ],
  ["path", { d: "M14.8 12.4A1 1 0 0 0 14 12h-4a1 1 0 0 0-1 1v8", key: "1rbg29" }],
  ["path", { d: "M15 18h6", key: "3b3c90" }],
  ["path", { d: "M18 15v6", key: "9wciyi" }]
];
var HousePlus = createLucideIcon("house-plus", __iconNode355);

// ../../node_modules/@lucide/vue/dist/esm/icons/house-wifi.mjs
var __iconNode356 = [
  ["path", { d: "M9.5 13.866a4 4 0 0 1 5 .01", key: "1wy54i" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ],
  ["path", { d: "M7 10.754a8 8 0 0 1 10 0", key: "exoy2g" }]
];
var HouseWifi = createLucideIcon("house-wifi", __iconNode356);

// ../../node_modules/@lucide/vue/dist/esm/icons/ice-cream-bowl.mjs
var __iconNode357 = [
  [
    "path",
    {
      d: "M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0",
      key: "1uxfcu"
    }
  ],
  ["path", { d: "M12.14 11a3.5 3.5 0 1 1 6.71 0", key: "4k3m1s" }],
  ["path", { d: "M15.5 6.5a3.5 3.5 0 1 0-7 0", key: "zmuahr" }]
];
var IceCreamBowl = createLucideIcon("ice-cream-bowl", __iconNode357);

// ../../node_modules/@lucide/vue/dist/esm/icons/ice-cream-cone.mjs
var __iconNode358 = [
  ["path", { d: "m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11", key: "1v6356" }],
  ["path", { d: "M17 7A5 5 0 0 0 7 7", key: "151p3v" }],
  ["path", { d: "M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4", key: "1sdaij" }]
];
var IceCreamCone = createLucideIcon("ice-cream-cone", __iconNode358);

// ../../node_modules/@lucide/vue/dist/esm/icons/id-card.mjs
var __iconNode359 = [
  ["path", { d: "M16 10h2", key: "8sgtl7" }],
  ["path", { d: "M16 14h2", key: "epxaof" }],
  ["path", { d: "M6.17 15a3 3 0 0 1 5.66 0", key: "n6f512" }],
  ["circle", { cx: "9", cy: "11", r: "2", key: "yxgjnd" }],
  ["rect", { x: "2", y: "5", width: "20", height: "14", rx: "2", key: "qneu4z" }]
];
var IdCard = createLucideIcon("id-card", __iconNode359);

// ../../node_modules/@lucide/vue/dist/esm/icons/image.mjs
var __iconNode360 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
var Image = createLucideIcon("image", __iconNode360);

// ../../node_modules/@lucide/vue/dist/esm/icons/image-down.mjs
var __iconNode361 = [
  [
    "path",
    {
      d: "M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21",
      key: "9csbqa"
    }
  ],
  ["path", { d: "m14 19 3 3v-5.5", key: "9ldu5r" }],
  ["path", { d: "m17 22 3-3", key: "1nkfve" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
var ImageDown = createLucideIcon("image-down", __iconNode361);

// ../../node_modules/@lucide/vue/dist/esm/icons/image-minus.mjs
var __iconNode362 = [
  ["path", { d: "M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7", key: "m87ecr" }],
  ["line", { x1: "16", x2: "22", y1: "5", y2: "5", key: "ez7e4s" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
var ImageMinus = createLucideIcon("image-minus", __iconNode362);

// ../../node_modules/@lucide/vue/dist/esm/icons/image-off.mjs
var __iconNode363 = [
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
  ["path", { d: "M10.41 10.41a2 2 0 1 1-2.83-2.83", key: "1bzlo9" }],
  ["line", { x1: "13.5", x2: "6", y1: "13.5", y2: "21", key: "1q0aeu" }],
  ["line", { x1: "18", x2: "21", y1: "12", y2: "15", key: "5mozeu" }],
  [
    "path",
    {
      d: "M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59",
      key: "mmje98"
    }
  ],
  ["path", { d: "M21 15V5a2 2 0 0 0-2-2H9", key: "43el77" }]
];
var ImageOff = createLucideIcon("image-off", __iconNode363);

// ../../node_modules/@lucide/vue/dist/esm/icons/image-play.mjs
var __iconNode364 = [
  [
    "path",
    {
      d: "M15 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z",
      key: "nrt1m3"
    }
  ],
  ["path", { d: "M21 12.17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6", key: "99hgts" }],
  ["path", { d: "m6 21 5-5", key: "1wyjai" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
var ImagePlay = createLucideIcon("image-play", __iconNode364);

// ../../node_modules/@lucide/vue/dist/esm/icons/image-plus.mjs
var __iconNode365 = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
var ImagePlus = createLucideIcon("image-plus", __iconNode365);

// ../../node_modules/@lucide/vue/dist/esm/icons/image-up.mjs
var __iconNode366 = [
  [
    "path",
    {
      d: "M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21",
      key: "9csbqa"
    }
  ],
  ["path", { d: "m14 19.5 3-3 3 3", key: "9vmjn0" }],
  ["path", { d: "M17 22v-5.5", key: "1aa6fl" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
var ImageUp = createLucideIcon("image-up", __iconNode366);

// ../../node_modules/@lucide/vue/dist/esm/icons/images.mjs
var __iconNode367 = [
  ["path", { d: "m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16", key: "9kzy35" }],
  ["path", { d: "M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2", key: "1t0f0t" }],
  ["circle", { cx: "13", cy: "7", r: "1", fill: "currentColor", key: "1obus6" }],
  ["rect", { x: "8", y: "2", width: "14", height: "14", rx: "2", key: "1gvhby" }]
];
var Images = createLucideIcon("images", __iconNode367);

// ../../node_modules/@lucide/vue/dist/esm/icons/inbox.mjs
var __iconNode368 = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
];
var Inbox = createLucideIcon("inbox", __iconNode368);

// ../../node_modules/@lucide/vue/dist/esm/icons/infinity.mjs
var __iconNode369 = [
  ["path", { d: "M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8", key: "18ogeb" }]
];
var Infinity = createLucideIcon("infinity", __iconNode369);

// ../../node_modules/@lucide/vue/dist/esm/icons/info.mjs
var __iconNode370 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
var Info = createLucideIcon("info", __iconNode370);

// ../../node_modules/@lucide/vue/dist/esm/icons/italic.mjs
var __iconNode371 = [
  ["line", { x1: "19", x2: "10", y1: "4", y2: "4", key: "15jd3p" }],
  ["line", { x1: "14", x2: "5", y1: "20", y2: "20", key: "bu0au3" }],
  ["line", { x1: "15", x2: "9", y1: "4", y2: "20", key: "uljnxc" }]
];
var Italic = createLucideIcon("italic", __iconNode371);

// ../../node_modules/@lucide/vue/dist/esm/icons/joystick.mjs
var __iconNode372 = [
  [
    "path",
    {
      d: "M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z",
      key: "jg2n2t"
    }
  ],
  ["path", { d: "M6 15v-2", key: "gd6mvg" }],
  ["path", { d: "M12 15V9", key: "8c7uyn" }],
  ["circle", { cx: "12", cy: "6", r: "3", key: "1gm2ql" }]
];
var Joystick = createLucideIcon("joystick", __iconNode372);

// ../../node_modules/@lucide/vue/dist/esm/icons/kanban.mjs
var __iconNode373 = [
  ["path", { d: "M5 3v14", key: "9nsxs2" }],
  ["path", { d: "M12 3v8", key: "1h2ygw" }],
  ["path", { d: "M19 3v18", key: "1sk56x" }]
];
var Kanban = createLucideIcon("kanban", __iconNode373);

// ../../node_modules/@lucide/vue/dist/esm/icons/key.mjs
var __iconNode374 = [
  ["path", { d: "m2 21 9.6-9.6", key: "9l79m3" }],
  ["path", { d: "m7.5 15.5 2.3 2.3a1 1 0 0 1 0 1.4l-2.1 2.1a1 1 0 0 1-1.4 0L4 19", key: "fw8biw" }],
  ["circle", { cx: "15.5", cy: "7.5", r: "5.5", key: "4wxmhb" }]
];
var Key = createLucideIcon("key", __iconNode374);

// ../../node_modules/@lucide/vue/dist/esm/icons/key-round.mjs
var __iconNode375 = [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
];
var KeyRound = createLucideIcon("key-round", __iconNode375);

// ../../node_modules/@lucide/vue/dist/esm/icons/key-square.mjs
var __iconNode376 = [
  [
    "path",
    {
      d: "M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z",
      key: "165ttr"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  [
    "path",
    {
      d: "m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814",
      key: "1ubxi2"
    }
  ]
];
var KeySquare = createLucideIcon("key-square", __iconNode376);

// ../../node_modules/@lucide/vue/dist/esm/icons/keyboard.mjs
var __iconNode377 = [
  ["path", { d: "M10 8h.01", key: "1r9ogq" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M14 8h.01", key: "1primd" }],
  ["path", { d: "M16 12h.01", key: "1l6xoz" }],
  ["path", { d: "M18 8h.01", key: "emo2bl" }],
  ["path", { d: "M6 8h.01", key: "x9i8wu" }],
  ["path", { d: "M7 16h10", key: "wp8him" }],
  ["path", { d: "M8 12h.01", key: "czm47f" }],
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }]
];
var Keyboard = createLucideIcon("keyboard", __iconNode377);

// ../../node_modules/@lucide/vue/dist/esm/icons/lamp.mjs
var __iconNode378 = [
  ["path", { d: "M12 12v6", key: "3ahymv" }],
  [
    "path",
    {
      d: "M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z",
      key: "1l7kg2"
    }
  ],
  [
    "path",
    { d: "M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z", key: "1mmzpi" }
  ]
];
var Lamp = createLucideIcon("lamp", __iconNode378);

// ../../node_modules/@lucide/vue/dist/esm/icons/landmark.mjs
var __iconNode379 = [
  ["path", { d: "M10 18v-7", key: "wt116b" }],
  [
    "path",
    {
      d: "M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z",
      key: "yxxwt6"
    }
  ],
  ["path", { d: "M14 18v-7", key: "vav6t3" }],
  ["path", { d: "M18 18v-7", key: "aexdmj" }],
  ["path", { d: "M3 22h18", key: "8prr45" }],
  ["path", { d: "M6 18v-7", key: "1ivflk" }]
];
var Landmark = createLucideIcon("landmark", __iconNode379);

// ../../node_modules/@lucide/vue/dist/esm/icons/languages.mjs
var __iconNode380 = [
  ["path", { d: "m5 8 6 6", key: "1wu5hv" }],
  ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }],
  ["path", { d: "M2 5h12", key: "or177f" }],
  ["path", { d: "M7 2h1", key: "1t2jsx" }],
  ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }],
  ["path", { d: "M14 18h6", key: "1m8k6r" }]
];
var Languages = createLucideIcon("languages", __iconNode380);

// ../../node_modules/@lucide/vue/dist/esm/icons/laptop.mjs
var __iconNode381 = [
  [
    "path",
    {
      d: "M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z",
      key: "1pdavp"
    }
  ],
  ["path", { d: "M20.054 15.987H3.946", key: "14rxg9" }]
];
var Laptop = createLucideIcon("laptop", __iconNode381);

// ../../node_modules/@lucide/vue/dist/esm/icons/face-grinning.mjs
var __iconNode382 = [
  ["path", { d: "M15 10V9", key: "4dkmfx" }],
  [
    "path",
    {
      d: "M7.084 14.302a5.12 5.12 0 009.833 0 .24.24 0 00-.235-.302H7.32a.24.24 0 00-.235.302",
      key: "1ad3z7"
    }
  ],
  ["path", { d: "M9 10V9", key: "1lazqi" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
var FaceGrinning = createLucideIcon("face-grinning", __iconNode382);

// ../../node_modules/@lucide/vue/dist/esm/icons/layers.mjs
var __iconNode383 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
var Layers = createLucideIcon("layers", __iconNode383);

// ../../node_modules/@lucide/vue/dist/esm/icons/layout-dashboard.mjs
var __iconNode384 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
var LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode384);

// ../../node_modules/@lucide/vue/dist/esm/icons/layout-grid.mjs
var __iconNode385 = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
var LayoutGrid = createLucideIcon("layout-grid", __iconNode385);

// ../../node_modules/@lucide/vue/dist/esm/icons/layout-list.mjs
var __iconNode386 = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }],
  ["path", { d: "M14 4h7", key: "3xa0d5" }],
  ["path", { d: "M14 9h7", key: "1icrd9" }],
  ["path", { d: "M14 15h7", key: "1mj8o2" }],
  ["path", { d: "M14 20h7", key: "11slyb" }]
];
var LayoutList = createLucideIcon("layout-list", __iconNode386);

// ../../node_modules/@lucide/vue/dist/esm/icons/layout-panel-left.mjs
var __iconNode387 = [
  ["rect", { width: "7", height: "18", x: "3", y: "3", rx: "1", key: "2obqm" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }]
];
var LayoutPanelLeft = createLucideIcon("layout-panel-left", __iconNode387);

// ../../node_modules/@lucide/vue/dist/esm/icons/layout-panel-top.mjs
var __iconNode388 = [
  ["rect", { width: "18", height: "7", x: "3", y: "3", rx: "1", key: "f1a2em" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }]
];
var LayoutPanelTop = createLucideIcon("layout-panel-top", __iconNode388);

// ../../node_modules/@lucide/vue/dist/esm/icons/layout-template.mjs
var __iconNode389 = [
  ["rect", { width: "18", height: "7", x: "3", y: "3", rx: "1", key: "f1a2em" }],
  ["rect", { width: "9", height: "7", x: "3", y: "14", rx: "1", key: "jqznyg" }],
  ["rect", { width: "5", height: "7", x: "16", y: "14", rx: "1", key: "q5h2i8" }]
];
var LayoutTemplate = createLucideIcon("layout-template", __iconNode389);

// ../../node_modules/@lucide/vue/dist/esm/icons/leaf.mjs
var __iconNode390 = [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
];
var Leaf = createLucideIcon("leaf", __iconNode390);

// ../../node_modules/@lucide/vue/dist/esm/icons/library.mjs
var __iconNode391 = [
  ["path", { d: "m16 6 4 14", key: "ji33uf" }],
  ["path", { d: "M12 6v14", key: "1n7gus" }],
  ["path", { d: "M8 8v12", key: "1gg7y9" }],
  ["path", { d: "M4 4v16", key: "6qkkli" }]
];
var Library = createLucideIcon("library", __iconNode391);

// ../../node_modules/@lucide/vue/dist/esm/icons/library-big.mjs
var __iconNode392 = [
  ["rect", { width: "8", height: "18", x: "3", y: "3", rx: "1", key: "oynpb5" }],
  ["path", { d: "M7 3v18", key: "bbkbws" }],
  [
    "path",
    {
      d: "M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z",
      key: "1qboyk"
    }
  ]
];
var LibraryBig = createLucideIcon("library-big", __iconNode392);

// ../../node_modules/@lucide/vue/dist/esm/icons/life-buoy.mjs
var __iconNode393 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m4.93 4.93 4.24 4.24", key: "1ymg45" }],
  ["path", { d: "m14.83 9.17 4.24-4.24", key: "1cb5xl" }],
  ["path", { d: "m14.83 14.83 4.24 4.24", key: "q42g0n" }],
  ["path", { d: "m9.17 14.83-4.24 4.24", key: "bqpfvv" }],
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }]
];
var LifeBuoy = createLucideIcon("life-buoy", __iconNode393);

// ../../node_modules/@lucide/vue/dist/esm/icons/lightbulb.mjs
var __iconNode394 = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
var Lightbulb = createLucideIcon("lightbulb", __iconNode394);

// ../../node_modules/@lucide/vue/dist/esm/icons/chart-line.mjs
var __iconNode395 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "m19 9-5 5-4-4-3 3", key: "2osh9i" }]
];
var ChartLine = createLucideIcon("chart-line", __iconNode395);

// ../../node_modules/@lucide/vue/dist/esm/icons/link.mjs
var __iconNode396 = [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
];
var Link = createLucideIcon("link", __iconNode396);

// ../../node_modules/@lucide/vue/dist/esm/icons/link-2.mjs
var __iconNode397 = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
];
var Link2 = createLucideIcon("link-2", __iconNode397);

// ../../node_modules/@lucide/vue/dist/esm/icons/list.mjs
var __iconNode398 = [
  ["path", { d: "M3 5h.01", key: "18ugdj" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 19h.01", key: "noohij" }],
  ["path", { d: "M8 5h13", key: "1pao27" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 19h13", key: "m83p4d" }]
];
var List = createLucideIcon("list", __iconNode398);

// ../../node_modules/@lucide/vue/dist/esm/icons/list-checks.mjs
var __iconNode399 = [
  ["path", { d: "M13 5h8", key: "a7qcls" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 19h8", key: "c3s6r1" }],
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["path", { d: "m3 7 2 2 4-4", key: "1obspn" }]
];
var ListChecks = createLucideIcon("list-checks", __iconNode399);

// ../../node_modules/@lucide/vue/dist/esm/icons/list-collapse.mjs
var __iconNode400 = [
  ["path", { d: "M10 5h11", key: "1hkqpe" }],
  ["path", { d: "M10 12h11", key: "6m4ad9" }],
  ["path", { d: "M10 19h11", key: "14g2nv" }],
  ["path", { d: "m3 10 3-3-3-3", key: "i7pm08" }],
  ["path", { d: "m3 20 3-3-3-3", key: "20gx1n" }]
];
var ListCollapse = createLucideIcon("list-collapse", __iconNode400);

// ../../node_modules/@lucide/vue/dist/esm/icons/list-end.mjs
var __iconNode401 = [
  ["path", { d: "M16 5H3", key: "m91uny" }],
  ["path", { d: "M16 12H3", key: "1a2rj7" }],
  ["path", { d: "M9 19H3", key: "s61nz1" }],
  ["path", { d: "m16 16-3 3 3 3", key: "117b85" }],
  ["path", { d: "M21 5v12a2 2 0 0 1-2 2h-6", key: "hey24a" }]
];
var ListEnd = createLucideIcon("list-end", __iconNode401);

// ../../node_modules/@lucide/vue/dist/esm/icons/list-filter.mjs
var __iconNode402 = [
  ["path", { d: "M2 5h20", key: "1fs1ex" }],
  ["path", { d: "M6 12h12", key: "8npq4p" }],
  ["path", { d: "M9 19h6", key: "456am0" }]
];
var ListFilter = createLucideIcon("list-filter", __iconNode402);

// ../../node_modules/@lucide/vue/dist/esm/icons/list-minus.mjs
var __iconNode403 = [
  ["path", { d: "M16 5H3", key: "m91uny" }],
  ["path", { d: "M11 12H3", key: "51ecnj" }],
  ["path", { d: "M16 19H3", key: "zzsher" }],
  ["path", { d: "M21 12h-6", key: "bt1uis" }]
];
var ListMinus = createLucideIcon("list-minus", __iconNode403);

// ../../node_modules/@lucide/vue/dist/esm/icons/list-ordered.mjs
var __iconNode404 = [
  ["path", { d: "M11 5h10", key: "1cz7ny" }],
  ["path", { d: "M11 12h10", key: "1438ji" }],
  ["path", { d: "M11 19h10", key: "11t30w" }],
  ["path", { d: "M4 4h1v5", key: "10yrso" }],
  ["path", { d: "M4 9h2", key: "r1h2o0" }],
  ["path", { d: "M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02", key: "xtkcd5" }]
];
var ListOrdered = createLucideIcon("list-ordered", __iconNode404);

// ../../node_modules/@lucide/vue/dist/esm/icons/list-plus.mjs
var __iconNode405 = [
  ["path", { d: "M16 5H3", key: "m91uny" }],
  ["path", { d: "M11 12H3", key: "51ecnj" }],
  ["path", { d: "M16 19H3", key: "zzsher" }],
  ["path", { d: "M18 9v6", key: "1twb98" }],
  ["path", { d: "M21 12h-6", key: "bt1uis" }]
];
var ListPlus = createLucideIcon("list-plus", __iconNode405);

// ../../node_modules/@lucide/vue/dist/esm/icons/list-restart.mjs
var __iconNode406 = [
  ["path", { d: "M21 5H3", key: "1fi0y6" }],
  ["path", { d: "M7 12H3", key: "13ou7f" }],
  ["path", { d: "M7 19H3", key: "wbqt3n" }],
  [
    "path",
    {
      d: "M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14",
      key: "qth677"
    }
  ],
  ["path", { d: "M11 10v4h4", key: "172dkj" }]
];
var ListRestart = createLucideIcon("list-restart", __iconNode406);

// ../../node_modules/@lucide/vue/dist/esm/icons/list-start.mjs
var __iconNode407 = [
  ["path", { d: "M3 5h6", key: "1ltk0q" }],
  ["path", { d: "M3 12h13", key: "ppymz1" }],
  ["path", { d: "M3 19h13", key: "bpdczq" }],
  ["path", { d: "m16 8-3-3 3-3", key: "1pjpp6" }],
  ["path", { d: "M21 19V7a2 2 0 0 0-2-2h-6", key: "4zzq67" }]
];
var ListStart = createLucideIcon("list-start", __iconNode407);

// ../../node_modules/@lucide/vue/dist/esm/icons/list-todo.mjs
var __iconNode408 = [
  ["path", { d: "M13 5h8", key: "a7qcls" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 19h8", key: "c3s6r1" }],
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["rect", { x: "3", y: "4", width: "6", height: "6", rx: "1", key: "cif1o7" }]
];
var ListTodo = createLucideIcon("list-todo", __iconNode408);

// ../../node_modules/@lucide/vue/dist/esm/icons/list-tree.mjs
var __iconNode409 = [
  ["path", { d: "M8 5h13", key: "1pao27" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 19h8", key: "c3s6r1" }],
  ["path", { d: "M3 10a2 2 0 0 0 2 2h3", key: "1npucw" }],
  ["path", { d: "M3 5v12a2 2 0 0 0 2 2h3", key: "x1gjn2" }]
];
var ListTree = createLucideIcon("list-tree", __iconNode409);

// ../../node_modules/@lucide/vue/dist/esm/icons/list-x.mjs
var __iconNode410 = [
  ["path", { d: "M16 5H3", key: "m91uny" }],
  ["path", { d: "M11 12H3", key: "51ecnj" }],
  ["path", { d: "M16 19H3", key: "zzsher" }],
  ["path", { d: "m15.5 9.5 5 5", key: "ytk86i" }],
  ["path", { d: "m20.5 9.5-5 5", key: "17o44f" }]
];
var ListX = createLucideIcon("list-x", __iconNode410);

// ../../node_modules/@lucide/vue/dist/esm/icons/loader-circle.mjs
var __iconNode411 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
var LoaderCircle = createLucideIcon("loader-circle", __iconNode411);

// ../../node_modules/@lucide/vue/dist/esm/icons/locate.mjs
var __iconNode412 = [
  ["line", { x1: "2", x2: "5", y1: "12", y2: "12", key: "bvdh0s" }],
  ["line", { x1: "19", x2: "22", y1: "12", y2: "12", key: "1tbv5k" }],
  ["line", { x1: "12", x2: "12", y1: "2", y2: "5", key: "11lu5j" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }],
  ["circle", { cx: "12", cy: "12", r: "7", key: "fim9np" }]
];
var Locate = createLucideIcon("locate", __iconNode412);

// ../../node_modules/@lucide/vue/dist/esm/icons/locate-fixed.mjs
var __iconNode413 = [
  ["line", { x1: "2", x2: "5", y1: "12", y2: "12", key: "bvdh0s" }],
  ["line", { x1: "19", x2: "22", y1: "12", y2: "12", key: "1tbv5k" }],
  ["line", { x1: "12", x2: "12", y1: "2", y2: "5", key: "11lu5j" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }],
  ["circle", { cx: "12", cy: "12", r: "7", key: "fim9np" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
var LocateFixed = createLucideIcon("locate-fixed", __iconNode413);

// ../../node_modules/@lucide/vue/dist/esm/icons/locate-off.mjs
var __iconNode414 = [
  ["path", { d: "M12 19v3", key: "npa21l" }],
  ["path", { d: "M12 2v3", key: "qbqxhf" }],
  ["path", { d: "M18.89 13.24a7 7 0 0 0-8.13-8.13", key: "1v9jrh" }],
  ["path", { d: "M19 12h3", key: "osuazr" }],
  ["path", { d: "M2 12h3", key: "1wrr53" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M7.05 7.05a7 7 0 0 0 9.9 9.9", key: "rc5l2e" }]
];
var LocateOff = createLucideIcon("locate-off", __iconNode414);

// ../../node_modules/@lucide/vue/dist/esm/icons/lock.mjs
var __iconNode415 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
var Lock = createLucideIcon("lock", __iconNode415);

// ../../node_modules/@lucide/vue/dist/esm/icons/lock-keyhole.mjs
var __iconNode416 = [
  ["circle", { cx: "12", cy: "16", r: "1", key: "1au0dj" }],
  ["rect", { x: "3", y: "10", width: "18", height: "12", rx: "2", key: "6s8ecr" }],
  ["path", { d: "M7 10V7a5 5 0 0 1 10 0v3", key: "1pqi11" }]
];
var LockKeyhole = createLucideIcon("lock-keyhole", __iconNode416);

// ../../node_modules/@lucide/vue/dist/esm/icons/lock-open.mjs
var __iconNode417 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
];
var LockOpen = createLucideIcon("lock-open", __iconNode417);

// ../../node_modules/@lucide/vue/dist/esm/icons/log-in.mjs
var __iconNode418 = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
var LogIn = createLucideIcon("log-in", __iconNode418);

// ../../node_modules/@lucide/vue/dist/esm/icons/log-out.mjs
var __iconNode419 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
var LogOut = createLucideIcon("log-out", __iconNode419);

// ../../node_modules/@lucide/vue/dist/esm/icons/lollipop.mjs
var __iconNode420 = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
  ["path", { d: "M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0", key: "107gwy" }]
];
var Lollipop = createLucideIcon("lollipop", __iconNode420);

// ../../node_modules/@lucide/vue/dist/esm/icons/magnet.mjs
var __iconNode421 = [
  ["path", { d: "m12 15 4 4", key: "lnac28" }],
  [
    "path",
    {
      d: "M2.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.029-6.029a1 1 0 1 1 3 3l-6.029 6.029a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.365-6.367A1 1 0 0 0 8.716 4.282z",
      key: "nlhkjb"
    }
  ],
  ["path", { d: "m5 8 4 4", key: "j6kj7e" }]
];
var Magnet = createLucideIcon("magnet", __iconNode421);

// ../../node_modules/@lucide/vue/dist/esm/icons/mail.mjs
var __iconNode422 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
var Mail = createLucideIcon("mail", __iconNode422);

// ../../node_modules/@lucide/vue/dist/esm/icons/mail-check.mjs
var __iconNode423 = [
  ["path", { d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8", key: "12jkf8" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ["path", { d: "m16 19 2 2 4-4", key: "1b14m6" }]
];
var MailCheck = createLucideIcon("mail-check", __iconNode423);

// ../../node_modules/@lucide/vue/dist/esm/icons/mail-minus.mjs
var __iconNode424 = [
  ["path", { d: "M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8", key: "fuxbkv" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ["path", { d: "M16 19h6", key: "xwg31i" }]
];
var MailMinus = createLucideIcon("mail-minus", __iconNode424);

// ../../node_modules/@lucide/vue/dist/esm/icons/mail-open.mjs
var __iconNode425 = [
  [
    "path",
    {
      d: "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z",
      key: "1jhwl8"
    }
  ],
  ["path", { d: "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10", key: "1qfld7" }]
];
var MailOpen = createLucideIcon("mail-open", __iconNode425);

// ../../node_modules/@lucide/vue/dist/esm/icons/mail-plus.mjs
var __iconNode426 = [
  ["path", { d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8", key: "12jkf8" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ["path", { d: "M19 16v6", key: "tddt3s" }],
  ["path", { d: "M16 19h6", key: "xwg31i" }]
];
var MailPlus = createLucideIcon("mail-plus", __iconNode426);

// ../../node_modules/@lucide/vue/dist/esm/icons/mail-question-mark.mjs
var __iconNode427 = [
  ["path", { d: "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5", key: "e61zoh" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  [
    "path",
    {
      d: "M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2",
      key: "7z9rxb"
    }
  ],
  ["path", { d: "M20 22v.01", key: "12bgn6" }]
];
var MailQuestionMark = createLucideIcon("mail-question-mark", __iconNode427);

// ../../node_modules/@lucide/vue/dist/esm/icons/mail-warning.mjs
var __iconNode428 = [
  ["path", { d: "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5", key: "e61zoh" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ["path", { d: "M20 14v4", key: "1hm744" }],
  ["path", { d: "M20 22v.01", key: "12bgn6" }]
];
var MailWarning = createLucideIcon("mail-warning", __iconNode428);

// ../../node_modules/@lucide/vue/dist/esm/icons/mail-x.mjs
var __iconNode429 = [
  [
    "path",
    { d: "M22 12.532V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8.792", key: "8lpqwp" }
  ],
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["path", { d: "m16.5 16.5 5 5", key: "zc9lw7" }],
  ["path", { d: "m21.5 16.5-5 5", key: "1empo3" }]
];
var MailX = createLucideIcon("mail-x", __iconNode429);

// ../../node_modules/@lucide/vue/dist/esm/icons/map.mjs
var __iconNode430 = [
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
];
var Map = createLucideIcon("map", __iconNode430);

// ../../node_modules/@lucide/vue/dist/esm/icons/map-pin.mjs
var __iconNode431 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
var MapPin = createLucideIcon("map-pin", __iconNode431);

// ../../node_modules/@lucide/vue/dist/esm/icons/map-pin-off.mjs
var __iconNode432 = [
  ["path", { d: "M12.75 7.09a3 3 0 0 1 2.16 2.16", key: "1d4wjd" }],
  [
    "path",
    {
      d: "M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568",
      key: "12yil7"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533", key: "lhrkcz" }],
  ["path", { d: "M9.13 9.13a3 3 0 0 0 3.74 3.74", key: "13wojd" }]
];
var MapPinOff = createLucideIcon("map-pin-off", __iconNode432);

// ../../node_modules/@lucide/vue/dist/esm/icons/map-pinned.mjs
var __iconNode433 = [
  [
    "path",
    {
      d: "M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0",
      key: "11u0oz"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }],
  [
    "path",
    {
      d: "M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712",
      key: "q8zwxj"
    }
  ]
];
var MapPinned = createLucideIcon("map-pinned", __iconNode433);

// ../../node_modules/@lucide/vue/dist/esm/icons/maximize.mjs
var __iconNode434 = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
];
var Maximize = createLucideIcon("maximize", __iconNode434);

// ../../node_modules/@lucide/vue/dist/esm/icons/maximize-2.mjs
var __iconNode435 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
];
var Maximize2 = createLucideIcon("maximize-2", __iconNode435);

// ../../node_modules/@lucide/vue/dist/esm/icons/medal.mjs
var __iconNode436 = [
  [
    "path",
    {
      d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
      key: "143lza"
    }
  ],
  ["path", { d: "M11 12 5.12 2.2", key: "qhuxz6" }],
  ["path", { d: "m13 12 5.88-9.8", key: "hbye0f" }],
  ["path", { d: "M8 7h8", key: "i86dvs" }],
  ["circle", { cx: "12", cy: "17", r: "5", key: "qbz8iq" }],
  ["path", { d: "M12 18v-2h-.5", key: "fawc4q" }]
];
var Medal = createLucideIcon("medal", __iconNode436);

// ../../node_modules/@lucide/vue/dist/esm/icons/megaphone.mjs
var __iconNode437 = [
  [
    "path",
    {
      d: "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
      key: "q8bfy3"
    }
  ],
  ["path", { d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14", key: "1853fq" }],
  ["path", { d: "M8 6v8", key: "15ugcq" }]
];
var Megaphone = createLucideIcon("megaphone", __iconNode437);

// ../../node_modules/@lucide/vue/dist/esm/icons/face-neutral.mjs
var __iconNode438 = [
  ["path", { d: "M15 10V9", key: "4dkmfx" }],
  ["path", { d: "M8 16h8", key: "10ke2u" }],
  ["path", { d: "M9 10V9", key: "1lazqi" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
var FaceNeutral = createLucideIcon("face-neutral", __iconNode438);

// ../../node_modules/@lucide/vue/dist/esm/icons/menu.mjs
var __iconNode439 = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
var Menu = createLucideIcon("menu", __iconNode439);

// ../../node_modules/@lucide/vue/dist/esm/icons/merge.mjs
var __iconNode440 = [
  ["path", { d: "m8 6 4-4 4 4", key: "ybng9g" }],
  ["path", { d: "M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22", key: "1hyw0i" }],
  ["path", { d: "m20 22-5-5", key: "1m27yz" }]
];
var Merge = createLucideIcon("merge", __iconNode440);

// ../../node_modules/@lucide/vue/dist/esm/icons/message-circle.mjs
var __iconNode441 = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ]
];
var MessageCircle = createLucideIcon("message-circle", __iconNode441);

// ../../node_modules/@lucide/vue/dist/esm/icons/message-square.mjs
var __iconNode442 = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ]
];
var MessageSquare = createLucideIcon("message-square", __iconNode442);

// ../../node_modules/@lucide/vue/dist/esm/icons/messages-square.mjs
var __iconNode443 = [
  [
    "path",
    {
      d: "M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
      key: "1n2ejm"
    }
  ],
  [
    "path",
    {
      d: "M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1",
      key: "1qfcsi"
    }
  ]
];
var MessagesSquare = createLucideIcon("messages-square", __iconNode443);

// ../../node_modules/@lucide/vue/dist/esm/icons/mic.mjs
var __iconNode444 = [
  ["path", { d: "M12 19v3", key: "npa21l" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["rect", { x: "9", y: "2", width: "6", height: "13", rx: "3", key: "s6n7sd" }]
];
var Mic = createLucideIcon("mic", __iconNode444);

// ../../node_modules/@lucide/vue/dist/esm/icons/mic-vocal.mjs
var __iconNode445 = [
  [
    "path",
    {
      d: "m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",
      key: "80a601"
    }
  ],
  [
    "path",
    {
      d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",
      key: "j0ngtp"
    }
  ],
  ["circle", { cx: "16", cy: "7", r: "5", key: "d08jfb" }]
];
var MicVocal = createLucideIcon("mic-vocal", __iconNode445);

// ../../node_modules/@lucide/vue/dist/esm/icons/mic-off.mjs
var __iconNode446 = [
  ["path", { d: "M12 19v3", key: "npa21l" }],
  ["path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33", key: "1gzdoj" }],
  ["path", { d: "M16.95 16.95A7 7 0 0 1 5 12v-2", key: "cqa7eg" }],
  ["path", { d: "M18.89 13.23A7 7 0 0 0 19 12v-2", key: "16hl24" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12", key: "r2i35w" }]
];
var MicOff = createLucideIcon("mic-off", __iconNode446);

// ../../node_modules/@lucide/vue/dist/esm/icons/microscope.mjs
var __iconNode447 = [
  ["path", { d: "M6 18h8", key: "1borvv" }],
  ["path", { d: "M3 22h18", key: "8prr45" }],
  ["path", { d: "M14 22a7 7 0 1 0 0-14h-1", key: "1jwaiy" }],
  ["path", { d: "M9 14h2", key: "197e7h" }],
  ["path", { d: "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z", key: "1bmzmy" }],
  ["path", { d: "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3", key: "1drr47" }]
];
var Microscope = createLucideIcon("microscope", __iconNode447);

// ../../node_modules/@lucide/vue/dist/esm/icons/microwave.mjs
var __iconNode448 = [
  ["rect", { width: "20", height: "15", x: "2", y: "4", rx: "2", key: "2no95f" }],
  ["rect", { width: "8", height: "7", x: "6", y: "8", rx: "1", key: "zh9wx" }],
  ["path", { d: "M18 8v7", key: "o5zi4n" }],
  ["path", { d: "M6 19v2", key: "1loha6" }],
  ["path", { d: "M18 19v2", key: "1dawf0" }]
];
var Microwave = createLucideIcon("microwave", __iconNode448);

// ../../node_modules/@lucide/vue/dist/esm/icons/milestone.mjs
var __iconNode449 = [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M12 3v3", key: "1n5kay" }],
  [
    "path",
    {
      d: "M18.172 6a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
      key: "8gz4t4"
    }
  ]
];
var Milestone = createLucideIcon("milestone", __iconNode449);

// ../../node_modules/@lucide/vue/dist/esm/icons/milk.mjs
var __iconNode450 = [
  ["path", { d: "M8 2h8", key: "1ssgc1" }],
  [
    "path",
    {
      d: "M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2",
      key: "qtp12x"
    }
  ],
  ["path", { d: "M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0", key: "ygeh44" }]
];
var Milk = createLucideIcon("milk", __iconNode450);

// ../../node_modules/@lucide/vue/dist/esm/icons/minimize.mjs
var __iconNode451 = [
  ["path", { d: "M8 3v3a2 2 0 0 1-2 2H3", key: "hohbtr" }],
  ["path", { d: "M21 8h-3a2 2 0 0 1-2-2V3", key: "5jw1f3" }],
  ["path", { d: "M3 16h3a2 2 0 0 1 2 2v3", key: "198tvr" }],
  ["path", { d: "M16 21v-3a2 2 0 0 1 2-2h3", key: "ph8mxp" }]
];
var Minimize = createLucideIcon("minimize", __iconNode451);

// ../../node_modules/@lucide/vue/dist/esm/icons/minimize-2.mjs
var __iconNode452 = [
  ["path", { d: "m14 10 7-7", key: "oa77jy" }],
  ["path", { d: "M20 10h-6V4", key: "mjg0md" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M4 14h6v6", key: "rmj7iw" }]
];
var Minimize2 = createLucideIcon("minimize-2", __iconNode452);

// ../../node_modules/@lucide/vue/dist/esm/icons/minus.mjs
var __iconNode453 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
var Minus = createLucideIcon("minus", __iconNode453);

// ../../node_modules/@lucide/vue/dist/esm/icons/monitor.mjs
var __iconNode454 = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
];
var Monitor = createLucideIcon("monitor", __iconNode454);

// ../../node_modules/@lucide/vue/dist/esm/icons/monitor-play.mjs
var __iconNode455 = [
  [
    "path",
    {
      d: "M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z",
      key: "vbtd3f"
    }
  ],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
  ["rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", key: "x3v2xh" }]
];
var MonitorPlay = createLucideIcon("monitor-play", __iconNode455);

// ../../node_modules/@lucide/vue/dist/esm/icons/monitor-smartphone.mjs
var __iconNode456 = [
  ["path", { d: "M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8", key: "10dyio" }],
  ["path", { d: "M10 19v-3.96 3.15", key: "1irgej" }],
  ["path", { d: "M7 19h5", key: "qswx4l" }],
  ["rect", { width: "6", height: "10", x: "16", y: "12", rx: "2", key: "1egngj" }]
];
var MonitorSmartphone = createLucideIcon("monitor-smartphone", __iconNode456);

// ../../node_modules/@lucide/vue/dist/esm/icons/monitor-speaker.mjs
var __iconNode457 = [
  ["path", { d: "M5.5 20H8", key: "1k40s5" }],
  ["path", { d: "M17 9h.01", key: "1j24nn" }],
  ["rect", { width: "10", height: "16", x: "12", y: "4", rx: "2", key: "ixliua" }],
  ["path", { d: "M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4", key: "1mp6e1" }],
  ["circle", { cx: "17", cy: "15", r: "1", key: "tqvash" }]
];
var MonitorSpeaker = createLucideIcon("monitor-speaker", __iconNode457);

// ../../node_modules/@lucide/vue/dist/esm/icons/moon.mjs
var __iconNode458 = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
];
var Moon = createLucideIcon("moon", __iconNode458);

// ../../node_modules/@lucide/vue/dist/esm/icons/moon-star.mjs
var __iconNode459 = [
  ["path", { d: "M18 5h4", key: "1lhgn2" }],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
];
var MoonStar = createLucideIcon("moon-star", __iconNode459);

// ../../node_modules/@lucide/vue/dist/esm/icons/ellipsis.mjs
var __iconNode460 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
];
var Ellipsis = createLucideIcon("ellipsis", __iconNode460);

// ../../node_modules/@lucide/vue/dist/esm/icons/ellipsis-vertical.mjs
var __iconNode461 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
];
var EllipsisVertical = createLucideIcon("ellipsis-vertical", __iconNode461);

// ../../node_modules/@lucide/vue/dist/esm/icons/mountain.mjs
var __iconNode462 = [["path", { d: "m8 3 4 8 5-5 5 15H2L8 3z", key: "otkl63" }]];
var Mountain = createLucideIcon("mountain", __iconNode462);

// ../../node_modules/@lucide/vue/dist/esm/icons/mouse.mjs
var __iconNode463 = [
  ["rect", { x: "5", y: "2", width: "14", height: "20", rx: "7", key: "11ol66" }],
  ["path", { d: "M12 6v4", key: "16clxf" }]
];
var Mouse = createLucideIcon("mouse", __iconNode463);

// ../../node_modules/@lucide/vue/dist/esm/icons/mouse-pointer.mjs
var __iconNode464 = [
  ["path", { d: "M12.586 12.586 19 19", key: "ea5xo7" }],
  [
    "path",
    {
      d: "M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z",
      key: "277e5u"
    }
  ]
];
var MousePointer = createLucideIcon("mouse-pointer", __iconNode464);

// ../../node_modules/@lucide/vue/dist/esm/icons/mouse-pointer-2.mjs
var __iconNode465 = [
  [
    "path",
    {
      d: "M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",
      key: "edeuup"
    }
  ]
];
var MousePointer2 = createLucideIcon("mouse-pointer-2", __iconNode465);

// ../../node_modules/@lucide/vue/dist/esm/icons/move.mjs
var __iconNode466 = [
  ["path", { d: "M12 2v20", key: "t6zp3m" }],
  ["path", { d: "m15 19-3 3-3-3", key: "11eu04" }],
  ["path", { d: "m19 9 3 3-3 3", key: "1mg7y2" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "m5 9-3 3 3 3", key: "j64kie" }],
  ["path", { d: "m9 5 3-3 3 3", key: "l8vdw6" }]
];
var Move = createLucideIcon("move", __iconNode466);

// ../../node_modules/@lucide/vue/dist/esm/icons/move-3d.mjs
var __iconNode467 = [
  ["path", { d: "M5 3v16h16", key: "1mqmf9" }],
  ["path", { d: "m5 19 6-6", key: "jh6hbb" }],
  ["path", { d: "m2 6 3-3 3 3", key: "tkyvxa" }],
  ["path", { d: "m18 16 3 3-3 3", key: "1d4glt" }]
];
var Move3d = createLucideIcon("move-3d", __iconNode467);

// ../../node_modules/@lucide/vue/dist/esm/icons/music.mjs
var __iconNode468 = [
  ["path", { d: "M9 18V5l12-2v13", key: "1jmyc2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }]
];
var Music = createLucideIcon("music", __iconNode468);

// ../../node_modules/@lucide/vue/dist/esm/icons/music-2.mjs
var __iconNode469 = [
  ["circle", { cx: "8", cy: "18", r: "4", key: "1fc0mg" }],
  ["path", { d: "M12 18V2l7 4", key: "g04rme" }]
];
var Music2 = createLucideIcon("music-2", __iconNode469);

// ../../node_modules/@lucide/vue/dist/esm/icons/music-3.mjs
var __iconNode470 = [
  ["circle", { cx: "12", cy: "18", r: "4", key: "m3r9ws" }],
  ["path", { d: "M16 18V2", key: "40x2m5" }]
];
var Music3 = createLucideIcon("music-3", __iconNode470);

// ../../node_modules/@lucide/vue/dist/esm/icons/music-4.mjs
var __iconNode471 = [
  ["path", { d: "M9 18V5l12-2v13", key: "1jmyc2" }],
  ["path", { d: "m9 9 12-2", key: "1e64n2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }]
];
var Music4 = createLucideIcon("music-4", __iconNode471);

// ../../node_modules/@lucide/vue/dist/esm/icons/navigation.mjs
var __iconNode472 = [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
];
var Navigation = createLucideIcon("navigation", __iconNode472);

// ../../node_modules/@lucide/vue/dist/esm/icons/navigation-off.mjs
var __iconNode473 = [
  ["path", { d: "M8.43 8.43 3 11l8 2 2 8 2.57-5.43", key: "1vdtb7" }],
  ["path", { d: "M17.39 11.73 22 2l-9.73 4.61", key: "tya3r6" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
];
var NavigationOff = createLucideIcon("navigation-off", __iconNode473);

// ../../node_modules/@lucide/vue/dist/esm/icons/network.mjs
var __iconNode474 = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
];
var Network = createLucideIcon("network", __iconNode474);

// ../../node_modules/@lucide/vue/dist/esm/icons/newspaper.mjs
var __iconNode475 = [
  ["path", { d: "M15 18h-5", key: "95g1m2" }],
  ["path", { d: "M18 14h-8", key: "sponae" }],
  [
    "path",
    {
      d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",
      key: "39pd36"
    }
  ],
  ["rect", { width: "8", height: "4", x: "10", y: "6", rx: "1", key: "aywv1n" }]
];
var Newspaper = createLucideIcon("newspaper", __iconNode475);

// ../../node_modules/@lucide/vue/dist/esm/icons/nfc.mjs
var __iconNode476 = [
  ["path", { d: "M6 8.32a7.43 7.43 0 0 1 0 7.36", key: "9iaqei" }],
  ["path", { d: "M9.46 6.21a11.76 11.76 0 0 1 0 11.58", key: "1yha7l" }],
  ["path", { d: "M12.91 4.1a15.91 15.91 0 0 1 .01 15.8", key: "4iu2gk" }],
  ["path", { d: "M16.37 2a20.16 20.16 0 0 1 0 20", key: "sap9u2" }]
];
var Nfc = createLucideIcon("nfc", __iconNode476);

// ../../node_modules/@lucide/vue/dist/esm/icons/notebook.mjs
var __iconNode477 = [
  ["path", { d: "M2 6h4", key: "aawbzj" }],
  ["path", { d: "M2 10h4", key: "l0bgd4" }],
  ["path", { d: "M2 14h4", key: "1gsvsf" }],
  ["path", { d: "M2 18h4", key: "1bu2t1" }],
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["path", { d: "M16 2v20", key: "rotuqe" }]
];
var Notebook = createLucideIcon("notebook", __iconNode477);

// ../../node_modules/@lucide/vue/dist/esm/icons/notebook-pen.mjs
var __iconNode478 = [
  ["path", { d: "M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4", key: "re6nr2" }],
  ["path", { d: "M2 6h4", key: "aawbzj" }],
  ["path", { d: "M2 10h4", key: "l0bgd4" }],
  ["path", { d: "M2 14h4", key: "1gsvsf" }],
  ["path", { d: "M2 18h4", key: "1bu2t1" }],
  [
    "path",
    {
      d: "M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "pqwjuv"
    }
  ]
];
var NotebookPen = createLucideIcon("notebook-pen", __iconNode478);

// ../../node_modules/@lucide/vue/dist/esm/icons/notebook-tabs.mjs
var __iconNode479 = [
  ["path", { d: "M2 6h4", key: "aawbzj" }],
  ["path", { d: "M2 10h4", key: "l0bgd4" }],
  ["path", { d: "M2 14h4", key: "1gsvsf" }],
  ["path", { d: "M2 18h4", key: "1bu2t1" }],
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["path", { d: "M15 2v20", key: "dcj49h" }],
  ["path", { d: "M15 7h5", key: "1xj5lc" }],
  ["path", { d: "M15 12h5", key: "w5shd9" }],
  ["path", { d: "M15 17h5", key: "1qaofu" }]
];
var NotebookTabs = createLucideIcon("notebook-tabs", __iconNode479);

// ../../node_modules/@lucide/vue/dist/esm/icons/notebook-text.mjs
var __iconNode480 = [
  ["path", { d: "M2 6h4", key: "aawbzj" }],
  ["path", { d: "M2 10h4", key: "l0bgd4" }],
  ["path", { d: "M2 14h4", key: "1gsvsf" }],
  ["path", { d: "M2 18h4", key: "1bu2t1" }],
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["path", { d: "M9.5 8h5", key: "11mslq" }],
  ["path", { d: "M9.5 12H16", key: "ktog6x" }],
  ["path", { d: "M9.5 16H14", key: "p1seyn" }]
];
var NotebookText = createLucideIcon("notebook-text", __iconNode480);

// ../../node_modules/@lucide/vue/dist/esm/icons/notepad-text.mjs
var __iconNode481 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M12 2v4", key: "3427ic" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "16", height: "18", x: "4", y: "4", rx: "2", key: "1u9h20" }],
  ["path", { d: "M8 10h6", key: "3oa6kw" }],
  ["path", { d: "M8 14h8", key: "1fgep2" }],
  ["path", { d: "M8 18h5", key: "17enja" }]
];
var NotepadText = createLucideIcon("notepad-text", __iconNode481);

// ../../node_modules/@lucide/vue/dist/esm/icons/nut.mjs
var __iconNode482 = [
  ["path", { d: "M12 4V2", key: "1k5q1u" }],
  [
    "path",
    {
      d: "M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4",
      key: "1tgyif"
    }
  ],
  [
    "path",
    {
      d: "M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z",
      key: "tnsqj"
    }
  ]
];
var Nut = createLucideIcon("nut", __iconNode482);

// ../../node_modules/@lucide/vue/dist/esm/icons/octagon.mjs
var __iconNode483 = [
  [
    "path",
    {
      d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
      key: "2d38gg"
    }
  ]
];
var Octagon = createLucideIcon("octagon", __iconNode483);

// ../../node_modules/@lucide/vue/dist/esm/icons/octagon-alert.mjs
var __iconNode484 = [
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  [
    "path",
    {
      d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
      key: "1fd625"
    }
  ]
];
var OctagonAlert = createLucideIcon("octagon-alert", __iconNode484);

// ../../node_modules/@lucide/vue/dist/esm/icons/orbit.mjs
var __iconNode485 = [
  ["path", { d: "M20.341 6.484A10 10 0 0 1 10.266 21.85", key: "1enhxb" }],
  ["path", { d: "M3.659 17.516A10 10 0 0 1 13.74 2.152", key: "1crzgf" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["circle", { cx: "19", cy: "5", r: "2", key: "mhkx31" }],
  ["circle", { cx: "5", cy: "19", r: "2", key: "v8kfzx" }]
];
var Orbit = createLucideIcon("orbit", __iconNode485);

// ../../node_modules/@lucide/vue/dist/esm/icons/package.mjs
var __iconNode486 = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
var Package = createLucideIcon("package", __iconNode486);

// ../../node_modules/@lucide/vue/dist/esm/icons/package-2.mjs
var __iconNode487 = [
  ["path", { d: "M12 3v6", key: "1holv5" }],
  [
    "path",
    {
      d: "M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z",
      key: "187q7i"
    }
  ],
  ["path", { d: "M3.054 9.013h17.893", key: "grwhos" }]
];
var Package2 = createLucideIcon("package-2", __iconNode487);

// ../../node_modules/@lucide/vue/dist/esm/icons/package-check.mjs
var __iconNode488 = [
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["path", { d: "m16 17 2 2 4-4", key: "uh5qu3" }],
  [
    "path",
    {
      d: "M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753",
      key: "kpkbpo"
    }
  ],
  ["path", { d: "M3.29 7 12 12l8.71-5", key: "19ckod" }],
  ["path", { d: "m7.5 4.27 8.997 5.148", key: "9yrvtv" }]
];
var PackageCheck = createLucideIcon("package-check", __iconNode488);

// ../../node_modules/@lucide/vue/dist/esm/icons/package-minus.mjs
var __iconNode489 = [
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["path", { d: "M16 17h6", key: "1ook5g" }],
  [
    "path",
    {
      d: "M21 13V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955",
      key: "zu9avd"
    }
  ],
  ["path", { d: "M3.29 7 12 12l8.71-5", key: "19ckod" }],
  ["path", { d: "m7.5 4.27 8.997 5.148", key: "9yrvtv" }]
];
var PackageMinus = createLucideIcon("package-minus", __iconNode489);

// ../../node_modules/@lucide/vue/dist/esm/icons/package-open.mjs
var __iconNode490 = [
  ["path", { d: "M12 22v-9", key: "x3hkom" }],
  [
    "path",
    {
      d: "M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",
      key: "2ntwy6"
    }
  ],
  [
    "path",
    {
      d: "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",
      key: "1pmm1c"
    }
  ],
  [
    "path",
    {
      d: "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",
      key: "12ttoo"
    }
  ]
];
var PackageOpen = createLucideIcon("package-open", __iconNode490);

// ../../node_modules/@lucide/vue/dist/esm/icons/package-plus.mjs
var __iconNode491 = [
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["path", { d: "M16 17h6", key: "1ook5g" }],
  ["path", { d: "M19 14v6", key: "1ckrd5" }],
  [
    "path",
    {
      d: "M21 10.535V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955",
      key: "28k6lz"
    }
  ],
  ["path", { d: "M3.29 7 12 12l8.71-5", key: "19ckod" }],
  ["path", { d: "m7.5 4.27 8.997 5.148", key: "9yrvtv" }]
];
var PackagePlus = createLucideIcon("package-plus", __iconNode491);

// ../../node_modules/@lucide/vue/dist/esm/icons/package-search.mjs
var __iconNode492 = [
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["path", { d: "M20.27 18.27 22 20", key: "er2am" }],
  [
    "path",
    {
      d: "M21 10.498V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.98-.559",
      key: "tok1h1"
    }
  ],
  ["path", { d: "M3.29 7 12 12l8.71-5", key: "19ckod" }],
  ["path", { d: "m7.5 4.27 8.997 5.148", key: "9yrvtv" }],
  ["circle", { cx: "18.5", cy: "16.5", r: "2.5", key: "ke13xx" }]
];
var PackageSearch = createLucideIcon("package-search", __iconNode492);

// ../../node_modules/@lucide/vue/dist/esm/icons/package-x.mjs
var __iconNode493 = [
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["path", { d: "m16.5 14.5 5 5", key: "ozpm51" }],
  ["path", { d: "m16.5 19.5 5-5", key: "syf6b9" }],
  [
    "path",
    {
      d: "M21 10.5V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.13-.074",
      key: "isw6gs"
    }
  ],
  ["path", { d: "M3.29 7 12 12l8.71-5", key: "19ckod" }],
  ["path", { d: "m7.5 4.27 8.997 5.148", key: "9yrvtv" }]
];
var PackageX = createLucideIcon("package-x", __iconNode493);

// ../../node_modules/@lucide/vue/dist/esm/icons/paintbrush.mjs
var __iconNode494 = [
  ["path", { d: "m14.622 17.897-10.68-2.913", key: "vj2p1u" }],
  [
    "path",
    {
      d: "M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z",
      key: "18tc5c"
    }
  ],
  [
    "path",
    {
      d: "M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15",
      key: "ytzfxy"
    }
  ]
];
var Paintbrush = createLucideIcon("paintbrush", __iconNode494);

// ../../node_modules/@lucide/vue/dist/esm/icons/palette.mjs
var __iconNode495 = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
];
var Palette = createLucideIcon("palette", __iconNode495);

// ../../node_modules/@lucide/vue/dist/esm/icons/panel-bottom.mjs
var __iconNode496 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 15h18", key: "5xshup" }]
];
var PanelBottom = createLucideIcon("panel-bottom", __iconNode496);

// ../../node_modules/@lucide/vue/dist/esm/icons/panel-left.mjs
var __iconNode497 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }]
];
var PanelLeft = createLucideIcon("panel-left", __iconNode497);

// ../../node_modules/@lucide/vue/dist/esm/icons/panel-left-close.mjs
var __iconNode498 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "m16 15-3-3 3-3", key: "14y99z" }]
];
var PanelLeftClose = createLucideIcon("panel-left-close", __iconNode498);

// ../../node_modules/@lucide/vue/dist/esm/icons/panel-left-open.mjs
var __iconNode499 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "m14 9 3 3-3 3", key: "8010ee" }]
];
var PanelLeftOpen = createLucideIcon("panel-left-open", __iconNode499);

// ../../node_modules/@lucide/vue/dist/esm/icons/panel-right.mjs
var __iconNode500 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
];
var PanelRight = createLucideIcon("panel-right", __iconNode500);

// ../../node_modules/@lucide/vue/dist/esm/icons/panel-top.mjs
var __iconNode501 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }]
];
var PanelTop = createLucideIcon("panel-top", __iconNode501);

// ../../node_modules/@lucide/vue/dist/esm/icons/paperclip.mjs
var __iconNode502 = [
  [
    "path",
    {
      d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
      key: "1miecu"
    }
  ]
];
var Paperclip = createLucideIcon("paperclip", __iconNode502);

// ../../node_modules/@lucide/vue/dist/esm/icons/parking-meter.mjs
var __iconNode503 = [
  ["path", { d: "M11 15h2", key: "199qp6" }],
  ["path", { d: "M12 12v3", key: "158kv8" }],
  ["path", { d: "M12 19v3", key: "npa21l" }],
  [
    "path",
    {
      d: "M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z",
      key: "1jofit"
    }
  ],
  ["path", { d: "M9 9a3 3 0 1 1 6 0", key: "jdoeu8" }]
];
var ParkingMeter = createLucideIcon("parking-meter", __iconNode503);

// ../../node_modules/@lucide/vue/dist/esm/icons/pause.mjs
var __iconNode504 = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
];
var Pause = createLucideIcon("pause", __iconNode504);

// ../../node_modules/@lucide/vue/dist/esm/icons/paw-print.mjs
var __iconNode505 = [
  ["circle", { cx: "11", cy: "4", r: "2", key: "vol9p0" }],
  ["circle", { cx: "18", cy: "8", r: "2", key: "17gozi" }],
  ["circle", { cx: "20", cy: "16", r: "2", key: "1v9bxh" }],
  [
    "path",
    {
      d: "M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z",
      key: "1ydw1z"
    }
  ]
];
var PawPrint = createLucideIcon("paw-print", __iconNode505);

// ../../node_modules/@lucide/vue/dist/esm/icons/pen-line.mjs
var __iconNode506 = [
  ["path", { d: "M13 21h8", key: "1jsn5i" }],
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
var PenLine = createLucideIcon("pen-line", __iconNode506);

// ../../node_modules/@lucide/vue/dist/esm/icons/pen-tool.mjs
var __iconNode507 = [
  [
    "path",
    {
      d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",
      key: "nt11vn"
    }
  ],
  [
    "path",
    {
      d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",
      key: "15qc1e"
    }
  ],
  ["path", { d: "m2.3 2.3 7.286 7.286", key: "1wuzzi" }],
  ["circle", { cx: "11", cy: "11", r: "2", key: "xmgehs" }]
];
var PenTool = createLucideIcon("pen-tool", __iconNode507);

// ../../node_modules/@lucide/vue/dist/esm/icons/pencil.mjs
var __iconNode508 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
var Pencil = createLucideIcon("pencil", __iconNode508);

// ../../node_modules/@lucide/vue/dist/esm/icons/pencil-line.mjs
var __iconNode509 = [
  ["path", { d: "M13 21h8", key: "1jsn5i" }],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }],
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
var PencilLine = createLucideIcon("pencil-line", __iconNode509);

// ../../node_modules/@lucide/vue/dist/esm/icons/pencil-ruler.mjs
var __iconNode510 = [
  [
    "path",
    { d: "M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13", key: "orapub" }
  ],
  ["path", { d: "m8 6 2-2", key: "115y1s" }],
  ["path", { d: "m18 16 2-2", key: "ee94s4" }],
  [
    "path",
    {
      d: "m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17",
      key: "cfq27r"
    }
  ],
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
var PencilRuler = createLucideIcon("pencil-ruler", __iconNode510);

// ../../node_modules/@lucide/vue/dist/esm/icons/pentagon.mjs
var __iconNode511 = [
  [
    "path",
    {
      d: "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",
      key: "2hea0t"
    }
  ]
];
var Pentagon = createLucideIcon("pentagon", __iconNode511);

// ../../node_modules/@lucide/vue/dist/esm/icons/percent.mjs
var __iconNode512 = [
  ["line", { x1: "19", x2: "5", y1: "5", y2: "19", key: "1x9vlm" }],
  ["circle", { cx: "6.5", cy: "6.5", r: "2.5", key: "4mh3h7" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "2.5", key: "1mdrzq" }]
];
var Percent = createLucideIcon("percent", __iconNode512);

// ../../node_modules/@lucide/vue/dist/esm/icons/phone.mjs
var __iconNode513 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
var Phone = createLucideIcon("phone", __iconNode513);

// ../../node_modules/@lucide/vue/dist/esm/icons/phone-call.mjs
var __iconNode514 = [
  ["path", { d: "M13 2a9 9 0 0 1 9 9", key: "1itnx2" }],
  ["path", { d: "M13 6a5 5 0 0 1 5 5", key: "11nki7" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
var PhoneCall = createLucideIcon("phone-call", __iconNode514);

// ../../node_modules/@lucide/vue/dist/esm/icons/phone-forwarded.mjs
var __iconNode515 = [
  ["path", { d: "M14 6h8", key: "yd68k4" }],
  ["path", { d: "m18 2 4 4-4 4", key: "pucp1d" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
var PhoneForwarded = createLucideIcon("phone-forwarded", __iconNode515);

// ../../node_modules/@lucide/vue/dist/esm/icons/phone-incoming.mjs
var __iconNode516 = [
  ["path", { d: "M16 2v6h6", key: "1mfrl5" }],
  ["path", { d: "m22 2-6 6", key: "6f0sa0" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
var PhoneIncoming = createLucideIcon("phone-incoming", __iconNode516);

// ../../node_modules/@lucide/vue/dist/esm/icons/phone-missed.mjs
var __iconNode517 = [
  ["path", { d: "m16 2 6 6", key: "1gw87d" }],
  ["path", { d: "m22 2-6 6", key: "6f0sa0" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
var PhoneMissed = createLucideIcon("phone-missed", __iconNode517);

// ../../node_modules/@lucide/vue/dist/esm/icons/phone-off.mjs
var __iconNode518 = [
  [
    "path",
    {
      d: "M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272",
      key: "1wngk7"
    }
  ],
  ["path", { d: "M22 2 2 22", key: "y4kqgn" }],
  [
    "path",
    {
      d: "M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473",
      key: "10hv5p"
    }
  ]
];
var PhoneOff = createLucideIcon("phone-off", __iconNode518);

// ../../node_modules/@lucide/vue/dist/esm/icons/phone-outgoing.mjs
var __iconNode519 = [
  ["path", { d: "m16 8 6-6", key: "oawc05" }],
  ["path", { d: "M22 8V2h-6", key: "oqy2zc" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
var PhoneOutgoing = createLucideIcon("phone-outgoing", __iconNode519);

// ../../node_modules/@lucide/vue/dist/esm/icons/pi.mjs
var __iconNode520 = [
  ["line", { x1: "9", x2: "9", y1: "4", y2: "20", key: "ovs5a5" }],
  ["path", { d: "M4 7c0-1.7 1.3-3 3-3h13", key: "10pag4" }],
  ["path", { d: "M18 20c-1.7 0-3-1.3-3-3V4", key: "1gaosr" }]
];
var Pi = createLucideIcon("pi", __iconNode520);

// ../../node_modules/@lucide/vue/dist/esm/icons/pickaxe.mjs
var __iconNode521 = [
  ["path", { d: "m14 13-8.381 8.38a1 1 0 0 1-3.001-3L11 9.999", key: "1lw9ds" }],
  [
    "path",
    {
      d: "M15.973 4.027A13 13 0 0 0 5.902 2.373c-1.398.342-1.092 2.158.277 2.601a19.9 19.9 0 0 1 5.822 3.024",
      key: "ffj4ej"
    }
  ],
  [
    "path",
    {
      d: "M16.001 11.999a19.9 19.9 0 0 1 3.024 5.824c.444 1.369 2.26 1.676 2.603.278A13 13 0 0 0 20 8.069",
      key: "8tj4zw"
    }
  ],
  [
    "path",
    {
      d: "M18.352 3.352a1.205 1.205 0 0 0-1.704 0l-5.296 5.296a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l5.296-5.296a1.205 1.205 0 0 0 0-1.704z",
      key: "hh6h97"
    }
  ]
];
var Pickaxe = createLucideIcon("pickaxe", __iconNode521);

// ../../node_modules/@lucide/vue/dist/esm/icons/picture-in-picture.mjs
var __iconNode522 = [
  ["path", { d: "M2 10h6V4", key: "zwrco" }],
  ["path", { d: "m2 4 6 6", key: "ug085t" }],
  ["path", { d: "M21 10V7a2 2 0 0 0-2-2h-7", key: "git5jr" }],
  ["path", { d: "M3 14v2a2 2 0 0 0 2 2h3", key: "1f7fh3" }],
  ["rect", { x: "12", y: "14", width: "10", height: "7", rx: "1", key: "1wjs3o" }]
];
var PictureInPicture = createLucideIcon("picture-in-picture", __iconNode522);

// ../../node_modules/@lucide/vue/dist/esm/icons/picture-in-picture-2.mjs
var __iconNode523 = [
  ["path", { d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4", key: "daa4of" }],
  ["rect", { width: "10", height: "7", x: "12", y: "13", rx: "2", key: "1nb8gs" }]
];
var PictureInPicture2 = createLucideIcon("picture-in-picture-2", __iconNode523);

// ../../node_modules/@lucide/vue/dist/esm/icons/chart-pie.mjs
var __iconNode524 = [
  [
    "path",
    {
      d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
      key: "pzmjnu"
    }
  ],
  ["path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83", key: "k2fpak" }]
];
var ChartPie = createLucideIcon("chart-pie", __iconNode524);

// ../../node_modules/@lucide/vue/dist/esm/icons/piggy-bank.mjs
var __iconNode525 = [
  [
    "path",
    {
      d: "M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z",
      key: "1piglc"
    }
  ],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M2 8v1a2 2 0 0 0 2 2h1", key: "1env43" }]
];
var PiggyBank = createLucideIcon("piggy-bank", __iconNode525);

// ../../node_modules/@lucide/vue/dist/esm/icons/pilcrow.mjs
var __iconNode526 = [
  ["path", { d: "M13 4v16", key: "8vvj80" }],
  ["path", { d: "M17 4v16", key: "7dpous" }],
  ["path", { d: "M19 4H9.5a4.5 4.5 0 0 0 0 9H13", key: "sh4n9v" }]
];
var Pilcrow = createLucideIcon("pilcrow", __iconNode526);

// ../../node_modules/@lucide/vue/dist/esm/icons/pill.mjs
var __iconNode527 = [
  [
    "path",
    { d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z", key: "wa1lgi" }
  ],
  ["path", { d: "m8.5 8.5 7 7", key: "rvfmvr" }]
];
var Pill = createLucideIcon("pill", __iconNode527);

// ../../node_modules/@lucide/vue/dist/esm/icons/pill-bottle.mjs
var __iconNode528 = [
  ["path", { d: "M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4", key: "17ldeb" }],
  ["path", { d: "M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7", key: "nc37y6" }],
  ["rect", { width: "16", height: "5", x: "4", y: "2", rx: "1", key: "3jeezo" }]
];
var PillBottle = createLucideIcon("pill-bottle", __iconNode528);

// ../../node_modules/@lucide/vue/dist/esm/icons/pin.mjs
var __iconNode529 = [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  [
    "path",
    {
      d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
      key: "1nkz8b"
    }
  ]
];
var Pin = createLucideIcon("pin", __iconNode529);

// ../../node_modules/@lucide/vue/dist/esm/icons/pin-off.mjs
var __iconNode530 = [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  ["path", { d: "M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89", key: "znwnzq" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11",
      key: "c9qhm2"
    }
  ]
];
var PinOff = createLucideIcon("pin-off", __iconNode530);

// ../../node_modules/@lucide/vue/dist/esm/icons/pizza.mjs
var __iconNode531 = [
  ["path", { d: "m12 14-1 1", key: "11onhr" }],
  ["path", { d: "m13.75 18.25-1.25 1.42", key: "1yisr3" }],
  ["path", { d: "M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12", key: "1qtqk6" }],
  ["path", { d: "M18.8 9.3a1 1 0 0 0 2.1 7.7", key: "fbbbr2" }],
  [
    "path",
    {
      d: "M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",
      key: "1hyfdd"
    }
  ]
];
var Pizza = createLucideIcon("pizza", __iconNode531);

// ../../node_modules/@lucide/vue/dist/esm/icons/plane.mjs
var __iconNode532 = [
  [
    "path",
    {
      d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
      key: "1v9wt8"
    }
  ]
];
var Plane = createLucideIcon("plane", __iconNode532);

// ../../node_modules/@lucide/vue/dist/esm/icons/plane-landing.mjs
var __iconNode533 = [
  ["path", { d: "M2 22h20", key: "272qi7" }],
  [
    "path",
    {
      d: "M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z",
      key: "1ma21e"
    }
  ]
];
var PlaneLanding = createLucideIcon("plane-landing", __iconNode533);

// ../../node_modules/@lucide/vue/dist/esm/icons/plane-takeoff.mjs
var __iconNode534 = [
  ["path", { d: "M2 22h20", key: "272qi7" }],
  [
    "path",
    {
      d: "M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z",
      key: "fkigj9"
    }
  ]
];
var PlaneTakeoff = createLucideIcon("plane-takeoff", __iconNode534);

// ../../node_modules/@lucide/vue/dist/esm/icons/play.mjs
var __iconNode535 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
];
var Play = createLucideIcon("play", __iconNode535);

// ../../node_modules/@lucide/vue/dist/esm/icons/plug.mjs
var __iconNode536 = [
  ["path", { d: "M12 22v-5", key: "1ega77" }],
  ["path", { d: "M15 8V2", key: "18g5xt" }],
  [
    "path",
    { d: "M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z", key: "1xoxul" }
  ],
  ["path", { d: "M9 8V2", key: "14iosj" }]
];
var Plug = createLucideIcon("plug", __iconNode536);

// ../../node_modules/@lucide/vue/dist/esm/icons/plug-zap.mjs
var __iconNode537 = [
  [
    "path",
    { d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z", key: "goz73y" }
  ],
  ["path", { d: "m2 22 3-3", key: "19mgm9" }],
  ["path", { d: "M7.5 13.5 10 11", key: "7xgeeb" }],
  ["path", { d: "M10.5 16.5 13 14", key: "10btkg" }],
  ["path", { d: "m18 3-4 4h6l-4 4", key: "16psg9" }]
];
var PlugZap = createLucideIcon("plug-zap", __iconNode537);

// ../../node_modules/@lucide/vue/dist/esm/icons/plus.mjs
var __iconNode538 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
var Plus = createLucideIcon("plus", __iconNode538);

// ../../node_modules/@lucide/vue/dist/esm/icons/popcorn.mjs
var __iconNode539 = [
  [
    "path",
    {
      d: "M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4",
      key: "10td1f"
    }
  ],
  ["path", { d: "M10 22 9 8", key: "yjptiv" }],
  ["path", { d: "m14 22 1-14", key: "8jwc8b" }],
  [
    "path",
    {
      d: "M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z",
      key: "1qo33t"
    }
  ]
];
var Popcorn = createLucideIcon("popcorn", __iconNode539);

// ../../node_modules/@lucide/vue/dist/esm/icons/power.mjs
var __iconNode540 = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
];
var Power = createLucideIcon("power", __iconNode540);

// ../../node_modules/@lucide/vue/dist/esm/icons/presentation.mjs
var __iconNode541 = [
  ["path", { d: "M2 3h20", key: "91anmk" }],
  ["path", { d: "M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3", key: "2k9sn8" }],
  ["path", { d: "m7 21 5-5 5 5", key: "bip4we" }]
];
var Presentation = createLucideIcon("presentation", __iconNode541);

// ../../node_modules/@lucide/vue/dist/esm/icons/printer.mjs
var __iconNode542 = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
var Printer = createLucideIcon("printer", __iconNode542);

// ../../node_modules/@lucide/vue/dist/esm/icons/projector.mjs
var __iconNode543 = [
  ["path", { d: "M5 7 3 5", key: "1yys58" }],
  ["path", { d: "M9 6V3", key: "1ptz9u" }],
  ["path", { d: "m13 7 2-2", key: "1w3vmq" }],
  ["circle", { cx: "9", cy: "13", r: "3", key: "1mma13" }],
  [
    "path",
    {
      d: "M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17",
      key: "2frwzc"
    }
  ],
  ["path", { d: "M16 16h2", key: "dnq2od" }]
];
var Projector = createLucideIcon("projector", __iconNode543);

// ../../node_modules/@lucide/vue/dist/esm/icons/puzzle.mjs
var __iconNode544 = [
  [
    "path",
    {
      d: "M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",
      key: "w46dr5"
    }
  ]
];
var Puzzle = createLucideIcon("puzzle", __iconNode544);

// ../../node_modules/@lucide/vue/dist/esm/icons/qr-code.mjs
var __iconNode545 = [
  ["rect", { width: "5", height: "5", x: "3", y: "3", rx: "1", key: "1tu5fj" }],
  ["rect", { width: "5", height: "5", x: "16", y: "3", rx: "1", key: "1v8r4q" }],
  ["rect", { width: "5", height: "5", x: "3", y: "16", rx: "1", key: "1x03jg" }],
  ["path", { d: "M21 16h-3a2 2 0 0 0-2 2v3", key: "177gqh" }],
  ["path", { d: "M21 21v.01", key: "ents32" }],
  ["path", { d: "M12 7v3a2 2 0 0 1-2 2H7", key: "8crl2c" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M12 3h.01", key: "n36tog" }],
  ["path", { d: "M12 16v.01", key: "133mhm" }],
  ["path", { d: "M16 12h1", key: "1slzba" }],
  ["path", { d: "M21 12v.01", key: "1lwtk9" }],
  ["path", { d: "M12 21v-1", key: "1880an" }]
];
var QrCode = createLucideIcon("qr-code", __iconNode545);

// ../../node_modules/@lucide/vue/dist/esm/icons/quote.mjs
var __iconNode546 = [
  [
    "path",
    {
      d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "rib7q0"
    }
  ],
  [
    "path",
    {
      d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "1ymkrd"
    }
  ]
];
var Quote = createLucideIcon("quote", __iconNode546);

// ../../node_modules/@lucide/vue/dist/esm/icons/rabbit.mjs
var __iconNode547 = [
  ["path", { d: "M13 16a3 3 0 0 1 2.24 5", key: "1epib5" }],
  ["path", { d: "M18 12h.01", key: "yjnet6" }],
  [
    "path",
    {
      d: "M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3",
      key: "ue9ozu"
    }
  ],
  ["path", { d: "M20 8.54V4a2 2 0 1 0-4 0v3", key: "49iql8" }],
  ["path", { d: "M7.612 12.524a3 3 0 1 0-1.6 4.3", key: "1e33i0" }]
];
var Rabbit = createLucideIcon("rabbit", __iconNode547);

// ../../node_modules/@lucide/vue/dist/esm/icons/radar.mjs
var __iconNode548 = [
  ["path", { d: "M19.07 4.93A10 10 0 0 0 6.99 3.34", key: "z3du51" }],
  ["path", { d: "M4 6h.01", key: "oypzma" }],
  ["path", { d: "M2.29 9.62A10 10 0 1 0 21.31 8.35", key: "qzzz0" }],
  ["path", { d: "M16.24 7.76A6 6 0 1 0 8.23 16.67", key: "1yjesh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M17.99 11.66A6 6 0 0 1 15.77 16.67", key: "1u2y91" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "m13.41 10.59 5.66-5.66", key: "mhq4k0" }]
];
var Radar = createLucideIcon("radar", __iconNode548);

// ../../node_modules/@lucide/vue/dist/esm/icons/radio.mjs
var __iconNode549 = [
  ["path", { d: "M16.247 7.761a6 6 0 0 1 0 8.478", key: "1fwjs5" }],
  ["path", { d: "M19.075 4.933a10 10 0 0 1 0 14.134", key: "ehdyv1" }],
  ["path", { d: "M4.925 19.067a10 10 0 0 1 0-14.134", key: "1q22gi" }],
  ["path", { d: "M7.753 16.239a6 6 0 0 1 0-8.478", key: "r2q7qm" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
var Radio = createLucideIcon("radio", __iconNode549);

// ../../node_modules/@lucide/vue/dist/esm/icons/radio-tower.mjs
var __iconNode550 = [
  ["path", { d: "M4.9 16.1C1 12.2 1 5.8 4.9 1.9", key: "s0qx1y" }],
  ["path", { d: "M7.8 4.7a6.14 6.14 0 0 0-.8 7.5", key: "1idnkw" }],
  ["circle", { cx: "12", cy: "9", r: "2", key: "1092wv" }],
  ["path", { d: "M16.2 4.8c2 2 2.26 5.11.8 7.47", key: "ojru2q" }],
  ["path", { d: "M19.1 1.9a9.96 9.96 0 0 1 0 14.1", key: "rhi7fg" }],
  ["path", { d: "M9.5 18h5", key: "mfy3pd" }],
  ["path", { d: "m8 22 4-11 4 11", key: "25yftu" }]
];
var RadioTower = createLucideIcon("radio-tower", __iconNode550);

// ../../node_modules/@lucide/vue/dist/esm/icons/rat.mjs
var __iconNode551 = [
  ["path", { d: "M13 22H4a2 2 0 0 1 0-4h12", key: "bt3f23" }],
  ["path", { d: "M13.236 18a3 3 0 0 0-2.2-5", key: "1tbvmo" }],
  ["path", { d: "M16 9h.01", key: "1bdo4e" }],
  [
    "path",
    {
      d: "M16.82 3.94a3 3 0 1 1 3.237 4.868l1.815 2.587a1.5 1.5 0 0 1-1.5 2.1l-2.872-.453a3 3 0 0 0-3.5 3",
      key: "9ch7kn"
    }
  ],
  ["path", { d: "M17 4.988a3 3 0 1 0-5.2 2.052A7 7 0 0 0 4 14.015 4 4 0 0 0 8 18", key: "3s7e9i" }]
];
var Rat = createLucideIcon("rat", __iconNode551);

// ../../node_modules/@lucide/vue/dist/esm/icons/ratio.mjs
var __iconNode552 = [
  ["rect", { width: "12", height: "20", x: "6", y: "2", rx: "2", key: "1oxtiu" }],
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }]
];
var Ratio = createLucideIcon("ratio", __iconNode552);

// ../../node_modules/@lucide/vue/dist/esm/icons/receipt.mjs
var __iconNode553 = [
  ["path", { d: "M12 17V7", key: "pyj7ub" }],
  ["path", { d: "M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8", key: "1elt7d" }],
  [
    "path",
    {
      d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
      key: "ycz6yz"
    }
  ]
];
var Receipt = createLucideIcon("receipt", __iconNode553);

// ../../node_modules/@lucide/vue/dist/esm/icons/receipt-cent.mjs
var __iconNode554 = [
  ["path", { d: "M12 7v10", key: "jspqdw" }],
  [
    "path",
    { d: "M14.828 14.829a4 4 0 0 1-5.656 0 4 4 0 0 1 0-5.657 4 4 0 0 1 5.656 0", key: "qvqont" }
  ],
  [
    "path",
    {
      d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
      key: "ycz6yz"
    }
  ]
];
var ReceiptCent = createLucideIcon("receipt-cent", __iconNode554);

// ../../node_modules/@lucide/vue/dist/esm/icons/receipt-text.mjs
var __iconNode555 = [
  ["path", { d: "M13 16H8", key: "wsln4y" }],
  ["path", { d: "M14 8H8", key: "1l3xfs" }],
  ["path", { d: "M16 12H8", key: "1fr5h0" }],
  [
    "path",
    {
      d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
      key: "ycz6yz"
    }
  ]
];
var ReceiptText = createLucideIcon("receipt-text", __iconNode555);

// ../../node_modules/@lucide/vue/dist/esm/icons/recycle.mjs
var __iconNode556 = [
  [
    "path",
    {
      d: "M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5",
      key: "x6z5xu"
    }
  ],
  [
    "path",
    {
      d: "M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12",
      key: "1x4zh5"
    }
  ],
  ["path", { d: "m14 16-3 3 3 3", key: "f6jyew" }],
  ["path", { d: "M8.293 13.596 7.196 9.5 3.1 10.598", key: "wf1obh" }],
  [
    "path",
    {
      d: "m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843",
      key: "9tzpgr"
    }
  ],
  ["path", { d: "m13.378 9.633 4.096 1.098 1.097-4.096", key: "1oe83g" }]
];
var Recycle = createLucideIcon("recycle", __iconNode556);

// ../../node_modules/@lucide/vue/dist/esm/icons/redo.mjs
var __iconNode557 = [
  ["path", { d: "M21 7v6h-6", key: "3ptur4" }],
  ["path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7", key: "1kgawr" }]
];
var Redo = createLucideIcon("redo", __iconNode557);

// ../../node_modules/@lucide/vue/dist/esm/icons/refresh-ccw.mjs
var __iconNode558 = [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" }],
  ["path", { d: "M16 16h5v5", key: "ccwih5" }]
];
var RefreshCcw = createLucideIcon("refresh-ccw", __iconNode558);

// ../../node_modules/@lucide/vue/dist/esm/icons/refresh-cw.mjs
var __iconNode559 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
var RefreshCw = createLucideIcon("refresh-cw", __iconNode559);

// ../../node_modules/@lucide/vue/dist/esm/icons/refresh-cw-off.mjs
var __iconNode560 = [
  ["path", { d: "M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47", key: "1krf6h" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }],
  ["path", { d: "M3 12C3 9.51 4 7.26 5.64 5.64", key: "ruvoct" }],
  ["path", { d: "m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64", key: "19q130" }],
  ["path", { d: "M21 12c0 1-.16 1.97-.47 2.87", key: "4w8emr" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M22 22 2 2", key: "1r8tn9" }]
];
var RefreshCwOff = createLucideIcon("refresh-cw-off", __iconNode560);

// ../../node_modules/@lucide/vue/dist/esm/icons/refrigerator.mjs
var __iconNode561 = [
  [
    "path",
    { d: "M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z", key: "fpq118" }
  ],
  ["path", { d: "M5 10h14", key: "elsbfy" }],
  ["path", { d: "M15 7v6", key: "1nx30x" }]
];
var Refrigerator = createLucideIcon("refrigerator", __iconNode561);

// ../../node_modules/@lucide/vue/dist/esm/icons/remove-formatting.mjs
var __iconNode562 = [
  ["path", { d: "M4 7V4h16v3", key: "9msm58" }],
  ["path", { d: "M5 20h6", key: "1h6pxn" }],
  ["path", { d: "M13 4 8 20", key: "kqq6aj" }],
  ["path", { d: "m15 15 5 5", key: "me55sn" }],
  ["path", { d: "m20 15-5 5", key: "11p7ol" }]
];
var RemoveFormatting = createLucideIcon("remove-formatting", __iconNode562);

// ../../node_modules/@lucide/vue/dist/esm/icons/reply.mjs
var __iconNode563 = [
  ["path", { d: "M20 18v-2a4 4 0 0 0-4-4H4", key: "5vmcpk" }],
  ["path", { d: "m9 17-5-5 5-5", key: "nvlc11" }]
];
var Reply = createLucideIcon("reply", __iconNode563);

// ../../node_modules/@lucide/vue/dist/esm/icons/reply-all.mjs
var __iconNode564 = [
  ["path", { d: "m12 17-5-5 5-5", key: "1s3y5u" }],
  ["path", { d: "M22 18v-2a4 4 0 0 0-4-4H7", key: "1fcyog" }],
  ["path", { d: "m7 17-5-5 5-5", key: "1ed8i2" }]
];
var ReplyAll = createLucideIcon("reply-all", __iconNode564);

// ../../node_modules/@lucide/vue/dist/esm/icons/rocket.mjs
var __iconNode565 = [
  ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" }],
  [
    "path",
    {
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",
      key: "u4xsad"
    }
  ],
  [
    "path",
    {
      d: "M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",
      key: "676m9"
    }
  ],
  ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05", key: "92ym6u" }]
];
var Rocket = createLucideIcon("rocket", __iconNode565);

// ../../node_modules/@lucide/vue/dist/esm/icons/rocking-chair.mjs
var __iconNode566 = [
  ["path", { d: "m15 13 3.708 7.416", key: "1edxn9" }],
  ["path", { d: "M3 19a15 15 0 0 0 18 0", key: "d0d1c4" }],
  ["path", { d: "m3 2 3.21 9.633A2 2 0 0 0 8.109 13H18", key: "tpa4et" }],
  ["path", { d: "m9 13-3.708 7.416", key: "1oplxx" }]
];
var RockingChair = createLucideIcon("rocking-chair", __iconNode566);

// ../../node_modules/@lucide/vue/dist/esm/icons/rotate-3d.mjs
var __iconNode567 = [
  ["path", { d: "m15.194 13.707 3.814 1.86-1.86 3.814", key: "16shm9" }],
  ["path", { d: "M16.47214 7.52786 A 5 10 0 1 0 13 21.79796", key: "1245p8" }],
  ["path", { d: "M21.79796 11 A 10 5 0 1 0 19 15.57071", key: "1i40ks" }]
];
var Rotate3d = createLucideIcon("rotate-3d", __iconNode567);

// ../../node_modules/@lucide/vue/dist/esm/icons/rotate-ccw.mjs
var __iconNode568 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
var RotateCcw = createLucideIcon("rotate-ccw", __iconNode568);

// ../../node_modules/@lucide/vue/dist/esm/icons/route.mjs
var __iconNode569 = [
  ["circle", { cx: "6", cy: "19", r: "3", key: "1kj8tv" }],
  ["path", { d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15", key: "1d8sl" }],
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }]
];
var Route = createLucideIcon("route", __iconNode569);

// ../../node_modules/@lucide/vue/dist/esm/icons/route-off.mjs
var __iconNode570 = [
  ["circle", { cx: "6", cy: "19", r: "3", key: "1kj8tv" }],
  ["path", { d: "M9 19h8.5c.4 0 .9-.1 1.3-.2", key: "1effex" }],
  ["path", { d: "M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12", key: "k9y2ds" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M21 15.3a3.5 3.5 0 0 0-3.3-3.3", key: "11nlu2" }],
  ["path", { d: "M15 5h-4.3", key: "6537je" }],
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }]
];
var RouteOff = createLucideIcon("route-off", __iconNode570);

// ../../node_modules/@lucide/vue/dist/esm/icons/router.mjs
var __iconNode571 = [
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", key: "w68u3i" }],
  ["path", { d: "M6.01 18H6", key: "19vcac" }],
  ["path", { d: "M10.01 18H10", key: "uamcmx" }],
  ["path", { d: "M15 10v4", key: "qjz1xs" }],
  ["path", { d: "M17.84 7.17a4 4 0 0 0-5.66 0", key: "1rif40" }],
  ["path", { d: "M20.66 4.34a8 8 0 0 0-11.31 0", key: "6a5xfq" }]
];
var Router = createLucideIcon("router", __iconNode571);

// ../../node_modules/@lucide/vue/dist/esm/icons/rows-2.mjs
var __iconNode572 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }]
];
var Rows2 = createLucideIcon("rows-2", __iconNode572);

// ../../node_modules/@lucide/vue/dist/esm/icons/rows-3.mjs
var __iconNode573 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M21 9H3", key: "1338ky" }],
  ["path", { d: "M21 15H3", key: "9uk58r" }]
];
var Rows3 = createLucideIcon("rows-3", __iconNode573);

// ../../node_modules/@lucide/vue/dist/esm/icons/rows-4.mjs
var __iconNode574 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M21 7.5H3", key: "1hm9pq" }],
  ["path", { d: "M21 12H3", key: "2avoz0" }],
  ["path", { d: "M21 16.5H3", key: "n7jzkj" }]
];
var Rows4 = createLucideIcon("rows-4", __iconNode574);

// ../../node_modules/@lucide/vue/dist/esm/icons/rss.mjs
var __iconNode575 = [
  ["path", { d: "M4 11a9 9 0 0 1 9 9", key: "pv89mb" }],
  ["path", { d: "M4 4a16 16 0 0 1 16 16", key: "k0647b" }],
  ["circle", { cx: "5", cy: "19", r: "1", key: "bfqh0e" }]
];
var Rss = createLucideIcon("rss", __iconNode575);

// ../../node_modules/@lucide/vue/dist/esm/icons/ruler.mjs
var __iconNode576 = [
  [
    "path",
    {
      d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
      key: "icamh8"
    }
  ],
  ["path", { d: "m14.5 12.5 2-2", key: "inckbg" }],
  ["path", { d: "m11.5 9.5 2-2", key: "fmmyf7" }],
  ["path", { d: "m8.5 6.5 2-2", key: "vc6u1g" }],
  ["path", { d: "m17.5 15.5 2-2", key: "wo5hmg" }]
];
var Ruler = createLucideIcon("ruler", __iconNode576);

// ../../node_modules/@lucide/vue/dist/esm/icons/sailboat.mjs
var __iconNode577 = [
  ["path", { d: "M10 2v15", key: "1qf71f" }],
  [
    "path",
    { d: "M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z", key: "1pxcvx" }
  ],
  [
    "path",
    {
      d: "M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z",
      key: "5oog16"
    }
  ]
];
var Sailboat = createLucideIcon("sailboat", __iconNode577);

// ../../node_modules/@lucide/vue/dist/esm/icons/salad.mjs
var __iconNode578 = [
  ["path", { d: "M7 21h10", key: "1b0cd5" }],
  ["path", { d: "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z", key: "4rw317" }],
  [
    "path",
    {
      d: "M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1",
      key: "10xrj0"
    }
  ],
  ["path", { d: "m13 12 4-4", key: "1hckqy" }],
  ["path", { d: "M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2", key: "1p4srx" }]
];
var Salad = createLucideIcon("salad", __iconNode578);

// ../../node_modules/@lucide/vue/dist/esm/icons/sandwich.mjs
var __iconNode579 = [
  ["path", { d: "m2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777", key: "f1wd0e" }],
  ["path", { d: "M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25", key: "1pfu07" }],
  ["path", { d: "M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9", key: "1oq9qw" }],
  ["path", { d: "m6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2", key: "1fnwu5" }],
  ["rect", { width: "20", height: "4", x: "2", y: "11", rx: "1", key: "itshg" }]
];
var Sandwich = createLucideIcon("sandwich", __iconNode579);

// ../../node_modules/@lucide/vue/dist/esm/icons/satellite.mjs
var __iconNode580 = [
  [
    "path",
    {
      d: "m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5",
      key: "dzhfyz"
    }
  ],
  ["path", { d: "M16.5 7.5 19 5", key: "1ltcjm" }],
  [
    "path",
    {
      d: "m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5",
      key: "nfoymv"
    }
  ],
  ["path", { d: "M9 21a6 6 0 0 0-6-6", key: "1iajcf" }],
  [
    "path",
    {
      d: "M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z",
      key: "nv9zqy"
    }
  ]
];
var Satellite = createLucideIcon("satellite", __iconNode580);

// ../../node_modules/@lucide/vue/dist/esm/icons/satellite-dish.mjs
var __iconNode581 = [
  ["path", { d: "M4 10a7.31 7.31 0 0 0 10 10Z", key: "1fzpp3" }],
  ["path", { d: "m9 15 3-3", key: "88sc13" }],
  ["path", { d: "M17 13a6 6 0 0 0-6-6", key: "15cc6u" }],
  ["path", { d: "M21 13A10 10 0 0 0 11 3", key: "11nf8s" }]
];
var SatelliteDish = createLucideIcon("satellite-dish", __iconNode581);

// ../../node_modules/@lucide/vue/dist/esm/icons/save.mjs
var __iconNode582 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
var Save = createLucideIcon("save", __iconNode582);

// ../../node_modules/@lucide/vue/dist/esm/icons/scale.mjs
var __iconNode583 = [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["path", { d: "m19 8 3 8a5 5 0 0 1-6 0zV7", key: "zcdpyk" }],
  ["path", { d: "M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1", key: "1yorad" }],
  ["path", { d: "m5 8 3 8a5 5 0 0 1-6 0zV7", key: "eua70x" }],
  ["path", { d: "M7 21h10", key: "1b0cd5" }]
];
var Scale = createLucideIcon("scale", __iconNode583);

// ../../node_modules/@lucide/vue/dist/esm/icons/scan.mjs
var __iconNode584 = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }]
];
var Scan = createLucideIcon("scan", __iconNode584);

// ../../node_modules/@lucide/vue/dist/esm/icons/scan-barcode.mjs
var __iconNode585 = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M8 7v10", key: "23sfjj" }],
  ["path", { d: "M12 7v10", key: "jspqdw" }],
  ["path", { d: "M17 7v10", key: "578dap" }]
];
var ScanBarcode = createLucideIcon("scan-barcode", __iconNode585);

// ../../node_modules/@lucide/vue/dist/esm/icons/scan-eye.mjs
var __iconNode586 = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  [
    "path",
    {
      d: "M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",
      key: "11ak4c"
    }
  ]
];
var ScanEye = createLucideIcon("scan-eye", __iconNode586);

// ../../node_modules/@lucide/vue/dist/esm/icons/scan-face.mjs
var __iconNode587 = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
  ["path", { d: "M9 9h.01", key: "1q5me6" }],
  ["path", { d: "M15 9h.01", key: "x1ddxp" }]
];
var ScanFace = createLucideIcon("scan-face", __iconNode587);

// ../../node_modules/@lucide/vue/dist/esm/icons/scan-heart.mjs
var __iconNode588 = [
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  [
    "path",
    {
      d: "M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 4.172 4.306l-3.447 3.62a1 1 0 0 1-1.449 0z",
      key: "1ak1ef"
    }
  ]
];
var ScanHeart = createLucideIcon("scan-heart", __iconNode588);

// ../../node_modules/@lucide/vue/dist/esm/icons/scan-line.mjs
var __iconNode589 = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }]
];
var ScanLine = createLucideIcon("scan-line", __iconNode589);

// ../../node_modules/@lucide/vue/dist/esm/icons/scan-search.mjs
var __iconNode590 = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["path", { d: "m16 16-1.9-1.9", key: "1dq9hf" }]
];
var ScanSearch = createLucideIcon("scan-search", __iconNode590);

// ../../node_modules/@lucide/vue/dist/esm/icons/scan-text.mjs
var __iconNode591 = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M7 8h8", key: "1jbsf9" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }],
  ["path", { d: "M7 16h6", key: "1vyc9m" }]
];
var ScanText = createLucideIcon("scan-text", __iconNode591);

// ../../node_modules/@lucide/vue/dist/esm/icons/school.mjs
var __iconNode592 = [
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  ["path", { d: "M18 4.933V21", key: "tjwmp4" }],
  ["path", { d: "m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6", key: "zywc2d" }],
  [
    "path",
    {
      d: "m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11",
      key: "1d4ql0"
    }
  ],
  ["path", { d: "M6 4.933V21", key: "1ufz1j" }],
  ["circle", { cx: "12", cy: "9", r: "2", key: "1092wv" }]
];
var School = createLucideIcon("school", __iconNode592);

// ../../node_modules/@lucide/vue/dist/esm/icons/scissors.mjs
var __iconNode593 = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
];
var Scissors = createLucideIcon("scissors", __iconNode593);

// ../../node_modules/@lucide/vue/dist/esm/icons/screen-share.mjs
var __iconNode594 = [
  ["path", { d: "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3", key: "i8wdob" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "m17 8 5-5", key: "fqif7o" }],
  ["path", { d: "M17 3h5v5", key: "1o3tu8" }]
];
var ScreenShare = createLucideIcon("screen-share", __iconNode594);

// ../../node_modules/@lucide/vue/dist/esm/icons/screen-share-off.mjs
var __iconNode595 = [
  ["path", { d: "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3", key: "i8wdob" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "m22 3-5 5", key: "12jva0" }],
  ["path", { d: "m17 3 5 5", key: "k36vhe" }]
];
var ScreenShareOff = createLucideIcon("screen-share-off", __iconNode595);

// ../../node_modules/@lucide/vue/dist/esm/icons/scroll.mjs
var __iconNode596 = [
  ["path", { d: "M19 17V5a2 2 0 0 0-2-2H4", key: "zz82l3" }],
  [
    "path",
    {
      d: "M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",
      key: "1ph1d7"
    }
  ]
];
var Scroll = createLucideIcon("scroll", __iconNode596);

// ../../node_modules/@lucide/vue/dist/esm/icons/scroll-text.mjs
var __iconNode597 = [
  ["path", { d: "M15 12h-5", key: "r7krc0" }],
  ["path", { d: "M15 8h-5", key: "1khuty" }],
  ["path", { d: "M19 17V5a2 2 0 0 0-2-2H4", key: "zz82l3" }],
  [
    "path",
    {
      d: "M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",
      key: "1ph1d7"
    }
  ]
];
var ScrollText = createLucideIcon("scroll-text", __iconNode597);

// ../../node_modules/@lucide/vue/dist/esm/icons/search.mjs
var __iconNode598 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
var Search = createLucideIcon("search", __iconNode598);

// ../../node_modules/@lucide/vue/dist/esm/icons/send.mjs
var __iconNode599 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
var Send = createLucideIcon("send", __iconNode599);

// ../../node_modules/@lucide/vue/dist/esm/icons/send-horizontal.mjs
var __iconNode600 = [
  [
    "path",
    {
      d: "M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z",
      key: "117uat"
    }
  ],
  ["path", { d: "M6 12h16", key: "s4cdu5" }]
];
var SendHorizontal = createLucideIcon("send-horizontal", __iconNode600);

// ../../node_modules/@lucide/vue/dist/esm/icons/server.mjs
var __iconNode601 = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
];
var Server = createLucideIcon("server", __iconNode601);

// ../../node_modules/@lucide/vue/dist/esm/icons/server-cog.mjs
var __iconNode602 = [
  ["path", { d: "m10.852 14.772-.383.923", key: "11vil6" }],
  ["path", { d: "M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923", key: "1v3clb" }],
  ["path", { d: "m13.148 9.228.383-.923", key: "t2zzyc" }],
  ["path", { d: "m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544", key: "1bxfiv" }],
  ["path", { d: "m14.772 10.852.923-.383", key: "k9m8cz" }],
  ["path", { d: "m14.772 13.148.923.383", key: "1xvhww" }],
  [
    "path",
    {
      d: "M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5",
      key: "tn8das"
    }
  ],
  [
    "path",
    {
      d: "M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5",
      key: "1g2pve"
    }
  ],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "M6 6h.01", key: "1utrut" }],
  ["path", { d: "m9.228 10.852-.923-.383", key: "1wtb30" }],
  ["path", { d: "m9.228 13.148-.923.383", key: "1a830x" }]
];
var ServerCog = createLucideIcon("server-cog", __iconNode602);

// ../../node_modules/@lucide/vue/dist/esm/icons/server-crash.mjs
var __iconNode603 = [
  [
    "path",
    {
      d: "M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2",
      key: "4b9dqc"
    }
  ],
  [
    "path",
    {
      d: "M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2",
      key: "22nnkd"
    }
  ],
  ["path", { d: "M6 6h.01", key: "1utrut" }],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "m13 6-4 6h6l-4 6", key: "14hqih" }]
];
var ServerCrash = createLucideIcon("server-crash", __iconNode603);

// ../../node_modules/@lucide/vue/dist/esm/icons/server-off.mjs
var __iconNode604 = [
  ["path", { d: "M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5", key: "bt2siv" }],
  ["path", { d: "M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z", key: "1hjrv1" }],
  ["path", { d: "M22 17v-1a2 2 0 0 0-2-2h-1", key: "1iynyr" }],
  ["path", { d: "M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z", key: "161ggg" }],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
var ServerOff = createLucideIcon("server-off", __iconNode604);

// ../../node_modules/@lucide/vue/dist/esm/icons/settings.mjs
var __iconNode605 = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
var Settings = createLucideIcon("settings", __iconNode605);

// ../../node_modules/@lucide/vue/dist/esm/icons/shapes.mjs
var __iconNode606 = [
  [
    "path",
    {
      d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",
      key: "1bo67w"
    }
  ],
  ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1", key: "1bkyp8" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "3.5", key: "w3z12y" }]
];
var Shapes = createLucideIcon("shapes", __iconNode606);

// ../../node_modules/@lucide/vue/dist/esm/icons/share.mjs
var __iconNode607 = [
  ["path", { d: "M12 2v13", key: "1km8f5" }],
  ["path", { d: "m16 6-4-4-4 4", key: "13yo43" }],
  ["path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", key: "1b2hhj" }]
];
var Share = createLucideIcon("share", __iconNode607);

// ../../node_modules/@lucide/vue/dist/esm/icons/share-2.mjs
var __iconNode608 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
var Share2 = createLucideIcon("share-2", __iconNode608);

// ../../node_modules/@lucide/vue/dist/esm/icons/sheet.mjs
var __iconNode609 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["line", { x1: "3", x2: "21", y1: "9", y2: "9", key: "1vqk6q" }],
  ["line", { x1: "3", x2: "21", y1: "15", y2: "15", key: "o2sbyz" }],
  ["line", { x1: "9", x2: "9", y1: "9", y2: "21", key: "1ib60c" }],
  ["line", { x1: "15", x2: "15", y1: "9", y2: "21", key: "1n26ft" }]
];
var Sheet = createLucideIcon("sheet", __iconNode609);

// ../../node_modules/@lucide/vue/dist/esm/icons/shell.mjs
var __iconNode610 = [
  [
    "path",
    {
      d: "M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44",
      key: "1cn552"
    }
  ]
];
var Shell = createLucideIcon("shell", __iconNode610);

// ../../node_modules/@lucide/vue/dist/esm/icons/shield.mjs
var __iconNode611 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
var Shield = createLucideIcon("shield", __iconNode611);

// ../../node_modules/@lucide/vue/dist/esm/icons/shield-alert.mjs
var __iconNode612 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
var ShieldAlert = createLucideIcon("shield-alert", __iconNode612);

// ../../node_modules/@lucide/vue/dist/esm/icons/shield-ban.mjs
var __iconNode613 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m4.243 5.21 14.39 12.472", key: "1c9a7c" }]
];
var ShieldBan = createLucideIcon("shield-ban", __iconNode613);

// ../../node_modules/@lucide/vue/dist/esm/icons/shield-check.mjs
var __iconNode614 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
var ShieldCheck = createLucideIcon("shield-check", __iconNode614);

// ../../node_modules/@lucide/vue/dist/esm/icons/shield-half.mjs
var __iconNode615 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 22V2", key: "zs6s6o" }]
];
var ShieldHalf = createLucideIcon("shield-half", __iconNode615);

// ../../node_modules/@lucide/vue/dist/esm/icons/shield-question-mark.mjs
var __iconNode616 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3", key: "mhlwft" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
var ShieldQuestionMark = createLucideIcon("shield-question-mark", __iconNode616);

// ../../node_modules/@lucide/vue/dist/esm/icons/shield-x.mjs
var __iconNode617 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m14.5 9.5-5 5", key: "17q4r4" }],
  ["path", { d: "m9.5 9.5 5 5", key: "18nt4w" }]
];
var ShieldX = createLucideIcon("shield-x", __iconNode617);

// ../../node_modules/@lucide/vue/dist/esm/icons/ship.mjs
var __iconNode618 = [
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 9.189V13", key: "yp40p3" }],
  ["path", { d: "M19 12V6a2 2 0 00-2-2H7a2 2 0 00-2 2v6", key: "1wcigf" }],
  [
    "path",
    {
      d: "M19.38 19A11.6 11.6 0 0021 13l-8.188-3.639a2 2 0 00-1.624 0L3 13.001a11.6 11.6 0 002.81 7.76",
      key: "1kdp0u"
    }
  ],
  [
    "path",
    {
      d: "M2 20c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "1l8w7g"
    }
  ]
];
var Ship = createLucideIcon("ship", __iconNode618);

// ../../node_modules/@lucide/vue/dist/esm/icons/ship-wheel.mjs
var __iconNode619 = [
  ["circle", { cx: "12", cy: "12", r: "8", key: "46899m" }],
  ["path", { d: "M12 2v7.5", key: "1e5rl5" }],
  ["path", { d: "m19 5-5.23 5.23", key: "1ezxxf" }],
  ["path", { d: "M22 12h-7.5", key: "le1719" }],
  ["path", { d: "m19 19-5.23-5.23", key: "p3fmgn" }],
  ["path", { d: "M12 14.5V22", key: "dgcmos" }],
  ["path", { d: "M10.23 13.77 5 19", key: "qwopd4" }],
  ["path", { d: "M9.5 12H2", key: "r7bup8" }],
  ["path", { d: "M10.23 10.23 5 5", key: "k2y7lj" }],
  ["circle", { cx: "12", cy: "12", r: "2.5", key: "ix0uyj" }]
];
var ShipWheel = createLucideIcon("ship-wheel", __iconNode619);

// ../../node_modules/@lucide/vue/dist/esm/icons/shirt.mjs
var __iconNode620 = [
  [
    "path",
    {
      d: "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",
      key: "1wgbhj"
    }
  ]
];
var Shirt = createLucideIcon("shirt", __iconNode620);

// ../../node_modules/@lucide/vue/dist/esm/icons/shopping-bag.mjs
var __iconNode621 = [
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
  ["path", { d: "M3.103 6.034h17.794", key: "awc11p" }],
  [
    "path",
    {
      d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
      key: "o988cm"
    }
  ]
];
var ShoppingBag = createLucideIcon("shopping-bag", __iconNode621);

// ../../node_modules/@lucide/vue/dist/esm/icons/shopping-basket.mjs
var __iconNode622 = [
  ["path", { d: "m15 11-1 9", key: "5wnq3a" }],
  ["path", { d: "m19 11-4-7", key: "cnml18" }],
  ["path", { d: "M2 11h20", key: "3eubbj" }],
  ["path", { d: "m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4", key: "yiazzp" }],
  ["path", { d: "M4.5 15.5h15", key: "13mye1" }],
  ["path", { d: "m5 11 4-7", key: "116ra9" }],
  ["path", { d: "m9 11 1 9", key: "1ojof7" }]
];
var ShoppingBasket = createLucideIcon("shopping-basket", __iconNode622);

// ../../node_modules/@lucide/vue/dist/esm/icons/shopping-cart.mjs
var __iconNode623 = [
  [
    "path",
    {
      d: "m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18",
      key: "uebgi3"
    }
  ],
  [
    "path",
    {
      d: "M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25",
      key: "1j7c9p"
    }
  ],
  ["circle", { cx: "18", cy: "20", r: "2", key: "t9985n" }],
  ["circle", { cx: "8", cy: "20", r: "2", key: "ckkr5m" }]
];
var ShoppingCart = createLucideIcon("shopping-cart", __iconNode623);

// ../../node_modules/@lucide/vue/dist/esm/icons/shovel.mjs
var __iconNode624 = [
  [
    "path",
    {
      d: "M21.56 4.56a1.5 1.5 0 0 1 0 2.122l-.47.47a3 3 0 0 1-4.212-.03 3 3 0 0 1 0-4.243l.44-.44a1.5 1.5 0 0 1 2.121 0z",
      key: "1gcedi"
    }
  ],
  [
    "path",
    {
      d: "M3 22a1 1 0 0 1-1-1v-3.586a1 1 0 0 1 .293-.707l3.355-3.355a1.205 1.205 0 0 1 1.704 0l3.296 3.296a1.205 1.205 0 0 1 0 1.704l-3.355 3.355a1 1 0 0 1-.707.293z",
      key: "pg9kv3"
    }
  ],
  ["path", { d: "m9 15 7.879-7.878", key: "1o1zgh" }]
];
var Shovel = createLucideIcon("shovel", __iconNode624);

// ../../node_modules/@lucide/vue/dist/esm/icons/shower-head.mjs
var __iconNode625 = [
  ["path", { d: "m4 4 2.5 2.5", key: "uv2vmf" }],
  ["path", { d: "M13.5 6.5a4.95 4.95 0 0 0-7 7", key: "frdkwv" }],
  ["path", { d: "M15 5 5 15", key: "1ag8rq" }],
  ["path", { d: "M14 17v.01", key: "eokfpp" }],
  ["path", { d: "M10 16v.01", key: "14uyyl" }],
  ["path", { d: "M13 13v.01", key: "1v1k97" }],
  ["path", { d: "M16 10v.01", key: "5169yg" }],
  ["path", { d: "M11 20v.01", key: "cj92p8" }],
  ["path", { d: "M17 14v.01", key: "11cswd" }],
  ["path", { d: "M20 11v.01", key: "19e0od" }]
];
var ShowerHead = createLucideIcon("shower-head", __iconNode625);

// ../../node_modules/@lucide/vue/dist/esm/icons/shrink.mjs
var __iconNode626 = [
  ["path", { d: "m15 15 6 6m-6-6v4.8m0-4.8h4.8", key: "17vawe" }],
  ["path", { d: "M9 19.8V15m0 0H4.2M9 15l-6 6", key: "chjx8e" }],
  ["path", { d: "M15 4.2V9m0 0h4.8M15 9l6-6", key: "lav6yq" }],
  ["path", { d: "M9 4.2V9m0 0H4.2M9 9 3 3", key: "1pxi2q" }]
];
var Shrink = createLucideIcon("shrink", __iconNode626);

// ../../node_modules/@lucide/vue/dist/esm/icons/sigma.mjs
var __iconNode627 = [
  [
    "path",
    {
      d: "M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",
      key: "wuwx1p"
    }
  ]
];
var Sigma = createLucideIcon("sigma", __iconNode627);

// ../../node_modules/@lucide/vue/dist/esm/icons/signal.mjs
var __iconNode628 = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }],
  ["path", { d: "M12 20v-8", key: "i3yub9" }],
  ["path", { d: "M17 20V8", key: "1tkaf5" }],
  ["path", { d: "M22 4v16", key: "sih9yq" }]
];
var Signal = createLucideIcon("signal", __iconNode628);

// ../../node_modules/@lucide/vue/dist/esm/icons/signal-high.mjs
var __iconNode629 = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }],
  ["path", { d: "M12 20v-8", key: "i3yub9" }],
  ["path", { d: "M17 20V8", key: "1tkaf5" }]
];
var SignalHigh = createLucideIcon("signal-high", __iconNode629);

// ../../node_modules/@lucide/vue/dist/esm/icons/signal-low.mjs
var __iconNode630 = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }]
];
var SignalLow = createLucideIcon("signal-low", __iconNode630);

// ../../node_modules/@lucide/vue/dist/esm/icons/signpost.mjs
var __iconNode631 = [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M12 3v3", key: "1n5kay" }],
  [
    "path",
    {
      d: "M2.354 10.354a1.207 1.207 0 0 1 0-1.708l2.06-2.06A2 2 0 0 1 5.828 6h12.344a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H5.828a2 2 0 0 1-1.414-.586z",
      key: "1tm261"
    }
  ]
];
var Signpost = createLucideIcon("signpost", __iconNode631);

// ../../node_modules/@lucide/vue/dist/esm/icons/signpost-big.mjs
var __iconNode632 = [
  ["path", { d: "M10 9H4L2 7l2-2h6", key: "1hq7x2" }],
  ["path", { d: "M14 5h6l2 2-2 2h-6", key: "bv62ej" }],
  ["path", { d: "M10 22V4a2 2 0 1 1 4 0v18", key: "eqpcf2" }],
  ["path", { d: "M8 22h8", key: "rmew8v" }]
];
var SignpostBig = createLucideIcon("signpost-big", __iconNode632);

// ../../node_modules/@lucide/vue/dist/esm/icons/siren.mjs
var __iconNode633 = [
  ["path", { d: "M7 18v-6a5 5 0 1 1 10 0v6", key: "pcx96s" }],
  [
    "path",
    { d: "M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z", key: "1b4s83" }
  ],
  ["path", { d: "M21 12h1", key: "jtio3y" }],
  ["path", { d: "M18.5 4.5 18 5", key: "g5sp9y" }],
  ["path", { d: "M2 12h1", key: "1uaihz" }],
  ["path", { d: "M12 2v1", key: "11qlp1" }],
  ["path", { d: "m4.929 4.929.707.707", key: "1i51kw" }],
  ["path", { d: "M12 12v6", key: "3ahymv" }]
];
var Siren = createLucideIcon("siren", __iconNode633);

// ../../node_modules/@lucide/vue/dist/esm/icons/skip-back.mjs
var __iconNode634 = [
  [
    "path",
    {
      d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",
      key: "15892j"
    }
  ],
  ["path", { d: "M3 20V4", key: "1ptbpl" }]
];
var SkipBack = createLucideIcon("skip-back", __iconNode634);

// ../../node_modules/@lucide/vue/dist/esm/icons/skip-forward.mjs
var __iconNode635 = [
  ["path", { d: "M21 4v16", key: "7j8fe9" }],
  [
    "path",
    {
      d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
      key: "zs4d6"
    }
  ]
];
var SkipForward = createLucideIcon("skip-forward", __iconNode635);

// ../../node_modules/@lucide/vue/dist/esm/icons/sliders-horizontal.mjs
var __iconNode636 = [
  ["path", { d: "M10 5H3", key: "1qgfaw" }],
  ["path", { d: "M12 19H3", key: "yhmn1j" }],
  ["path", { d: "M14 3v4", key: "1sua03" }],
  ["path", { d: "M16 17v4", key: "1q0r14" }],
  ["path", { d: "M21 12h-9", key: "1o4lsq" }],
  ["path", { d: "M21 19h-5", key: "1rlt1p" }],
  ["path", { d: "M21 5h-7", key: "1oszz2" }],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M8 12H3", key: "a7s4jb" }]
];
var SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode636);

// ../../node_modules/@lucide/vue/dist/esm/icons/smartphone.mjs
var __iconNode637 = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
var Smartphone = createLucideIcon("smartphone", __iconNode637);

// ../../node_modules/@lucide/vue/dist/esm/icons/face-slightly-smiling.mjs
var __iconNode638 = [
  ["path", { d: "M15 10V9", key: "4dkmfx" }],
  ["path", { d: "M16.472 15a6 6 0 01-8.943 0", key: "7qomzy" }],
  ["path", { d: "M9 10V9", key: "1lazqi" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
var FaceSlightlySmiling = createLucideIcon("face-slightly-smiling", __iconNode638);

// ../../node_modules/@lucide/vue/dist/esm/icons/snail.mjs
var __iconNode639 = [
  ["path", { d: "M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0", key: "hneq2s" }],
  ["circle", { cx: "10", cy: "13", r: "8", key: "194lz3" }],
  ["path", { d: "M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6", key: "ixqyt7" }],
  ["path", { d: "M18 3 19.1 5.2", key: "9tjm43" }],
  ["path", { d: "M22 3 20.9 5.2", key: "j3odrs" }]
];
var Snail = createLucideIcon("snail", __iconNode639);

// ../../node_modules/@lucide/vue/dist/esm/icons/snowflake.mjs
var __iconNode640 = [
  ["path", { d: "m10 20-1.25-2.5L6 18", key: "18frcb" }],
  ["path", { d: "M10 4 8.75 6.5 6 6", key: "7mghy3" }],
  ["path", { d: "m14 20 1.25-2.5L18 18", key: "1chtki" }],
  ["path", { d: "m14 4 1.25 2.5L18 6", key: "1b4wsy" }],
  ["path", { d: "m17 21-3-6h-4", key: "15hhxa" }],
  ["path", { d: "m17 3-3 6 1.5 3", key: "11697g" }],
  ["path", { d: "M2 12h6.5L10 9", key: "kv9z4n" }],
  ["path", { d: "m20 10-1.5 2 1.5 2", key: "1swlpi" }],
  ["path", { d: "M22 12h-6.5L14 15", key: "1mxi28" }],
  ["path", { d: "m4 10 1.5 2L4 14", key: "k9enpj" }],
  ["path", { d: "m7 21 3-6-1.5-3", key: "j8hb9u" }],
  ["path", { d: "m7 3 3 6h4", key: "1otusx" }]
];
var Snowflake = createLucideIcon("snowflake", __iconNode640);

// ../../node_modules/@lucide/vue/dist/esm/icons/arrow-up-narrow-wide.mjs
var __iconNode641 = [
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }],
  ["path", { d: "M11 12h4", key: "q8tih4" }],
  ["path", { d: "M11 16h7", key: "uosisv" }],
  ["path", { d: "M11 20h10", key: "jvxblo" }]
];
var ArrowUpNarrowWide = createLucideIcon("arrow-up-narrow-wide", __iconNode641);

// ../../node_modules/@lucide/vue/dist/esm/icons/arrow-down-wide-narrow.mjs
var __iconNode642 = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "M11 4h10", key: "1w87gc" }],
  ["path", { d: "M11 8h7", key: "djye34" }],
  ["path", { d: "M11 12h4", key: "q8tih4" }]
];
var ArrowDownWideNarrow = createLucideIcon("arrow-down-wide-narrow", __iconNode642);

// ../../node_modules/@lucide/vue/dist/esm/icons/soup.mjs
var __iconNode643 = [
  ["path", { d: "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z", key: "4rw317" }],
  ["path", { d: "M7 21h10", key: "1b0cd5" }],
  ["path", { d: "M19.5 12 22 6", key: "shfsr5" }],
  [
    "path",
    {
      d: "M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62",
      key: "rpc6vp"
    }
  ],
  [
    "path",
    {
      d: "M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62",
      key: "1lf63m"
    }
  ],
  [
    "path",
    { d: "M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62", key: "97tijn" }
  ]
];
var Soup = createLucideIcon("soup", __iconNode643);

// ../../node_modules/@lucide/vue/dist/esm/icons/spade.mjs
var __iconNode644 = [
  ["path", { d: "M12 18v4", key: "jadmvz" }],
  [
    "path",
    {
      d: "M2 14.499a5.5 5.5 0 0 0 9.591 3.675.6.6 0 0 1 .818.001A5.5 5.5 0 0 0 22 14.5c0-2.29-1.5-4-3-5.5l-5.492-5.312a2 2 0 0 0-3-.02L5 8.999c-1.5 1.5-3 3.2-3 5.5",
      key: "1aw2pz"
    }
  ]
];
var Spade = createLucideIcon("spade", __iconNode644);

// ../../node_modules/@lucide/vue/dist/esm/icons/sparkle.mjs
var __iconNode645 = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ]
];
var Sparkle = createLucideIcon("sparkle", __iconNode645);

// ../../node_modules/@lucide/vue/dist/esm/icons/sparkles.mjs
var __iconNode646 = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
var Sparkles = createLucideIcon("sparkles", __iconNode646);

// ../../node_modules/@lucide/vue/dist/esm/icons/speaker.mjs
var __iconNode647 = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["path", { d: "M12 6h.01", key: "1vi96p" }],
  ["circle", { cx: "12", cy: "14", r: "4", key: "1jruaj" }],
  ["path", { d: "M12 14h.01", key: "1etili" }]
];
var Speaker = createLucideIcon("speaker", __iconNode647);

// ../../node_modules/@lucide/vue/dist/esm/icons/speech.mjs
var __iconNode648 = [
  [
    "path",
    {
      d: "M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20",
      key: "11atix"
    }
  ],
  ["path", { d: "M19.8 17.8a7.5 7.5 0 0 0 .003-10.603", key: "yol142" }],
  ["path", { d: "M17 15a3.5 3.5 0 0 0-.025-4.975", key: "ssbmkc" }]
];
var Speech = createLucideIcon("speech", __iconNode648);

// ../../node_modules/@lucide/vue/dist/esm/icons/spell-check.mjs
var __iconNode649 = [
  ["path", { d: "m20 15-5.5 5.5L12 18", key: "6ytzne" }],
  ["path", { d: "m4 16 6-12 5.115 10.23", key: "fyukjg" }],
  ["path", { d: "M6 12h8", key: "1hdiqa" }]
];
var SpellCheck = createLucideIcon("spell-check", __iconNode649);

// ../../node_modules/@lucide/vue/dist/esm/icons/split.mjs
var __iconNode650 = [
  ["path", { d: "M16 3h5v5", key: "1806ms" }],
  ["path", { d: "M8 3H3v5", key: "15dfkv" }],
  ["path", { d: "M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3", key: "1qrqzj" }],
  ["path", { d: "m15 9 6-6", key: "ko1vev" }]
];
var Split = createLucideIcon("split", __iconNode650);

// ../../node_modules/@lucide/vue/dist/esm/icons/sprout.mjs
var __iconNode651 = [
  [
    "path",
    {
      d: "M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3",
      key: "139s4v"
    }
  ],
  ["path", { d: "M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4", key: "1dlkgp" }],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
var Sprout = createLucideIcon("sprout", __iconNode651);

// ../../node_modules/@lucide/vue/dist/esm/icons/square.mjs
var __iconNode652 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
];
var Square = createLucideIcon("square", __iconNode652);

// ../../node_modules/@lucide/vue/dist/esm/icons/square-arrow-out-down-left.mjs
var __iconNode653 = [
  ["path", { d: "M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6", key: "14qz4y" }],
  ["path", { d: "m3 21 9-9", key: "1jfql5" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
];
var SquareArrowOutDownLeft = createLucideIcon("square-arrow-out-down-left", __iconNode653);

// ../../node_modules/@lucide/vue/dist/esm/icons/square-arrow-out-down-right.mjs
var __iconNode654 = [
  ["path", { d: "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6", key: "14rsvq" }],
  ["path", { d: "m21 21-9-9", key: "1et2py" }],
  ["path", { d: "M21 15v6h-6", key: "1jko0i" }]
];
var SquareArrowOutDownRight = createLucideIcon("square-arrow-out-down-right", __iconNode654);

// ../../node_modules/@lucide/vue/dist/esm/icons/square-arrow-out-up-left.mjs
var __iconNode655 = [
  ["path", { d: "M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6", key: "14mv1t" }],
  ["path", { d: "m3 3 9 9", key: "rks13r" }],
  ["path", { d: "M3 9V3h6", key: "ira0h2" }]
];
var SquareArrowOutUpLeft = createLucideIcon("square-arrow-out-up-left", __iconNode655);

// ../../node_modules/@lucide/vue/dist/esm/icons/square-arrow-out-up-right.mjs
var __iconNode656 = [
  ["path", { d: "M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6", key: "y09zxi" }],
  ["path", { d: "m21 3-9 9", key: "mpx6sq" }],
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }]
];
var SquareArrowOutUpRight = createLucideIcon("square-arrow-out-up-right", __iconNode656);

// ../../node_modules/@lucide/vue/dist/esm/icons/square-check.mjs
var __iconNode657 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "m16 9-5.5 5.5L8 12", key: "xofnsj" }]
];
var SquareCheck = createLucideIcon("square-check", __iconNode657);

// ../../node_modules/@lucide/vue/dist/esm/icons/square-kanban.mjs
var __iconNode658 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M8 7v7", key: "1x2jlm" }],
  ["path", { d: "M12 7v4", key: "xawao1" }],
  ["path", { d: "M16 7v9", key: "1hp2iy" }]
];
var SquareKanban = createLucideIcon("square-kanban", __iconNode658);

// ../../node_modules/@lucide/vue/dist/esm/icons/square-minus.mjs
var __iconNode659 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }]
];
var SquareMinus = createLucideIcon("square-minus", __iconNode659);

// ../../node_modules/@lucide/vue/dist/esm/icons/square-plus.mjs
var __iconNode660 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
var SquarePlus = createLucideIcon("square-plus", __iconNode660);

// ../../node_modules/@lucide/vue/dist/esm/icons/square-x.mjs
var __iconNode661 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
var SquareX = createLucideIcon("square-x", __iconNode661);

// ../../node_modules/@lucide/vue/dist/esm/icons/squirrel.mjs
var __iconNode662 = [
  ["path", { d: "M15.236 22a3 3 0 0 0-2.2-5", key: "21bitc" }],
  ["path", { d: "M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4", key: "oh0fg0" }],
  ["path", { d: "M18 13h.01", key: "9veqaj" }],
  [
    "path",
    {
      d: "M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10",
      key: "980v8a"
    }
  ]
];
var Squirrel = createLucideIcon("squirrel", __iconNode662);

// ../../node_modules/@lucide/vue/dist/esm/icons/stamp.mjs
var __iconNode663 = [
  ["path", { d: "M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13", key: "i9gjdv" }],
  [
    "path",
    {
      d: "M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z",
      key: "1vzg3v"
    }
  ],
  ["path", { d: "M5 22h14", key: "ehvnwv" }]
];
var Stamp = createLucideIcon("stamp", __iconNode663);

// ../../node_modules/@lucide/vue/dist/esm/icons/star.mjs
var __iconNode664 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
var Star = createLucideIcon("star", __iconNode664);

// ../../node_modules/@lucide/vue/dist/esm/icons/stethoscope.mjs
var __iconNode665 = [
  ["path", { d: "M11 2v2", key: "1539x4" }],
  ["path", { d: "M5 2v2", key: "1yf1q8" }],
  ["path", { d: "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1", key: "rb5t3r" }],
  ["path", { d: "M8 15a6 6 0 0 0 12 0v-3", key: "x18d4x" }],
  ["circle", { cx: "20", cy: "10", r: "2", key: "ts1r5v" }]
];
var Stethoscope = createLucideIcon("stethoscope", __iconNode665);

// ../../node_modules/@lucide/vue/dist/esm/icons/sticky-note.mjs
var __iconNode666 = [
  [
    "path",
    {
      d: "M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z",
      key: "1dfntj"
    }
  ],
  ["path", { d: "M15 3v5a1 1 0 0 0 1 1h5", key: "6s6qgf" }]
];
var StickyNote = createLucideIcon("sticky-note", __iconNode666);

// ../../node_modules/@lucide/vue/dist/esm/icons/store.mjs
var __iconNode667 = [
  ["path", { d: "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5", key: "slp6dd" }],
  [
    "path",
    {
      d: "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",
      key: "o0xfot"
    }
  ],
  ["path", { d: "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05", key: "wn3emo" }]
];
var Store = createLucideIcon("store", __iconNode667);

// ../../node_modules/@lucide/vue/dist/esm/icons/sun.mjs
var __iconNode668 = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
];
var Sun = createLucideIcon("sun", __iconNode668);

// ../../node_modules/@lucide/vue/dist/esm/icons/sunrise.mjs
var __iconNode669 = [
  ["path", { d: "M12 2v8", key: "1q4o3n" }],
  ["path", { d: "m4.93 10.93 1.41 1.41", key: "2a7f42" }],
  ["path", { d: "M2 18h2", key: "j10viu" }],
  ["path", { d: "M20 18h2", key: "wocana" }],
  ["path", { d: "m19.07 10.93-1.41 1.41", key: "15zs5n" }],
  ["path", { d: "M22 22H2", key: "19qnx5" }],
  ["path", { d: "m8 6 4-4 4 4", key: "ybng9g" }],
  ["path", { d: "M16 18a4 4 0 0 0-8 0", key: "1lzouq" }]
];
var Sunrise = createLucideIcon("sunrise", __iconNode669);

// ../../node_modules/@lucide/vue/dist/esm/icons/sunset.mjs
var __iconNode670 = [
  ["path", { d: "M12 10V2", key: "16sf7g" }],
  ["path", { d: "m4.93 10.93 1.41 1.41", key: "2a7f42" }],
  ["path", { d: "M2 18h2", key: "j10viu" }],
  ["path", { d: "M20 18h2", key: "wocana" }],
  ["path", { d: "m19.07 10.93-1.41 1.41", key: "15zs5n" }],
  ["path", { d: "M22 22H2", key: "19qnx5" }],
  ["path", { d: "m16 6-4 4-4-4", key: "6wukr" }],
  ["path", { d: "M16 18a4 4 0 0 0-8 0", key: "1lzouq" }]
];
var Sunset = createLucideIcon("sunset", __iconNode670);

// ../../node_modules/@lucide/vue/dist/esm/icons/swords.mjs
var __iconNode671 = [
  ["path", { d: "m13 19 6-6", key: "gj6q8g" }],
  [
    "path",
    {
      d: "M14.5 17.5 3.586 6.586A2 2 0 013 5.172V3h2.172a2 2 0 011.414.586L17.5 14.5",
      key: "uwfxh8"
    }
  ],
  [
    "path",
    {
      d: "m14.828 6.172 2.586-2.586A2 2 0 0118.828 3H21v2.172a2 2 0 01-.586 1.414l-2.586 2.586",
      key: "1f17hx"
    }
  ],
  ["path", { d: "m16 16 4 4", key: "up5ibb" }],
  ["path", { d: "m19 21 2-2", key: "1phfkn" }],
  ["path", { d: "m5 14 4 4", key: "1gk0qx" }],
  ["path", { d: "m5 21-2-2", key: "1kw20b" }],
  ["path", { d: "M7.5 16.5 4 20", key: "14nozp" }]
];
var Swords = createLucideIcon("swords", __iconNode671);

// ../../node_modules/@lucide/vue/dist/esm/icons/syringe.mjs
var __iconNode672 = [
  ["path", { d: "m18 2 4 4", key: "22kx64" }],
  ["path", { d: "m17 7 3-3", key: "1w1zoj" }],
  ["path", { d: "M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5", key: "1exhtz" }],
  ["path", { d: "m9 11 4 4", key: "rovt3i" }],
  ["path", { d: "m5 19-3 3", key: "59f2uf" }],
  ["path", { d: "m14 4 6 6", key: "yqp9t2" }]
];
var Syringe = createLucideIcon("syringe", __iconNode672);

// ../../node_modules/@lucide/vue/dist/esm/icons/table.mjs
var __iconNode673 = [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }]
];
var Table = createLucideIcon("table", __iconNode673);

// ../../node_modules/@lucide/vue/dist/esm/icons/table-2.mjs
var __iconNode674 = [
  [
    "path",
    {
      d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
      key: "gugj83"
    }
  ]
];
var Table2 = createLucideIcon("table-2", __iconNode674);

// ../../node_modules/@lucide/vue/dist/esm/icons/table-properties.mjs
var __iconNode675 = [
  ["path", { d: "M15 3v18", key: "14nvp0" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M21 9H3", key: "1338ky" }],
  ["path", { d: "M21 15H3", key: "9uk58r" }]
];
var TableProperties = createLucideIcon("table-properties", __iconNode675);

// ../../node_modules/@lucide/vue/dist/esm/icons/tablet.mjs
var __iconNode676 = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2", key: "76otgf" }],
  ["line", { x1: "12", x2: "12.01", y1: "18", y2: "18", key: "1dp563" }]
];
var Tablet = createLucideIcon("tablet", __iconNode676);

// ../../node_modules/@lucide/vue/dist/esm/icons/tablet-smartphone.mjs
var __iconNode677 = [
  ["rect", { width: "10", height: "14", x: "3", y: "8", rx: "2", key: "1vrsiq" }],
  ["path", { d: "M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4", key: "1j4zmg" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }]
];
var TabletSmartphone = createLucideIcon("tablet-smartphone", __iconNode677);

// ../../node_modules/@lucide/vue/dist/esm/icons/tag.mjs
var __iconNode678 = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
var Tag = createLucideIcon("tag", __iconNode678);

// ../../node_modules/@lucide/vue/dist/esm/icons/tags.mjs
var __iconNode679 = [
  [
    "path",
    {
      d: "M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z",
      key: "16rjxf"
    }
  ],
  [
    "path",
    { d: "M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193", key: "178nd4" }
  ],
  ["circle", { cx: "10.5", cy: "6.5", r: ".5", fill: "currentColor", key: "12ikhr" }]
];
var Tags = createLucideIcon("tags", __iconNode679);

// ../../node_modules/@lucide/vue/dist/esm/icons/target.mjs
var __iconNode680 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
var Target = createLucideIcon("target", __iconNode680);

// ../../node_modules/@lucide/vue/dist/esm/icons/telescope.mjs
var __iconNode681 = [
  [
    "path",
    {
      d: "m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44",
      key: "k4qptu"
    }
  ],
  ["path", { d: "m13.56 11.747 4.332-.924", key: "19l80z" }],
  ["path", { d: "m16 21-3.105-6.21", key: "7oh9d" }],
  [
    "path",
    {
      d: "M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z",
      key: "m7xp4m"
    }
  ],
  ["path", { d: "m6.158 8.633 1.114 4.456", key: "74o979" }],
  ["path", { d: "m8 21 3.105-6.21", key: "1fvxut" }],
  ["circle", { cx: "12", cy: "13", r: "2", key: "1c1ljs" }]
];
var Telescope = createLucideIcon("telescope", __iconNode681);

// ../../node_modules/@lucide/vue/dist/esm/icons/tent.mjs
var __iconNode682 = [
  ["path", { d: "M3.5 21 14 3", key: "1szst5" }],
  ["path", { d: "M20.5 21 10 3", key: "1310c3" }],
  ["path", { d: "M15.5 21 12 15l-3.5 6", key: "1ddtfw" }],
  ["path", { d: "M2 21h20", key: "1nyx9w" }]
];
var Tent = createLucideIcon("tent", __iconNode682);

// ../../node_modules/@lucide/vue/dist/esm/icons/terminal.mjs
var __iconNode683 = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
];
var Terminal = createLucideIcon("terminal", __iconNode683);

// ../../node_modules/@lucide/vue/dist/esm/icons/test-tube.mjs
var __iconNode684 = [
  ["path", { d: "M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2", key: "125lnx" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }],
  ["path", { d: "M14.5 16h-5", key: "1ox875" }]
];
var TestTube = createLucideIcon("test-tube", __iconNode684);

// ../../node_modules/@lucide/vue/dist/esm/icons/text-cursor.mjs
var __iconNode685 = [
  ["path", { d: "M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1", key: "uvaxm9" }],
  ["path", { d: "M7 22h1a4 4 0 0 0 4-4", key: "1l7xii" }],
  ["path", { d: "M7 2h1a4 4 0 0 1 4 4", key: "1vrvvh" }]
];
var TextCursor = createLucideIcon("text-cursor", __iconNode685);

// ../../node_modules/@lucide/vue/dist/esm/icons/text-search.mjs
var __iconNode686 = [
  ["path", { d: "M21 5H3", key: "1fi0y6" }],
  ["path", { d: "M10 12H3", key: "1ulcyk" }],
  ["path", { d: "M10 19H3", key: "108z41" }],
  ["circle", { cx: "17", cy: "15", r: "3", key: "1upz2a" }],
  ["path", { d: "m21 19-1.9-1.9", key: "dwi7p8" }]
];
var TextSearch = createLucideIcon("text-search", __iconNode686);

// ../../node_modules/@lucide/vue/dist/esm/icons/thermometer.mjs
var __iconNode687 = [
  ["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]
];
var Thermometer = createLucideIcon("thermometer", __iconNode687);

// ../../node_modules/@lucide/vue/dist/esm/icons/thermometer-snowflake.mjs
var __iconNode688 = [
  ["path", { d: "m10 20-1.25-2.5L6 18", key: "18frcb" }],
  ["path", { d: "M10 4 8.75 6.5 6 6", key: "7mghy3" }],
  ["path", { d: "M10.585 15H10", key: "4nqulp" }],
  ["path", { d: "M2 12h6.5L10 9", key: "kv9z4n" }],
  ["path", { d: "M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z", key: "yu0u2z" }],
  ["path", { d: "m4 10 1.5 2L4 14", key: "k9enpj" }],
  ["path", { d: "m7 21 3-6-1.5-3", key: "j8hb9u" }],
  ["path", { d: "m7 3 3 6h2", key: "1bbqgq" }]
];
var ThermometerSnowflake = createLucideIcon("thermometer-snowflake", __iconNode688);

// ../../node_modules/@lucide/vue/dist/esm/icons/thermometer-sun.mjs
var __iconNode689 = [
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 8a4 4 0 0 0-1.645 7.647", key: "wz5p04" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z", key: "yu0u2z" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }]
];
var ThermometerSun = createLucideIcon("thermometer-sun", __iconNode689);

// ../../node_modules/@lucide/vue/dist/esm/icons/thumbs-down.mjs
var __iconNode690 = [
  [
    "path",
    {
      d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",
      key: "m61m77"
    }
  ],
  ["path", { d: "M17 14V2", key: "8ymqnk" }]
];
var ThumbsDown = createLucideIcon("thumbs-down", __iconNode690);

// ../../node_modules/@lucide/vue/dist/esm/icons/thumbs-up.mjs
var __iconNode691 = [
  [
    "path",
    {
      d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
      key: "emmmcr"
    }
  ],
  ["path", { d: "M7 10v12", key: "1qc93n" }]
];
var ThumbsUp = createLucideIcon("thumbs-up", __iconNode691);

// ../../node_modules/@lucide/vue/dist/esm/icons/ticket.mjs
var __iconNode692 = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M13 5v2", key: "dyzc3o" }],
  ["path", { d: "M13 17v2", key: "1ont0d" }],
  ["path", { d: "M13 11v2", key: "1wjjxi" }]
];
var Ticket = createLucideIcon("ticket", __iconNode692);

// ../../node_modules/@lucide/vue/dist/esm/icons/ticket-check.mjs
var __iconNode693 = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
var TicketCheck = createLucideIcon("ticket-check", __iconNode693);

// ../../node_modules/@lucide/vue/dist/esm/icons/ticket-minus.mjs
var __iconNode694 = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M9 12h6", key: "1c52cq" }]
];
var TicketMinus = createLucideIcon("ticket-minus", __iconNode694);

// ../../node_modules/@lucide/vue/dist/esm/icons/ticket-percent.mjs
var __iconNode695 = [
  [
    "path",
    {
      d: "M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "1l48ns"
    }
  ],
  ["path", { d: "M9 9h.01", key: "1q5me6" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "M15 15h.01", key: "lqbp3k" }]
];
var TicketPercent = createLucideIcon("ticket-percent", __iconNode695);

// ../../node_modules/@lucide/vue/dist/esm/icons/ticket-plus.mjs
var __iconNode696 = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M9 12h6", key: "1c52cq" }],
  ["path", { d: "M12 9v6", key: "199k2o" }]
];
var TicketPlus = createLucideIcon("ticket-plus", __iconNode696);

// ../../node_modules/@lucide/vue/dist/esm/icons/ticket-x.mjs
var __iconNode697 = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "m9.5 14.5 5-5", key: "qviqfa" }],
  ["path", { d: "m9.5 9.5 5 5", key: "18nt4w" }]
];
var TicketX = createLucideIcon("ticket-x", __iconNode697);

// ../../node_modules/@lucide/vue/dist/esm/icons/timer.mjs
var __iconNode698 = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
];
var Timer = createLucideIcon("timer", __iconNode698);

// ../../node_modules/@lucide/vue/dist/esm/icons/timer-off.mjs
var __iconNode699 = [
  ["path", { d: "M10 2h4", key: "n1abiw" }],
  ["path", { d: "M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7", key: "10he05" }],
  ["path", { d: "M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2", key: "15f7sh" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M12 12v-2", key: "fwoke6" }]
];
var TimerOff = createLucideIcon("timer-off", __iconNode699);

// ../../node_modules/@lucide/vue/dist/esm/icons/timer-reset.mjs
var __iconNode700 = [
  ["path", { d: "M10 2h4", key: "n1abiw" }],
  ["path", { d: "M12 14v-4", key: "1evpnu" }],
  ["path", { d: "M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6", key: "1ts96g" }],
  ["path", { d: "M9 17H4v5", key: "8t5av" }]
];
var TimerReset = createLucideIcon("timer-reset", __iconNode700);

// ../../node_modules/@lucide/vue/dist/esm/icons/toggle-left.mjs
var __iconNode701 = [
  ["circle", { cx: "9", cy: "12", r: "3", key: "u3jwor" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
];
var ToggleLeft = createLucideIcon("toggle-left", __iconNode701);

// ../../node_modules/@lucide/vue/dist/esm/icons/toggle-right.mjs
var __iconNode702 = [
  ["circle", { cx: "15", cy: "12", r: "3", key: "1afu0r" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
];
var ToggleRight = createLucideIcon("toggle-right", __iconNode702);

// ../../node_modules/@lucide/vue/dist/esm/icons/touchpad.mjs
var __iconNode703 = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "M2 14h20", key: "myj16y" }],
  ["path", { d: "M12 20v-6", key: "1rm09r" }]
];
var Touchpad = createLucideIcon("touchpad", __iconNode703);

// ../../node_modules/@lucide/vue/dist/esm/icons/traffic-cone.mjs
var __iconNode704 = [
  ["path", { d: "M16.05 10.966a5 2.5 0 0 1-8.1 0", key: "m5jpwb" }],
  [
    "path",
    {
      d: "m16.923 14.049 4.48 2.04a1 1 0 0 1 .001 1.831l-8.574 3.9a2 2 0 0 1-1.66 0l-8.574-3.91a1 1 0 0 1 0-1.83l4.484-2.04",
      key: "rbg3g8"
    }
  ],
  ["path", { d: "M16.949 14.14a5 2.5 0 1 1-9.9 0L10.063 3.5a2 2 0 0 1 3.874 0z", key: "vap8c8" }],
  ["path", { d: "M9.194 6.57a5 2.5 0 0 0 5.61 0", key: "15hn5c" }]
];
var TrafficCone = createLucideIcon("traffic-cone", __iconNode704);

// ../../node_modules/@lucide/vue/dist/esm/icons/tram-front.mjs
var __iconNode705 = [
  ["rect", { width: "16", height: "16", x: "4", y: "3", rx: "2", key: "1wxw4b" }],
  ["path", { d: "M4 11h16", key: "mpoxn0" }],
  ["path", { d: "M12 3v8", key: "1h2ygw" }],
  ["path", { d: "m8 19-2 3", key: "13i0xs" }],
  ["path", { d: "m18 22-2-3", key: "1p0ohu" }],
  ["path", { d: "M8 15h.01", key: "a7atzg" }],
  ["path", { d: "M16 15h.01", key: "rnfrdf" }]
];
var TramFront = createLucideIcon("tram-front", __iconNode705);

// ../../node_modules/@lucide/vue/dist/esm/icons/train-front.mjs
var __iconNode706 = [
  ["path", { d: "M8 3.1V7a4 4 0 0 0 8 0V3.1", key: "1v71zp" }],
  ["path", { d: "m9 15-1-1", key: "1yrq24" }],
  ["path", { d: "m15 15 1-1", key: "1t0d6s" }],
  ["path", { d: "M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z", key: "1p0hjs" }],
  ["path", { d: "m8 19-2 3", key: "13i0xs" }],
  ["path", { d: "m16 19 2 3", key: "xo31yx" }]
];
var TrainFront = createLucideIcon("train-front", __iconNode706);

// ../../node_modules/@lucide/vue/dist/esm/icons/trash.mjs
var __iconNode707 = [
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
var Trash = createLucideIcon("trash", __iconNode707);

// ../../node_modules/@lucide/vue/dist/esm/icons/tree-pine.mjs
var __iconNode708 = [
  [
    "path",
    {
      d: "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z",
      key: "cpyugq"
    }
  ],
  ["path", { d: "M12 22v-3", key: "kmzjlo" }]
];
var TreePine = createLucideIcon("tree-pine", __iconNode708);

// ../../node_modules/@lucide/vue/dist/esm/icons/trees.mjs
var __iconNode709 = [
  ["path", { d: "M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z", key: "1l6gj6" }],
  ["path", { d: "M7 16v6", key: "1a82de" }],
  ["path", { d: "M13 19v3", key: "13sx9i" }],
  [
    "path",
    {
      d: "M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5",
      key: "1sj9kv"
    }
  ]
];
var Trees = createLucideIcon("trees", __iconNode709);

// ../../node_modules/@lucide/vue/dist/esm/icons/triangle.mjs
var __iconNode710 = [
  [
    "path",
    { d: "M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z", key: "14u9p9" }
  ]
];
var Triangle = createLucideIcon("triangle", __iconNode710);

// ../../node_modules/@lucide/vue/dist/esm/icons/trophy.mjs
var __iconNode711 = [
  ["path", { d: "M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2", key: "pwuv1l" }],
  ["path", { d: "M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2", key: "1y54w1" }],
  ["path", { d: "M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3", key: "e30mpu" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z", key: "1mhfuq" }],
  ["path", { d: "M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3", key: "i0yafy" }]
];
var Trophy = createLucideIcon("trophy", __iconNode711);

// ../../node_modules/@lucide/vue/dist/esm/icons/truck.mjs
var __iconNode712 = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
var Truck = createLucideIcon("truck", __iconNode712);

// ../../node_modules/@lucide/vue/dist/esm/icons/turtle.mjs
var __iconNode713 = [
  [
    "path",
    {
      d: "m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z",
      key: "1lbbv7"
    }
  ],
  ["path", { d: "M4.82 7.9 8 10", key: "m9wose" }],
  ["path", { d: "M15.18 7.9 12 10", key: "p8dp2u" }],
  ["path", { d: "M16.93 10H20a2 2 0 0 1 0 4H2", key: "12nsm7" }]
];
var Turtle = createLucideIcon("turtle", __iconNode713);

// ../../node_modules/@lucide/vue/dist/esm/icons/tv.mjs
var __iconNode714 = [
  ["path", { d: "m17 2-5 5-5-5", key: "16satq" }],
  ["rect", { width: "20", height: "15", x: "2", y: "7", rx: "2", key: "1e6viu" }]
];
var Tv = createLucideIcon("tv", __iconNode714);

// ../../node_modules/@lucide/vue/dist/esm/icons/type.mjs
var __iconNode715 = [
  ["path", { d: "M12 4v16", key: "1654pz" }],
  ["path", { d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2", key: "e0r10z" }],
  ["path", { d: "M9 20h6", key: "s66wpe" }]
];
var Type = createLucideIcon("type", __iconNode715);

// ../../node_modules/@lucide/vue/dist/esm/icons/umbrella.mjs
var __iconNode716 = [
  ["path", { d: "M12 13v7a2 2 0 0 0 4 0", key: "rpgb42" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  [
    "path",
    {
      d: "M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z",
      key: "124nyo"
    }
  ]
];
var Umbrella = createLucideIcon("umbrella", __iconNode716);

// ../../node_modules/@lucide/vue/dist/esm/icons/underline.mjs
var __iconNode717 = [
  ["path", { d: "M6 4v6a6 6 0 0 0 12 0V4", key: "9kb039" }],
  ["line", { x1: "4", x2: "20", y1: "20", y2: "20", key: "nun2al" }]
];
var Underline = createLucideIcon("underline", __iconNode717);

// ../../node_modules/@lucide/vue/dist/esm/icons/undo.mjs
var __iconNode718 = [
  ["path", { d: "M3 7v6h6", key: "1v2h90" }],
  ["path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13", key: "1r6uu6" }]
];
var Undo = createLucideIcon("undo", __iconNode718);

// ../../node_modules/@lucide/vue/dist/esm/icons/university.mjs
var __iconNode719 = [
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  ["path", { d: "M18 12h.01", key: "yjnet6" }],
  ["path", { d: "M18 16h.01", key: "plv8zi" }],
  [
    "path",
    {
      d: "M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z",
      key: "1ogmi3"
    }
  ],
  ["path", { d: "M6 12h.01", key: "c2rlol" }],
  ["path", { d: "M6 16h.01", key: "1pmjb7" }],
  ["circle", { cx: "12", cy: "10", r: "2", key: "1yojzk" }]
];
var University = createLucideIcon("university", __iconNode719);

// ../../node_modules/@lucide/vue/dist/esm/icons/unlink.mjs
var __iconNode720 = [
  [
    "path",
    {
      d: "m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71",
      key: "yqzxt4"
    }
  ],
  [
    "path",
    {
      d: "m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71",
      key: "4qinb0"
    }
  ],
  ["line", { x1: "8", x2: "8", y1: "2", y2: "5", key: "1041cp" }],
  ["line", { x1: "2", x2: "5", y1: "8", y2: "8", key: "14m1p5" }],
  ["line", { x1: "16", x2: "16", y1: "19", y2: "22", key: "rzdirn" }],
  ["line", { x1: "19", x2: "22", y1: "16", y2: "16", key: "ox905f" }]
];
var Unlink = createLucideIcon("unlink", __iconNode720);

// ../../node_modules/@lucide/vue/dist/esm/icons/unlink-2.mjs
var __iconNode721 = [
  ["path", { d: "M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2", key: "1re2ne" }]
];
var Unlink2 = createLucideIcon("unlink-2", __iconNode721);

// ../../node_modules/@lucide/vue/dist/esm/icons/upload.mjs
var __iconNode722 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
var Upload = createLucideIcon("upload", __iconNode722);

// ../../node_modules/@lucide/vue/dist/esm/icons/usb.mjs
var __iconNode723 = [
  ["circle", { cx: "10", cy: "7", r: "1", key: "dypaad" }],
  ["circle", { cx: "4", cy: "20", r: "1", key: "22iqad" }],
  ["path", { d: "M4.7 19.3 19 5", key: "1enqfc" }],
  ["path", { d: "m21 3-3 1 2 2Z", key: "d3ov82" }],
  ["path", { d: "M9.26 7.68 5 12l2 5", key: "1esawj" }],
  ["path", { d: "m10 14 5 2 3.5-3.5", key: "v8oal5" }],
  ["path", { d: "m18 12 1-1 1 1-1 1Z", key: "1bh22v" }]
];
var Usb = createLucideIcon("usb", __iconNode723);

// ../../node_modules/@lucide/vue/dist/esm/icons/user.mjs
var __iconNode724 = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
var User = createLucideIcon("user", __iconNode724);

// ../../node_modules/@lucide/vue/dist/esm/icons/user-check.mjs
var __iconNode725 = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
var UserCheck = createLucideIcon("user-check", __iconNode725);

// ../../node_modules/@lucide/vue/dist/esm/icons/user-cog.mjs
var __iconNode726 = [
  ["path", { d: "M10 15H6a4 4 0 0 0-4 4v2", key: "1nfge6" }],
  ["path", { d: "m14.305 16.53.923-.382", key: "1itpsq" }],
  ["path", { d: "m15.228 13.852-.923-.383", key: "eplpkm" }],
  ["path", { d: "m16.852 12.228-.383-.923", key: "13v3q0" }],
  ["path", { d: "m16.852 17.772-.383.924", key: "1i8mnm" }],
  ["path", { d: "m19.148 12.228.383-.923", key: "1q8j1v" }],
  ["path", { d: "m19.53 18.696-.382-.924", key: "vk1qj3" }],
  ["path", { d: "m20.772 13.852.924-.383", key: "n880s0" }],
  ["path", { d: "m20.772 16.148.924.383", key: "1g6xey" }],
  ["circle", { cx: "18", cy: "15", r: "3", key: "gjjjvw" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
var UserCog = createLucideIcon("user-cog", __iconNode726);

// ../../node_modules/@lucide/vue/dist/esm/icons/user-minus.mjs
var __iconNode727 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
var UserMinus = createLucideIcon("user-minus", __iconNode727);

// ../../node_modules/@lucide/vue/dist/esm/icons/user-plus.mjs
var __iconNode728 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
var UserPlus = createLucideIcon("user-plus", __iconNode728);

// ../../node_modules/@lucide/vue/dist/esm/icons/user-round.mjs
var __iconNode729 = [
  ["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]
];
var UserRound = createLucideIcon("user-round", __iconNode729);

// ../../node_modules/@lucide/vue/dist/esm/icons/user-round-check.mjs
var __iconNode730 = [
  ["path", { d: "M2 21a8 8 0 0 1 13.292-6", key: "bjp14o" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "m16 19 2 2 4-4", key: "1b14m6" }]
];
var UserRoundCheck = createLucideIcon("user-round-check", __iconNode730);

// ../../node_modules/@lucide/vue/dist/esm/icons/user-round-cog.mjs
var __iconNode731 = [
  ["path", { d: "m14.305 19.53.923-.382", key: "3m78fa" }],
  ["path", { d: "m15.228 16.852-.923-.383", key: "npixar" }],
  ["path", { d: "m16.852 15.228-.383-.923", key: "5xggr7" }],
  ["path", { d: "m16.852 20.772-.383.924", key: "dpfhf9" }],
  ["path", { d: "m19.148 15.228.383-.923", key: "1reyyz" }],
  ["path", { d: "m19.53 21.696-.382-.924", key: "1goivc" }],
  ["path", { d: "M2 21a8 8 0 0 1 10.434-7.62", key: "1yezr2" }],
  ["path", { d: "m20.772 16.852.924-.383", key: "htqkph" }],
  ["path", { d: "m20.772 19.148.924.383", key: "9w9pjp" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }]
];
var UserRoundCog = createLucideIcon("user-round-cog", __iconNode731);

// ../../node_modules/@lucide/vue/dist/esm/icons/user-round-minus.mjs
var __iconNode732 = [
  ["path", { d: "M2 21a8 8 0 0 1 13.292-6", key: "bjp14o" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "M22 19h-6", key: "vcuq98" }]
];
var UserRoundMinus = createLucideIcon("user-round-minus", __iconNode732);

// ../../node_modules/@lucide/vue/dist/esm/icons/user-round-plus.mjs
var __iconNode733 = [
  ["path", { d: "M2 21a8 8 0 0 1 13.292-6", key: "bjp14o" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "M19 16v6", key: "tddt3s" }],
  ["path", { d: "M22 19h-6", key: "vcuq98" }]
];
var UserRoundPlus = createLucideIcon("user-round-plus", __iconNode733);

// ../../node_modules/@lucide/vue/dist/esm/icons/user-round-search.mjs
var __iconNode734 = [
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "M2 21a8 8 0 0 1 10.434-7.62", key: "1yezr2" }],
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["path", { d: "m22 22-1.9-1.9", key: "1e5ubv" }]
];
var UserRoundSearch = createLucideIcon("user-round-search", __iconNode734);

// ../../node_modules/@lucide/vue/dist/esm/icons/user-round-x.mjs
var __iconNode735 = [
  ["path", { d: "m16.5 16.5 5 5", key: "zc9lw7" }],
  ["path", { d: "M2 21a8 8 0 0 1 11.531-7.18", key: "x5izle" }],
  ["path", { d: "m21.5 16.5-5 5", key: "1empo3" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }]
];
var UserRoundX = createLucideIcon("user-round-x", __iconNode735);

// ../../node_modules/@lucide/vue/dist/esm/icons/user-search.mjs
var __iconNode736 = [
  ["circle", { cx: "10", cy: "7", r: "4", key: "e45bow" }],
  ["path", { d: "M10.3 15H7a4 4 0 0 0-4 4v2", key: "3bnktk" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["path", { d: "m21 21-1.9-1.9", key: "1g2n9r" }]
];
var UserSearch = createLucideIcon("user-search", __iconNode736);

// ../../node_modules/@lucide/vue/dist/esm/icons/user-x.mjs
var __iconNode737 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
var UserX = createLucideIcon("user-x", __iconNode737);

// ../../node_modules/@lucide/vue/dist/esm/icons/users.mjs
var __iconNode738 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
var Users = createLucideIcon("users", __iconNode738);

// ../../node_modules/@lucide/vue/dist/esm/icons/users-round.mjs
var __iconNode739 = [
  ["path", { d: "M18 21a8 8 0 0 0-16 0", key: "3ypg7q" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3", key: "10s06x" }]
];
var UsersRound = createLucideIcon("users-round", __iconNode739);

// ../../node_modules/@lucide/vue/dist/esm/icons/utensils.mjs
var __iconNode740 = [
  ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", key: "cjf0a3" }],
  ["path", { d: "M7 2v20", key: "1473qp" }],
  ["path", { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7", key: "j28e5" }]
];
var Utensils = createLucideIcon("utensils", __iconNode740);

// ../../node_modules/@lucide/vue/dist/esm/icons/utensils-crossed.mjs
var __iconNode741 = [
  ["path", { d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8", key: "n7qcjb" }],
  [
    "path",
    { d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7", key: "d0u48b" }
  ],
  ["path", { d: "m2.1 21.8 6.4-6.3", key: "yn04lh" }],
  ["path", { d: "m19 5-7 7", key: "194lzd" }]
];
var UtensilsCrossed = createLucideIcon("utensils-crossed", __iconNode741);

// ../../node_modules/@lucide/vue/dist/esm/icons/variable.mjs
var __iconNode742 = [
  ["path", { d: "M8 21s-4-3-4-9 4-9 4-9", key: "uto9ud" }],
  ["path", { d: "M16 3s4 3 4 9-4 9-4 9", key: "4w2vsq" }],
  ["line", { x1: "15", x2: "9", y1: "9", y2: "15", key: "f7djnv" }],
  ["line", { x1: "9", x2: "15", y1: "9", y2: "15", key: "1shsy8" }]
];
var Variable = createLucideIcon("variable", __iconNode742);

// ../../node_modules/@lucide/vue/dist/esm/icons/video.mjs
var __iconNode743 = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
var Video = createLucideIcon("video", __iconNode743);

// ../../node_modules/@lucide/vue/dist/esm/icons/video-off.mjs
var __iconNode744 = [
  [
    "path",
    { d: "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196", key: "w8jjjt" }
  ],
  ["path", { d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2", key: "1xawa7" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
var VideoOff = createLucideIcon("video-off", __iconNode744);

// ../../node_modules/@lucide/vue/dist/esm/icons/voicemail.mjs
var __iconNode745 = [
  ["circle", { cx: "6", cy: "12", r: "4", key: "1ehtga" }],
  ["circle", { cx: "18", cy: "12", r: "4", key: "4vafl8" }],
  ["line", { x1: "6", x2: "18", y1: "16", y2: "16", key: "pmt8us" }]
];
var Voicemail = createLucideIcon("voicemail", __iconNode745);

// ../../node_modules/@lucide/vue/dist/esm/icons/volume-2.mjs
var __iconNode746 = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
];
var Volume2 = createLucideIcon("volume-2", __iconNode746);

// ../../node_modules/@lucide/vue/dist/esm/icons/volume-x.mjs
var __iconNode747 = [
  [
    "path",
    {
      d: "M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z",
      key: "1p7khw"
    }
  ],
  ["path", { d: "m16.5 14.5 5-5", key: "cul3yw" }],
  ["path", { d: "m16.5 9.5 5 5", key: "1akey5" }]
];
var VolumeX = createLucideIcon("volume-x", __iconNode747);

// ../../node_modules/@lucide/vue/dist/esm/icons/wallet.mjs
var __iconNode748 = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
var Wallet = createLucideIcon("wallet", __iconNode748);

// ../../node_modules/@lucide/vue/dist/esm/icons/wand-sparkles.mjs
var __iconNode749 = [
  [
    "path",
    {
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
      key: "ul74o6"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  ["path", { d: "M5 6v4", key: "ilb8ba" }],
  ["path", { d: "M19 14v4", key: "blhpug" }],
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M7 8H3", key: "zfb6yr" }],
  ["path", { d: "M21 16h-4", key: "1cnmox" }],
  ["path", { d: "M11 3H9", key: "1obp7u" }]
];
var WandSparkles = createLucideIcon("wand-sparkles", __iconNode749);

// ../../node_modules/@lucide/vue/dist/esm/icons/warehouse.mjs
var __iconNode750 = [
  ["path", { d: "M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11", key: "pb2vm6" }],
  [
    "path",
    {
      d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z",
      key: "doq5xv"
    }
  ],
  ["path", { d: "M6 13h12", key: "yf64js" }],
  ["path", { d: "M6 17h12", key: "1jwigz" }]
];
var Warehouse = createLucideIcon("warehouse", __iconNode750);

// ../../node_modules/@lucide/vue/dist/esm/icons/washing-machine.mjs
var __iconNode751 = [
  ["path", { d: "M3 6h3", key: "155dbl" }],
  ["path", { d: "M17 6h.01", key: "e2y6kg" }],
  ["rect", { width: "18", height: "20", x: "3", y: "2", rx: "2", key: "od3kk9" }],
  ["circle", { cx: "12", cy: "13", r: "5", key: "nlbqau" }],
  ["path", { d: "M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5", key: "17lach" }]
];
var WashingMachine = createLucideIcon("washing-machine", __iconNode751);

// ../../node_modules/@lucide/vue/dist/esm/icons/watch.mjs
var __iconNode752 = [
  ["path", { d: "M12 10v2.2l1.6 1", key: "n3r21l" }],
  [
    "path",
    { d: "m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05", key: "18k57s" }
  ],
  ["path", { d: "m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05", key: "16ny36" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }]
];
var Watch = createLucideIcon("watch", __iconNode752);

// ../../node_modules/@lucide/vue/dist/esm/icons/waypoints.mjs
var __iconNode753 = [
  ["path", { d: "m10.586 5.414-5.172 5.172", key: "4mc350" }],
  ["path", { d: "m18.586 13.414-5.172 5.172", key: "8c96vv" }],
  ["path", { d: "M6 12h12", key: "8npq4p" }],
  ["circle", { cx: "12", cy: "20", r: "2", key: "144qzu" }],
  ["circle", { cx: "12", cy: "4", r: "2", key: "muu5ef" }],
  ["circle", { cx: "20", cy: "12", r: "2", key: "1xzzfp" }],
  ["circle", { cx: "4", cy: "12", r: "2", key: "1hvhnz" }]
];
var Waypoints = createLucideIcon("waypoints", __iconNode753);

// ../../node_modules/@lucide/vue/dist/esm/icons/webcam.mjs
var __iconNode754 = [
  ["circle", { cx: "12", cy: "10", r: "8", key: "1gshiw" }],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ["path", { d: "M7 22h10", key: "10w4w3" }],
  ["path", { d: "M12 22v-4", key: "1utk9m" }]
];
var Webcam = createLucideIcon("webcam", __iconNode754);

// ../../node_modules/@lucide/vue/dist/esm/icons/wheat.mjs
var __iconNode755 = [
  ["path", { d: "M2 22 16 8", key: "60hf96" }],
  [
    "path",
    {
      d: "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
      key: "1rdhi6"
    }
  ],
  [
    "path",
    {
      d: "M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
      key: "1sdzmb"
    }
  ],
  [
    "path",
    {
      d: "M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
      key: "eoatbi"
    }
  ],
  ["path", { d: "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z", key: "19rau1" }],
  [
    "path",
    {
      d: "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
      key: "tc8ph9"
    }
  ],
  [
    "path",
    {
      d: "M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
      key: "2m8kc5"
    }
  ],
  [
    "path",
    {
      d: "M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
      key: "vex3ng"
    }
  ]
];
var Wheat = createLucideIcon("wheat", __iconNode755);

// ../../node_modules/@lucide/vue/dist/esm/icons/whole-word.mjs
var __iconNode756 = [
  ["circle", { cx: "7", cy: "12", r: "3", key: "12clwm" }],
  ["path", { d: "M10 9v6", key: "17i7lo" }],
  ["circle", { cx: "17", cy: "12", r: "3", key: "gl7c2s" }],
  ["path", { d: "M14 7v8", key: "dl84cr" }],
  ["path", { d: "M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1", key: "lt2kga" }]
];
var WholeWord = createLucideIcon("whole-word", __iconNode756);

// ../../node_modules/@lucide/vue/dist/esm/icons/wifi.mjs
var __iconNode757 = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
];
var Wifi = createLucideIcon("wifi", __iconNode757);

// ../../node_modules/@lucide/vue/dist/esm/icons/wind.mjs
var __iconNode758 = [
  ["path", { d: "M12.8 19.6A2 2 0 1 0 14 16H2", key: "148xed" }],
  ["path", { d: "M17.5 8a2.5 2.5 0 1 1 2 4H2", key: "1u4tom" }],
  ["path", { d: "M9.8 4.4A2 2 0 1 1 11 8H2", key: "75valh" }]
];
var Wind = createLucideIcon("wind", __iconNode758);

// ../../node_modules/@lucide/vue/dist/esm/icons/workflow.mjs
var __iconNode759 = [
  ["rect", { width: "8", height: "8", x: "3", y: "3", rx: "2", key: "by2w9f" }],
  ["path", { d: "M7 11v4a2 2 0 0 0 2 2h4", key: "xkn7yn" }],
  ["rect", { width: "8", height: "8", x: "13", y: "13", rx: "2", key: "1cgmvn" }]
];
var Workflow = createLucideIcon("workflow", __iconNode759);

// ../../node_modules/@lucide/vue/dist/esm/icons/worm.mjs
var __iconNode760 = [
  ["path", { d: "m19 12-1.5 3", key: "9bcu4o" }],
  ["path", { d: "M19.63 18.81 22 20", key: "121v98" }],
  [
    "path",
    {
      d: "M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z",
      key: "1tij6q"
    }
  ]
];
var Worm = createLucideIcon("worm", __iconNode760);

// ../../node_modules/@lucide/vue/dist/esm/icons/wrench.mjs
var __iconNode761 = [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
      key: "1ngwbx"
    }
  ]
];
var Wrench = createLucideIcon("wrench", __iconNode761);

// ../../node_modules/@lucide/vue/dist/esm/icons/x.mjs
var __iconNode762 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
var X = createLucideIcon("x", __iconNode762);

// ../../node_modules/@lucide/vue/dist/esm/icons/zap.mjs
var __iconNode763 = [
  [
    "path",
    {
      d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",
      key: "1v7up4"
    }
  ]
];
var Zap = createLucideIcon("zap", __iconNode763);

// ../../node_modules/@lucide/vue/dist/esm/icons/zap-off.mjs
var __iconNode764 = [
  ["path", { d: "M10.768 5.111 13.44 2.44a1.5 1.5 0 012.474 1.561l-1.633 4.625", key: "l6h226" }],
  ["path", { d: "m18.889 13.232.672-.672A1.5 1.5 0 0018.5 10h-2.844", key: "1717b9" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "m7.94 7.94-3.5 3.499A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l5.5-5.5",
      key: "1bjzrh"
    }
  ]
];
var ZapOff = createLucideIcon("zap-off", __iconNode764);

// src/icons/iconRegistry.entry.ts
var iconRegistry = {
  "accessibility": Accessibility,
  "activity": Activity,
  "air-vent": AirVent,
  "airplay": Airplay,
  "alarm-clock": AlarmClock,
  "album": Album,
  "alert-circle": CircleAlert,
  "alert-triangle": TriangleAlert,
  "align-center": TextAlignCenter,
  "align-left": TextAlignStart,
  "align-right": TextAlignEnd,
  "ambulance": Ambulance,
  "anchor": Anchor,
  "antenna": Antenna,
  "aperture": Aperture,
  "apple": Apple,
  "archive": Archive,
  "archive-restore": ArchiveRestore,
  "archive-x": ArchiveX,
  "area-chart": ChartArea,
  "armchair": Armchair,
  "arrow-down": ArrowDown,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  "arrow-up-right": ArrowUpRight,
  "asterisk": Asterisk,
  "at-sign": AtSign,
  "atom": Atom,
  "award": Award,
  "axe": Axe,
  "baby": Baby,
  "badge": Badge,
  "badge-alert": BadgeAlert,
  "badge-cent": BadgeCent,
  "badge-check": BadgeCheck,
  "badge-dollar-sign": BadgeDollarSign,
  "badge-euro": BadgeEuro,
  "badge-info": BadgeInfo,
  "badge-minus": BadgeMinus,
  "badge-plus": BadgePlus,
  "badge-x": BadgeX,
  "ban": Ban,
  "banana": Banana,
  "banknote": Banknote,
  "bar-chart-2": ChartNoAxesColumn,
  "bar-chart-3": ChartColumn,
  "barcode": Barcode,
  "bath": Bath,
  "battery": Battery,
  "battery-charging": BatteryCharging,
  "battery-full": BatteryFull,
  "battery-low": BatteryLow,
  "beaker": Beaker,
  "bed": Bed,
  "bed-double": BedDouble,
  "bed-single": BedSingle,
  "beef": Beef,
  "bell": Bell,
  "bell-minus": BellMinus,
  "bell-off": BellOff,
  "bell-plus": BellPlus,
  "bell-ring": BellRing,
  "bike": Bike,
  "binary": Binary,
  "bird": Bird,
  "blocks": Blocks,
  "bluetooth": Bluetooth,
  "bold": Bold,
  "bolt": Bolt,
  "bone": Bone,
  "book": Book,
  "book-check": BookCheck,
  "book-copy": BookCopy,
  "book-marked": BookMarked,
  "book-minus": BookMinus,
  "book-open": BookOpen,
  "book-open-check": BookOpenCheck,
  "book-open-text": BookOpenText,
  "book-plus": BookPlus,
  "book-text": BookText,
  "book-user": BookUser,
  "book-x": BookX,
  "bookmark": Bookmark,
  "bookmark-minus": BookmarkMinus,
  "bookmark-plus": BookmarkPlus,
  "bookmark-x": BookmarkX,
  "bot": Bot,
  "box": Box,
  "boxes": Boxes,
  "brain": Brain,
  "brain-circuit": BrainCircuit,
  "brain-cog": BrainCog,
  "brick-wall": BrickWall,
  "briefcase": Briefcase,
  "brush": Brush,
  "brush-cleaning": BrushCleaning,
  "bug": Bug,
  "bug-off": BugOff,
  "bug-play": BugPlay,
  "building": Building,
  "building-2": Building2,
  "bus": Bus,
  "bus-front": BusFront,
  "cake": Cake,
  "cake-slice": CakeSlice,
  "calendar": Calendar,
  "calendar-check": CalendarCheck,
  "calendar-clock": CalendarClock,
  "calendar-days": CalendarDays,
  "calendar-heart": CalendarHeart,
  "calendar-minus": CalendarMinus,
  "calendar-plus": CalendarPlus,
  "calendar-range": CalendarRange,
  "calendar-search": CalendarSearch,
  "calendar-x": CalendarX,
  "camera": Camera,
  "candy": Candy,
  "candy-cane": CandyCane,
  "car": Car,
  "car-front": CarFront,
  "car-taxi-front": CarTaxiFront,
  "carrot": Carrot,
  "case-lower": CaseLower,
  "case-sensitive": CaseSensitive,
  "case-upper": CaseUpper,
  "cast": Cast,
  "castle": Castle,
  "cat": Cat,
  "check": Check,
  "check-circle": CircleCheckBig,
  "chef-hat": ChefHat,
  "cherry": Cherry,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  "chevrons-left": ChevronsLeft,
  "chevrons-right": ChevronsRight,
  "church": Church,
  "cigarette": Cigarette,
  "cigarette-off": CigaretteOff,
  "circle": Circle,
  "circle-check": CircleCheck,
  "circle-dollar-sign": CircleDollarSign,
  "circle-dot": CircleDot,
  "circle-minus": CircleMinus,
  "circle-off": CircleOff,
  "circle-plus": CirclePlus,
  "circle-x": CircleX,
  "circuit-board": CircuitBoard,
  "citrus": Citrus,
  "clapperboard": Clapperboard,
  "clipboard": Clipboard,
  "clipboard-check": ClipboardCheck,
  "clipboard-copy": ClipboardCopy,
  "clipboard-list": ClipboardList,
  "clipboard-paste": ClipboardPaste,
  "clipboard-x": ClipboardX,
  "clock": Clock,
  "cloud": Cloud,
  "cloud-download": CloudDownload,
  "cloud-drizzle": CloudDrizzle,
  "cloud-fog": CloudFog,
  "cloud-hail": CloudHail,
  "cloud-lightning": CloudLightning,
  "cloud-moon": CloudMoon,
  "cloud-off": CloudOff,
  "cloud-rain": CloudRain,
  "cloud-snow": CloudSnow,
  "cloud-sun": CloudSun,
  "cloud-upload": CloudUpload,
  "club": Club,
  "code": Code,
  "coffee": Coffee,
  "cog": Cog,
  "columns": Columns2,
  "columns-2": Columns2,
  "columns-3": Columns3,
  "columns-4": Columns4,
  "combine": Combine,
  "compass": Compass,
  "component": Component,
  "construction": Construction,
  "contact": Contact,
  "contact-2": ContactRound,
  "contact-round": ContactRound,
  "container": Container,
  "contrast": Contrast,
  "cookie": Cookie,
  "cooking-pot": CookingPot,
  "copy": Copy,
  "cpu": Cpu,
  "credit-card": CreditCard,
  "crop": Crop,
  "cross": Cross,
  "crosshair": Crosshair,
  "crown": Crown,
  "database": Database,
  "diamond": Diamond,
  "disc": Disc,
  "disc-2": Disc2,
  "dna": Dna,
  "dog": Dog,
  "dollar-sign": DollarSign,
  "door-closed": DoorClosed,
  "door-open": DoorOpen,
  "download": Download,
  "download-cloud": CloudDownload,
  "drafting-compass": DraftingCompass,
  "droplet": Droplet,
  "droplets": Droplets,
  "ear": Ear,
  "ear-off": EarOff,
  "earth": Earth,
  "eclipse": Eclipse,
  "edit": SquarePen,
  "egg": Egg,
  "egg-fried": EggFried,
  "eraser": Eraser,
  "ethernet-port": EthernetPort,
  "euro": Euro,
  "ev-charger": EvCharger,
  "expand": Expand,
  "external-link": ExternalLink,
  "eye": Eye,
  "eye-closed": EyeClosed,
  "eye-off": EyeOff,
  "factory": Factory,
  "fan": Fan,
  "fence": Fence,
  "file": File,
  "file-audio": FileHeadphone,
  "file-box": FileBox,
  "file-check": FileCheck,
  "file-code": FileCode,
  "file-down": FileDown,
  "file-image": FileImage,
  "file-input": FileInput,
  "file-json": FileBraces,
  "file-minus": FileMinus,
  "file-output": FileOutput,
  "file-pen": FilePen,
  "file-plus": FilePlus,
  "file-question": FileQuestionMark,
  "file-search": FileSearch,
  "file-signature": FilePenLine,
  "file-sliders": FileSliders,
  "file-spreadsheet": FileSpreadsheet,
  "file-stack": FileStack,
  "file-symlink": FileSymlink,
  "file-text": FileText,
  "file-type": FileType,
  "file-type-2": FileTypeCorner,
  "file-up": FileUp,
  "file-user": FileUser,
  "file-video": FilePlay,
  "file-volume": FileVolume,
  "file-warning": FileExclamationPoint,
  "file-x": FileX,
  "files": Files,
  "film": Film,
  "filter": Funnel,
  "fingerprint": FingerprintPattern,
  "fire-extinguisher": FireExtinguisher,
  "fish": Fish,
  "fish-off": FishOff,
  "flag": Flag,
  "flag-off": FlagOff,
  "flame": Flame,
  "flashlight": Flashlight,
  "flask-conical": FlaskConical,
  "flip-horizontal": SquareCenterlineDashedHorizontal,
  "flip-vertical": SquareCenterlineDashedVertical,
  "flower": Flower,
  "focus": Focus,
  "folder": Folder,
  "folder-archive": FolderArchive,
  "folder-check": FolderCheck,
  "folder-cog": FolderCog,
  "folder-dot": FolderDot,
  "folder-down": FolderDown,
  "folder-git": FolderGit,
  "folder-git-2": FolderGit2,
  "folder-heart": FolderHeart,
  "folder-input": FolderInput,
  "folder-kanban": FolderKanban,
  "folder-key": FolderKey,
  "folder-lock": FolderLock,
  "folder-minus": FolderMinus,
  "folder-open": FolderOpen,
  "folder-output": FolderOutput,
  "folder-pen": FolderPen,
  "folder-plus": FolderPlus,
  "folder-search": FolderSearch,
  "folder-sync": FolderSync,
  "folder-tree": FolderTree,
  "folder-up": FolderUp,
  "folder-x": FolderX,
  "footprints": Footprints,
  "forklift": Forklift,
  "forward": Forward,
  "frown": FaceSlightlyFrowning,
  "fuel": Fuel,
  "fullscreen": Fullscreen,
  "gallery-horizontal": GalleryHorizontal,
  "gallery-thumbnails": GalleryThumbnails,
  "gallery-vertical": GalleryVertical,
  "gamepad": Gamepad,
  "gamepad-2": Gamepad2,
  "gavel": Gavel,
  "gem": Gem,
  "gift": Gift,
  "git-branch": GitBranch,
  "git-commit": GitCommitHorizontal,
  "git-fork": GitFork,
  "git-merge": GitMerge,
  "git-pull-request": GitPullRequest,
  "glass-water": GlassWater,
  "glasses": Glasses,
  "globe": Globe,
  "globe-2": Earth,
  "globe-lock": GlobeLock,
  "graduation-cap": GraduationCap,
  "grape": Grape,
  "grid-3x3": Grid3x3,
  "grip-vertical": GripVertical,
  "ham": Ham,
  "hammer": Hammer,
  "hand": Hand,
  "hand-coins": HandCoins,
  "hand-heart": HandHeart,
  "hand-helping": HandHelping,
  "hand-metal": HandMetal,
  "hand-platter": HandPlatter,
  "handshake": Handshake,
  "hard-drive": HardDrive,
  "hard-drive-download": HardDriveDownload,
  "hard-drive-upload": HardDriveUpload,
  "hard-hat": HardHat,
  "hash": Hash,
  "heading": Heading,
  "headphones": Headphones,
  "heart": Heart,
  "heart-handshake": HeartHandshake,
  "heart-pulse": HeartPulse,
  "heater": Heater,
  "helicopter": Helicopter,
  "help-circle": CircleQuestionMark,
  "hexagon": Hexagon,
  "highlighter": Highlighter,
  "history": RotateCcwClock,
  "home": House,
  "hospital": Hospital,
  "hotel": Hotel,
  "hourglass": Hourglass,
  "house": House,
  "house-heart": HouseHeart,
  "house-plug": HousePlug,
  "house-plus": HousePlus,
  "house-wifi": HouseWifi,
  "ice-cream-bowl": IceCreamBowl,
  "ice-cream-cone": IceCreamCone,
  "id-card": IdCard,
  "image": Image,
  "image-down": ImageDown,
  "image-minus": ImageMinus,
  "image-off": ImageOff,
  "image-play": ImagePlay,
  "image-plus": ImagePlus,
  "image-up": ImageUp,
  "images": Images,
  "inbox": Inbox,
  "infinity": Infinity,
  "info": Info,
  "italic": Italic,
  "joystick": Joystick,
  "kanban": Kanban,
  "key": Key,
  "key-round": KeyRound,
  "key-square": KeySquare,
  "keyboard": Keyboard,
  "lamp": Lamp,
  "landmark": Landmark,
  "languages": Languages,
  "laptop": Laptop,
  "laugh": FaceGrinning,
  "layers": Layers,
  "layout-dashboard": LayoutDashboard,
  "layout-grid": LayoutGrid,
  "layout-list": LayoutList,
  "layout-panel-left": LayoutPanelLeft,
  "layout-panel-top": LayoutPanelTop,
  "layout-template": LayoutTemplate,
  "leaf": Leaf,
  "library": Library,
  "library-big": LibraryBig,
  "life-buoy": LifeBuoy,
  "lightbulb": Lightbulb,
  "line-chart": ChartLine,
  "link": Link,
  "link-2": Link2,
  "list": List,
  "list-checks": ListChecks,
  "list-collapse": ListCollapse,
  "list-end": ListEnd,
  "list-filter": ListFilter,
  "list-minus": ListMinus,
  "list-ordered": ListOrdered,
  "list-plus": ListPlus,
  "list-restart": ListRestart,
  "list-start": ListStart,
  "list-todo": ListTodo,
  "list-tree": ListTree,
  "list-x": ListX,
  "loader-2": LoaderCircle,
  "locate": Locate,
  "locate-fixed": LocateFixed,
  "locate-off": LocateOff,
  "lock": Lock,
  "lock-keyhole": LockKeyhole,
  "lock-open": LockOpen,
  "log-in": LogIn,
  "log-out": LogOut,
  "lollipop": Lollipop,
  "magnet": Magnet,
  "mail": Mail,
  "mail-check": MailCheck,
  "mail-minus": MailMinus,
  "mail-open": MailOpen,
  "mail-plus": MailPlus,
  "mail-question": MailQuestionMark,
  "mail-warning": MailWarning,
  "mail-x": MailX,
  "map": Map,
  "map-pin": MapPin,
  "map-pin-off": MapPinOff,
  "map-pinned": MapPinned,
  "maximize": Maximize,
  "maximize-2": Maximize2,
  "medal": Medal,
  "megaphone": Megaphone,
  "meh": FaceNeutral,
  "menu": Menu,
  "merge": Merge,
  "message-circle": MessageCircle,
  "message-square": MessageSquare,
  "messages-square": MessagesSquare,
  "mic": Mic,
  "mic-2": MicVocal,
  "mic-off": MicOff,
  "microscope": Microscope,
  "microwave": Microwave,
  "milestone": Milestone,
  "milk": Milk,
  "minimize": Minimize,
  "minimize-2": Minimize2,
  "minus": Minus,
  "monitor": Monitor,
  "monitor-play": MonitorPlay,
  "monitor-smartphone": MonitorSmartphone,
  "monitor-speaker": MonitorSpeaker,
  "moon": Moon,
  "moon-star": MoonStar,
  "more-horizontal": Ellipsis,
  "more-vertical": EllipsisVertical,
  "mountain": Mountain,
  "mouse": Mouse,
  "mouse-pointer": MousePointer,
  "mouse-pointer-2": MousePointer2,
  "move": Move,
  "move-3d": Move3d,
  "music": Music,
  "music-2": Music2,
  "music-3": Music3,
  "music-4": Music4,
  "navigation": Navigation,
  "navigation-off": NavigationOff,
  "network": Network,
  "newspaper": Newspaper,
  "nfc": Nfc,
  "notebook": Notebook,
  "notebook-pen": NotebookPen,
  "notebook-tabs": NotebookTabs,
  "notebook-text": NotebookText,
  "notepad-text": NotepadText,
  "nut": Nut,
  "octagon": Octagon,
  "octagon-alert": OctagonAlert,
  "orbit": Orbit,
  "package": Package,
  "package-2": Package2,
  "package-check": PackageCheck,
  "package-minus": PackageMinus,
  "package-open": PackageOpen,
  "package-plus": PackagePlus,
  "package-search": PackageSearch,
  "package-x": PackageX,
  "paintbrush": Paintbrush,
  "palette": Palette,
  "panel-bottom": PanelBottom,
  "panel-left": PanelLeft,
  "panel-left-close": PanelLeftClose,
  "panel-left-open": PanelLeftOpen,
  "panel-right": PanelRight,
  "panel-top": PanelTop,
  "paperclip": Paperclip,
  "parking-meter": ParkingMeter,
  "pause": Pause,
  "paw-print": PawPrint,
  "pen-line": PenLine,
  "pen-tool": PenTool,
  "pencil": Pencil,
  "pencil-line": PencilLine,
  "pencil-ruler": PencilRuler,
  "pentagon": Pentagon,
  "percent": Percent,
  "phone": Phone,
  "phone-call": PhoneCall,
  "phone-forwarded": PhoneForwarded,
  "phone-incoming": PhoneIncoming,
  "phone-missed": PhoneMissed,
  "phone-off": PhoneOff,
  "phone-outgoing": PhoneOutgoing,
  "pi": Pi,
  "pickaxe": Pickaxe,
  "picture-in-picture": PictureInPicture,
  "picture-in-picture-2": PictureInPicture2,
  "pie-chart": ChartPie,
  "piggy-bank": PiggyBank,
  "pilcrow": Pilcrow,
  "pill": Pill,
  "pill-bottle": PillBottle,
  "pin": Pin,
  "pin-off": PinOff,
  "pizza": Pizza,
  "plane": Plane,
  "plane-landing": PlaneLanding,
  "plane-takeoff": PlaneTakeoff,
  "play": Play,
  "plug": Plug,
  "plug-zap": PlugZap,
  "plus": Plus,
  "popcorn": Popcorn,
  "power": Power,
  "presentation": Presentation,
  "printer": Printer,
  "projector": Projector,
  "puzzle": Puzzle,
  "qr-code": QrCode,
  "quote": Quote,
  "rabbit": Rabbit,
  "radar": Radar,
  "radio": Radio,
  "radio-tower": RadioTower,
  "rat": Rat,
  "ratio": Ratio,
  "receipt": Receipt,
  "receipt-cent": ReceiptCent,
  "receipt-text": ReceiptText,
  "recycle": Recycle,
  "redo": Redo,
  "refresh-ccw": RefreshCcw,
  "refresh-cw": RefreshCw,
  "refresh-cw-off": RefreshCwOff,
  "refrigerator": Refrigerator,
  "remove-formatting": RemoveFormatting,
  "reply": Reply,
  "reply-all": ReplyAll,
  "rocket": Rocket,
  "rocking-chair": RockingChair,
  "rotate-3d": Rotate3d,
  "rotate-ccw": RotateCcw,
  "route": Route,
  "route-off": RouteOff,
  "router": Router,
  "rows": Rows2,
  "rows-2": Rows2,
  "rows-3": Rows3,
  "rows-4": Rows4,
  "rss": Rss,
  "ruler": Ruler,
  "sailboat": Sailboat,
  "salad": Salad,
  "sandwich": Sandwich,
  "satellite": Satellite,
  "satellite-dish": SatelliteDish,
  "save": Save,
  "scale": Scale,
  "scan": Scan,
  "scan-barcode": ScanBarcode,
  "scan-eye": ScanEye,
  "scan-face": ScanFace,
  "scan-heart": ScanHeart,
  "scan-line": ScanLine,
  "scan-search": ScanSearch,
  "scan-text": ScanText,
  "school": School,
  "scissors": Scissors,
  "screen-share": ScreenShare,
  "screen-share-off": ScreenShareOff,
  "scroll": Scroll,
  "scroll-text": ScrollText,
  "search": Search,
  "send": Send,
  "send-horizontal": SendHorizontal,
  "server": Server,
  "server-cog": ServerCog,
  "server-crash": ServerCrash,
  "server-off": ServerOff,
  "settings": Settings,
  "shapes": Shapes,
  "share": Share,
  "share-2": Share2,
  "sheet": Sheet,
  "shell": Shell,
  "shield": Shield,
  "shield-alert": ShieldAlert,
  "shield-ban": ShieldBan,
  "shield-check": ShieldCheck,
  "shield-half": ShieldHalf,
  "shield-question": ShieldQuestionMark,
  "shield-x": ShieldX,
  "ship": Ship,
  "ship-wheel": ShipWheel,
  "shirt": Shirt,
  "shopping-bag": ShoppingBag,
  "shopping-basket": ShoppingBasket,
  "shopping-cart": ShoppingCart,
  "shovel": Shovel,
  "shower-head": ShowerHead,
  "shrink": Shrink,
  "sidebar": PanelLeft,
  "sigma": Sigma,
  "signal": Signal,
  "signal-high": SignalHigh,
  "signal-low": SignalLow,
  "signpost": Signpost,
  "signpost-big": SignpostBig,
  "siren": Siren,
  "skip-back": SkipBack,
  "skip-forward": SkipForward,
  "sliders-horizontal": SlidersHorizontal,
  "smartphone": Smartphone,
  "smile": FaceSlightlySmiling,
  "snail": Snail,
  "snowflake": Snowflake,
  "sort-asc": ArrowUpNarrowWide,
  "sort-desc": ArrowDownWideNarrow,
  "soup": Soup,
  "spade": Spade,
  "sparkle": Sparkle,
  "sparkles": Sparkles,
  "speaker": Speaker,
  "speech": Speech,
  "spell-check": SpellCheck,
  "split": Split,
  "sprout": Sprout,
  "square": Square,
  "square-arrow-out-down-left": SquareArrowOutDownLeft,
  "square-arrow-out-down-right": SquareArrowOutDownRight,
  "square-arrow-out-up-left": SquareArrowOutUpLeft,
  "square-arrow-out-up-right": SquareArrowOutUpRight,
  "square-check": SquareCheck,
  "square-kanban": SquareKanban,
  "square-minus": SquareMinus,
  "square-pen": SquarePen,
  "square-plus": SquarePlus,
  "square-x": SquareX,
  "squirrel": Squirrel,
  "stamp": Stamp,
  "star": Star,
  "stars": Sparkles,
  "stethoscope": Stethoscope,
  "sticky-note": StickyNote,
  "store": Store,
  "sun": Sun,
  "sunrise": Sunrise,
  "sunset": Sunset,
  "swords": Swords,
  "syringe": Syringe,
  "table": Table,
  "table-2": Table2,
  "table-properties": TableProperties,
  "tablet": Tablet,
  "tablet-smartphone": TabletSmartphone,
  "tag": Tag,
  "tags": Tags,
  "target": Target,
  "telescope": Telescope,
  "tent": Tent,
  "terminal": Terminal,
  "test-tube": TestTube,
  "text": TextAlignStart,
  "text-cursor": TextCursor,
  "text-search": TextSearch,
  "thermometer": Thermometer,
  "thermometer-snowflake": ThermometerSnowflake,
  "thermometer-sun": ThermometerSun,
  "thumbs-down": ThumbsDown,
  "thumbs-up": ThumbsUp,
  "ticket": Ticket,
  "ticket-check": TicketCheck,
  "ticket-minus": TicketMinus,
  "ticket-percent": TicketPercent,
  "ticket-plus": TicketPlus,
  "ticket-x": TicketX,
  "timer": Timer,
  "timer-off": TimerOff,
  "timer-reset": TimerReset,
  "toggle-left": ToggleLeft,
  "toggle-right": ToggleRight,
  "touchpad": Touchpad,
  "traffic-cone": TrafficCone,
  "train": TramFront,
  "train-front": TrainFront,
  "tram-front": TramFront,
  "trash": Trash,
  "tree-pine": TreePine,
  "trees": Trees,
  "triangle": Triangle,
  "triangle-alert": TriangleAlert,
  "trophy": Trophy,
  "truck": Truck,
  "turtle": Turtle,
  "tv": Tv,
  "type": Type,
  "umbrella": Umbrella,
  "underline": Underline,
  "undo": Undo,
  "university": University,
  "unlink": Unlink,
  "unlink-2": Unlink2,
  "unlock": LockOpen,
  "upload": Upload,
  "upload-cloud": CloudUpload,
  "usb": Usb,
  "user": User,
  "user-check": UserCheck,
  "user-cog": UserCog,
  "user-minus": UserMinus,
  "user-plus": UserPlus,
  "user-round": UserRound,
  "user-round-check": UserRoundCheck,
  "user-round-cog": UserRoundCog,
  "user-round-minus": UserRoundMinus,
  "user-round-plus": UserRoundPlus,
  "user-round-search": UserRoundSearch,
  "user-round-x": UserRoundX,
  "user-search": UserSearch,
  "user-x": UserX,
  "users": Users,
  "users-2": UsersRound,
  "users-round": UsersRound,
  "utensils": Utensils,
  "utensils-crossed": UtensilsCrossed,
  "variable": Variable,
  "verified": BadgeCheck,
  "video": Video,
  "video-off": VideoOff,
  "voicemail": Voicemail,
  "volume-2": Volume2,
  "volume-x": VolumeX,
  "wallet": Wallet,
  "wand-2": WandSparkles,
  "warehouse": Warehouse,
  "washing-machine": WashingMachine,
  "watch": Watch,
  "waypoints": Waypoints,
  "webcam": Webcam,
  "wheat": Wheat,
  "whole-word": WholeWord,
  "wifi": Wifi,
  "wind": Wind,
  "workflow": Workflow,
  "worm": Worm,
  "wrench": Wrench,
  "x": X,
  "x-circle": CircleX,
  "zap": Zap,
  "zap-off": ZapOff
};
export {
  iconRegistry
};
/*! Bundled license information:

@lucide/vue/dist/esm/shared/src/utils/isEmptyString.mjs:
@lucide/vue/dist/esm/shared/src/utils/mergeClasses.mjs:
@lucide/vue/dist/esm/shared/src/utils/toKebabCase.mjs:
@lucide/vue/dist/esm/shared/src/utils/toCamelCase.mjs:
@lucide/vue/dist/esm/shared/src/utils/toPascalCase.mjs:
@lucide/vue/dist/esm/defaultAttributes.mjs:
@lucide/vue/dist/esm/context.mjs:
@lucide/vue/dist/esm/Icon.mjs:
@lucide/vue/dist/esm/createLucideIcon.mjs:
@lucide/vue/dist/esm/icons/accessibility.mjs:
@lucide/vue/dist/esm/icons/activity.mjs:
@lucide/vue/dist/esm/icons/air-vent.mjs:
@lucide/vue/dist/esm/icons/airplay.mjs:
@lucide/vue/dist/esm/icons/alarm-clock.mjs:
@lucide/vue/dist/esm/icons/album.mjs:
@lucide/vue/dist/esm/icons/circle-alert.mjs:
@lucide/vue/dist/esm/icons/triangle-alert.mjs:
@lucide/vue/dist/esm/icons/text-align-center.mjs:
@lucide/vue/dist/esm/icons/text-align-start.mjs:
@lucide/vue/dist/esm/icons/text-align-end.mjs:
@lucide/vue/dist/esm/icons/ambulance.mjs:
@lucide/vue/dist/esm/icons/anchor.mjs:
@lucide/vue/dist/esm/icons/antenna.mjs:
@lucide/vue/dist/esm/icons/aperture.mjs:
@lucide/vue/dist/esm/icons/apple.mjs:
@lucide/vue/dist/esm/icons/archive.mjs:
@lucide/vue/dist/esm/icons/archive-restore.mjs:
@lucide/vue/dist/esm/icons/archive-x.mjs:
@lucide/vue/dist/esm/icons/chart-area.mjs:
@lucide/vue/dist/esm/icons/armchair.mjs:
@lucide/vue/dist/esm/icons/arrow-down.mjs:
@lucide/vue/dist/esm/icons/arrow-left.mjs:
@lucide/vue/dist/esm/icons/arrow-right.mjs:
@lucide/vue/dist/esm/icons/arrow-up.mjs:
@lucide/vue/dist/esm/icons/arrow-up-right.mjs:
@lucide/vue/dist/esm/icons/asterisk.mjs:
@lucide/vue/dist/esm/icons/at-sign.mjs:
@lucide/vue/dist/esm/icons/atom.mjs:
@lucide/vue/dist/esm/icons/award.mjs:
@lucide/vue/dist/esm/icons/axe.mjs:
@lucide/vue/dist/esm/icons/baby.mjs:
@lucide/vue/dist/esm/icons/badge.mjs:
@lucide/vue/dist/esm/icons/badge-alert.mjs:
@lucide/vue/dist/esm/icons/badge-cent.mjs:
@lucide/vue/dist/esm/icons/badge-check.mjs:
@lucide/vue/dist/esm/icons/badge-dollar-sign.mjs:
@lucide/vue/dist/esm/icons/badge-euro.mjs:
@lucide/vue/dist/esm/icons/badge-info.mjs:
@lucide/vue/dist/esm/icons/badge-minus.mjs:
@lucide/vue/dist/esm/icons/badge-plus.mjs:
@lucide/vue/dist/esm/icons/badge-x.mjs:
@lucide/vue/dist/esm/icons/ban.mjs:
@lucide/vue/dist/esm/icons/banana.mjs:
@lucide/vue/dist/esm/icons/banknote.mjs:
@lucide/vue/dist/esm/icons/chart-no-axes-column.mjs:
@lucide/vue/dist/esm/icons/chart-column.mjs:
@lucide/vue/dist/esm/icons/barcode.mjs:
@lucide/vue/dist/esm/icons/bath.mjs:
@lucide/vue/dist/esm/icons/battery.mjs:
@lucide/vue/dist/esm/icons/battery-charging.mjs:
@lucide/vue/dist/esm/icons/battery-full.mjs:
@lucide/vue/dist/esm/icons/battery-low.mjs:
@lucide/vue/dist/esm/icons/beaker.mjs:
@lucide/vue/dist/esm/icons/bed.mjs:
@lucide/vue/dist/esm/icons/bed-double.mjs:
@lucide/vue/dist/esm/icons/bed-single.mjs:
@lucide/vue/dist/esm/icons/beef.mjs:
@lucide/vue/dist/esm/icons/bell.mjs:
@lucide/vue/dist/esm/icons/bell-minus.mjs:
@lucide/vue/dist/esm/icons/bell-off.mjs:
@lucide/vue/dist/esm/icons/bell-plus.mjs:
@lucide/vue/dist/esm/icons/bell-ring.mjs:
@lucide/vue/dist/esm/icons/bike.mjs:
@lucide/vue/dist/esm/icons/binary.mjs:
@lucide/vue/dist/esm/icons/bird.mjs:
@lucide/vue/dist/esm/icons/blocks.mjs:
@lucide/vue/dist/esm/icons/bluetooth.mjs:
@lucide/vue/dist/esm/icons/bold.mjs:
@lucide/vue/dist/esm/icons/bolt.mjs:
@lucide/vue/dist/esm/icons/bone.mjs:
@lucide/vue/dist/esm/icons/book.mjs:
@lucide/vue/dist/esm/icons/book-check.mjs:
@lucide/vue/dist/esm/icons/book-copy.mjs:
@lucide/vue/dist/esm/icons/book-marked.mjs:
@lucide/vue/dist/esm/icons/book-minus.mjs:
@lucide/vue/dist/esm/icons/book-open.mjs:
@lucide/vue/dist/esm/icons/book-open-check.mjs:
@lucide/vue/dist/esm/icons/book-open-text.mjs:
@lucide/vue/dist/esm/icons/book-plus.mjs:
@lucide/vue/dist/esm/icons/book-text.mjs:
@lucide/vue/dist/esm/icons/book-user.mjs:
@lucide/vue/dist/esm/icons/book-x.mjs:
@lucide/vue/dist/esm/icons/bookmark.mjs:
@lucide/vue/dist/esm/icons/bookmark-minus.mjs:
@lucide/vue/dist/esm/icons/bookmark-plus.mjs:
@lucide/vue/dist/esm/icons/bookmark-x.mjs:
@lucide/vue/dist/esm/icons/bot.mjs:
@lucide/vue/dist/esm/icons/box.mjs:
@lucide/vue/dist/esm/icons/boxes.mjs:
@lucide/vue/dist/esm/icons/brain.mjs:
@lucide/vue/dist/esm/icons/brain-circuit.mjs:
@lucide/vue/dist/esm/icons/brain-cog.mjs:
@lucide/vue/dist/esm/icons/brick-wall.mjs:
@lucide/vue/dist/esm/icons/briefcase.mjs:
@lucide/vue/dist/esm/icons/brush.mjs:
@lucide/vue/dist/esm/icons/brush-cleaning.mjs:
@lucide/vue/dist/esm/icons/bug.mjs:
@lucide/vue/dist/esm/icons/bug-off.mjs:
@lucide/vue/dist/esm/icons/bug-play.mjs:
@lucide/vue/dist/esm/icons/building.mjs:
@lucide/vue/dist/esm/icons/building-2.mjs:
@lucide/vue/dist/esm/icons/bus.mjs:
@lucide/vue/dist/esm/icons/bus-front.mjs:
@lucide/vue/dist/esm/icons/cake.mjs:
@lucide/vue/dist/esm/icons/cake-slice.mjs:
@lucide/vue/dist/esm/icons/calendar.mjs:
@lucide/vue/dist/esm/icons/calendar-check.mjs:
@lucide/vue/dist/esm/icons/calendar-clock.mjs:
@lucide/vue/dist/esm/icons/calendar-days.mjs:
@lucide/vue/dist/esm/icons/calendar-heart.mjs:
@lucide/vue/dist/esm/icons/calendar-minus.mjs:
@lucide/vue/dist/esm/icons/calendar-plus.mjs:
@lucide/vue/dist/esm/icons/calendar-range.mjs:
@lucide/vue/dist/esm/icons/calendar-search.mjs:
@lucide/vue/dist/esm/icons/calendar-x.mjs:
@lucide/vue/dist/esm/icons/camera.mjs:
@lucide/vue/dist/esm/icons/candy.mjs:
@lucide/vue/dist/esm/icons/candy-cane.mjs:
@lucide/vue/dist/esm/icons/car.mjs:
@lucide/vue/dist/esm/icons/car-front.mjs:
@lucide/vue/dist/esm/icons/car-taxi-front.mjs:
@lucide/vue/dist/esm/icons/carrot.mjs:
@lucide/vue/dist/esm/icons/case-lower.mjs:
@lucide/vue/dist/esm/icons/case-sensitive.mjs:
@lucide/vue/dist/esm/icons/case-upper.mjs:
@lucide/vue/dist/esm/icons/cast.mjs:
@lucide/vue/dist/esm/icons/castle.mjs:
@lucide/vue/dist/esm/icons/cat.mjs:
@lucide/vue/dist/esm/icons/check.mjs:
@lucide/vue/dist/esm/icons/circle-check-big.mjs:
@lucide/vue/dist/esm/icons/chef-hat.mjs:
@lucide/vue/dist/esm/icons/cherry.mjs:
@lucide/vue/dist/esm/icons/chevron-down.mjs:
@lucide/vue/dist/esm/icons/chevron-left.mjs:
@lucide/vue/dist/esm/icons/chevron-right.mjs:
@lucide/vue/dist/esm/icons/chevron-up.mjs:
@lucide/vue/dist/esm/icons/chevrons-left.mjs:
@lucide/vue/dist/esm/icons/chevrons-right.mjs:
@lucide/vue/dist/esm/icons/church.mjs:
@lucide/vue/dist/esm/icons/cigarette.mjs:
@lucide/vue/dist/esm/icons/cigarette-off.mjs:
@lucide/vue/dist/esm/icons/circle.mjs:
@lucide/vue/dist/esm/icons/circle-check.mjs:
@lucide/vue/dist/esm/icons/circle-dollar-sign.mjs:
@lucide/vue/dist/esm/icons/circle-dot.mjs:
@lucide/vue/dist/esm/icons/circle-minus.mjs:
@lucide/vue/dist/esm/icons/circle-off.mjs:
@lucide/vue/dist/esm/icons/circle-plus.mjs:
@lucide/vue/dist/esm/icons/circle-x.mjs:
@lucide/vue/dist/esm/icons/circuit-board.mjs:
@lucide/vue/dist/esm/icons/citrus.mjs:
@lucide/vue/dist/esm/icons/clapperboard.mjs:
@lucide/vue/dist/esm/icons/clipboard.mjs:
@lucide/vue/dist/esm/icons/clipboard-check.mjs:
@lucide/vue/dist/esm/icons/clipboard-copy.mjs:
@lucide/vue/dist/esm/icons/clipboard-list.mjs:
@lucide/vue/dist/esm/icons/clipboard-paste.mjs:
@lucide/vue/dist/esm/icons/clipboard-x.mjs:
@lucide/vue/dist/esm/icons/clock.mjs:
@lucide/vue/dist/esm/icons/cloud.mjs:
@lucide/vue/dist/esm/icons/cloud-download.mjs:
@lucide/vue/dist/esm/icons/cloud-drizzle.mjs:
@lucide/vue/dist/esm/icons/cloud-fog.mjs:
@lucide/vue/dist/esm/icons/cloud-hail.mjs:
@lucide/vue/dist/esm/icons/cloud-lightning.mjs:
@lucide/vue/dist/esm/icons/cloud-moon.mjs:
@lucide/vue/dist/esm/icons/cloud-off.mjs:
@lucide/vue/dist/esm/icons/cloud-rain.mjs:
@lucide/vue/dist/esm/icons/cloud-snow.mjs:
@lucide/vue/dist/esm/icons/cloud-sun.mjs:
@lucide/vue/dist/esm/icons/cloud-upload.mjs:
@lucide/vue/dist/esm/icons/club.mjs:
@lucide/vue/dist/esm/icons/code.mjs:
@lucide/vue/dist/esm/icons/coffee.mjs:
@lucide/vue/dist/esm/icons/cog.mjs:
@lucide/vue/dist/esm/icons/columns-2.mjs:
@lucide/vue/dist/esm/icons/columns-3.mjs:
@lucide/vue/dist/esm/icons/columns-4.mjs:
@lucide/vue/dist/esm/icons/combine.mjs:
@lucide/vue/dist/esm/icons/compass.mjs:
@lucide/vue/dist/esm/icons/component.mjs:
@lucide/vue/dist/esm/icons/construction.mjs:
@lucide/vue/dist/esm/icons/contact.mjs:
@lucide/vue/dist/esm/icons/contact-round.mjs:
@lucide/vue/dist/esm/icons/container.mjs:
@lucide/vue/dist/esm/icons/contrast.mjs:
@lucide/vue/dist/esm/icons/cookie.mjs:
@lucide/vue/dist/esm/icons/cooking-pot.mjs:
@lucide/vue/dist/esm/icons/copy.mjs:
@lucide/vue/dist/esm/icons/cpu.mjs:
@lucide/vue/dist/esm/icons/credit-card.mjs:
@lucide/vue/dist/esm/icons/crop.mjs:
@lucide/vue/dist/esm/icons/cross.mjs:
@lucide/vue/dist/esm/icons/crosshair.mjs:
@lucide/vue/dist/esm/icons/crown.mjs:
@lucide/vue/dist/esm/icons/database.mjs:
@lucide/vue/dist/esm/icons/diamond.mjs:
@lucide/vue/dist/esm/icons/disc.mjs:
@lucide/vue/dist/esm/icons/disc-2.mjs:
@lucide/vue/dist/esm/icons/dna.mjs:
@lucide/vue/dist/esm/icons/dog.mjs:
@lucide/vue/dist/esm/icons/dollar-sign.mjs:
@lucide/vue/dist/esm/icons/door-closed.mjs:
@lucide/vue/dist/esm/icons/door-open.mjs:
@lucide/vue/dist/esm/icons/download.mjs:
@lucide/vue/dist/esm/icons/drafting-compass.mjs:
@lucide/vue/dist/esm/icons/droplet.mjs:
@lucide/vue/dist/esm/icons/droplets.mjs:
@lucide/vue/dist/esm/icons/ear.mjs:
@lucide/vue/dist/esm/icons/ear-off.mjs:
@lucide/vue/dist/esm/icons/earth.mjs:
@lucide/vue/dist/esm/icons/eclipse.mjs:
@lucide/vue/dist/esm/icons/square-pen.mjs:
@lucide/vue/dist/esm/icons/egg.mjs:
@lucide/vue/dist/esm/icons/egg-fried.mjs:
@lucide/vue/dist/esm/icons/eraser.mjs:
@lucide/vue/dist/esm/icons/ethernet-port.mjs:
@lucide/vue/dist/esm/icons/euro.mjs:
@lucide/vue/dist/esm/icons/ev-charger.mjs:
@lucide/vue/dist/esm/icons/expand.mjs:
@lucide/vue/dist/esm/icons/external-link.mjs:
@lucide/vue/dist/esm/icons/eye.mjs:
@lucide/vue/dist/esm/icons/eye-closed.mjs:
@lucide/vue/dist/esm/icons/eye-off.mjs:
@lucide/vue/dist/esm/icons/factory.mjs:
@lucide/vue/dist/esm/icons/fan.mjs:
@lucide/vue/dist/esm/icons/fence.mjs:
@lucide/vue/dist/esm/icons/file.mjs:
@lucide/vue/dist/esm/icons/file-headphone.mjs:
@lucide/vue/dist/esm/icons/file-box.mjs:
@lucide/vue/dist/esm/icons/file-check.mjs:
@lucide/vue/dist/esm/icons/file-code.mjs:
@lucide/vue/dist/esm/icons/file-down.mjs:
@lucide/vue/dist/esm/icons/file-image.mjs:
@lucide/vue/dist/esm/icons/file-input.mjs:
@lucide/vue/dist/esm/icons/file-braces.mjs:
@lucide/vue/dist/esm/icons/file-minus.mjs:
@lucide/vue/dist/esm/icons/file-output.mjs:
@lucide/vue/dist/esm/icons/file-pen.mjs:
@lucide/vue/dist/esm/icons/file-plus.mjs:
@lucide/vue/dist/esm/icons/file-question-mark.mjs:
@lucide/vue/dist/esm/icons/file-search.mjs:
@lucide/vue/dist/esm/icons/file-pen-line.mjs:
@lucide/vue/dist/esm/icons/file-sliders.mjs:
@lucide/vue/dist/esm/icons/file-spreadsheet.mjs:
@lucide/vue/dist/esm/icons/file-stack.mjs:
@lucide/vue/dist/esm/icons/file-symlink.mjs:
@lucide/vue/dist/esm/icons/file-text.mjs:
@lucide/vue/dist/esm/icons/file-type.mjs:
@lucide/vue/dist/esm/icons/file-type-corner.mjs:
@lucide/vue/dist/esm/icons/file-up.mjs:
@lucide/vue/dist/esm/icons/file-user.mjs:
@lucide/vue/dist/esm/icons/file-play.mjs:
@lucide/vue/dist/esm/icons/file-volume.mjs:
@lucide/vue/dist/esm/icons/file-exclamation-point.mjs:
@lucide/vue/dist/esm/icons/file-x.mjs:
@lucide/vue/dist/esm/icons/files.mjs:
@lucide/vue/dist/esm/icons/film.mjs:
@lucide/vue/dist/esm/icons/funnel.mjs:
@lucide/vue/dist/esm/icons/fingerprint-pattern.mjs:
@lucide/vue/dist/esm/icons/fire-extinguisher.mjs:
@lucide/vue/dist/esm/icons/fish.mjs:
@lucide/vue/dist/esm/icons/fish-off.mjs:
@lucide/vue/dist/esm/icons/flag.mjs:
@lucide/vue/dist/esm/icons/flag-off.mjs:
@lucide/vue/dist/esm/icons/flame.mjs:
@lucide/vue/dist/esm/icons/flashlight.mjs:
@lucide/vue/dist/esm/icons/flask-conical.mjs:
@lucide/vue/dist/esm/icons/square-centerline-dashed-horizontal.mjs:
@lucide/vue/dist/esm/icons/square-centerline-dashed-vertical.mjs:
@lucide/vue/dist/esm/icons/flower.mjs:
@lucide/vue/dist/esm/icons/focus.mjs:
@lucide/vue/dist/esm/icons/folder.mjs:
@lucide/vue/dist/esm/icons/folder-archive.mjs:
@lucide/vue/dist/esm/icons/folder-check.mjs:
@lucide/vue/dist/esm/icons/folder-cog.mjs:
@lucide/vue/dist/esm/icons/folder-dot.mjs:
@lucide/vue/dist/esm/icons/folder-down.mjs:
@lucide/vue/dist/esm/icons/folder-git.mjs:
@lucide/vue/dist/esm/icons/folder-git-2.mjs:
@lucide/vue/dist/esm/icons/folder-heart.mjs:
@lucide/vue/dist/esm/icons/folder-input.mjs:
@lucide/vue/dist/esm/icons/folder-kanban.mjs:
@lucide/vue/dist/esm/icons/folder-key.mjs:
@lucide/vue/dist/esm/icons/folder-lock.mjs:
@lucide/vue/dist/esm/icons/folder-minus.mjs:
@lucide/vue/dist/esm/icons/folder-open.mjs:
@lucide/vue/dist/esm/icons/folder-output.mjs:
@lucide/vue/dist/esm/icons/folder-pen.mjs:
@lucide/vue/dist/esm/icons/folder-plus.mjs:
@lucide/vue/dist/esm/icons/folder-search.mjs:
@lucide/vue/dist/esm/icons/folder-sync.mjs:
@lucide/vue/dist/esm/icons/folder-tree.mjs:
@lucide/vue/dist/esm/icons/folder-up.mjs:
@lucide/vue/dist/esm/icons/folder-x.mjs:
@lucide/vue/dist/esm/icons/footprints.mjs:
@lucide/vue/dist/esm/icons/forklift.mjs:
@lucide/vue/dist/esm/icons/forward.mjs:
@lucide/vue/dist/esm/icons/face-slightly-frowning.mjs:
@lucide/vue/dist/esm/icons/fuel.mjs:
@lucide/vue/dist/esm/icons/fullscreen.mjs:
@lucide/vue/dist/esm/icons/gallery-horizontal.mjs:
@lucide/vue/dist/esm/icons/gallery-thumbnails.mjs:
@lucide/vue/dist/esm/icons/gallery-vertical.mjs:
@lucide/vue/dist/esm/icons/gamepad.mjs:
@lucide/vue/dist/esm/icons/gamepad-2.mjs:
@lucide/vue/dist/esm/icons/gavel.mjs:
@lucide/vue/dist/esm/icons/gem.mjs:
@lucide/vue/dist/esm/icons/gift.mjs:
@lucide/vue/dist/esm/icons/git-branch.mjs:
@lucide/vue/dist/esm/icons/git-commit-horizontal.mjs:
@lucide/vue/dist/esm/icons/git-fork.mjs:
@lucide/vue/dist/esm/icons/git-merge.mjs:
@lucide/vue/dist/esm/icons/git-pull-request.mjs:
@lucide/vue/dist/esm/icons/glass-water.mjs:
@lucide/vue/dist/esm/icons/glasses.mjs:
@lucide/vue/dist/esm/icons/globe.mjs:
@lucide/vue/dist/esm/icons/globe-lock.mjs:
@lucide/vue/dist/esm/icons/graduation-cap.mjs:
@lucide/vue/dist/esm/icons/grape.mjs:
@lucide/vue/dist/esm/icons/grid-3x3.mjs:
@lucide/vue/dist/esm/icons/grip-vertical.mjs:
@lucide/vue/dist/esm/icons/ham.mjs:
@lucide/vue/dist/esm/icons/hammer.mjs:
@lucide/vue/dist/esm/icons/hand.mjs:
@lucide/vue/dist/esm/icons/hand-coins.mjs:
@lucide/vue/dist/esm/icons/hand-heart.mjs:
@lucide/vue/dist/esm/icons/hand-helping.mjs:
@lucide/vue/dist/esm/icons/hand-metal.mjs:
@lucide/vue/dist/esm/icons/hand-platter.mjs:
@lucide/vue/dist/esm/icons/handshake.mjs:
@lucide/vue/dist/esm/icons/hard-drive.mjs:
@lucide/vue/dist/esm/icons/hard-drive-download.mjs:
@lucide/vue/dist/esm/icons/hard-drive-upload.mjs:
@lucide/vue/dist/esm/icons/hard-hat.mjs:
@lucide/vue/dist/esm/icons/hash.mjs:
@lucide/vue/dist/esm/icons/heading.mjs:
@lucide/vue/dist/esm/icons/headphones.mjs:
@lucide/vue/dist/esm/icons/heart.mjs:
@lucide/vue/dist/esm/icons/heart-handshake.mjs:
@lucide/vue/dist/esm/icons/heart-pulse.mjs:
@lucide/vue/dist/esm/icons/heater.mjs:
@lucide/vue/dist/esm/icons/helicopter.mjs:
@lucide/vue/dist/esm/icons/circle-question-mark.mjs:
@lucide/vue/dist/esm/icons/hexagon.mjs:
@lucide/vue/dist/esm/icons/highlighter.mjs:
@lucide/vue/dist/esm/icons/rotate-ccw-clock.mjs:
@lucide/vue/dist/esm/icons/house.mjs:
@lucide/vue/dist/esm/icons/hospital.mjs:
@lucide/vue/dist/esm/icons/hotel.mjs:
@lucide/vue/dist/esm/icons/hourglass.mjs:
@lucide/vue/dist/esm/icons/house-heart.mjs:
@lucide/vue/dist/esm/icons/house-plug.mjs:
@lucide/vue/dist/esm/icons/house-plus.mjs:
@lucide/vue/dist/esm/icons/house-wifi.mjs:
@lucide/vue/dist/esm/icons/ice-cream-bowl.mjs:
@lucide/vue/dist/esm/icons/ice-cream-cone.mjs:
@lucide/vue/dist/esm/icons/id-card.mjs:
@lucide/vue/dist/esm/icons/image.mjs:
@lucide/vue/dist/esm/icons/image-down.mjs:
@lucide/vue/dist/esm/icons/image-minus.mjs:
@lucide/vue/dist/esm/icons/image-off.mjs:
@lucide/vue/dist/esm/icons/image-play.mjs:
@lucide/vue/dist/esm/icons/image-plus.mjs:
@lucide/vue/dist/esm/icons/image-up.mjs:
@lucide/vue/dist/esm/icons/images.mjs:
@lucide/vue/dist/esm/icons/inbox.mjs:
@lucide/vue/dist/esm/icons/infinity.mjs:
@lucide/vue/dist/esm/icons/info.mjs:
@lucide/vue/dist/esm/icons/italic.mjs:
@lucide/vue/dist/esm/icons/joystick.mjs:
@lucide/vue/dist/esm/icons/kanban.mjs:
@lucide/vue/dist/esm/icons/key.mjs:
@lucide/vue/dist/esm/icons/key-round.mjs:
@lucide/vue/dist/esm/icons/key-square.mjs:
@lucide/vue/dist/esm/icons/keyboard.mjs:
@lucide/vue/dist/esm/icons/lamp.mjs:
@lucide/vue/dist/esm/icons/landmark.mjs:
@lucide/vue/dist/esm/icons/languages.mjs:
@lucide/vue/dist/esm/icons/laptop.mjs:
@lucide/vue/dist/esm/icons/face-grinning.mjs:
@lucide/vue/dist/esm/icons/layers.mjs:
@lucide/vue/dist/esm/icons/layout-dashboard.mjs:
@lucide/vue/dist/esm/icons/layout-grid.mjs:
@lucide/vue/dist/esm/icons/layout-list.mjs:
@lucide/vue/dist/esm/icons/layout-panel-left.mjs:
@lucide/vue/dist/esm/icons/layout-panel-top.mjs:
@lucide/vue/dist/esm/icons/layout-template.mjs:
@lucide/vue/dist/esm/icons/leaf.mjs:
@lucide/vue/dist/esm/icons/library.mjs:
@lucide/vue/dist/esm/icons/library-big.mjs:
@lucide/vue/dist/esm/icons/life-buoy.mjs:
@lucide/vue/dist/esm/icons/lightbulb.mjs:
@lucide/vue/dist/esm/icons/chart-line.mjs:
@lucide/vue/dist/esm/icons/link.mjs:
@lucide/vue/dist/esm/icons/link-2.mjs:
@lucide/vue/dist/esm/icons/list.mjs:
@lucide/vue/dist/esm/icons/list-checks.mjs:
@lucide/vue/dist/esm/icons/list-collapse.mjs:
@lucide/vue/dist/esm/icons/list-end.mjs:
@lucide/vue/dist/esm/icons/list-filter.mjs:
@lucide/vue/dist/esm/icons/list-minus.mjs:
@lucide/vue/dist/esm/icons/list-ordered.mjs:
@lucide/vue/dist/esm/icons/list-plus.mjs:
@lucide/vue/dist/esm/icons/list-restart.mjs:
@lucide/vue/dist/esm/icons/list-start.mjs:
@lucide/vue/dist/esm/icons/list-todo.mjs:
@lucide/vue/dist/esm/icons/list-tree.mjs:
@lucide/vue/dist/esm/icons/list-x.mjs:
@lucide/vue/dist/esm/icons/loader-circle.mjs:
@lucide/vue/dist/esm/icons/locate.mjs:
@lucide/vue/dist/esm/icons/locate-fixed.mjs:
@lucide/vue/dist/esm/icons/locate-off.mjs:
@lucide/vue/dist/esm/icons/lock.mjs:
@lucide/vue/dist/esm/icons/lock-keyhole.mjs:
@lucide/vue/dist/esm/icons/lock-open.mjs:
@lucide/vue/dist/esm/icons/log-in.mjs:
@lucide/vue/dist/esm/icons/log-out.mjs:
@lucide/vue/dist/esm/icons/lollipop.mjs:
@lucide/vue/dist/esm/icons/magnet.mjs:
@lucide/vue/dist/esm/icons/mail.mjs:
@lucide/vue/dist/esm/icons/mail-check.mjs:
@lucide/vue/dist/esm/icons/mail-minus.mjs:
@lucide/vue/dist/esm/icons/mail-open.mjs:
@lucide/vue/dist/esm/icons/mail-plus.mjs:
@lucide/vue/dist/esm/icons/mail-question-mark.mjs:
@lucide/vue/dist/esm/icons/mail-warning.mjs:
@lucide/vue/dist/esm/icons/mail-x.mjs:
@lucide/vue/dist/esm/icons/map.mjs:
@lucide/vue/dist/esm/icons/map-pin.mjs:
@lucide/vue/dist/esm/icons/map-pin-off.mjs:
@lucide/vue/dist/esm/icons/map-pinned.mjs:
@lucide/vue/dist/esm/icons/maximize.mjs:
@lucide/vue/dist/esm/icons/maximize-2.mjs:
@lucide/vue/dist/esm/icons/medal.mjs:
@lucide/vue/dist/esm/icons/megaphone.mjs:
@lucide/vue/dist/esm/icons/face-neutral.mjs:
@lucide/vue/dist/esm/icons/menu.mjs:
@lucide/vue/dist/esm/icons/merge.mjs:
@lucide/vue/dist/esm/icons/message-circle.mjs:
@lucide/vue/dist/esm/icons/message-square.mjs:
@lucide/vue/dist/esm/icons/messages-square.mjs:
@lucide/vue/dist/esm/icons/mic.mjs:
@lucide/vue/dist/esm/icons/mic-vocal.mjs:
@lucide/vue/dist/esm/icons/mic-off.mjs:
@lucide/vue/dist/esm/icons/microscope.mjs:
@lucide/vue/dist/esm/icons/microwave.mjs:
@lucide/vue/dist/esm/icons/milestone.mjs:
@lucide/vue/dist/esm/icons/milk.mjs:
@lucide/vue/dist/esm/icons/minimize.mjs:
@lucide/vue/dist/esm/icons/minimize-2.mjs:
@lucide/vue/dist/esm/icons/minus.mjs:
@lucide/vue/dist/esm/icons/monitor.mjs:
@lucide/vue/dist/esm/icons/monitor-play.mjs:
@lucide/vue/dist/esm/icons/monitor-smartphone.mjs:
@lucide/vue/dist/esm/icons/monitor-speaker.mjs:
@lucide/vue/dist/esm/icons/moon.mjs:
@lucide/vue/dist/esm/icons/moon-star.mjs:
@lucide/vue/dist/esm/icons/ellipsis.mjs:
@lucide/vue/dist/esm/icons/ellipsis-vertical.mjs:
@lucide/vue/dist/esm/icons/mountain.mjs:
@lucide/vue/dist/esm/icons/mouse.mjs:
@lucide/vue/dist/esm/icons/mouse-pointer.mjs:
@lucide/vue/dist/esm/icons/mouse-pointer-2.mjs:
@lucide/vue/dist/esm/icons/move.mjs:
@lucide/vue/dist/esm/icons/move-3d.mjs:
@lucide/vue/dist/esm/icons/music.mjs:
@lucide/vue/dist/esm/icons/music-2.mjs:
@lucide/vue/dist/esm/icons/music-3.mjs:
@lucide/vue/dist/esm/icons/music-4.mjs:
@lucide/vue/dist/esm/icons/navigation.mjs:
@lucide/vue/dist/esm/icons/navigation-off.mjs:
@lucide/vue/dist/esm/icons/network.mjs:
@lucide/vue/dist/esm/icons/newspaper.mjs:
@lucide/vue/dist/esm/icons/nfc.mjs:
@lucide/vue/dist/esm/icons/notebook.mjs:
@lucide/vue/dist/esm/icons/notebook-pen.mjs:
@lucide/vue/dist/esm/icons/notebook-tabs.mjs:
@lucide/vue/dist/esm/icons/notebook-text.mjs:
@lucide/vue/dist/esm/icons/notepad-text.mjs:
@lucide/vue/dist/esm/icons/nut.mjs:
@lucide/vue/dist/esm/icons/octagon.mjs:
@lucide/vue/dist/esm/icons/octagon-alert.mjs:
@lucide/vue/dist/esm/icons/orbit.mjs:
@lucide/vue/dist/esm/icons/package.mjs:
@lucide/vue/dist/esm/icons/package-2.mjs:
@lucide/vue/dist/esm/icons/package-check.mjs:
@lucide/vue/dist/esm/icons/package-minus.mjs:
@lucide/vue/dist/esm/icons/package-open.mjs:
@lucide/vue/dist/esm/icons/package-plus.mjs:
@lucide/vue/dist/esm/icons/package-search.mjs:
@lucide/vue/dist/esm/icons/package-x.mjs:
@lucide/vue/dist/esm/icons/paintbrush.mjs:
@lucide/vue/dist/esm/icons/palette.mjs:
@lucide/vue/dist/esm/icons/panel-bottom.mjs:
@lucide/vue/dist/esm/icons/panel-left.mjs:
@lucide/vue/dist/esm/icons/panel-left-close.mjs:
@lucide/vue/dist/esm/icons/panel-left-open.mjs:
@lucide/vue/dist/esm/icons/panel-right.mjs:
@lucide/vue/dist/esm/icons/panel-top.mjs:
@lucide/vue/dist/esm/icons/paperclip.mjs:
@lucide/vue/dist/esm/icons/parking-meter.mjs:
@lucide/vue/dist/esm/icons/pause.mjs:
@lucide/vue/dist/esm/icons/paw-print.mjs:
@lucide/vue/dist/esm/icons/pen-line.mjs:
@lucide/vue/dist/esm/icons/pen-tool.mjs:
@lucide/vue/dist/esm/icons/pencil.mjs:
@lucide/vue/dist/esm/icons/pencil-line.mjs:
@lucide/vue/dist/esm/icons/pencil-ruler.mjs:
@lucide/vue/dist/esm/icons/pentagon.mjs:
@lucide/vue/dist/esm/icons/percent.mjs:
@lucide/vue/dist/esm/icons/phone.mjs:
@lucide/vue/dist/esm/icons/phone-call.mjs:
@lucide/vue/dist/esm/icons/phone-forwarded.mjs:
@lucide/vue/dist/esm/icons/phone-incoming.mjs:
@lucide/vue/dist/esm/icons/phone-missed.mjs:
@lucide/vue/dist/esm/icons/phone-off.mjs:
@lucide/vue/dist/esm/icons/phone-outgoing.mjs:
@lucide/vue/dist/esm/icons/pi.mjs:
@lucide/vue/dist/esm/icons/pickaxe.mjs:
@lucide/vue/dist/esm/icons/picture-in-picture.mjs:
@lucide/vue/dist/esm/icons/picture-in-picture-2.mjs:
@lucide/vue/dist/esm/icons/chart-pie.mjs:
@lucide/vue/dist/esm/icons/piggy-bank.mjs:
@lucide/vue/dist/esm/icons/pilcrow.mjs:
@lucide/vue/dist/esm/icons/pill.mjs:
@lucide/vue/dist/esm/icons/pill-bottle.mjs:
@lucide/vue/dist/esm/icons/pin.mjs:
@lucide/vue/dist/esm/icons/pin-off.mjs:
@lucide/vue/dist/esm/icons/pizza.mjs:
@lucide/vue/dist/esm/icons/plane.mjs:
@lucide/vue/dist/esm/icons/plane-landing.mjs:
@lucide/vue/dist/esm/icons/plane-takeoff.mjs:
@lucide/vue/dist/esm/icons/play.mjs:
@lucide/vue/dist/esm/icons/plug.mjs:
@lucide/vue/dist/esm/icons/plug-zap.mjs:
@lucide/vue/dist/esm/icons/plus.mjs:
@lucide/vue/dist/esm/icons/popcorn.mjs:
@lucide/vue/dist/esm/icons/power.mjs:
@lucide/vue/dist/esm/icons/presentation.mjs:
@lucide/vue/dist/esm/icons/printer.mjs:
@lucide/vue/dist/esm/icons/projector.mjs:
@lucide/vue/dist/esm/icons/puzzle.mjs:
@lucide/vue/dist/esm/icons/qr-code.mjs:
@lucide/vue/dist/esm/icons/quote.mjs:
@lucide/vue/dist/esm/icons/rabbit.mjs:
@lucide/vue/dist/esm/icons/radar.mjs:
@lucide/vue/dist/esm/icons/radio.mjs:
@lucide/vue/dist/esm/icons/radio-tower.mjs:
@lucide/vue/dist/esm/icons/rat.mjs:
@lucide/vue/dist/esm/icons/ratio.mjs:
@lucide/vue/dist/esm/icons/receipt.mjs:
@lucide/vue/dist/esm/icons/receipt-cent.mjs:
@lucide/vue/dist/esm/icons/receipt-text.mjs:
@lucide/vue/dist/esm/icons/recycle.mjs:
@lucide/vue/dist/esm/icons/redo.mjs:
@lucide/vue/dist/esm/icons/refresh-ccw.mjs:
@lucide/vue/dist/esm/icons/refresh-cw.mjs:
@lucide/vue/dist/esm/icons/refresh-cw-off.mjs:
@lucide/vue/dist/esm/icons/refrigerator.mjs:
@lucide/vue/dist/esm/icons/remove-formatting.mjs:
@lucide/vue/dist/esm/icons/reply.mjs:
@lucide/vue/dist/esm/icons/reply-all.mjs:
@lucide/vue/dist/esm/icons/rocket.mjs:
@lucide/vue/dist/esm/icons/rocking-chair.mjs:
@lucide/vue/dist/esm/icons/rotate-3d.mjs:
@lucide/vue/dist/esm/icons/rotate-ccw.mjs:
@lucide/vue/dist/esm/icons/route.mjs:
@lucide/vue/dist/esm/icons/route-off.mjs:
@lucide/vue/dist/esm/icons/router.mjs:
@lucide/vue/dist/esm/icons/rows-2.mjs:
@lucide/vue/dist/esm/icons/rows-3.mjs:
@lucide/vue/dist/esm/icons/rows-4.mjs:
@lucide/vue/dist/esm/icons/rss.mjs:
@lucide/vue/dist/esm/icons/ruler.mjs:
@lucide/vue/dist/esm/icons/sailboat.mjs:
@lucide/vue/dist/esm/icons/salad.mjs:
@lucide/vue/dist/esm/icons/sandwich.mjs:
@lucide/vue/dist/esm/icons/satellite.mjs:
@lucide/vue/dist/esm/icons/satellite-dish.mjs:
@lucide/vue/dist/esm/icons/save.mjs:
@lucide/vue/dist/esm/icons/scale.mjs:
@lucide/vue/dist/esm/icons/scan.mjs:
@lucide/vue/dist/esm/icons/scan-barcode.mjs:
@lucide/vue/dist/esm/icons/scan-eye.mjs:
@lucide/vue/dist/esm/icons/scan-face.mjs:
@lucide/vue/dist/esm/icons/scan-heart.mjs:
@lucide/vue/dist/esm/icons/scan-line.mjs:
@lucide/vue/dist/esm/icons/scan-search.mjs:
@lucide/vue/dist/esm/icons/scan-text.mjs:
@lucide/vue/dist/esm/icons/school.mjs:
@lucide/vue/dist/esm/icons/scissors.mjs:
@lucide/vue/dist/esm/icons/screen-share.mjs:
@lucide/vue/dist/esm/icons/screen-share-off.mjs:
@lucide/vue/dist/esm/icons/scroll.mjs:
@lucide/vue/dist/esm/icons/scroll-text.mjs:
@lucide/vue/dist/esm/icons/search.mjs:
@lucide/vue/dist/esm/icons/send.mjs:
@lucide/vue/dist/esm/icons/send-horizontal.mjs:
@lucide/vue/dist/esm/icons/server.mjs:
@lucide/vue/dist/esm/icons/server-cog.mjs:
@lucide/vue/dist/esm/icons/server-crash.mjs:
@lucide/vue/dist/esm/icons/server-off.mjs:
@lucide/vue/dist/esm/icons/settings.mjs:
@lucide/vue/dist/esm/icons/shapes.mjs:
@lucide/vue/dist/esm/icons/share.mjs:
@lucide/vue/dist/esm/icons/share-2.mjs:
@lucide/vue/dist/esm/icons/sheet.mjs:
@lucide/vue/dist/esm/icons/shell.mjs:
@lucide/vue/dist/esm/icons/shield.mjs:
@lucide/vue/dist/esm/icons/shield-alert.mjs:
@lucide/vue/dist/esm/icons/shield-ban.mjs:
@lucide/vue/dist/esm/icons/shield-check.mjs:
@lucide/vue/dist/esm/icons/shield-half.mjs:
@lucide/vue/dist/esm/icons/shield-question-mark.mjs:
@lucide/vue/dist/esm/icons/shield-x.mjs:
@lucide/vue/dist/esm/icons/ship.mjs:
@lucide/vue/dist/esm/icons/ship-wheel.mjs:
@lucide/vue/dist/esm/icons/shirt.mjs:
@lucide/vue/dist/esm/icons/shopping-bag.mjs:
@lucide/vue/dist/esm/icons/shopping-basket.mjs:
@lucide/vue/dist/esm/icons/shopping-cart.mjs:
@lucide/vue/dist/esm/icons/shovel.mjs:
@lucide/vue/dist/esm/icons/shower-head.mjs:
@lucide/vue/dist/esm/icons/shrink.mjs:
@lucide/vue/dist/esm/icons/sigma.mjs:
@lucide/vue/dist/esm/icons/signal.mjs:
@lucide/vue/dist/esm/icons/signal-high.mjs:
@lucide/vue/dist/esm/icons/signal-low.mjs:
@lucide/vue/dist/esm/icons/signpost.mjs:
@lucide/vue/dist/esm/icons/signpost-big.mjs:
@lucide/vue/dist/esm/icons/siren.mjs:
@lucide/vue/dist/esm/icons/skip-back.mjs:
@lucide/vue/dist/esm/icons/skip-forward.mjs:
@lucide/vue/dist/esm/icons/sliders-horizontal.mjs:
@lucide/vue/dist/esm/icons/smartphone.mjs:
@lucide/vue/dist/esm/icons/face-slightly-smiling.mjs:
@lucide/vue/dist/esm/icons/snail.mjs:
@lucide/vue/dist/esm/icons/snowflake.mjs:
@lucide/vue/dist/esm/icons/arrow-up-narrow-wide.mjs:
@lucide/vue/dist/esm/icons/arrow-down-wide-narrow.mjs:
@lucide/vue/dist/esm/icons/soup.mjs:
@lucide/vue/dist/esm/icons/spade.mjs:
@lucide/vue/dist/esm/icons/sparkle.mjs:
@lucide/vue/dist/esm/icons/sparkles.mjs:
@lucide/vue/dist/esm/icons/speaker.mjs:
@lucide/vue/dist/esm/icons/speech.mjs:
@lucide/vue/dist/esm/icons/spell-check.mjs:
@lucide/vue/dist/esm/icons/split.mjs:
@lucide/vue/dist/esm/icons/sprout.mjs:
@lucide/vue/dist/esm/icons/square.mjs:
@lucide/vue/dist/esm/icons/square-arrow-out-down-left.mjs:
@lucide/vue/dist/esm/icons/square-arrow-out-down-right.mjs:
@lucide/vue/dist/esm/icons/square-arrow-out-up-left.mjs:
@lucide/vue/dist/esm/icons/square-arrow-out-up-right.mjs:
@lucide/vue/dist/esm/icons/square-check.mjs:
@lucide/vue/dist/esm/icons/square-kanban.mjs:
@lucide/vue/dist/esm/icons/square-minus.mjs:
@lucide/vue/dist/esm/icons/square-plus.mjs:
@lucide/vue/dist/esm/icons/square-x.mjs:
@lucide/vue/dist/esm/icons/squirrel.mjs:
@lucide/vue/dist/esm/icons/stamp.mjs:
@lucide/vue/dist/esm/icons/star.mjs:
@lucide/vue/dist/esm/icons/stethoscope.mjs:
@lucide/vue/dist/esm/icons/sticky-note.mjs:
@lucide/vue/dist/esm/icons/store.mjs:
@lucide/vue/dist/esm/icons/sun.mjs:
@lucide/vue/dist/esm/icons/sunrise.mjs:
@lucide/vue/dist/esm/icons/sunset.mjs:
@lucide/vue/dist/esm/icons/swords.mjs:
@lucide/vue/dist/esm/icons/syringe.mjs:
@lucide/vue/dist/esm/icons/table.mjs:
@lucide/vue/dist/esm/icons/table-2.mjs:
@lucide/vue/dist/esm/icons/table-properties.mjs:
@lucide/vue/dist/esm/icons/tablet.mjs:
@lucide/vue/dist/esm/icons/tablet-smartphone.mjs:
@lucide/vue/dist/esm/icons/tag.mjs:
@lucide/vue/dist/esm/icons/tags.mjs:
@lucide/vue/dist/esm/icons/target.mjs:
@lucide/vue/dist/esm/icons/telescope.mjs:
@lucide/vue/dist/esm/icons/tent.mjs:
@lucide/vue/dist/esm/icons/terminal.mjs:
@lucide/vue/dist/esm/icons/test-tube.mjs:
@lucide/vue/dist/esm/icons/text-cursor.mjs:
@lucide/vue/dist/esm/icons/text-search.mjs:
@lucide/vue/dist/esm/icons/thermometer.mjs:
@lucide/vue/dist/esm/icons/thermometer-snowflake.mjs:
@lucide/vue/dist/esm/icons/thermometer-sun.mjs:
@lucide/vue/dist/esm/icons/thumbs-down.mjs:
@lucide/vue/dist/esm/icons/thumbs-up.mjs:
@lucide/vue/dist/esm/icons/ticket.mjs:
@lucide/vue/dist/esm/icons/ticket-check.mjs:
@lucide/vue/dist/esm/icons/ticket-minus.mjs:
@lucide/vue/dist/esm/icons/ticket-percent.mjs:
@lucide/vue/dist/esm/icons/ticket-plus.mjs:
@lucide/vue/dist/esm/icons/ticket-x.mjs:
@lucide/vue/dist/esm/icons/timer.mjs:
@lucide/vue/dist/esm/icons/timer-off.mjs:
@lucide/vue/dist/esm/icons/timer-reset.mjs:
@lucide/vue/dist/esm/icons/toggle-left.mjs:
@lucide/vue/dist/esm/icons/toggle-right.mjs:
@lucide/vue/dist/esm/icons/touchpad.mjs:
@lucide/vue/dist/esm/icons/traffic-cone.mjs:
@lucide/vue/dist/esm/icons/tram-front.mjs:
@lucide/vue/dist/esm/icons/train-front.mjs:
@lucide/vue/dist/esm/icons/trash.mjs:
@lucide/vue/dist/esm/icons/tree-pine.mjs:
@lucide/vue/dist/esm/icons/trees.mjs:
@lucide/vue/dist/esm/icons/triangle.mjs:
@lucide/vue/dist/esm/icons/trophy.mjs:
@lucide/vue/dist/esm/icons/truck.mjs:
@lucide/vue/dist/esm/icons/turtle.mjs:
@lucide/vue/dist/esm/icons/tv.mjs:
@lucide/vue/dist/esm/icons/type.mjs:
@lucide/vue/dist/esm/icons/umbrella.mjs:
@lucide/vue/dist/esm/icons/underline.mjs:
@lucide/vue/dist/esm/icons/undo.mjs:
@lucide/vue/dist/esm/icons/university.mjs:
@lucide/vue/dist/esm/icons/unlink.mjs:
@lucide/vue/dist/esm/icons/unlink-2.mjs:
@lucide/vue/dist/esm/icons/upload.mjs:
@lucide/vue/dist/esm/icons/usb.mjs:
@lucide/vue/dist/esm/icons/user.mjs:
@lucide/vue/dist/esm/icons/user-check.mjs:
@lucide/vue/dist/esm/icons/user-cog.mjs:
@lucide/vue/dist/esm/icons/user-minus.mjs:
@lucide/vue/dist/esm/icons/user-plus.mjs:
@lucide/vue/dist/esm/icons/user-round.mjs:
@lucide/vue/dist/esm/icons/user-round-check.mjs:
@lucide/vue/dist/esm/icons/user-round-cog.mjs:
@lucide/vue/dist/esm/icons/user-round-minus.mjs:
@lucide/vue/dist/esm/icons/user-round-plus.mjs:
@lucide/vue/dist/esm/icons/user-round-search.mjs:
@lucide/vue/dist/esm/icons/user-round-x.mjs:
@lucide/vue/dist/esm/icons/user-search.mjs:
@lucide/vue/dist/esm/icons/user-x.mjs:
@lucide/vue/dist/esm/icons/users.mjs:
@lucide/vue/dist/esm/icons/users-round.mjs:
@lucide/vue/dist/esm/icons/utensils.mjs:
@lucide/vue/dist/esm/icons/utensils-crossed.mjs:
@lucide/vue/dist/esm/icons/variable.mjs:
@lucide/vue/dist/esm/icons/video.mjs:
@lucide/vue/dist/esm/icons/video-off.mjs:
@lucide/vue/dist/esm/icons/voicemail.mjs:
@lucide/vue/dist/esm/icons/volume-2.mjs:
@lucide/vue/dist/esm/icons/volume-x.mjs:
@lucide/vue/dist/esm/icons/wallet.mjs:
@lucide/vue/dist/esm/icons/wand-sparkles.mjs:
@lucide/vue/dist/esm/icons/warehouse.mjs:
@lucide/vue/dist/esm/icons/washing-machine.mjs:
@lucide/vue/dist/esm/icons/watch.mjs:
@lucide/vue/dist/esm/icons/waypoints.mjs:
@lucide/vue/dist/esm/icons/webcam.mjs:
@lucide/vue/dist/esm/icons/wheat.mjs:
@lucide/vue/dist/esm/icons/whole-word.mjs:
@lucide/vue/dist/esm/icons/wifi.mjs:
@lucide/vue/dist/esm/icons/wind.mjs:
@lucide/vue/dist/esm/icons/workflow.mjs:
@lucide/vue/dist/esm/icons/worm.mjs:
@lucide/vue/dist/esm/icons/wrench.mjs:
@lucide/vue/dist/esm/icons/x.mjs:
@lucide/vue/dist/esm/icons/zap.mjs:
@lucide/vue/dist/esm/icons/zap-off.mjs:
  (**
   * @license @lucide/vue v1.37.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
