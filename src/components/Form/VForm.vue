<template>
  <el-form :model="model" :rules="rules" ref="formRef">
    <slot name="default">
      <el-row :class="rowClass" :style="rowStyle">
        <template v-if="schema && schema.length">
          <VFormLayout
            v-for="(item, index) in schema"
            :key="index"
            v-bind="item"
            v-model="model[item.prop as string]"
          >
          </VFormLayout>
        </template>
      </el-row>
    </slot>
    <slot name="actions"></slot>
  </el-form>
</template>

<script setup lang="ts">
import { exposeEventsUtils } from '@/utils/format'
import type { VFormProps } from './types'
import { useForm } from './useForm'
import type { FormInstance, FormItemProp } from 'element-plus'

const exposeEvents = ['validate', 'validateField', 'resetFields', 'clearValidate', 'scrollToField']

const props = withDefaults(defineProps<VFormProps>(), {
  inline: false,
  labelPosition: 'right',
  hideRequiredAsterisk: false,
  requireAsteriskPosition: 'left',
  showMessage: true,
  inlineMessage: false,
  statusIcon: false,
  validateOnRuleChange: false,
  disabled: false,
  scrollToError: false
})

const formRef = ref<FormInstance>()

const emits = defineEmits<{
  validate: [prop: FormItemProp, isValid: boolean, message: string]
  'update:modelValue': [model: any]
}>()
const exposes = exposeEventsUtils(formRef, exposeEvents)

defineExpose({ ...exposes })

const { model, rules } = useForm(props.schema || [])

watch(
  model,
  () => {
    emits('update:modelValue', model.value)
  },
  {
    deep: true
  }
)
</script>

<style scoped></style>
