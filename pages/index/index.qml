
<import src='/pages/common/common_bar.wxml'/>

<view class="swiper-tab">
    <view class="swiper-tab-item {{currentTab==0?'active':''}}" data-current="0" bindtap="clickTab">
      <image class='index-img' src='{{home_img}}' data-current="0" bindtap="clickTab"></image>
      <text class='index-txt' data-current="0" bindtap="clickTab">首页</text>
    </view>
    <view class="swiper-tab-item {{currentTab==1?'active':''}}" data-current="1" bindtap="clickTab">
      <image class='index-img' src='{{my_info_img}}' data-current="1" bindtap="clickTab"></image>
      <text class='index-txt' data-current="1" bindtap="clickTab">我的</text>
    </view>
</view>

<!--引用自定义导航栏模板-->
<template is="bar" data='{{statusBarHeight:statusBarHeight,titleBarHeight:titleBarHeight,left_type:lefttype,title_txt:""}}'/>

<swiper current="{{currentTab}}" duration="300" style='padding-top:{{statusBarHeight + titleBarHeight}}px;' bindchange="swiperTab" class='swipper-view'>
    
    <swiper-item>
      <scroll-view class='swipper-content-view' scroll-y bindscrolltolower='bottomScroll'>
        
        <!--home.wxml-->
        <swiper class='banner-swipper' indicator-dots="{{indicatorDots}}"
            autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">
            <block wx:for="{{newbanners}}"  wx:key="id" wx:for-item="item">
              <swiper-item class='swiper-item'>
                  <block wx:if='{{item.appid}}'>
                    <view class='slide-ad-item'>
                      <image class='slide-ad-image' src='{{item.ico}}' mode='widthFix'></image>
                      <navigator class="slide-jump" wx:if='{{is_nav && isUse}}' target="miniProgram" open-type="navigate" app-id="{{item.appid}}" path="{{item.jump_url}}" extra-data="" version="release" bindsuccess='findJumpSuccess' data-appid='{{item.appid}}' data-jtype='4'></navigator>
               
            </view>
                  </block>
                  <block wx:if='{{!item.appid}}'>
                    <image src="{{item.ico}}" class="slide-image" mode='widthFix' bindtap='banner' data-sid='{{item.special.sid}}' data-item='{{item}}'/>
                  </block>
                  
              </swiper-item>
            </block>
        </swiper>
        <view class='type-content'>
            <view class='type-item' wx:for="{{typedata}}" wx:key="id" wx:for-item="item">
                <image class='type-image' src='{{item.imageUrl}}' mode='widthFix' bindtap='category' data-index='{{index}}' data-item='{{item}}'></image>
                
            </view>
        </view>
        <view class='img-list'>
        <block wx:for="{{array}}" wx:key="id" wx:for-item="item" wx:for-index="index">
            
            <view class='img-item' style="{{item.fixStyles}}"  bindtap='imagedetail' data-index='{{index}}' data-keep='{{item.is_keep}}' data-sharetitle='{{item.share_title}}'>
              <image src='{{item.hurl}}' class='item-img' mode='widthFix'></image>
            </view>
        </block>
        <view class='load_more' wx:if="{{is_load_more}}"><image src='/images/load_more.gif' class='load_more_image'></image></view>
        </view>
      </scroll-view>
    </swiper-item>

    <!--我的-->
    <swiper-item>
      <view class='my-info-content'>
          <view class='user-head-view'>
            <image class='user-head-bg' src='../../images/user_head_bg.png'></image>
            <image class='user-head' src='{{user_head}}'></image>
            
            <view wx:if='{{is_login}}'>
              <text class='user-name'>{{nick_name}}</text>
            </view>
            <view wx:if='{{!is_login}}'>
              <button wx:if='{{canIUse}}' 
              class='login-btn' open-type="getUserInfo" bindgetuserinfo='onGotUserInfo'></button>
              <text class='no-login-txt'>请登录</text>
            </view>

          </view>

          <view class='my-keep-view'>
            <view class='keep-left'>
              <image class='my-keep-img' src='../../images/my_keep_icon.png'></image>
              <text class='keep-txt'>我的收藏</text>
            </view>
            <image class='right-icon' src='../../images/right_icon.png'></image>
            <button class='mykepp-btn' wx:if='{{canIUse}}'
              open-type="getUserInfo" bindgetuserinfo='mykeep'></button>
          </view>
          <view class='my-keep-view' bindtap='followUs'>
            <view class='keep-left'>
              <image class='my-keep-img' src='../../images/follow_icon.png'></image>
              <text class='keep-txt'>关注我们</text>
            </view>
            <image class='right-icon' src='../../images/right_icon.png'></image>
          </view>
          <view class='kefu-view'>
            <view class='keep-left'>
              <image class='my-keep-img' src='../../images/opinion_icon.png'></image>
              <text class='keep-txt'>意见反馈</text>
            </view>
            <image class='right-icon' src='../../images/right_icon.png'></image>
            <button class='kefu-btn' open-type='contact'></button>
          </view>
      </view>
    </swiper-item>
</swiper>


<!--弹窗下载APP-->
<view class="modal-mask" catchtouchmove="preventTouchMove" bindtap='hideModal' wx:if="{{showModal}}"></view>
<view class="modal-dialog" wx:if="{{showModal}}">
    <view class='modal-top'>
      <view class="modal-title">个性头像</view>
      <view class="modal-content">
          <view class='model-content-item'><image src='/images/logo.png' class='close-image'></image></view>
          <view class='model-content-item'><text class='app-name'>个性头像</text></view>
          <view class='down-tip'>
            <view class='model-content-item'><text>更多头像请前往应用商店搜索</text></view>
            <view class='model-content-item'><text>"个性头像"APP</text></view>
          </view>
      </view>
    </view>
    <view class="modal-footer" bindtap='hideModal'>
        <image src='/images/close_icon.png' class='close-image'></image>
    </view>
</view>


<!--关注我们弹窗-->
<view class="follow-mask" catchtouchmove="preventTouchMove" bindtap='hideFollow' wx:if="{{isfollow}}"></view>
<view class='gif-view' wx:if="{{isfollow}}"><image class='follow-gif' src='{{follow_gif}}'></image></view>
<view class="follow-dialog" wx:if="{{isfollow}}">
    <view class='follow-top'>
      <image src='/images/follow_us_icon.png' class='follow-img'></image>
    </view>
    <view class="follow-footer" bindtap='hideFollow'>
        <image src='/images/close_icon.png' class='close-image'></image>
    </view>
</view>

<view wx:if='{{hide_ad}}' class='float-view'>
  <view class="float-view-wrapper">
    <image class='float-iamge' src='../../images/{{floatImg}}' mode='widthFix' bindtap='newApp'></image>
    
    <navigator class="nav-view" wx:if='{{is_nav && isUse}}' target="miniProgram" open-type="navigate" app-id="{{app_id}}" path="" extra-data="" version="release" bindcomplete='jumpSuccess'></navigator>
  </view>
</view>

<image src='../../images/follow_xcx.gif' wx:if='{{show_follow && currentTab == 0}}' class='follow-xcx' 
style='top:{{statusBarHeight + titleBarHeight}}px' bindtap='follow'></image>

<!-- <view class='up-view' bindtap='toTop'>
  <image class='up-view-img' src='../../images/up_icon.png'></image>
</view> -->