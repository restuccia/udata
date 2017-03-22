<style lang="less">
.datetime-picker {
    .date-picker, .time-picker {
        width: 48%;
        float: left;
        margin: 0 1%;
    }
}
</style>

<template>
<div class="datetime-picker">
    <date-picker ref="date" :serializable="false"></date-picker>
    <time-picker ref="time" :serializable="false"></time-picker>
    <input type="hidden" ref="hidden"
        :id="field.id"
        :name="field.id"
        :value="value"></input>
</div>
</template>

<script>
import moment from 'moment';
import {FieldComponentMixin} from 'components/form/base-field';

export default {
    name: 'datetime-picker',
    mixins: [FieldComponentMixin],
    events: {
        'calendar:date:selected': function(datetime) {
            let value = moment(this.$refs.hidden.value);
            value.year(datetime.year());
            value.month(datetime.month());
            value.date(datetime.date());
            this.$refs.hidden.value = value.format();
            return true;
        },
        'calendar:time:selected': function(datetime) {
            let value = moment(this.$refs.hidden.value);
            value.hour(datetime.hour());
            value.minute(datetime.minute());
            this.$refs.hidden.value = value.format();
            return true;
        }
    }
};
</script>
