<script lang="ts">
    import Vue from 'vue';
    export default Vue.extend({
        mpType: 'app',
        onLaunch() {
            console.log('App Launch')

            uni.getSystemInfo({
				success: function(e: any) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
        },
        onShow() {
            console.log('App Show')
        },
        onHide() {
            console.log('App Hide')
        }
    });
</script>

<style lang="scss">
/*每个页面公共css */
@import "./plugins/colorui/main.css";
@import "./plugins/colorui/icon.css";
/* @import "./static/css/icon.css"; */

$tennis-court: #007747;
$tennis-white: #e7e1ed;
$tennis-default: #583688;
$tennis-ball: #bbc700;
$tennis-ball-text: #21281b;

$themes: (
	'tennis-court': $tennis-court,
	'tennis-white': $tennis-white,
	'tennis-default': $tennis-default,
	'tennis-ball': $tennis-ball,
	'tennis-ball-text': $tennis-ball-text,
);

@each $color,$value in $themes {
    .text-#{$color} {
        color: $value;
    }

    .bg-#{$color} {
        background-color: $value;
        color: #fff;
    }
}
</style>
