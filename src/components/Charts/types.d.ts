import { init } from 'echarts/core'
import type { SetOptionOpts, EChartsOption } from 'echarts'
import type { CSSProperties } from 'vue'

type InitType = typeof init
export type InitParameters = Parameters<InitType>
export type Theme = NonNullable<InitParameters[1]>
export type InitOptions = NonNullable<InitParameters[2]>
export type UpdateOptions = SetOptionOpts

export type LoadingOptions = {
  text?: string
  textColor?: string
  fontSize?: number | string
  fontWeight?: number | string
  fontStyle?: string
  fontFamily?: string
  maskColor?: string
  showSpinner?: boolean
  color?: string
  spinnerRadius?: number
  lineWidth?: number
  zlevel?: number
}

type AutoresizeProp =
  | boolean
  | {
      throttle?: number
      onResize?: () => void
    }

export interface VEchartsProps {
  option: typeof EChartsOption
  theme: {
    type: Theme
  }
  initOptions: InitOptions
  updateOptions: UpdateOptions
  group: string
  manualUpdate: boolean
  autoresize: AutoresizeProp
  loading: boolean
  loadingOptions: LoadingOptions
}

export interface VueEchartsProps extends Partial<VEchartsProps> {
  theme?: 'dark' | 'default' | string
  style?: CSSProperties
  height?: string | number
  charts?: string
  components?: string[]
}
