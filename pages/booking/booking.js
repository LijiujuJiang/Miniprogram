Page({

    data: {
  
      themes: [
        "占位符1",
        "占位符2",
        "占位符3",
        "占位符4"
      ],
  
      selectedTheme: "请选择主题",
  
      date: "请选择日期",
  
      wechat: ""
  
    },
  
    themeChange(e) {
  
      this.setData({
        selectedTheme:
          this.data.themes[e.detail.value]
      })
  
    },
  
    dateChange(e) {
  
      this.setData({
        date: e.detail.value
      })
  
    },
  
    inputWechat(e) {
  
      this.setData({
        wechat: e.detail.value
      })
  
    },
  
    submitBooking() {
  
      console.log({
        theme: this.data.selectedTheme,
        date: this.data.date,
        wechat: this.data.wechat
      })
  
      wx.showToast({
        title: '预约成功'
      })
  
    }
  
  })