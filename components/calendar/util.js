/**
 * 生成月历数据
 */
function createCalendar(year, month) {

  // 本月总天数
  const totalDays = new Date(year, month, 0).getDate()

  // 本月1号
  const firstDate = new Date(year, month - 1, 1)

  // JS:
  // 周日=0
  // 周一=1
  // ...
  // 周六=6
  let firstWeek = firstDate.getDay()

  // 转成周一开始
  firstWeek = firstWeek === 0 ? 7 : firstWeek

  let list = []

  // 前面补空白
  for (let i = 1; i < firstWeek; i++) {

      list.push({
          empty: true
      })

  }

  // 本月日期
  for (let day = 1; day <= totalDays; day++) {

      const date = new Date(year, month - 1, day)

      const week = date.getDay()

      list.push({

          empty: false,

          day,

          week,

          weekend: week == 0 || week == 6,

          full: false,

          selected: false,

          date:

              `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

      })

  }

  // 后面补空白
  while (list.length % 7 != 0) {

      list.push({

          empty: true

      })

  }

  return list

}

module.exports = {

  createCalendar

}