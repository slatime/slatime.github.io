(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{297:function(a,e,t){"use strict";t.r(e);var s=t(14),n=Object(s.a)({},(function(){var a=this,e=a._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"sass-기본-내장-함수"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#sass-기본-내장-함수"}},[a._v("#")]),a._v(" Sass 기본 내장 함수")]),a._v(" "),e("h2",{attrs:{id:"number-functions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#number-functions"}},[a._v("#")]),a._v(" Number Functions")]),a._v(" "),e("ul",[e("li",[a._v("숫자값을 %로 변환")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("percentage(0.2)          => 20%\npercentage(100px / 50px) => 200%\n")])])]),e("ul",[e("li",[a._v("소숫점 이하 반올림")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("round(10.4px) => 10px\nround(10.6px) => 11px\n")])])]),e("ul",[e("li",[a._v("소숫점 이하 올림")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("ceil(10.4px) => 11px\nceil(10.6px) => 11px\n")])])]),e("ul",[e("li",[a._v("소숫점 이하 절사")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("floor(10.4px) => 10px\nfloor(10.6px) => 10px\n")])])]),e("ul",[e("li",[a._v("절대값 취득")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("abs(10px) => 10px\nabs(-10px) => 10px\n")])])]),e("h2",{attrs:{id:"introspection-functions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#introspection-functions"}},[a._v("#")]),a._v(" Introspection Functions")]),a._v(" "),e("ul",[e("li",[a._v("Data type 취득")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('type-of(100px)  => number\ntype-of(asdf)   => string\ntype-of("asdf") => string\ntype-of(true)   => bool\ntype-of(#fff)   => color\ntype-of(blue)   => color\n')])])]),e("ul",[e("li",[a._v("Data unit 취득")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('unit(100)   => ""\nunit(100px) => "px"\nunit(3em)   => "em"\nunit(10px * 5em) => "em*px"\nunit(10px * 5em / 30cm / 1rem) => "em*px/cm*rem"\n')])])]),e("ul",[e("li",[a._v("값에 단위가 있는지 확인")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("unitless(100)   => true\nunitless(100px) => false\n#2.4 2개의 값을 합산, 감산, 비교 가능한지 확인\ncomparable(2px, 1px)   => true\ncomparable(100px, 3em) => false\ncomparable(10cm, 3mm)  => true\n")])])]),e("h2",{attrs:{id:"string-functions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#string-functions"}},[a._v("#")]),a._v(" String Functions")]),a._v(" "),e("ul",[e("li",[a._v("따옴표 붙이기")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('quote("foo") => "foo"\nquote(foo)   => "foo"\n')])])]),e("ul",[e("li",[a._v("따옴표 제거")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('unquote("foo") => foo\nunquote(foo)   => foo\n')])])]),e("h2",{attrs:{id:"list-functions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#list-functions"}},[a._v("#")]),a._v(" List Functions")]),a._v(" "),e("ul",[e("li",[a._v("리스트 요소수 취득")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("length(10px)                        => 1\nlength(10px 20px 30px)              => 3\nlength((width: 10px, height: 20px)) => 2\n")])])]),e("ul",[e("li",[a._v("리스트의 n번째 요소 취득")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("nth(10px 20px 30px, 1)                 => 10px\nnth((Helvetica, Arial, sans-serif), 3) => sans-serif\nnth((width: 10px, length: 20px), 2)    => length 20px\n\n$n: nth(width: 10px, length: 20px);\nnth(($n, 2), 1)                        => length\n")])])]),e("ul",[e("li",[a._v("요소의 index 취득")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("index(1px solid red, solid)                       => 2\nindex(1px solid red, dashed)                      => null\nindex((width: 10px, height: 20px), (height 20px)) => 2\n")])])]),e("ul",[e("li",[a._v("리스트의 마지막에 단일 요소 추가")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("append(10px 20px, 30px)      => 10px 20px 30px\nappend((blue, red), green)   => blue, red, green\nappend(10px 20px, 30px 40px) => 10px 20px (30px 40px)\nappend(10px, 20px, comma)    => 10px, 20px\nappend((blue, red), green, space) => blue red green\n")])])]),e("ul",[e("li",[a._v("리스트와 리스트의 결합")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("join(10px 20px, 30px 40px)      => 10px 20px 30px 40px\njoin((blue, red), (#abc, #def)) => blue, red, #abc, #def\njoin(10px, 20px)                => 10px 20px\njoin(10px, 20px, comma)         => 10px, 20px\njoin((blue, red), (#abc, #def), space) => blue red #abc #def\n")])])]),e("ul",[e("li",[a._v("복수의 리스트를 각자의 순서에 맞추어 재결합")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("zip(1px 1px 3px, solid dashed solid, red green blue)\n=> 1px solid red, 1px dashed green, 3px solid blue\n")])])]),e("h2",{attrs:{id:"map-functions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#map-functions"}},[a._v("#")]),a._v(" Map Functions")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('// key로 value 취득\nmap-get(("foo": 1, "bar": 2), "foo") => 1\nmap-get(("foo": 1, "bar": 2), "bar") => 2\nmap-get(("foo": 1, "bar": 2), "baz") => null\n')])])]),e("h2",{attrs:{id:"color-functions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#color-functions"}},[a._v("#")]),a._v(" Color Functions")]),a._v(" "),e("ul",[e("li",[a._v("색상(hue) 변경")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$base-color: #ad141e;\n\n.adjust-hue {\n  color: adjust-hue($base-color, 20%);\n  // => #ad3d14\n}\nadjust-hue\n")])])]),e("ul",[e("li",[a._v("채도(saturation) 변경")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$base-color: #ad141e;\n\np {\n  .saturate {\n    color: saturate($base-color, 20%);\n  }\n\n  .desaturate {\n    color: desaturate($base-color, 20%);\n  }\n}\n")])])]),e("ul",[e("li",[a._v("휘도(lightness) 변경")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$base-color: #ad141e;\n\np {\n  .darken {\n    color: darken($base-color, 10%);\n  }\n\n  .lighten {\n    color: lighten($base-color, 10%);\n  }\n}\n")])])]),e("ul",[e("li",[a._v("투명도(opacity) 변경")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$base-color: #ad141e;\n\n.rgba {\n  color: rgba($base-color, .7);\n}\n\n/*\n.rgba {\n  color: rgba(173, 20, 30, 0.7); }\n*/\n")])])]),e("ul",[e("li",[a._v("alpha 연산")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$base-color: rgba(255, 0, 0, 0.5);\n\n// alpha +\n// 불투명도를 증가시킨다.(더 불투명해진다)\n.opacify {\n  color: opacify($base-color, 0.3);\n}\n\n// alpha -\n// 불투명도를 감소시킨다.(더 투명해진다)\n.transparentize {\n  color: transparentize($base-color, 0.25);\n}\n\n/*\n.opacify {\n  color: rgba(255, 0, 0, 0.8); }\n\n.transparentize {\n  color: rgba(255, 0, 0, 0.25); }\n*/\n")])])]),e("ul",[e("li",[a._v("Tint & Shade\n색상은 흰색(tint)과 검정색(shade)의 값으로 혼합되며 darken, lighten과 유사하다.")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$base-color: #ad141e;\n\n.tint {\n  color: tint($base-color, 10%);\n}\n\n.shade {\n  color: shade($base-color, 10%);\n}\n")])])])])}),[],!1,null,null,null);e.default=n.exports}}]);