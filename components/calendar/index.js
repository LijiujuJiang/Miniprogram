const calendarUtil = require("./util")
Component({

    properties: {
        // 父页面传进来的日期
        selectedDate:{
            type:String,
            value:""
        },
        bookingMap:{

          type:Object,
  
          value:{}
  
      }
    },

    data: {

        year: 0,

        month: 0,

        calendar: [],

        selectedDate:""

    },

    lifetimes: {

        attached() {

            const now = new Date()

            this.setData({

                year: now.getFullYear(),

                month: now.getMonth() + 1

            })

            this.createCalendar()

        }

    },

    methods: {

        createCalendar() {

            const list = calendarUtil.createCalendar(
        
                this.data.year,
        
                this.data.month
        
            )

            const selected = this.properties.selectedDate

            list.forEach(item=>{

                if(item.empty){
                return
            }

            item.selected =
            item.date == selected

            })
            const bookingMap = this.properties.bookingMap

            list.forEach(item=>{

            if(item.empty) return

            item.hasBooking = !!bookingMap[item.date]
          })
        
            this.setData({
        
                calendar: list
        
            })
        
        },

        selectDate(e){

            const item = e.currentTarget.dataset.item
        
            if(item.empty){
                return
            }
        
            // 工作日不能选
            if(!item.weekend){
        
                return
        
            }
        
            const list = this.data.calendar
        
            list.forEach(day=>{
        
                if(!day.empty){
        
                    day.selected = false
        
                }
        
            })
        
            item.selected = true
        
            this.setData({
        
                calendar:list,
        
                selectedDate:item.date
        
            })
        
            this.triggerEvent("select",{
        
                date:item.date
        
            })
        
        },

        prevMonth() {

            let year = this.data.year
            let month = this.data.month
        
            month--
        
            if (month < 1) {
        
                month = 12
                year--
        
            }
        
            this.setData({
        
                year,
                month
        
            })
        
            this.createCalendar()
        
        },

        nextMonth() {

            let year = this.data.year
            let month = this.data.month
        
            month++
        
            if (month > 12) {
        
                month = 1
                year++
        
            }
        
            this.setData({
        
                year,
                month
        
            })
        
            this.createCalendar()
        
        },
    },

    observers:{

        "selectedDate":function(value){
    
            this.createCalendar()
    
        },
        "bookingMap":function(){

          this.createCalendar()

      }
    
    },

})