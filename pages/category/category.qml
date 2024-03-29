<import src='/pages/common/common_bar.wxml'/>

<!--引用自定义导航栏模板-->
<template is="bar" data='{{statusBarHeight:statusBarHeight,titleBarHeight:titleBarHeight,left_type:1,title_txt:title_txt}}'/>

<view class='img-list' style='padding-top:{{statusBarHeight + titleBarHeight}}px;' >
  <block wx:for="{{array}}" wx:key="id" wx:for-item="item">
    
    <view class='img-item' style="{{item.fixStyles}}" bindtap='imagedetail' data-index='{{index}}' data-keep='{{item.is_keep}}' data-sharetitle='{{item.share_title}}'>
      <image src='{{item.hurl}}' class='item-img' mode='widthFix'></image>
    </view>
  </block>
  <view class='load_more' wx:if="{{is_load_more}}"><image src='/images/load_more.gif' class='load_more_image'></image></view>
</view>

<view class="bottom-tab">
    <view class="bottom-tab-item" bindtap="toHome">
      <image class='category-img' src='../../images/category_home.png'></image>
      <text class='category-txt'>首页</text> 
    </view>
    <view class="bottom-share-item">
      <view class='bottom-tab-item'>
        <image class='category-img' src='../../images/category_share.png'></image>
        <text class='category-txt'>分享</text>
      </view>
      <view>
        <button class='share-btn' open-type='share'></button>
      </view>
    </view>
    <view class="bottom-tab-item" bindtap="toTop">
      <image class='category-img' src='../../images/category_up.png'></image>
      <text class='category-txt'>返回顶部</text> 
    </view>
</view>

<view wx:if='{{hide_ad}}' class='float-view'>
  <view class="float-view-wrapper">
    <image class='float-iamge' src='{{floatImg}}' mode='widthFix' bindtap='newApp'></image>
    <image class='float-image-close' src='../../images/float_close.png' mode='widthFix' bindtap='closeAd'></image>
    <navigator class="nav-view" wx:if='{{is_nav && isUse}}' target="miniProgram" open-type="navigate" 
    app-id="{{app_id}}" path="{{jump_path}}" extra-data="" version="release" data-appid='{{app_id}}' bindcomplete='findJumpSuccess'></navigator>
  </view>
</view>