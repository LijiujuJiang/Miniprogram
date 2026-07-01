App({

  onLaunch() {

      wx.cloud.init({

          env: "waltwhite-booking-d7djhm88391392", // 改成你的环境ID

          traceUser: true

      })

  }

})