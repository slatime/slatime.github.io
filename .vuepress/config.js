module.exports = {
  title: "고경남", // 사이트 타이틀
  description: "연습장.",
  theme: "default-prefers-color-scheme",
  themeConfig: {
    prefersTheme: "dark",
    logo: "", // 로고 이미지
    nav: [
      {
        text: "stable diffusion",
        ariaLabel: "stable diffusion",
        items: [
          { text: "Basic", link: "/post/sd/basic" },
          { text: "LoRA", link: "/post/sd/lora" },
        ],
      },
      {
        text: "Node.js",
        ariaLabel: "Node.js",
        items: [
          {
            text: "Node",
            items: [
              { text: "Basic", link: "/post/node/node" },
              { text: "Module", link: "/post/node/module" },
              { text: "NPM", link: "/post/node/npm" },
            ],
          },
          {
            text: "Package",
            items: [{ text: "Express", link: "/post/node/express" }],
          },
          {
            text: "MVC pattern",
            items: [
              { text: "MVC 1", link: "/post/node/mvc1" },
              { text: "MVC 2", link: "/post/node/mvc2" },
            ],
          },
        ],
      },
      {
        text: "Javascript",
        ariaLabel: "Javascript",
        items: [
          { text: "코딩컨벤션", link: "/post/js/convention/" },
          {
            text: "Javascript",
            items: [
              { text: "Javascript", link: "/post/js/javascript/" },
              { text: "ES6", link: "/post/js/es6/" },
            ],
          },
          {
            text: "Library",
            items: [
              { text: "Jquery", link: "/post/js/jquery" },
              { text: "Highcharts", link: "/post/js/highchart" },
            ],
          },
        ],
      },
      {
        text: "Sass",
        ariaLabel: "Sass",
        items: [
          { text: "Sass", link: "/post/sass/sass" },
          { text: "내장함수", link: "/post/sass/function" },
          { text: "Webpack 개발환경에서 sass", link: "/post/sass/webpack" },
        ],
      },
      {
        text: "svelte",
        ariaLabel: "svelte",
        items: [
          { text: "core API", link: "/post/svelte/coreApi" },
          { text: "svelteKit", link: "/post/svelte/svelteKit" },
        ],
      },

      // { text: 'Home2', link: '/post/gatsby' }
    ],
    sidebar: "auto", // h1~h6 같은 heading tag를 기준으로 sidebar를 만들어줌
  },
};
