var jshintConfig = {
  i18n: 'zh-CN',
  quotmark: 'single', // 单引号
  immed   : true, // (function(){})(); => (function(){}());
  undef   : true, // 禁止使用不在全局变量列表中的未定义的变量
  unused  : false, // 禁止定义变量却不使用

  bitwise  : true, // 禁用位运算符(如^，|，&)
  camelcase: 'camelCase', // 使用驼峰命名(camelCase)或全大写下划线命名(UPPER_CASE)
  curly    : true, // if和while等语句中使用{}来明确代码块
  noempty  : true, // 禁止出现空的代码块
  trailing : true, // 禁止行尾空格
  latedef  : false, // 变量定义前禁止使用
  evil     : true, // 允许使用eval

  validthis: true, // 允许严格模式下在非构造函数中使用this, 当为false, 添加注释以绕过验证 /* jshint validthis: true */
  loopfunc : false, // 允许循环中定义函数
  expr     : true, // 允许应该出现赋值或函数调用的地方使用表达式
  asi      : true, // 省略分号
  eqnull   : true, // 允许==null
  eqeqeq   : false, // 使用===和!==替代==和!=

  // 下面是全局对象定义
  browser   : true,
  devel     : true,
  browserify: true,
  jquery    : true,
  globals   : {
    Inkey   : true,
    Swiper   : true,
    angular  : true,
    _        : true,
    xScroll  : true,
    wx       : true,
    TDAPP    : true,
    FastClick: true,
    __uri    : true,
    __inline : true,
    deny     : true // 首页闪屏广告定义的方法, 该方法用于在闪屏结束后移除监听
  }
};

fis
.set('project.files', [
  '/node_modules/@spider/**',
  '/node_modules/angular/**',
  '/node_modules/jquery-param/**',
  '/node_modules/underscore/**',
  'lib/**',
  'example/**'
])
.hook('commonjs', {
  extList: ['.js', '.jsx', '.es', '.ts', '.tsx']
})
.match('::package', {
  postpackager: fis.plugin('loader')
})
.unhook('components')
.hook('node_modules');

fis
.match('**.js',{
  isMod: true,
  useSameNameRequire: true,
  preprocessor: [
    fis.plugin('js-require-css'),
    fis.plugin('js-require-file', {
      useEmbedWhenSizeLessThan: 10 * 1024 // 小于10k用base64
    })
  ]
})
.match('/lib/**.js', {
  lint: fis.plugin('jshint', jshintConfig)
})
.match('mod.js', {
  parser: null,
  isMod: false
});

fis
.media('dev')
.match(/^\/example\/(index\.html)$/i, {
  release: '$1'
})
.match('**', {
  deploy: fis.plugin('local-deliver', {
    to: 'live'
  })
});