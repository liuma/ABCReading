module.exports = {
    "plugins": { 
        "autoprefixer": {}, 
        "postcss-px-to-viewport": { 
            "viewportWidth": 750,    // 设计稿的视口宽度 
            "minPixelValue": 1   // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
        }
    }
  }