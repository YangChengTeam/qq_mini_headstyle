const common = require('../../utils/common.js')
var validate = require('../../utils/validate.js');

const app = getApp()
var userInfo
var dotsFirst = true;
var list;
var types;
var banners;
var page = 1;
var cids = [15, 13, 14, 2, 21, 18, 64, -1]

var randomIndex = 1;
var atimer
var float_img
var new_app_id
var new_pre_img

var adsarray = ['adunit-5fd971d74d692ee5']

var jump_index = 0

var temp_app_infos;

var more_app_list;
var more_app_index = 0;

Page({
  data: {
    hide_ad:false,
    is_nav:true,
    is_login: false,
    isUse: true,
    show_follow:true,
    floatImg: '../../images/a1.png',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentTab: 0,
    home_img: '../../images/home_selected.png',
    my_info_img: '../../images/my_normal.png',
    find_img:'../../images/find_normal.png',
    nick_name: '../../images/my_normal.png',
    user_head: '../../images/def_head.png',
    user_name: "未登录",
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    is_load_more: false,
    showModal: false,
    isfollow: false,
    lefttype: 0,
    follow_gif: '../../images/follow-1.png',
    typedata: [{
      'typeName': '情侣头像',
      'imageUrl': '../../images/type01.png'
    }, {
      'typeName': '男生头像',
        'imageUrl': '../../images/type02.png'
    }, {
      'typeName': '女生头像',
        'imageUrl': '../../images/type03.png'
    }, {
      'typeName': '个性头像',
        'imageUrl': '../../images/type04.png'
    }, {
      'typeName': '明星头像',
        'imageUrl': '../../images/type05.png'
    }, {
      'typeName': '动漫头像',
        'imageUrl': '../../images/type06.png'
    }, {
      'typeName': '游戏头像',
        'imageUrl': '../../images/type07.png'
    }, {
      'typeName': '更多头像',
        'imageUrl': '../../images/type08.gif'
    }],
    appInfo: [{
        appid: 'wxe4519c687bd8430c',
        app_img: 'a1.png'
      },
      {
        appid: 'wxad495c9f2825ed6d',
        app_img: 'a2.png'
      },
      {
        appid: 'wxfae1dd0da4301d80',
        app_img: 'a3.png'
      },
      {
        appid: 'wxa92333f3e88499ed',
        app_img: 'a4.png'
      },
      {
        appid: 'wx7ac01bd4683ad184',
        app_img: 'a5.png'
      },
      {
        appid: 'wx318bd4706e1da3fc',
        app_img: 'a6.png'
      },
      {
        appid: 'wxd234565d82683d73',
        app_img: 'a7.png'
      }
    ],
    ads: adsarray
  },

  //滑动切换
  swiperTab: function(e) {
    var that = this;
    var current_home_img;
    var current_my_info_img;
    var current_find_img;
    var current_left_type;
    if (e.detail.current == 0) {
      current_home_img = '../../images/home_selected.png'
      current_my_info_img = '../../images/my_normal.png'
      current_find_img = '../../images/find_normal.png'
      current_left_type = 0
    } 
    if (e.detail.current == 1) {
      current_home_img = '../../images/home_normal.png'
      current_my_info_img = '../../images/my_normal.png'
      current_find_img = '../../images/find_selected.png'
      current_left_type = 2
    }
    if (e.detail.current == 2) {
      current_home_img = '../../images/home_normal.png'
      current_my_info_img = '../../images/my_selected.png'
      current_find_img = '../../images/find_normal.png'
      current_left_type = 2
    }

    that.setData({
      currentTab: e.detail.current,
      home_img: current_home_img,
      my_info_img: current_my_info_img,
      find_img: current_find_img,
      lefttype: current_left_type
    })

  },
  //点击切换
  clickTab: function(e) {
    var chooseTabIndex = e.target.dataset.current;
    console.log(this.data.currentTab + "---" + e.chooseTabIndex)
    var that = this;
    if (this.data.currentTab === chooseTabIndex) {
      return false;
    } else {
      var current_home_img;
      var current_my_info_img;
      var current_find_img;
      var current_left_type;

      if (chooseTabIndex == 0) {
        current_home_img = '../../images/home_selected.png'
        current_my_info_img = '../../images/my_normal.png'
        current_find_img = '../../images/find_normal.png'
        current_left_type = 0
      }
      if (e.target.dataset.current == 1) {
        current_home_img = '../../images/home_normal.png'
        current_my_info_img = '../../images/my_normal.png'
        current_find_img = '../../images/find_selected.png'
        current_left_type = 2
      }
      if (e.target.dataset.current == 2) {
        current_home_img = '../../images/home_normal.png'
        current_my_info_img = '../../images/my_selected.png'
        current_find_img = '../../images/find_normal.png'
        current_left_type = 2
      }
      console.log("change tab finish--->")
      that.setData({
        currentTab: chooseTabIndex,
        home_img: current_home_img,
        my_info_img: current_my_info_img,
        lefttype: current_left_type
      })
    }
  },
  onShareAppMessage: function(res) {
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

  getHomeData: function(that) {
    randomIndex = Math.floor(Math.random() * 10 + 1);
    page = randomIndex;
    console.log('this page --->' + page)
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
        'num': 48,
        'timestamp': times,
        'randstr': uuid,
        'corestr': md5Temp,
        'openid': wx.getStorageSync('user_info') ? wx.getStorageSync('user_info').openId : 0
      },
      success: function(res) {
        console.log(res.data.data.special)
        wx.hideLoading()
        wx.stopPullDownRefresh();
        list = res.data.data;
        banners = res.data.special;

        if (list.length % 3 > 0) {
          for (let i = 0; i < list.length; i++) {
            if (i == list.length - 1) {
              list[i].fixStyles = 'margin-right : auto; margin-left:5rpx;'
            }
          }
        }

        that.setData({
          array: list,
          banner: banners
        });
      },
      fail: function(res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },

  onLoad: function() {

    list = null;
    wx.showLoading({
      title: '加载中',
    })

    var that = this;

    wx.setNavigationBarTitle({
      title: '头像达人'
    })

    this.getHomeData(that);

    wx.getSystemInfo({
      success: function(res) {
        var result = that.compareVersion(res.SDKVersion, '2.0.7')
        that.setData({
          isUse: result >= 0 ? true : false
        })
      },
    })

    this.loadFindAdList();

    //获取穿越信息 //暂时不用
    // wx.request({
    //   url: 'https://ntx.qqtn.com/api/my/moreAppInfo',
    //   method: 'GET',
    //   data: {},
    //   success: function(res) {
    //     console.log(res.data.data[0])
    //   }
    // })
    
    temp_app_infos = this.data.appInfo

    if (wx.getStorageSync('follow') == 'hide'){
        this.setData({
          show_follow:false
        })
    }

    app.homePage = this;
  },

  loadFindAdList:function(e){
    var that = this
    //获取发现页广告数据
    wx.request({
      url: 'https://ntx.qqtn.com/api/my/indexAdList',
      method: 'GET',
      success: function (res) {
        console.log(res.data.data)
        app.globalData.sendAppList = res.data.data.send_app_list;

        if (res.data.data.more_app_list && res.data.data.more_app_list.length > 0){
          more_app_list = res.data.data.more_app_list;

          that.data.typedata[7].imageUrl = more_app_list[more_app_index].ico
          that.setData({
            typedata: that.data.typedata,
            more_app_id: more_app_list[more_app_index] != null ? more_app_list[more_app_index].appid : '',
            more_app_path: more_app_list[more_app_index] != null ? more_app_list[more_app_index].jump_url : ''
          })
        }
        console.log(res.data.data.banner_app_list)
        
        that.setData({
          newbanners: res.data.data.banner_app_list
        })

        let adList = res.data.data.find_app_list
        if (adList){
        
          that.setData({
            find_ad1: adList[0] != null ? adList[0].ico : '',
            find_ad2: adList[1] != null ? adList[1].ico : '',
            find_ad3: adList[2] != null ? adList[2].ico : '',
            find_ad4: adList[3] != null ? adList[3].ico : '',
            find_ad5: adList[4] != null ? adList[4].ico : '',
            find_ad6: adList[5] != null ? adList[5].ico :'',

            find_ad1_path: adList[0] != null ? adList[0].jump_url : '',
            find_ad1_appid: adList[0] != null ? adList[0].appid : '',
            find_ad2_appid: adList[1] != null ? adList[1].appid : '',
            find_ad3_appid: adList[2] != null ? adList[2].appid : '',
            find_ad4_appid: adList[3] != null ? adList[3].appid : '',
            find_ad5_appid: adList[4] != null ? adList[4].appid : '',
            find_ad6_appid: adList[5] != null ? adList[5].appid : ''

          })
        }
        
      }
    })
  },
  onShow: function(e) {
    
    var that = this;
    wx.getStorage({
      key: 'user_info',
      success: function(res) {
        userInfo = res.data
        console.log(userInfo)
        var nickName = userInfo ? userInfo.nickName : ''
        var userHead = userInfo ? userInfo.avatarUrl : that.data.user_head
        that.setData({
          is_login: nickName ? true : false,
          nick_name: nickName || '放牛娃的梦想',
          user_head: userHead
        })
      },
    })

    jump_index = Math.floor(Math.random() * temp_app_infos.length);

    new_app_id = temp_app_infos[jump_index].appid
    this.setData({
      floatImg: temp_app_infos[jump_index].app_img,
      app_id: new_app_id
    })

  },
  onReady() {
    this.setData({
      statusBarHeight: app.globalData.statusBarHeight,
      titleBarHeight: app.globalData.titleBarHeight
    })
  },

  newApp: function(e) {
    if (!new_app_id) {
      wx.previewImage({
        urls: [new_pre_img],
        current: new_pre_img
      })
    } else {
      wx.navigateToMiniProgram({
        appId: new_app_id
      })
    }
  },

  onPullDownRefresh: function() {
    var that = this;
    this.getHomeData(that);

    this.loadFindAdList();
  },
  bottomScroll: function(e) {
    console.log('bottomScroll--->')
    this.nextData();
  },
  nextData: function() {
    console.log('nextData--->')

    var Page$this = this;
    page++;
    console.log('next page --->' + page)
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
        'num': 48,
        'timestamp': times,
        'randstr': uuid,
        'corestr': md5Temp,
        'openid': wx.getStorageSync('user_info') ? wx.getStorageSync('user_info').openId : 0
      },
      success: function(res) {
        list = list.concat(res.data.data);
        console.log(list.length)
        if (list.length % 3 > 0) {
          for (var i = 0; i < list.length; i++) {

            if (i == list.length - 1) {
              list[i].fixStyles = 'margin-right : auto;margin-left:5rpx;'
            }
          }
        }
        Page$this.setData({
          array: list,
          is_load_more: false
        });
      },
      fail: function(res) {
        Page$this.setData({
          is_load_more: false
        })
      }
    })
    this.setData({
      is_load_more: true
    })
  },
  category: function(e) {
    var cindex = e.currentTarget.dataset.index
    console.log(cids[cindex])
    if (cindex == 7) {
      this.setData({
        showModal: true
      });
      return;
    }
    console.log('category index --->' + cindex)
    wx.navigateTo({
      url: '../category/category?cid=' + cids[cindex] + '&typeName=' + this.data.typedata[cindex].typeName
    })
  },
  banner: function(e) {
    var sid = e.currentTarget.dataset.sid
    console.log(sid)
    wx.navigateTo({
      url: '../collection/collection?sid=' + sid
    })
  },

  refreshData(status) {
    console.log(this.data.array)
    console.log(this.currentIndex)

    this.data.array[this.currentIndex].is_keep = status

    this.setData({
      array: this.data.array
    })
  },

  imagedetail: function(e) {
    this.currentIndex = e.currentTarget.dataset.index

    var index = e.currentTarget.dataset.index + 48 * (randomIndex - 1)
    var is_keep = e.currentTarget.dataset.keep
    var share_title = e.currentTarget.dataset.sharetitle
    console.log('index--->' + index)
    var selectPage = 0;


    if ((index + 1) % 48 == 0) {
      selectPage = (index + 1) / 48;
    } else {
      selectPage = ((index + 1) / 48) + 1
    }
    console.log('selpage--->' + selectPage)
    wx.navigateTo({
      url: '../imagedetail/imagedetail?currentIndex=' + index + '&page=' + parseInt(selectPage) + '&is_keep=' + is_keep + '&share_title=' + share_title
    })
  },

  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    console.log("hide");
    this.setData({
      showModal: false
    });
  },
  toSearch: function(e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  onGotUserInfo: function(e) {
    var that = this
    app.onGotUserInfo(that)
  },
  mykeep: function(e) {
    if (wx.getStorageSync('user_info')) {
      wx.navigateTo({
        url: '/pages/mykeeplist/mykeeplist',
      })
    } else {
      var that = this
      app.onGotUserInfo(that)
    }
  },
  followUs: function(e) {
    this.setData({
      isfollow: true
    })
    let a = 0
    var that = this
    this.atimer = setInterval(function() {
      if (a > 1) {
        a = 0
      }
      console.log(a)
      that.setData({
        follow_gif: `../../images/follow-${++a}.png`,
      })
    }, 300)
  },
  hideFollow: function() {
    this.setData({
      isfollow: false
    });
    //清除定时器
    if (this.atimer) {
      clearInterval(this.atimer)
    }
  },

  toTop: function(e) {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  compareVersion: function(v1, v2) {
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

  jumpSuccess: function(e) {
    
    temp_app_infos.splice(jump_index,1)
    
    if (temp_app_infos == null || temp_app_infos.length == 0){
      temp_app_infos = this.data.appInfo
    }

    console.log('jumpSuccess--->')
    console.log(temp_app_infos)

    wx.request({
      url: 'https://ntx.qqtn.com/api/my/moreAppClick',
      method: 'GET',
      data: {
        'appid': new_app_id,
      },
      success: function (res) {
        console.log('total success')
      }
    })
  },

  findJumpSuccess: function (e) {
    let find_app_id = e.currentTarget.dataset.appid
    let jtype = e.currentTarget.dataset.jtype
    wx.request({
      url: 'https://ntx.qqtn.com/api/my/setAdClick',
      method: 'GET',
      data: {
        'appid': find_app_id,
        type: jtype
      },
      success: function (res) {
        if(res.data.code == 1){
          console.log('findJump Success--->')
        }else{
          console.log('findJump Fail--->')
        }
      },
      fail:function(res){
        console.log('findJump Fail--->')
      }
    })
  },

  moreJumpSuccess: function (e) {
    more_app_index++;
    console.log('more_app_index' + more_app_list.length)
    if(more_app_index >= more_app_list.length){
      more_app_index = 0;
    }
    var that = this
    this.data.typedata[7].imageUrl = more_app_list[more_app_index].ico
    this.setData({
      typedata: that.data.typedata,
      more_app_id: more_app_list[more_app_index] != null ? more_app_list[more_app_index].appid : '',
      more_app_path: more_app_list[more_app_index] != null ? more_app_list[more_app_index].jump_url : ''
    })

    let find_app_id = e.currentTarget.dataset.appid
    let jtype = e.currentTarget.dataset.jtype

    wx.request({
      url: 'https://ntx.qqtn.com/api/my/setAdClick',
      method: 'GET',
      data: {
        'appid': find_app_id,
        type: jtype
      },
      success: function (res) {
        if (res.data.code == 1) {
          console.log('findJump Success--->')
        } else {
          console.log('findJump Fail--->')
        }
      },
      fail: function (res) {
        console.log('findJump Fail--->')
      }
    })
  },


  follow:function(e){
    wx.setStorage({
      key: 'follow',
      data: 'hide',
    })
    this.setData({
      show_follow:false
    })
  }

})