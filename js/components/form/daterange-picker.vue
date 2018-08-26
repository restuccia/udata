<style lang="less">
.daterange-picker {
    .dropdown-menu {
        min-width: auto;
    }

    input.form-control {
        border-right: none;

        &:nth-of-type(2) {  // End date
            border-left: none;
        }
    }
}
</style>

<template>
<div class="input-group dropdown daterange-picker" :class="{ 'open': picking }"
    v-outside="onOutside">
    <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
    <input type="text" class="form-control"
        ref="start-input" :placeholder="_('Start')"
        @focus="onFocus" @input="onChange"
        :required="required"
        :value="startValue | dt(dateFormat, '')"
        :readonly="readonly">
    <span class="input-group-addon">{{ _('to') }}</span>
    <input type="text" class="form-control daterange-picker-end"
        ref="end-input" :placeholder="_('End')"
        @focus="onFocus" @input="onChange"
        :required="required"
        :value="endValue | dt(dateFormat, '')"
        :readonly="readonly">
    <span class="input-group-btn">
        <button class="btn btn-danger" type="button" @click.prevent="clear">
            <span class="fa fa-remove"></span>
        </button>
    </span>
    <div class="dropdown-menu" :style="dropdownStyle">
        <calendar ref="calendar" :selected="currentValue" :min="dateMin" :max="dateMax"></calendar>
    </div>
    <input type="hidden" ref="start-hidden"
        :id="startId" :name="startId"
        :value="startValue | dt(ISO_FORMAT, '')"></input>
    <input type="hidden" ref="end-hidden"
        :id="endId" :name="endId"
        :value="endValue | dt(ISO_FORMAT, '')"></input>
</div>
</template>

<script>
import Calendar from 'components/calendar.vue';
import {FieldComponentMixin} from 'components/form/base-field';
import moment from 'moment';
import $ from 'jquery-validation';  // Ensure jquery & jquery.validate plugin are both loaded

const DEFAULT_FORMAT = 'L';
const ISO_FORMAT = 'YYYY-MM-DD';


export default {
    name: 'daterange-picker',
    mixins: [FieldComponentMixin],
    components: {Calendar},
    data() {
        return {
            picking: false,
            pickedField: null,
            startValue: this.value && this.value.hasOwnProperty('start') ? this.value.start : '',
            endValue: this.value && this.value.hasOwnProperty('end') ? this.value.end : '',
            ISO_FORMAT
        };
    },
    computed: {
        currentValue: {
            get() {
                return this.pickedField === this.$refs.startInput ? this.startValue : this.endValue;
            },
            set(value) {
                if (this.pickedField === this.$refs.startInput) {
                    this.startValue = value;
                } else {
                    this.endValue = value;
                }
            }
        },
        startId() {
            return `${this.field.id}.start`;
        },
        endId() {
            return `${this.field.id}.end`;
        },
        dateMin() {
            if (this.pickedField === this.$refs.endInput) {
                return this.startValue || undefined;
            }
        },
        dateMax() {
            if (this.pickedField === this.$refs.startInput) {
                return this.endValue || undefined;
            }
        },
        dateFormat() {
            return this.field.format || DEFAULT_FORMAT;
        },
        dropdownStyle() {
            if (!this.pickedField) return {};
            const outerBox = this.$el.getBoundingClientRect();
            const box = this.pickedField.getBoundingClientRect();
            return {
                width: `${box.width}px`,
                left: `${box.left - outerBox.left}px`,
                top: `${box.height}px`,
            };
        }
    },
    events: {
        'calendar:date:selected': function(date) {
            this.currentValue = date;
            this.picking = false;
            return true;
        },
        'calendar:date:cleared': function() {
            this.currentValue = null;
            this.picking = false;
            return true;
        }
    },
    mounted() {
        // Perform all validations on end field because performing on start field unhighlight.
        $(this.$refs.endHidden).rules('add', {
            dateGreaterThan: this.$refs.startHidden.id,
            required: (el) => {
                return (this.startValue && !this.endValue) || (this.endValue && !this.startValue);
            },
            messages: {
                dateGreaterThan: this._('End date should be after start date'),
                required: this._('Both dates are required')
            }
        });
    },
    methods: {
        clear() {
            this.startValue = '';
            this.endValue = '';
        },
        onFocus(e) {
            if (!this.picking || e.target !== this.pickedField) {
                this.$nextTick(this.$refs.calendar.focus);
            }
            this.picking = true;
            this.pickedField = e.target;
        },
        onChange(e) {
            try {
                this.currentValue = moment(e.target.value, this.dateFormat);
            } catch(e) {
                // Don't do anything while typing (ie. incomplete date is unparseable)
            }
        },
        onOutside() {
            this.picking = false;
        }
    },
    watch: {
        value(value) {
            this.startValue = this.value && this.value.hasOwnProperty('start') ? this.value.start : '';
            this.endValue = this.value && this.value.hasOwnProperty('end') ? this.value.end : '';
        }
    }
};
</script>
