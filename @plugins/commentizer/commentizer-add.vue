<template>
  <factor-form
    ref="form"
    :class="formStatus"
    @submit="send()"
  >
    <h2 v-text="$setting.get('commentizer.submitText')" />
    <div v-if="sent" class="confirm">
      <div class="title">{{ $setting.get('commentizer.confirm.title') }}</div>
      <div class="description">{{ $setting.get('commentizer.confirm.subTitle') }}</div>
    </div>
    <div v-else class="inputs">
      <factor-input-wrap
        v-for="(c, i) in $setting.get('commentizer.layout')"
        :key="i"
        v-model="form[c._id]"
        :data-test="`commentizer-${c._id}`"
        :input="`factor-input-${c.inputType}`"
        :required="!!c.required"
        :label="getLabel(c)"
        :format="$setting.get('commentizer.inputFormat', 'horizontal')"
      />
      <factor-input-submit
        el="button"
        btn="primary"
        :loading="sending"
      >{{ $setting.get('commentizer.submitText') }}</factor-input-submit>
    </div>
  </factor-form>
</template>

<script>
export default {
  data () {
    return {
      sending: false,
      sent: false,
      form: {},
      formStatus: "unchecked"
    }
  },
  mounted () {
    this.$watch(
      "form",
      function () {
        const v = this.$refs.form.$el.checkValidity()

        this.formStatus = v ? "valid" : "invalid"
      },
      { deep: true }
    )
  },
  methods: {
    async send () {
      this.sending = true
      await this.$commentizer.save(this.form)

      this.sent = true
      this.sending = false
    },
    getLabel (c) {
      const label = [c.label]
      if (c.required) {
        label.push("*")
      }
      return label.join(" ")
    }
  }
}
</script>
