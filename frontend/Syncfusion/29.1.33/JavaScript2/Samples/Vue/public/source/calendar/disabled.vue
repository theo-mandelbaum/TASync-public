<template>
<div class="col-lg-12 control-section">
    <div class="control_wrapper calendar-disabled">
        <div id="container" style="overflow:auto">
              <ejs-calendar id="calendar" :renderDayCell="disableDate" :change="onValueChange"></ejs-calendar>
            <span id="date_label"> Selected Value: </span>

        </div>
    </div>
    <div id="action-description">
    <p>
        In the following sample, all the weekends (Saturday and Sunday) of a month are <code>disabled</code>, and these dates are restricted to set or select in the Calendar.
    </p>
</div>
<div id="description">
    <p>
        Disabled Dates sample demonstrates, how to disable a specific dates in a calendar by using <code>renderDayCell</code> event. This event gets triggered on each day cell element creation that allows you to customize or disable the specific dates
        in calendar. Here the weekend date's are disabled by using renderDayCell.
    </p>
    <p>More information on the calendar customization can be found in this
       <a href="https://ej2.syncfusion.com/vue/documentation/calendar/customization.html#disable-weekends" target="_blank"> documentation section</a>.</p>
</div>
</div>
</template>

<script>

import { CalendarComponent } from "@syncfusion/ej2-vue-calendars";

export default {
  methods: {
    disableDate: function(args) {
      if (args.date.getDay() === 0 || args.date.getDay() === 6) {
        args.isDisabled = true;
      }
    },
    onValueChange: function(args) {
      document.getElementById("date_label").textContent =
        "Selected Value: " + args.value.toLocaleDateString();
    }
  },
  components: { 'ejs-calendar': CalendarComponent }
};
</script>


<style scoped>
#date_label {
  display: block;
  width: 248px;
  color: rgba(0, 0, 0, 0.58);
  margin-left: 5px;
}

.control_wrapper.calendar-disabled {
  max-width: 300px;
  margin: 0 auto;
}

body.fluent-dark #date_label,
body.fluent2-dark #date_label,
body.fluent2-highcontrast #date_label,
body.bootstrap5-dark #date_label,
body.bootstrap5.3-dark #date_label,
body.tailwind-dark #date_label,
body.tailwind3-dark #date_label,
body.material-dark #date_label,
body.material3-dark #date_label,
body.fabric-dark #date_label,
body.bootstrap-dark #date_label,
body.highcontrast #date_label {
    color: white;
} 
</style>