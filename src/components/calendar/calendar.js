Component({
    properties: {
      // 这里定义了innerText属性，属性值可以在组件使用时指定
      curYear: {
        type: String,
        value: '',
      },
      curMonth: {
        type: String,
        value: '',
      },
      days: {
        type: Array,
        value: '',
      }
    },
    data: {
      // 这里是一些组件内部数据
      activeIndex: ''
    },
    ready() {
        this.calculateDays(this.data.curYear,this.data.curMonth)
    },
    methods: {
        getThisMonthDays(year, month) {
            return new Date(year, month, 0).getDate();
        },
        getFirstDayOfWeek(year, month) {
            return new Date(Date.UTC(year, month - 1, 1)).getDay();
        },
        calculateDays(year, month) {
            let days = [];
            const thisMonthDays = this.getThisMonthDays(year, month);
            const firstDayOfWeek = this.getFirstDayOfWeek(year, month);

            if (firstDayOfWeek > 0){
                for (let i = 0; i < firstDayOfWeek; i++) {
                    days.push({day:''});
                }
            }

            for (let i = 1; i <= thisMonthDays; i++) {
                days.push({day: i});
            }
        
            this.setData({
                days
            })
        },
        datePicker(e) {
            this.setData({
                activeIndex: e.currentTarget.id
            })
            this.triggerEvent('datePicker')
        }
    }
})