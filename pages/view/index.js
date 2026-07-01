Page({

  data: {

      // 日历需要的数据
      bookingMap: {},

      // 当前点击日期的预约
      bookingList: [],

      // 当前选中的日期
      currentDate: ""

  },

  onLoad() {

      this.loadBooking()

  },

  loadBooking(){

    const db=wx.cloud.database()

    db.collection("booking")
    .get({

        success:res=>{

            const map={}

            res.data.forEach(item=>{

                if(!map[item.date]){

                    map[item.date]=[]

                }

                map[item.date].push(item)

            })

            this.setData({

                bookingMap:map

            })

        }

    })

},

  onCalendarSelect(e) {

      const date = e.detail.date

      this.setData({

          currentDate: date,

          bookingList:

              this.data.bookingMap[date] || []

      })

  },

  goIndex() {

      wx.navigateBack()

  }

})