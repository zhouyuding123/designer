<!--HTML部分-->
<template>
  <div class="com-waterfall" ref="root">
    <div class="slot-box">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'com-waterfall',
  props: {
    // 列数
    cols: { 
      type: Number,
      default: 2
    },
    // 数据列表
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 每一列的宽度
    width: Number,
    
    // 距离底部多远进行上拉刷新
    reachBottomDistance: {
      type: Number,
      default: 100
    },

    // 滚动节流间隔事件，ms
    interval: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      root: null, // 组件根元素
      colNodes: [], // 每一列的元素
      canLoad: true, // 是否可以加载更多
      renderIndex: 0 // 已渲染的元素索引
    }
  },
  watch: {
  	// 列数发生变化时，重新渲染
    cols(nVal, oVal) {
      if (nVal === oVal) {
        return
      }
      this.init()
    },
    // 当数据列表发生变化时
    // 若数据长度变短，则清除原来的列表，并重新渲染
    // 若长度变长，则是下拉加载更多的情况，直接从已经渲染的部分接着渲染
    dataList(nVal, oVal) {
      if (!nVal.length || nVal.length < oVal.length) {
        this.clearItem()
      }
      // 防止此时slot中元素还未渲染成功，获取不到其中元素的情况
      this.$nextTick(() => {
        setTimeout(() => {
          this.createColItem()
        }, 200)
      })
    }
  },
  mounted() {
    this.init()
    
    // 添加滚动事件
    this.scrollEvent()
  },

  methods: {
    init() {
      this.root = this.$refs.root
      // 初始化数据
      this.canLoad = true
      this.renderIndex = 0
      this.clearColumn()
      // 创建列
      this.createColumn()
      
      this.$nextTick(() => {
        setTimeout(() => {
          // 创建列中的元素
          this.createColItem()
        }, 200)
      })
    },

    // 清除列
    clearColumn() {
      this.colNodes.forEach(item => {
        item.remove()
      })
      this.colNodes = []
    },

    // 清除列中元素
    clearItem() {
      if (!this.colNodes || !this.colNodes.length) {
        return
      }
      this.colNodes.forEach(item => {
        item.innerHTML = ''
      })
      this.renderIndex = 0
      this.canLoad = true
    },

    // 创建列
    createColumn() {
      const colNodes = []
      for (let index = 0; index < this.cols; index++) {
        const node = document.createElement('div')
        node.className = 'com-waterfall-cols'
        // 若给定宽度，则按照给定宽度设置列宽度
        if (this.width) {
          node.style.width = this.width + 'px'
        } else {
          const width = Math.round((1 / this.cols) * 100)
          node.style.width = width + '%'
        }
        if (!this.root) {
          this.root = this.$refs.root
        }
        this.root && this.root.appendChild(node)
        colNodes.push(node)
      }
      this.colNodes = colNodes
    },

    html() {
      return document.documentElement
    },

    // 创建列中元素
    async createColItem() {

      if (this.isRendering|| !this.$slots.default || !this.$slots.default.length) {
        return
      }
      this.isRendering= true
      const nodes = this.$slots.default.splice(this.renderIndex)
      for (let index = 0; index < nodes.length; index++) {
        // 获取最短的列
        const shortCol = this.getShortColumns()
        if (!shortCol) {
          return
        }
        // 将元素放入短列中
        await this.appendChild(shortCol, nodes[index].elm)
        this.renderIndex++
      }
      this.isRendering= false
      // 若未满一屏，则加载更多
      this._loadMore()
    },

    // 获取更矮的一列
    getShortColumns() {
      const length = this.colNodes.length
      if (!length) {
        return
      }
      let shortNode = this.colNodes[0]
      for (let index = 1; index < length; index++) {
        const height = this.colNodes[index].offsetHeight
        if (height < shortNode.offsetHeight) {
          shortNode = this.colNodes[index]
        }
      }
      return shortNode
    },

    // 将每个item放入列中
    async appendChild(parent, node) {
      if (!node || !(node instanceof HTMLElement)) {
        return
      }

      const imgs = node.getElementsByTagName('img')
      // 若不存在图片，则直接放入短列中
      if (!imgs || !imgs.length) {
        parent.appendChild(node)
        return Promise.resolve()
      } else {
      	// 若存在图片，则找出图片的长度，并给图片占位，然后放入短列中
        for (let index = 0; index < imgs.length; index++) {
          const img = imgs[index]
          if (!img) {
            return
          }
          if (!img.height) {
            await this.getImgHeight(img)
          }
        }
        parent.appendChild(node)
        return Promise.resolve()
      }
    },

    // 获取图片高度
    getImgHeight(img) {
      return new Promise(resolve => {
      	// 获取不到src时，说明时是懒加载的情况，图片链接存于lazy-load-src属性上
        const src = img.getAttribute('src') || img.getAttribute('lazy-load-src')
        if (!src) {
          return
        }
        // 通过新创建一个Image来获取图片高度
        const image = new Image()
        image.src = src
        if (image.complete) {
          if (img.width) {
            img.style.height = ((img.width / image.width) * image.height).toFixed(2) + 'px'
            resolve()
          } else {
            img.style.height = image.height.toFixed(2) + 'px'
            resolve()
          }
        } else {
          image.onload = () => {
            if (img.width) {
              img.style.height = ((img.width / image.width) * image.height).toFixed(2) + 'px'
              resolve()
            } else {
              img.style.height = image.height.toFixed(2) + 'px'
              resolve()
            }
          }
          image.onerror = () => {
            resolve()
          }
        }
      })
    },

    scrollEvent() {
      const _this = this
      window.onscroll = _this.loadMore
      document.addEventListener('touchmove', _this.loadMore, false)
    },


    // 滚动事件，节流
    loadMore() {
      this.$emit('scroll')
      if (this.timer) {
        return 
      } 
      this.timer = setTimeout(() => {
        clearTimeout(this.timer)
        this.timer = null
        this._loadMore()
      }, this.interval);
    },

    // 上拉加载更多
    _loadMore() {
      const height = window.innerHeight
      const bottom = this.root.getBoundingClientRect().bottom
      if (bottom < height + this.reachBottomDistance && this.canLoad) {
        this.canLoad = false
        this.$emit('loadmore')
      } else if (bottom >= height + this.reachBottomDistance) {
        this.canLoad = true
      }
    }
  }
}
</script>
<style>
	.com-waterfall {
	 /* max-width: 1980px; */
	  position: relative;
	  overflow-y: scroll;
    margin: 0 auto;
 
  
	}
	.com-waterfall-cols {
	  float: left;
	  margin: 0;
	  padding: 0;
	}
	.slot-box {
	  position: absolute;
	  width: 0;
	  height: 0;
	  overflow: hidden;
	}
</style>
