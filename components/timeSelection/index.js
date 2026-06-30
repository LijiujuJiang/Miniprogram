const PRICE_MAP = {

  "单人-白棚": 198,

  "单人-置景棚": 145,

  "单人-外景": 145,

  "双人-白棚": 268,

  "双人-置景棚": 245,

  "双人-外景": 245

}

Component({

  properties: {

      // booking页面传入主题
      theme: {

          type: String,

          value: "",

          observer() {

              this.generateTimeList()

          }

      },

  },

  data: {

      timeList: []

  },

  methods: {

      /**
       * 根据主题生成时间段
       */
      generateTimeList() {

          const theme = this.properties.theme

          if (!theme || theme === "请选择主题") {

              this.setData({

                  timeList: []

              })

              return

          }

          // 白棚至少3小时，其余至少2小时
          let duration = 2

          if (
              theme === "单人-白棚" ||
              theme === "双人-白棚"
          ) {

              duration = 3

          }

          // 当前主题单价
          const unitPrice = PRICE_MAP[theme] || 0
          const list = []

          // 营业时间
          const startHour = 11
          const endHour = 20

          for (
              let start = startHour;
              start <= endHour - duration;
              start++
          ) {

              const end = start + duration

              list.push({

                start,

                end,

                duration,

                // 每小时单价
                unitPrice,

                // 当前时间段总价
                totalPrice: unitPrice * duration,

                text:
                    `${String(start).padStart(2, "0")}:00 - ${String(end).padStart(2, "0")}:00`,

                selected: false

            })

          }

          this.setData({

              timeList: list

          })

      },

      /**
       * 点击时间段
       */
      chooseTime(e) {

          const index = e.currentTarget.dataset.index

          const list = this.data.timeList

          list.forEach(item => {

              item.selected = false

          })

          list[index].selected = true

          this.setData({

              timeList: list

          })

          this.triggerEvent("change", {

              start:
                  `${String(list[index].start).padStart(2, "0")}:00`,

              end:
                  `${String(list[index].end).padStart(2, "0")}:00`,

              duration:
                  list[index].duration,

              timeRange:
                  list[index].text,
               // 新增
                unitPrice:
                list[index].unitPrice,

                totalPrice:
                list[index].totalPrice

            })

      }

  }

})