<script>
export default {
  onLaunch() {
    console.log('App Launch');
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  }
};
</script>

<style>
/*每个页面公共css */
@media screen and (min-width: 768px) {
  html {
    width: 750px;
    margin: 0 auto;
  }
  .popbox {
    width: 30vw !important;
  }
  uni-app,
  uni-page-head {
    position: relative;
  }
  uni-page-head .uni-page-head {
    position: absolute;
  }
}
</style>
