<import src='/pages/common/common_bar.wxml'/>

<!--引用自定义导航栏模板-->
<template is="bar" data='{{statusBarHeight:statusBarHeight,titleBarHeight:titleBarHeight,left_type:1,title_txt:title_txt}}'/>

<view class='img-list' style='padding-top:{{statusBarHeight + titleBarHeight}}px;' >
  <block wx:for="{{array}}" wx:key="id" wx:for-item="item">
    
    <view class='img-item' style="{{item.fixStyles}}" bindtap='imagedetail' data-index='{{index}}'>
      <image src='{{item.ico}}' class='item-img' mode='widthFix'></image>
    </view>
  </block>
  <view class='load_more' wx:if="{{is_load_more}}"><image src='/images/load_more.gif' class='load_more_image'></image></view>
</view>