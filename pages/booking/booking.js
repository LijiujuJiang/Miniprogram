Page({

  goIndex() {
      wx.navigateTo({
          url: "/pages/index/index"
      })
  },

  data: {

      // 基本信息
      name: "",
      wechat: "",

      // 主题
      themes: [
          "单人-白棚",
          "单人-置景棚",
          "单人-外景",
          "双人-白棚",
          "双人-置景棚",
          "双人-外景"
      ],

      selectedTheme: "请选择主题",

      // 日期
      date: "请选择日期",

      showCalendar: false,

      // TimeSelection返回的数据
      bookingTimeRange: "",

      startTime: "",

      endTime: "",

      duration: 0,

      // 金额
      moneyRange: 0

  },

  /* ---------------------------
     输入
  ----------------------------*/

  inputName(e) {

      this.setData({

          name: e.detail.value

      })

  },

  inputWechat(e) {

      this.setData({

          wechat: e.detail.value

      })

  },

  /* ---------------------------
     主题
  ----------------------------*/

  themeChange(e) {

      const theme = this.data.themes[e.detail.value]

      this.setData({

          selectedTheme: theme,

          bookingTimeRange: "",

          startTime: "",

          endTime: "",

          duration: 0,

          moneyRange: 0

      })

  },

  /* ---------------------------
     日历
  ----------------------------*/

  showCalendar() {

      this.setData({

          showCalendar: true

      })

  },

  onCalendarSelect(e) {

      this.setData({

          date: e.detail.date,

          showCalendar: false,

          bookingTimeRange: "",

          duration: 0,

          moneyRange: 0

      })

  },

  /* ---------------------------
     TimeSelection组件回调
  ----------------------------*/

  onTimeSelected(e) {

    this.setData({

        bookingTimeRange: e.detail.timeRange,

        startTime: e.detail.start,

        endTime: e.detail.end,

        duration: e.detail.duration,

        moneyRange: e.detail.totalPrice

    })

},

  /* ---------------------------
     金额计算
  ----------------------------*/

  calculateMoney() {

      const theme = this.data.selectedTheme

      const duration = this.data.duration

      if (duration == 0) {

          this.setData({

              moneyRange: 0

          })

          return

      }

      let price = 0

      switch (theme) {

          case "单人-白棚":
              price = 499
              break

          case "单人-置景棚":
          case "单人-外景":
              price = 328
              break

          case "双人-白棚":
              price = 699
              break

          case "双人-置景棚":
          case "双人-外景":
              price = 400
              break
      }

      this.setData({

          moneyRange: price * duration

      })

  },

  /* ---------------------------
     提交
  ----------------------------*/

  submitBooking() {
    const name = this.data.name.trim()

// 必须为 CN/IP 格式
const reg = /^.+\/.+$/

if (!reg.test(name)) {

    wx.showToast({

        title: "请输入CN/角色名，例如：小红/三月七",

        icon: "none"

    })

    return
}

      if (

          !this.data.name.trim() ||

          this.data.selectedTheme == "请选择主题" ||

          this.data.date == "请选择日期" ||

          this.data.bookingTimeRange == ""

      ) {

          wx.showToast({

              title: "请填写完整预约信息",

              icon: "none"

          })

          return

      }

      const bookingData = {

          name: this.data.name,

          theme: this.data.selectedTheme,

          date: this.data.date,

          startTime: this.data.startTime,

          endTime: this.data.endTime,

          duration: this.data.duration,

          bookingTimeRange: this.data.bookingTimeRange,

          totalPrice: this.data.moneyRange

      }

      console.log("预约信息：", bookingData)

      

      //数据存储
      const db = wx.cloud.database()
      db.collection("booking").add({

        data:{
    
            name:this.data.name,
    
            theme:this.data.selectedTheme,
    
            date:this.data.date,
    
            time:this.data.bookingTimeRange,

            startTime: this.data.startTime,

            endTime: this.data.endTime,
    
            money:this.data.moneyRange,
            
            createTime: new Date()
    
        },
         success: res => {

        wx.showToast({

            title: "预约成功",
            icon: "success",
            duration: 1500

        })

        // 1.5秒后返回首页
        setTimeout(() => {

            wx.reLaunch({

                url: "/pages/index/index"

            })

        }, 1500)

    },
     fail: err => {

        wx.showToast({

            title: "预约失败",
            icon: "none"

        })

        console.error(err)

    }
    
    })

  },


  /* ---------------------------
   日历
----------------------------*/

showCalendar() {

  this.setData({

      showCalendar: !this.data.showCalendar

  })

},

closeCalendar() {

  this.setData({

      showCalendar: false

  })

},

onCalendarSelect(e) {

  this.setData({

      date: e.detail.date,

      showCalendar: false,

      bookingTimeRange: "",

      duration: 0,

      moneyRange: 0

  })

},

})