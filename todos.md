# TODOs

- <del>transfer public files between src, dev and build mode properly.</del> <ins>Solved by migrating to webpack.</ins>
- integrate [`webpack-image-srcset-loader`](https://github.com/Calvin-LL/webpack-image-srcset-loader) along with other image manipulation loaders.
- <del>fix `<head>` tags getting inserted into `<body>` despite the plugin settings</del> <ins>Fixed by removing plugin injects</ins>
- <del>fix focus outline vanishing upon switching the theme</del> <ins>Fixed by hack in `.gtheme` rule selector.</ins>
- learn to [transition gradients](https://keithjgrant.com/posts/2017/07/transitioning-gradients/).
- write media query templates which take screen orientation into account, i.e. 1920x1080 in portrait mode would not hit `$width-laptop` query.
- style input buttons as close to the original buttons as possible.
- consolidate pie chart into a template
- incorporate these package into workflow:
  - [svgo](https://github.com/svg/svgo)
  - [svgo-loader](https://github.com/svg/svgo-loader)
  - [svg-sprite-loader](https://github.com/JetBrains/svg-sprite-loader)