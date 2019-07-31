var validate = require('../../utils/validate.js');
var app = getApp()
var cid
var page = 1
var list
var typeName
var adsarray = ['adunit-5fd971d74d692ee5']
var is_fs = 0
var jump_index = 0
var temp_app_infos
var new_app_id
var jtype
var jump_path
Page({
  data: {
    hide_ad:false,
    is_load_more: false,
    ads: adsarray,
    is_nav: true,
    isUse: true,
    floatImg: '../../images/a1.png'
  },
  onLoad: function(options) {
    //console.log(e.cid)
    var that = this;
    temp_app_infos = app.globalData.sendAppList;
    cid = options.cid
    typeName = options.typeName
    if(options.is_fs){
      is_fs = 1
    }

    wx.showLoading({
      title: '加载中',
    })

    var Page$this = this;
    this.getData(Page$this);
    wx.setNavigationBarTitle({
      title: typeName
    })

    wx.getSystemInfo({
      success: function (res) {
        var result = that.compareVersion(res.SDKVersion, '2.0.7')
        that.setData({
          isUse: result >= 0 ? true : false
        })
      },
    })

    app.categoryPage = this
  },
  onReady() {
    this.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight,
      title_txt: typeName
    })
  },

  onShow: function (e) {
    console.log(temp_app_infos)
    
    var that = this;
    if (temp_app_infos != null){
      
      if (wx.getStorageSync("jump_index")){
        jump_index = wx.getStorageSync("jump_index");
        if (jump_index >= temp_app_infos.length) {
          jump_index = 0;
        }
        if (jump_index < 0){
          jump_index = 0;
        }
        jtype = temp_app_infos[jump_index].type
        jump_path = temp_app_infos[jump_index].jump_url
      }else{
        jump_index = 0;
        jtype = 1;
        jump_path = ""
      }
      
      console.log("onshow jump_index --->" + jump_index)
      new_app_id = temp_app_infos[jump_index].appid
      that.setData({
        floatImg: temp_app_infos[jump_index].ico,
        app_id: new_app_id,
        jump_path: jump_path
      })
    }
  },

  getData: function(that) {
    page = 1
    list = null;
    var Page$this = this;

    let times = Date.parse(new Date())
    let uuid = validate.guid()
    let md5Temp = validate.md5Sign(times, uuid)

    if (md5Temp.length > 16) {
      md5Temp = md5Temp.substring(md5Temp.length - 16)
    }

    wx.request({
      url: 'https://ntx.qqtn.com/api/my/index',
      method: 'GET',
      data: {
        'p': page,
        'cid': cid,
        'num': 48,
        'timestamp': times,
        'randstr': uuid,
        'corestr': md5Temp,
        'openid': wx.getStorageSync('user_info') ? wx.getStorageSync('user_info').openId : 0
      },
      success: function(res) {
        wx.hideLoading()
        wx.stopPullDownRefresh();
        list = res.data.data;

        if (list.length % 3 > 0) {
          for (var i = 0; i < list.length; i++) {
            if (i == list.length - 1) {
              list[i].fixStyles = 'margin-right : auto; margin-left:5rpx;'
            }
          }
        }

        that.setData({
          array: list,
        });
      },
      fail: function(res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },
  
  compareVersion: function (v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    var len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i])
      var num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }

    return 0
  },

  backPage: function (e) {
    if (is_fs){
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }else{
      wx.navigateBack()
    }
  },

  onPullDownRefresh: function() {
    var Page$this = this;
    this.getData(Page$this);
  },
  onReachBottom: function() {

    var Page$this = this;
    page++;
    let times = Date.parse(new Date())
    let uuid = validate.guid()
    let md5Temp = validate.md5Sign(times, uuid)

    if (md5Temp.length > 16) {
      md5Temp = md5Temp.substring(md5Temp.length - 16)
    }
    wx.request({
      url: 'https://ntx.qqtn.com/api/my/index',
      method: 'GET',
      data: {
        'p': page,
        'cid': cid,
        'num': 48,
        'timestamp': times,
        'randstr': uuid,
        'corestr': md5Temp,
        'openid': wx.getStorageSync('user_info') ? wx.getStorageSync('user_info').openId : 0
      },
      success: function(res) {
        wx.hideLoading()
        list = list.concat(res.data.data);
        console.log(list.length)

        if (list.length % 3 > 0) {
          for (var i = 0; i < list.length; i++) {
            if (i == list.length - 1) {
              list[i].fixStyles = 'margin-right : auto; '
            }
          }
        }
        Page$this.setData({
          array: list,
          is_load_more: false
        });
      },
      fail: function(res) {
        wx.hideLoading()
        Page$this.setData({
          is_load_more: false
        })
      }
    })
    this.setData({
      is_load_more: true
    })
  },
  refreshData(status){
    this.data.array[this.currentIndex].is_keep = status
    console.log(this.data.array[this.currentIndex])
     this.setData({
       array: this.data.array
     })
  },
  imagedetail: function(e) {
    var index = e.currentTarget.dataset.index
    var is_keep = e.currentTarget.dataset.keep
    var share_title = e.currentTarget.dataset.sharetitle
    var selectPage = 0

    this.currentIndex = index

    if ((index + 1) % 48 == 0) {
      selectPage = (index + 1) / 48;
    } else {
      selectPage = ((index + 1) / 48) + 1
    }

    wx.navigateTo({
      url: '../imagedetail/imagedetail?currentIndex=' + index + '&page=' + parseInt(selectPage) + '&cid=' + cid + '&is_keep=' + is_keep + '&share_title=' + share_title
    })
  },

  toHome:function(e){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },

  toTop:function(e){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  
  newApp: function (e) {
    wx.navigateToMiniProgram({
      appId: new_app_id
    })
  },
  closeAd:function(e){
    this.setData({
      hide_ad:false
    })
  },
  findJumpSuccess: function (e) {
    jump_index++;
    wx.setStorageSync("jump_index", jump_index)

    wx.request({
      url: 'https://ntx.qqtn.com/api/my/setAdClick',
      method: 'GET',
      data: {
        'appid': new_app_id,
        type: jtype
      },
      success: function (res) {
        if (res.data.code == 1) {
          console.log('category Success--->')
        } else {
          console.log('category Fail--->')
        }
      },
      fail: function (res) {
        console.log('category Fail--->')
      }
    })
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: app.globalData.appShareName ? app.globalData.appShareName : "@你快来换个新头像吧",
      path: '/pages/index/index',
      imageUrl: app.globalData.appShareIco ? app.globalData.appShareIco : "/images/share_def.png"
    }
  },
})