Page({

    goIndex() {
  
        wx.navigateTo({
          url: '/pages/index/index'
        })
    
      },

    data: {
      name:"",
  
      themes: [
        "单人-白棚",
        "单人-置景棚",
        "单人-外景",
        "双人-白棚",
        "双人-置景棚",
        "双人-外景",
      ],
  
      selectedTheme: "请选择主题",

      startTimes: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
      ],

      showCalendar: false,

      date: "请选择日期",

      selectedStartTime: "请选择开始时间",

      durationOptions: [],
    
      selectedDuration: "请选择拍摄时长",

      moneyRange:"¥0",
    
      bookingTimeRange: "",
    
      wechat: ""
  
    },
  
    inputName(e) {

        this.setData({
      
          name: e.detail.value
      
        })
      
      },

    themeChange(e) {

        const theme =
            this.data.themes[e.detail.value]
      
        let durations = []
      
        if ((theme === "单人-白棚")||(theme === "双人-白棚")) {
      
          for(let i = 3; i <= 4; i++){
      
            durations.push(i + "小时")
          }
      
        } else {
      
          for(let i = 2; i <= 4; i++){
      
            durations.push(i + "小时")
          }
      
        }
      
        this.setData({
      
          selectedTheme: theme,
      
          durationOptions: durations,
      
          selectedDuration: "请选择拍摄时长",

          moneyRange: "¥0",
      
          bookingTimeRange: "",
          
      
        })

        this.calculateMoney()
      
      },

      showCalendar() {
        this.setData({
            showCalendar: true
        })
    },

    onCalendarSelect(e) {

      this.setData({
  
          date: e.detail.date,
  
          showCalendar: false
  
      })
  
  },

    startTimeChange(e){

        this.setData({
      
          selectedStartTime:
            this.data.startTimes[e.detail.value]
      
        })
      
        this.calculateTimeRange()
      
      },

    durationChange(e){

        this.setData({
      
          selectedDuration:
            this.data.durationOptions[e.detail.value]
      
        })
      
        this.calculateTimeRange()
        this.calculateMoney()
      
    },

      calculateTimeRange() {

        const start =
            this.data.selectedStartTime
      
        const duration =
            this.data.selectedDuration
      
        if(
            start.indexOf(":") === -1 ||
            duration === "请选择拍摄时长"
        ){
            return
        }
      
        const startHour =
            parseInt(start.split(":")[0])
      
        const durationHour =
            parseInt(duration)
      
        const endHour =
            startHour + durationHour
      
        const range =
            start +
            " - " +
            endHour.toString().padStart(2,"0")
            +
            ":00"
      
        this.setData({
      
            bookingTimeRange: range
      
        })
      
      },
      calculateMoney() {
        const theme = this.data.selectedTheme
        const duration = this.data.selectedDuration

        if (
          theme === "请选择主题" ||
          duration === "请选择拍摄时长"
        ) {
          this.setData({
              moneyRange: "¥0"
          })
          return
        }

        //单价
        let pricePerHour = 0
        const hours = parseInt(duration)

         if (theme === "单人-白棚") {
          pricePerHour = 166
        } else if (
          theme === "单人-置景棚" ||
          theme === "单人-外景"
        ) {
          pricePerHour = 164
        } else if (theme === "双人-白棚") {
          pricePerHour = 233
        } else if (
          theme === "双人-置景棚" ||
          theme === "双人-外景"
        ) {
          pricePerHour = 225
        }

        const totalMoney = pricePerHour * hours
        this.setData({
          moneyRange: `¥${totalMoney}`
      })

      },
  
    inputWechat(e) {
  
      this.setData({
        wechat: e.detail.value
      })
  
    },
  
    submitBooking() {

        if( this.data.selectedTheme === "请选择主题" ||
        this.data.date === "请选择日期" ||
        this.data.selectedStartTime === "请选择开始时间" ||
        this.data.selectedDuration === "请选择拍摄时长" ||
        !this.data.name.trim()
        ) {
            wx.showToast({
                title: '请填写完整信息!',
                icon: 'none'
              })
          
              return
        }

        const bookingData = {
          name:
            this.data.name,

          theme:
            this.data.selectedTheme,
      
          date:
            this.data.date,
      
          startTime:
            this.data.selectedStartTime,
      
          duration:
            this.data.selectedDuration,
      
          bookingRange:
            this.data.bookingTimeRange,
      
          wechat:
            this.data.wechat
      
        }
      
        console.log("预约数据：", bookingData)
      
        wx.showToast({
      
          title:"预约成功"
      
        })
      
      }
  
  })